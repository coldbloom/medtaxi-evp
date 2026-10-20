/* eslint-disable @next/next/no-html-link-for-pages -- Keep the home link native; Donetsk route links use Next.js. */
import type { ReactNode } from "react";
import styles from "../DonetskMotion.module.css";
import { DonetskContactTrigger } from "../DonetskContactTrigger";
import { DonetskPhoneLink } from "../DonetskPhoneLink";
import { DonetskFaq } from "../components/DonetskLanding";
import { DonetskRouteChips } from "../components/RouteChip";
import { DonetskContactActions } from "../components/DonetskContactActions";
import { DonetskRouteLink } from "../components/DonetskRouteLink";
import { buttonPrimary, buttonSecondary } from "../components/buttonStyles";
import { MercedesImage } from "./MercedesImage";
import { MercedesGallery } from "./MercedesGallery";
import {
  benefits, routeSteps, priceFactors, equipmentFeatures, preparationItems, orderSteps, faqItems,
} from "./content";

const container = "mx-auto max-w-7xl";
const section = "px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20";
const heading = "text-3xl font-black leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl";
const body = "leading-relaxed text-[#59645f]";

function SectionHeading({ id, eyebrow, children, light = false }: { id?: string; eyebrow: string; children: ReactNode; light?: boolean }) {
  return (
    <div>
      <p className={`mb-4 text-xs font-black uppercase tracking-[0.18em] sm:text-sm ${light ? "text-[#f3b941]" : "text-[#996019]"}`}>{eyebrow}</p>
      <h2 id={id} className={`${heading} ${light ? "text-white" : "text-[#142b24]"}`}>{children}</h2>
    </div>
  );
}

function CheckList({ items, light = false }: { items: readonly string[]; light?: boolean }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className={`flex items-start gap-3 text-sm leading-relaxed sm:text-base ${light ? "text-[#d8e5df]" : "text-[#56635d]"}`}>
          <span className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold ${light ? "bg-[#39715f] text-white" : "bg-[#dfe9e4] text-[#245445]"}`} aria-hidden="true">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

type RouteContactProps = { contact: { phone: string; phoneLabel: string } };

function CallButton({ contact, position, children, className = buttonPrimary }: RouteContactProps & { position: string; children?: ReactNode; className?: string }) {
  return (
    <DonetskPhoneLink href={`tel:${contact.phone}`} ctaPosition={`donetsk_moskva_${position}`} className={`inline-flex max-w-full flex-wrap items-center justify-center gap-2 ${className}`} aria-label={`Позвонить ${contact.phoneLabel}`}>
      {children ?? <>Позвонить <span className="whitespace-nowrap">{contact.phoneLabel}</span></>}
    </DonetskPhoneLink>
  );
}

export function RouteHero({ contact }: RouteContactProps) {
  return (
    <section className="relative bg-[#10211d] px-4 pb-12 pt-6 text-white sm:px-6 md:pb-20 lg:px-8">
      <div className={container}>
        <nav aria-label="Хлебные крошки" className="mb-8 text-xs text-[#a9c1b7] sm:text-sm lg:mb-12">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li><a href="/" className="hover:text-white">Главная</a></li>
            <li aria-hidden="true">→</li>
            <li><DonetskRouteLink href="/donetsk" className="hover:text-white">Донецк</DonetskRouteLink></li>
            <li aria-hidden="true">→</li>
            <li aria-current="page" className="text-white">Москва</li>
          </ol>
        </nav>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
          <div className="min-w-0">
            <p className="mb-5 inline-flex rounded-full border border-[#f3b941]/30 bg-[#f3b941]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#ffd476]">Плановые поездки · Межгород</p>
            <h1 className="text-[2.15rem] font-black leading-[1.07] tracking-[-0.045em] sm:text-5xl xl:text-[3.6rem]">
              Перевозка лежачих больных <span className={`${styles.heroAccent} text-[#f3b941]`}>из Донецка в Москву</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#cfddd7] sm:text-lg">
              Перевозим лежачих и маломобильных пациентов из Донецка и ДНР в Москву на Mercedes. Помогаем с переносом и доставляем от кровати до кровати. Стоимость согласуем до выезда.
            </p>
            <DonetskContactActions phone={contact.phone} phoneLabel={contact.phoneLabel} ctaPosition="donetsk_moskva_hero" />
          </div>
          <div className="min-w-0">
            <MercedesGallery priority />
            <DonetskRouteChips className="mt-5" />
          </div>
        </div>
        <div className="mt-10 border-t border-white/15 pt-7 lg:mt-12"><CheckList items={benefits} light /></div>
      </div>
    </section>
  );
}

