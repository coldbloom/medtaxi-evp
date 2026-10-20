import { ContactCoverage } from "@/src/features/contacts/ContactCoverage";
import { serializeJsonLd } from "@/app/lib/serializeJsonLd";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/app/components/sections/Header";
import { Footer } from "@/app/components/sections/Footer";
import { CallToActionSection } from "@/app/components/sections/main/CallToActionSection";
import { ContactModalTrigger } from "@/app/components/ContactModal";
import { TrackedPhoneLink } from "@/app/components/tracking/TrackedPhoneLink";

const SITE_URL = "https://medtaxi-evp.ru";

export const metadata: Metadata = {
  title: "Контакты — Медтакси Евпатория | Перевозка лежачих больных",
  description:
    "Контакты Медтакси Евпатория: телефон +7 (978) 938-02-21, Telegram, WhatsApp, VK. Перевозка лежачих больных и инвалидов по Евпатории, Крыму и всей России. Работаем круглосуточно.",
  alternates: { canonical: "/contacts" },
  openGraph: {
    title: "Контакты — Медтакси Евпатория",
    description:
      "Позвоните или напишите нам в любое время. Перевозка лежачих больных по Евпатории и всему Крыму 24/7.",
    type: "website",
    url: `${SITE_URL}/contacts`,
    images: [{ url: `${SITE_URL}/peugeot.jpg`, width: 1280, height: 960, alt: "Медтакси Евпатория" }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Медтакси Евпатория",
  telephone: ["+79789380221", "+79895052785"],
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Евпатория",
    addressRegion: "Крым",
    addressCountry: "RU",
  },
  areaServed: [
    { "@type": "City", name: "Евпатория" },
    { "@type": "State", name: "Крым" },
    { "@type": "Country", name: "Россия" },
  ],
  openingHours: "Mo-Su 00:00-23:59",
  sameAs: [
    "https://t.me/ritevp",
    "https://vk.com/club235608829",
  ],
};

const contacts = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Телефон (основной)",
    value: "+7 (978) 938-02-21",
    href: "tel:+79789380221",
    trackingId: "contact_phone_main",
    note: "Виталий — основная линия",
    color: "bg-blue-50 border-blue-200 hover:border-blue-400",
    iconColor: "text-blue-600 bg-blue-100",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Телефон (второй)",
    value: "+7 (989) 505-27-85",
    href: "tel:+79895052785",
    trackingId: "contact_phone_secondary",
    note: "Константин",
    color: "bg-blue-50 border-blue-200 hover:border-blue-400",
    iconColor: "text-blue-600 bg-blue-100",
  },
  {
    icon: <Image src="/icon-tg.svg" alt="Telegram" width={28} height={28} />,
    label: "Telegram",
    value: "@konstankk",
    href: `https://t.me/konstankk?text=${encodeURIComponent("Здравствуйте! Нужна помощь с перевозкой")}`,
    note: "Ответим быстро",
    color: "bg-sky-50 border-sky-200 hover:border-sky-400",
    iconColor: "text-sky-600 bg-sky-100",
    external: true,
  },
  {
    icon: <Image src="/icon-whatsapp.svg" alt="WhatsApp" width={28} height={28} />,
    label: "WhatsApp",
    value: "+7 (978) 938-02-21",
    href: "https://wa.me/79789380221?text=Здравствуйте",
    note: "Пишите в любое время",
    color: "bg-green-50 border-green-200 hover:border-green-400",
    iconColor: "text-green-600 bg-green-100",
    external: true,
  },
  {
    icon: <Image src="/icon-vk.svg" alt="VK" width={28} height={28} />,
    label: "ВКонтакте",
    value: "Медтакси Евпатория",
    href: "https://vk.com/club235608829",
    note: "Сообщество",
    color: "bg-indigo-50 border-indigo-200 hover:border-indigo-400",
    iconColor: "text-indigo-600 bg-indigo-100",
    external: true,
  },
  {
    icon: <Image src="/max-icon.svg" alt="Max" width={28} height={28} />,
    label: "Max",
    value: "Написать в Max",
    href: "https://max.ru/u/f9LHodD0cOI7hGFwnp4y8CBCeTVIs3kkyT-JqLq2wJc3ES2VjFOgy02xevs",
    note: "Мессенджер Татьяна",
    color: "bg-purple-50 border-purple-200 hover:border-purple-400",
    iconColor: "text-purple-600 bg-purple-100",
    external: true,
  },
];

