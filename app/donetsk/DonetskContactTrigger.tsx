"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { trackDonetskGoal } from "./analytics";

const ContactModal = dynamic(
  () => import("@/app/components/ContactModal").then((module) => module.ContactModal),
  { ssr: false },
);

const OPEN_CONTACT_EVENT = "medtaxi:donetsk-contact-open";

type DonetskContactTriggerProps = {
  className?: string;
  label?: string;
  ctaPosition: string;
};

export function DonetskContactTrigger({
  className = "",
  label = "Заказать обратный звонок",
  ctaPosition,
}: DonetskContactTriggerProps) {
  const openContactModal = () => {
    trackDonetskGoal("donetsk_callback_open", {
      cta_position: ctaPosition,
    });

    window.dispatchEvent(
      new CustomEvent(OPEN_CONTACT_EVENT, {
        detail: { ctaPosition },
      }),
    );
  };

  return (
    <button
      type="button"
      onClick={openContactModal}
      className={className}
      aria-haspopup="dialog"
    >
      {label}
    </button>
  );
}

export function DonetskContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [ctaPosition, setCtaPosition] = useState("unknown");

  useEffect(() => {
    const handleOpen = (event: Event) => {
      const customEvent = event as CustomEvent<{ ctaPosition?: string }>;
      setCtaPosition(customEvent.detail?.ctaPosition ?? "unknown");
      setIsOpen(true);
    };

    window.addEventListener(OPEN_CONTACT_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_CONTACT_EVENT, handleOpen);
  }, []);

  return (
    isOpen && (
      <ContactModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        contactPhoneHref="+79895052785"
        contactPhoneLabel="+7 (989) 505-27-85"
        variant="donetsk"
        onSubmitSuccess={() =>
          trackDonetskGoal("donetsk_callback_success", {
            cta_position: ctaPosition,
          })
        }
        onSubmitError={() =>
          trackDonetskGoal("donetsk_callback_error", {
            cta_position: ctaPosition,
          })
        }
      />
    )
  );
}
