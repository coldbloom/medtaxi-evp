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
const PAGE_URL = `${SITE_URL}/uslugi/perevozka-invalidov-kolyasochnikov`;

export const metadata: Metadata = {
  title: "Перевозка инвалидов-колясочников в Евпатории и по всему Крыму | Медтакси Евпатория",
  description:
    "Специализированная перевозка инвалидов-колясочников в Евпатории, Симферополе, Севастополе и по всему Крыму. Транспорт с пандусом, опытные сопровождающие, работа 24/7. Звоните: +7 (978) 938-02-21.",
  alternates: { canonical: "/uslugi/perevozka-invalidov-kolyasochnikov" },
  openGraph: {
    title: "Перевозка инвалидов-колясочников в Евпатории и по Крыму",
    description:
      "Специализированный транспорт с пандусом и подъёмником. Бережная перевозка инвалидов-колясочников по Евпатории, Крыму и России. Круглосуточно.",
    type: "website",
    url: PAGE_URL,
    images: [{ url: `${SITE_URL}/peugeot.jpg`, width: 1280, height: 960, alt: "Медтакси Евпатория" }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Перевозка инвалидов-колясочников в Евпатории и по Крыму",
  description:
    "Специализированная перевозка инвалидов-колясочников на транспорте с пандусом и подъёмником. Работаем по Евпатории, всему Крыму и России.",
  provider: {
    "@type": "MedicalBusiness",
    name: "Медтакси Евпатория",
    telephone: "+79789380221",
    url: SITE_URL,
  },
  areaServed: [
    { "@type": "City", name: "Евпатория" },
    { "@type": "State", name: "Крым" },
  ],
  offers: {
    "@type": "Offer",
    priceCurrency: "RUB",
    price: "2500",
    priceSpecification: { "@type": "PriceSpecification", minPrice: 2500, priceCurrency: "RUB" },
  },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Как организована перевозка инвалидов-колясочников в Евпатории?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Мы используем специализированный транспорт, оборудованный пандусом или гидравлическим подъёмником. Водитель и сопровождающий помогают разместить коляску и закрепить её в салоне. Пассажир может оставаться в своём кресле или пересесть на сиденье — по желанию.",
      },
    },
    {
      "@type": "Question",
      name: "Возите ли вы колясочников по всему Крыму?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да, выполняем перевозки по всему полуострову: Евпатория, Симферополь, Севастополь, Ялта, Саки и другие населённые пункты. Также организуем дальние поездки за пределы Крыма.",
      },
    },
    {
      "@type": "Question",
      name: "Можно ли перевезти инвалида-колясочника в больницу или на процедуры?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Именно это — основной запрос наших клиентов. Организуем поездки в поликлиники, больницы, диагностические центры, реабилитационные учреждения и санатории. Возможна регулярная перевозка на процедуры по расписанию.",
      },
    },
    {
      "@type": "Question",
      name: "Сколько стоит перевозка инвалида-колясочника в Евпатории?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Стоимость перевозки по Евпатории — от 2 500 рублей. Поездки по Крыму рассчитываются индивидуально, исходя из маршрута и дополнительных услуг. Позвоните нам, чтобы получить точную цену: +7 (978) 938-02-21.",
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
    { "@type": "ListItem", position: 3, name: "Перевозка инвалидов-колясочников", item: PAGE_URL },
  ],
};

const features = [
  {
    icon: "♿",
    title: "Транспорт с пандусом и подъёмником",
    text: "Автомобиль оснащён пандусом или гидравлическим подъёмником — посадка без усилий и лишней нагрузки на пациента.",
  },
  {
    icon: "🔒",
    title: "Надёжная фиксация коляски",
    text: "Кресло-коляска крепится специальными замками — никаких смещений в пути. Пациент может оставаться в своём кресле на протяжении всей поездки.",
  },
  {
    icon: "👨‍⚕️",
    title: "Опытный сопровождающий",
    text: "Наш сотрудник помогает при посадке, высадке и сопровождает до входа. Тактичная помощь без лишних слов.",
  },
  {
    icon: "🌡️",
    title: "Комфорт в салоне",
    text: "Климат-контроль, стерильный салон, плавный ход по ровному маршруту. Всё для спокойной поездки.",
  },
  {
    icon: "📍",
    title: "До двери — без пересадок",
    text: "Забираем от подъезда или палаты и доставляем точно до назначения: поликлиника, больница, процедурный кабинет, дом.",
  },
  {
    icon: "⏰",
    title: "Круглосуточно и без выходных",
    text: "Принимаем заявки 24/7. Экстренный выезд — в течение 30–60 минут. Плановые поездки — по расписанию.",
  },
];

