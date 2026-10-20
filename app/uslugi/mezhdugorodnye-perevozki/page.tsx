import { IntercityRoutePricing } from "@/src/features/transport/IntercityRoutePricing";
import { ServiceFaq } from "@/src/features/transport/ServiceFaq";
import { TransportSteps } from "@/src/features/transport/TransportSteps";
import { ServiceFeatures } from "@/src/features/transport/ServiceFeatures";
import { serializeJsonLd } from "@/app/lib/serializeJsonLd";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/app/components/sections/Header";
import { Footer } from "@/app/components/sections/Footer";
import { Advantages } from "@/app/components/sections/main/Advantages";
import { Reviews } from "@/app/components/sections/Reviews";
import { CallToActionSection } from "@/app/components/sections/main/CallToActionSection";
import { Discounts } from "@/app/components/sections/Discounts";
import { TrackedPhoneLink } from "@/app/components/tracking/TrackedPhoneLink";

const SITE_URL = "https://medtaxi-evp.ru";
const PAGE_URL = `${SITE_URL}/uslugi/mezhdugorodnye-perevozki`;

export const metadata: Metadata = {
  title: "Междугородняя перевозка лежачих больных из Крыма в Москву, СПб, Краснодар | Медтакси Евпатория",
  description:
    "Междугородняя перевозка лежачих больных и инвалидов из Крыма в Москву, Санкт-Петербург, Краснодар и другие города России. Специализированный транспорт, опытная бригада, сопровождение на всём маршруте. Звоните: +7 (978) 938-02-21.",
  alternates: { canonical: "/uslugi/mezhdugorodnye-perevozki" },
  openGraph: {
    title: "Междугородняя перевозка лежачих больных из Крыма — Москва, СПб, Краснодар",
    description:
      "Перевозим лежачих и маломобильных пациентов из Крыма в любой город России. Профессиональная бригада, безопасность на весь маршрут.",
    type: "website",
    url: PAGE_URL,
    images: [{ url: `${SITE_URL}/peugeot.jpg`, width: 1280, height: 960, alt: "Медтакси Евпатория" }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Междугородняя перевозка лежачих больных из Крыма в Москву, СПб, Краснодар",
  description:
    "Дальние перевозки лежачих больных и инвалидов из Евпатории и Крыма в Москву, Санкт-Петербург, Краснодар и другие города России.",
  provider: {
    "@type": "MedicalBusiness",
    name: "Медтакси Евпатория",
    telephone: "+79789380221",
    url: SITE_URL,
  },
  areaServed: [
    { "@type": "City", name: "Евпатория" },
    { "@type": "State", name: "Крым" },
    { "@type": "Country", name: "Россия" },
  ],
  offers: {
    "@type": "Offer",
    priceCurrency: "RUB",
    price: "15000",
    priceSpecification: { "@type": "PriceSpecification", minPrice: 15000, priceCurrency: "RUB" },
  },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Как организована дальняя перевозка лежачего больного из Крыма?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Мы заранее согласовываем маршрут, время выезда и особенности состояния пациента. В пути предусмотрены остановки для отдыха и физиологических нужд. Бригада сопровождает пациента от погрузки до передачи родственникам на месте.",
      },
    },
    {
      "@type": "Question",
      name: "Как долго едет машина из Евпатории в Москву?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Расстояние от Евпатории до Москвы около 1 600 км. Поездка занимает 20–26 часов с учётом остановок. Мы планируем маршрут так, чтобы пациент чувствовал себя максимально комфортно.",
      },
    },
    {
      "@type": "Question",
      name: "Нужно ли сопровождение родственника в дороге?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Родственник может ехать с пациентом — в машине есть место для сопровождающего. Если родственник не едет, наш сотрудник обеспечивает уход и наблюдение на всём пути и передаёт пациента адресату.",
      },
    },
    {
      "@type": "Question",
      name: "Сколько стоит перевозка из Крыма в Москву?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Перевозка из Евпатории в Москву — от 45 000 рублей. Стоимость зависит от маршрута, состояния пациента и объёма сопровождения. Точную цену рассчитываем за 2 минуты: позвоните нам по +7 (978) 938-02-21.",
      },
    },
    {
      "@type": "Question",
      name: "В какие города вы везёте из Крыма?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Москва, Санкт-Петербург, Краснодар, Ростов-на-Дону, Донецк, Луганск, Херсон, Воронеж и другие города. Если нужного направления нет в списке — позвоните, организуем индивидуальный маршрут.",
      },
    },
  ],
};

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Услуги", item: `${SITE_URL}/#services` },
    { "@type": "ListItem", position: 3, name: "Междугородние перевозки", item: PAGE_URL },
  ],
};

