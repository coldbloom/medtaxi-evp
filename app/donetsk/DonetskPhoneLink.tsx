import type { AnchorHTMLAttributes, ReactNode } from "react";

type DonetskPhoneLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  ctaPosition: string;
};

export function DonetskPhoneLink({
  children,
  ctaPosition,
  ...props
}: DonetskPhoneLinkProps) {
  return (
    <a
      {...props}
      data-donetsk-goal="donetsk_phone_click"
      data-cta-position={ctaPosition}
    >
      {children}
    </a>
  );
}
