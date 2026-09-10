"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackDonetskGoal } from "./analytics";

type DonetskPhoneLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  ctaPosition: string;
};

export function DonetskPhoneLink({
  children,
  ctaPosition,
  onClick,
  ...props
}: DonetskPhoneLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackDonetskGoal("donetsk_phone_click", {
          cta_position: ctaPosition,
        });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
