import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/app/components/sections/Header";
import { Footer } from "@/app/components/sections/Footer";
import { Reviews } from "@/app/components/sections/Reviews";
import { CallToActionSection } from "@/app/components/sections/main/CallToActionSection";

const SITE_URL = "https://medtaxi-evp.ru";
const PAGE_URL = `${SITE_URL}/prices`;

export const metadata: Metadata = {
  title: "Цены на перевозку лежачих больных и инвалидов | Медтакси Евпатория",
  description:
    "Актуальные тарифы на перевозку лежачих больных и инвалидов в Евпатории, по Крыму и России. Перевозка по Евпатории от 2\u00A0500\u00A0руб., Симферополь от 5\u00A0000\u00A0руб., Москва от 45\u00A0000\u00A0руб. Без скрытых платежей.",
  alternates: { canonical: "/prices" },
  openGraph: {
    title: "Цены на перевозку лежачих больных | Медтакси Евпатория",
    description:
      "Тарифы на медицинскую перевозку: по Евпатории, по Крыму и в Россию. Прозрачное ценообразование без скрытых доплат.",
    type: "website",
    url: PAGE_URL,
    images: [{ url: `${SITE_URL}/peugeot.jpg`, width: 1200, height: 630, alt: "Медтакси Евпатория" }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Перевозка лежачих больных и инвалидов",
  provider: {
    "@type": "MedicalBusiness",
    name: "Медтакси Евпатория",
    telephone: "+79789380221",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Евпатория",
      addressRegion: "Крым",
      addressCountry: "RU",
    },
  },
  offers: [
    {
      "@type": "Offer",
      name: "Перевозка по Евпатории",
      priceCurrency: "RUB",
      price: "2500",
      priceSpecification: { "@type": "PriceSpecification", minPrice: 2500, priceCurrency: "RUB" },
      description: "Перевозка лежачих больных и маломобильных пациентов в черте Евпатории",
    },
    {
      "@type": "Offer",
      name: "Перевозка Евпатория – Симферополь",
      priceCurrency: "RUB",
      price: "5000",
      priceSpecification: { "@type": "PriceSpecification", minPrice: 5000, priceCurrency: "RUB" },
      description: "Межгородская перевозка по Крыму",
    },
    {
      "@type": "Offer",
      name: "Перевозка Евпатория – Москва",
      priceCurrency: "RUB",
      price: "45000",
      priceSpecification: { "@type": "PriceSpecification", minPrice: 45000, priceCurrency: "RUB" },
      description: "Дальняя перевозка из Крыма в Москву",
    },
  ],
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Сколько стоит перевозка лежачего больного по Евпатории?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Стоимость перевозки лежачего больного по Евпатории начинается от 2\u00A0500\u00A0рублей. Итоговая цена зависит от расстояния, этажа, необходимости дополнительной помощи при переноске и времени суток.",
      },
    },
    {
      "@type": "Question",
      name: "Сколько стоит перевезти лежачего из Евпатории в Симферополь?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Перевозка из Евпатории в Симферополь стоит от 5\u00A0000\u00A0рублей. В стоимость включены носилки, погрузка и сопровождение. Точную цену называем после уточнения маршрута и состояния пациента.",
      },
    },
    {
      "@type": "Question",
      name: "Какова стоимость перевозки лежачего больного из Крыма в Москву?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Перевозка из Евпатории в Москву — от 45\u00A0000\u00A0рублей. Цена формируется с учётом расстояния (~1\u00A0600\u00A0км), состояния пациента, количества сопровождающих и плановых остановок в пути.",
      },
    },
    {
      "@type": "Question",
      name: "Что входит в стоимость перевозки?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "В базовую стоимость входит: специализированный транспорт с носилками, погрузка и выгрузка пациента, сопровождение на всём маршруте, связь с родственниками. Дополнительно оплачиваются: медицинское сопровождение, подъём на этаж при больших высотах, срочный выезд в ночное время.",
      },
    },
    {
      "@type": "Question",
      name: "Есть ли скидки на перевозку?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да. Постоянным клиентам — скидка 10%. Ветеранам СВО — скидка 10%. При повторном заказе через сайт в течение месяца — 15%. Скидки не суммируются.",
      },
    },
    {
      "@type": "Question",
      name: "Можно ли узнать точную цену заранее?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да. Позвоните по номеру +7\u00A0(978)\u00A0938-02-21 или напишите в Telegram. Мы уточним маршрут, состояние пациента и скажем точную стоимость за 2\u00A0минуты — без скрытых доплат.",
      },
    },
  ],
};

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Цены", item: PAGE_URL },
  ],
};

