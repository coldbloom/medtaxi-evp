import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { copyFile, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

async function exportFixture(t) {
  const fixture = await mkdtemp(join(tmpdir(), "medtaxi-export-check-"));
  t.after(() => rm(fixture, { recursive: true, force: true }));
  await mkdir(join(fixture, "scripts"));
  await mkdir(join(fixture, "out/donetsk"), { recursive: true });
  await copyFile(new URL("../scripts/check-export.mjs", import.meta.url), join(fixture, "scripts/check-export.mjs"));
  const site = "https://medtaxi-evp.ru";
  const route = `${site}/donetsk/moskva`;
  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [["Главная", site], ["Донецк", `${site}/donetsk`], ["Москва", route]]
      .map(([name, item], index) => ({ "@type": "ListItem", position: index + 1, name, item })),
  };
  const html = `<!doctype html><html><head>
    <title>Перевозка лежачих больных Донецк — Москва | Медтакси</title>
    <link rel="canonical" href="${route}"><meta name="description" content="Перевозка в Москву">
    <script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>
    </head><body><main><h1>Перевозка лежачих больных из Донецка в Москву</h1>
    <h2>Стоимость перевозки Донецк — Москва</h2><h2>Mercedes для дальней поездки</h2>
    <h2>Вопросы о поездке в Москву</h2></main></body></html>`;
  const parentBreadcrumb = { "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", name: "Услуги", position: 1, item: `${site}/#services` },
    { "@type": "ListItem", name: "Донецк", position: 2, item: `${site}/donetsk` },
  ] };
  const parent = `<title>Донецк</title><link rel="canonical" href="${site}/donetsk">
    <meta name="description" content="Перевозка по Донецку"><main><h1>Донецк</h1></main>
    <script type="application/ld+json">${JSON.stringify({ "@graph": [parentBreadcrumb] })}</script>`;
  const files = {
    "index.html": `<title>Главная</title><meta name="description" content="Перевозка больных">
      <link rel="canonical" href="${site}"><main><h1>Главная</h1><h2 id="services">Услуги</h2></main>`,
    "index.txt": "RSC home fixture",
    "404.html": "<h1>Страница не найдена</h1>",
    "donetsk.html": parent, "donetsk.txt": "RSC Donetsk fixture",
    "donetsk/moskva.html": html, "donetsk/moskva.txt": "RSC Moscow fixture",
    "robots.txt": `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml`,
    "sitemap.xml": `<urlset><url><loc>${site}</loc></url><url><loc>${site}/donetsk</loc></url><url><loc>${route}</loc></url></urlset>`,
    "services-feed.xml": "<feed/>",
  };
  for (const [filename, contents] of Object.entries(files)) await writeFile(join(fixture, "out", filename), contents);

  return {
    files,
    update: (filename, contents) => writeFile(join(fixture, "out", filename), contents),
    remove: (filename) => rm(join(fixture, "out", filename)),
    run: () => spawnSync(process.execPath, [join(fixture, "scripts/check-export.mjs")], { encoding: "utf8" }),
  };
}

test("export verification accepts page metadata, breadcrumb anchors and App Router payloads", async (t) => {
  const fixture = await exportFixture(t);
  const complete = fixture.run();
  assert.equal(complete.status, 0, complete.stderr);
  assert.match(complete.stdout, /Static export OK/);
});

test("export verification rejects missing App Router navigation payloads", async (t) => {
  const fixture = await exportFixture(t);
  await fixture.remove("donetsk/moskva.txt");
  const incomplete = fixture.run();
  assert.equal(incomplete.status, 1);
  assert.match(incomplete.stderr, /no exported RSC payload for https:\/\/medtaxi-evp\.ru\/donetsk\/moskva/);
});

for (const filename of ["index.html", "donetsk.html"]) {
  test(`export verification rejects ${filename} content hidden behind a Suspense loading boundary`, async (t) => {
    const fixture = await exportFixture(t);
    await fixture.update(filename, fixture.files[filename].replace(/<main>([\s\S]*?)<\/main>/,
      '<main><p>Загрузка…</p></main><div hidden id="S:0"><main>$1</main></div>'));
    const result = fixture.run();
    assert.equal(result.status, 1);
    assert.ok(result.stderr.includes(`${filename}: H1 missing from visible main content without JavaScript`), result.stderr);
  });
}

for (const { name, change, error } of [
  {
    name: "missing canonical",
    change: (html) => html.replace(/<link rel="canonical"[^>]*>/, ""),
    error: /donetsk\.html: expected one self canonical/,
  },
  {
    name: "canonical pointing to another page",
    change: (html) => html.replace('href="https://medtaxi-evp.ru/donetsk"', 'href="https://medtaxi-evp.ru"'),
    error: /donetsk\.html: expected one self canonical/,
  },
  {
    name: "repeated page title",
    change: (html) => html.replace("<title>Донецк</title>", "<title>Главная</title>"),
    error: /title duplicates/,
  },
  {
    name: "repeated page description",
    change: (html) => html.replace('content="Перевозка по Донецку"', 'content="Перевозка больных"'),
    error: /description duplicates/,
  },
  {
    name: "multiple H1 headings",
    change: (html) => `${html}<h1>Ещё заголовок</h1>`,
    error: /donetsk\.html: expected one nonempty H1/,
  },
  {
    name: "invalid JSON-LD outside Moscow",
    change: (html) => html.replace('type="application/ld+json">', 'type="application/ld+json">broken'),
    error: /donetsk\.html: invalid JSON-LD/,
  },
  {
    name: "breadcrumb leading to an unexported page",
    change: (html) => html.replace('"item":"https://medtaxi-evp.ru/#services"', '"item":"https://medtaxi-evp.ru/uslugi"'),
    error: /breadcrumb points to missing page https:\/\/medtaxi-evp\.ru\/uslugi/,
  },
  {
    name: "breadcrumb leading to a missing anchor",
    change: (html) => html.replace("/#services", "/#missing-section"),
    error: /breadcrumb points to missing anchor https:\/\/medtaxi-evp\.ru\/#missing-section/,
  },
]) {
  test(`export verification rejects ${name}`, async (t) => {
    const fixture = await exportFixture(t);
    await fixture.update("donetsk.html", change(fixture.files["donetsk.html"]));
    const result = fixture.run();
    assert.equal(result.status, 1);
    assert.match(result.stderr, error);
  });
}
