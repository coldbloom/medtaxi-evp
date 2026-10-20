import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement } from "react";
import { browserFixture, hookRenderer, moduleLoader, nodes, textContent } from "./helpers/componentHarness.mjs";

function setup() {
  const browser = browserFixture();
  const renderer = hookRenderer(browser);
  const css = { __esModule: true, default: new Proxy({}, { get: (_target, name) => String(name) }) };
  const loader = moduleLoader({
    mocks: {
      react: renderer.react,
      "react-dom": { createPortal: (children) => children },
      "react-transition-group": { CSSTransition: ({ in: open, children }) => open ? children : null },
      "@/app/utils/hooks/usePortalContainer": { usePortalContainer: () => browser.document.body },
      "next/link": { __esModule: true, default: (props) => createElement("a", { ...props, prefetch: undefined }, props.children), useLinkStatus: () => ({ pending: false }) },
      "next/navigation": { usePathname: () => "/" },
      "next/image": { __esModule: true, default: (props) => createElement("img", props) },
      "./Burger.module.scss": css,
      "./Menu.module.scss": css,
      "./ModalPageWindow.module.scss": css,
    },
    globals: { document: browser.document, window: browser.window },
  });
  const { Burger } = loader.load("app/components/sections/Header/Burger/Burger.tsx");
  let tree;
  const render = () => (tree = renderer.render(Burger, {}));
  render();
  return {
    ...browser, render,
    find: (predicate) => nodes(tree).find(predicate),
    nodes: () => nodes(tree),
    open() {
      nodes(tree).find((node) => node.type === "button" && node.props["aria-haspopup"] === "dialog").props.onClick();
      render();
    },
    cleanup: () => renderer.unmount(),
  };
}

test("mobile menu exposes its expanded state, an accessible dialog title and a close control inside the panel", (t) => {
  const page = setup();
  t.after(page.cleanup);
  assert.equal(page.find((node) => node.props.role === "dialog"), undefined);
  const trigger = page.find((node) => node.props["aria-haspopup"] === "dialog");
  assert.equal(trigger.props["aria-expanded"], false);
  assert.deepEqual(page.document.body.style, page.originalStyle);
  page.open();
  const dialog = page.find((node) => node.props.role === "dialog");
  assert.equal(dialog.props["aria-modal"], "true");
  assert.equal(dialog.props.id, trigger.props["aria-controls"]);
  assert.equal(textContent(page.find((node) => node.props.id === dialog.props["aria-labelledby"])), "Меню сайта");
  const close = nodes(dialog).find((node) => node.type === "button" && node.props["aria-label"] === "Закрыть меню");
  assert.ok(close);
  assert.equal(page.find((node) => node.props["aria-haspopup"] === "dialog").props["aria-expanded"], true);
  close.props.onClick();
  page.render();
  assert.equal(page.find((node) => node.props.role === "dialog"), undefined);
  assert.deepEqual(page.document.body.style, page.originalStyle);
});

test("mobile menu traps Tab, closes with Escape and returns focus without discarding the previous scroll styles", (t) => {
  const page = setup();
  t.after(page.cleanup);
  const trigger = page.element((node) => node.props["aria-haspopup"] === "dialog");
  trigger.focus();
  page.open();
  const close = page.element((node) => node.type === "button" && node.props["aria-label"] === "Закрыть меню" && !node.props["aria-haspopup"]);
  assert.equal(page.document.activeElement, close);
  const lastLink = page.element((node) => node.type === "a" && node.props.href === "/contacts");
  let prevented = 0;
  page.document.dispatch("keydown", { key: "Tab", shiftKey: true, preventDefault: () => prevented++ });
  assert.equal(page.document.activeElement, lastLink);
  page.document.dispatch("keydown", { key: "Tab", shiftKey: false, preventDefault: () => prevented++ });
  assert.equal(page.document.activeElement, close);
  assert.equal(prevented, 2);
  page.document.dispatch("keydown", { key: "Escape", preventDefault() {} });
  page.render();
  assert.equal(page.document.activeElement, trigger);
  assert.deepEqual(page.document.body.style, page.originalStyle);
  assert.equal(page.document.listeners.size, 0);
});

test("only the top dialog handles Escape and overlapping locks restore the original page after the last close", (t) => {
  const browser = browserFixture();
  const renderer = hookRenderer(browser);
  const loader = moduleLoader({
    mocks: { react: renderer.react, "react-dom": { createPortal: (children) => children } },
    globals: { document: browser.document, window: browser.window },
  });
  const { ContactDialog } = loader.load("app/components/ContactModal/ContactDialog.tsx");
  const closed = [];
  const Dialogs = ({ firstOpen, secondOpen }) => [
    createElement(ContactDialog, { isOpen: firstOpen, onClose: () => closed.push("first"), title: "First", descriptionId: "first", isSubmitting: false, stepKey: "form" }),
    createElement(ContactDialog, { isOpen: secondOpen, onClose: () => closed.push("second"), title: "Second", descriptionId: "second", isSubmitting: false, stepKey: "form" }),
  ];
  const render = (firstOpen, secondOpen) => renderer.render(Dialogs, { firstOpen, secondOpen });
  t.after(() => renderer.unmount());
  render(true, true);
  browser.document.dispatch("keydown", { key: "Escape", preventDefault() {} });
  assert.deepEqual(closed, ["second"]);
  render(false, true);
  assert.equal(browser.document.body.style.overflow, "hidden");
  assert.equal(browser.document.body.style.position, "fixed");
  assert.deepEqual(browser.scrollCalls, []);
  render(false, false);
  assert.deepEqual(browser.document.body.style, browser.originalStyle);
  assert.deepEqual(browser.scrollCalls, [{ left: 4, top: 1234, behavior: "instant" }]);
  assert.equal(browser.document.listeners.size, 0);
});
