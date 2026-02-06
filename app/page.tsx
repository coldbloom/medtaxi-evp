import type { Metadata } from "next";
import Image from "next/image";
import { CodeCake } from "@/app/components/CodeCake";
import { Discounts } from "@/app/components/sections/Discounts";
import { Faq } from "@/app/components/sections/Faq";
import { Reviews } from "@/app/components/sections/Reviews";

import { Hero } from '@/app/components/sections/main/Hero';
import { Services } from "@/app/components/sections/main/Services";
import { Advantages } from "@/app/components/sections/main/Advantages";
import { Geography } from "@/app/components/sections/main/Geography/Geography";
import { Equipment } from "@/app/components/sections/main/Equipment";
import { WhenShipping } from "@/app/components/sections/main/WhenShipping";
import { OurWork } from "@/app/components/sections/main/OurWork";

export const metadata: Metadata = {
  title: "Перевозка лежачих больных и инвалидов в Евпатории | Медтакси Крым",
  description:
    "Специализированная перевозка лежачих больных и инвалидов в Евпатории, Крыму и по всей России. Профессиональная бригада, медицинское оборудование, работа 24/7.",
  openGraph: {
    url: "https://medtaxi-evp.ru",
    type: "website",
  },
};

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
  serviceType: [
    "Перевозка лежачих больных",
    "Перевозка инвалидов",
    "Санитарный транспорт",
    "Медицинская транспортировка",
  ],
  priceRange: "$$",
  openingHours: "Mo-Su 00:00-23:59",
};

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Главная",
      item: "https://medtaxi-evp.ru",
    },
  ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <div className="sticky top-0 z-30">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 max-w-7xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-4 w-[40px] md:w-[60px]">
                <Image
                  src="/logo.svg"
                  alt="Медтакси Евпатория - Логотип"
                  width={10}
                  height={10}
                  priority
                  className="w-auto h-auto"
                />
                <div>
                  <h1 className="text-lg font-bold text-blue-600">
                    Медтакси Евпатория
                  </h1>
                  {/*<p className="text-sm text-gray-600 mt-1">*/}
                  {/*  Перевозка лежачих больных и инвалидов*/}
                  {/*</p>*/}
                </div>
              </div>
              <a
                href="tel:+79789380221"
                className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm md:text-lg"
                aria-label="Позвонить по телефону +79789380221"
              >
                +7 (978) 938-02-21
              </a>
            </div>
          </div>
        </header>

        <div className="marquee-bar overflow-hidden bg-blue-600 py-2 text-white" aria-hidden>
          <div className="marquee-track">
            <span className="whitespace-nowrap px-8 text-sm font-medium md:text-base">
              Есть предложение дешевле?&nbsp;&nbsp;&nbsp;Позвоните.&nbsp;&nbsp;&nbsp;Скорректируем нашу цену и добавим уверенности!
            </span>
            <span className="whitespace-nowrap px-8 text-sm font-medium md:text-base">
              Есть предложение дешевле? Позвоните. Скорректируем нашу цену и добавим уверенности.
            </span>
          </div>
        </div>
      </div>

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
        <section className="py-16 px-4 bg-gray-50" aria-labelledby="areas-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="areas-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Перевозка лежачих больных в Евпатории и по Крыму
            </h2>
            <p className="text-gray-700 text-center mb-8 max-w-2xl mx-auto">
              Работаем по <strong>Евпатории</strong> (все районы), выезжаем в <strong>Симферополь</strong>, <strong>Севастополь</strong>, <strong>Ялту</strong>, <strong>Алушту</strong>, <strong>Феодосию</strong>, <strong>Керчь</strong> и другие города Крыма. Организуем <strong>междугородние перевозки лежачих больных</strong> в Москву, Санкт-Петербург и по России.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700">Евпатория</span>
              <span className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700">Симферополь</span>
              <span className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700">Севастополь</span>
              <span className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700">Ялта</span>
              <span className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700">Алушта</span>
              <span className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700">Феодосия</span>
              <span className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700">Керчь</span>
              <span className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-700">междугородние перевозки</span>
            </div>
          </div>
        </section>

        {/* Additional SEO Content */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-4xl">
            <article>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Перевозка лежачих больных в Евпатории — наш приоритет
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  Если вам необходима <strong>перевозка лежачих больных в
                  Евпатории</strong>, наша компания готова предоставить
                  профессиональные услуги с использованием специализированного
                  транспорта. Мы понимаем, что транспортировка пациентов требует
                  особого подхода и внимания к деталям.
                </p>
                <p>
                  <strong>Перевозка инвалидов в Крыму</strong> — это наша
                  специализация. Мы работаем не только в Евпатории, но и по всему
                  Крыму, обеспечивая безопасную и комфортную транспортировку
                  пациентов в любую точку полуострова.
                </p>
                <p>
                  Наш <strong>санитарный транспорт в Евпатории</strong> оснащён
                  всем необходимым медицинским оборудованием для перевозки
                  лежачих больных и инвалидов-колясочников. Мы гарантируем
                  бережное отношение и максимальный комфорт в пути.
                </p>
                <p>
                  Кроме того, мы осуществляем <strong>междугородние перевозки по
                  России</strong>, что позволяет нашим клиентам из Евпатории и
                  Крыма получать услуги транспортировки в любой город страны.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-blue-600 text-white">
          <div className="container mx-auto max-w-4xl text-center flex flex-col items-center">
           <div className="flex items-center justify-center pb-8 md:w-[128px] md:h-[128px] w-[96px] h-[96px]">
             <Image
               src="/24:7.svg"
               alt="Круглосуточная работа 24/7 — Медтакси Евпатория"
               width={10}
               height={10}
               priority
               className="w-auto h-auto"
             />
           </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Готовы помочь прямо сейчас
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Звоните круглосуточно. Мы ответим на все вопросы и организуем
              перевозку в кратчайшие сроки.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center flex-wrap">
              <a
                href="tel:+79789380221"
                className="inline-block bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-xl hover:bg-gray-100 transition-colors shadow-lg"
                aria-label="Позвонить по телефону +79789380221"
              >
                +7 (978) 938-02-21
              </a>
              <a
                href={`https://t.me/ritevp?text=${encodeURIComponent("Здравствуйте")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                aria-label="Написать в Telegram"
              >
                Задать вопрос в Telegram
              </a>
            </div>
            <div className="flex gap-4 items-center justify-center mt-6">
              <a 
                href={`https://t.me/ritevp?text=${encodeURIComponent("Здравствуйте")}`}
                className="inline-flex items-center justify-center bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
                aria-label="Написать в Telegram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  src="/icon-tg.svg" 
                  alt="Telegram" 
                  width={24} 
                  height={24} 
                  className="icon-blue"
                />
              </a>
              <a
                href="https://wa.me/79789380221?text=Здравствуйте"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
                aria-label="Написать в Whats App"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icon-whatsapp.svg"
                  alt="Whats App"
                  width={24}
                  height={24}
                  className="icon-blue"
                />
              </a>
              <a 
                href="https://vk.com/club235608829"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
                aria-label="Написать в VK"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  src="/icon-vk.svg" 
                  alt="VK" 
                  width={24} 
                  height={24} 
                  className="icon-blue"
                />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Медтакси Евпатория</h3>
              <p className="text-gray-400">
                Перевозка лежачих больных и инвалидов в{" "}
                <strong>Евпатории</strong>, по <strong>Крыму</strong> и всей{" "}
                <strong>России</strong>.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Контакты</h3>
              <p className="text-gray-400 mb-2">
                <strong>Телефон:</strong>{" "}
                <a
                  href="tel:+79789380221"
                  className="text-blue-400 hover:text-blue-300"
                >
                  +7 (978) 938-02-21
                </a>
              </p>
              <p className="text-gray-400">
                <strong>Регион:</strong> <strong>Евпатория</strong>,{" "}
                <strong>Крым</strong>, Россия
              </p>
              <p className="text-gray-400 mt-2">
                Работаем <strong>24/7</strong>
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Услуги</h3>
              <ul className="text-gray-400 space-y-2">
                <li>• Перевозка лежачих больных</li>
                <li>• Транспортировка инвалидов</li>
                <li>• Санитарный транспорт</li>
                <li>• Междугородние перевозки</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} Медтакси Евпатория. Все права
              защищены.
            </p>
          </div>
          <div className="w-full pt-16 pb-4 flex items-center justify-center">
            <CodeCake />
          </div>
        </div>
      </footer>
    </>
  );
}
