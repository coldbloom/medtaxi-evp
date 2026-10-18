"use client";

import { useId } from "react";
import Link from "next/link";
import { ContactSocialLinks } from "./ContactSocialLinks";
import type { useCallbackRequest } from "./useCallbackRequest";
import type { ContactModalVariant } from "./types";
import styles from "./ContactModal.module.css";

type CallbackFormProps = {
  request: ReturnType<typeof useCallbackRequest>;
  descriptionId: string;
  onCancel: () => void;
  isCallFollowup: boolean;
  variant: ContactModalVariant;
  contactPhoneHref: string;
  contactPhoneLabel: string;
};

export function CallbackForm({ request, descriptionId, onCancel, isCallFollowup, variant }: CallbackFormProps) {
  const id = useId();
  const { formData, hasConsent, isSubmitting, submitError, handleSubmit, handleChange, setHasConsent, setPhone } = request;
  const isDonetsk = variant === "donetsk";
  const fieldClass = `ym-disable-keys w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all disabled:opacity-60 ${isDonetsk ? "focus:ring-[#2f6757]" : "focus:ring-blue-500"}`;
  const buttonClass = isDonetsk ? "bg-[#f3b941] text-[#14221e] hover:bg-[#ffd06d]" : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto flex-1 min-h-0`}>
      <p id={descriptionId} className={isCallFollowup ? `rounded-xl p-4 text-base font-medium leading-relaxed ${isDonetsk ? "bg-[#e8f1ec] text-[#245445]" : "bg-blue-50 text-blue-900"}` : "text-sm leading-relaxed text-gray-600"}>
        {isCallFollowup ? "Оставьте имя и номер телефона. Диспетчер сам свяжется с вами и поможет организовать поездку." : "Оставьте телефон — диспетчер свяжется с вами и уточнит детали заявки."}
      </p>

      <div>
        <label htmlFor={`${id}-name`} className="block text-sm font-medium text-gray-700 mb-2">Ваше имя</label>
        <input
          id={`${id}-name`}
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
          required
          autoComplete="name"
          className={fieldClass}
          placeholder="Введите ваше имя"
        />
      </div>

      <div>
        <label htmlFor={`${id}-phone`} className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          onFocus={(event) => {
            const input = event.currentTarget;
            if (!input.value) {
              setPhone("+7 ");
              requestAnimationFrame(() => {
                if (input.isConnected) input.setSelectionRange(input.value.length, input.value.length);
              });
            } else input.setSelectionRange(input.value.length, input.value.length);
          }}
          onBlur={(event) => { if (event.currentTarget.value.trim() === "+7") setPhone(""); }}
          disabled={isSubmitting}
          required
          autoComplete="tel"
          inputMode="tel"
          className={fieldClass}
          placeholder="+7 (___) ___-__-__"
        />
      </div>

      {!isCallFollowup && (
        <div>
          <label htmlFor={`${id}-message`} className="block text-sm font-medium text-gray-700 mb-2">Комментарий (необязательно)</label>
          <textarea
            id={`${id}-message`}
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
            rows={3}
            maxLength={500}
            className={`${fieldClass} resize-none`}
            placeholder="Например: откуда и куда нужна перевозка"
            aria-describedby={`${id}-message-hint`}
          />
          <p id={`${id}-message-hint`} className="mt-2 text-xs leading-relaxed text-gray-500">
            Не указывайте диагнозы, сведения о здоровье, документах или оплате.
          </p>
        </div>
      )}

      <div className="flex items-start gap-3">
        <input
          id={`${id}-personal-data-consent`}
          name="personalDataConsent"
          type="checkbox"
          checked={hasConsent}
          onChange={(event) => setHasConsent(event.target.checked)}
          disabled={isSubmitting}
          required
          className={`mt-1 size-5 shrink-0 ${isDonetsk ? "accent-[#2f6757]" : "accent-blue-600"}`}
        />
        <label htmlFor={`${id}-personal-data-consent`} className="text-sm leading-relaxed text-gray-700">
          Я даю{" "}
          <Link href="/personal-data-consent" target="_blank" className="font-semibold text-blue-700 underline underline-offset-2">
            согласие на обработку персональных данных
          </Link>{" "}
          и ознакомлен(а) с{" "}
          <Link href="/privacy" target="_blank" className="font-semibold text-blue-700 underline underline-offset-2">политикой</Link>.
        </label>
      </div>

      {submitError && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm leading-relaxed text-red-800">{submitError}</p>}
      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
        <button type="submit" disabled={isSubmitting || !hasConsent} className={`flex-1 px-4 sm:px-6 py-3 rounded-xl font-semibold text-sm sm:text-base transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${buttonClass}`}>
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Отправка...
            </>
          ) : isCallFollowup ? "Жду звонка" : "Отправить заявку"}
        </button>
        <button type="button" onClick={onCancel} disabled={isSubmitting} className="px-4 sm:px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-50 transition-colors">
          Отмена
        </button>
      </div>

      <div className="pt-4 border-t border-gray-200 flex-shrink-0">
        <p className="text-xs sm:text-sm text-gray-600 text-center mb-3">Или свяжитесь с нами напрямую:</p>
        <ContactSocialLinks
          variant={variant}
          ctaPosition={isCallFollowup ? "call_followup_footer" : "contact_modal_footer"}
          disabled={isSubmitting}
          isBusy={request.isBusy}
        />
      </div>
    </form>
  );
}
