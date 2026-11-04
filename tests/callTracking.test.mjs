import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { randomUUID, webcrypto } from "node:crypto";
import { test } from "node:test";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";
import { moduleLoader } from "./helpers/componentHarness.mjs";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const require = createRequire(import.meta.url);

// Используем установленный TypeScript: не добавляем test runner или browser SDK.
function loadModule(path, globals = {}) {
  if (!globals.require) return moduleLoader({ globals }).load(path);
  const code = ts.transpileModule(readFileSync(path, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, require, ...globals });
  return exports;
}

function browser({ storage = new Map(), fetchImpl, crypto = webcrypto, env = {} } = {}) {
  const requests = [];
  const logs = { info: [], warn: [], error: [] };
  const location = {
    origin: "https://medtaxi-evp.ru",
    pathname: "/donetsk", search: "?utm_source=yandex&utm_campaign=donetsk&yclid=123",
  };
  let nextTimer = 0;
  const timers = new Map();
  const globals = {
    URL, URLSearchParams, crypto, AbortController,
    process: { env: { NEXT_PUBLIC_API_URL: "http://localhost:3235/api", NODE_ENV: "development", ...env } },
    window: { location, addEventListener() {},
      setTimeout(callback, delay) { timers.set(++nextTimer, { callback, delay }); return nextTimer; },
      clearTimeout(id) { timers.delete(id); } }, document: { referrer: "https://yandex.ru/" },
    sessionStorage: {
      getItem: (key) => storage.get(key) || null,
      setItem: (key, value) => storage.set(key, value),
    },
    console: Object.fromEntries(Object.keys(logs).map((level) => [level, (...args) => logs[level].push(args)])),
    fetch: (url, options) => {
      const request = { url, ...options, payload: JSON.parse(options.body) };
      requests.push(request);
      return fetchImpl ? fetchImpl(request) : Promise.resolve(Response.json({
        accepted: true, eventId: request.payload.eventId,
      }, { status: 202 }));
    },
  };
  return { requests, logs, location, globals, api: loadModule("app/lib/callTracking.ts", globals) };
}

test("повторная инициализация сохраняет sessionId, каждый клик получает свой eventId", () => {
  const { api, requests } = browser();
  api.initializeCallTracking();
  api.trackPhoneClick("hero", "+79895052785");
  api.initializeCallTracking();
  api.trackPhoneClick("footer", "+79895052785");
  assert.equal(requests.length, 2);
  assert.equal(requests[0].payload.sessionId, requests[1].payload.sessionId);
  assert.notEqual(requests[0].payload.eventId, requests[1].payload.eventId);
});

test("initial attribution сохраняется после перехода и перезагрузки другой страницы", () => {
  const storage = new Map();
  browser({ storage }).api.initializeCallTracking();
  const { api, requests, location } = browser({ storage });
  location.pathname = "/prices";
  location.search = "";
  api.initializeCallTracking();
  api.trackPhoneClick("price_block", "+79895052785");
  const event = requests[0].payload;
  assert.equal(event.page, "/prices");
  assert.equal(event.utm.source, "yandex");
  assert.equal(event.utm.campaign, "donetsk");
  assert.equal(event.yclid, "123");
});

test("порча storage не подменяет данные клика и не препятствует отправке", () => {
  const storage = new Map([["medtax_call_session_v1", JSON.stringify({
    sessionId: randomUUID(), eventId: "wrong", trackingId: "wrong", phone: "wrong",
    page: "/wrong", utm: { source: {}, arbitrary: "wrong" }, yclid: { bad: true },
  })]]);
  const { api, requests } = browser({ storage });
  api.trackPhoneClick("hero", "+79895052785");
  const event = requests[0].payload;
  assert.equal(event.page, "/donetsk");
  assert.equal(event.phone, "+79895052785");
  assert.equal(event.trackingId, "hero");
  assert.notEqual(event.eventId, "wrong");
  assert.deepEqual(event.utm, {});
  assert.equal(event.yclid, undefined);
});

test("зависший запрос не возвращает Promise вызывающему и использует keepalive", () => {
  const { api, requests } = browser({ fetchImpl: () => new Promise(() => {}) });
  assert.equal(api.trackPhoneClick("hero", "+79895052785"), undefined);
  assert.equal(requests[0].url, "http://localhost:3235/api/call-clicks");
  assert.equal(requests[0].keepalive, true);
  assert.equal(requests[0].credentials, "omit");
  assert.equal(requests[0].headers["Content-Type"], "text/plain;charset=UTF-8");
});

