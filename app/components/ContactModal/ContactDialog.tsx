import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
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
  const onCloseRef = useRef(onClose);
  const previousStepRef = useRef(stepKey);
  const isDonetsk = theme === "donetsk";

  useEffect(() => {
    onCloseRef.current = () => {
      if (!isSubmitting) onClose();
    };
  }, [onClose, isSubmitting]);

  useEffect(() => {
    if (!isOpen) return;
    const { scrollX, scrollY } = window;
    const pathname = window.location.pathname;
    const { style } = document.body;
    const previous = { overflow: style.overflow, position: style.position, top: style.top, left: style.left, width: style.width };

    // Fixed positioning also locks the background on iOS while the form scrolls.
    Object.assign(style, { overflow: "hidden", position: "fixed", top: `-${scrollY}px`, left: `-${scrollX}px`, width: "100%" });
    return () => {
      Object.assign(style, previous);
      if (window.location.pathname === pathname) {
        window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
      }
    };
  }, [isOpen]);

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
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      const dialog = dialogRef.current;
      if (event.key !== "Tab" || !dialog) return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href]:not([tabindex="-1"]):not([aria-disabled="true"])',
      )).filter((element) => element.offsetParent !== null);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!first) {
        event.preventDefault();
        return;
      }
      if (!controls.includes(document.activeElement as HTMLElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
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
