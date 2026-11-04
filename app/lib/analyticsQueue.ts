import type { CallClickPayload } from "./trackingSession";

export type AnalyticsEvent = Omit<CallClickPayload, "phone" | "trackingId"> & {
  type: "page_view" | "call_outcome" | "callback_open";
  trackingId?: string;
  phone?: string;
  outcome?: "connected" | "not_connected";
  sourceEventId?: string;
};

type Payload = CallClickPayload | AnalyticsEvent;
type Entry = { channel: "phone" | "event"; payload: Payload; createdAt: number; attempts: number; nextAttempt: number; retryAfter?: number };
const STORAGE_KEY = "medtax_analytics_queue_v1";
const TTL = 24 * 60 * 60 * 1000;
const LIMIT = 100;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const PERMANENT = new Set([400, 403, 409, 413]);
let initialized = false;
let queue: Entry[] = [];
let timer: number | undefined;
const inFlight = new Set<string>();

function record(value: unknown): Record<string, unknown> | undefined {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : undefined;
}

function text(value: unknown, limit = 255): string | undefined {
  return typeof value === "string" ? value.replace(/[\x00-\x1f\x7f]/g, "").slice(0, limit) || undefined : undefined;
}

/** Reconstruct stored envelopes: never persist arbitrary form fields or storage additions. */
function safePayload(input: unknown, channel: Entry["channel"]): Payload | undefined {
  const value = record(input);
  if (!value || typeof value.eventId !== "string" || !UUID.test(value.eventId)
    || typeof value.sessionId !== "string" || !UUID.test(value.sessionId)
    || typeof value.page !== "string" || !value.page.startsWith("/") || value.page.startsWith("//")
    || typeof value.clientTimestamp !== "string" || !Number.isFinite(Date.parse(value.clientTimestamp))) return;
  const payload: Record<string, unknown> = {
    eventId: value.eventId,
    sessionId: value.sessionId,
    page: value.page.split(/[?#]/)[0].slice(0, 512),
    clientTimestamp: value.clientTimestamp,
  };
  for (const field of ["phone", "trackingId", "yclid"]) {
    const label = text(value[field]);
    if (label) payload[field] = label;
  }
  const utm = record(value.utm);
  if (utm) {
    payload.utm = Object.fromEntries(["source", "medium", "campaign", "content", "term"]
      .map((key) => [key, text(utm[key])]).filter(([, label]) => label));
  }
  if (typeof value.referrer === "string") {
    try {
      const url = new URL(value.referrer);
      if (["http:", "https:"].includes(url.protocol)) payload.referrer = `${url.origin}${url.pathname}`.slice(0, 2048);
    } catch { /* Ignore malformed stored attribution. */ }
  }
  if (channel === "phone") {
    if (!payload.phone || !payload.trackingId) return;
  } else {
    if (!["page_view", "call_outcome", "callback_open"].includes(String(value.type))) return;
    payload.type = value.type;
    if (value.type === "call_outcome") {
      if (!["connected", "not_connected"].includes(String(value.outcome))) return;
      payload.outcome = value.outcome;
    }
    if (typeof value.sourceEventId === "string" && UUID.test(value.sourceEventId)) payload.sourceEventId = value.sourceEventId;
  }
  return payload as Payload;
}

function persist() {
  queue = queue.filter((entry) => Date.now() - entry.createdAt < TTL).slice(-LIMIT);
  try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(queue)); } catch { /* Memory queue still works. */ }
}

function schedule() {
  if (timer !== undefined) window.clearTimeout(timer);
  timer = undefined;
  const pending = queue.filter((entry) => !inFlight.has(entry.payload.eventId));
  if (!pending.length || inFlight.size >= 2) return;
  const delay = Math.max(100, Math.min(...pending.map((entry) => entry.nextAttempt)) - Date.now());
  timer = window.setTimeout(flush, delay);
}

function retryDelay(response?: Response): number {
  const retryAfter = response?.headers?.get("Retry-After");
  if (!retryAfter) return 0;
  const seconds = Number(retryAfter);
  const milliseconds = Number.isFinite(seconds) ? seconds * 1000 : Date.parse(retryAfter) - Date.now();
  return Number.isFinite(milliseconds) ? Math.max(0, Math.min(milliseconds, 60 * 60 * 1000)) : 0;
}