const steps = [
  { num: "1", title: "Позвоните или напишите", text: "Расскажите о маршруте, состоянии пациента и времени поездки. Мы сразу назовём цену." },
  { num: "2", title: "Подтверждение и выезд", text: "Согласуем время. Машина прибудет вовремя — водитель позвонит за 15 минут до приезда." },
  { num: "3", title: "Комфортная поездка", text: "Коляска надёжно закреплена. Сопровождающий рядом. Пациент в безопасности на всём маршруте." },
  { num: "4", title: "Доставка и помощь на месте", text: "Помогаем добраться до нужного кабинета или палаты. При необходимости — ждём и везём обратно." },
];

const routes = [
  "Евпатория (в пределах города)",
  "Евпатория → Симферополь",
  "Евпатория → Севастополь",
  "Евпатория → Ялта",
  "Евпатория → Саки",
  "Евпатория → Феодосия",
  "Евпатория → Москва / СПб",
  "Любой маршрут по договорённости",
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
        <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap gap-1 text-sm text-blue-200">
                <li><Link href="/" className="hover:text-white transition-colors">Главная</Link></li>
                <li className="select-none">/</li>
                <li className="text-white font-medium">Перевозка инвалидов-колясочников</li>
              </ol>
            </nav>

            <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-3">Медтакси Евпатория</p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-balance">
              Перевозка инвалидов-колясочников в Евпатории и по всему Крыму
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl">
              Специализированный транспорт с пандусом и подъёмником. Бережная посадка, надёжная фиксация коляски, опытный сопровождающий. Работаем круглосуточно.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <TrackedPhoneLink
                phone="+79789380221"
                trackingId="hero"
                className="inline-flex items-center justify-center bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
                aria-label="Позвонить +79789380221"
              >
                Позвонить: +7 (978) 938-02-21
              </TrackedPhoneLink>
              <a
                href={`https://t.me/ritevp?text=${encodeURIComponent("Здравствуйте! Нужна перевозка инвалида-колясочника")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-blue-600 border-2 border-blue-300 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-500 transition-colors"
                aria-label="Написать в Telegram"
              >
                Написать в Telegram
              </a>
            </div>

            <div className="flex flex-wrap gap-4">
              {["Транспорт с пандусом", "Работаем 24/7", "По Евпатории и всему Крыму", "Фиксация коляски"].map((tag) => (
                <span key={tag} className="bg-blue-600 bg-opacity-60 text-white text-sm px-4 py-2 rounded-full border border-blue-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Features grid */}
        <ServiceFeatures title="Как мы обеспечиваем комфорт и безопасность" items={features} description="Каждая деталь продумана так, чтобы поездка была максимально удобной — и для пациента, и для родственников." tone="blue" />

        {/* How it works */}
        <TransportSteps title="Как проходит перевозка" items={steps} />

        {/* Routes */}
        <section className="py-16 px-4 bg-white" aria-labelledby="routes-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="routes-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Маршруты перевозки инвалидов-колясочников
            </h2>
            <p className="text-center text-gray-500 mb-10">
              Работаем по Евпатории, Крыму и всей России. Если нужного направления нет в списке — уточните по телефону.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {routes.map((route) => (
                <div key={route} className="flex items-center gap-3 bg-blue-50 rounded-xl px-5 py-4 border border-blue-100">
                  <span className="text-blue-600 text-xl">→</span>
                  <span className="font-medium text-gray-800">{route}</span>
                </div>
              ))}
            </div>

            {/* Price block */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-3">Стоимость перевозки</h3>
              <p className="text-blue-100 mb-6 max-w-xl mx-auto">
                По Евпатории — <strong className="text-white">от 2 500 руб.</strong>&nbsp;&nbsp;·&nbsp;&nbsp;
                По Крыму — <strong className="text-white">от 5 000 руб.</strong>&nbsp;&nbsp;·&nbsp;&nbsp;
                Межгород — по договорённости
              </p>
              <TrackedPhoneLink
                phone="+79789380221"
                trackingId="price_block"
                className="inline-flex items-center justify-center bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
                aria-label="Позвонить для уточнения цены"
              >
                Узнать точную цену
              </TrackedPhoneLink>
            </div>
          </div>
        </section>

        {/* Advantages — reused server component */}
        <Advantages />

        {/* FAQ */}
        <ServiceFaq title="Частые вопросы" items={faqStructuredData.mainEntity} />

        {/* Reviews — reused server component */}
        <Reviews />

        {/* Discounts */}
        <Discounts />

        {/* CTA — reused server component */}
        <CallToActionSection />
      </main>

      <Footer />
    </>
  );
}
