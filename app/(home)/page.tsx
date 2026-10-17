import type { Metadata } from "next";
import { Discounts } from "@/app/components/sections/Discounts";
import { Faq } from "@/app/components/sections/main/Faq";
import { Reviews } from "@/app/components/sections/Reviews";
import { RegionsAndDirections } from "@/app/components/sections/RegionsAndDirections";

import { Hero } from '@/app/components/sections/main/Hero';
import { Services } from "@/app/components/sections/main/Services";
import { Advantages } from "@/app/components/sections/main/Advantages";
import { Geography } from "@/app/components/sections/main/Geography/Geography";
import { Equipment } from "@/app/components/sections/main/Equipment";
import { WhenShipping } from "@/app/components/sections/main/WhenShipping";
import { OurWork } from "@/app/components/sections/main/OurWork";
import { Header } from "@/app/components/sections/Header";
import { CrimeaPatientTransport } from "@/app/components/sections/main/CrimeaPatientTransport";
import { CallToActionSection } from "@/app/components/sections/main/CallToActionSection";
import { serviceOffers } from "@/app/lib/serviceOffers";
import { Footer } from "@/app/components/sections/Footer";

export const metadata: Metadata = {
  title: "Перевозка лежачих больных и инвалидов в Евпатории | Медтакси Евпатория",
  description:
    "Специализированная перевозка лежачих больных и инвалидов в Евпатории, Крыму и по всей России. Профессиональная бригада, медицинское оборудование, работа 24/7.",
};

// ☎
// Структурированные данные для поисковых систем
const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": "https://medtaxi-evp.ru/#organization",
  name: "Медтакси Евпатория",
  description: "Перевозка лежачих больных и инвалидов в Евпатории, Крыму и по всей России. Профессиональная бригада, медицинское оборудование, работа 24/7.",
  url: "https://medtaxi-evp.ru",
  telephone: "+79789380221",
  image: "https://medtaxi-evp.ru/peugeot.jpg",
  sameAs: [
    "https://t.me/ritevp",
    // Добавьте ссылки на VK, WhatsApp при наличии публичных профилей
  ],
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
  offers: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Перевозка лежачих больных",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Перевозка инвалидов",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Санитарный транспорт",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Медицинская транспортировка",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Перевозка людей с ограниченными возможностями",
      },
    },
  ],
  priceRange: "$$",
  openingHours: "Mo-Su 00:00-23:59",
};

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://medtaxi-evp.ru/#breadcrumb",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Главная",
      item: "https://medtaxi-evp.ru",
    },
  ],
};

// Явно указываем главное изображение страницы и хлебные крошки для выдачи
const webPageStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://medtaxi-evp.ru/#webpage",
  url: "https://medtaxi-evp.ru",
  name: "Перевозка лежачих больных и инвалидов в Евпатории | Медтакси Евпатория",
  description: "Специализированная перевозка лежачих больных и инвалидов в Евпатории, Крыму и по всей России. Профессиональная бригада, медицинское оборудование, работа 24/7.",
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: "https://medtaxi-evp.ru/peugeot.jpg",
    width: 1200,
    height: 630,
  },
  breadcrumb: { "@id": "https://medtaxi-evp.ru/#breadcrumb" },
  mainEntity: { "@id": "https://medtaxi-evp.ru/#organization" },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Как осуществляется перевозка лежачих больных в Евпатории?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Перевозка лежачих больных осуществляется на специализированном транспорте с медицинским оборудованием, подъёмниками и фиксаторами. Профессиональная бригада обеспечивает безопасную транспортировку на носилках или в инвалидном кресле.",
      },
    },
    {
      "@type": "Question",
      name: "Работаете ли вы по всему Крыму и России?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да, мы предоставляем услуги перевозки лежачих больных и инвалидов не только в Евпатории, но и по всему Крыму, а также осуществляем междугородние перевозки по всей России.",
      },
    },
    {
      "@type": "Question",
      name: "Какое оборудование используется для перевозки?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Наш транспорт оборудован подъёмниками, фиксаторами, местами для сопровождающих. Возможна транспортировка на носилках или в инвалидном кресле. Салон оснащён климат-контролем и поддерживается в стерильном состоянии.",
      },
    },
    {
      "@type": "Question",
      name: "Сколько стоит перевозка лежачего больного в Евпатории?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Стоимость перевозки лежачих больных и инвалидов в Евпатории и по Крыму зависит от маршрута, сложности и необходимости сопровождения. Точную цену можно узнать по телефону +7 (978) 938-02-21. Мы работаем без скрытых платежей.",
      },
    },
    {
      "@type": "Question",
      name: "Можно ли перевезти больного из больницы домой в Евпатории?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да, мы организуем перевозку лежачих больных из больницы домой в Евпатории и по Крыму. Транспорт подъезжает к месту выписки, обеспечиваем бережную погрузку и доставку до двери.",
      },
    },
    {
      "@type": "Question",
      name: "Делаете ли перевозку на процедуры и в реабилитационный центр?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да, мы осуществляем перевозку лежачих больных и инвалидов на процедуры, обследования, в реабилитационные центры и санатории. Работаем по Евпатории, Крыму и между городами России.",
      },
    },
  ],
};

export default function Home() {
  const serviceTabs = [
    {
      id: "evpatoria",
      title: "Перевозка по Евпатории и рядом",
      description: "Основная локальная услуга: Евпатория, Саки, Уютное, Заозерное.",
      items: serviceOffers.filter((offer) => offer.category === "evpatoria"),
    },
    {
      id: "crimea",
      title: "Популярные направления по Крыму",
      description: "Отдельные страницы под спрос: Евпатория - Симферополь и другие маршруты.",
      items: serviceOffers.filter((offer) => offer.category === "crimea"),
    },
    {
      id: "russia",
      title: "Межгород по России",
      description: "Дальние направления: Москва, Донецк, Херсон и другие города.",
      items: serviceOffers.filter((offer) => offer.category === "russia"),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <Header />

      <main id="main-content" className="relative">
        {/* Hero Section */}
        <Hero />

        {/* Services Section */}
        <Services />

        {/* Advantages Section */}
        <Advantages />

        {/* Geography Section */}
        <Geography />

        {/* Equipment Section */}
        <Equipment />

        {/* Reviews Section */}
        <Reviews />

        {/* Discounts Section */}
        <Discounts />

        {/* Когда нужна перевозка — use cases, long-tail */}
        <WhenShipping />

        {/* Как мы работаем */}
        <OurWork />

        {/* FAQ — расширенный блок для семантики и сниппетов */}
        <Faq />

        {/* Локальное SEO — районы и направления */}
        <RegionsAndDirections />

        {/* Additional SEO Content */}
        <CrimeaPatientTransport />

        <section className="py-12 px-4 bg-gray-50" aria-labelledby="services-pages-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="services-pages-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              Страницы услуг и популярных направлений
            </h2>
            <div className="space-y-6">
              {serviceTabs.map((tab) => (
                <section key={tab.id} className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{tab.title}</h3>
                  <p className="text-gray-700 mb-4">{tab.description}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {tab.items.map((offer) => (
                      <a
                        key={offer.id}
                        href={offer.route}
                        className="block bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                        aria-label={`Подробнее: ${offer.name}`}
                      >
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{offer.shortName}</h4>
                        <p className="text-gray-700 text-sm mb-2">{offer.priceNote}</p>
                        <p className="text-blue-600 font-semibold text-sm">Перейти на страницу</p>
                      </a>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CallToActionSection />
      </main>

      <Footer />
    </>
  );
}
