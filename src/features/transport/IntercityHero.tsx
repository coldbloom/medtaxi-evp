import type { ReactNode } from "react";
import Link from "next/link";
import { DonetskRouteLink } from "@/app/donetsk/components/DonetskRouteLink";
import { DonetskContactActions } from "@/app/donetsk/components/DonetskContactActions";
import { MercedesGallery } from "@/app/donetsk/moskva/MercedesGallery";
import styles from "@/app/donetsk/DonetskMotion.module.css";

type IntercityHeroProps = {
  contact: { phone: string; phoneLabel: string };
  ctaPosition: string;
  destination: string;
  description: string;
  breadcrumbs: readonly { label: string; href?: string }[];
  benefits: readonly string[];
  routes: ReactNode;
  priceNote?: string;
  theme?: "donetsk" | "blue";
};

/** Shared server-rendered hero: only the gallery and contact dialog are interactive. */
export function IntercityHero({ contact, ctaPosition, destination, description, breadcrumbs, benefits, routes, priceNote, theme = "donetsk" }: IntercityHeroProps) {
  const blue = theme === "blue";
  return (
    <section className={`relative px-4 pb-12 pt-6 text-white sm:px-6 md:pb-20 lg:px-8 ${blue ? "bg-gradient-to-br from-blue-900 to-blue-700" : "bg-[#10211d]"}`}>
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Хлебные крошки" className={`mb-8 text-xs sm:text-sm lg:mb-12 ${blue ? "text-blue-200" : "text-[#a9c1b7]"}`}>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {breadcrumbs.map((item, index) => (
              <li key={item.label} className="inline-flex items-center gap-2">
                {index > 0 && <span aria-hidden="true">→</span>}
                {item.href === "/donetsk" || item.href === "/donetsk/moskva"
                  ? <DonetskRouteLink href={item.href} className="hover:text-white">{item.label}</DonetskRouteLink>
                  : item.href ? <Link href={item.href} className="hover:text-white">{item.label}</Link> : <span aria-current="page" className="text-white">{item.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
          <div className="min-w-0">
            <p className={`mb-5 inline-flex rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-widest ${blue ? "border-blue-300/40 bg-white/10 text-blue-100" : "border-[#f3b941]/30 bg-[#f3b941]/10 text-[#ffd476]"}`}>Плановые поездки · Межгород</p>
            <h1 className="text-[2.15rem] font-black leading-[1.07] tracking-[-0.045em] sm:text-5xl xl:text-[3.6rem]">
              Перевозка лежачих больных <span className={blue ? "text-blue-200" : `${styles.heroAccent} text-[#f3b941]`}>из Донецка {destination}</span>
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-relaxed sm:text-lg ${blue ? "text-blue-100" : "text-[#cfddd7]"}`}>{description}</p>
            {priceNote && <p className="mt-5 inline-flex rounded-2xl border border-white/25 bg-white/10 px-5 py-3 font-bold">Стоимость: {priceNote}</p>}
            <DonetskContactActions {...contact} ctaPosition={ctaPosition} theme={theme} />
          </div>
          <div className="min-w-0">
            <MercedesGallery priority theme={blue ? "blue" : "dark"} />
            <div className="mt-5">{routes}</div>
          </div>
        </div>
        <ul className="mt-10 grid gap-4 border-t border-white/15 pt-7 sm:grid-cols-2 lg:mt-12">
          {benefits.map((item) => (
            <li key={item} className={`flex items-start gap-3 text-sm leading-relaxed sm:text-base ${blue ? "text-blue-100" : "text-[#d8e5df]"}`}>
              <span className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold text-white ${blue ? "bg-blue-500" : "bg-[#39715f]"}`} aria-hidden="true">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
