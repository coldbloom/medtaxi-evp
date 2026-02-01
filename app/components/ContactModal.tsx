"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Проверка монтирования для SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  // Блокировка скролла при открытии
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Закрытие по Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Фокус на первом поле при открытии
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const firstInput = modalRef.current.querySelector("input");
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Здесь можно добавить отправку формы
    // Например, через API или email сервис
    console.log("Form data:", formData);
    //@FIXME добавить сюда запрос

    // Имитация отправки
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
      setFormData({ name: "", phone: "", message: "" });
      onClose();
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Маска для телефона
    if (name === "phone") {
      const cleaned = value.replace(/\D/g, "");
      let formatted = "";
      
      if (cleaned.length > 0) {
        formatted = "+7";
        if (cleaned.length > 1) {
          formatted += ` (${cleaned.slice(1, 4)}`;
          if (cleaned.length > 4) {
            formatted += `) ${cleaned.slice(4, 7)}`;
            if (cleaned.length > 7) {
              formatted += `-${cleaned.slice(7, 9)}`;
              if (cleaned.length > 9) {
                formatted += `-${cleaned.slice(9, 11)}`;
              }
            }
          }
        }
      }
      
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <>
      {/* Backdrop с размытием - покрывает весь экран */}
      <div
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Контейнер модального окна - по центру экрана */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
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
          className={`w-full max-w-lg max-h-[90vh] bg-white rounded-2xl shadow-2xl transform transition-all duration-300 flex flex-col pointer-events-auto ${
            isOpen
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-95 opacity-0 translate-y-4"
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => e.stopPropagation()}
        >
        {/* Заголовок - фиксированный */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <h2
            id="modal-title"
            className="text-xl sm:text-2xl font-bold text-gray-900"
          >
            Заказать обратный звонок
          </h2>
          <button
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
          className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto flex-1 min-h-0"
        >
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
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
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="+7 (___) ___-__-__"
            />
          </div>

          {/* Сообщение */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Сообщение (необязательно)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              placeholder="Опишите вашу ситуацию или задайте вопрос"
            />
          </div>

          {/* Кнопки - фиксированные внизу */}
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
              <a
                href="tel:+79789380221"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base transition-colors"
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
                +7 (978) 938-02-21
              </a>
            </div>
          </div>
        </form>
        </div>
      </div>
    </>,
    document.body
  );
}

// Компонент-триггер для открытия модалки
export function ContactModalTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-row gap-2 items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg w-full md:w-fit"
      >
        Заказать обратный звонок
        <Image
          src="/icon-arrow.svg"
          alt="Иконка стрелки"
          width={16}
          height={16}
        />
      </button>
      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
