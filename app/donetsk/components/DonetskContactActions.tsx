import { DonetskContactTrigger } from "../DonetskContactTrigger";
import { DonetskPhoneLink } from "../DonetskPhoneLink";
import { ContactActionIcon } from "./ContactActionIcon";
import { buttonPrimary, buttonSecondary } from "./buttonStyles";

type DonetskContactActionsProps = { phone: string; phoneLabel: string; ctaPosition: string; theme?: "donetsk" | "blue" };

export function DonetskContactActions({ phone, phoneLabel, ctaPosition, theme = "donetsk" }: DonetskContactActionsProps) {
  const blue = theme === "blue";
  const primary = blue ? "min-h-14 rounded-full bg-white px-7 py-3.5 text-center text-base font-extrabold text-blue-800 shadow-lg transition hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" : buttonPrimary;
  return (
    <div className="mt-8 max-w-xl text-center">
      <div className="flex flex-col gap-3">
        <DonetskPhoneLink href={`tel:${phone}`} ctaPosition={ctaPosition} className={`${primary} inline-flex items-center justify-center gap-2`} aria-label={`Позвонить ${phoneLabel}`}>
          <ContactActionIcon kind="phone" />
          <span className="flex flex-wrap justify-center gap-x-1">Позвонить <span className="whitespace-nowrap">{phoneLabel}</span></span>
        </DonetskPhoneLink>
        <DonetskContactTrigger mode="messenger" className={`${buttonSecondary} gap-3`} ctaPosition={ctaPosition} />
      </div>
      <p className={`mt-5 text-base leading-relaxed ${blue ? "text-blue-100" : "text-[#bfcec6]"}`}>
        Не получается дозвониться?<br />
        Напишите в Telegram или MAX.
      </p>
      <DonetskContactTrigger label="Оставить заявку на сайте" ctaPosition={ctaPosition} className={`mt-3 inline-flex min-h-11 items-center justify-center text-base font-bold underline underline-offset-4 transition-colors ${blue ? "text-white hover:text-blue-200" : "text-[#f3b941] hover:text-[#ffd476]"}`} />
    </div>
  );
}
