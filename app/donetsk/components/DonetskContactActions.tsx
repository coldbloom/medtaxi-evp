import { DonetskContactTrigger } from "../DonetskContactTrigger";
import { DonetskPhoneLink } from "../DonetskPhoneLink";
import { ContactActionIcon } from "./ContactActionIcon";
import { buttonPrimary, buttonSecondary } from "./buttonStyles";

type DonetskContactActionsProps = { phone: string; phoneLabel: string; ctaPosition: string };

export function DonetskContactActions({ phone, phoneLabel, ctaPosition }: DonetskContactActionsProps) {
  return (
    <div className="mt-8 max-w-xl text-center">
      <div className="flex flex-col gap-3">
        <DonetskPhoneLink href={`tel:${phone}`} ctaPosition={ctaPosition} className={`${buttonPrimary} inline-flex items-center justify-center gap-2`} aria-label={`Позвонить ${phoneLabel}`}>
          <ContactActionIcon kind="phone" />
          <span className="flex flex-wrap justify-center gap-x-1">Позвонить <span className="whitespace-nowrap">{phoneLabel}</span></span>
        </DonetskPhoneLink>
        <DonetskContactTrigger mode="messenger" className={`${buttonSecondary} gap-3`} ctaPosition={ctaPosition} />
      </div>
      <p className="mt-5 text-base leading-relaxed text-[#bfcec6]">
        Не получается дозвониться?<br />
        Напишите в Telegram или MAX.
      </p>
      <DonetskContactTrigger label="Оставить заявку на сайте" ctaPosition={ctaPosition} className="mt-3 inline-flex min-h-11 items-center justify-center text-base font-bold text-[#f3b941] underline underline-offset-4 transition-colors hover:text-[#ffd476]" />
    </div>
  );
}
