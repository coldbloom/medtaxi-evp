"use client";

import { useEffect, useRef, type RefObject } from "react";

const activeDialogs: symbol[] = [];
const focusableSelector = [
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  'a[href]:not([tabindex="-1"]):not([aria-disabled="true"])',
  '[tabindex]:not([tabindex="-1"]):not([disabled])',
].join(",");

/** Shared keyboard behavior; only the uppermost dialog handles Tab and Escape. */
export function useDialogFocus({
  isOpen, dialogRef, initialFocusRef, onClose, disableClose = false,
}: {
  isOpen: boolean;
  dialogRef: RefObject<HTMLElement | null>;
  initialFocusRef?: RefObject<HTMLElement | null>;
  onClose?: () => void;
  disableClose?: boolean;
}) {
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = disableClose ? undefined : onClose;
  }, [onClose, disableClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const token = Symbol("dialog");
    activeDialogs.push(token);
    const controls = () => Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector))
      .filter((element) => element.offsetParent !== null);
    (initialFocusRef?.current ?? controls()[0] ?? dialog).focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (activeDialogs.at(-1) !== token) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current?.();
        return;
      }
      if (event.key !== "Tab") return;
      const available = controls();
      const first = available[0];
      const last = available[available.length - 1];
      if (!first) {
        event.preventDefault();
        dialog.focus({ preventScroll: true });
      } else if (!available.includes(document.activeElement as HTMLElement)) {
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
      const wasTop = activeDialogs.at(-1) === token;
      activeDialogs.splice(activeDialogs.indexOf(token), 1);
      if (wasTop && previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [isOpen, dialogRef, initialFocusRef]);
}
