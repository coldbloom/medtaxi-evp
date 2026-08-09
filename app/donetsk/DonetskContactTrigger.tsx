"use client";

import { useState } from "react";
import { ContactModal } from "@/app/components/ContactModal";

type DonetskContactTriggerProps = {
  className?: string;
  label?: string;
};

export function DonetskContactTrigger({
  className = "",
  label = "Заказать обратный звонок",
}: DonetskContactTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className}
        aria-haspopup="dialog"
      >
        {label}
      </button>
      <ContactModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        contactPhoneHref="+79895052785"
        contactPhoneLabel="+7 (989) 505-27-85"
      />
    </>
  );
}
