import { createId, getSession, type CallClickPayload } from "./trackingSession";
import { enqueueAnalytics, initializeAnalyticsQueue } from "./analyticsQueue";
import { phoneClickIdentity } from "./phoneClickIdentity";

export type { CallClickPayload, CallClickUtm } from "./trackingSession";

export function initializeCallTracking(): void {
  try {
    getSession();
    initializeAnalyticsQueue();
  } catch { /* Storage or analytics must never prevent navigation or calls. */ }
}

/** Record an intent to call; an actual conversation cannot be inferred by the browser. */
export function trackPhoneClick(trackingId: string, phone: string, click?: MouseEvent): void {
  try {
    const payload: CallClickPayload = {
      ...getSession(),
      eventId: click ? phoneClickIdentity(click).eventId : createId(),
      trackingId,
      phone,
      page: window.location.pathname,
      clientTimestamp: new Date().toISOString(),
    };
    enqueueAnalytics("phone", payload);
  } catch {
    console.error("[call-click] Ошибка подготовки запроса", { kind: "preparation" });
  }
}