export function RouteJourney() {
  return (
    <section id="route" aria-labelledby="route-heading" className={section}>
      <div className={`${container} grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16`}>
        <div>
          <SectionHeading id="route-heading" eyebrow="От адреса до адреса">Из Донецка в Москву — от кровати до кровати</SectionHeading>
          <p className={`mt-5 ${body}`}>Забираем из дома, больницы или пансионата. Доставляем домой, на лечение или реабилитацию. Приём в московской клинике нужно согласовать заранее.</p>
          <p className="mt-4 leading-relaxed text-[#173d32]">В поездках из Донецка в Москву и Санкт-Петербург — <strong>строго 2 водителя</strong> для безопасности в дороге.</p>
          <p className="mt-4 leading-relaxed text-[#173d32]">Едем <strong>по платным дорогам</strong> для комфорта пассажиров.</p>
          <p className="mt-4 text-sm leading-relaxed text-[#65716c]">Плановые поездки — после согласования с врачом. Для нестабильного состояния требуется подходящее медицинское сопровождение.</p>
          <div className="mt-6 rounded-3xl bg-[#173d32] p-6 text-white sm:p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[#f3b941]">Один согласованный маршрут</p>
            <ol className="mt-6 space-y-5 border-l border-[#7b9c8e] pl-5 text-lg font-bold">
              <li>Донецк <span className="block text-sm font-normal text-[#c6d8d1]">Дом или учреждение в ДНР</span></li>
              <li className="text-[#f3b941]">Междугородняя поездка</li>
              <li>Москва <span className="block text-sm font-normal text-[#c6d8d1]">До кровати или места передачи</span></li>
            </ol>
          </div>
          <p className="mt-5 text-sm text-[#65716c]">Поездки по городу — <DonetskRouteLink href="/donetsk" className="font-bold text-[#173d32] underline underline-offset-4">медтакси в Донецке и ДНР</DonetskRouteLink>.</p>
        </div>
        <ol className="divide-y divide-[#d8d2c6]">
          {routeSteps.map((item, index) => (
            <li key={item.title} className="flex gap-4 py-6 first:pt-0 last:pb-0 sm:gap-6">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#dfe9e4] text-sm font-black text-[#245445]" aria-hidden="true">0{index + 1}</span>
              <div><h3 className="text-lg font-black text-[#173d32]">{item.title}</h3><p className={`mt-2 ${body}`}>{item.text}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function RoutePrice() {
  return (
    <section id="price" aria-labelledby="price-heading" className={`${section} bg-[#fbfaf6]`}>
      <div className={`${container} overflow-hidden rounded-[2rem] border border-[#d8d2c6] bg-white shadow-[0_24px_60px_rgba(52,62,57,.08)]`}>
        <div className="grid lg:grid-cols-[.9fr_1.1fr]">
          <div className="bg-[#f3b941] p-6 sm:p-10">
            <SectionHeading id="price-heading" eyebrow="Цена до выезда">Стоимость перевозки Донецк — Москва</SectionHeading>
            <p className="mt-6 text-lg font-bold text-[#173d32]">Индивидуальный расчёт по вашему маршруту</p>
            <p className="mt-4 leading-relaxed text-[#35443f]">Назовём полную стоимость после уточнения адресов и необходимой помощи.</p>
          </div>
          <div className="p-6 sm:p-10">
            <h3 className="mb-6 text-2xl font-black tracking-tight text-[#173d32]">Что учитываем в расчёте</h3>
            <CheckList items={priceFactors} />
            <DonetskContactTrigger className="mt-8 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#173d32] px-6 py-4 text-center font-bold text-white transition hover:bg-[#245445]" label="Узнать стоимость Донецк — Москва" ctaPosition="donetsk_moskva_price" />
            <p className="mt-4 text-sm leading-relaxed text-[#65716c]">Назовите адреса, состояние пациента и дату — рассчитаем стоимость до выезда.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RouteTransport() {
  return (
    <section id="transport" aria-labelledby="transport-heading" className={`${section} bg-[#dfe9e4]`}>
      <div className={container}>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#cad8cf]">
            <MercedesImage name="stretcher-side" alt="Каталка у открытой задней двери нашего Mercedes" sizes="(min-width: 1280px) 584px, (min-width: 1024px) 46vw, calc(100vw - 32px)" className="object-cover" />
          </div>
          <div>
            <SectionHeading id="transport-heading" eyebrow="Mercedes · Наш транспорт">Mercedes для дальней поездки</SectionHeading>
            <p className={`mt-6 text-lg ${body}`}>Каталка, комфортный салон и место для близкого человека. Размещение пациента и сопровождение согласуем перед поездкой.</p>
          </div>
        </div>
        <dl className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {equipmentFeatures.map((item) => (
            <div key={item.title} className="border-t border-[#aec2b6] pt-5"><dt className="text-lg font-black text-[#173d32]">{item.title}</dt><dd className={`mt-2 ${body}`}>{item.text}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function RoutePreparation() {
  return (
    <section id="preparation" aria-labelledby="preparation-heading" className={section}>
      <div className={container}>
        <div className="max-w-4xl"><SectionHeading id="preparation-heading" eyebrow="Памятка для близких">Что подготовить к поездке</SectionHeading></div>
        <ul className="mt-10 grid gap-x-12 gap-y-7 md:grid-cols-2">
          {preparationItems.map((item) => (
            <li key={item.title} className="flex gap-4">
              <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-md border border-[#8ba49a] text-sm text-[#245445]" aria-hidden="true">✓</span>
              <div><h3 className="text-lg font-black text-[#173d32]">{item.title}</h3><p className={`mt-2 ${body}`}>{item.text}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function RouteOrder({ contact }: RouteContactProps) {
  return (
    <section id="how" aria-labelledby="order-heading" className={`${section} bg-[#153b30] text-white`}>
      <div className={container}>
        <div className="max-w-4xl"><SectionHeading id="order-heading" eyebrow="Четыре шага" light>Как заказать перевозку</SectionHeading></div>
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {orderSteps.map((item, index) => (
            <li key={item.title} className="border-t border-white/20 pt-6"><span className="text-3xl font-black text-[#f3b941]" aria-hidden="true">0{index + 1}</span><h3 className="mt-5 text-xl font-black">{item.title}</h3><p className="mt-3 leading-relaxed text-[#c6d8d1]">{item.text}</p></li>
          ))}
        </ol>
        <div className="mt-10"><CallButton contact={contact} position="order" /></div>
        <p className="mt-7 max-w-3xl text-sm leading-relaxed text-[#c6d8d1]">Обратный маршрут Москва — Донецк согласуем отдельно.</p>
      </div>
    </section>
  );
}

export function RouteFaq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className={`${section} bg-[#ebe6db]`}>
      <div className={`${container} grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-12`}>
        <div><SectionHeading id="faq-heading" eyebrow="Перед поездкой">Вопросы о поездке в Москву</SectionHeading><p className={`mt-6 ${body}`}>Не нашли ответ? Позвоните — разберём вашу ситуацию и уточним условия.</p></div>
        <DonetskFaq items={faqItems} groupName="donetsk-moskva-faq" />
      </div>
    </section>
  );
}

export function RouteFinalCta({ contact }: RouteContactProps) {
  return (
    <section aria-labelledby="contact-heading" className={`${section} bg-[#10211d] text-white`}>
      <div className="mx-auto max-w-4xl text-center">
        <SectionHeading id="contact-heading" eyebrow="Обсудим вашу поездку" light>Нужно перевезти близкого человека из Донецка в Москву?</SectionHeading>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#c8d8d2]">Сообщите адреса, дату и состояние пациента. Обсудим поездку и рассчитаем стоимость.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><CallButton contact={contact} position="final">Позвонить</CallButton><DonetskContactTrigger className={buttonSecondary} label="Заказать обратный звонок" ctaPosition="donetsk_moskva_final" /></div>
        {/*<DonetskPhoneLink href={`tel:${contact.phone}`} ctaPosition="donetsk_moskva_final_number" className="mt-5 inline-block text-xl font-bold text-[#f3b941]">{contact.phoneLabel}</DonetskPhoneLink>*/}
      </div>
    </section>
  );
}
