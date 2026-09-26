import type { AnchorHTMLAttributes } from "react";

type DonetskSocialLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  network: "max" | "telegram";
  ctaPosition?: string;
};

export function DonetskSocialLink({ network, ctaPosition = "footer", ...props }: DonetskSocialLinkProps) {
  return (
    <a
      {...props}
      data-donetsk-goal="donetsk_messenger_click"
      data-messenger={network}
      data-cta-position={ctaPosition}
    />
  );
}
