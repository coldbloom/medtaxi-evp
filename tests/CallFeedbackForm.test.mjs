import assert from "node:assert/strict";
import { test } from "node:test";
import * as React from "react";
import { webcrypto } from "node:crypto";
import { renderToString } from "react-dom/server";
import { browserFixture, hookRenderer, moduleLoader, nodes, textContent } from "./helpers/componentHarness.mjs";

const accepted = (body) => ({ ok: true, json: async () => ({ success: true, requestId: body.requestId, leadId: "stored-lead-id" }) });

const linkAdapter = (props) => React.createElement("a", props, props.children);

// Render the coordinator, form, request hook and shell from their real modules.
// Only framework/DOM adapters are mocked; browser effects have real lifecycles.
function renderForm({ purpose = "call-followup", variant = "default", fetchResponse, apiUrl = "https://api.example.test/" } = {}) {
  const browser = browserFixture();
  const renderer = hookRenderer(browser);
  let tree;
  let closed = 0;
  let successes = 0;
  let errors = 0;
  let contactFormOpens = 0;
  let timerId = 0;
  const timers = new Map();
  const requests = [];
  const diagnostics = [];
  const analyticsEvents = [];
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
      "@/app/lib/siteAnalytics": { trackSiteEvent: (...event) => analyticsEvents.push(event) },
    },
    globals: {
      crypto: webcrypto,
      document: browser.document,
      window: browser.window,
      setTimeout: browser.window.setTimeout,
      clearTimeout: browser.window.clearTimeout,
      process: { env: { NEXT_PUBLIC_API_URL: apiUrl } },
      console: { error: (...entry) => diagnostics.push(entry) },
      fetch(url, options) {
        requests.push({ url, options, body: JSON.parse(options.body) });
        return fetchResponse ? fetchResponse(url, options) : Promise.resolve(accepted(JSON.parse(options.body)));
      },
    },
  });
  const { ContactModal } = loader.load("app/components/ContactModal/ContactModal.tsx");
  let props = {
    isOpen: true,
    purpose,
    variant,
    callContext: { phone: "+79789380221", page: "/donetsk" },
    onClose: () => { closed++; props.isOpen = false; },
    onSubmitSuccess: () => successes++,
    onSubmitError: () => errors++,
    onContactFormOpen: () => contactFormOpens++,
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
    render, find, field, button, click, change, submit, fillValid, requests, timers, analyticsEvents, diagnostics,
    cleanup: () => renderer.unmount(),
    reopen: () => { props.isOpen = true; render(); },
    update: (next) => { props = { ...props, ...next }; render(); },
    statuses: () => nodes(tree).filter((node) => node.props.role === "status"),
    document: browser.document,
    text: () => textContent(tree),
    closed: () => closed,
    successes: () => successes,
    errors: () => errors,
    contactFormOpens: () => contactFormOpens,
  };
}

for (const { variant, phone, label } of [
  { variant: "default", phone: "+79789380221", label: "+7 (978) 938-02-21" },
  { variant: "default", phone: "+79895052785", label: "+7 (989) 505-27-85" },
  { variant: "donetsk", phone: "+79490676701", label: "+7 (949) 067-67-01" },
]) {
  test(`callback direct contact preserves the configured phone ${phone} with ${variant} styling`, (t) => {
    const page = renderForm({ purpose: "callback", variant });
    t.after(page.cleanup);
    page.update({ contactPhoneHref: phone, contactPhoneLabel: label });
    const link = page.find((node) => node.type === "a" && node.props.href?.startsWith("tel:"));
    assert.ok(link);
    assert.equal(link.props.href, `tel:${phone}`);
    assert.equal(link.props["aria-label"], `Позвонить ${label}`);
    assert.equal(link.props.title, `Позвонить ${label}`);
    assert.equal(link.props["data-call-tracking-id"], "contact_modal_footer_phone");
    assert.equal(link.props["data-donetsk-goal"], variant === "donetsk" ? "donetsk_phone_click" : undefined);
  });
}

