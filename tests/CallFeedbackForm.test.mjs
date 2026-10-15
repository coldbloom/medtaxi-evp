import assert from "node:assert/strict";
import { test } from "node:test";
import * as React from "react";
import { renderToString } from "react-dom/server";
import { browserFixture, hookRenderer, moduleLoader, nodes, textContent } from "./helpers/componentHarness.mjs";

const linkAdapter = (props) => React.createElement("a", props, props.children);

// Render the coordinator, form, request hook and shell from their real modules.
// Only framework/DOM adapters are mocked; browser effects have real lifecycles.
function renderForm({ purpose = "call-followup", fetchResponse, apiUrl = "https://api.example.test/" } = {}) {
  const browser = browserFixture();
  const renderer = hookRenderer(browser);
  let tree;
  let closed = 0;
  let successes = 0;
  let errors = 0;
  let timerId = 0;
  const timers = new Map();
  const requests = [];
  Object.assign(browser.window, {
    setTimeout(callback, delay) {
      timers.set(++timerId, { callback, delay });
      return timerId;
    },
    clearTimeout(id) { timers.delete(id); },
  });
  const loader = moduleLoader({
    mocks: {
      react: renderer.react,
      "react-dom": { createPortal: (children) => children },
      "next/link": linkAdapter,
    },
    globals: {
      document: browser.document,
      window: browser.window,
      setTimeout: browser.window.setTimeout,
      clearTimeout: browser.window.clearTimeout,
      process: { env: { NEXT_PUBLIC_API_URL: apiUrl } },
      console: { error() {} },
      fetch(url, options) {
        requests.push({ url, options, body: JSON.parse(options.body) });
        return fetchResponse ? fetchResponse(url, options) : Promise.resolve({ ok: true });
      },
    },
  });
  const { ContactModal } = loader.load("app/components/ContactModal/ContactModal.tsx");
  let props = {
    isOpen: true,
    purpose,
    callContext: { phone: "+79789380221", page: "/donetsk" },
    onClose: () => { closed++; props.isOpen = false; },
    onSubmitSuccess: () => successes++,
    onSubmitError: () => errors++,
  };

  function render() {
    tree = renderer.render(ContactModal, props);
    return tree;
  }
  function find(predicate) { return nodes(tree).find(predicate); }
  function field(name) { return find((node) => node.props.name === name); }
  function button(label) {
    const result = find((node) => node.type === "button" && textContent(node) === label);
    assert.ok(result, `Missing button: ${label}`);
    return result;
  }
  function click(label) {
    button(label).props.onClick();
    render();
  }
  function change(name, value) {
    const control = field(name);
    assert.ok(control, `Missing field: ${name}`);
    control.props.onChange({ target: { name, value, checked: value } });
    render();
  }
  function submit() {
    const form = find((node) => node.type === "form");
    assert.ok(form, "Expected a visible callback form");
    const result = form.props.onSubmit({ preventDefault() {} });
    render();
    return result;
  }
  function fillValid() {
    if (purpose === "call-followup") click("Нет, не удалось");
    change("name", "  Анна  ");
    change("phone", "89781112233");
    change("personalDataConsent", true);
  }
  render();
  return {
    render, find, field, button, click, change, submit, fillValid, requests, timers,
    cleanup: () => renderer.unmount(),
    reopen: () => { props.isOpen = true; render(); },
    update: (next) => { props = { ...props, ...next }; render(); },
    statuses: () => nodes(tree).filter((node) => node.props.role === "status"),
    document: browser.document,
    text: () => textContent(tree),
    closed: () => closed,
    successes: () => successes,
    errors: () => errors,
  };
}

test("the call follow-up asks about the call, and Yes thanks the user without sending a callback", () => {
  const page = renderForm();
  assert.match(page.text(), /Удалось ли вам дозвониться к нам/);
  assert.equal(page.find((node) => node.type === "form"), undefined);
  page.click("Да, дозвонились");
  assert.match(page.text(), /Спасибо за ответ/);
  assert.equal(page.find((node) => node.type === "form"), undefined);
  assert.equal(page.requests.length, 0);
  assert.equal(page.closed(), 0);
  page.click("Закрыть");
  assert.equal(page.closed(), 1);
});

test("No reveals a short callback form and an explicit promise to call back", () => {
  const page = renderForm();
  page.click("Нет, не удалось");
  assert.match(page.text(), /Мы сами вам перезвоним/);
  assert.match(page.text(), /Диспетчер сам свяжется с вами/);
  assert.equal(page.field("name").props.required, true);
  assert.equal(page.field("phone").props.required, true);
  assert.equal(page.field("personalDataConsent").props.required, true);
  assert.equal(page.field("personalDataConsent").props.checked, false);
  assert.equal(page.field("message"), undefined);
  assert.equal(page.button("Жду звонка").props.disabled, true);
});

