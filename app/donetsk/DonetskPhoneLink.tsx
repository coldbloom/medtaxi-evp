import type { AnchorHTMLAttributes, ReactNode } from "react";
import { TrackedPhoneLink } from "@/app/components/tracking/TrackedPhoneLink";

/** Телефонная ссылка Донецка: сохраняет прежние цели Яндекс Метрики. */
type DonetskPhoneLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  /** Обычный телефонный адрес, например tel:+79895052785. */
  href: `tel:${string}`;
  /** Текст или иконка внутри ссылки. */
  children: ReactNode;
  /** Положение кнопки: единый идентификатор для нашего API и Метрики. */
  ctaPosition: string;
};

export function DonetskPhoneLink({
  href,
  children,
  ctaPosition,
  ...props
}: DonetskPhoneLinkProps) {
  return (
    <TrackedPhoneLink
      {...props}
      phone={href.slice(4)}
      trackingId={ctaPosition}
      data-donetsk-goal="donetsk_phone_click"
      data-cta-position={ctaPosition}
    >
      {children}
    </TrackedPhoneLink>
  );
}
