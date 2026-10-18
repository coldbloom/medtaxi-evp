import assert from "node:assert/strict";
import { test } from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { hookRenderer, moduleLoader } from "./helpers/componentHarness.mjs";

function animationFixture({ top = 1200, reducedMotion = false, observerAvailable = true } = {}) {
  const classes = new Set(["animate-on-scroll", "animate-up"]);
  const element = {
    getBoundingClientRect: () => ({ top, bottom: top + 300 }),
    classList: {
      add: (name) => classes.add(name),
      remove: (name) => classes.delete(name),
    },
  };
  const observers = [];
  class Observer {
    constructor(callback) {
      this.callback = callback;
      this.disconnected = false;
      observers.push(this);
    }
    observe(target) {
      assert.equal(target, element);
      assert.equal(classes.has("animate-pending"), false, "content is still visible when observation starts");
    }
    disconnect() { this.disconnected = true; }
  }
  const renderer = hookRenderer({ createHost: () => element });
  const loader = moduleLoader({
    mocks: { react: renderer.react },
    globals: {
      window: { innerHeight: 800, matchMedia: () => ({ matches: reducedMotion }) },
      ...(observerAvailable ? { IntersectionObserver: Observer } : {}),
    },
  });
  const AnimateOnScroll = loader.load("app/components/AnimateOnScroll.tsx").default;
  renderer.render(AnimateOnScroll, { children: "Услуги перевозки", direction: "up" });
  return { classes, observers, renderer };
}

test("animation content renders on the server without browser APIs or a hidden initial class", () => {
  const AnimateOnScroll = moduleLoader().load("app/components/AnimateOnScroll.tsx").default;
  const html = renderToStaticMarkup(React.createElement(AnimateOnScroll, {
    direction: "up", delay: 100,
  }, "Услуги перевозки"));
  assert.match(html, /Услуги перевозки/);
  assert.match(html, /animate-up/);
  assert.doesNotMatch(html, /animate-pending|hidden|opacity:0/);
});

test("only offscreen content waits for intersection and is revealed once in view", () => {
  const { classes, observers, renderer } = animationFixture();
  assert.equal(observers.length, 1);
  assert.equal(classes.has("animate-pending"), true);
  observers[0].callback([{ isIntersecting: false }]);
  assert.equal(classes.has("animate-pending"), true);
  observers[0].callback([{ isIntersecting: true }]);
  assert.equal(classes.has("animate-pending"), false);
  assert.equal(observers[0].disconnected, true);
  renderer.unmount();
});

test("late hydration never hides content already visible or above the viewport", () => {
  for (const top of [100, -500]) {
    const { classes, observers, renderer } = animationFixture({ top });
    assert.equal(classes.has("animate-pending"), false);
    assert.equal(observers.length, 0);
    renderer.unmount();
  }
});

test("reduced motion and browsers without IntersectionObserver keep content visible", () => {
  for (const options of [{ reducedMotion: true }, { observerAvailable: false }]) {
    const { classes, observers, renderer } = animationFixture(options);
    assert.equal(classes.has("animate-pending"), false);
    assert.equal(observers.length, 0);
    renderer.unmount();
  }
});

test("unmount cancels observation and removes the temporary hidden state", () => {
  const { classes, observers, renderer } = animationFixture();
  assert.equal(classes.has("animate-pending"), true);
  renderer.unmount();
  assert.equal(classes.has("animate-pending"), false);
  assert.equal(observers[0].disconnected, true);
});
