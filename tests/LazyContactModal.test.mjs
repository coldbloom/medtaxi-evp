import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement } from "react";
import { browserFixture, hookRenderer, moduleLoader, nodes, textContent } from "./helpers/componentHarness.mjs";

const flush = async () => { for (let index = 0; index < 12; index++) await Promise.resolve(); };

function setup({ isOpen = true } = {}) {
  const browser = browserFixture();
  const renderer = hookRenderer(browser);
  const imports = [];
  // Mock only the network/chunk boundary. The cache, retry logic and shell are real.
  const chunk = { __esModule: true, then(resolve, reject) { imports.push({ resolve, reject }); } };
  const loader = moduleLoader({
    mocks: {
      react: renderer.react,
      "react-dom": { createPortal: (children) => children },
      "./ContactModal": chunk,
    },
    globals: { window: browser.window, document: browser.document },
  });
  const { LazyContactModal } = loader.load("app/components/ContactModal/LazyContactModal.tsx");
  const cache = loader.load("app/components/ContactModal/loadContactModal.ts");
  let closed = 0;
  let props = { isOpen, variant: "donetsk", contactPhoneHref: "+79490676701", contactPhoneLabel: "+7 (949) 067-67-01", onClose: () => { closed++; props.isOpen = false; } };
  let tree;
  const render = () => (tree = renderer.render(LazyContactModal, props));
  const update = (next) => { props = { ...props, ...next }; return render(); };
  function LoadedModal({ isOpen: open }) {
    const [draft, setDraft] = renderer.react.useState("");
    return open ? createElement("input", { name: "draft", value: draft, onChange: (event) => setDraft(event.target.value) }) : null;
  }
  render();
  return {
    ...browser, imports, cache, render, update,
    find: (predicate) => nodes(tree).find(predicate),
    text: () => textContent(tree),
    closed: () => closed,
    resolve: async (index = imports.length - 1) => { imports[index].resolve({ ContactModal: LoadedModal }); await flush(); render(); },
    reject: async () => { imports.at(-1).reject(new Error("Chunk download failed")); await flush(); render(); },
    cleanup: () => renderer.unmount(),
  };
}

test("the contact chunk is requested only when opened and a pending shell offers working direct contacts", async (t) => {
  const page = setup({ isOpen: false });
  t.after(page.cleanup);
  await flush();
  assert.equal(page.imports.length, 0);
  assert.equal(page.text(), "");
  page.update({ isOpen: true });
  await flush();
  assert.equal(page.imports.length, 1);
  assert.match(page.text(), /Открываем форму/);
  assert.equal(page.find((node) => node.props.role === "dialog").props["aria-busy"], false, "loading is cancellable, unlike an API submission");
  const phone = page.find((node) => node.props.href === "tel:+79490676701");
  assert.ok(phone);
  assert.equal(phone.props["data-donetsk-goal"], "donetsk_phone_click");
  for (const href of ["https://t.me/konstankk", "https://max.ru/u/f9LHodD0cOI7hGFwnp4y8CBCeTVIs3kkyT-JqLq2wJc3ES2VjFOgy02xevs"]) {
    const link = page.find((node) => node.props.href === href);
    assert.equal(link.props.target, "_blank");
    assert.equal(link.props.rel, "noopener noreferrer");
  }
  phone.props.onClick(); // No preventDefault: the native telephone navigation survives.
  page.render();
  assert.equal(page.closed(), 1);
  assert.equal(page.text(), "");
  await page.resolve();
  assert.equal(page.text(), "", "a late chunk must not reopen a cancelled contact request");
  assert.deepEqual(page.document.body.style, page.originalStyle);
});

test("failed contact chunks show an accessible error and retry without a full page reload", async (t) => {
  const page = setup();
  t.after(page.cleanup);
  await flush();
  await page.reject();
  assert.match(textContent(page.find((node) => node.props.role === "alert")), /Проверьте подключение/);
  const retry = page.find((node) => node.type === "button" && textContent(node) === "Попробовать ещё раз");
  assert.ok(retry);
  retry.props.onClick();
  page.render();
  await flush();
  assert.equal(page.imports.length, 2);
  assert.equal(page.find((node) => node.props.role === "alert"), undefined);
  assert.match(page.text(), /Открываем форму/);
  await page.resolve();
  assert.ok(page.find((node) => node.props.name === "draft"));
});

test("closing a pending shell via Escape restores focus and cached reopening preserves the loaded draft", async (t) => {
  const page = setup();
  t.after(page.cleanup);
  await flush();
  page.document.dispatch("keydown", { key: "Escape", preventDefault() {} });
  page.render();
  assert.equal(page.closed(), 1);
  assert.equal(page.document.activeElement, page.trigger);
  await page.resolve();
  page.update({ isOpen: true });
  await flush();
  page.render();
  const input = page.find((node) => node.props.name === "draft");
  input.props.onChange({ target: { value: "Анна" } });
  page.render();
  page.update({ isOpen: false });
  page.update({ isOpen: true });
  assert.equal(page.find((node) => node.props.name === "draft").props.value, "Анна");
  assert.equal(page.imports.length, 1);
});

test("concurrent modal triggers share the same chunk request and failed imports do not poison the cache", async (t) => {
  const page = setup({ isOpen: false });
  t.after(page.cleanup);
  const first = page.cache.loadContactModal();
  const second = page.cache.loadContactModal();
  assert.equal(first, second);
  const caught = Promise.allSettled([first, second]);
  await flush();
  assert.equal(page.imports.length, 1);
  page.imports[0].reject(new Error("Offline"));
  assert.ok((await caught).every((result) => result.status === "rejected"));
  const retried = page.cache.loadContactModal();
  await flush();
  assert.equal(page.imports.length, 2);
  const component = () => null;
  page.imports[1].resolve({ ContactModal: component });
  assert.equal(await retried, component);
  assert.equal(page.cache.getLoadedContactModal(), component);
  assert.equal(await page.cache.loadContactModal(), component);
  assert.equal(page.imports.length, 2);
});
