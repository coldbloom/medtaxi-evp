"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { CallFeedbackContext } from "@/app/lib/callFeedback";
import { CallbackForm } from "./CallbackForm";
import { CallOutcomeQuestion } from "./CallOutcomeQuestion";
import { ContactChoice } from "./ContactChoice";
import { ContactDialog } from "./ContactDialog";
import { ContactResult } from "./ContactResult";
import type { ContactModalVariant } from "./types";
import { useCallbackRequest } from "./useCallbackRequest";

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactPhoneHref?: string;
  contactPhoneLabel?: string;
  onSubmitSuccess?: () => void;
  onSubmitError?: () => void;
  variant?: ContactModalVariant;
  purpose?: "callback" | "call-followup" | "contact-choice";
  callContext?: CallFeedbackContext;
  contactCtaPosition?: string;
  onContactFormOpen?: () => void;
}

type Step = "choice" | "question" | "form" | "connected" | "sent";

/** Only coordinates steps; the dialog, fields and request lifecycle are independent. */
export function ContactModal({
  isOpen, onClose, contactPhoneHref = "+79789380221", contactPhoneLabel = "+7 (978) 938-02-21",
  onSubmitSuccess, onSubmitError, variant = "default", purpose = "callback", callContext,
  contactCtaPosition = "contact_modal", onContactFormOpen,
}: ContactModalProps) {
  const isCallFollowup = purpose === "call-followup";
  const initialStep = isCallFollowup ? "question" : purpose === "contact-choice" ? "choice" : "form";
  const [step, setStep] = useState<Step>(initialStep);
  const [entry, setEntry] = useState({ isOpen, purpose });
  const choiceTransitionRef = useRef(false);
  const descriptionId = useId();
  const request = useCallbackRequest({
    isCallFollowup,
    callContext,
    onSuccess: () => {
      setStep("sent");
      onSubmitSuccess?.();
    },
    onError: onSubmitError,
  });

  useEffect(() => {
    if (step === "choice") choiceTransitionRef.current = false;
  }, [isOpen, purpose, step]);

  // Reset the visible step before rendering a new entry; the request hook keeps its draft.
  if (entry.isOpen !== isOpen || entry.purpose !== purpose) {
    setEntry({ isOpen, purpose });
    if (isOpen) setStep(initialStep);
  }

  const close = () => {
    if (request.isBusy()) return;
    setStep(initialStep);
    onClose();
  };
  const title = step === "choice" ? "Как вам удобно связаться?"
    : step === "question" ? "Удалось ли вам дозвониться к нам?"
    : step === "connected" ? "Спасибо за ответ!"
    : step === "sent" ? "Заявка принята!"
    : isCallFollowup ? "Мы сами вам перезвоним" : "Заказать обратный звонок";

  return (
    <ContactDialog isOpen={isOpen} onClose={close} title={title} descriptionId={descriptionId} isSubmitting={request.isSubmitting} stepKey={step} theme={step === "choice" ? "donetsk" : "default"}>
      {step === "choice" ? (
        <ContactChoice descriptionId={descriptionId} ctaPosition={`${contactCtaPosition}_contact_choice`} onContactFormOpen={() => {
          if (choiceTransitionRef.current) return;
          choiceTransitionRef.current = true;
          setStep("form");
          onContactFormOpen?.();
        }} />
      ) : step === "question" ? (
        <CallOutcomeQuestion descriptionId={descriptionId} variant={variant} onConnected={() => setStep("connected")} onCallback={() => setStep("form")} />
      ) : step === "connected" || step === "sent" ? (
        <ContactResult descriptionId={descriptionId} variant={variant} result={step} onClose={close} />
      ) : (
        <CallbackForm
          request={request}
          descriptionId={descriptionId}
          onCancel={close}
          isCallFollowup={isCallFollowup}
          variant={variant}
          contactPhoneHref={contactPhoneHref}
          contactPhoneLabel={contactPhoneLabel}
        />
      )}
    </ContactDialog>
  );
}
