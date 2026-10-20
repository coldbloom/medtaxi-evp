import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useBodyScrollLock } from "@/src/components/ui/useBodyScrollLock";
import { useDialogFocus } from "@/src/components/ui/useDialogFocus";
import styles from "./ContactModal.module.css";

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  descriptionId: string;
  isSubmitting: boolean;
  stepKey: string;
  theme?: "default" | "donetsk";
  children: ReactNode;
}

/** Presentation, mobile viewport and keyboard behavior; no form or API logic. */
export function ContactDialog({ isOpen, onClose, title, descriptionId, isSubmitting, stepKey, theme = "default", children }: ContactDialogProps) {
  const titleId = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousStepRef = useRef(stepKey);
  const isDonetsk = theme === "donetsk";

  useBodyScrollLock(isOpen);
  useDialogFocus({ isOpen, dialogRef, initialFocusRef: closeButtonRef, onClose, disableClose: isSubmitting });

  useEffect(() => {
    const viewport = window.visualViewport;
    const container = viewportRef.current;
    if (!isOpen || !viewport || !container) return;
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

  useEffect(() => {
    if (isOpen && previousStepRef.current !== stepKey) closeButtonRef.current?.focus({ preventScroll: true });
    previousStepRef.current = stepKey;
  }, [isOpen, stepKey]);

  if (!isOpen || typeof document === "undefined") return null;
  const requestClose = () => {
    if (!isSubmitting) onClose();
  };

  return createPortal(
    <>
      <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md" onClick={requestClose} aria-hidden="true" />
      <div ref={viewportRef} className={`${styles.viewport} z-50 flex items-center justify-center pointer-events-none`}>
        <div
          ref={dialogRef}
          className={`w-full max-w-lg max-h-full min-h-0 overflow-hidden rounded-3xl shadow-2xl flex flex-col pointer-events-auto ${isDonetsk ? "bg-[#183d2f]" : "bg-white"}`}
          role="dialog"
          tabIndex={-1}
          aria-modal="true"
          aria-busy={isSubmitting}
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
        >
          <div className={`flex items-center justify-between gap-2 flex-shrink-0 ${isDonetsk ? "px-5 pt-5 pb-4 sm:px-7 sm:pt-7" : "p-4 sm:p-6 border-b border-gray-200"}`}>
            <h2 id={titleId} className={`min-w-0 text-xl sm:text-2xl font-bold ${isDonetsk ? "text-[#f4f7f5]" : "text-gray-900"}`}>{title}</h2>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={requestClose}
              disabled={isSubmitting}
              className={`p-2 transition-colors rounded-lg flex-shrink-0 disabled:opacity-50 ${isDonetsk ? "min-h-11 min-w-11 grid place-items-center text-[#dce8e0] hover:bg-[#284b3c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3b941]" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"}`}
              aria-label="Закрыть модальное окно"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    </>,
    document.body,
  );
}
