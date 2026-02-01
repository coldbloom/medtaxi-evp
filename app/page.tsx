import type { Metadata } from "next";
import Image from "next/image";
import AnimateOnScroll from "./components/AnimateOnScroll";
import {CodeCake} from "@/app/components/CodeCake";
import { ContactModalTrigger } from "./components/ContactModal";
import {Discounts} from "@/app/components/Discounts";

export const metadata: Metadata = {
  title: "Перевозка лежачих больных и инвалидов в Евпатории | Медтакси Крым",
  description: "Специализированная перевозка лежачих больных и инвалидов в Евпатории, Крыму и по всей России. Профессиональная бригада, медицинское оборудование, работа 24/7.",
};

// Структурированные данные для поисковых систем
const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Медтакси Евпатория",
  description: "Перевозка лежачих больных и инвалидов в Евпатории, Крыму и по всей России",
  url: "https://medtaxi-evp.ru",
  telephone: "+79789380221",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Евпатория",
    addressRegion: "Крым",
    addressCountry: "RU",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Евпатория",
    },
    {
      "@type": "State",
      name: "Крым",
    },
    {
      "@type": "Country",
      name: "Россия",
    },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 w-[40px] md:w-[60px]">
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

      <main className="relative">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-12 md:py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Text Content */}
              <div className="order-2 lg:order-1 animate-on-mount-right">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Перевозка лежачих больных и инвалидов в{" "}
                  <span className="text-blue-600">Евпатории</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                  <strong>Специализированный транспорт</strong> с медоборудованием и{" "}
                  <strong>профессиональной бригадой</strong>. Бережно, как дома, даже
                  в дороге.
                </p>
                <p className="text-base md:text-lg text-gray-600 mb-8">
                  Здоровье и покой близкого человека — главная ценность. Мы понимаем,
                  насколько сложной и ответственной может быть транспортировка
                  лежачего больного. Наша компания в{" "}
                  <strong>Евпатории</strong> предоставляет полный комплекс услуг по
                  перевозке пациентов, делая этот процесс максимально безопасным и
                  комфортным.
                </p>
                <div className="flex flex-col gap-6 mt-6">
                  <ContactModalTrigger />
                  <a
                    href={`https://t.me/ritevp?text=${encodeURIComponent("Здравствуйте")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row gap-2 items-center justify-center bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg w-full md:w-fit"
                    aria-label="Задать вопрос в Telegram"
                  >
                    Задать вопрос в Telegram
                    <img
                      src="/icon-tg.svg"
                      alt="Telegram"
                      width={24}
                      height={24}
                      className="icon-blue"
                    />
                  </a>
                </div>
              </div>

              {/* Image */}
              <div className="order-1 lg:order-2 animate-on-mount-left">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white p-2">
                  <div className="relative aspect-[4/3] lg:aspect-square rounded-xl overflow-hidden">
                    <Image
                      src="/peugeot.jpg"
                      alt="Специализированный медицинский транспорт для перевозки лежачих больных в Евпатории"
                      fill
                      className="object-cover object-center lg:object-[center_30%]"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
                    />
                    {/* Gradient overlay для лучшей интеграции */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <AnimateOnScroll direction="up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                Наши услуги
              </h2>
            </AnimateOnScroll>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimateOnScroll direction="up" delay={0}>
                <article className="bg-gray-50 p-6 rounded-lg border border-gray-200 md:h-full">
                  <div className="text-4xl mb-4">🏥</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Перевозка из больниц
                  </h3>
                  <p className="text-gray-600">
                    <strong>Перевозка лежачих больных</strong> из больниц, домов и
                    пансионатов в <strong>Евпатории</strong> и по{" "}
                    <strong>Крыму</strong>.
                  </p>
                </article>
              </AnimateOnScroll>

              <AnimateOnScroll direction="up" delay={100}>
                <article className="bg-gray-50 p-6 rounded-lg border border-gray-200 md:h-full">
                  <div className="text-4xl mb-4">♿</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Транспортировка инвалидов
                  </h3>
                  <p className="text-gray-600">
                    <strong>Транспортировка инвалидов-колясочников</strong> и
                    маломобильных граждан с полным комфортом.
                  </p>
                </article>
              </AnimateOnScroll>

              <AnimateOnScroll direction="up" delay={200}>
                <article className="bg-gray-50 p-6 rounded-lg border border-gray-200 md:h-full">
                  <div className="text-4xl mb-4">🚑</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Санитарный транспорт
                  </h3>
                  <p className="text-gray-600">
                    <strong>Санитарный транспорт по Крыму</strong> и{" "}
                    <strong>междугородние перевозки по России</strong>.
                  </p>
                </article>
              </AnimateOnScroll>

              <AnimateOnScroll direction="up" delay={300}>
                <article className="bg-gray-50 p-6 rounded-lg border border-gray-200 md:h-full">
                  <div className="text-4xl mb-4">🏥</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Поездки на обследования
                  </h3>
                  <p className="text-gray-600">
                    Поездки на обследования, процедуры и в реабилитационные центры
                    в <strong>Евпатории</strong> и за её пределами.
                  </p>
                </article>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-16 px-4 bg-blue-50">
          <div className="container mx-auto max-w-6xl">
            <AnimateOnScroll direction="up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                Почему доверяют именно нам?
              </h2>
            </AnimateOnScroll>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimateOnScroll direction="up" delay={0}>
                <article className="bg-white p-6 rounded-lg shadow-md md:h-full">
                  <div className="text-3xl mb-4">🚐</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Специализированный транспорт
                  </h3>
                  <p className="text-gray-600">
                    Автомобили, оборудованные <strong>подъёмниками</strong>,{" "}
                    <strong>фиксаторами</strong> и местами для сопровождающих.
                    Возможность транспортировки на носилках или в инвалидном
                    кресле.
                  </p>
                </article>
              </AnimateOnScroll>

              <AnimateOnScroll direction="up" delay={100}>
                <article className="bg-white p-6 rounded-lg shadow-md md:h-full">
                  <div className="text-3xl mb-4">🛡️</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Безопасность и комфорт
                  </h3>
                  <p className="text-gray-600">
                    Плавный ход, <strong>климат-контроль</strong>,{" "}
                    <strong>стерильный салон</strong>. Все условия для
                    минимизации дискомфорта в пути.
                  </p>
                </article>
              </AnimateOnScroll>

              <AnimateOnScroll direction="up" delay={200}>
                <article className="bg-white p-6 rounded-lg shadow-md md:h-full">
                  <div className="text-3xl mb-4">👨‍⚕️</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Опытные водители и сопровождающие
                  </h3>
                  <p className="text-gray-600">
                    Наши сотрудники проходят специальную подготовку по
                    транспортировке пациентов, тактичны и внимательны.
                  </p>
                </article>
              </AnimateOnScroll>

              <AnimateOnScroll direction="up" delay={300}>
                <article className="bg-white p-6 rounded-lg shadow-md md:h-full">
                  <div className="text-3xl mb-4">⏰</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Работаем 24/7
                  </h3>
                  <p className="text-gray-600">
                    Готовы помочь в любой день и время суток.{" "}
                    <strong>Срочные и плановые перевозки</strong> в{" "}
                    <strong>Евпатории</strong> и по <strong>Крыму</strong>.
                  </p>
                </article>
              </AnimateOnScroll>

              <AnimateOnScroll direction="up" delay={400}>
                <article className="bg-white p-6 rounded-lg shadow-md md:col-span-2 lg:col-span-1 md:h-full">
                  <div className="text-3xl mb-4">🔑</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    «Под ключ» в Крыму и России
                  </h3>
                  <p className="text-gray-600">
                    Мы берём на себя организацию всей поездки: от подготовки
                    документов (при необходимости) и погрузки до сопровождения до
                    конечной точки.
                  </p>
                </article>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Geography Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Мы находимся в <span className="text-blue-600">Евпатории</span> и
              работаем по всему <strong>Крыму</strong> и <strong>России</strong>
            </h2>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Территория обслуживания
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">📍</span>
                      <span>
                        <strong>Евпатория</strong> — основной регион работы
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">📍</span>
                      <span>
                        <strong>Весь Крым</strong> — перевозки по полуострову
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">📍</span>
                      <span>
                        <strong>Вся Россия</strong> — междугородние перевозки
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Популярные направления
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li>• Симферополь</li>
                    <li>• Севастополь</li>
                    <li>• Ялта</li>
                    <li>• Алушта</li>
                    <li>• Феодосия</li>
                    <li>• Керчь</li>
                    <li>• Херсонская область</li>
                    <li>• ДНР, ЛНР</li>
                    <li>• Москва</li>
                    <li>• Санкт-Петербург</li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="mt-8 text-center text-gray-600">
              <strong>Перевозка лежачих больных из Евпатории</strong> и по{" "}
              <strong>Крыму</strong> осуществляется на специализированном
              транспорте с медицинским оборудованием. Мы обеспечиваем безопасную
              транспортировку пациентов в любой город России.
            </p>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Отзывы наших клиентов
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <article className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 text-2xl">★★★★★</div>
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "Очень благодарны за помощь в перевозке мамы из больницы в
                  Евпатории домой. Водитель Виталий внимательным, машина чистая, всё
                  прошло быстро и аккуратно. Рекомендую!"
                </p>
                <p className="text-gray-600 font-semibold">— Мария, Евпатория</p>
              </article>

              <article className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 text-2xl">★★★★★</div>
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "Нужно было перевезти отца из Симферополя в Евпаторию. Спасибо
                  за профессиональный подход и бережное отношение Виталию и Антону! Всё
                  организовали под ключ, мы были спокойны за здоровье близкого
                  человека."
                </p>
                <p className="text-gray-600 font-semibold">— Иван, Симферополь</p>
              </article>

              <article className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 text-2xl">★★★★★</div>
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "Перевозили бабушку на обследование в Симферополь. Очень
                  довольны сервисом: комфортная машина, опытный водитель, всё
                  вовремя. Обязательно обратимся снова!"
                </p>
                <p className="text-gray-600 font-semibold">— Анна, Севастополь</p>
              </article>
            </div>
            <div className="mt-12 text-center p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="text-lg text-gray-700 mb-4">
                Остались вопросы? Напишите нам в Telegram — ответим быстро.
              </p>
              <a
                href={`https://t.me/ritevp?text=${encodeURIComponent("Здравствуйте")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
                aria-label="Задать вопрос в Telegram"
              >
                Задать вопрос в Telegram
              </a>
            </div>
          </div>
        </section>

        {/* Discounts Section */}
        <Discounts />

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
               alt="Медтакси Евпатория - Логотип"
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
