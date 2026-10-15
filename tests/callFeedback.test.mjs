import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);

function loadModule(path, globals) {
  const code = ts.transpileModule(readFileSync(path, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, require, ...globals });
  return exports;
}

function eventTarget() {
  const listeners = new Map();
  return {
    listeners,
    addEventListener(name, handler, capture = false) {
      if (!listeners.has(name)) listeners.set(name, new Map());
      listeners.get(name).set(handler, capture);
    },
    removeEventListener(name, handler, capture = false) {
      assert.equal(listeners.get(name)?.get(handler), capture);
      listeners.get(name)?.delete(handler);
      if (!listeners.get(name)?.size) listeners.delete(name);
    },
    dispatchEvent(event) {
      for (const handler of [...(listeners.get(event.type)?.keys() || [])]) handler(event);
      return true;
    },
  };
}

function browser() {
  let now = 0;
  let nextTimer = 0;
  let focused = true;
  let busy = false;
  const timers = new Map();
  const opened = [];
  const sequence = [];
  const document = {
    ...eventTarget(),
    visibilityState: "visible",
    hasFocus: () => focused,
    querySelector: () => busy ? {} : null,
  };
  const window = { ...eventTarget(), location: { pathname: "/donetsk" } };
  class Element {
    constructor(link) { this.link = link; }
    closest(selector) {
      assert.equal(selector, 'a[href^="tel:"]');
      return this.link;
    }
  }
  class CustomEvent {
    constructor(type, options) { this.type = type; this.detail = options.detail; }
  }
  const api = loadModule("app/lib/callFeedback.ts", {
    document, window, Element, CustomEvent,
    setTimeout(handler, delay) {
      const id = ++nextTimer;
      timers.set(id, { at: now + delay, handler });
      return id;
    },
    clearTimeout: (id) => timers.delete(id),
  });
  document.addEventListener(api.CALL_STARTED_EVENT, () => {
    assert.equal(timers.size, 0, "start event precedes scheduling the new attempt");
    sequence.push("start-event");
  });
  document.addEventListener(api.CALL_FEEDBACK_OPEN_EVENT, () => sequence.push("open-event"));
  const subscribe = () => api.listenForCallFeedback(
    (context) => {
      sequence.push("open");
      opened.push({ ...context });
    },
    () => sequence.push("start"),
  );
  const cleanup = subscribe();
  return {
    api, document, window, timers, opened, sequence, cleanup, subscribe,
    busy(value) { busy = value; },
    click({ phone = "+79895052785", disabled = false, link = true, ...event } = {}) {
      document.dispatchEvent({
        type: "click", button: 0,
        target: new Element(link ? {
          getAttribute: (name) => name === "href" ? `tel:${phone}` : disabled ? "true" : null,
        } : null),
        preventDefault() { assert.fail("Native phone action must not be cancelled"); },
        ...event,
      });
    },
    visibility(state) {
      document.visibilityState = state;
      document.dispatchEvent({ type: "visibilitychange" });
    },
    focus(value) {
      focused = value;
      window.dispatchEvent({ type: value ? "focus" : "blur" });
    },
    openCallback() { document.dispatchEvent({ type: api.CALLBACK_OPEN_EVENT }); },
    advance(ms) {
      const until = now + ms;
      while (true) {
        const next = [...timers.entries()].filter(([, timer]) => timer.at <= until)
          .sort((a, b) => a[1].at - b[1].at)[0];
        if (!next) break;
        const [id, timer] = next;
        now = timer.at;
        timers.delete(id);
        timer.handler();
      }
      now = until;
    },
  };
}

test("normal phone click stays native and asks once after the 15-second visible fallback", () => {
  const page = browser();
  page.click();
  assert.deepEqual(page.sequence, ["start-event", "start"]);
  page.advance(14_999);
  assert.equal(page.opened.length, 0);
  page.advance(1);
  assert.deepEqual(page.opened, [{ phone: "+79895052785", page: "/donetsk" }]);
  assert.deepEqual(page.sequence, ["start-event", "start", "open-event", "open"]);
  page.focus(false);
  page.focus(true);
  page.visibility("hidden");
  page.visibility("visible");
  page.advance(30_000);
  assert.equal(page.opened.length, 1, "later focus events never reopen an answered/dismissed question");
  page.cleanup();
});

test("return from dialer waits for visible focus plus 800 ms, even after fallback elapsed", () => {
  const page = browser();
  page.click();
  page.focus(false);
  page.visibility("hidden");
  page.advance(20_000);
  assert.equal(page.opened.length, 0);
  page.visibility("visible");
  page.advance(1_000);
  assert.equal(page.opened.length, 0, "visibility alone must not open over another focused app");
  page.focus(true);
  page.advance(799);
  assert.equal(page.opened.length, 0);
  page.advance(1);
  assert.equal(page.opened.length, 1);
  page.cleanup();
});

test("visibility-only and focus-only dialer transitions both trigger the return grace period", () => {
  for (const kind of ["visibility", "focus"]) {
    const page = browser();
    page.click();
    if (kind === "visibility") page.visibility("hidden");
    else page.focus(false);
    page.advance(1_000);
    if (kind === "visibility") page.visibility("visible");
    else page.focus(true);
    page.advance(800);
    assert.equal(page.opened.length, 1, kind);
    page.cleanup();
  }
});

