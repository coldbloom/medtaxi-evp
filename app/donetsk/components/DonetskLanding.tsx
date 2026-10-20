/* eslint-disable @next/next/no-html-link-for-pages -- Secondary links keep native navigation; Donetsk route links use Next.js. */
import Image from "next/image";
import { DonetskContactTrigger } from "../DonetskContactTrigger";
import { DonetskPhoneLink } from "../DonetskPhoneLink";
import { DonetskSocialLink } from "../DonetskSocialLink";
import { StaticImage } from "../StaticImage";
import styles from "../DonetskMotion.module.css";
import { ContactActionIcon } from "./ContactActionIcon";
import { DonetskRouteLink } from "./DonetskRouteLink";
import { MAX_URL, TELEGRAM_URL } from "@/app/lib/contactChannels";


type ContactProps = { phone: string; phoneLabel: string; ctaPrefix?: string };
const position = (prefix: string, name: string) => prefix ? `${prefix}_${name}` : name;
const defaultNavigation = [
  { href: "#price", label: "Стоимость" },
  { href: "#services", label: "Когда поможем" },
  { href: "#transport", label: "Транспорт" },
  { href: "#faq", label: "Вопросы" },
];

export function DonetskHeader({ phone, phoneLabel, ctaPrefix = "", navigation = defaultNavigation }: ContactProps & { navigation?: typeof defaultNavigation }) {
  return (
      <header className="z-30 border-b border-white/10 bg-[#10211d] text-white">
        <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <DonetskRouteLink href="/donetsk" className="group flex items-center gap-3" aria-label="Медтакси Донецк — главная страница">
            <Image
              src="/logo-donetsk.svg"
              alt="Медтакси Донецк — логотип"
              width={40}
              height={40}
              priority
            />
            <span>
              <span className="block text-base font-black leading-tight tracking-tight">Медтакси</span>
              <span className="block whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-[#bdd0c8]">
                Донецк<span className="hidden min-[360px]:inline"> · ДНР</span>
              </span>
            </span>
          </DonetskRouteLink>

          <nav className={`${styles.navigation} hidden items-center gap-7 text-sm font-semibold text-[#dce8e3] lg:flex`} aria-label="Навигация по странице">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-[#f3b941]">{item.label}</a>
            ))}
          </nav>

          <nav className="flex items-center gap-1.5 sm:gap-2" aria-label="Быстрая связь">
            <DonetskSocialLink
              href={TELEGRAM_URL}
              network="telegram"
              ctaPosition={position(ctaPrefix, "header")}
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-9 shrink-0 place-items-center rounded-full bg-[#2aabee] transition hover:bg-[#1598dc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:size-10"
              aria-label="Написать в Telegram"
              title="Написать в Telegram"
            >
              <StaticImage src="/tg-icon.svg" alt="" width={21} height={18} loading="eager" aria-hidden="true" />
            </DonetskSocialLink>
            <DonetskSocialLink
              href={MAX_URL}
              network="max"
              ctaPosition={position(ctaPrefix, "header")}
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-9 shrink-0 place-items-center rounded-full bg-[linear-gradient(45deg,#3dc0fc,#3d4beb,#8242e3)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:size-10"
              aria-label="Написать в Max"
              title="Написать в Max"
            >
              <StaticImage src="/max-icon.svg" alt="" width={24} height={24} loading="eager" aria-hidden="true" />
            </DonetskSocialLink>
            <DonetskPhoneLink
              href={`tel:${phone}`}
              ctaPosition={position(ctaPrefix, "header")}
              className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/8 text-sm font-extrabold transition hover:bg-white/14 sm:block sm:size-auto sm:px-5 sm:py-2"
              aria-label={`Позвонить ${phoneLabel}`}
              title={`Позвонить ${phoneLabel}`}
            >
              <StaticImage className="sm:hidden" src="/phone-icon.svg" alt="" width={18} height={18} loading="eager" aria-hidden="true" />
              <span className="hidden sm:inline">{phoneLabel}</span>
            </DonetskPhoneLink>
          </nav>
        </div>
      </header>
  );
}

export function DonetskFooter({ phone, phoneLabel, ctaPrefix = "" }: ContactProps) {
  return (
      <footer id="contacts" className="border-t border-white/10 bg-[#0c1916] px-4 py-10 text-[#b9c9c3] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="font-black text-white">Медтакси · Донецк</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed">Перевозка лежачих больных и маломобильных людей в Донецке, по ДНР и между городами.</p>
            <a href="/" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-[#f3b941]">
              <span aria-hidden="true">←</span> Вернуться на главную
            </a>
          </div>
          <div className="sm:text-right">
            <div className="flex items-center gap-3 sm:justify-end" aria-label="Связаться с Медтакси Донецк">
              <DonetskSocialLink
                href={MAX_URL}
                network="max"
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-11 place-items-center rounded-full bg-[linear-gradient(45deg,#3dc0fc,#3d4beb,#8242e3)] shadow-lg shadow-black/15 transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                aria-label="Написать в MAX"
              >
                <StaticImage src="/max-icon.svg" alt="" width={24} height={24} aria-hidden="true" />
              </DonetskSocialLink>
              <DonetskSocialLink
                href={TELEGRAM_URL}
                network="telegram"
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-11 place-items-center rounded-full bg-[#2aabee] shadow-lg shadow-black/15 transition hover:-translate-y-1 hover:bg-[#1598dc] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                aria-label="Написать в Telegram"
              >
                <StaticImage src="/tg-icon.svg" alt="" width={24} height={24} aria-hidden="true" />
              </DonetskSocialLink>
              <DonetskPhoneLink
                href={`tel:${phone}`}
                ctaPosition={position(ctaPrefix, "footer_icon")}
                className="grid size-11 place-items-center rounded-full bg-[linear-gradient(220deg,#62fb7c_0%,#00b929_86.56%,#07b71c_92.85%)] shadow-lg shadow-black/15 transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                aria-label={`Позвонить по телефону ${phoneLabel}`}
              >
                <StaticImage src="/phone-icon.svg" alt="" width={20} height={20} aria-hidden="true" />
              </DonetskPhoneLink>
            </div>
            <DonetskPhoneLink href={`tel:${phone}`} ctaPosition={position(ctaPrefix, "footer")} className="mt-4 inline-block text-lg font-black text-[#f3b941] hover:text-[#ffd06d]">{phoneLabel}</DonetskPhoneLink>
            <p className="mt-1 text-sm">Приём заявок круглосуточно</p>
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-7 border-t border-white/10 pt-6 text-xs text-[#7f938b] sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p>© {new Date().getFullYear()} Медтакси Донецк. Информация на странице не является медицинской консультацией.</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <a href="/privacy" className="underline underline-offset-4 hover:text-white">Политика обработки персональных данных</a>
              <a href="/personal-data-consent" className="underline underline-offset-4 hover:text-white">Согласие на обработку данных</a>
            </div>
          </div>
          <div className="shrink-0 opacity-70 transition hover:opacity-100 flex justify-center">
            <a href="https://t.me/konstankk" target="_blank" rel="noopener noreferrer" aria-label="Ссылка на контакт разработчика (откроется в новой вкладке)">
              <StaticImage src="/codecake.svg" alt="Разработано в CODECAKE" width={235} height={37} />
            </a>
          </div>
        </div>
      </footer>
  );
}

export function DonetskMobileActions({ phone, phoneLabel, ctaPrefix = "" }: ContactProps) {
  return (
    <div className={`${styles.mobileBar} fixed inset-x-0 bottom-0 z-40 border-t border-white/15 bg-[#173d32] px-3 pt-2 pb-[calc(.5rem+env(safe-area-inset-bottom,0px))] shadow-[0_-12px_35px_rgba(20,43,36,.16)] md:hidden`}>
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-2">
        <DonetskPhoneLink
          href={`tel:${phone}`}
          ctaPosition={position(ctaPrefix, "mobile_sticky")}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f3b941] px-2 text-center text-sm font-black text-[#14221e]"
          aria-label={`Позвонить ${phoneLabel}`}
        >
          <ContactActionIcon kind="phone" />
          Позвонить
        </DonetskPhoneLink>
        <DonetskContactTrigger
          mode="messenger"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#708d7e] px-2 text-center text-sm font-bold text-white transition-colors hover:bg-white/10"
          ctaPosition={position(ctaPrefix, "mobile_sticky")}
        />
      </div>
    </div>
  );
}

export function DonetskFaq({ items, groupName }: { items: readonly { question: string; answer: string }[]; groupName?: string }) {
  return (
            <div className="space-y-3">
              {items.map((item, index) => (
                <details key={item.question} name={groupName} className={`${styles.faqItem} group rounded-2xl border border-[#d5cec1] bg-[#f8f6f0] px-5 py-1 open:shadow-sm sm:px-7`} open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-lg font-black text-[#173d32] marker:hidden">
                    {item.question}
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#e2ddd2]" aria-hidden="true">
                      <svg className="size-4 transition-transform group-open:rotate-45" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" focusable="false">
                        <path d="M8 3v10M3 8h10" />
                      </svg>
                    </span>
                  </summary>
                  <p className="max-w-3xl pb-6 pr-10 leading-relaxed text-[#626d68]">{item.answer}</p>
                </details>
              ))}
            </div>
  );
}
