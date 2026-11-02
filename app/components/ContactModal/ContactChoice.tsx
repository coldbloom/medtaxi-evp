import { DonetskSocialLink } from "@/app/donetsk/DonetskSocialLink";
import { StaticImage } from "@/app/donetsk/StaticImage";
import { MAX_URL, TELEGRAM_URL } from "@/app/lib/contactChannels";
import styles from "./ContactModal.module.css";

const channels = [
  { network: "telegram", label: "Telegram", href: TELEGRAM_URL, icon: "/tg-icon.svg" },
  { network: "max", label: "MAX", href: MAX_URL, icon: "/max-icon.svg" },
] as const;

type ContactChoiceProps = {
  theme?: "donetsk" | "default";
  descriptionId: string;
  ctaPosition: string;
  onContactFormOpen: () => void;
};

export function ContactChoice({ descriptionId, ctaPosition, onContactFormOpen, theme = "donetsk" }: ContactChoiceProps) {
  const donetsk = theme === "donetsk";
  const muted = donetsk ? "text-[#bfcec6]" : "text-slate-600";
  return (
    <div className={`${styles.form} min-h-0 flex-1 overflow-y-auto px-5 pb-6 pt-1 sm:px-7 sm:pb-7`}>
      <p id={descriptionId} className={`mb-5 text-base leading-relaxed sm:mb-6 sm:text-lg ${muted}`}>
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
            className={`flex min-h-24 items-center gap-3 rounded-2xl border p-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 sm:gap-4 sm:p-5 ${donetsk ? "border-[#527060] bg-[#10291f] text-[#f4f7f5] hover:bg-[#24483a] focus-visible:outline-[#f3b941]" : "border-blue-200 bg-blue-50 text-blue-950 hover:bg-blue-100 focus-visible:outline-blue-600"}`}
          >
            <StaticImage src={icon} alt="" width={24} height={24} loading="eager" aria-hidden="true" className={donetsk ? "shrink-0" : "box-content shrink-0 rounded-full bg-blue-600 p-2.5"} />
            <span className="min-w-0 flex-1">
              <span className="block text-base font-semibold leading-snug sm:text-xl">Написать в {label}</span>
              <span className={`mt-1 block text-sm sm:text-base ${muted}`}>Открыть переписку</span>
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </DonetskSocialLink>
        ))}
      </div>
      <div className={`mt-6 border-t pt-6 ${donetsk ? "border-[#527060]" : "border-blue-100"}`}>
        <button
          type="button"
          onClick={onContactFormOpen}
          className={`flex min-h-14 w-full items-center justify-center gap-3 rounded-full px-4 py-3 text-base font-semibold leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 sm:text-lg ${donetsk ? "bg-[#284b3c] text-[#f4f7f5] hover:bg-[#365d4c] focus-visible:outline-[#f3b941]" : "bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline-blue-600"}`}
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