test("HTTP 500, offline и синхронная ошибка fetch не выходят из функции", async () => {
  for (const fetchImpl of [
    () => Promise.resolve(Response.json({ error: "Internal server error" }, { status: 500 })),
    () => Promise.reject(new Error("offline")),
    () => { throw new Error("fetch unavailable"); },
  ]) {
    const { api } = browser({ fetchImpl });
    assert.doesNotThrow(() => api.trackPhoneClick("hero", "+79895052785"));
  }
  // Даём rejected Promise пройти через catch; unhandled rejection провалит node:test.
  await new Promise(setImmediate);
});

test("production: подтверждение API логируется с eventId и Origin без payload", async () => {
  const { api, requests, logs } = browser({ env: { NODE_ENV: "production" } });
  assert.equal(api.trackPhoneClick("hero", "+79895052785"), undefined);
  await new Promise(setImmediate);

  assert.equal(logs.info.length, 1);
  assert.match(logs.info[0][0], /Событие принято API/);
  assert.equal(logs.info[0][1].status, 202);
  assert.equal(logs.info[0][1].eventId, requests[0].payload.eventId);
  assert.equal(logs.info[0][1].origin, "https://medtaxi-evp.ru");
  assert.equal(logs.error.length, 0);
  const output = JSON.stringify(logs);
  for (const field of ["phone", "sessionId", "utm", "yclid", "referrer"]) {
    assert.ok(!output.includes(field));
  }
  assert.ok(!output.includes("+79895052785"));
});

test("production: HTTP 403/429/500 логируются как ошибки с ответом сервера", async () => {
  for (const status of [403, 429, 500]) {
    const { api, requests, logs } = browser({
      env: { NODE_ENV: "production" },
      fetchImpl: () => Promise.resolve(Response.json({ error: "Origin not allowed" }, { status })),
    });
    api.trackPhoneClick("hero", "+79895052785");
    await new Promise(setImmediate);
    assert.equal(requests.length, 1);
    assert.equal(logs.info.length, 0);
    assert.equal(logs.error.length, 1);
    const details = logs.error[0][1];
    assert.equal(details.kind, "http");
    assert.equal(details.status, status);
    assert.equal(details.serverError, "Origin not allowed");
    assert.equal(details.origin, "https://medtaxi-evp.ru");
    assert.equal(details.eventId, requests[0].payload.eventId);
  }
});

test("пустой или HTML-ответ с ошибкой сохраняет статус и не логирует HTML", async () => {
  for (const body of [null, "<html>Bad gateway</html>"]) {
    const { api, logs } = browser({
      env: { NODE_ENV: "production" },
      fetchImpl: () => Promise.resolve(new Response(body, { status: 502 })),
    });
    api.trackPhoneClick("hero", "+79895052785");
    await new Promise(setImmediate);
    assert.equal(logs.error.length, 1);
    assert.equal(logs.error[0][1].status, 502);
    assert.equal(logs.error[0][1].kind, "http");
    assert.equal(logs.error[0][1].responseFormat, "empty_or_non_json");
    assert.ok(!JSON.stringify(logs).includes("<html>"));
  }
});

test("успешный HTTP без accepted:true и совпадающего eventId не считается приёмом", async () => {
  for (const body of [null, {}, { accepted: false }, { accepted: true, eventId: randomUUID() }]) {
    const { api, logs } = browser({
      env: { NODE_ENV: "production" },
      fetchImpl: () => Promise.resolve(Response.json(body, { status: 202 })),
    });
    api.trackPhoneClick("hero", "+79895052785");
    await new Promise(setImmediate);
    assert.equal(logs.info.length, 0);
    assert.equal(logs.error.length, 1);
    assert.equal(logs.error[0][1].kind, "invalid_response");
    assert.equal(logs.error[0][1].status, 202);
  }
});

test("production: ошибка fetch/CORS логируется без выдуманного HTTP-статуса", async () => {
  const { api, requests, logs } = browser({
    env: { NODE_ENV: "production" },
    fetchImpl: () => Promise.reject(new TypeError("Failed to fetch")),
  });
  assert.equal(api.trackPhoneClick("hero", "+79895052785"), undefined);
  await new Promise(setImmediate);
  assert.equal(requests.length, 1);
  assert.equal(logs.info.length, 0);
  assert.equal(logs.error.length, 1);
  const details = logs.error[0][1];
  assert.equal(details.kind, "network_or_cors");
  assert.equal(details.status, undefined);
  assert.equal(details.eventId, requests[0].payload.eventId);
  assert.match(details.message, /Failed to fetch/);
});

