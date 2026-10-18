import { DonetskSocialLink } from "@/app/donetsk/DonetskSocialLink";
import { StaticImage } from "@/app/donetsk/StaticImage";
import { MAX_URL, TELEGRAM_URL } from "@/app/lib/contactChannels";
import styles from "./ContactModal.module.css";

const channels = [
  { network: "telegram", label: "Telegram", href: TELEGRAM_URL, icon: "/tg-icon.svg" },
  { network: "max", label: "MAX", href: MAX_URL, icon: "/max-icon.svg" },
] as const;

type ContactChoiceProps = {
  descriptionId: string;
  ctaPosition: string;
  onContactFormOpen: () => void;
};

export function ContactChoice({ descriptionId, ctaPosition, onContactFormOpen }: ContactChoiceProps) {
  return (
    <div className={`${styles.form} min-h-0 flex-1 overflow-y-auto px-5 pb-6 pt-1 sm:px-7 sm:pb-7`}>
      <p id={descriptionId} className="mb-5 text-base leading-relaxed text-[#bfcec6] sm:mb-6 sm:text-lg">
        Напишите нам, чтобы обсудить маршрут и стоимость перевозки.
      </p>
      <div className="flex flex-col gap-3">
        {channels.map(({ network, label, href, icon }) => (
          <DonetskSocialLink
            key={network}
            network={network}
            ctaPosition={ctaPosition}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Написать в ${label} (откроется в новой вкладке)`}
            className="flex min-h-24 items-center gap-3 rounded-2xl border border-[#527060] bg-[#10291f] p-4 text-[#f4f7f5] transition-colors hover:bg-[#24483a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3b941] sm:gap-4 sm:p-5"
          >
            <StaticImage src={icon} alt="" width={24} height={24} loading="eager" aria-hidden="true" className="shrink-0" />
            <span className="min-w-0 flex-1">
              <span className="block text-base font-semibold leading-snug sm:text-xl">Написать в {label}</span>
              <span className="mt-1 block text-sm text-[#bfcec6] sm:text-base">Открыть переписку</span>
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </DonetskSocialLink>
        ))}
      </div>
      <div className="mt-6 border-t border-[#527060] pt-6">
        <button
          type="button"
          onClick={onContactFormOpen}
          className="flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#284b3c] px-4 py-3 text-base font-semibold leading-snug text-[#f4f7f5] transition-colors hover:bg-[#365d4c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3b941] sm:text-lg"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
            <path d="M9 4H6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h5M15 4h3a2 2 0 0 1 2 2v4M10 2h4a1 1 0 0 1 1 1v2H9V3a1 1 0 0 1 1-1Zm4 15 5-5 3 3-5 5-4 1 1-4Z" />
          </svg>
          Оставить заявку на сайте
        </button>
      </div>
    </div>
  );
}
