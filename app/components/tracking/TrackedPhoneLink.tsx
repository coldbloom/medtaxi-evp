import type { AnchorHTMLAttributes, ReactNode } from "react";

/** Обычные props ссылки (aria-label, target и др.) плюс данные для учёта клика. */
export type TrackedPhoneLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  /** Номер без пробелов и скобок, например +79895052785. */
  phone: string;
  /** Постоянное имя места на странице: hero, header_mobile, contact_modal. */
  trackingId: string;
  /** Текст или иконка внутри ссылки. */
  children: ReactNode;
  /** Существующие CSS-классы кнопки. */
  className?: string;
};

/**
 * Серверная разметка: ссылка работает даже без JavaScript.
 * Один общий PhoneClickTracking читает data-атрибуты при клике.
 */
export function TrackedPhoneLink({ phone, trackingId, children, ...props }: TrackedPhoneLinkProps) {
  return (
    <a {...props} href={`tel:${phone}`} data-call-tracking-id={trackingId}>
      {children}
    </a>
  );
}
