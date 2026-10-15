import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);

function eventTarget() {
  const listeners = new Map();
  return {
    listeners,
    addEventListener(name, listener, capture = false) {
      if (!listeners.has(name)) listeners.set(name, new Map());
      listeners.get(name).set(listener, capture);
    },
    removeEventListener(name, listener, capture = false) {
      assert.equal(listeners.get(name)?.get(listener), capture);
      listeners.get(name)?.delete(listener);
      if (!listeners.get(name)?.size) listeners.delete(name);
    },
    dispatchEvent(event) {
      const handlers = [...(listeners.get(event.type) || [])].sort((a, b) => Number(b[1]) - Number(a[1]));
      for (const [handler] of handlers) handler(event);
    },
  };
}

// Execute the real controller components/hooks; only React scheduling and the lazy module are simulated.
function setup(kind = "default", { ordinaryCount = 1 } = {}) {
  let active;
  let busy = false;
  let nextTimer = 0;
  const timers = new Map();
  const roots = [];
  const loads = [];
  const modules = new Map();
  const trackedGoals = [];
  let resolveModule;
  let renderedModals = [];
  const modalModule = new Promise((resolve) => { resolveModule = resolve; });
  const document = { ...eventTarget(), visibilityState: "visible", hasFocus: () => true, querySelector: () => busy ? {} : null };
  const window = { ...eventTarget(), location: { pathname: kind === "donetsk" ? "/donetsk" : "/contacts" } };
  class Element {
    constructor({ phone, goal, position = "hero" } = {}) { Object.assign(this, { phone, goal, position }); }
    closest(selector) {
      if (selector === 'a[href^="tel:"]') return this.phone ? { getAttribute: (name) => name === "href" ? `tel:${this.phone}` : null } : null;
      return this.goal ? { dataset: { donetskGoal: this.goal, ctaPosition: this.position } } : null;
    }
  }
  class CustomEvent {
    constructor(type, options = {}) { this.type = type; this.detail = options.detail; }
  }
  const sameDeps = (a, b) => a && b && a.length === b.length && a.every((item, index) => Object.is(item, b[index]));
  const react = {
    useState(initial) {
      const root = active;
      const index = root.index++;
      if (!root.hooks[index]) root.hooks[index] = { value: initial };
      return [root.hooks[index].value, (value) => { root.hooks[index].value = value; }];
    },
    useCallback(callback, deps) {
      const root = active;
      const index = root.index++;
      if (!root.hooks[index] || !sameDeps(root.hooks[index].deps, deps)) root.hooks[index] = { value: callback, deps };
      return root.hooks[index].value;
    },
    useEffect(setupEffect, deps) {
      const root = active;
      const index = root.index++;
      const previous = root.hooks[index];
      if (!previous || !sameDeps(previous.deps, deps)) {
        root.hooks[index] = { setupEffect, deps, cleanup: previous?.cleanup };
        root.pending.push(index);
      }
    },
  };
  function lazy(loader) {
    let Component;
    let loading;
    function LazyModal(props) {
      if (!loading) {
        loading = loader().then((result) => { Component = result; });
        loads.push(loading);
      }
      return Component ? Component(props) : null;
    }
    return LazyModal;
  }
  function load(path) {
    if (modules.has(path)) return modules.get(path);
    const exports = {};
    modules.set(path, exports);
    const code = ts.transpileModule(readFileSync(path, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
    }).outputText;
    vm.runInNewContext(code, {
      exports, document, window, Element, CustomEvent,
      setTimeout(handler) { const id = ++nextTimer; timers.set(id, handler); return id; },
      clearTimeout: (id) => timers.delete(id),
      require(name) {
        if (name === "react") return react;
        if (name === "next/dynamic") return { default: lazy };
        if (name === "next/image") return { default: () => null };
        if (name === "@/app/components/ContactModal/ContactModal") return modalModule;
        if (name === "@/app/components/ContactModal") assert.fail("Controller must not lazy-load the barrel");
        if (name === "@/app/lib/callFeedback") return load("app/lib/callFeedback.ts");
        if (name.endsWith("useContactModalController")) return load("app/components/ContactModal/useContactModalController.ts");
        if (name === "./analytics") return { trackDonetskGoal: (...args) => trackedGoals.push(args) };
        return require(name);
      },
    });
    return exports;
  }
  const { CallFeedback } = load("app/components/tracking/CallFeedback.tsx");
  const Ordinary = kind === "donetsk"
    ? load("app/donetsk/DonetskInteractions.tsx").DonetskInteractions
    : load("app/components/ContactModal/ContactModalTrigger/ContactModalTrigger.tsx").ContactModalTrigger;
  for (const Component of [...Array(ordinaryCount).fill(Ordinary), CallFeedback]) roots.push({ Component, hooks: [], pending: [], index: 0, tree: null });

  function walk(node, visit) {
    if (Array.isArray(node)) return node.forEach((child) => walk(child, visit));
    if (!node || typeof node !== "object" || !node.props) return;
    visit(node);
    walk(node.props.children, visit);
  }
  function render() {
    renderedModals = [];
    for (const root of roots) {
      active = root;
      root.index = 0;
      root.tree = root.Component();
      active = undefined;
      for (const index of root.pending.splice(0)) {
        root.hooks[index].cleanup?.();
        root.hooks[index].cleanup = root.hooks[index].setupEffect();
      }
      walk(root.tree, (node) => { if (typeof node.type === "function") node.type(node.props); });
    }
    return renderedModals;
  }
  const api = load("app/lib/callFeedback.ts");
  render();
  return {
    document, window, timers, loads, api, render, trackedGoals,
    openCallback(index = 0) {
      if (kind === "donetsk") document.dispatchEvent({ type: "click", button: 0, target: new Element({ goal: "donetsk_callback_open", position: "final" }) });
      else walk(roots[index].tree, (node) => { if (node.type === "button") node.props.onClick(); });
    },
    clickPhone() {
      document.dispatchEvent({ type: "click", button: 0, target: new Element({ phone: "+79895052785", goal: "donetsk_phone_click" }), preventDefault: () => assert.fail("Phone navigation cancelled") });
    },
    ready() {
      const [id, callback] = timers.entries().next().value;
      timers.delete(id);
      callback();
    },
    busy(value) { busy = value; },
    async resolve() {
      resolveModule({ ContactModal: (props) => { renderedModals.push(props); return null; } });
      await Promise.all(loads);
    },
    restartEffects() {
      for (const root of roots) for (const hook of root.hooks) if (hook.setupEffect) hook.cleanup?.();
      for (const root of roots) for (const hook of root.hooks) if (hook.setupEffect) hook.cleanup = hook.setupEffect();
    },
    cleanup() {
      for (const root of roots) for (const hook of root.hooks) if (hook.setupEffect) hook.cleanup?.();
    },
  };
}

