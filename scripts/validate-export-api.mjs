/**
 * NEXT_PUBLIC_* is frozen in the browser bundle at build time. A static host
 * cannot repair a missing API URL or handle the form's /feedback fallback.
 * Never include the configured value in errors: it may contain credentials.
 * @param {string | undefined} value
 */
export function validateExportApiUrl(value) {
  const fail = (/** @type {string} */ reason) => {
    throw new Error(`NEXT_PUBLIC_API_URL: ${reason} Set a public HTTPS API base URL or a same-origin path such as /api before building out/.`);
  };

  if (!value) fail("is required for the static production export.");
  if (/\s|\\/.test(value)) fail("must not contain whitespace or backslashes.");
  const sameOrigin = value.startsWith("/") && !value.startsWith("//");
  if (!sameOrigin && !/^https:\/\//i.test(value)) fail("must use HTTPS or an explicit same-origin path.");

  let url;
  try {
    url = new URL(value, "https://static-export.invalid");
  } catch {
    fail("is not a valid URL.");
  }
  if (url.username || url.password) fail("must not contain credentials in a public browser setting.");
  if (url.search || url.hash || /[?#]/.test(value)) fail("must not contain a query string or fragment.");
  if (sameOrigin) {
    if (url.pathname.replace(/\/+$/, "") === "") fail("must point to an API path, not the site root.");
    return;
  }

  const hostname = url.hostname.replace(/\.$/, "").toLowerCase();
  if (hostname === "localhost" || hostname.endsWith(".localhost")
    || hostname === "0.0.0.0" || hostname.startsWith("127.")
    || ["[::]", "[::1]"].includes(hostname)
    || /^\[::ffff:(?:7f[\da-f]{2}:|0:0\])/.test(hostname)) {
    fail("must not point to localhost or a loopback address.");
  }
}
