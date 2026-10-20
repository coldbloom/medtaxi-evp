"use client";

import { useLinkStatus } from "next/link";
import { createPortal } from "react-dom";
import styles from "./RouteLinkStatus.module.css";

export function RouteLinkStatus({ label }: { label: string }) {
  const { pending } = useLinkStatus();

  return (
    <>
      <span className={styles.indicator} data-navigation-pending={pending} aria-hidden="true" />
      <span role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {pending ? `Открываем страницу… ${label}` : ""}
      </span>
      {/* A portal avoids clipping by the mobile menu's scrolling/animated container. */}
      {pending && typeof document !== "undefined" && createPortal(
        <span className={styles.notice} data-route-navigation-notice="" aria-hidden="true">
          <span className={styles.noticeTitle}>Открываем страницу…</span>
          <span className={styles.noticeRoute}>{label}</span>
        </span>,
        document.body,
      )}
    </>
  );
}