const workHours = [
  { day: "Пн – Вс", time: "Круглосуточно", accent: true },
  { day: "Срочная заявка", time: "24 / 7", accent: true },
  { day: "Плановые заявки", time: "Принимаем заранее", accent: false },
  { day: "Праздничные дни", time: "Работаем", accent: false },
];

const serviceArea = [
  "Евпатория и район",
  "Симферополь",
  "Севастополь",
  "Ялта",
  "Саки, Уютное, Заозерное",
  "Феодосия",
  "Весь Крым",
  "Москва, СПб, Краснодар",
];

export default function ContactsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />

      <Header />

      <main id="main-content">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap gap-1 text-sm text-blue-200">
                <li><Link href="/" className="hover:text-white transition-colors">Главная</Link></li>
                <li className="select-none">/</li>
                <li className="text-white font-medium">Контакты</li>
              </ol>
            </nav>

            <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-3">Медтакси Евпатория</p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5 [text-wrap:balance]">
              Контакты
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-xl leading-relaxed">
              Звоните или пишите в любое время — мы всегда на связи и готовы организовать перевозку в кратчайшие сроки.
            </p>
          </div>
        </section>

        {/* Contact cards */}
        <section className="py-16 px-4 bg-white" aria-labelledby="contacts-heading">
          <div className="container mx-auto max-w-5xl">
            <h2 id="contacts-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Как с нами связаться
            </h2>
            <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
              Выберите удобный канал связи. Отвечаем быстро в любое время суток.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {contacts.map((c) => {
                const linkProps = {
                  target: c.external ? "_blank" : undefined,
                  rel: c.external ? "noopener noreferrer" : undefined,
                  className: `flex items-start gap-4 p-5 rounded-2xl border-2 transition-all hover:shadow-md ${c.color}`,
                  "aria-label": `${c.label}: ${c.value}`,
                };
                const content = (
                  <>
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${c.iconColor}`}>
                      {c.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{c.label}</p>
                      <p className="font-bold text-gray-900 text-lg leading-tight truncate">{c.value}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{c.note}</p>
                    </div>
                  </>
                );

                // Телефонные карточки участвуют в трекинге; ссылки на мессенджеры обычные.
                return c.href.startsWith("tel:") && c.trackingId ? (
                  <TrackedPhoneLink key={c.label} phone={c.href.slice(4)} trackingId={c.trackingId} {...linkProps}>
                    {content}
                  </TrackedPhoneLink>
                ) : (
                  <a key={c.label} href={c.href} {...linkProps}>
                    {content}
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Map + hours */}
        <ContactCoverage serviceArea={serviceArea} workHours={workHours} />

        {/* Callback form */}
        <section className="py-16 px-4 bg-blue-50" aria-labelledby="callback-heading">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 id="callback-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Заказать обратный звонок
            </h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Оставьте заявку — мы перезвоним в удобное для вас время, ответим на вопросы и организуем перевозку.
            </p>
            <div className="flex justify-center">
              <ContactModalTrigger />
            </div>
          </div>
        </section>

        {/* Services quick nav */}
        <section className="py-12 px-4 bg-white border-t border-gray-100">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Наши услуги</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { href: "/uslugi/perevozka-iz-bolnitsy-domoj", label: "Из больницы домой" },
                { href: "/uslugi/perevozka-invalidov-kolyasochnikov", label: "Инвалиды-колясочники" },
                { href: "/uslugi/mezhdugorodnye-perevozki", label: "Междугородние перевозки" },
                { href: "/", label: "На главную" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="bg-blue-50 text-blue-700 font-semibold text-sm px-5 py-2.5 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CallToActionSection />
      </main>

      <Footer />
    </>
  );
}