test("messenger entry offers safe external links and opens the existing callback form only on request", (t) => {
  const page = renderForm({ purpose: "contact-choice", variant: "donetsk" });
  t.after(page.cleanup);
  assert.match(page.text(), /Как вам удобно связаться/);
  assert.equal(page.find((node) => node.type === "form"), undefined);
  for (const [label, href] of [
    ["Telegram", "https://t.me/konstankk"],
    ["MAX", "https://max.ru/u/f9LHodD0cOI7hGFwnp4y8CBCeTVIs3kkyT-JqLq2wJc3ES2VjFOgy02xevs"],
  ]) {
    const link = page.find((node) => node.type === "a" && textContent(node).includes(`Написать в ${label}`));
    assert.ok(link, `Missing messenger link: ${label}`);
    assert.equal(link.props.href, href);
    assert.equal(link.props.target, "_blank");
    assert.match(link.props.rel, /noopener/);
    assert.match(link.props.rel, /noreferrer/);
  }
  assert.equal(page.requests.length, 0);
  assert.equal(page.contactFormOpens(), 0);
  const openForm = page.button("Оставить заявку на сайте").props.onClick;
  openForm();
  openForm(); // A second click can arrive before React commits the new step.
  page.render();
  assert.match(page.text(), /Заказать обратный звонок/);
  assert.equal(page.contactFormOpens(), 1);
  assert.equal(page.field("name").props.required, true);
  assert.ok(page.field("message"));
  assert.equal(page.requests.length, 0);
});

for (const { variant, phone, label } of [
  { variant: "default", phone: "+79895052785", label: "+7 (989) 505-27-85" },
  { variant: "donetsk", phone: "+79490676701", label: "+7 (949) 067-67-01" },
]) {
  test(`call follow-up retains the dialled phone ${phone} in its direct contact link`, (t) => {
    const page = renderForm({ variant });
    t.after(page.cleanup);
    page.update({ callContext: { phone, page: variant === "donetsk" ? "/donetsk" : "/" } });
    page.click("Нет, не удалось");
    const link = page.find((node) => node.type === "a" && node.props.href?.startsWith("tel:"));
    assert.equal(link.props.href, `tel:${phone}`);
    assert.equal(link.props["aria-label"], `Позвонить ${label}`);
    assert.equal(link.props["data-call-tracking-id"], "call_followup_footer_phone");
  });
}

test("reopening messenger choice preserves an unfinished form draft and resets only the entry screen", (t) => {
  const page = renderForm({ purpose: "contact-choice", variant: "donetsk" });
  t.after(page.cleanup);
  page.click("Оставить заявку на сайте");
  page.fillValid();
  page.change("message", "Из Донецка в Москву");
  page.click("Отмена");
  page.reopen();
  assert.match(page.text(), /Как вам удобно связаться/);
  assert.equal(page.find((node) => node.type === "form"), undefined);
  page.click("Оставить заявку на сайте");
  assert.equal(page.field("name").props.value, "  Анна  ");
  assert.equal(page.field("phone").props.value, "+7 (978) 111-22-33");
  assert.equal(page.field("message").props.value, "Из Донецка в Москву");
  assert.equal(page.field("personalDataConsent").props.checked, true);
  assert.equal(page.contactFormOpens(), 2);
  assert.equal(page.requests.length, 0);
});

test("switching between direct callback and messenger entry preserves the draft without showing a stale step", (t) => {
  const page = renderForm({ purpose: "callback", variant: "donetsk" });
  t.after(page.cleanup);
  page.change("name", "Анна");
  page.update({ isOpen: false }); // The shared controller can close the dialog for a phone call.
  page.update({ isOpen: true, purpose: "contact-choice" });
  assert.match(page.text(), /Как вам удобно связаться/);
  assert.equal(page.find((node) => node.type === "form"), undefined);
  page.click("Оставить заявку на сайте");
  assert.equal(page.field("name").props.value, "Анна");
  page.update({ isOpen: false });
  page.update({ isOpen: true, purpose: "callback" });
  assert.match(page.text(), /Заказать обратный звонок/);
  assert.equal(page.field("name").props.value, "Анна");
  assert.equal(page.contactFormOpens(), 1);
});

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
  assert.equal(body.consentVersion, "2026-11-03");
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
  resolveRequest(accepted(page.requests[0].body));
  await pending;
  page.render();
  assert.match(page.text(), /Заявка принята/);
});

