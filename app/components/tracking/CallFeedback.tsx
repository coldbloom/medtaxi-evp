"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { listenForCallFeedback, type CallFeedbackContext } from "@/app/lib/callFeedback";

const ContactModal = dynamic(
  () => import("@/app/components/ContactModal/ContactModal").then((module) => module.ContactModal),
  { ssr: false },
);

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
    <ContactModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      purpose="call-followup"
      callContext={context}
      variant={context.page === "/donetsk" || context.page.startsWith("/donetsk/") ? "donetsk" : "default"}
    />
  ) : null;
}