async function deliver(entry: Entry, url: string) {
  const id = entry.payload.eventId;
  inFlight.add(id);
  entry.attempts++;
  // Persist the backoff before a request: reloading cannot cause an immediate retry storm.
  entry.nextAttempt = Date.now() + Math.min(300_000, 2000 * 2 ** Math.min(entry.attempts - 1, 8)) + Math.floor(Math.random() * 1000);
  persist();
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 8000);
  const context = { url, origin: window.location.origin, eventId: id, trackingId: entry.payload.trackingId, page: entry.payload.page };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify(entry.payload),
      credentials: "omit",
      keepalive: true,
      signal: controller.signal,
    });
    const result: unknown = await response.json().catch(() => undefined);
    const body = record(result);
    if (response.ok && body?.accepted === true && body.eventId === id) {
      queue = queue.filter((item) => item.payload.eventId !== id);
      console.info("[analytics] Событие принято API", { ...context, status: response.status });
    } else {
      if (PERMANENT.has(response.status)) queue = queue.filter((item) => item.payload.eventId !== id);
      entry.retryAfter = Date.now() + retryDelay(response);
      entry.nextAttempt = Math.max(entry.nextAttempt, entry.retryAfter);
      console.error("[analytics] API не подтвердил приём события", {
        ...context, status: response.status, kind: response.ok ? "invalid_response" : "http",
        serverError: text(body?.error, 300), responseFormat: result === undefined ? "empty_or_non_json" : "json",
      });
    }
  } catch (error) {
    console.error("[analytics] Ошибка сети или CORS: HTTP-ответ недоступен", {
      ...context, kind: "network_or_cors", message: text(error instanceof Error ? error.message : String(error), 300),
    });
  } finally {
    window.clearTimeout(timeout);
    inFlight.delete(id);
    persist();
    flush();
  }
}

function flush() {
  if (timer !== undefined) window.clearTimeout(timer);
  timer = undefined;
  persist();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
  if (!apiUrl) return;
  for (const entry of queue) {
    if (inFlight.size >= 2) break;
    if (entry.nextAttempt > Date.now() || inFlight.has(entry.payload.eventId)) continue;
    void deliver(entry, `${apiUrl}${entry.channel === "phone" ? "/call-clicks" : "/v1/medtaxi/events"}`);
  }
  schedule();
}

export function initializeAnalyticsQueue(): void {
  if (initialized) return;
  initialized = true;
  try {
    const saved: unknown = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
    if (Array.isArray(saved)) {
      for (const raw of saved.slice(-LIMIT)) {
        const item = record(raw);
        if (!item || (item.channel !== "phone" && item.channel !== "event")) continue;
        const payload = safePayload(item.payload, item.channel);
        if (!payload || typeof item.createdAt !== "number" || !Number.isFinite(item.createdAt)
          || item.createdAt > Date.now() || Date.now() - item.createdAt >= TTL) continue;
        queue.push({ channel: item.channel, payload, createdAt: item.createdAt,
          attempts: typeof item.attempts === "number" && Number.isFinite(item.attempts) ? Math.max(0, Math.min(1000, item.attempts)) : 0,
          retryAfter: typeof item.retryAfter === "number" && Number.isFinite(item.retryAfter) ? Math.min(item.retryAfter, Date.now() + 3600_000) : undefined,
          nextAttempt: typeof item.nextAttempt === "number" && Number.isFinite(item.nextAttempt)
            ? Math.min(item.nextAttempt, Date.now() + 3600_000) : 0 });
      }
    }
  } catch { /* Restricted storage must not affect navigation. */ }
  window.addEventListener("online", () => {
    for (const entry of queue) entry.nextAttempt = Math.max(entry.retryAfter ?? 0, Math.min(entry.nextAttempt, Date.now() + 1000));
    schedule();
  });
  flush();
}

/** Only analytics envelopes go here; contact form data is never queued in browser storage. */
export function enqueueAnalytics(channel: Entry["channel"], value: Payload): void {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
  if (!apiUrl) {
    console.error("[analytics] Не задан NEXT_PUBLIC_API_URL", { kind: "configuration" });
    return;
  }
  const payload = safePayload(value, channel);
  if (!payload) return;
  initializeAnalyticsQueue();
  if (queue.some((entry) => entry.payload.eventId === payload.eventId)) return;
  queue.push({ channel, payload, createdAt: Date.now(), attempts: 0, nextAttempt: 0 });
  persist();
  flush();
}