for (const kind of ["default", "donetsk"]) {
  test(`${kind}: CTA → phone → followup ready → delayed module resolves with only one open modal`, async () => {
    const page = setup(kind);
    assert.equal(page.loads.length, 0, "modal code is not requested before interaction");
    page.openCallback();
    assert.deepEqual(page.render(), []);
    assert.equal(page.loads.length, 1);
    page.clickPhone();
    page.render();
    page.ready();
    assert.deepEqual(page.render(), [], "both modal modules are still loading");
    assert.equal(page.loads.length, 2);
    await page.resolve();
    const modals = page.render();
    assert.equal(modals.length, 2);
    assert.equal(modals.filter((modal) => modal.isOpen).length, 1);
    assert.equal(modals[0].isOpen, false, "eager parent received the event before its modal code existed");
    assert.equal(modals[1].purpose, "call-followup");
    assert.equal(modals[1].variant, kind);
    if (kind === "donetsk") {
      modals[0].onSubmitSuccess();
      modals[0].onSubmitError();
      assert.deepEqual(page.trackedGoals.map(([goal]) => goal), [
        "donetsk_callback_open", "donetsk_phone_click", "donetsk_callback_success", "donetsk_callback_error",
      ]);
      assert.equal(page.trackedGoals.at(-1)[1].cta_position, "final");
    }
    page.cleanup();
  });

  test(`${kind}: an explicit callback during the delay cancels the pending survey`, async () => {
    const page = setup(kind);
    page.clickPhone();
    page.openCallback();
    page.render();
    assert.equal(page.timers.size, 0);
    await page.resolve();
    const modals = page.render();
    assert.equal(modals.length, 1);
    assert.equal(modals[0].isOpen, true);
    assert.notEqual(modals[0].purpose, "call-followup");
    page.cleanup();
  });

  test(`${kind}: phone → followup ready → callback → delayed module resolves with only callback open`, async () => {
    const page = setup(kind);
    page.clickPhone();
    page.ready();
    assert.deepEqual(page.render(), []);
    assert.equal(page.loads.length, 1, "followup module is pending");
    page.openCallback();
    assert.deepEqual(page.render(), []);
    assert.equal(page.loads.length, 2);
    await page.resolve();
    const modals = page.render();
    assert.equal(modals.length, 1, "the delayed followup is unmounted by the explicit callback request");
    assert.equal(modals[0].isOpen, true);
    assert.notEqual(modals[0].purpose, "call-followup");
    page.cleanup();
  });

  test(`${kind}: an explicit callback also closes a loaded followup`, async () => {
    const page = setup(kind);
    page.clickPhone();
    page.ready();
    page.render();
    await page.resolve();
    assert.equal(page.render()[0].purpose, "call-followup");
    page.openCallback();
    page.render();
    await page.resolve();
    const modals = page.render();
    assert.equal(modals.length, 1);
    assert.notEqual(modals[0].purpose, "call-followup");
    assert.equal(modals[0].isOpen, true);
    page.cleanup();
  });
}

