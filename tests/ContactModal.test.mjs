import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import vm from "node:vm";
import postcss from "postcss";
import ts from "typescript";

const require = createRequire(import.meta.url);
const code = ts.transpileModule(readFileSync("app/components/ContactModal/ContactModal.tsx", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;

function eventTarget() {
  const listeners = new Map();
  return {
    listeners,
    addEventListener(name, callback) {
      if (!listeners.has(name)) listeners.set(name, new Set());
      listeners.get(name).add(callback);
    },
    removeEventListener(name, callback) {
      listeners.get(name)?.delete(callback);
      if (listeners.get(name)?.size === 0) listeners.delete(name);
    },
    dispatch(name, event = {}) {
      for (const callback of listeners.get(name) || []) callback(event);
    },
  };
}

function renderModal({ isOpen = true, visualViewport = true } = {}) {
  const effects = [];
  const scrollCalls = [];
  const focusCalls = [];
  const properties = new Map();
  const originalStyle = {
    overflow: "auto",
    position: "relative",
    top: "2px",
    left: "3px",
    width: "95%",
    background: "white",
  };
  const document = {
    ...eventTarget(),
    body: { style: { ...originalStyle } },
    activeElement: null,
  };
  function focusable(name) {
    return {
      offsetParent: {},
      focus(options) {
        focusCalls.push({ name, options: options && { ...options } });
        document.activeElement = this;
      },
    };
  }
  const trigger = focusable("trigger");
  const closeButton = focusable("close");
  const phoneLink = focusable("phone-link");
  document.activeElement = trigger;
  const container = { style: { setProperty: (name, value) => properties.set(name, value) } };
  const dialog = { querySelectorAll: () => [closeButton, phoneLink] };
  const viewport = { ...eventTarget(), height: 740, offsetTop: 0 };
  const window = {
    scrollX: 4,
    scrollY: 1234,
    visualViewport: visualViewport ? viewport : undefined,
    scrollTo: (options) => scrollCalls.push({ ...options }),
  };
  const noopComponent = () => null;
  const exports = {};
  vm.runInNewContext(code, {
    exports,
    document,
    window,
    require(name) {
      switch (name) {
        case "react": return {
          useState: (value) => [value, () => {}],
          useRef: (current) => ({ current }),
          useEffect: (effect) => effects.push(effect),
        };
        case "react-dom": return { createPortal: (children) => children };
        case "next/dynamic": return { default: () => noopComponent };
        case "next/link": return { default: noopComponent };
        case "react-hot-toast": return { default: {}, Toaster: noopComponent };
        case "@/app/components/tracking/TrackedPhoneLink": return { TrackedPhoneLink: noopComponent };
        case "./ContactModal.module.css": return { default: { viewport: "viewport", form: "form" } };
        default: return require(name);
      }
    },
  });
  let closed = 0;
  const tree = exports.ContactModal({ isOpen, onClose: () => closed++ });
  function attachRefs(node) {
    if (Array.isArray(node)) return node.forEach(attachRefs);
    if (!node || typeof node !== "object" || !node.props) return;
    const { props, type } = node;
    if (props.ref) {
      props.ref.current = props.role === "dialog" ? dialog : type === "button" ? closeButton : container;
    }
    attachRefs(props.children);
  }
  attachRefs(tree);
  const cleanups = effects.map((effect) => effect()).filter((cleanup) => typeof cleanup === "function");
  return {
    document, originalStyle, scrollCalls, focusCalls, properties, viewport, trigger, closeButton, phoneLink,
    closed: () => closed,
    cleanup: () => cleanups.forEach((cleanup) => cleanup()),
  };
}

test("a closed modal does not lock the page, focus elements or subscribe to events", () => {
  const page = renderModal({ isOpen: false });
  assert.deepEqual(page.document.body.style, page.originalStyle);
  assert.equal(page.document.listeners.size, 0);
  assert.equal(page.viewport.listeners.size, 0);
  assert.equal(page.properties.size, 0);
  assert.deepEqual(page.focusCalls, []);
  page.cleanup();
  assert.deepEqual(page.scrollCalls, []);
  assert.deepEqual(page.document.body.style, page.originalStyle);
});

test("an open modal locks the body and restores inline styles and the exact scroll position instantly", () => {
  const page = renderModal();
  assert.deepEqual(page.document.body.style, {
    ...page.originalStyle,
    overflow: "hidden",
    position: "fixed",
    top: "-1234px",
    left: "-4px",
    width: "100%",
  });
  page.cleanup();
  assert.deepEqual(page.document.body.style, page.originalStyle);
  assert.deepEqual(page.scrollCalls, [{ left: 4, top: 1234, behavior: "instant" }]);
});

test("visual viewport height and offset update on resize and pan, then unsubscribe on close", () => {
  const page = renderModal();
  assert.equal(page.properties.get("--modal-viewport-height"), "740px");
  assert.equal(page.properties.get("--modal-viewport-top"), "0px");
  assert.deepEqual([...page.viewport.listeners.keys()].sort(), ["resize", "scroll"]);
  page.viewport.height = 430;
  page.viewport.offsetTop = 20;
  page.viewport.dispatch("resize");
  assert.equal(page.properties.get("--modal-viewport-height"), "430px");
  assert.equal(page.properties.get("--modal-viewport-top"), "20px");
  page.viewport.offsetTop = 80;
  page.viewport.dispatch("scroll");
  assert.equal(page.properties.get("--modal-viewport-top"), "80px");
  page.cleanup();
  assert.equal(page.viewport.listeners.size, 0);
  page.viewport.height = 740;
  page.viewport.dispatch("resize");
  assert.equal(page.properties.get("--modal-viewport-height"), "430px");
});

test("browsers without VisualViewport retain the dynamic CSS viewport fallback", () => {
  const page = renderModal({ visualViewport: false });
  assert.equal(page.properties.size, 0);
  assert.equal(page.viewport.listeners.size, 0);
  const css = postcss.parse(readFileSync("app/components/ContactModal/ContactModal.module.css", "utf8"));
  const heightValues = [];
  css.walkRules(".viewport", (rule) => {
    rule.walkDecls("height", (declaration) => heightValues.push(declaration.value.replace(/\s+/g, "")));
  });
  assert.deepEqual(heightValues, [
    "var(--modal-viewport-height,100vh)",
    "var(--modal-viewport-height,100dvh)",
  ]);
  page.cleanup();
});

test("initial focus avoids the keyboard and restores the trigger without scrolling", () => {
  const page = renderModal();
  assert.equal(page.document.activeElement, page.closeButton);
  assert.deepEqual(page.focusCalls, [{ name: "close", options: { preventScroll: true } }]);
  page.document.dispatch("keydown", { key: "Escape" });
  assert.equal(page.closed(), 1);
  page.cleanup();
  assert.equal(page.document.activeElement, page.trigger);
  assert.deepEqual(page.focusCalls.at(-1), { name: "trigger", options: { preventScroll: true } });
  assert.equal(page.document.listeners.size, 0);
});

test("keyboard navigation remains trapped between the first and last dialog controls", () => {
  const page = renderModal();
  let prevented = 0;
  page.document.dispatch("keydown", { key: "Tab", shiftKey: true, preventDefault: () => prevented++ });
  assert.equal(page.document.activeElement, page.phoneLink);
  page.document.dispatch("keydown", { key: "Tab", shiftKey: false, preventDefault: () => prevented++ });
  assert.equal(page.document.activeElement, page.closeButton);
  assert.equal(prevented, 2);
  page.cleanup();
});
