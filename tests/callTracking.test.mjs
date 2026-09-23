import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { randomUUID, webcrypto } from "node:crypto";
import { test } from "node:test";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const require = createRequire(import.meta.url);

// Используем установленный TypeScript: не добавляем test runner или browser SDK.
function loadModule(path, globals = {}) {
  const code = ts.transpileModule(readFileSync(path, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, require, ...globals });
  return exports;
}

function browser({ storage = new Map(), fetchImpl, crypto = webcrypto } = {}) {
  const requests = [];
  const location = { pathname: "/donetsk", search: "?utm_source=yandex&utm_campaign=donetsk&yclid=123" };
  const globals = {
    URLSearchParams, crypto,
    process: { env: { NEXT_PUBLIC_API_URL: "http://localhost:3235/api", NODE_ENV: "development" } },
    window: { location }, document: { referrer: "https://yandex.ru/" },
    sessionStorage: {
      getItem: (key) => storage.get(key) || null,
      setItem: (key, value) => storage.set(key, value),
    },
    console: { info() {}, warn() {} },
    fetch: (url, options) => {
      requests.push({ url, ...options, payload: JSON.parse(options.body) });
      return fetchImpl ? fetchImpl() : Promise.resolve({ status: 202 });
    },
  };
  return { requests, location, globals, api: loadModule("app/lib/callTracking.ts", globals) };
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
    () => Promise.resolve({ status: 500 }),
    () => Promise.reject(new Error("offline")),
    () => { throw new Error("fetch unavailable"); },
  ]) {
    const { api } = browser({ fetchImpl });
    assert.doesNotThrow(() => api.trackPhoneClick("hero", "+79895052785"));
  }
  // Даём rejected Promise пройти через catch; unhandled rejection провалит node:test.
  await new Promise(setImmediate);
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
    require: (name) => name === "react"
      ? { useEffect: (effect) => { runEffect = effect; } }
      : {
        initializeCallTracking() {},
        trackPhoneClick: (...args) => clicks.push(args),
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
  assert.deepEqual(clicks, [["hero", "+79895052785"]]);
  cleanupAgain();
  assert.equal(listeners.size, 0);
});
