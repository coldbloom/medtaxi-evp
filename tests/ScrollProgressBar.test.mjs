import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const require = createRequire(import.meta.url);
const source = readFileSync("app/components/ScrollProgressBar/ScrollProgressBar.tsx", "utf8");
const code = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const exports = {};

// Node не загружает CSS Modules: для проверки HTML достаточно имени класса.
vm.runInNewContext(code, {
  exports,
  require: (name) => name.endsWith(".module.css")
    ? { default: { progress: "progress", fill: "fill" } }
    : require(name),
});
const { ScrollProgressBar } = exports;

test("полоса рендерится сервером без browser API и не объявляет ложный ARIA-прогресс", () => {
  const html = renderToStaticMarkup(React.createElement(ScrollProgressBar));
  assert.match(html, /aria-hidden="true"/);
  assert.match(html, /class="progress"/);
  assert.match(html, /color:#2563eb;height:3px/);
  assert.doesNotMatch(html, /role=|aria-valuenow|tabindex=/i);
});

test("цвет, толщина и дополнительный класс настраиваются для другой страницы", () => {
  const html = renderToStaticMarkup(React.createElement(ScrollProgressBar, {
    color: "#f3b941", height: 4, className: "custom-progress",
  }));
  assert.match(html, /class="progress custom-progress"/);
  assert.match(html, /color:#f3b941;height:4px/);
});

test("sticky-классы относятся к внешнему контейнеру, заполнение находится внутри", () => {
  const html = renderToStaticMarkup(React.createElement(ScrollProgressBar, {
    className: "sticky top-0 z-30",
  }));
  assert.match(html, /^<div aria-hidden="true" class="progress sticky top-0 z-30"/);
  assert.match(html, /<div class="fill"><\/div><\/div>$/);
  assert.doesNotMatch(html, /style="[^"]*(?:position|top|bottom):/);
});