const features = [
  {
    icon: "🛣️",
    title: "Специализированный транспорт для дальних маршрутов",
    text: "Просторный салон, горизонтальные носилки с фиксацией, место для сопровождающего. Автомобиль готов к длительным поездкам.",
  },
  {
    icon: "🛑",
    title: "Плановые остановки по маршруту",
    text: "Каждые 3–4 часа — остановка для отдыха, смены положения и физиологических нужд. Маршрут строится с учётом удобных и безопасных мест.",
  },
  {
    icon: "📞",
    title: "Связь с родственниками на всём пути",
    text: "Регулярно сообщаем о местонахождении машины. Вы всегда знаете, где находится ваш близкий.",
  },
  {
    icon: "🤝",
    title: "Передача пациента «из рук в руки»",
    text: "По прибытии помогаем занести пациента домой или в медицинское учреждение. Передаём родственникам или принимающей стороне.",
  },
  {
    icon: "📋",
    title: "Подготовка к поездке",
    text: "Консультируем по сбору документов, медикаментов и необходимых вещей в дорогу. Советуем, как подготовить пациента к длительной поездке.",
  },
  {
    icon: "🔄",
    title: "Обратная перевозка",
    text: "Можем организовать перевозку обратно — из Москвы, СПб или другого города в Крым. Координируемся заранее или по звонку.",
  },
];

const routes = [
  { from: "Евпатория", to: "Москва", price: "от\u00A045\u00A0000\u00A0руб.", km: "~1 600 км" },
  { from: "Евпатория", to: "Санкт-Петербург", price: "от\u00A055\u00A0000\u00A0руб.", km: "~1 900 км" },
  { from: "Евпатория", to: "Краснодар", price: "от\u00A020\u00A0000\u00A0руб.", km: "~600 км" },
  { from: "Евпатория", to: "Ростов-на-Дону", price: "от\u00A018\u00A0000\u00A0руб.", km: "~550 км" },
  { from: "Евпатория", to: "Донецк", price: "от\u00A015\u00A0000\u00A0руб.", km: "~500 км" },
  { from: "Евпатория", to: "Воронеж", price: "от\u00A030\u00A0000\u00A0руб.", km: "~1 100 км" },
];

