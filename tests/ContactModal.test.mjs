import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { createElement } from "react";
import postcss from "postcss";
import { browserFixture, hookRenderer, moduleLoader } from "./helpers/componentHarness.mjs";

function renderDialog({ isOpen = true, visualViewport = true } = {}) {
  const browser = browserFixture({ visualViewport });
  const renderer = hookRenderer(browser);
  const loader = moduleLoader({
    mocks: {
      react: renderer.react,
      "react-dom": { createPortal: (children) => children },
    },
    globals: { document: browser.document, window: browser.window },
  });
  const { ContactDialog } = loader.load("app/components/ContactModal/ContactDialog.tsx");
  let closed = 0;
  let props = {
    isOpen,
    onClose: () => closed++,
    title: "Обратный звонок",
    descriptionId: "callback-description",
    isSubmitting: false,
    stepKey: "form",
    children: createElement("button", { type: "button" }, "Последняя кнопка"),
  };
  function update(next) { props = { ...props, ...next }; renderer.render(ContactDialog, props); }
  update({});
  return {
    ...browser,
    update,
    cleanup: () => renderer.unmount(),
    closed: () => closed,
    closeButton: () => browser.element((node) => node.type === "button" && !!node.props["aria-label"]),
    lastButton: () => browser.element((node) => node.type === "button" && node.props.children === "Последняя кнопка"),
  };
}

test("a closed dialog does not lock the page, focus elements or subscribe to events", (t) => {
  const page = renderDialog({ isOpen: false });
  t.after(page.cleanup);
  assert.deepEqual(page.document.body.style, page.originalStyle);
  assert.equal(page.document.listeners.size, 0);
  assert.equal(page.viewport.listeners.size, 0);
  assert.equal(page.properties.size, 0);
  assert.deepEqual(page.focusCalls, []);
  assert.deepEqual(page.scrollCalls, []);
});

test("an open dialog restores inline styles and exact scroll position when closed", (t) => {
  const page = renderDialog();
  t.after(page.cleanup);
  assert.deepEqual(page.document.body.style, {
    ...page.originalStyle,
    overflow: "hidden", position: "fixed", top: "-1234px", left: "-4px", width: "100%",
  });
  page.update({ isOpen: false });
  assert.deepEqual(page.document.body.style, page.originalStyle);
  assert.deepEqual(page.scrollCalls, [{ left: 4, top: 1234, behavior: "instant" }]);
  assert.equal(page.document.listeners.size, 0);
  assert.equal(page.viewport.listeners.size, 0);
});

test("route changes do not restore an unrelated page's scroll position or detached trigger", (t) => {
  const page = renderDialog();
  t.after(page.cleanup);
  page.window.location.pathname = "/prices";
  page.trigger.isConnected = false;
  page.update({ isOpen: false });
  assert.deepEqual(page.document.body.style, page.originalStyle);
  assert.deepEqual(page.scrollCalls, []);
  assert.equal(page.focusCalls.some(({ name }) => name === "trigger"), false);
});

test("visual viewport height and offset track keyboard resize/pan and unsubscribe on close", (t) => {
  const page = renderDialog();
  t.after(page.cleanup);
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
  page.update({ isOpen: false });
  assert.equal(page.viewport.listeners.size, 0);
  page.viewport.height = 740;
  page.viewport.dispatch("resize");
  assert.equal(page.properties.get("--modal-viewport-height"), "430px");
});

test("browsers without VisualViewport retain the dynamic CSS viewport fallback", (t) => {
  const page = renderDialog({ visualViewport: false });
  t.after(page.cleanup);
  assert.equal(page.properties.size, 0);
  assert.equal(page.viewport.listeners.size, 0);
  const css = postcss.parse(readFileSync("app/components/ContactModal/ContactModal.module.css", "utf8"));
  const heightValues = [];
  css.walkRules(".viewport", (rule) => {
    rule.walkDecls("height", (declaration) => heightValues.push(declaration.value.replace(/\s+/g, "")));
  });
  assert.deepEqual(heightValues, ["var(--modal-viewport-height,100vh)", "var(--modal-viewport-height,100dvh)"]);
});

test("initial focus avoids the keyboard and restores the trigger without scrolling", (t) => {
  const page = renderDialog();
  t.after(page.cleanup);
  assert.equal(page.document.activeElement, page.closeButton());
  assert.ok(page.focusCalls.length > 0);
  assert.ok(page.focusCalls.every(({ options }) => options.preventScroll === true));
  page.document.dispatch("keydown", { key: "Escape", preventDefault() {} });
  assert.equal(page.closed(), 1);
  page.update({ isOpen: false });
  assert.equal(page.document.activeElement, page.trigger);
  assert.deepEqual(page.focusCalls.at(-1), { name: "trigger", options: { preventScroll: true } });
  assert.equal(page.document.listeners.size, 0);
});

test("changing dialog steps focuses the close control without reinstalling scroll locks", (t) => {
  const page = renderDialog();
  t.after(page.cleanup);
  page.lastButton().focus();
  page.update({ stepKey: "sent" });
  assert.equal(page.document.activeElement, page.closeButton());
  assert.deepEqual(page.scrollCalls, []);
  assert.equal(page.document.body.style.top, "-1234px");
});

test("keyboard navigation remains trapped between first and last dialog controls", (t) => {
  const page = renderDialog();
  t.after(page.cleanup);
  let prevented = 0;
  page.document.dispatch("keydown", { key: "Tab", shiftKey: true, preventDefault: () => prevented++ });
  assert.equal(page.document.activeElement, page.lastButton());
  page.document.dispatch("keydown", { key: "Tab", shiftKey: false, preventDefault: () => prevented++ });
  assert.equal(page.document.activeElement, page.closeButton());
  assert.equal(prevented, 2);
});

test("Tab recovers focus when the active control was disabled during submission", (t) => {
  const page = renderDialog();
  t.after(page.cleanup);
  assert.equal(page.document.activeElement, page.closeButton());
  page.update({ isSubmitting: true });
  let prevented = 0;
  page.document.dispatch("keydown", { key: "Tab", shiftKey: false, preventDefault: () => prevented++ });
  assert.equal(page.document.activeElement, page.lastButton());
  assert.equal(prevented, 1);
});
