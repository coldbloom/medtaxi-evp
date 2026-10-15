export const CALL_STARTED_EVENT = "medtax:call-started";
export const CALL_FEEDBACK_OPEN_EVENT = "medtax:call-feedback-open";
/** An explicit callback request supersedes other dialogs and a pending call survey. */
export const CALLBACK_OPEN_EVENT = "medtax:callback-open";

export type CallFeedbackContext = {
  phone: string;
  page: string;
};

const RETURN_DELAY_MS = 800;
const VISIBLE_FALLBACK_MS = 15_000;

/** Coordinates the question after a native phone link without waiting for analytics. */
export function listenForCallFeedback(
  onOpen: (context: CallFeedbackContext) => void,
  onCallStarted: () => void,
): () => void {
  let pending: CallFeedbackContext | null = null;
  let focused = document.hasFocus();
  let leftPage = false;
  let readyTimer: ReturnType<typeof setTimeout> | undefined;
  let fallbackTimer: ReturnType<typeof setTimeout> | undefined;

  const available = () => document.visibilityState !== "hidden" && focused;
  const cancelReady = () => {
    clearTimeout(readyTimer);
    readyTimer = undefined;
  };
  const cancelTimers = () => {
    cancelReady();
    clearTimeout(fallbackTimer);
    fallbackTimer = undefined;
  };

  const openWhenAvailable = () => {
    readyTimer = undefined;
    if (!pending || !available()) return;

    // A callback already being sent must finish before another dialog takes focus.
    if (document.querySelector('[role="dialog"][aria-modal="true"][aria-busy="true"]')) {
      readyTimer = setTimeout(openWhenAvailable, RETURN_DELAY_MS);
      return;
    }

    const context = pending;
    pending = null;
    cancelTimers();
    document.dispatchEvent(new CustomEvent(CALL_FEEDBACK_OPEN_EVENT, { detail: context }));
    onOpen(context);
  };

  const scheduleOnReturn = () => {
    if (!pending || !leftPage || !available() || readyTimer !== undefined) return;
    readyTimer = setTimeout(openWhenAvailable, RETURN_DELAY_MS);
  };

  const handleClick = (event: MouseEvent) => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.defaultPrevented) return;
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('a[href^="tel:"]');
    if (!link || link.getAttribute("aria-disabled") === "true") return;
    const phone = link.getAttribute("href")?.slice(4).trim();
    if (!phone) return;
    // Do not unmount a form with an in-flight request, including an earlier followup.
    if (document.querySelector('[role="dialog"][aria-modal="true"][aria-busy="true"]')) return;

    cancelTimers();
    pending = { phone, page: window.location.pathname };
    focused = document.hasFocus();
    leftPage = !available();

    // Close existing callback dialogs before the browser switches to the dialer.
    document.dispatchEvent(new CustomEvent(CALL_STARTED_EVENT, { detail: pending }));
    onCallStarted();
    fallbackTimer = setTimeout(() => {
      fallbackTimer = undefined;
      // An existing return timer preserves the short grace period after focus.
      if (readyTimer === undefined) openWhenAvailable();
    }, VISIBLE_FALLBACK_MS);
    // Never preventDefault: the telephone link remains a normal browser action.
  };

  const handleBlur = () => {
    focused = false;
    if (!pending) return;
    leftPage = true;
    cancelReady();
  };
  const handleFocus = () => {
    focused = true;
    scheduleOnReturn();
  };
  const handleVisibility = () => {
    if (document.visibilityState === "hidden") {
      if (pending) leftPage = true;
      cancelReady();
      return;
    }
    focused = document.hasFocus();
    scheduleOnReturn();
  };
  const handleCallbackOpen = () => {
    if (document.querySelector('[role="dialog"][aria-modal="true"][aria-busy="true"]')) return;
    pending = null;
    cancelTimers();
    onCallStarted();
  };

  document.addEventListener("click", handleClick, true);
  document.addEventListener("visibilitychange", handleVisibility);
  document.addEventListener(CALLBACK_OPEN_EVENT, handleCallbackOpen);
  window.addEventListener("blur", handleBlur);
  window.addEventListener("focus", handleFocus);

  return () => {
    pending = null;
    cancelTimers();
    document.removeEventListener("click", handleClick, true);
    document.removeEventListener("visibilitychange", handleVisibility);
    document.removeEventListener(CALLBACK_OPEN_EVENT, handleCallbackOpen);
    window.removeEventListener("blur", handleBlur);
    window.removeEventListener("focus", handleFocus);
  };
}
