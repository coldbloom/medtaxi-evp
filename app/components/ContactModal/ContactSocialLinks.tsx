import type { MouseEvent } from "react";
import { TrackedPhoneLink } from "@/app/components/tracking/TrackedPhoneLink";
import { DonetskPhoneLink } from "@/app/donetsk/DonetskPhoneLink";
import { DonetskSocialLink } from "@/app/donetsk/DonetskSocialLink";
import { StaticImage } from "@/app/donetsk/StaticImage";
import type { ContactModalVariant } from "./types";
import { MAX_URL, TELEGRAM_URL } from "@/app/lib/contactChannels";

const PHONE_HREF = "+79490676701";
const PHONE_LABEL = "+7 (949) 067-67-01";

const messengers = [
  {
    network: "max",
    label: "MAX",
    href: MAX_URL,
    icon: "/max-icon.svg",
    background: "bg-[linear-gradient(45deg,#3dc0fc,#3d4beb,#8242e3)]",
  },
  {
    network: "telegram",
    label: "Telegram",
    href: TELEGRAM_URL,
    icon: "/tg-icon.svg",
    background: "bg-[#2aabee]",
  },
] as const;

type ContactSocialLinksProps = {
  variant: ContactModalVariant;
  ctaPosition: string;
  disabled: boolean;
  isBusy: () => boolean;
};

export function ContactSocialLinks({ variant, ctaPosition, disabled, isBusy }: ContactSocialLinksProps) {
  const preventWhileBusy = (event: MouseEvent<HTMLAnchorElement>) => {
    if (disabled || isBusy()) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  const phoneProps = {
    "aria-label": `Позвонить ${PHONE_LABEL}`,
    title: `Позвонить ${PHONE_LABEL}`,
    "aria-disabled": disabled || undefined,
    tabIndex: disabled ? -1 : undefined,
    className: `grid size-12 shrink-0 place-items-center rounded-full border border-[#40524c] bg-[#23352f] transition-colors hover:bg-[#304d42] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f6757] ${disabled ? "pointer-events-none opacity-50" : ""}`,
    onClick: preventWhileBusy,
    children: <StaticImage src="/phone-icon.svg" alt="" width={24} height={24} loading="eager" aria-hidden="true" />,
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {messengers.map(({ network, label, href, icon, background }) => {
        const props = {
          href,
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": `Написать в ${label} (откроется в новой вкладке)`,
          title: `Написать в ${label}`,
          "aria-disabled": disabled || undefined,
          tabIndex: disabled ? -1 : undefined,
          className: `grid size-12 shrink-0 place-items-center rounded-full ${background} transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 ${disabled ? "pointer-events-none opacity-50" : ""}`,
          onClick: preventWhileBusy,
          children: <StaticImage src={icon} alt="" width={24} height={24} loading="eager" aria-hidden="true" />,
        };

        return variant === "donetsk"
          ? <DonetskSocialLink key={network} network={network} ctaPosition={ctaPosition} {...props} />
          : <a key={network} {...props} />;
      })}
      {variant === "donetsk"
        ? <DonetskPhoneLink href={`tel:${PHONE_HREF}`} ctaPosition={`${ctaPosition}_phone`} {...phoneProps} />
        : <TrackedPhoneLink phone={PHONE_HREF} trackingId={`${ctaPosition}_phone`} {...phoneProps} />}
    </div>
  );
}
