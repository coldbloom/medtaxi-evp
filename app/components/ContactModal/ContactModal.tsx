"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { CallFeedbackContext } from "@/app/lib/callFeedback";
import { formatPhoneNumber } from "@/app/utils/functions";
import { CallbackForm } from "./CallbackForm";
import { CallOutcomeQuestion } from "./CallOutcomeQuestion";
import { ContactChoice } from "./ContactChoice";
import { ContactDialog } from "./ContactDialog";
import { ContactResult } from "./ContactResult";
import type { ContactModalVariant } from "./types";
import { useCallbackRequest } from "./useCallbackRequest";
import { trackSiteEvent } from "@/app/lib/siteAnalytics";

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactPhoneHref?: string;
  contactPhoneLabel?: string;
  onSubmitSuccess?: () => void;
  onSubmitError?: () => void;
  variant?: ContactModalVariant;
  choiceTheme?: ContactModalVariant;
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
  contactCtaPosition = "contact_modal", onContactFormOpen, choiceTheme = "donetsk",
}: ContactModalProps) {
  const isCallFollowup = purpose === "call-followup";
  const followupPhone = isCallFollowup ? callContext?.phone : undefined;
  const initialStep = isCallFollowup ? "question" : purpose === "contact-choice" ? "choice" : "form";
  const [step, setStep] = useState<Step>(initialStep);
  const [entry, setEntry] = useState({ isOpen, purpose });
  const choiceTransitionRef = useRef(false);
  const descriptionId = useId();
  const request = useCallbackRequest({
    isCallFollowup,
    callContext,
    trackingId: contactCtaPosition,
    onSuccess: () => {
      setStep("sent");
      onSubmitSuccess?.();
    },
    onError: onSubmitError,
  });
  const formOpenedRef = useRef(false);
  const outcomeReportedRef = useRef(false);

  useEffect(() => {
    if (!isOpen) outcomeReportedRef.current = false;
    if (!isOpen || step !== "form") { formOpenedRef.current = false; return; }
    if (formOpenedRef.current) return;
    formOpenedRef.current = true;
    trackSiteEvent("callback_open", {
      page: callContext?.page,
      trackingId: callContext?.trackingId ?? contactCtaPosition,
      sourceEventId: callContext?.sourceEventId,
    });
  }, [isOpen, step, callContext, contactCtaPosition]);

  const reportOutcome = (outcome: "connected" | "not_connected") => {
    if (outcomeReportedRef.current) return;
    outcomeReportedRef.current = true;
    trackSiteEvent("call_outcome", { ...callContext, outcome });
    setStep(outcome === "connected" ? "connected" : "form");
  };

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
    <ContactDialog isOpen={isOpen} onClose={close} title={title} descriptionId={descriptionId} isSubmitting={request.isSubmitting} stepKey={step} theme={step === "choice" ? choiceTheme : "default"}>
      {step === "choice" ? (
        <ContactChoice theme={choiceTheme} descriptionId={descriptionId} ctaPosition={`${contactCtaPosition}_contact_choice`} onContactFormOpen={() => {
          if (choiceTransitionRef.current) return;
          choiceTransitionRef.current = true;
          setStep("form");
          onContactFormOpen?.();
        }} />
      ) : step === "question" ? (
        <CallOutcomeQuestion descriptionId={descriptionId} variant={variant} onConnected={() => reportOutcome("connected")} onCallback={() => reportOutcome("not_connected")} />
      ) : step === "connected" || step === "sent" ? (
        <ContactResult descriptionId={descriptionId} variant={variant} result={step} onClose={close} />
      ) : (
        <CallbackForm
          request={request}
          descriptionId={descriptionId}
          onCancel={close}
          isCallFollowup={isCallFollowup}
          variant={variant}
          contactPhoneHref={followupPhone ?? contactPhoneHref}
          contactPhoneLabel={followupPhone ? formatPhoneNumber(followupPhone) : contactPhoneLabel}
        />
      )}
    </ContactDialog>
  );
}