for (const failure of ["http", "network", "timeout"]) {
  test(`${failure} failure keeps the form data and consent, shows an inline alert, and permits retry`, async () => {
    let attempts = 0;
    const page = renderForm({
      fetchResponse: (_url, { signal, body }) => {
        if (++attempts > 1) return Promise.resolve(accepted(JSON.parse(body)));
        if (failure === "http") return Promise.resolve({ ok: false, status: 503,
          json: async () => { throw new SyntaxError("Unavailable"); } });
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
    assert.equal(page.diagnostics.length, 1);
    const diagnostic = page.diagnostics[0][1];
    assert.equal(diagnostic.code, { http: "NON_JSON_RESPONSE", network: "NETWORK_ERROR", timeout: "REQUEST_TIMEOUT" }[failure]);
    assert.equal(diagnostic.submissionId, page.requests[0].body.requestId);
    assert.doesNotMatch(JSON.stringify(page.diagnostics), /Анна|978|Failed to fetch|Unavailable/);
    await page.submit();
    page.render();
    assert.equal(page.requests.length, 2);
    assert.equal(page.successes(), 1);
    assert.match(page.text(), /Заявка принята/);
  });
}

test("a JSON rejection is inspected and logs only safe correlation metadata while preserving the draft", async (t) => {
  const requestId = "f743ee59-adde-4d79-a592-c5ff2f2d5f62";
  let reads = 0;
  const page = renderForm({
    fetchResponse: () => Promise.resolve({
      ok: false, status: 400,
      headers: { get: () => requestId },
      json: async () => {
        reads++;
        return {
          error: "Do not log Анна, +7 (978) 111-22-33 or secret-token",
          code: "VALIDATION_ERROR", requestId,
          details: { fields: ["phone", "consentVersion", "phone", "secret-token"], phone: "+79781112233" },
          body: { name: "Анна", message: "Private route" },
        };
      },
    }),
  });
  t.after(page.cleanup);
  page.fillValid();
  await page.submit();
  page.render();
  assert.equal(reads, 1);
  const [label, diagnostic] = page.diagnostics[0];
  assert.equal(label, "[feedback] request failed");
  assert.deepEqual(JSON.parse(JSON.stringify(diagnostic)), {
    status: 400, submissionId: page.requests[0].body.requestId, requestId,
    kind: "http", code: "VALIDATION_ERROR", fields: ["phone", "consentVersion"],
  });
  assert.equal(page.field("phone").props.value, "+7 (978) 111-22-33");
  assert.match(page.text(), /данные сохранены/);
  assert.doesNotMatch(JSON.stringify(page.diagnostics), /Анна|978|secret-token|Private route/);
  assert.doesNotMatch(page.text(), /VALIDATION_ERROR|secret-token|f743ee59/);
  await page.submit();
  assert.equal(page.requests[0].options.body, page.requests[1].options.body);
});

test("a JSON proxy error can correlate by its nginx request ID without a response header", async (t) => {
  const requestId = "a1341cef4c564a2e84adb38f244dd27b";
  const page = renderForm({ fetchResponse: () => Promise.resolve({
    ok: false, status: 502,
    json: async () => ({ error: "Backend unavailable", code: "UPSTREAM_UNAVAILABLE", requestId }),
  }) });
  t.after(page.cleanup);
  page.fillValid();
  await page.submit();
  assert.equal(page.diagnostics[0][1].requestId, requestId);
  assert.equal(page.diagnostics[0][1].code, "UPSTREAM_UNAVAILABLE");
  assert.equal(page.diagnostics[0][1].status, 502);
  assert.equal(page.successes(), 0);
});

test("unrecognized errors and identifiers cannot inject response data into the diagnostic log", async (t) => {
  const page = renderForm({ fetchResponse: () => Promise.resolve({
    ok: false, status: 503,
    headers: { get: () => "+79781112233" },
    json: async () => ({
      error: "Token secret-token", code: "secret-token", requestId: "Анна",
      details: { fields: ["secret-token"] },
    }),
  }) });
  t.after(page.cleanup);
  page.fillValid();
  await page.submit();
  const diagnostic = page.diagnostics[0][1];
  assert.equal(diagnostic.code, "HTTP_ERROR");
  assert.equal(diagnostic.requestId, undefined);
  assert.equal(diagnostic.fields, undefined);
  assert.doesNotMatch(JSON.stringify(page.diagnostics), /Анна|978|secret-token/);
});

test("an HTML response exposes its HTTP status and request ID without logging the page", async (t) => {
  const requestId = "2d343ef8-00e6-4244-b6d8-1ddd3a297337";
  const page = renderForm({ fetchResponse: () => Promise.resolve({
    ok: false, status: 502,
    headers: { get: () => requestId },
    json: async () => { throw new SyntaxError('Unexpected token < in <html>secret-token</html>'); },
  }) });
  t.after(page.cleanup);
  page.fillValid();
  await page.submit();
  assert.equal(page.diagnostics[0][1].code, "NON_JSON_RESPONSE");
  assert.equal(page.diagnostics[0][1].status, 502);
  assert.equal(page.diagnostics[0][1].requestId, requestId);
  assert.doesNotMatch(JSON.stringify(page.diagnostics), /secret-token|<html>/);
  assert.equal(page.successes(), 0);
});

test("a connection lost while reading a successful response keeps the same submission for retry", async (t) => {
  let attempts = 0;
  const page = renderForm({ fetchResponse: (_url, options) => {
    if (++attempts > 1) return Promise.resolve(accepted(JSON.parse(options.body)));
    return Promise.resolve({ ok: true, status: 200, json: async () => { throw new TypeError("Connection lost secret-token"); } });
  } });
  t.after(page.cleanup);
  page.fillValid();
  await page.submit();
  page.render();
  assert.equal(page.diagnostics[0][1].code, "RESPONSE_READ_ERROR");
  assert.equal(page.diagnostics[0][1].status, 200);
  assert.equal(page.successes(), 0);
  assert.doesNotMatch(JSON.stringify(page.diagnostics), /secret-token/);
  await page.submit();
  assert.equal(page.requests[0].options.body, page.requests[1].options.body);
  assert.equal(page.successes(), 1);
});

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
  assert.deepEqual(Object.keys(body).sort(), ["consentVersion", "consentedAt", "kind", "message", "name", "page", "personalDataConsent", "phone", "requestId", "sessionId", "trackingId", "utm"]);
  assert.equal(body.kind, "callback");
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
  assert.equal(page.diagnostics.length, 0);
  assert.equal(page.document.listeners.size, 0);
});

test("closed ordinary, messenger and follow-up dialogs render safely on the server without browser globals or global notifications", () => {
  const loader = moduleLoader({ mocks: { "next/link": linkAdapter } });
  const { ContactModal } = loader.load("app/components/ContactModal/ContactModal.tsx");
  for (const purpose of ["callback", "contact-choice", "call-followup"]) {
    assert.equal(renderToString(React.createElement(ContactModal, { isOpen: false, purpose, onClose() {} })), "");
  }
});

test("a lost response reuses the exact logical submission, including consent time, until acknowledged", async () => {
  let attempt = 0;
  const page = renderForm({ fetchResponse: (_url, options) => {
    if (++attempt === 1) return Promise.reject(new Error("response lost after server commit"));
    return Promise.resolve(accepted(JSON.parse(options.body)));
  } });
  page.fillValid();
  await page.submit();
  page.render();
  await page.submit();
  page.render();
  assert.equal(page.requests.length, 2);
  assert.equal(page.requests[0].options.body, page.requests[1].options.body);
  assert.match(page.requests[0].body.requestId, /^[0-9a-f-]{36}$/);
  assert.equal(page.successes(), 1);
  assert.match(page.text(), /Заявка принята/);
  page.cleanup();
});

test("editing the request after a failed response starts a new idempotency key", async () => {
  const page = renderForm({ purpose: "callback", fetchResponse: () => Promise.reject(new Error("offline")) });
  page.fillValid();
  await page.submit();
  page.render();
  page.change("message", "Другой маршрут");
  await page.submit();
  page.render();
  assert.notEqual(page.requests[0].body.requestId, page.requests[1].body.requestId);
  assert.equal(page.requests[1].body.message, "Другой маршрут");
  assert.equal(page.successes(), 0);
  page.cleanup();
});

test("HTTP 200 with malformed or mismatched acknowledgement never clears the form", async () => {
  for (const acknowledgement of [null, {}, { success: true }, { success: true, requestId: "wrong", leadId: "lead" }]) {
    const page = renderForm({ fetchResponse: () => Promise.resolve({ ok: true, json: async () => acknowledgement }) });
    page.fillValid();
    await page.submit();
    page.render();
    assert.equal(page.successes(), 0);
    assert.equal(page.field("name").props.value, "  Анна  ");
    assert.match(page.text(), /Не удалось подтвердить отправку/);
    assert.equal(page.diagnostics[0][1].code, "INVALID_ACKNOWLEDGEMENT");
    page.cleanup();
  }
});

test("explicit call outcomes are recorded before any form, and a followup links to its click", async () => {
  for (const [answer, outcome] of [["Да, дозвонились", "connected"], ["Нет, не удалось", "not_connected"]]) {
    const page = renderForm();
    page.update({ callContext: { phone: "+79490676701", page: "/donetsk/moskva", trackingId: "hero", sourceEventId: "click-id" } });
    page.click(answer);
    const events = page.analyticsEvents.filter(([type]) => type === "call_outcome");
    assert.equal(events.length, 1);
    assert.equal(events[0][1].outcome, outcome);
    assert.equal(events[0][1].sourceEventId, "click-id");
    assert.equal(page.requests.length, 0, "answer alone does not invent a contact request");
    if (outcome === "not_connected") {
      page.change("name", "Анна");
      page.change("phone", "89781112233");
      page.change("personalDataConsent", true);
      await page.submit();
      assert.equal(page.requests[0].body.kind, "missed_call_followup");
      assert.equal(page.requests[0].body.sourceEventId, "click-id");
      assert.equal(page.requests[0].body.page, "/donetsk/moskva");
      assert.equal(page.requests[0].body.trackingId, "hero");
    }
    page.cleanup();
  }
});
