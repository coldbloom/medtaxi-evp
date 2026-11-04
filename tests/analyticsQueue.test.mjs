import assert from "node:assert/strict";
import { test } from "node:test";
import { webcrypto, randomUUID } from "node:crypto";
import { eventTarget, hookRenderer, moduleLoader } from "./helpers/componentHarness.mjs";

const key = "medtax_analytics_queue_v1";
const tick = () => new Promise(setImmediate);
function browser({ storage = new Map(), start = 1_800_000_000_000, fetchResponse, mocks = {} } = {}) {
  let now = start;
  let sequence = 0;
  const timers = new Map();
  const requests = [];
  const window = {
    ...eventTarget(), location: new URL("https://medtaxi-evp.ru/donetsk?utm_source=yandex#hero"),
    setTimeout(callback, delay) { const id = ++sequence; timers.set(id, { at: now + delay, callback }); return id; },
    clearTimeout: (id) => timers.delete(id),
  };
  const document = {
    ...eventTarget(), title: "Медтакси", referrer: "https://yandex.ru/search/?text=private#secret",
    visibilityState: "visible", hasFocus: () => true, querySelector: () => null,
    dispatchEvent(event) { document.dispatch(event.type, event); },
  };
  class Element {
    closest() { return { dataset: { callTrackingId: "hero" }, getAttribute: (name) => name === "href" ? "tel:+79490676701" : null }; }
  }
  class FakeDate extends Date {
    constructor(...args) { super(...(args.length ? args : [now])); }
    static now() { return now; }
  }
  class CustomEvent { constructor(type, options) { this.type = type; this.detail = options.detail; } }
  const loader = moduleLoader({ mocks, globals: {
    window, document, Element, CustomEvent, crypto: webcrypto, Date: FakeDate,
    process: { env: { NEXT_PUBLIC_API_URL: "/api" } },
    console: { info() {}, error() {} },
    setTimeout: window.setTimeout, clearTimeout: window.clearTimeout,
    sessionStorage: { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) },
    fetch(url, options) {
      const request = { url, options, payload: JSON.parse(options.body) };
      requests.push(request);
      return fetchResponse ? fetchResponse(request, requests.length) : Promise.resolve(Response.json({ accepted: true, eventId: request.payload.eventId }, { status: 202 }));
    },
  } });
  return {
    loader, window, document, requests, storage, timers, Element,
    queue: () => JSON.parse(storage.get(key) || "[]"),
    now: () => now,
    async advance(ms) {
      const until = now + ms;
      for (let attempts = 0; attempts < 500; attempts++) {
        const next = [...timers.entries()].filter(([, timer]) => timer.at <= until).sort((a, b) => a[1].at - b[1].at)[0];
        if (!next) { now = until; await tick(); return; }
        const [id, timer] = next; now = timer.at; timers.delete(id); timer.callback(); await tick();
      }
      assert.fail("Unexpected timer loop");
    },
  };
}

test("analytics survives an uncertain response and retries the exact UUID after backoff", async () => {
  const page = browser({ fetchResponse: (request, attempt) => Promise.resolve(attempt === 1
    ? Response.json({ error: "Unavailable" }, { status: 503 })
    : Response.json({ accepted: true, eventId: request.payload.eventId }, { status: 202 })) });
  const api = page.loader.load("app/lib/callTracking.ts");
  api.trackPhoneClick("hero", "+79490676701");
  await tick();
  assert.equal(page.queue().length, 1);
  assert.equal(page.requests.length, 1);
  await page.advance(1000);
  assert.equal(page.requests.length, 1);
  await page.advance(3000);
  assert.equal(page.requests.length, 2);
  assert.deepEqual(page.requests[0].payload, page.requests[1].payload);
  assert.equal(page.queue().length, 0);
  assert.equal(page.timers.size, 0);
});

test("reload restores pending events while a success-shaped wrong acknowledgement keeps them queued", async () => {
  const storage = new Map();
  const first = browser({ storage, fetchResponse: () => Promise.resolve(Response.json({ accepted: true, eventId: randomUUID() }, { status: 202 })) });
  first.loader.load("app/lib/siteAnalytics.ts").trackSitePageView("/donetsk");
  await tick();
  const id = first.requests[0].payload.eventId;
  assert.equal(first.queue()[0].payload.eventId, id);
  const second = browser({ storage, start: first.now() + 500 });
  second.loader.load("app/lib/callTracking.ts").initializeCallTracking();
  assert.equal(second.requests.length, 0);
  await second.advance(4000);
  assert.equal(second.requests.length, 1);
  assert.equal(second.requests[0].payload.eventId, id);
  assert.equal(second.queue().length, 0);
});

test("online retries and Retry-After do not create duplicate in-flight deliveries", async () => {
  const page = browser({ fetchResponse: (request, attempt) => Promise.resolve(attempt === 1
    ? Response.json({}, { status: 429, headers: { "Retry-After": "30" } })
    : Response.json({ accepted: true, eventId: request.payload.eventId })) });
  page.loader.load("app/lib/siteAnalytics.ts").trackSiteEvent("callback_open");
  await tick();
  page.window.dispatch("online");
  await page.advance(10_000);
  assert.equal(page.requests.length, 1);
  await page.advance(21_000);
  assert.equal(page.requests.length, 2);
  assert.equal(page.queue().length, 0);
});

