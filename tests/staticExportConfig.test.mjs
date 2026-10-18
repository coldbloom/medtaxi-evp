import assert from "node:assert/strict";
import { test } from "node:test";
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from "next/constants.js";
import { validateExportApiUrl } from "../scripts/validate-export-api.mjs";
import { moduleLoader } from "./helpers/componentHarness.mjs";

test("static export accepts public HTTPS API bases and same-origin proxy paths", () => {
  for (const value of ["https://api.example.com", "https://example.com/api/", "/api", "/api/v1/"]) {
    assert.doesNotThrow(() => validateExportApiUrl(value), value);
  }
});

test("static export rejects missing, local, insecure and malformed API settings", () => {
  for (const value of [
    undefined, "", " ", "api", "/", "/api/../", "//api.example.com",
    "http://api.example.com", "https://", "https://api.example.com api", "/api\\other",
    "https://api.example.com?token=private", "https://api.example.com/#part", "/api?x=1", "/api#",
    "https://localhost/api", "https://test.localhost./api", "https://0.0.0.0/api",
    "https://127.1/api", "https://2130706433/api", "https://[::1]/api", "https://[::]/api",
    "https://[::ffff:127.0.0.1]/api", "https://[::ffff:0.0.0.0]/api",
  ]) {
    assert.throws(() => validateExportApiUrl(value), /NEXT_PUBLIC_API_URL:/, String(value));
  }
});

test("API configuration errors never disclose the supplied value", () => {
  for (const value of ["https://user:private-password@api.example.com", "https://api.example.com?token=private-token"]) {
    assert.throws(() => validateExportApiUrl(value), (error) => {
      assert.match(error.message, /NEXT_PUBLIC_API_URL:/);
      assert.doesNotMatch(error.message, /private-password|private-token|api\.example\.com/);
      return true;
    });
  }
});

test("Next config requires the API only during a production build and keeps static output", () => {
  const env = {};
  const config = moduleLoader({ globals: { process: { env, cwd: () => process.cwd() }, URL } }).load("next.config.ts").default;
  assert.equal(config(PHASE_DEVELOPMENT_SERVER).output, "export");
  assert.throws(() => config(PHASE_PRODUCTION_BUILD), /NEXT_PUBLIC_API_URL: is required/);
  env.NEXT_PUBLIC_API_URL = "/api";
  const production = config(PHASE_PRODUCTION_BUILD);
  assert.equal(production.output, "export");
  assert.equal(production.trailingSlash, false);
  assert.equal(production.images.unoptimized, true);
});
