import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdtemp, mkdir, rm, symlink, writeFile } from "node:fs/promises";
import { request } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const script = fileURLToPath(new URL("../scripts/serve-export.mjs", import.meta.url));

function get(port, path, method = "GET") {
  return new Promise((resolve, reject) => {
    const req = request({ hostname: "127.0.0.1", port, path, method }, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => { body += chunk; });
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body }));
      res.on("error", reject);
    });
    req.on("error", reject);
    req.end();
  });
}

test("static preview serves exported pages, assets and real 404s without exposing outside files", async (t) => {
  const fixture = await mkdtemp(join(tmpdir(), "medtaxi-static-preview-"));
  t.after(() => rm(fixture, { recursive: true, force: true }));
  await mkdir(join(fixture, "out/donetsk"), { recursive: true });
  for (const [name, contents] of Object.entries({
    "out/index.html": "<h1>Home</h1>",
    "out/donetsk.html": "<h1>Donetsk</h1>",
    "out/donetsk/moskva.html": "<h1>Moscow</h1>",
    "out/404.html": "<h1>Missing page</h1>",
    "out/styles.css": "body { color: green; }",
    "out/app.js": "console.log('preview');",
    "out/sitemap.xml": "<urlset/>",
    "outside-secret.txt": "Do not serve",
  })) await writeFile(join(fixture, name), contents);
  await symlink(join(fixture, "outside-secret.txt"), join(fixture, "out/escaped.txt"));

  const child = spawn(process.execPath, [script, "--port", "0"], { cwd: fixture });
  let stderr = "";
  child.stderr.on("data", (chunk) => { stderr += chunk; });
  t.after(async () => {
    if (child.exitCode === null) {
      child.kill();
      await once(child, "exit");
    }
  });
  const port = await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Preview server did not start")), 10000);
    child.stdout.on("data", (chunk) => {
      const match = String(chunk).match(/http:\/\/127\.0\.0\.1:(\d+)/);
      if (match) { clearTimeout(timeout); resolve(Number(match[1])); }
    });
    child.on("error", (error) => { clearTimeout(timeout); reject(error); });
    child.on("exit", (code) => {
      clearTimeout(timeout);
      reject(new Error(`Preview server exited: ${code}. ${stderr}`));
    });
  });

  for (const [path, text] of [
    ["/", "Home"], ["/donetsk", "Donetsk"],
    ["/donetsk/moskva?utm_source=test", "Moscow"], ["/donetsk/moskva/", "Moscow"],
  ]) {
    const res = await get(port, path);
    assert.equal(res.status, 200, path);
    assert.match(res.headers["content-type"], /^text\/html/);
    assert.match(res.body, new RegExp(text));
  }
  for (const [path, mime] of [
    ["/styles.css", "text/css"], ["/app.js", "text/javascript"], ["/sitemap.xml", "application/xml"],
  ]) {
    const res = await get(port, path);
    assert.equal(res.status, 200);
    assert.ok(res.headers["content-type"].startsWith(mime));
  }
  const head = await get(port, "/donetsk/moskva", "HEAD");
  assert.equal(head.status, 200);
  assert.equal(head.body, "");
  assert.ok(Number(head.headers["content-length"]) > 0);
  const missing = await get(port, "/does-not-exist");
  assert.equal(missing.status, 404);
  assert.match(missing.body, /Missing page/);
  assert.equal((await get(port, "/does-not-exist", "HEAD")).body, "");
  const post = await get(port, "/", "POST");
  assert.equal(post.status, 405);
  assert.equal(post.headers.allow, "GET, HEAD");
  for (const path of ["/../outside-secret.txt", "/%2e%2e/outside-secret.txt", "/escaped.txt"]) {
    const res = await get(port, path);
    assert.equal(res.status, 403, path);
    assert.doesNotMatch(res.body, /Do not serve/);
  }
  assert.equal((await get(port, "/bad%XX")).status, 400);
});

test("preview explains a missing export directory", async (t) => {
  const fixture = await mkdtemp(join(tmpdir(), "medtaxi-no-export-"));
  t.after(() => rm(fixture, { recursive: true, force: true }));
  const child = spawn(process.execPath, [script], { cwd: fixture });
  let stderr = "";
  child.stderr.on("data", (chunk) => { stderr += chunk; });
  const [code] = await once(child, "exit");
  assert.equal(code, 1);
  assert.match(stderr, /out\/ is missing.*npm run build/);
});