test("permanent rejection removes analytics; a network failure remains available for an online retry", async () => {
  for (const status of [400, 403, 409, 413]) {
    const page = browser({ fetchResponse: () => Promise.resolve(Response.json({}, { status })) });
    page.loader.load("app/lib/siteAnalytics.ts").trackSiteEvent("callback_open");
    await tick();
    assert.equal(page.queue().length, 0, String(status));
    assert.equal(page.timers.size, 0);
  }
  const page = browser({ fetchResponse: (request, attempt) => attempt === 1 ? Promise.reject(new Error("offline"))
    : Promise.resolve(Response.json({ accepted: true, eventId: request.payload.eventId })) });
  page.loader.load("app/lib/siteAnalytics.ts").trackSiteEvent("callback_open");
  await tick();
  page.window.dispatch("online");
  await page.advance(1500);
  assert.equal(page.requests.length, 2);
  assert.equal(page.queue().length, 0);
});

test("queue is bounded, expires after a day and strips contact fields and sensitive URL parts", async () => {
  const page = browser({ fetchResponse: () => new Promise(() => {}) });
  const api = page.loader.load("app/lib/analyticsQueue.ts");
  for (let i = 0; i < 110; i++) api.enqueueAnalytics("event", {
    eventId: randomUUID(), sessionId: randomUUID(), type: "page_view", page: "/donetsk?phone=secret#name",
    clientTimestamp: new Date(page.now()).toISOString(), name: "secret-name", message: "secret-message",
    referrer: "https://name:password@example.test/landing?phone=secret#secret",
  });
  assert.equal(page.queue().length, 100);
  assert.equal(page.requests.length, 2, "concurrency stays bounded while transport hangs");
  const serialized = JSON.stringify(page.queue());
  for (const secret of ["secret", "password", "name:"]) assert.ok(!serialized.includes(secret));
  const restored = browser({ storage: page.storage, start: page.now() + 24 * 60 * 60 * 1000 + 1 });
  restored.loader.load("app/lib/callTracking.ts").initializeCallTracking();
  await tick();
  assert.equal(restored.requests.length, 0);
  assert.equal(restored.queue().length, 0);
});

test("first-touch attribution is sanitized and own page views survive remounts and track back navigation", async () => {
  const page = browser();
  const api = page.loader.load("app/lib/siteAnalytics.ts");
  api.trackSitePageView("/donetsk?phone=secret");
  api.trackSitePageView("/donetsk?phone=secret");
  api.trackSitePageView("/donetsk/moskva");
  api.trackSitePageView("/donetsk?phone=secret");
  await tick();
  await tick();
  assert.equal(page.requests.length, 3);
  assert.equal(new Set(page.requests.map((request) => request.payload.eventId)).size, 3);
  assert.equal(new Set(page.requests.map((request) => request.payload.sessionId)).size, 1);
  for (const { payload } of page.requests) {
    assert.equal(payload.referrer, "https://yandex.ru/search/");
    assert.equal(payload.utm.source, "yandex");
    assert.ok(!payload.page.includes("?"));
  }
});

test("phone feedback correlates to the same click UUID whichever capture listener runs first", async () => {
  for (const trackingFirst of [true, false]) {
    const page = browser();
    const tracking = page.loader.load("app/lib/callTracking.ts");
    const feedback = page.loader.load("app/lib/callFeedback.ts");
    let opened;
    const cleanup = feedback.listenForCallFeedback((context) => { opened = context; }, () => {});
    const click = { type: "click", button: 0, target: new page.Element(), preventDefault: () => assert.fail("native call blocked") };
    if (trackingFirst) tracking.trackPhoneClick("hero", "+79490676701", click);
    page.document.dispatchEvent(click);
    if (!trackingFirst) tracking.trackPhoneClick("hero", "+79490676701", click);
    await tick();
    await page.advance(15_000);
    assert.equal(page.requests.length, 1);
    assert.equal(opened.sourceEventId, page.requests[0].payload.eventId);
    assert.equal(opened.trackingId, "hero");
    cleanup();
  }
});

test("a failing Yandex adapter does not suppress independent pageviews or duplicate Strict Mode effects", async () => {
  const renderer = hookRenderer();
  let page;
  page = browser({ mocks: {
    react: renderer.react,
    "next/navigation": { usePathname: () => page.window.location.pathname, useSearchParams: () => page.window.location.searchParams },
    "@/app/lib/metrika": { recordMetrikaPageView() { throw new Error("third party blocked"); } },
  } });
  const { MetrikaPageViews } = page.loader.load("app/components/tracking/MetrikaPageViews.tsx");
  renderer.render(MetrikaPageViews, {});
  renderer.unmount();
  renderer.render(MetrikaPageViews, {});
  await tick();
  assert.equal(page.requests.length, 1);
  assert.equal(page.requests[0].payload.type, "page_view");
});
