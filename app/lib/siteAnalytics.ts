import { enqueueAnalytics, type AnalyticsEvent } from "./analyticsQueue";
import { createId, getSession } from "./trackingSession";

type EventDetails = Pick<AnalyticsEvent, "trackingId" | "phone" | "outcome" | "sourceEventId"> & { page?: string };
let lastPageUrl: string | undefined;

export function trackSiteEvent(type: AnalyticsEvent["type"], details: EventDetails = {}): void {
  try {
    enqueueAnalytics("event", {
      ...getSession(), ...details, type, eventId: createId(),
      page: details.page ?? window.location.pathname,
      clientTimestamp: new Date().toISOString(),
    });
  } catch { /* Analytics never controls a modal or the native phone action. */ }
}

/** Module state survives Strict Mode; actual back/forward navigation is counted again. */
export function trackSitePageView(path: string): void {
  try {
    const url = new URL(path, window.location.origin);
    url.hash = "";
    if (lastPageUrl === url.href) return;
    lastPageUrl = url.href;
    trackSiteEvent("page_view", { page: url.pathname });
  } catch { /* An unavailable analytics API must not affect rendering. */ }
}
