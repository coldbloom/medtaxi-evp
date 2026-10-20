import assert from "node:assert/strict";
import { test } from "node:test";
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from "next/constants.js";
import { validateProductionApiUrl } from "../scripts/validate-production-api.mjs";
import { moduleLoader } from "./helpers/componentHarness.mjs";

test("production build accepts public HTTPS API bases and same-origin proxy paths", () => {
  for (const value of ["https://api.example.com", "https://example.com/api/", "/api", "/api/v1/"]) {
    assert.doesNotThrow(() => validateProductionApiUrl(value), value);
  }
});

test("production build rejects missing, local, insecure and malformed API settings", () => {
  for (const value of [
    undefined, "", " ", "api", "/", "/api/../", "//api.example.com",
    "http://api.example.com", "https://", "https://api.example.com api", "/api\\other",
    "https://api.example.com?token=private", "https://api.example.com/#part", "/api?x=1", "/api#",
    "https://localhost/api", "https://test.localhost./api", "https://0.0.0.0/api",
    "https://127.1/api", "https://2130706433/api", "https://[::1]/api", "https://[::]/api",
    "https://[::ffff:127.0.0.1]/api", "https://[::ffff:0.0.0.0]/api",
  ]) {
    assert.throws(() => validateProductionApiUrl(value), /NEXT_PUBLIC_API_URL:/, String(value));
  }
});

test("API configuration errors never disclose the supplied value", () => {
  for (const value of ["https://user:private-password@api.example.com", "https://api.example.com?token=private-token"]) {
    assert.throws(() => validateProductionApiUrl(value), (error) => {
      assert.match(error.message, /NEXT_PUBLIC_API_URL:/);
      assert.doesNotMatch(error.message, /private-password|private-token|api\.example\.com/);
      return true;
    });
  }
});

test("Next config requires the API only during a production build and uses standard next start output", () => {
  const env = {};
  const config = moduleLoader({ globals: { process: { env, cwd: () => process.cwd() }, URL } }).load("next.config.ts").default;
  assert.equal(config(PHASE_DEVELOPMENT_SERVER).output, undefined);
  assert.throws(() => config(PHASE_PRODUCTION_BUILD), /NEXT_PUBLIC_API_URL: is required/);
  env.NEXT_PUBLIC_API_URL = "/api";
  const production = config(PHASE_PRODUCTION_BUILD);
  assert.equal(production.output, undefined);
  assert.equal(production.trailingSlash, false);
  assert.notEqual(production.images?.unoptimized, true);
});

test("immutable video caching is restricted to the five content-hashed manifest files", async () => {
  const loader = moduleLoader({ globals: { process: { env: {}, cwd: () => process.cwd() }, URL } });
  const { donetskHeroVideo } = loader.load("app/donetsk/video.generated.ts");
  const config = loader.load("next.config.ts").default(PHASE_DEVELOPMENT_SERVER);
  const rules = await config.headers();
  const immutable = rules.filter(({ headers }) => headers.some(({ key, value }) =>
    key.toLowerCase() === "cache-control" && /\bimmutable\b/.test(value)));
  const expected = [
    donetskHeroVideo.poster.src,
    donetskHeroVideo.mobile.webm.src,
    donetskHeroVideo.mobile.mp4.src,
    donetskHeroVideo.desktop.webm.src,
    donetskHeroVideo.desktop.mp4.src,
  ];
  // Exact paths prevent a broad matcher from caching HTML, source videos or future mutable files.
  assert.deepEqual(Array.from(immutable, ({ source }) => source).sort(), expected.sort());
  for (const { headers } of immutable) {
    const policy = headers.find(({ key }) => key.toLowerCase() === "cache-control").value;
    assert.match(policy, /\bpublic\b/);
    assert.match(policy, /\bmax-age=31536000\b/);
  }
});
