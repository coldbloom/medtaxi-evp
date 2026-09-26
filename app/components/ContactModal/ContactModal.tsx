"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import Link from "next/link";
import toast from "react-hot-toast";
import { TrackedPhoneLink } from "@/app/components/tracking/TrackedPhoneLink";
import styles from "./ContactModal.module.css";

const ClientToaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);

const notify = () => toast.success('Мы свяжемся с вами!', {
  duration: 4000,
  position: 'bottom-center',

});

const notifyError = () => toast.error('Произошла ошибка, попробуйте позже(', {
  duration: 4000,
  position: 'bottom-center',

});

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactPhoneHref?: string;
  contactPhoneLabel?: string;
  onSubmitSuccess?: () => void;
  onSubmitError?: () => void;
  variant?: "default" | "donetsk";
}

export function ContactModal({
  isOpen,
  onClose,
  contactPhoneHref = "+79789380221",
  contactPhoneLabel = "+7 (978) 938-02-21",
  onSubmitSuccess,
  onSubmitError,
  variant = "default",
}: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [hasConsent, setHasConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  const isDonetskVariant = variant === "donetsk";

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const formatPhone = (rawValue: string) => {
    const digits = rawValue.replace(/\D/g, "");
    let localDigits = digits;

    // Если ввели номер, начиная с 7/8, убираем код страны
    if (localDigits.startsWith("7") || localDigits.startsWith("8")) {
      localDigits = localDigits.slice(1);
    }

    localDigits = localDigits.slice(0, 10);

    if (localDigits.length === 0) return "+7 ";

    let formatted = "+7";
    formatted += ` (${localDigits.slice(0, 3)}`;

    if (localDigits.length >= 4) {
      formatted += `) ${localDigits.slice(3, 6)}`;
    }
    if (localDigits.length >= 7) {
      formatted += `-${localDigits.slice(6, 8)}`;
    }
    if (localDigits.length >= 9) {
      formatted += `-${localDigits.slice(8, 10)}`;
    }

    return formatted;
  };

  // Блокировка скролла при открытии
  useEffect(() => {
    if (!isOpen) return;

    const { scrollX, scrollY } = window;
    const { style } = document.body;
    const previous = {
      overflow: style.overflow,
      position: style.position,
      top: style.top,
      left: style.left,
      width: style.width,
    };

    // Fixed positioning also locks the background on iOS while the form scrolls.
    Object.assign(style, {
      overflow: "hidden",
      position: "fixed",
      top: `-${scrollY}px`,
      left: `-${scrollX}px`,
      width: "100%",
    });

    return () => {
      Object.assign(style, previous);
      window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
    };
  }, [isOpen]);

  useEffect(() => {
    const viewport = window.visualViewport;
    const container = viewportRef.current;
    if (!isOpen || !viewport || !container) return;

    // The keyboard can shrink/pan the visual viewport without changing CSS dvh.
    const updateViewport = () => {
      container.style.setProperty("--modal-viewport-height", `${viewport.height}px`);
      container.style.setProperty("--modal-viewport-top", `${viewport.offsetTop}px`);
    };

    updateViewport();
    viewport.addEventListener("resize", updateViewport);
    viewport.addEventListener("scroll", updateViewport);
    return () => {
      viewport.removeEventListener("resize", updateViewport);
      viewport.removeEventListener("scroll", updateViewport);
    };
  }, [isOpen]);

  // Закрытие по Escape и удержание фокуса внутри диалога
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }

      if (e.key !== "Tab" || !modalRef.current) return;

      const focusableElements = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href]',
        ),
      ).filter((element) => element.offsetParent !== null);

      if (focusableElements.length === 0) {
        e.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElementRef.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasConsent) {
      toast.error("Подтвердите согласие на обработку персональных данных", {
        duration: 3000,
        position: "bottom-center",
      });
      return;
    }

    setIsSubmitting(true);

    const digits = formData.phone.replace(/\D/g, "");
    if (digits.length < 11) {
      toast.error("Введите номер полностью", {
        duration: 3000,
        position: "bottom-center",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const endpoint = process.env.NEXT_PUBLIC_API_URL
        ? `${process.env.NEXT_PUBLIC_API_URL}/feedback`
        : '/feedback';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
          personalDataConsent: true,
          consentVersion: "2026-09-26",
          consentedAt: new Date().toISOString(),
        }),
        mode: 'cors',
        credentials: 'omit',
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorData}`);
      }

      setFormData({ name: "", phone: "", message: "" });
      setHasConsent(false);
      onSubmitSuccess?.();
      notify();
      onClose();
    } catch (err) {
      console.error('Ошибка:', err);
      onSubmitError?.();
      notifyError();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === "phone") {
      setFormData((prev) => ({ ...prev, [name]: formatPhone(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <>
      <ClientToaster />
      {isOpen &&
        createPortal(
          <>
            {/* Backdrop с размытием - покрывает весь экран */}
            <div
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md transition-opacity duration-300 opacity-100"
              onClick={onClose}
              aria-hidden="true"
            />

            {/* Контейнер модального окна - по центру экрана */}
            <div
              ref={viewportRef}
              className={`${styles.viewport} z-50 flex items-center justify-center pointer-events-none`}
              onClick={(e) => {
                // Закрытие при клике вне модального окна
                if (e.target === e.currentTarget) {
                  onClose();
                }
              }}
            >
              {/* Модальное окно с анимацией - всегда по центру, помещается в экран */}
              <div
                ref={modalRef}
                className="w-full max-w-lg max-h-full min-h-0 overflow-hidden bg-white rounded-3xl shadow-2xl flex flex-col pointer-events-auto"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                onClick={(e) => e.stopPropagation()}
              >
        {/* Заголовок - фиксированный */}
        <div className="flex items-center justify-between gap-2 p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <h2
            id="modal-title"
            className="min-w-0 text-xl sm:text-2xl font-bold text-gray-900"
          >
            Заказать обратный звонок
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100 flex-shrink-0"
            aria-label="Закрыть модальное окно"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Форма - с прокруткой если нужно */}
        <form 
          onSubmit={handleSubmit} 
          className={`${styles.form} p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto flex-1 min-h-0`}
        >
          <p id="modal-description" className="text-sm leading-relaxed text-gray-600">
            Оставьте телефон — диспетчер свяжется с вами и уточнит детали заявки.
          </p>

          {/* Имя */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Ваше имя
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              className={`ym-disable-keys w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all ${isDonetskVariant ? "focus:ring-[#2f6757]" : "focus:ring-blue-500"}`}
              placeholder="Введите ваше имя"
            />
          </div>

          {/* Телефон */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Телефон
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onFocus={(e) => {
                const input = e.currentTarget;

                if (!input.value) {
                  setFormData((prev) => ({ ...prev, phone: "+7 " }));
                  requestAnimationFrame(() => {
                    if (!input.isConnected) return;

                    const position = input.value.length;
                    input.setSelectionRange(position, position);
                  });
                  return;
                }
                const position = input.value.length;
                input.setSelectionRange(position, position);
              }}
              onBlur={(e) => {
                if (e.currentTarget.value.trim() === "+7") {
                  setFormData((prev) => ({ ...prev, phone: "" }));
                }
              }}
              required
              autoComplete="tel"
              inputMode="tel"
              className={`ym-disable-keys w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all ${isDonetskVariant ? "focus:ring-[#2f6757]" : "focus:ring-blue-500"}`}
              placeholder="+7 (___) ___-__-__"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Комментарий (необязательно)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              maxLength={500}
              className={`ym-disable-keys w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all resize-none ${isDonetskVariant ? "focus:ring-[#2f6757]" : "focus:ring-blue-500"}`}
              placeholder="Например: откуда и куда нужна перевозка"
              aria-describedby="message-hint"
            />
            <p id="message-hint" className="mt-2 text-xs leading-relaxed text-gray-500">
              Не указывайте диагнозы, сведения о здоровье, документах или оплате.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <input
              id="personal-data-consent"
              name="personalDataConsent"
              type="checkbox"
              checked={hasConsent}
              onChange={(event) => setHasConsent(event.target.checked)}
              required
              className={`mt-1 size-5 shrink-0 ${isDonetskVariant ? "accent-[#2f6757]" : "accent-blue-600"}`}
            />
            <label htmlFor="personal-data-consent" className="text-sm leading-relaxed text-gray-700">
              Я даю{" "}
              <Link
                href="/personal-data-consent"
                target="_blank"
                className="font-semibold text-blue-700 underline underline-offset-2"
              >
                согласие на обработку персональных данных
              </Link>{" "}
              и ознакомлен(а) с{" "}
              <Link
                href="/privacy"
                target="_blank"
                className="font-semibold text-blue-700 underline underline-offset-2"
              >
                политикой
              </Link>.
            </label>
          </div>

          {/* Кнопки - фиксированные внизу */}
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              type="submit"
              disabled={isSubmitting || !hasConsent}
              className={`flex-1 px-4 sm:px-6 py-3 rounded-xl font-semibold text-sm sm:text-base transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${isDonetskVariant ? "bg-[#f3b941] text-[#14221e] hover:bg-[#ffd06d]" : "bg-blue-600 text-white hover:bg-blue-700"}`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Отправка...
                </>
              ) : (
                "Отправить заявку"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 sm:px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
          </div>

          {/* Контакты - фиксированные внизу */}
          <div className="pt-4 border-t border-gray-200 flex-shrink-0">
            <p className="text-xs sm:text-sm text-gray-600 text-center mb-3">
              Или свяжитесь с нами напрямую:
            </p>
            <div className="flex items-center justify-center gap-4">
              <TrackedPhoneLink
                phone={contactPhoneHref}
                trackingId="contact_modal"
                className={`flex items-center gap-2 font-medium text-sm sm:text-base transition-colors ${isDonetskVariant ? "text-[#245445] hover:text-[#173d32]" : "text-blue-600 hover:text-blue-700"}`}
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {contactPhoneLabel}
              </TrackedPhoneLink>
            </div>
          </div>
        </form>
        </div>
      </div>
          </>,
          document.body
        )}
    </>
  );
}
