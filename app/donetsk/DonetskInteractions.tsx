"use client";

import { useEffect, useState } from "react";
import { useContactModalController } from "@/app/components/ContactModal/useContactModalController";
import { LazyContactModal } from "@/app/components/ContactModal/LazyContactModal";
import { trackDonetskGoal } from "./analytics";

// One delegated listener keeps every CTA and phone/social link server-rendered.
export function DonetskInteractions({
  pagePath = "/donetsk",
  contactPhoneHref = "+79895052785",
  contactPhoneLabel = "+7 (989) 505-27-85",
}: { pagePath?: string; contactPhoneHref?: string; contactPhoneLabel?: string } = {}) {
  const { isOpen, hasOpened, open, close } = useContactModalController();
  const [ctaPosition, setCtaPosition] = useState("unknown");
  const [purpose, setPurpose] = useState<"callback" | "contact-choice">("callback");

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>("[data-donetsk-goal]");
      const goal = target?.dataset.donetskGoal;
      if (!target || !goal) return;

      const opensContact = goal === "donetsk_callback_open" || goal === "donetsk_contact_open";
      if (opensContact && document.querySelector('[role="dialog"][aria-modal="true"][aria-busy="true"]')) return;

      const position = target.dataset.ctaPosition ?? "unknown";
      trackDonetskGoal(goal, {
        page: pagePath,
        cta_position: position,
        ...(target.dataset.messenger ? { messenger: target.dataset.messenger } : {}),
      });

      if (opensContact) {
        setCtaPosition(position);
        setPurpose(goal === "donetsk_contact_open" ? "contact-choice" : "callback");
        open();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [open, pagePath]);

  // Preserve the form draft when closed, and load its code only on first demand.
  return hasOpened ? (
    <LazyContactModal
      isOpen={isOpen}
      onClose={close}
      contactPhoneHref={contactPhoneHref}
      contactPhoneLabel={contactPhoneLabel}
      variant="donetsk"
      purpose={purpose}
      contactCtaPosition={ctaPosition}
      onContactFormOpen={() => trackDonetskGoal("donetsk_callback_open", { page: pagePath, cta_position: ctaPosition })}
      onSubmitSuccess={() => trackDonetskGoal("donetsk_callback_success", { page: pagePath, cta_position: ctaPosition })}
      onSubmitError={() => trackDonetskGoal("donetsk_callback_error", { page: pagePath, cta_position: ctaPosition })}
    />
  ) : null;
}