test("production: отсутствие API URL и синхронный сбой логируются, не мешая звонку", () => {
  const missing = browser({ env: { NODE_ENV: "production", NEXT_PUBLIC_API_URL: "" } });
  assert.doesNotThrow(() => missing.api.trackPhoneClick("hero", "+79895052785"));
  assert.equal(missing.requests.length, 0);
  assert.equal(missing.logs.error[0][1].kind, "configuration");

  const broken = browser({
    env: { NODE_ENV: "production" },
    fetchImpl() { throw new Error("fetch unavailable"); },
  });
  assert.doesNotThrow(() => broken.api.trackPhoneClick("hero", "+79895052785"));
  assert.equal(broken.logs.error[0][1].kind, "network_or_cors");
});

test("запрет storage сохраняет сессию в памяти, fallback UUID остаётся валидным", () => {
  const { globals, requests } = browser({
    crypto: { getRandomValues: (bytes) => webcrypto.getRandomValues(bytes) },
  });
  globals.sessionStorage = {
    getItem() { throw new Error("storage disabled"); },
    setItem() { throw new Error("storage disabled"); },
  };
  const api = loadModule("app/lib/callTracking.ts", globals);
  api.initializeCallTracking();
  api.trackPhoneClick("hero", "+79895052785");
  api.initializeCallTracking();
  api.trackPhoneClick("footer", "+79895052785");
  assert.equal(requests[0].payload.sessionId, requests[1].payload.sessionId);
  assert.match(requests[0].payload.eventId, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
});

test("ссылка рендерится сервером как a tel без JavaScript", () => {
  const { TrackedPhoneLink } = loadModule("app/components/tracking/TrackedPhoneLink.tsx");
  const html = renderToStaticMarkup(React.createElement(TrackedPhoneLink, {
    phone: "+79895052785", trackingId: "hero", className: "button", "aria-label": "Позвонить",
  }, "Позвонить"));
  assert.match(html, /href="tel:\+79895052785"/);
  assert.match(html, /data-call-tracking-id="hero"/);
  assert.match(html, /class="button"/);
  assert.match(html, /aria-label="Позвонить"/);
});

test("listener не отменяет клик и снимается при повторном effect в Strict Mode", () => {
  const listeners = new Set();
  const clicks = [];
  let runEffect;
  const link = {
    dataset: { callTrackingId: "hero" },
    getAttribute: () => "tel:+79895052785",
  };
  class Element {
    closest() { return link; }
  }
  const { PhoneClickTracking } = loadModule("app/components/tracking/PhoneClickTracking.tsx", {
    Element,
    require: (name) => {
      if (name === "react") return { useEffect: (effect) => { runEffect = effect; } };
      return {
        initializeCallTracking() {},
        trackPhoneClick: (...args) => clicks.push(args),
      };
    },
    document: {
      addEventListener: (name, listener, capture) => {
        assert.equal(name, "click");
        assert.equal(capture, true);
        listeners.add(listener);
      },
      removeEventListener: (name, listener, capture) => {
        assert.equal(name, "click");
        assert.equal(capture, true);
        listeners.delete(listener);
      },
    },
  });
  PhoneClickTracking();
  const cleanup = runEffect();
  cleanup();
  assert.equal(listeners.size, 0);
  const cleanupAgain = runEffect();
  assert.equal(listeners.size, 1);

  // Любая попытка отменить нативное действие ссылки сразу провалит тест.
  const event = { target: new Element(), preventDefault: () => assert.fail("Клик отменён") };
  for (const listener of listeners) listener(event);
  assert.deepEqual(clicks, [["hero", "+79895052785", event]]);
  cleanupAgain();
  assert.equal(listeners.size, 0);
});

test("заблокированная телефонная ссылка не отправляет событие, после разблокировки tracking работает", () => {
  const { api, requests } = browser();
  let runEffect;
  let listener;
  let disabled = "true";
  const link = {
    dataset: { callTrackingId: "contact_modal_phone" },
    getAttribute: (name) => name === "aria-disabled" ? disabled : name === "href" ? "tel:+79490676701" : null,
  };
  class Element {
    closest() { return link; }
  }
  const { PhoneClickTracking } = loadModule("app/components/tracking/PhoneClickTracking.tsx", {
    Element,
    require: (name) => name === "react" ? { useEffect: (effect) => { runEffect = effect; } } : api,
    document: {
      addEventListener: (_name, callback) => { listener = callback; },
      removeEventListener() {},
    },
  });
  PhoneClickTracking();
  const cleanup = runEffect();
  const event = { target: new Element(), preventDefault: () => assert.fail("Клик отменён") };

  listener(event);
  assert.equal(requests.length, 0);

  for (const value of ["false", null]) {
    disabled = value;
    listener({ ...event });
  }
  assert.equal(requests.length, 2);
  for (const request of requests) {
    assert.equal(request.payload.phone, "+79490676701");
    assert.equal(request.payload.trackingId, "contact_modal_phone");
  }
  cleanup();
});