test("consent, a nonblank name, and a complete phone are required before any request", async () => {
  const page = renderForm();
  page.click("Нет, не удалось");
  await page.submit();
  assert.match(textContent(page.find((node) => node.props.role === "alert")), /согласие/);
  page.change("personalDataConsent", true);
  page.change("name", "   ");
  page.change("phone", "89781112233");
  await page.submit();
  assert.match(textContent(page.find((node) => node.props.role === "alert")), /Введите ваше имя/);
  page.change("name", "Анна");
  page.change("phone", "8978");
  await page.submit();
  assert.match(textContent(page.find((node) => node.props.role === "alert")), /номер телефона полностью/);
  assert.equal(page.requests.length, 0);
  assert.equal(page.closed(), 0);
});

test("a confirmed follow-up request preserves the feedback API contract and displays a durable success screen", async () => {
  const page = renderForm();
  page.fillValid();
  await page.submit();
  page.render();
  assert.equal(page.requests.length, 1);
  const { url, options, body } = page.requests[0];
  assert.equal(url, "https://api.example.test/feedback");
  assert.equal(options.method, "POST");
  assert.equal(options.headers["Content-Type"], "application/json");
  assert.equal(options.mode, "cors");
  assert.equal(options.credentials, "omit");
  assert.equal(body.name, "Анна");
  assert.equal(body.phone, "+7 (978) 111-22-33");
  assert.equal(body.personalDataConsent, true);
  assert.equal(body.consentVersion, "2026-09-26");
  assert.ok(Number.isFinite(Date.parse(body.consentedAt)));
  assert.match(body.message, /Не удалось дозвониться.*Прошу перезвонить/);
  assert.match(body.message, /\+79789380221/);
  assert.match(body.message, /\/donetsk/);
  assert.match(page.text(), /Заявка принята/);
  assert.match(textContent(page.find((node) => node.props.role === "status")), /перезвоним вам/);
  assert.equal(page.find((node) => node.type === "form"), undefined);
  assert.equal(page.closed(), 0);
  assert.equal(page.successes(), 1);
  assert.equal(page.statuses().length, 1);
  assert.equal(page.errors(), 0);
  assert.equal(page.timers.size, 0);
  page.render();
  assert.match(page.text(), /Заявка принята/);
  page.click("Закрыть");
  assert.equal(page.closed(), 1);
});

test("pending submissions cannot be duplicated or accidentally closed, and do not claim success", async () => {
  let resolveRequest;
  const page = renderForm({ fetchResponse: () => new Promise((resolve) => { resolveRequest = resolve; }) });
  page.fillValid();
  const form = page.find((node) => node.type === "form");
  const pending = form.props.onSubmit({ preventDefault() {} });
  // A second event can arrive before React has committed the disabled state.
  await form.props.onSubmit({ preventDefault() {} });
  page.render();
  assert.equal(page.requests.length, 1);
  assert.equal(page.find((node) => node.props.type === "submit").props.disabled, true);
  assert.equal(page.find((node) => node.props.role === "dialog").props["aria-busy"], true);
  assert.doesNotMatch(page.text(), /Заявка принята/);
  page.click("Отмена");
  assert.equal(page.closed(), 0);
  page.document.dispatch("keydown", { key: "Escape", preventDefault() {} });
  assert.equal(page.closed(), 0);
  page.change("name", "Changed while pending");
  page.change("personalDataConsent", false);
  assert.equal(page.field("name").props.value, "  Анна  ");
  assert.equal(page.field("personalDataConsent").props.checked, true);
  resolveRequest({ ok: true });
  await pending;
  page.render();
  assert.match(page.text(), /Заявка принята/);
});