const localPrices = [
  {
    service: "Перевозка по Евпатории",
    price: "от\u00A02\u00A0500\u00A0руб.",
    note: "В черте города",
    includes: "Транспорт + погрузка",
    link: "/uslugi/perevozka-malomobilnyh-po-evpatorii",
  },
  {
    service: "Евпатория — Саки / Уютное / Заозерное",
    price: "от\u00A03\u00A0500\u00A0руб.",
    note: "До 20\u00A0км от города",
    includes: "Транспорт + погрузка",
    link: "/uslugi/perevozka-iz-evpatorii-v-saki-uyutnoe-zaozernoe",
  },
  {
    service: "Перевозка из больницы домой",
    price: "от\u00A02\u00A0500\u00A0руб.",
    note: "Евпатория и ближайший район",
    includes: "Транспорт + сопровождение",
    link: "/uslugi/perevozka-iz-bolnitsy-domoj",
  },
  {
    service: "Перевозка инвалида-колясочника",
    price: "от\u00A02\u00A0500\u00A0руб.",
    note: "Кресло или носилки",
    includes: "Транспорт + помощь",
    link: "/uslugi/perevozka-invalidov-kolyasochnikov",
  },
];

const crimeaPrices = [
  {
    route: "Евпатория — Симферополь",
    price: "от\u00A05\u00A0000\u00A0руб.",
    km: "~65\u00A0км",
    link: "/uslugi/perevozka-iz-evpatorii-v-simferopol",
  },
  {
    route: "Евпатория — Севастополь",
    price: "от\u00A06\u00A0500\u00A0руб.",
    km: "~70\u00A0км",
    link: null,
  },
  {
    route: "Евпатория — Ялта",
    price: "от\u00A07\u00A0000\u00A0руб.",
    km: "~95\u00A0км",
    link: "/evpatoria-yalta",
  },
  {
    route: "Евпатория — Феодосия",
    price: "от\u00A09\u00A0000\u00A0руб.",
    km: "~155\u00A0км",
    link: null,
  },
  {
    route: "По всему Крыму",
    price: "от\u00A05\u00A0000\u00A0руб.",
    km: "Любой маршрут",
    link: "/uslugi/perevozka-ovz-po-krymu",
  },
];

const russiaPrices = [
  {
    route: "Евпатория — Краснодар",
    price: "от\u00A020\u00A0000\u00A0руб.",
    km: "~600\u00A0км",
    link: "/uslugi/perevozka-evpatoria-krasnodar",
  },
  {
    route: "Евпатория — Ростов-на-Дону",
    price: "от\u00A018\u00A0000\u00A0руб.",
    km: "~550\u00A0км",
    link: "/uslugi/perevozka-evpatoria-rostov",
  },
  {
    route: "Евпатория — Донецк",
    price: "от\u00A015\u00A0000\u00A0руб.",
    km: "~500\u00A0км",
    link: "/uslugi/perevozka-evpatoria-donetsk",
  },
  {
    route: "Евпатория — Луганск",
    price: "от\u00A018\u00A0000\u00A0руб.",
    km: "~600\u00A0км",
    link: "/uslugi/perevozka-evpatoria-lugansk",
  },
  {
    route: "Евпатория — Воронеж",
    price: "от\u00A030\u00A0000\u00A0руб.",
    km: "~1\u00A0100\u00A0км",
    link: null,
  },
  {
    route: "Евпатория — Москва",
    price: "от\u00A045\u00A0000\u00A0руб.",
    km: "~1\u00A0600\u00A0км",
    link: "/uslugi/perevozka-iz-evpatorii-v-moskvu",
  },
  {
    route: "Евпатория — Санкт-Петербург",
    price: "от\u00A055\u00A0000\u00A0руб.",
    km: "~1\u00A0900\u00A0км",
    link: null,
  },
];

