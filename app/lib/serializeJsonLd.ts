/** Keep JSON-LD data from terminating its HTML script element. */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
