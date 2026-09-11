"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { trackDonetskGoal } from "./analytics";

const ContactModal = dynamic(
  () => import("@/app/components/ContactModal").then((module) => module.ContactModal),
  { ssr: false },
);

// One delegated listener keeps every CTA and phone/social link server-rendered.
export function DonetskInteractions() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
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
        setHasOpened(true);
        setIsOpen(true);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Load only after the first request; keep mounted so success notifications survive closing.
  return hasOpened ? (
    <ContactModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      contactPhoneHref="+79895052785"
      contactPhoneLabel="+7 (989) 505-27-85"
      variant="donetsk"
      onSubmitSuccess={() => trackDonetskGoal("donetsk_callback_success", { cta_position: ctaPosition })}
      onSubmitError={() => trackDonetskGoal("donetsk_callback_error", { cta_position: ctaPosition })}
    />
  ) : null;
}
