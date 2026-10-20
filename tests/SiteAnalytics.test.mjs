import assert from "node:assert/strict";
import { test } from "node:test";
import vm from "node:vm";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { hookRenderer, moduleLoader } from "./helpers/componentHarness.mjs";

const counterId = 108491610;
const tagUrl = `https://mc.yandex.ru/metrika/tag.js?id=${counterId}`;
const Script = () => null;
const loader = moduleLoader({
  mocks: {
    "next/script": { __esModule: true, default: Script },
    "./tracking/MetrikaPageViews": { MetrikaPageViews: () => null },
  },
});
const { SiteAnalytics } = loader.load("app/components/SiteAnalytics.tsx");

function bootstrap() {
  const children = React.Children.toArray(SiteAnalytics().props.children);
  const script = children.find((child) => child.type === Script);
  assert.ok(script, "Analytics must be loaded through next/script");
  return script.props;
}

function browser({ pathname = "/", readyState = "complete", idle = true, existing = [] } = {}) {
  const scripts = [...existing];
  const appended = [];
  const listeners = [];
  const idleCallbacks = [];
  const timers = [];
  const document = {
    readyState,
    referrer: "https://yandex.ru/search/?text=medtaxi",
    title: "Медтакси",
    scripts,
    head: { appendChild: (script) => { scripts.push(script); appended.push(script); } },
    getElementById: (id) => scripts.find((script) => script.id === id) || null,
    createElement: (name) => { assert.equal(name, "script"); return {}; },
  };
  const window = {
    location: new URL(`https://medtaxi-evp.ru${pathname}?utm_source=yandex`),
    addEventListener: (name, callback, options) => listeners.push({ name, callback, options }),
    setTimeout: (callback, delay) => timers.push({ callback, delay }),
  };
  if (idle) window.requestIdleCallback = (callback, options) => idleCallbacks.push({ callback, options });
  const globals = { window, document, URL, URLSearchParams };
  const context = vm.createContext(globals);
  const renderer = hookRenderer();
  const clientLoader = moduleLoader({
    globals,
    mocks: {
      react: renderer.react,
      "next/navigation": {
        usePathname: () => window.location.pathname,
        useSearchParams: () => window.location.searchParams,
      },
    },
  });
  const { MetrikaPageViews } = clientLoader.load("app/components/tracking/MetrikaPageViews.tsx");
  const { trackDonetskGoal } = clientLoader.load("app/donetsk/analytics.ts");
  return {
    appended, listeners, idleCallbacks, timers, window, document, trackDonetskGoal,
    run: () => vm.runInContext(bootstrap().children, context),
    mount: () => renderer.render(MetrikaPageViews, {}),
    unmount: renderer.unmount,
    navigate(path, title) {
      window.location = new URL(path, window.location.origin);
      document.title = title;
      renderer.render(MetrikaPageViews, {});
    },
    queue: () => Array.from(window.ym?.a || [], (args) => JSON.parse(JSON.stringify(Array.from(args)))),
  };
}

test("analytics renders afterInteractive, a noscript pixel and an isolated empty Suspense leaf", () => {
  const props = bootstrap();
  assert.equal(props.id, "yandex-metrika");
  assert.equal(props.strategy, "afterInteractive");
  const children = React.Children.toArray(SiteAnalytics().props.children);
  assert.ok(children.some((child) => child.type === React.Suspense && child.props.fallback === null));
  const html = renderToStaticMarkup(React.createElement(SiteAnalytics));
  assert.match(html, /<noscript>[\s\S]*<img[^>]+src="https:\/\/mc\.yandex\.ru\/watch\/108491610"[\s\S]*<\/noscript>/);
});

test("ordinary routes load an async tag and send exactly one explicitly owned initial view", () => {
  const page = browser({ readyState: "interactive" });
  page.run();
  page.mount();
  assert.equal(page.appended.length, 1);
  assert.equal(page.appended[0].src, tagUrl);
  assert.equal(page.appended[0].async, true);
  assert.equal(page.listeners.length, 0);
  assert.equal(page.idleCallbacks.length, 0);
  assert.deepEqual(page.queue(), [
    [counterId, "init", {
      defer: true, ssr: true, ecommerce: "dataLayer",
      referrer: page.document.referrer, url: page.window.location.href,
      webvisor: true, clickmap: true, accurateTrackBounce: true, trackLinks: true,
    }],
    [counterId, "hit", page.window.location.href, {
      title: "Медтакси", referer: page.document.referrer,
    }],
  ]);
  assert.equal(typeof page.window.ym.l, "number");
});

test("Donetsk defers the tag until load and idle without losing a goal before the route effect", () => {
  for (const pathname of ["/donetsk", "/donetsk/"]) {
    const page = browser({ pathname, readyState: "interactive" });
    page.run();
    page.trackDonetskGoal("donetsk_phone_click", { cta_position: "hero" });
    page.mount();
    assert.equal(page.appended.length, 0);
    assert.equal(page.idleCallbacks.length, 0);
    assert.equal(page.listeners.length, 1);
    assert.equal(page.listeners[0].name, "load");
    assert.equal(page.listeners[0].options.once, true);
    page.listeners[0].callback();
    assert.equal(page.appended.length, 0);
    assert.equal(page.idleCallbacks.length, 1);
    assert.equal(page.idleCallbacks[0].options.timeout, 2000);
    page.idleCallbacks[0].callback();
    assert.equal(page.appended.length, 1);
    assert.deepEqual(page.queue().map((args) => args[1]), ["init", "reachGoal", "hit"]);
    assert.deepEqual(page.queue()[1], [counterId, "reachGoal", "donetsk_phone_click", {
      page: "/donetsk", cta_position: "hero",
    }]);
  }
});

