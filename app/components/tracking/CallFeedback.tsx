"use client";

import { useEffect, useState } from "react";
import { listenForCallFeedback, type CallFeedbackContext } from "@/app/lib/callFeedback";
import { LazyContactModal } from "@/app/components/ContactModal/LazyContactModal";

export function CallFeedback() {
  const [context, setContext] = useState<CallFeedbackContext | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => listenForCallFeedback(
    (nextContext) => {
      setContext(nextContext);
      setIsOpen(true);
    },
    () => {
      setIsOpen(false);
      setContext(null);
    },
  ), []);

  return context ? (
    <LazyContactModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      purpose="call-followup"
      callContext={context}
      variant={context.page === "/donetsk" || context.page.startsWith("/donetsk/") ? "donetsk" : "default"}
    />
  ) : null;
}
