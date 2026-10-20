import assert from "node:assert/strict";
import { test } from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { moduleLoader } from "./helpers/componentHarness.mjs";

function routeLinkFixture() {
  const LinkStatusContext = React.createContext(null);
  let pending = false;
  const calls = [];
  function Link({ prefetch, children, ...anchorProps }) {
    calls.push({ prefetch, ...anchorProps });
    return React.createElement(LinkStatusContext.Provider, { value: { pending } },
      React.createElement("a", anchorProps, children));
  }
  function useLinkStatus() {
    const status = React.useContext(LinkStatusContext);
    assert.notEqual(status, null, "the status indicator must be a descendant of the Next Link");
    return status;
  }
  const loader = moduleLoader({ mocks: { "next/link": { __esModule: true, default: Link, useLinkStatus } } });
  const { DonetskRouteLink } = loader.load("app/donetsk/components/DonetskRouteLink.tsx");
  const { RouteLinkStatus } = loader.load("app/donetsk/components/RouteLinkStatus.tsx");
  return {
    calls,
    render(props, nextPending = false) {
      pending = nextPending;
      return renderToStaticMarkup(React.createElement(DonetskRouteLink, props, "Перейти на страницу"));
    },
    renderStatus(label, nextPending = false) {
      pending = nextPending;
      return renderToStaticMarkup(React.createElement(Link, { href: "/donetsk/moskva" },
        React.createElement(RouteLinkStatus, { label })));
    },
  };
}

test("route links preserve native href, target and accessible label without speculative prefetch", () => {
  const { calls, render } = routeLinkFixture();
  for (const href of ["/donetsk", "/donetsk/moskva"]) {
    const html = render({ href, target: "_blank", rel: "noopener noreferrer", "aria-label": "Открыть маршрут" });
    assert.ok(html.includes(`href="${href}"`));
    assert.match(html, /^<a\b/);
    assert.match(html, /target="_blank"/);
    assert.match(html, /rel="noopener noreferrer"/);
    assert.match(html, /aria-label="Открыть маршрут"/);
    assert.doesNotMatch(html, /Открываем страницу/);
    assert.equal(calls.at(-1).prefetch, false);
  }
  render({ href: "/donetsk", prefetch: true });
  assert.equal(calls.at(-1).prefetch, true, "existing menu links can retain their prefetch policy");
});

test("pending navigation announces progress and clears it while preserving the destination", () => {
  const { render } = routeLinkFixture();
  const props = { href: "/donetsk/moskva" };
  const pending = render(props, true);
  assert.match(pending, /data-navigation-pending="true"/);
  assert.match(pending, /role="status"[^>]*aria-live="polite"/);
  assert.match(pending, /Открываем страницу/);
  assert.ok(pending.includes('href="/donetsk/moskva"'));
  const complete = render(props, false);
  assert.match(complete, /data-navigation-pending="false"/);
  assert.doesNotMatch(complete, /Открываем страницу/);
  assert.ok(complete.includes('href="/donetsk/moskva"'));
});

test("a pending card names its destination without nested controls or a blocking dialog", () => {
  const { renderStatus } = routeLinkFixture();
  const label = "Тестовое направление";
  const pending = renderStatus(label, true);
  assert.ok(pending.includes(label));
  assert.equal((pending.match(/<a\b/g) || []).length, 1, "a card inside a Link must not introduce nested links");
  assert.equal((pending.match(/role="status"/g) || []).length, 1);
  assert.doesNotMatch(pending, /<(?:button|input|form|video|img|h1)\b|role="dialog"|aria-modal=/);
  const idle = renderStatus(label, false);
  assert.ok(!idle.includes(label), "the destination announcement must be cleared when navigation finishes");
  assert.doesNotMatch(idle, /Открываем страницу/);
});