const includedItems = [
  {
    icon: "🚐",
    title: "Специализированный транспорт",
    text: "Просторный салон, горизонтальные носилки с фиксацией, климат-контроль. Транспорт подготовлен для безопасной перевозки лежачих и маломобильных пациентов.",
  },
  {
    icon: "🤲",
    title: "Погрузка и выгрузка",
    text: "Бережная переноска пациента с кровати на носилки и обратно. Помогаем до двери — без доплат за этаж в большинстве случаев.",
  },
  {
    icon: "👥",
    title: "Сопровождение в дороге",
    text: "Наш сотрудник находится рядом с пациентом весь путь. Следит за состоянием, помогает при необходимости.",
  },
  {
    icon: "📞",
    title: "Связь с родственниками",
    text: "Сообщаем об отправлении и прибытии. На длинных маршрутах регулярно сообщаем о местонахождении машины.",
  },
  {
    icon: "📋",
    title: "Консультация перед поездкой",
    text: "Помогаем подготовиться: что взять, как подготовить пациента, какие документы нужны для госпитализации.",
  },
  {
    icon: "🔄",
    title: "Гибкое расписание",
    text: "Принимаем заявки круглосуточно. Выезжаем в согласованное время — точно и без задержек.",
  },
];

const extraItems = [
  { label: "Медицинское сопровождение (медбрат/медсестра)", note: "Уточняется индивидуально" },
  { label: "Подъём на этаж выше 3-го без лифта", note: "+ доплата" },
  { label: "Срочный выезд в ночное время (00:00–06:00)", note: "+ доплата" },
  { label: "Дополнительный сопровождающий со стороны клиента", note: "Бесплатно" },
  { label: "Подготовка носилок и специального оборудования", note: "Включено" },
];

const priceFactors = [
  {
    icon: "📍",
    title: "Маршрут",
    text: "Расстояние — основной фактор стоимости. Цены в черте Евпатории, по Крыму и на дальние рейсы существенно отличаются.",
  },
  {
    icon: "🏥",
    title: "Состояние пациента",
    text: "Для пациентов с тяжёлыми ограничениями или после операции требуется дополнительная помощь — это учитывается в цене.",
  },
  {
    icon: "🕐",
    title: "Время суток",
    text: "Ночные выезды (00:00–06:00) могут иметь доплату. Плановые поездки в дневное время выполняются по базовому тарифу.",
  },
  {
    icon: "🏠",
    title: "Этаж и условия погрузки",
    text: "Погрузка до 3 этажа включена. Если нет лифта и нужен подъём выше — уточняем заранее.",
  },
];

const discounts = [
  { amount: "10%", label: "Постоянным клиентам", icon: "🔄" },
  { amount: "10%", label: "Ветеранам СВО", icon: "🎖️" },
  { amount: "15%", label: "При повторном заказе через сайт в течение месяца", icon: "🌐" },
];