test("a late bootstrap keeps the same initialized queue and preserves all queued navigation views", () => {
  const page = browser({ pathname: "/donetsk" });
  page.mount();
  const queue = page.window.ym;
  page.navigate("/donetsk/moskva", "Донецк — Москва");
  page.run();
  assert.equal(page.window.ym, queue);
  assert.deepEqual(page.queue().map((args) => args[1]), ["init", "hit", "hit"]);
  assert.equal(page.queue()[2][2], "https://medtaxi-evp.ru/donetsk/moskva");
  assert.equal(page.appended.length, 1);
});

test("goals before either bootstrap or route effect still follow a single counter initialization", () => {
  const page = browser({ pathname: "/donetsk" });
  page.trackDonetskGoal("donetsk_callback_open", { page: "/donetsk/moskva" });
  page.run();
  page.mount();
  assert.deepEqual(page.queue().map((args) => args[1]), ["init", "reachGoal", "hit"]);
  assert.deepEqual(page.queue()[1][3], { page: "/donetsk/moskva" });
});

test("Strict Mode effect remounts do not duplicate views, but back and forward do", () => {
  const page = browser();
  page.mount();
  page.unmount();
  page.mount();
  page.navigate("/donetsk", "Медтакси в Донецке");
  page.navigate("/donetsk/moskva", "Донецк — Москва");
  page.navigate("/donetsk", "Медтакси в Донецке");
  page.navigate("/donetsk/moskva", "Донецк — Москва");
  const hits = page.queue().filter((args) => args[1] === "hit");
  assert.equal(hits.length, 5);
  assert.equal(page.queue().filter((args) => args[1] === "init").length, 1);
  assert.deepEqual(hits.slice(1).map((args) => args[3]), [
    { title: "Медтакси в Донецке", referer: "https://medtaxi-evp.ru/?utm_source=yandex" },
    { title: "Донецк — Москва", referer: "https://medtaxi-evp.ru/donetsk" },
    { title: "Медтакси в Донецке", referer: "https://medtaxi-evp.ru/donetsk/moskva" },
    { title: "Донецк — Москва", referer: "https://medtaxi-evp.ru/donetsk" },
  ]);
});

test("committed search changes retain campaign attribution while anchor changes do not add hits", () => {
  const page = browser();
  page.mount();
  page.navigate("/donetsk?utm_source=yandex&utm_campaign=a%2Fb&yclid=123", "Донецк");
  page.navigate("/donetsk?utm_source=yandex&utm_campaign=a%2Fb&yclid=456", "Донецк");
  page.navigate("/donetsk?utm_source=yandex&utm_campaign=a%2Fb&yclid=456#prices", "Донецк");
  const hits = page.queue().filter((args) => args[1] === "hit");
  assert.equal(hits.length, 3);
  assert.equal(hits[1][2], "https://medtaxi-evp.ru/donetsk?utm_source=yandex&utm_campaign=a%2Fb&yclid=123");
  assert.equal(hits[2][2], "https://medtaxi-evp.ru/donetsk?utm_source=yandex&utm_campaign=a%2Fb&yclid=456");
});

test("views after the remote library replaces the stub use the live API without reinitialization", () => {
  const page = browser();
  page.mount();
  const calls = [];
  page.window.ym = (...args) => calls.push(args);
  page.navigate("/contacts", "Контакты");
  page.trackDonetskGoal("donetsk_social_click", { network: "telegram" });
  assert.deepEqual(calls.map((args) => args[1]), ["hit", "reachGoal"]);
  assert.equal(calls[0][2], "https://medtaxi-evp.ru/contacts");
});

test("an already-loaded Donetsk page schedules idle without another load event", () => {
  const page = browser({ pathname: "/donetsk" });
  page.run();
  assert.equal(page.listeners.length, 0);
  assert.equal(page.appended.length, 0);
  assert.equal(page.idleCallbacks.length, 1);
  page.idleCallbacks[0].callback();
  assert.equal(page.appended[0].src, tagUrl);
});

test("browsers without requestIdleCallback still load the tag after page load", () => {
  for (const readyState of ["interactive", "complete"]) {
    const page = browser({ pathname: "/donetsk", readyState, idle: false });
    page.run();
    if (readyState !== "complete") {
      assert.equal(page.timers.length, 0);
      page.listeners[0].callback();
    }
    assert.equal(page.appended.length, 0);
    assert.equal(page.timers.length, 1);
    assert.equal(page.timers[0].delay, 0);
    page.timers[0].callback();
    assert.equal(page.appended[0].src, tagUrl);
  }
});

test("a tag already present by id or exact URL is not inserted again", () => {
  for (const existing of [
    { id: "yandex-metrika-script", src: tagUrl },
    { id: "previous-metrika-tag", src: tagUrl },
  ]) {
    const page = browser({ existing: [existing] });
    page.run();
    assert.equal(page.appended.length, 0);
  }
});