for (const failure of ["http", "network", "timeout"]) {
  test(`${failure} failure keeps the form data and consent, shows an inline alert, and permits retry`, async () => {
    let attempts = 0;
    const page = renderForm({
      fetchResponse: (_url, { signal }) => {
        if (++attempts > 1) return Promise.resolve({ ok: true });
        if (failure === "http") return Promise.resolve({ ok: false, status: 503, text: async () => "Unavailable" });
        if (failure === "network") return Promise.reject(new TypeError("Failed to fetch"));
        return new Promise((_resolve, reject) => signal.addEventListener("abort", () => reject(new Error("Aborted")), { once: true }));
      },
    });
    page.fillValid();
    const pending = page.submit();
    if (failure === "timeout") {
      assert.equal(page.timers.size, 1);
      const timer = [...page.timers.values()][0];
      assert.equal(timer.delay, 15_000);
      timer.callback();
      assert.equal(page.requests[0].options.signal.aborted, true);
    }
    await pending;
    page.render();
    assert.equal(page.field("name").props.value, "  Анна  ");
    assert.equal(page.field("phone").props.value, "+7 (978) 111-22-33");
    assert.equal(page.field("personalDataConsent").props.checked, true);
    assert.match(textContent(page.find((node) => node.props.role === "alert")), /Не удалось подтвердить отправку.*данные сохранены/);
    assert.doesNotMatch(page.text(), /Заявка принята/);
    assert.equal(page.button("Жду звонка").props.disabled, false);
    assert.equal(page.closed(), 0);
    assert.equal(page.successes(), 0);
    assert.equal(page.errors(), 1);
    assert.equal(page.timers.size, 0);
    await page.submit();
    page.render();
    assert.equal(page.requests.length, 2);
    assert.equal(page.successes(), 1);
    assert.match(page.text(), /Заявка принята/);
  });
}

test("ordinary callback requests preserve the API payload and show one durable confirmation before resetting on next open", async () => {
  const page = renderForm({ purpose: "callback", apiUrl: "" });
  assert.match(page.text(), /Заказать обратный звонок/);
  assert.doesNotMatch(page.text(), /Удалось ли вам дозвониться/);
  page.fillValid();
  page.change("message", "  Из Евпатории в Симферополь  ");
  await page.submit();
  page.render();
  const { url, body } = page.requests[0];
  assert.equal(url, "/feedback");
  assert.deepEqual(Object.keys(body).sort(), ["consentVersion", "consentedAt", "message", "name", "personalDataConsent", "phone"]);
  assert.equal(body.message, "Из Евпатории в Симферополь");
  assert.equal(body.name, "Анна");
  assert.equal(body.phone, "+7 (978) 111-22-33");
  assert.equal(page.closed(), 0);
  assert.equal(page.successes(), 1);
  assert.match(page.text(), /Заявка принята/);
  assert.equal(page.statuses().length, 1);
  page.render();
  assert.equal(page.statuses().length, 1);
  page.click("Закрыть");
  assert.equal(page.closed(), 1);
  assert.equal(page.statuses().length, 0);
  page.reopen();
  assert.match(page.text(), /Заказать обратный звонок/);
  assert.equal(page.field("name").props.value, "");
  assert.equal(page.field("phone").props.value, "");
  assert.equal(page.field("personalDataConsent").props.checked, false);
  assert.equal(page.statuses().length, 0);
});

test("closing and reopening an ordinary callback after failure preserves the failed draft and consent", async () => {
  const page = renderForm({ purpose: "callback", fetchResponse: () => Promise.reject(new TypeError("Offline")) });
  page.fillValid();
  page.change("message", "Помогите с поездкой");
  await page.submit();
  page.render();
  page.click("Отмена");
  assert.equal(page.closed(), 1);
  page.reopen();
  assert.equal(page.field("name").props.value, "  Анна  ");
  assert.equal(page.field("phone").props.value, "+7 (978) 111-22-33");
  assert.equal(page.field("message").props.value, "Помогите с поездкой");
  assert.equal(page.field("personalDataConsent").props.checked, true);
  assert.match(textContent(page.find((node) => node.props.role === "alert")), /данные сохранены/);
  assert.equal(page.statuses().length, 0);
  page.cleanup();
});

test("unmounting during submission aborts the request, clears its timeout and suppresses success/error callbacks", async () => {
  const page = renderForm({
    fetchResponse: (_url, { signal }) => new Promise((_resolve, reject) => {
      signal.addEventListener("abort", () => reject(new Error("Aborted")), { once: true });
    }),
  });
  page.fillValid();
  const pending = page.submit();
  assert.equal(page.timers.size, 1);
  page.cleanup();
  assert.equal(page.requests[0].options.signal.aborted, true);
  await pending;
  assert.equal(page.timers.size, 0);
  assert.equal(page.successes(), 0);
  assert.equal(page.errors(), 0);
  assert.equal(page.document.listeners.size, 0);
});

test("closed ordinary and follow-up dialogs render safely on the server without browser globals or global notifications", () => {
  const loader = moduleLoader({ mocks: { "next/link": linkAdapter } });
  const { ContactModal } = loader.load("app/components/ContactModal/ContactModal.tsx");
  for (const purpose of ["callback", "call-followup"]) {
    assert.equal(renderToString(React.createElement(ContactModal, { isOpen: false, purpose, onClose() {} })), "");
  }
});
