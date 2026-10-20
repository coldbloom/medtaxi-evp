import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { test } from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { moduleLoader } from "./helpers/componentHarness.mjs";

const escapeHtml = (text) => renderToStaticMarkup(React.createElement(React.Fragment, null, text));

test("every home FAQ question and answer in structured data is available in server HTML", () => {
  const loader = moduleLoader();
  const { Faq } = loader.load("app/components/sections/main/Faq/Faq.tsx");
  const { homeFaqStructuredData } = loader.load("src/features/home/content/faq.ts");
  const html = renderToStaticMarkup(React.createElement(Faq));

  assert.ok(homeFaqStructuredData.mainEntity.length > 0);
  assert.equal((html.match(/<details\b/g) || []).length, homeFaqStructuredData.mainEntity.length);
  assert.equal((html.match(/name="home-faq"/g) || []).length, homeFaqStructuredData.mainEntity.length);
  for (const question of homeFaqStructuredData.mainEntity) {
    assert.ok(html.includes(escapeHtml(question.name)), `Missing visible question: ${question.name}`);
    assert.ok(html.includes(escapeHtml(question.acceptedAnswer.text)), `Missing visible answer: ${question.name}`);
  }
});

test("published pricing links resolve to a real page or a generated service route", () => {
  const loader = moduleLoader();
  const { localPrices, crimeaPrices, russiaPrices } = loader.load("src/features/pricing/content.ts");
  const { serviceOffers } = loader.load("app/lib/serviceOffers.ts");
  const serviceRoutes = new Set(serviceOffers.map(({ route }) => route));

  for (const { link } of [...localPrices, ...crimeaPrices, ...russiaPrices]) {
    if (!link) continue;
    assert.ok(
      existsSync(`app${link}/page.tsx`) || serviceRoutes.has(link),
      `Pricing links to an unavailable route: ${link}`,
    );
  }
});

test("route tables render accessible columns and only link destinations that exist", () => {
  const loader = moduleLoader({
    mocks: {
      "next/link": {
        __esModule: true,
        default: ({ children, ...props }) => React.createElement("a", props, children),
      },
    },
  });
  const { RoutePriceTable } = loader.load("src/features/pricing/RoutePriceTable.tsx");
  const rows = [
    { route: "Маршрут с описанием", link: "/uslugi/example", km: "65 км", price: "от 5 000 руб." },
    { route: "Расчёт по звонку", link: null, km: "95 км", price: "от 7 000 руб." },
  ];
  const html = renderToStaticMarkup(React.createElement(RoutePriceTable, {
    rows, theme: "blue", headingId: "route-prices", title: "Стоимость", description: "Направления", note: "Уточните цену",
  }));
  assert.match(html, /<section[^>]*aria-labelledby="route-prices"/);
  assert.match(html, /<h2 id="route-prices"/);
  assert.equal((html.match(/scope="col"/g) || []).length, 3);
  assert.equal((html.match(/<a\b/g) || []).length, 1);
  assert.match(html, /href="\/uslugi\/example"/);
  assert.match(html, /Расчёт по звонку<\/td>/);
});