test("two ordinary callback triggers sharing a delayed module keep only the latest request open", async () => {
  const page = setup("default", { ordinaryCount: 2 });
  page.openCallback(0);
  page.render();
  page.openCallback(1);
  page.render();
  await page.resolve();
  const modals = page.render();
  assert.equal(modals.length, 2);
  assert.equal(modals[0].isOpen, false);
  assert.equal(modals[1].isOpen, true);
  page.cleanup();
});

test("eager controllers preserve a busy submission and unsubscribe cleanly in Strict Mode", async () => {
  const page = setup();
  page.openCallback();
  page.render();
  await page.resolve();
  assert.equal(page.render()[0].isOpen, true);
  page.busy(true);
  page.clickPhone();
  assert.equal(page.render()[0].isOpen, true);
  assert.equal(page.timers.size, 0);
  page.document.dispatchEvent({ type: page.api.CALL_STARTED_EVENT });
  assert.equal(page.render()[0].isOpen, true, "direct coordination events cannot discard a pending request");
  page.openCallback();
  assert.equal(page.render()[0].isOpen, true);
  page.busy(false);
  page.restartEffects();
  assert.equal(page.document.listeners.get(page.api.CALL_STARTED_EVENT).size, 1);
  assert.equal(page.document.listeners.get(page.api.CALL_FEEDBACK_OPEN_EVENT).size, 1);
  assert.equal(page.document.listeners.get(page.api.CALLBACK_OPEN_EVENT).size, 2);
  assert.equal(page.document.listeners.get("click").size, 1);
  page.clickPhone();
  assert.equal(page.render()[0].isOpen, false);
  page.cleanup();
  assert.equal(page.document.listeners.size, 0);
  assert.equal(page.window.listeners.size, 0);
  assert.equal(page.timers.size, 0);
});
