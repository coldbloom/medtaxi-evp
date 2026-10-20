import assert from "node:assert/strict";
import { test } from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { hookRenderer, moduleLoader, nodes, textContent } from "./helpers/componentHarness.mjs";

test("route and root-layout error fallbacks keep a working retry and native contact links", () => {
  for (const file of ["app/error.tsx", "app/global-error.tsx"]) {
    const loader = moduleLoader();
    const Component = loader.load(file).default;
    const renderer = hookRenderer();
    let retries = 0;
    const tree = renderer.render(Component, {
      error: new Error("private internal exception details"),
      retry: () => retries++,
    });
    const controls = nodes(tree);
    controls.find((node) => node.type === "button").props.onClick();
    assert.equal(retries, 1);
    assert.equal(controls.filter((node) => node.type === "h1").length, 1);
    assert.ok(controls.some((node) => node.type === "a" && node.props.href === "/contacts"));
    assert.ok(controls.some((node) => node.type === "a" && node.props.href === "tel:+79490676701"));
    assert.ok(controls.some((node) => node.type === "a" && node.props.href === "tel:+79789380221"));
    assert.doesNotMatch(textContent(tree), /private internal exception details/);
    assert.equal([...loader.loadedFiles].some((file) => /Header|Footer|ContactModal|next\/navigation/.test(file)), false);
  }
});

test("global errors render their own Russian document and title without depending on the failed layout", () => {
  const Component = moduleLoader().load("app/global-error.tsx").default;
  const html = renderToStaticMarkup(React.createElement(Component, { error: "failed", retry() {} }));
  assert.match(html, /^<html lang="ru">/);
  assert.match(html, /<title>Не удалось открыть страницу \| Медтакси<\/title>/);
  assert.match(html, /<body[^>]*>[\s\S]*<main/);
  assert.match(html, /<\/body><\/html>$/);
});
