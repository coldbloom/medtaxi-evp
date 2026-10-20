import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Verify this site's prerendered pages inside the standard next build artifact.
const projectDir = fileURLToPath(new URL("../", import.meta.url));
const buildDir = path.join(projectDir, ".next");
const appDir = path.join(buildDir, "server/app");
const publicDir = path.join(projectDir, "public");
const siteUrl = "https://medtaxi-evp.ru";
const moscowUrl = `${siteUrl}/donetsk/moskva`;
const errors = new Set();
const checkedAssets = new Set();
const metadataOwners = { title: new Map(), description: new Map() };
const anchorCache = new Map();
const requiredFiles = ["index.html", "_not-found.html", "robots.txt.body", "sitemap.xml.body", "services-feed.xml.body"];

function check(condition, message) {
  if (!condition) errors.add(message);
}

function isFile(filename) {
  return existsSync(filename) && statSync(filename).isFile() && statSync(filename).size > 0;
}

function decodeEntities(value) {
  const named = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " };
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (entity, key) => {
    if (key.startsWith("#")) {
      const number = key[1].toLowerCase() === "x" ? parseInt(key.slice(2), 16) : Number(key.slice(1));
      return number <= 0x10ffff ? String.fromCodePoint(number) : entity;
    }
    return named[key.toLowerCase()];
  });
}

