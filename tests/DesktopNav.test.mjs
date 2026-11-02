import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { moduleLoader, nodes } from "./helpers/componentHarness.mjs";

function setup() {
  const loader = moduleLoader({
    mocks: {
      "next/link": {
        __esModule: true,
        default: ({ children, ...props }) => createElement("a", { ...props, prefetch: undefined }, children),
        useLinkStatus: () => ({ pending: false }),
      },
      "next/navigation": { usePathname: () => "/" },
      "./DesktopNav.module.scss": { __esModule: true, default: {} },
    },
  });
  return loader.load("app/components/sections/Header/DesktopNav/DesktopNav.tsx");
}

test("all desktop service links are in server HTML inside a native closed disclosure", () => {
  const { DesktopNav } = setup();
  const service = { title: "Евпатория — Москва", href: "/uslugi/perevozka-iz-evpatorii-v-moskvu" };
  const html = renderToStaticMarkup(createElement(DesktopNav, { services: [service] }));
  assert.match(html, /<details><summary/);
  assert.doesNotMatch(html, /<details[^>]*\bopen\b/);
  for (const href of [
    "/uslugi/perevozka-iz-bolnitsy-domoj",
    "/uslugi/perevozka-invalidov-kolyasochnikov",
    "/uslugi/mezhdugorodnye-perevozki",
    service.href,
  ]) {
    assert.ok(html.includes(`href="${href}"`), `Missing server link: ${href}`);
  }
});

test("desktop hover preserves keyboard focus and Escape closes the disclosure and returns to its summary", () => {
  const { DesktopNav } = setup();
  const disclosure = nodes(DesktopNav({ services: [] })).find((node) => node.type === "details");
  let focused = false;
  let focusInside = false;
  const summary = { focus: () => { focused = true; } };
  const element = {
    open: false,
    ownerDocument: { activeElement: {} },
    contains: () => focusInside,
    querySelector: (selector) => selector === "summary" ? summary : null,
  };
  disclosure.props.onMouseEnter({ currentTarget: element });
  assert.equal(element.open, true);
  focusInside = true;
  disclosure.props.onMouseLeave({ currentTarget: element });
  assert.equal(element.open, true);
  disclosure.props.onKeyDown({ key: "Escape", currentTarget: element });
  assert.equal(element.open, false);
  assert.equal(focused, true);
  disclosure.props.onMouseEnter({ currentTarget: element });
  focusInside = false;
  disclosure.props.onBlur({ currentTarget: element, relatedTarget: null });
  assert.equal(element.open, false);
});
