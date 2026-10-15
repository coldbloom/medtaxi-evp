"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useContactModalController } from "@/app/components/ContactModal/useContactModalController";
import { trackDonetskGoal } from "./analytics";

const ContactModal = dynamic(
  () => import("@/app/components/ContactModal/ContactModal").then((module) => module.ContactModal),
  { ssr: false },
);

// One delegated listener keeps every CTA and phone/social link server-rendered.
export function DonetskInteractions() {
  const { isOpen, hasOpened, open, close } = useContactModalController();
  const [ctaPosition, setCtaPosition] = useState("unknown");

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>("[data-donetsk-goal]");
      const goal = target?.dataset.donetskGoal;
      if (!target || !goal) return;

      const position = target.dataset.ctaPosition ?? "unknown";
      trackDonetskGoal(goal, {
        cta_position: position,
        ...(target.dataset.messenger ? { messenger: target.dataset.messenger } : {}),
      });

      if (goal === "donetsk_callback_open") {
        setCtaPosition(position);
        open();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [open]);

  // Preserve the form draft when closed, and load its code only on first demand.
  return hasOpened ? (
    <ContactModal
      isOpen={isOpen}
      onClose={close}
      contactPhoneHref="+79895052785"
      contactPhoneLabel="+7 (989) 505-27-85"
      variant="donetsk"
      onSubmitSuccess={() => trackDonetskGoal("donetsk_callback_success", { cta_position: ctaPosition })}
      onSubmitError={() => trackDonetskGoal("donetsk_callback_error", { cta_position: ctaPosition })}
    />
  ) : null;
}