function attributes(tag) {
  const result = {};
  const body = tag.replace(/^<\/?[\w:-]+/, "").replace(/\/?\s*>$/, "");
  for (const match of body.matchAll(/([^\s=<>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
    result[match[1].toLowerCase()] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? "");
  }
  return result;
}

function textContent(html) {
  return decodeEntities(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

// Serialized React payloads must not count as visible tags or metadata.
function staticMarkup(html) {
  return html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, (tag) => tag.slice(0, tag.indexOf(">") + 1) + tag.slice(tag.lastIndexOf("</"))).replace(/<!--[\s\S]*?-->/g, "");
}

function htmlPath(url) {
  const pathname = decodeURIComponent(new URL(url, siteUrl).pathname).replace(/\/$/, "");
  return path.join(appDir, pathname ? `${pathname}.html` : "index.html");
}

function listHtml(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filename = path.join(directory, entry.name);
    return entry.isDirectory() ? listHtml(filename) : entry.name.endsWith(".html") ? [filename] : [];
  });
}

function checkAsset(reference, pageUrl, source) {
  if (!reference || /^(?:#|data:|blob:|mailto:|tel:|javascript:)/i.test(reference)) return;
  let url;
  try {
    url = new URL(reference, pageUrl);
  } catch {
    errors.add(`${source}: invalid asset URL ${reference}`);
    return;
  }
  if (url.origin !== siteUrl) return;
  // The optimizer is a runtime endpoint, but its source must still exist.
  if (url.pathname === "/_next/image") {
    const original = url.searchParams.get("url");
    if (!original || new URL(original, pageUrl).pathname === "/_next/image") {
      errors.add(`${source}: invalid optimized image source ${reference}`);
      return;
    }
    checkAsset(original, pageUrl, source);
    return;
  }
  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    errors.add(`${source}: invalid encoded asset URL ${reference}`);
    return;
  }
  if (checkedAssets.has(pathname)) return;
  checkedAssets.add(pathname);
  const assetFile = pathname.startsWith("/_next/static/")
    ? path.join(buildDir, pathname.slice("/_next/".length))
    : path.join(publicDir, pathname);
  // Metadata files such as app/icon.svg are prerendered Route Handler bodies.
  check(isFile(assetFile) || isFile(path.join(appDir, `${pathname}.body`)), `${source}: missing asset ${pathname}`);
}

// This only checks explicit HTML hiding (including React's hidden Suspense containers).
// CSS layout and interaction still need a browser check.
function visibleMainText(markup) {
  const voidTags = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
  const stack = [];
  const text = [];
  for (const match of markup.matchAll(/<!--[\s\S]*?-->|<[^>]*>|[^<]+/g)) {
    const token = match[0];
    if (token.startsWith("<!")) continue;
    if (!token.startsWith("<")) {
      if (stack.some((entry) => entry.tag === "main") && !stack.some((entry) => entry.hidden)) text.push(token);
      continue;
    }
    const tag = /^<\/?([\w:-]+)/.exec(token)?.[1]?.toLowerCase();
    if (!tag) continue;
    if (token.startsWith("</")) {
      const index = stack.findLastIndex((entry) => entry.tag === tag);
      if (index !== -1) stack.length = index;
    } else if (!voidTags.has(tag) && !token.endsWith("/>")) {
      const attrs = attributes(token);
      stack.push({
        tag,
        hidden: "hidden" in attrs || tag === "template" || /(?:display\s*:\s*none|visibility\s*:\s*hidden)/i.test(attrs.style ?? ""),
      });
    }
  }
  return decodeEntities(text.join(" ")).replace(/\s+/g, " ").trim();
}

function checkPageSeo(markup, pageUrl, source) {
  const titles = [...markup.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map((match) => textContent(match[1]));
  const descriptions = [...markup.matchAll(/<meta\b[^>]*>/gi)].map((match) => attributes(match[0]))
    .filter((meta) => meta.name?.toLowerCase() === "description").map((meta) => meta.content?.trim());
  for (const [name, values] of [["title", titles], ["description", descriptions]]) {
    check(values.length === 1 && Boolean(values[0]), `${source}: expected one nonempty ${name}`);
    if (values.length !== 1 || !values[0]) continue;
    const owner = metadataOwners[name].get(values[0]);
    check(!owner, `${source}: ${name} duplicates ${owner}`);
    if (!owner) metadataOwners[name].set(values[0], source);
  }
  const canonicals = [...markup.matchAll(/<link\b[^>]*>/gi)].map((match) => attributes(match[0]))
    .filter((link) => link.rel?.toLowerCase() === "canonical");
  let selfCanonical = false;
  try {
    selfCanonical = canonicals.length === 1 && new URL(canonicals[0].href).href === pageUrl.href;
  } catch { /* Report a missing or invalid canonical below. */ }
  check(selfCanonical, `${source}: expected one self canonical ${pageUrl.href}`);
  const headings = [...markup.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  check(headings.length === 1 && Boolean(textContent(headings[0][1])), `${source}: expected one nonempty H1`);
  const mainText = visibleMainText(markup);
  check(Boolean(mainText), `${source}: main content missing or hidden without JavaScript`);
  if (headings.length === 1 && textContent(headings[0][1])) {
    check(mainText.includes(textContent(headings[0][1])), `${source}: H1 missing from visible main content without JavaScript`);
  }
}

function jsonLdNodes(html, source) {
  const nodes = [];
  function collect(value) {
    if (Array.isArray(value)) value.forEach(collect);
    else if (value && typeof value === "object") {
      nodes.push(value);
      Object.values(value).forEach(collect);
    }
  }
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (attributes(`<script${match[1]}>`).type !== "application/ld+json") continue;
    try {
      const value = JSON.parse(match[2]);
      check(value !== null && typeof value === "object", `${source}: JSON-LD must contain an object or array`);
      collect(value);
    } catch {
      errors.add(`${source}: invalid JSON-LD`);
    }
  }
  return nodes;
}

function checkBreadcrumbTargets(nodes, pageUrl, source) {
  for (const node of nodes.filter((node) => [node["@type"]].flat().includes("BreadcrumbList"))) {
    check(Array.isArray(node.itemListElement), `${source}: BreadcrumbList must contain itemListElement`);
    if (!Array.isArray(node.itemListElement)) continue;
    for (const crumb of node.itemListElement) {
      if (!crumb || typeof crumb !== "object") {
        errors.add(`${source}: invalid breadcrumb list item`);
        continue;
      }
      // The final breadcrumb may omit its item URL according to schema usage.
      if (crumb.item === undefined) continue;
      const reference = typeof crumb.item === "string" ? crumb.item : crumb.item?.["@id"] ?? crumb.item?.url;
      try {
        if (typeof reference !== "string" || !reference) throw new Error("Missing URL");
        const url = new URL(reference, pageUrl);
        if (url.origin !== siteUrl) continue;
        const target = htmlPath(url);
        check(isFile(target), `${source}: breadcrumb points to missing page ${reference}`);
        if (url.hash && isFile(target)) {
          if (!anchorCache.has(target)) {
            const markup = staticMarkup(readFileSync(target, "utf8"));
            anchorCache.set(target, new Set([...markup.matchAll(/<[\w:-]+\b[^>]*>/g)].map((match) => attributes(match[0]).id).filter(Boolean)));
          }
          check(anchorCache.get(target).has(decodeURIComponent(url.hash.slice(1))), `${source}: breadcrumb points to missing anchor ${reference}`);
        }
      } catch {
        errors.add(`${source}: invalid breadcrumb item URL`);
      }
    }
  }
}

function checkMoscowSeo(markup, nodes) {
  const source = "donetsk/moskva.html";
  const title = [...markup.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
  check(title.length === 1 && textContent(title[0][1]) === "Перевозка лежачих больных Донецк — Москва | Медтакси", `${source}: unexpected or duplicate title`);
  const links = [...markup.matchAll(/<link\b[^>]*>/gi)].map((match) => attributes(match[0]));
  const canonicals = links.filter((link) => link.rel === "canonical");
  check(canonicals.length === 1 && canonicals[0].href === moscowUrl, `${source}: canonical must point to ${moscowUrl}`);
  const descriptions = [...markup.matchAll(/<meta\b[^>]*>/gi)].map((match) => attributes(match[0])).filter((meta) => meta.name === "description");
  check(descriptions.length === 1 && Boolean(descriptions[0].content?.trim()), `${source}: missing or duplicate description`);
  const h1 = [...markup.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  const heading = "Перевозка лежачих больных из Донецка в Москву";
  check(h1.length === 1 && textContent(h1[0][1]) === heading, `${source}: expected exactly one route H1`);
  const mainText = visibleMainText(markup);
  for (const text of [heading, "Стоимость перевозки Донецк — Москва", "Mercedes для дальней поездки", "Вопросы о поездке в Москву"]) {
    check(mainText.includes(text), `${source}: main content missing or hidden without JavaScript: ${text}`);
  }
  const breadcrumbs = nodes.filter((node) => node["@type"] === "BreadcrumbList");
  const expected = [["Главная", siteUrl], ["Донецк", `${siteUrl}/donetsk`], ["Москва", moscowUrl]];
  check(breadcrumbs.length === 1 && breadcrumbs[0].itemListElement?.length === 3 && expected.every(([name, item], index) => {
    const crumb = breadcrumbs[0].itemListElement[index];
    return crumb?.name === name && crumb.item === item && crumb.position === index + 1;
  }), `${source}: expected BreadcrumbList Главная → Донецк → Москва`);
}

if (!existsSync(appDir) || !isFile(path.join(buildDir, "BUILD_ID"))) {
  console.error("Production build not found: run yarn build before yarn check:build.");
  process.exit(1);
}

const serverFilesManifest = path.join(buildDir, "required-server-files.json");
try {
  const { config, files } = JSON.parse(readFileSync(serverFilesManifest, "utf8"));
  check(config && typeof config === "object" && !config.output, "Build must use standard next start output, not export or standalone");
  check(Array.isArray(files) && files.length > 0, "required-server-files.json: server file list is missing");
  for (const filename of Array.isArray(files) ? files : []) {
    check(isFile(path.join(projectDir, filename)), `Missing required server file: ${filename}`);
  }
} catch {
  errors.add("Missing or invalid .next/required-server-files.json");
}
for (const filename of requiredFiles) check(isFile(path.join(appDir, filename)), `Missing or empty .next/server/app/${filename}`);

const sitemapFile = path.join(appDir, "sitemap.xml.body");
const sitemap = isFile(sitemapFile) ? readFileSync(sitemapFile, "utf8") : "";
const sitemapUrls = [...sitemap.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map((match) => decodeEntities(match[1].trim()));
check(sitemapUrls.length > 0, "sitemap.xml: no page URLs");
check(sitemapUrls.includes(moscowUrl), "sitemap.xml: Moscow page is missing");
check(new Set(sitemapUrls).size === sitemapUrls.length, "sitemap.xml: duplicate URLs");
const sitemapPages = new Set();
for (const url of sitemapUrls) {
  try {
    check(new URL(url).origin === siteUrl, `sitemap.xml: unexpected origin ${url}`);
    const filename = htmlPath(url);
    sitemapPages.add(filename);
    check(isFile(filename), `sitemap.xml: no prerendered HTML for ${url}`);
    // next start serves the RSC payload for App Router client-side navigation.
    check(isFile(filename.replace(/\.html$/, ".rsc")), `sitemap.xml: no prerendered RSC payload for ${url}`);
  } catch {
    errors.add(`sitemap.xml: invalid URL ${url}`);
  }
}

const robotsFile = path.join(appDir, "robots.txt.body");
if (isFile(robotsFile)) {
  const robots = readFileSync(robotsFile, "utf8");
  check(!/^Disallow:\s*\/\s*$/im.test(robots), "robots.txt: the entire site is blocked");
  check(robots.includes(`${siteUrl}/sitemap.xml`), "robots.txt: sitemap reference is missing");
}

const htmlFiles = listHtml(appDir);
for (const filename of htmlFiles) {
  const source = path.relative(appDir, filename);
  const pageUrl = new URL(source === "index.html" ? "/" : `/${source.replace(/\.html$/, "")}`, siteUrl);
  const html = readFileSync(filename, "utf8");
  const markup = staticMarkup(html);
  const nodes = jsonLdNodes(html, source);
  if (sitemapPages.has(filename)) checkPageSeo(markup, pageUrl, source);
  checkBreadcrumbTargets(nodes, pageUrl, source);
  for (const match of markup.matchAll(/<([\w:-]+)\b[^>]*>/g)) {
    const tag = match[1].toLowerCase();
    const attrs = attributes(match[0]);
    if (sitemapPages.has(filename) && tag === "meta" && /^(robots|googlebot|yandex)$/i.test(attrs.name ?? "")) {
      check(!/\b(noindex|none)\b/i.test(attrs.content ?? ""), `${source}: indexable sitemap page contains noindex`);
    }
    if (attrs.src) checkAsset(attrs.src, pageUrl, source);
    if (attrs.poster) checkAsset(attrs.poster, pageUrl, source);
    for (const set of [attrs.srcset, attrs.imagesrcset]) {
      if (!set || set.trim().startsWith("data:")) continue;
      for (const candidate of set.split(",")) checkAsset(candidate.trim().split(/\s+/)[0], pageUrl, source);
    }
    if (attrs.href && (tag === "link" && /(?:stylesheet|preload|modulepreload|icon)/i.test(attrs.rel ?? "") || /\.(?:css|js|mjs|png|jpe?g|gif|webp|avif|svg|ico|woff2?|ttf)(?:[?#]|$)/i.test(attrs.href))) {
      checkAsset(attrs.href, pageUrl, source);
    }
  }
  if (filename === htmlPath(moscowUrl)) checkMoscowSeo(markup, nodes);
}

if (errors.size) {
  console.error(`Production build check failed (${errors.size}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Production build OK: ${htmlFiles.length} HTML files, ${sitemapUrls.length} sitemap URLs, ${checkedAssets.size} local assets; page metadata, JSON-LD, breadcrumbs, RSC payloads and visible server HTML verified.`);
}
