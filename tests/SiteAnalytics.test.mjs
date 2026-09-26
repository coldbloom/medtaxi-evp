import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const require = createRequire(import.meta.url);
const counterId = 108491610;
const tagUrl = `https://mc.yandex.ru/metrika/tag.js?id=${counterId}`;
const Script = () => null;
const exports = {};
const code = ts.transpileModule(readFileSync("app/components/SiteAnalytics.tsx", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;

vm.runInNewContext(code, {
  exports,
  require: (name) => name === "next/script" ? { default: Script } : require(name),
});

function bootstrap() {
  const children = React.Children.toArray(exports.SiteAnalytics().props.children);
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
  const append = (script) => {
    scripts.push(script);
    appended.push(script);
  };
  const document = {
    readyState,
    referrer: "https://yandex.ru/search/",
    scripts,
    head: { appendChild: append },
    getElementById: (id) => scripts.find((script) => script.id === id) || null,
    getElementsByTagName: (name) => name === "script" ? scripts : [],
    createElement: (name) => {
      assert.equal(name, "script");
      return {};
    },
  };
  const globals = {
    document,
    location: { pathname, href: `https://medtaxi-evp.ru${pathname}?utm_source=yandex` },
    addEventListener: (name, callback, options) => listeners.push({ name, callback, options }),
    setTimeout: (callback, delay) => timers.push({ callback, delay }),
  };
  if (idle) {
    globals.requestIdleCallback = (callback, options) => idleCallbacks.push({ callback, options });
  }
  globals.window = globals;
  const context = vm.createContext(globals);
  return {
    appended, listeners, idleCallbacks, timers, globals,
    run: () => vm.runInContext(bootstrap().children, context),
    queue: () => Array.from(globals.ym.a || [], (args) => JSON.parse(JSON.stringify(Array.from(args)))),
  };
}

test("analytics renders next/script afterInteractive and a noscript pixel without browser APIs", () => {
  const props = bootstrap();
  assert.equal(props.id, "yandex-metrika");
  assert.equal(props.strategy, "afterInteractive");
  assert.equal(typeof props.children, "string");
  const html = renderToStaticMarkup(React.createElement(exports.SiteAnalytics));
  assert.match(html, /<noscript>[\s\S]*<img[^>]+src="https:\/\/mc\.yandex\.ru\/watch\/108491610"[\s\S]*<\/noscript>/);
});

test("ordinary routes load an async tag and retain the complete init configuration", () => {
  const page = browser({ readyState: "interactive" });
  page.run();
  assert.equal(page.appended.length, 1);
  assert.equal(page.appended[0].src, tagUrl);
  assert.equal(page.appended[0].async, true);
  assert.equal(page.listeners.length, 0);
  assert.equal(page.idleCallbacks.length, 0);
  assert.deepEqual(page.queue(), [[counterId, "init", {
    ssr: true,
    ecommerce: "dataLayer",
    referrer: page.globals.document.referrer,
    url: page.globals.location.href,
    webvisor: true,
    clickmap: true,
    accurateTrackBounce: true,
    trackLinks: true,
  }]]);
  assert.equal(typeof page.globals.ym.l, "number");
});

test("Donetsk waits for load and idle while keeping early goals in the same queue", () => {
  for (const pathname of ["/donetsk", "/donetsk/"]) {
    const page = browser({ pathname, readyState: "interactive" });
    page.run();
    assert.equal(page.appended.length, 0);
    assert.equal(page.idleCallbacks.length, 0);
    assert.equal(page.listeners.length, 1);
    assert.equal(page.listeners[0].name, "load");
    assert.equal(page.listeners[0].options.once, true);
    page.globals.ym(counterId, "reachGoal", "donetsk_phone_click");
    page.listeners[0].callback();
    assert.equal(page.appended.length, 0);
    assert.equal(page.idleCallbacks.length, 1);
    assert.equal(page.idleCallbacks[0].options.timeout, 2000);
    page.idleCallbacks[0].callback();
    assert.equal(page.appended.length, 1);
    assert.deepEqual(page.queue().map((args) => args[1]), ["init", "reachGoal"]);
    assert.deepEqual(page.queue()[1], [counterId, "reachGoal", "donetsk_phone_click"]);
  }
});

test("an already-loaded Donetsk page schedules idle without waiting for another load event", () => {
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
