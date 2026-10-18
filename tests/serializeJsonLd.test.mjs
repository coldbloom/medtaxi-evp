import assert from "node:assert/strict";
import test from "node:test";
import { moduleLoader } from "./helpers/componentHarness.mjs";

const { serializeJsonLd } = moduleLoader().load("./app/lib/serializeJsonLd.ts");

test("JSON-LD text cannot close its script element and preserves the schema data", () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Перевозка пациента",
    description: '</script><script>alert("x")</script><!--',
    offers: { "@type": "Offer", description: "Цена < 5000 & условия > 0" },
  };

  const serialized = serializeJsonLd(schema);

  assert.equal(serialized.includes("<"), false);
  assert.deepEqual(JSON.parse(serialized), schema);
});