test("backgrounding during return grace cancels it; duplicate focus events do not postpone it", () => {
  const page = browser();
  page.click();
  page.focus(false);
  page.focus(true);
  page.advance(400);
  page.focus(false);
  page.advance(1_000);
  assert.equal(page.opened.length, 0);
  page.focus(true);
  page.advance(400);
  page.focus(true);
  page.visibility("visible");
  page.advance(400);
  assert.equal(page.opened.length, 1);
  page.cleanup();
});

test("a new phone click replaces old timers and preserves the original clicked route and number", () => {
  const page = browser();
  page.click();
  page.advance(14_000);
  page.window.location.pathname = "/prices";
  page.click({ phone: "+79789380221" });
  page.window.location.pathname = "/contacts";
  page.advance(1_000);
  assert.equal(page.opened.length, 0);
  page.advance(14_000);
  assert.deepEqual(page.opened, [{ phone: "+79789380221", page: "/prices" }]);
  page.cleanup();
});

test("modified, secondary, cancelled, disabled and empty links do not schedule a question", () => {
  const page = browser();
  for (const event of [
    { button: 1 }, { button: 2 }, { ctrlKey: true }, { metaKey: true },
    { shiftKey: true }, { altKey: true }, { defaultPrevented: true },
    { disabled: true }, { phone: "" }, { link: false }, { target: {} },
  ]) page.click(event);
  page.advance(30_000);
  assert.equal(page.opened.length, 0);
  assert.equal(page.timers.size, 0);
  assert.deepEqual(page.sequence, []);
  page.cleanup();
});

test("pending callback submissions defer the question until finished and focused", () => {
  const page = browser();
  page.click();
  page.busy(true);
  page.advance(16_000);
  assert.equal(page.opened.length, 0);
  page.focus(false);
  page.busy(false);
  page.advance(2_000);
  assert.equal(page.opened.length, 0);
  page.focus(true);
  page.advance(800);
  assert.equal(page.opened.length, 1);
  page.cleanup();
});

test("a new phone attempt cannot unmount an active form submission", () => {
  const page = browser();
  page.busy(true);
  page.click();
  page.advance(20_000);
  assert.deepEqual(page.sequence, []);
  assert.equal(page.opened.length, 0);
  page.busy(false);
  page.click();
  page.advance(15_000);
  assert.equal(page.opened.length, 1);
  page.cleanup();
});

test("an explicit callback request cancels a pending survey and its return timers", () => {
  const page = browser();
  page.click();
  page.focus(false);
  page.focus(true);
  assert.equal(page.timers.size, 2);
  page.openCallback();
  assert.equal(page.timers.size, 0);
  page.advance(30_000);
  page.focus(false);
  page.focus(true);
  page.advance(800);
  assert.equal(page.opened.length, 0);
  page.cleanup();
  assert.equal(page.document.listeners.has(page.api.CALLBACK_OPEN_EVENT), false);
});

test("fallback does not cut short a dialer return just before 15 seconds", () => {
  const page = browser();
  page.click();
  page.focus(false);
  page.advance(14_800);
  page.focus(true);
  page.advance(200);
  assert.equal(page.opened.length, 0);
  page.advance(600);
  assert.equal(page.opened.length, 1);
  page.cleanup();
});

test("cleanup removes pending timers and subscriptions before Strict Mode re-initialization", () => {
  const page = browser();
  page.click();
  page.focus(false);
  page.focus(true);
  page.cleanup();
  assert.equal(page.timers.size, 0);
  assert.equal(page.document.listeners.has("click"), false);
  assert.equal(page.document.listeners.has("visibilitychange"), false);
  assert.equal(page.window.listeners.size, 0);
  page.advance(30_000);
  assert.equal(page.opened.length, 0);
  const cleanupAgain = page.subscribe();
  assert.equal(page.document.listeners.get("click").size, 1);
  assert.equal([...page.document.listeners.get("click").values()][0], true);
  page.click();
  page.advance(15_000);
  assert.equal(page.opened.length, 1);
  cleanupAgain();
});

test("a new attempt unmounts the previous form and derives styling from the clicked route", () => {
  const states = [];
  let stateIndex = 0;
  let effect;
  let onOpen;
  let onStart;
  const { CallFeedback } = loadModule("app/components/tracking/CallFeedback.tsx", {
    require(name) {
      if (name === "react") return {
        useState(initial) {
          const index = stateIndex++;
          if (!(index in states)) states[index] = initial;
          return [states[index], (next) => { states[index] = next; }];
        },
        useEffect(callback) { effect = callback; },
      };
      if (name === "next/dynamic") return { default: () => () => null };
      if (name === "@/app/lib/callFeedback") return {
        listenForCallFeedback(open, start) { onOpen = open; onStart = start; return () => {}; },
      };
      return require(name);
    },
  });
  function render() { stateIndex = 0; return CallFeedback(); }
  assert.equal(render(), null);
  effect();
  onOpen({ phone: "+79895052785", page: "/donetsk" });
  const firstModal = render();
  assert.equal(firstModal.props.variant, "donetsk");
  assert.equal(firstModal.props.purpose, "call-followup");
  firstModal.props.onClose();
  assert.equal(render().props.isOpen, false);
  onStart();
  assert.equal(render(), null, "new phone attempt resets question/form/success state by unmounting");
  onOpen({ phone: "+79789380221", page: "/prices" });
  assert.equal(render().props.variant, "default");
  assert.equal(render().props.isOpen, true);
});