export default function PricesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />

      <Header />

      <main id="main-content">
        {/* Hero */}
        <section className="bg-gradient-to-br from-teal-800 to-blue-800 text-white py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap gap-1 text-sm text-teal-200">
                <li><Link href="/" className="hover:text-white transition-colors">Главная</Link></li>
                <li className="select-none">/</li>
                <li className="text-white font-medium">Цены</li>
              </ol>
            </nav>

            <p className="text-teal-200 text-sm font-semibold uppercase tracking-widest mb-3">Медтакси Евпатория</p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              Цены на перевозку лежачих больных и инвалидов
            </h1>
            <p className="text-lg md:text-xl text-teal-100 mb-8 max-w-2xl leading-relaxed">
              Прозрачные тарифы без скрытых доплат. Евпатория, Крым и все регионы России.
              Точную стоимость назовём за 2 минуты — позвоните или напишите.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="tel:+79789380221"
                className="inline-flex items-center justify-center bg-white text-teal-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-50 transition-colors shadow-lg"
                aria-label="Позвонить +79789380221"
              >
                Узнать цену: +7 (978) 938-02-21
              </a>
              <a
                href={`https://t.me/ritevp?text=${encodeURIComponent("Здравствуйте! Хочу узнать стоимость перевозки")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-transparent border-2 border-teal-300 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-colors"
                aria-label="Написать в Telegram"
              >
                Написать в Telegram
              </a>
            </div>

            {/* Quick price summary */}
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { zone: "По Евпатории", price: "от\u00A02\u00A0500\u00A0руб.", icon: "🏙️", sub: "Местные поездки" },
                { zone: "По Крыму", price: "от\u00A05\u00A0000\u00A0руб.", icon: "🗺️", sub: "Межгород в Крыму" },
                { zone: "По России", price: "от\u00A015\u00A0000\u00A0руб.", icon: "🚗", sub: "Дальние маршруты" },
              ].map((item) => (
                <div key={item.zone} className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 shadow-md">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide leading-none mb-0.5">{item.zone}</p>
                    <p className="text-teal-700 font-black text-lg leading-tight whitespace-nowrap">{item.price}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="py-5 px-4 bg-teal-700 text-white">
          <div className="container mx-auto max-w-4xl">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium text-teal-100">
              {["Без скрытых доплат", "Цена фиксируется до выезда", "Работаем 24/7", "Скидки постоянным клиентам"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-300 flex-shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Local prices */}
        <section className="py-16 px-4 bg-white" aria-labelledby="local-prices-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="local-prices-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
              Перевозка по Евпатории и ближайшему району
            </h2>
            <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto">
              Локальные поездки, выезды в больницу, из больницы домой и перевозка инвалидов-колясочников.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm mb-4">
              <table className="w-full text-left">
                <thead className="bg-teal-600 text-white">
                  <tr>
                    <th className="px-5 py-4 font-semibold text-sm">Услуга / Маршрут</th>
                    <th className="px-5 py-4 font-semibold text-sm">Зона</th>
                    <th className="px-5 py-4 font-semibold text-sm">Включено</th>
                    <th className="px-5 py-4 font-semibold text-sm">Стоимость</th>
                  </tr>
                </thead>
                <tbody>
                  {localPrices.map((row, i) => (
                    <tr key={row.service} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-5 py-4 text-gray-900 font-semibold">
                        {row.link ? (
                          <Link href={row.link} className="hover:text-teal-700 transition-colors underline underline-offset-2 decoration-teal-300">
                            {row.service}
                          </Link>
                        ) : row.service}
                      </td>
                      <td className="px-5 py-4 text-gray-500 text-sm">{row.note}</td>
                      <td className="px-5 py-4 text-gray-600 text-sm">{row.includes}</td>
                      <td className="px-5 py-4 text-teal-700 font-bold whitespace-nowrap">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 text-center">
              Цены ориентировочные. Точную стоимость называем после уточнения маршрута.
            </p>
          </div>
        </section>

        {/* Crimea prices */}
        <section className="py-16 px-4 bg-gray-50" aria-labelledby="crimea-prices-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="crimea-prices-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
              Перевозка по Крыму
            </h2>
            <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto">
              Симферополь, Севастополь, Ялта и другие города полуострова. Все направления по одному звонку.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm mb-4">
              <table className="w-full text-left">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-5 py-4 font-semibold text-sm">Маршрут</th>
                    <th className="px-5 py-4 font-semibold text-sm">Расстояние</th>
                    <th className="px-5 py-4 font-semibold text-sm">Стоимость</th>
                  </tr>
                </thead>
                <tbody>
                  {crimeaPrices.map((row, i) => (
                    <tr key={row.route} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-5 py-4 text-gray-900 font-semibold">
                        {row.link ? (
                          <Link href={row.link} className="hover:text-blue-700 transition-colors underline underline-offset-2 decoration-blue-300">
                            {row.route}
                          </Link>
                        ) : row.route}
                      </td>
                      <td className="px-5 py-4 text-gray-500 text-sm">{row.km}</td>
                      <td className="px-5 py-4 text-blue-700 font-bold whitespace-nowrap">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 text-center">
              Нужен маршрут, которого нет в списке? Позвоните — рассчитаем за 2 минуты.
            </p>
          </div>
        </section>

        {/* Russia prices */}
        <section className="py-16 px-4 bg-white" aria-labelledby="russia-prices-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="russia-prices-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
              Междугородние перевозки по России
            </h2>
            <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto">
              Москва, Краснодар, Ростов-на-Дону, Донецк, Воронеж и другие города.
              Специализированный транспорт, остановки в пути, связь с семьёй.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm mb-4">
              <table className="w-full text-left">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="px-5 py-4 font-semibold text-sm">Маршрут</th>
                    <th className="px-5 py-4 font-semibold text-sm">Расстояние</th>
                    <th className="px-5 py-4 font-semibold text-sm">Стоимость</th>
                  </tr>
                </thead>
                <tbody>
                  {russiaPrices.map((row, i) => (
                    <tr key={row.route} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-5 py-4 text-gray-900 font-semibold">
                        {row.link ? (
                          <Link href={row.link} className="hover:text-indigo-700 transition-colors underline underline-offset-2 decoration-indigo-300">
                            {row.route}
                          </Link>
                        ) : row.route}
                      </td>
                      <td className="px-5 py-4 text-gray-500 text-sm">{row.km}</td>
                      <td className="px-5 py-4 text-indigo-700 font-bold whitespace-nowrap">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 text-center">
              Везём в любой город России. Ориентировочные тарифы, точная цена — по звонку.
            </p>

            <div className="mt-8 text-center">
              <Link
                href="/uslugi/mezhdugorodnye-perevozki"
                className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 border border-indigo-200 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-100 transition-colors"
              >
                Подробнее о дальних перевозках →
              </Link>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="py-16 px-4 bg-teal-50" aria-labelledby="included-heading">
          <div className="container mx-auto max-w-6xl">
            <h2 id="included-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Что входит в стоимость
            </h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
              Базовый тариф покрывает всё необходимое для безопасной поездки. Никаких сюрпризов после.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {includedItems.map((item) => (
                <article key={item.title} className="bg-white rounded-2xl p-6 border border-teal-100 hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                </article>
              ))}
            </div>

            {/* Extra items */}
            <div className="mt-10 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
                <h3 className="font-bold text-gray-800">Что оплачивается дополнительно</h3>
              </div>
              <ul className="divide-y divide-gray-100">
                {extraItems.map((item) => (
                  <li key={item.label} className="flex items-center justify-between px-6 py-4">
                    <span className="text-gray-700 text-sm">{item.label}</span>
                    <span className={`text-sm font-semibold whitespace-nowrap ml-4 ${item.note === "Бесплатно" || item.note === "Включено" ? "text-teal-600" : "text-orange-600"}`}>
                      {item.note}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Price factors */}
        <section className="py-16 px-4 bg-white" aria-labelledby="factors-heading">
          <div className="container mx-auto max-w-5xl">
            <h2 id="factors-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Что влияет на итоговую стоимость
            </h2>
            <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
              Объясняем, почему цена рассчитывается индивидуально — и как получить точную сумму заранее.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {priceFactors.map((f) => (
                <div key={f.title} className="flex gap-5 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <div className="flex-shrink-0 text-4xl">{f.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Discounts */}
        <section className="py-16 px-4 bg-gradient-to-br from-teal-700 to-blue-800 text-white" aria-labelledby="discounts-heading">
          <div className="container mx-auto max-w-5xl">
            <h2 id="discounts-heading" className="text-2xl md:text-4xl font-bold text-center mb-3">
              Скидки на перевозку
            </h2>
            <p className="text-center text-teal-200 mb-10 max-w-xl mx-auto">
              Мы ценим своих клиентов. Скидки не суммируются — применяется наиболее выгодная.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {discounts.map((d) => (
                <div key={d.label} className="flex items-center gap-4 bg-white rounded-2xl px-5 py-5 shadow-md">
                  <div className="flex-shrink-0 w-14 h-14 bg-teal-600 rounded-xl flex items-center justify-center text-2xl shadow-inner">
                    {d.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-teal-700 font-black text-3xl leading-none mb-1">{d.amount}</p>
                    <p className="text-gray-600 text-sm leading-snug">{d.label}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <a
                href="tel:+79789380221"
                className="inline-flex items-center justify-center bg-white text-teal-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-50 transition-colors shadow-lg"
                aria-label="Позвонить для уточнения скидок"
              >
                Позвонить и уточнить скидку
              </a>
            </div>
          </div>
        </section>

        {/* How to order */}
        <section className="py-16 px-4 bg-white" aria-labelledby="order-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="order-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Как оформить заказ и узнать точную цену
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  num: "1",
                  title: "Позвоните или напишите",
                  text: "Расскажите маршрут, состояние пациента и удобное время. Принимаем звонки и сообщения 24/7.",
                },
                {
                  num: "2",
                  title: "Получите точную цену",
                  text: "За 2 минуты называем итоговую стоимость без скрытых доплат. Фиксируем сумму до выезда.",
                },
                {
                  num: "3",
                  title: "Подтвердите заказ",
                  text: "Выезжаем в согласованное время. Пациент в безопасности — оплата после выполнения услуги.",
                },
              ].map((step) => (
                <div key={step.num} className="flex flex-col items-center text-center bg-teal-50 rounded-2xl p-7 border border-teal-100">
                  <div className="w-14 h-14 bg-teal-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl mb-5 shadow-md">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-gradient-to-r from-teal-600 to-blue-700 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-3">Рассчитать стоимость прямо сейчас</h3>
              <p className="text-teal-200 mb-6">Назовите маршрут — ответим за 2 минуты.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+79789380221"
                  className="inline-flex items-center justify-center bg-white text-teal-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-50 transition-colors shadow-lg"
                  aria-label="Позвонить для расчёта стоимости"
                >
                  +7 (978) 938-02-21
                </a>
                <a
                  href={`https://t.me/ritevp?text=${encodeURIComponent("Здравствуйте! Хочу узнать стоимость перевозки")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-600 transition-colors"
                  aria-label="Написать в Telegram"
                >
                  Написать в Telegram
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 bg-gray-50" aria-labelledby="faq-heading">
          <div className="container mx-auto max-w-3xl">
            <h2 id="faq-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
              Частые вопросы о ценах
            </h2>
            <div className="space-y-4">
              {faqStructuredData.mainEntity.map((item) => (
                <details key={item.name} className="group bg-white rounded-2xl border border-gray-200 px-6 py-5 cursor-pointer">
                  <summary className="font-semibold text-gray-900 list-none flex justify-between items-center gap-4">
                    {item.name}
                    <span className="text-teal-600 text-2xl font-light group-open:rotate-45 transition-transform duration-200 select-none flex-shrink-0">+</span>
                  </summary>
                  <p className="mt-4 text-gray-600 leading-relaxed text-sm">{item.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <Reviews />

        {/* Services quick nav */}
        <section className="py-12 px-4 bg-white border-t border-gray-100">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Страницы наших услуг</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { href: "/uslugi/perevozka-iz-bolnitsy-domoj", label: "Из больницы домой" },
                { href: "/uslugi/perevozka-invalidov-kolyasochnikov", label: "Инвалиды-колясочники" },
                { href: "/uslugi/mezhdugorodnye-perevozki", label: "Междугородние перевозки" },
                { href: "/contacts", label: "Контакты" },
                { href: "/", label: "На главную" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="bg-teal-50 text-teal-700 font-semibold text-sm px-5 py-2.5 rounded-full border border-teal-200 hover:bg-teal-100 transition-colors"
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