const steps = [
  {
    num: "1",
    title: "Консультация и расчёт маршрута",
    text: "Обсуждаем состояние пациента, точки отправления и назначения. Рассчитываем время, стоимость и план поездки.",
  },
  {
    num: "2",
    title: "Подготовка и выезд",
    text: "Готовим транспорт, формируем бригаду. Забираем пациента в согласованное время — точно и без задержек.",
  },
  {
    num: "3",
    title: "Безопасный путь с остановками",
    text: "Регулярные остановки для отдыха. Постоянная связь с семьёй. Пациент под наблюдением на всём маршруте.",
  },
  {
    num: "4",
    title: "Доставка и передача",
    text: "Помогаем внести пациента, укладываем, передаём родственникам. Поездка завершена — мы на связи, если нужна обратная перевозка.",
  },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbData) }} />

      <Header />

      <main id="main-content">
        {/* Hero */}
        <section className="bg-gradient-to-br from-indigo-900 to-blue-800 text-white py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap gap-1 text-sm text-indigo-200">
                <li><Link href="/" className="hover:text-white transition-colors">Главная</Link></li>
                <li className="select-none">/</li>
                <li className="text-white font-medium">Междугородние перевозки</li>
              </ol>
            </nav>

            <p className="text-indigo-200 text-sm font-semibold uppercase tracking-widest mb-3">Медтакси Евпатория</p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              Междугородняя перевозка лежачих больных <span className="text-indigo-300">(из Крыма в Москву, СПб, Краснодар)</span>
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl">
              Доставим лежачего или маломобильного пациента из Евпатории и Крыма в любой город России. Опытная бригада, специализированный транспорт, сопровождение на всём маршруте.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <TrackedPhoneLink
                phone="+79789380221"
                trackingId="hero"
                className="inline-flex items-center justify-center bg-white text-indigo-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-colors shadow-lg"
                aria-label="Позвонить +79789380221"
              >
                Позвонить: +7 (978) 938-02-21
              </TrackedPhoneLink>
              <a
                href={`https://t.me/ritevp?text=${encodeURIComponent("Здравствуйте! Нужна междугородняя перевозка из Крыма")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-transparent border-2 border-indigo-300 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-800 transition-colors"
                aria-label="Написать в Telegram"
              >
                Написать в Telegram
              </a>
            </div>

            <div className="flex flex-wrap gap-4">
              {["Москва, СПб, Краснодар", "Носилки и сопровождение", "Остановки в пути", "Связь с семьёй"].map((tag) => (
                <span key={tag} className="bg-blue-600 bg-opacity-60 text-white text-sm px-4 py-2 rounded-full border border-blue-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Why trust block */}
        <section className="py-12 px-4 bg-indigo-50 border-b border-indigo-100">
          <div className="container mx-auto max-w-3xl text-center">
            <p className="text-gray-700 text-lg leading-relaxed">
              Дальняя поездка с лежачим пациентом — это серьёзная организационная задача. Мы берём её на себя полностью:
              {" "}<strong>планируем маршрут, готовим транспорт, сопровождаем пациента</strong>{" "}
              и не отпускаем, пока он не будет в безопасности у близких.
            </p>
          </div>
        </section>

        {/* Routes table */}
        <IntercityRoutePricing routes={routes} />

        {/* Features */}
        <ServiceFeatures title="Что обеспечивает комфорт в дальней дороге" items={features} description="Дальняя поездка требует особой подготовки. Мы продумываем каждый этап." tone="indigo" />

        {/* How it works */}
        <TransportSteps title="Как проходит дальняя перевозка" items={steps} tone="indigo" />

        {/* Direction pages — internal linking */}
        <section className="py-14 px-4 bg-indigo-50 border-y border-indigo-100" aria-labelledby="directions-heading">
          <div className="container mx-auto max-w-5xl">
            <h2 id="directions-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center">
              Страницы по отдельным направлениям
            </h2>
            <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto">
              У каждого направления — отдельная страница с точными ценами, особенностями маршрута и ответами на частые вопросы.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: "Евпатория — Краснодар", href: "/uslugi/perevozka-evpatoria-krasnodar", price: "от\u00A020\u00A0000\u00A0руб." },
                { label: "Евпатория — Ростов-на-Дону", href: "/uslugi/perevozka-evpatoria-rostov", price: "от\u00A018\u00A0000\u00A0руб." },
                { label: "Евпатория — Донецк ДНР", href: "/uslugi/perevozka-evpatoria-donetsk", price: "от\u00A015\u00A0000\u00A0руб." },
                { label: "Евпатория — Луганск ЛНР", href: "/uslugi/perevozka-evpatoria-lugansk", price: "от\u00A018\u00A0000\u00A0руб." },
                { label: "Краснодар — Крым", href: "/uslugi/perevozka-krasnodar-krym", price: "от\u00A020\u00A0000\u00A0руб." },
                { label: "Ростов-на-Дону — Крым", href: "/uslugi/perevozka-rostov-krym", price: "от\u00A018\u00A0000\u00A0руб." },
                { label: "Донецк ДНР — Крым", href: "/uslugi/perevozka-donetsk-krym", price: "от\u00A015\u00A0000\u00A0руб." },
                { label: "Луганск ЛНР — Крым", href: "/uslugi/perevozka-lugansk-krym", price: "от\u00A018\u00A0000\u00A0руб." },
              ].map((d) => (
                <Link
                  key={d.href}
                  href={d.href}
                  className="flex flex-col gap-1 bg-white rounded-xl p-4 border border-indigo-100 hover:shadow-md hover:border-indigo-300 transition-all"
                >
                  <span className="font-semibold text-gray-900 text-sm leading-snug">{d.label}</span>
                  <span className="text-indigo-600 text-xs font-bold">{d.price}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages — reused */}
        <Advantages />

        {/* FAQ */}
        <ServiceFaq title="Частые вопросы о дальних перевозках" items={faqStructuredData.mainEntity} tone="indigo" />

        {/* Reviews — reused */}
        <Reviews />

        {/* Discounts */}
        <Discounts />

        {/* CTA — reused */}
        <CallToActionSection />
      </main>

      <Footer />
    </>
  );
}
