"use client";

import { useCallback, useEffect, useState } from "react";
import { CALLBACK_OPEN_EVENT, CALL_FEEDBACK_OPEN_EVENT, CALL_STARTED_EVENT } from "@/app/lib/callFeedback";

/** Keep coordination active while the modal's lazy-loaded module is still pending. */
export function useContactModalController() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const open = useCallback(() => {
    if (document.querySelector('[role="dialog"][aria-modal="true"][aria-busy="true"]')) return;
    // All eager parents close first, including followups whose module is still loading.
    document.dispatchEvent(new CustomEvent(CALLBACK_OPEN_EVENT));
    setHasOpened(true);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const closeBeforeFollowup = () => {
      if (document.querySelector('[role="dialog"][aria-modal="true"][aria-busy="true"]')) return;
      setIsOpen(false);
    };
    document.addEventListener(CALL_STARTED_EVENT, closeBeforeFollowup);
    document.addEventListener(CALL_FEEDBACK_OPEN_EVENT, closeBeforeFollowup);
    document.addEventListener(CALLBACK_OPEN_EVENT, closeBeforeFollowup);
    return () => {
      document.removeEventListener(CALL_STARTED_EVENT, closeBeforeFollowup);
      document.removeEventListener(CALL_FEEDBACK_OPEN_EVENT, closeBeforeFollowup);
      document.removeEventListener(CALLBACK_OPEN_EVENT, closeBeforeFollowup);
    };
  }, []);

  return { isOpen, hasOpened, open, close };
}
