"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import type { CallFeedbackContext } from "@/app/lib/callFeedback";
import { formatPhone } from "./phone";
import type { CallbackFormData } from "./types";
import { createId, getSession } from "@/app/lib/trackingSession";

type CallbackRequestOptions = {
  isCallFollowup: boolean;
  callContext?: CallFeedbackContext;
  trackingId?: string;
  onSuccess: () => void;
  onError?: () => void;
};

type PendingRequest = { controller: AbortController; timeout: number };
const emptyForm: CallbackFormData = { name: "", phone: "", message: "" };

export function useCallbackRequest({ isCallFollowup, callContext, trackingId, onSuccess, onError }: CallbackRequestOptions) {
  const [formData, setFormData] = useState<CallbackFormData>(emptyForm);
  const [hasConsent, updateConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const mountedRef = useRef(true);
  const pendingRef = useRef<PendingRequest | null>(null);
  // Keep the exact envelope for an uncertain result; retry must not create another lead.
  // Contact data stays in component memory, never in the analytics storage queue.
  const submissionRef = useRef<{ fingerprint: string; requestId: string; body: string } | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      const pending = pendingRef.current;
      pendingRef.current = null;
      if (pending) {
        window.clearTimeout(pending.timeout);
        pending.controller.abort();
      }
    };
  }, []);

  const isBusy = () => pendingRef.current !== null;
  const setHasConsent = (value: boolean) => { if (!isBusy()) updateConsent(value); };
  const setPhone = (phone: string) => {
    if (!isBusy()) setFormData((previous) => ({ ...previous, phone }));
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (isBusy()) return;
    const { name, value } = event.target;
    if (name !== "name" && name !== "phone" && name !== "message") return;
    setFormData((previous) => ({ ...previous, [name]: name === "phone" ? formatPhone(value) : value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isBusy() || !mountedRef.current) return;
    setSubmitError("");
    if (!hasConsent) {
      setSubmitError("Подтвердите согласие на обработку персональных данных.");
      return;
    }
    if (!formData.name.trim() || formData.phone.replace(/\D/g, "").length !== 11) {
      setSubmitError(!formData.name.trim() ? "Введите ваше имя." : "Введите номер телефона полностью.");
      return;
    }

    const controller = new AbortController();
    const pending = { controller, timeout: window.setTimeout(() => controller.abort(), 15_000) };
    pendingRef.current = pending;
    setIsSubmitting(true);
    const isCurrent = () => mountedRef.current && pendingRef.current === pending;
    let succeeded = false;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
      const message = isCallFollowup
        ? ["Не удалось дозвониться. Прошу перезвонить.",
          callContext ? `Номер службы: ${callContext.phone}. Страница: ${callContext.page}` : "",
          formData.message.trim()].filter(Boolean).join("\n").slice(0, 500)
        : formData.message.trim();
      const submission = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        message,
        kind: isCallFollowup ? "missed_call_followup" : "callback",
        page: callContext?.page ?? window.location.pathname,
        trackingId: callContext?.trackingId ?? trackingId,
        sourceEventId: callContext?.sourceEventId,
        personalDataConsent: true,
        consentVersion: "2026-11-03",
      };
      const fingerprint = JSON.stringify(submission);
      if (submissionRef.current?.fingerprint !== fingerprint) {
        const requestId = createId();
        let attribution = {};
        try { attribution = getSession(); } catch { /* Attribution cannot prevent a contact request. */ }
        submissionRef.current = {
          fingerprint, requestId,
          body: JSON.stringify({ ...attribution, ...submission, requestId, consentedAt: new Date().toISOString() }),
        };
      }
      const request = submissionRef.current;
      const response = await fetch(apiUrl ? `${apiUrl}/feedback` : "/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: request.body,
        mode: "cors",
        credentials: "omit",
        signal: controller.signal,
      });
      if (!response.ok || controller.signal.aborted) throw new Error("Callback request was not confirmed");
      const acknowledgement: unknown = await response.json();
      if (!acknowledgement || typeof acknowledgement !== "object"
        || !("success" in acknowledgement) || acknowledgement.success !== true
        || !("requestId" in acknowledgement) || acknowledgement.requestId !== request.requestId
        || !("leadId" in acknowledgement) || typeof acknowledgement.leadId !== "string" || !acknowledgement.leadId
        || controller.signal.aborted) throw new Error("Callback acknowledgement does not match the request");
      if (!isCurrent()) return;
      setFormData(emptyForm);
      updateConsent(false);
      submissionRef.current = null;
      succeeded = true;
    } catch {
      if (!isCurrent()) return;
      setSubmitError("Не удалось подтвердить отправку заявки. Проверьте интернет и попробуйте ещё раз — введённые данные сохранены.");
    } finally {
      window.clearTimeout(pending.timeout);
      if (pendingRef.current === pending) {
        pendingRef.current = null;
        if (mountedRef.current) setIsSubmitting(false);
      }
    }

    // Analytics/UI callbacks are outside the request catch: their exceptions
    // must not turn an accepted request into a retryable network error.
    if (mountedRef.current) {
      if (succeeded) onSuccess();
      else onError?.();
    }
  };

  return { formData, hasConsent, isSubmitting, submitError, handleSubmit, handleChange, setHasConsent, setPhone, isBusy };
}
