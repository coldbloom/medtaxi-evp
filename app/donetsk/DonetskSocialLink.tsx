import type { AnchorHTMLAttributes } from "react";

type DonetskSocialLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  network: "max" | "telegram";
};

export function DonetskSocialLink({ network, ...props }: DonetskSocialLinkProps) {
  return (
    <a
      {...props}
      data-donetsk-goal="donetsk_messenger_click"
      data-messenger={network}
      data-cta-position="footer"
    />
  );
}
