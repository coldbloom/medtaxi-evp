import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { realpath, stat } from "node:fs/promises";
import { extname, join, relative, resolve, sep } from "node:path";
import { pipeline } from "node:stream/promises";

// Local preview only. Production serves out/ directly through Nginx.
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".pdf": "application/pdf",
  ".webmanifest": "application/manifest+json",
};

function parsePort() {
  let value = process.env.PORT || "3000";
  const args = process.argv.slice(2);
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === "--port" || args[index] === "-p") {
      value = args[++index];
    } else if (args[index].startsWith("--port=")) {
      value = args[index].slice("--port=".length);
    } else {
      throw new Error(`Unknown argument: ${args[index]}. Use --port NUMBER or -p NUMBER.`);
    }
  }
  if (!/^\d+$/.test(value ?? "") || Number(value) > 65535) {
    throw new Error("Port must be a number between 0 and 65535.");
  }
  return Number(value);
}

function isInside(root, path) {
  const child = relative(root, path);
  return child === "" || (child !== ".." && !child.startsWith(`..${sep}`));
}

async function findFile(root, candidates) {
  for (const candidate of candidates) {
    try {
      const path = await realpath(candidate);
      // Also reject symbolic links pointing outside the export directory.
      if (!isInside(root, path)) {
        const error = new Error("Forbidden");
        error.statusCode = 403;
        throw error;
      }
      const info = await stat(path);
      if (info.isFile()) return { path, size: info.size };
    } catch (error) {
      if (error.code !== "ENOENT" && error.code !== "ENOTDIR") throw error;
    }
  }
  return null;
}

function sendText(request, response, statusCode, message) {
  response.writeHead(statusCode, { "Content-Type": "text/plain; charset=utf-8" });
  response.end(request.method === "HEAD" ? undefined : message);
}

async function serve(request, response, root) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.setHeader("Allow", "GET, HEAD");
    sendText(request, response, 405, "Method not allowed");
    return;
  }

  let pathname;
  try {
    // Decode before resolving so encoded traversal segments are rejected too.
    pathname = decodeURIComponent((request.url || "/").split("?")[0]);
  } catch {
    sendText(request, response, 400, "Invalid URL encoding");
    return;
  }
  if (!pathname.startsWith("/") || pathname.includes("\0") || pathname.includes("\\")) {
    sendText(request, response, 400, "Invalid path");
    return;
  }
  if (pathname.split("/").includes("..")) {
    sendText(request, response, 403, "Forbidden");
    return;
  }

  const target = resolve(root, `.${pathname.replace(/\/+$/, "") || "/"}`);
  const candidates = pathname === "/"
    ? [join(root, "index.html")]
    : [target, `${target}.html`, join(target, "index.html")];
  let file = await findFile(root, candidates);
  const statusCode = file ? 200 : 404;
  if (!file) file = await findFile(root, [join(root, "404.html")]);
  if (!file) {
    sendText(request, response, 404, "Not found");
    return;
  }

  response.writeHead(statusCode, {
    "Content-Type": mimeTypes[extname(file.path).toLowerCase()] || "application/octet-stream",
    "Content-Length": file.size,
    "Cache-Control": "no-cache",
    "X-Content-Type-Options": "nosniff",
  });
  if (request.method === "HEAD") {
    response.end();
    return;
  }
  await pipeline(createReadStream(file.path), response);
}

try {
  const port = parsePort();
  let root;
  try {
    root = await realpath(resolve("out"));
    if (!(await stat(root)).isDirectory()) throw new Error("Not a directory");
  } catch {
    throw new Error("Static export directory out/ is missing. Run npm run build first.");
  }
  const server = createServer((request, response) => {
    serve(request, response, root).catch((error) => {
      if (response.headersSent) {
        response.destroy();
      } else {
        const statusCode = error.statusCode || (error.code === "EACCES" ? 403 : 500);
        sendText(request, response, statusCode, statusCode === 403 ? "Forbidden" : "Server error");
      }
      if (!error.statusCode && error.code !== "EACCES") console.error(error.message);
    });
  });
  server.on("error", (error) => {
    console.error(`Cannot start static preview: ${error.message}`);
    process.exitCode = 1;
  });
  server.listen(port, "127.0.0.1", () => {
    console.log(`Static export preview: http://127.0.0.1:${server.address().port}`);
  });
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
