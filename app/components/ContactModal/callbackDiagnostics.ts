/** Only bounded protocol metadata is allowed in browser diagnostics. */
export type CallbackDiagnostic = {
  kind: "http" | "response" | "network" | "timeout" | "client";
  code: string;
  status?: number;
  requestId?: string;
  submissionId?: string;
  fields?: string[];
};

const serverCodes = new Set([
  "VALIDATION_ERROR", "INVALID_JSON", "PAYLOAD_TOO_LARGE", "UNSUPPORTED_MEDIA_TYPE",
  "ORIGIN_NOT_ALLOWED", "ORIGIN_REQUIRED", "METHOD_NOT_ALLOWED", "RATE_LIMITED",
  "IDEMPOTENCY_CONFLICT", "STORAGE_UNAVAILABLE", "NOTIFICATION_QUEUE_FULL",
  "SERVICE_NOT_CONFIGURED", "INTERNAL_ERROR", "NOT_FOUND", "UPSTREAM_UNAVAILABLE", "UPSTREAM_TIMEOUT",
]);
const fieldNames = new Set([
  "page", "sessionId", "sourceEventId", "trackingId", "clientTimestamp", "utm", "referrer", "yclid",
  "requestId", "name", "phone", "message", "kind", "personalDataConsent", "consentVersion", "consentedAt",
  "formPosition", "eventId", "type", "outcome", "body",
]);
const requestIdPattern = /^(?:[0-9a-f]{32}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i;

function safeRequestId(value: unknown): string | undefined {
  return typeof value === "string" && requestIdPattern.test(value) ? value : undefined;
}

function record(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : undefined;
}

export class CallbackResponseError extends Error {
  constructor(readonly diagnostic: CallbackDiagnostic) {
    super(diagnostic.code);
    this.name = "CallbackResponseError";
  }
}

/** Parse errors as well as success responses; never log response text or form fields. */
export async function confirmCallbackResponse(response: Response, submissionId: string): Promise<void> {
  const context = {
    status: response.status,
    submissionId,
    requestId: safeRequestId(response.headers?.get("X-Request-Id")),
  };
  let body: unknown;
  try {
    body = await response.json();
  } catch (error) {
    // A truncated connection can fail while reading the body, after HTTP headers arrived.
    const code = record(error)?.name === "SyntaxError" ? "NON_JSON_RESPONSE" : "RESPONSE_READ_ERROR";
    throw new CallbackResponseError({ ...context, kind: "response", code });
  }

  const payload = record(body);
  if (!response.ok) {
    const code = typeof payload?.code === "string" && serverCodes.has(payload.code) ? payload.code : "HTTP_ERROR";
    const rawFields = record(payload?.details)?.fields;
    const fields = Array.isArray(rawFields)
      ? [...new Set(rawFields.filter((field): field is string => typeof field === "string" && fieldNames.has(field)))]
      : [];
    throw new CallbackResponseError({
      ...context, kind: "http", code,
      requestId: context.requestId ?? safeRequestId(payload?.requestId),
      ...(fields.length ? { fields } : {}),
    });
  }

  if (payload?.success !== true || payload.requestId !== submissionId
    || typeof payload.leadId !== "string" || !payload.leadId) {
    throw new CallbackResponseError({ ...context, kind: "response", code: "INVALID_ACKNOWLEDGEMENT" });
  }
}
