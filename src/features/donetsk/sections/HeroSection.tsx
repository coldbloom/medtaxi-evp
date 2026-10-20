import Link from "next/link";
import { DonetskContactActions } from "@/app/donetsk/components/DonetskContactActions";
import { DonetskHeroVideo } from "@/app/donetsk/components/DonetskHeroVideo";
import { DonetskRouteLink } from "@/app/donetsk/components/DonetskRouteLink";
import { PHONE_HREF, PHONE_LABEL } from "../content";
import styles from "@/app/donetsk/DonetskMotion.module.css";

export function DonetskHeroSection() {
  return (
    <section className="relative isolate bg-[#10211d] text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-24 top-24 size-80 rounded-full bg-[#2d6959]/30 blur-3xl" />
        <div className="absolute -right-32 bottom-0 size-96 rounded-full bg-[#a9712a]/20 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.055] [background-image:radial-gradient(circle_at_center,#fff_1px,transparent_1px)] [background-size:22px_22px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-14 pt-8 sm:px-6 md:pb-20 md:pt-12 lg:grid-cols-[1.03fr_.97fr] lg:px-8 lg:py-20">
        <div>
          <nav aria-label="Хлебные крошки" className="mb-7 text-sm text-[#a9c1b7]">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" prefetch={false} className="hover:text-white">Главная</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white">Донецк</li>
            </ol>
          </nav>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f3b941]/35 bg-[#f3b941]/10 px-4 py-2 text-sm font-bold text-[#ffd476]">
            <span className="size-2 rounded-full bg-[#f3b941] shadow-[0_0_0_5px_rgba(243,185,65,.12)]" />
            Принимаем заявки круглосуточно
          </div>

          <h1 className="max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-[4.15rem]">
            Перевозка лежачих больных <strong className={`${styles.heroAccent} text-[#f3b941]`}>в Донецке</strong>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#cfddd7] sm:text-xl">
            Бережно перевозим лежачих и маломобильных людей по Донецку, ДНР и между городами — на специализированном транспорте, от кровати до кровати.
          </p>

          <DonetskContactActions phone={PHONE_HREF} phoneLabel={PHONE_LABEL} ctaPosition="hero" />

          <ul className="mt-9 grid max-w-2xl gap-3 text-sm font-semibold text-[#d8e5df] sm:grid-cols-3" role="list">
            {["Заявки 24/7", "От кровати до кровати", `Цена до выезда`].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-[#39715f] text-xs text-white" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <DonetskRouteLink href="/donetsk/moskva" className="mt-7 inline-flex min-h-11 items-center gap-3 text-sm font-bold text-[#f3b941] underline decoration-[#f3b941]/50 underline-offset-4 hover:text-[#ffd476] sm:text-base">
            Перевозка из Донецка в Москву <span aria-hidden="true">→</span>
          </DonetskRouteLink>
        </div>

        <div className="relative mx-auto w-full max-w-[380px]">
          <div className={`${styles.heroBadge} absolute z-10 -left-5 -top-5 hidden rounded-3xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-xl sm:block`}>
            <p className="text-2xl font-black text-[#f3b941]">24/7</p>
          </div>
          <DonetskHeroVideo />
        </div>
      </div>
    </section>
  );
}
