import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/app/components/sections/Header";
import { Footer } from "@/app/components/sections/Footer";
import { Advantages } from "@/app/components/sections/main/Advantages";
import { Reviews } from "@/app/components/sections/Reviews";
import { CallToActionSection } from "@/app/components/sections/main/CallToActionSection";
import { Discounts } from "@/app/components/sections/Discounts";

const SITE_URL = "https://medtaxi-evp.ru";
const PAGE_URL = `${SITE_URL}/uslugi/perevozka-iz-bolnitsy-domoj`;

export const metadata: Metadata = {
  title: "Перевозка лежачих больных из больницы домой в Евпатории и по Крыму | Медтакси Евпатория",
  description:
    "Перевозка лежачих больных из больницы домой в Евпатории, Симферополе, Севастополе и по всему Крыму. Специализированный транспорт с носилками, бережная погрузка, сопровождение. Работаем 24/7. Звоните: +7 (978) 938-02-21.",
  alternates: { canonical: "/uslugi/perevozka-iz-bolnitsy-domoj" },
  openGraph: {
    title: "Перевозка лежачих больных из больницы домой — Евпатория и Крым",
    description:
      "Специализированный медицинский транспорт, носилки, погрузка с санитарами. Перевезём лежачего из больницы домой или на реабилитацию по Евпатории и Крыму.",
    type: "website",
    url: PAGE_URL,
    images: [{ url: `${SITE_URL}/peugeot.jpg`, width: 1200, height: 630, alt: "Медтакси Евпатория" }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Перевозка лежачих больных из больницы домой в Евпатории и по всему Крыму",
  description:
    "Специализированный медицинский транспорт для перевозки лежачих пациентов из больницы домой. Носилки, погрузка бригадой, сопровождение. Евпатория и Крым.",
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
      name: "Как вы забираете лежачего больного из больницы?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Наша бригада заезжает в указанное отделение или к выходу из стационара. Пациент укладывается на наши носилки или переводится на них из больничной каталки. Мы обеспечиваем бережную погрузку в специализированный автомобиль и комфортную доставку домой.",
      },
    },
    {
      "@type": "Question",
      name: "Нужно ли что-то готовить к выписке для перевозки?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Заранее позвоните нам и сообщите примерное время выписки, адрес больницы и адрес назначения. Мы скоординируемся с родственниками и медперсоналом, чтобы всё прошло быстро и без ожидания в коридоре.",
      },
    },
    {
      "@type": "Question",
      name: "Довезёте ли на высокий этаж без лифта?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да. Наши сотрудники имеют опыт подъёма пациентов на носилках или кресле по лестнице. Для сложных случаев (3+ этаж, узкий пролёт) рекомендуем заранее предупредить — при необходимости выедет усиленная бригада.",
      },
    },
    {
      "@type": "Question",
      name: "Можно ли везти из больницы сразу в реабилитационный центр или к врачу?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Конечно. Мы перевозим по любому маршруту: выписка из больницы — домой, выписка — реабилитационный центр, домой — плановый приём, домой — на процедуры. Маршрут согласуем при записи.",
      },
    },
    {
      "@type": "Question",
      name: "Сколько стоит перевозка лежачего больного из больницы?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Стоимость зависит от расстояния и этажа. В пределах Евпатории — от 2 500 рублей. По Крыму — от 5 000 рублей. Точную цену рассчитываем по телефону за 2 минуты: +7 (978) 938-02-21.",
      },
    },
  ],
};

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Услуги", item: `${SITE_URL}/uslugi` },
    { "@type": "ListItem", position: 3, name: "Перевозка лежачих из больницы домой", item: PAGE_URL },
  ],
};

const features = [
  {
    icon: "🛏️",
    title: "Специальные носилки и каталки",
    text: "Оснащены медицинскими носилками с ремнями фиксации. Пациент лежит горизонтально на протяжении всей поездки — без лишней нагрузки.",
  },
  {
    icon: "💪",
    title: "Бригада для подъёма и переноски",
    text: "2–3 человека выполняют погрузку и помогают подняться на этаж. Опыт работы в узких коридорах, лестничных клетках и лифтах.",
  },
  {
    icon: "🚐",
    title: "Медицинский транспорт с широкими дверьми",
    text: "Специализированный автомобиль с высокой крышей и сдвижным боковым входом — носилки заезжают без наклона.",
  },
  {
    icon: "🌡️",
    title: "Климат-контроль и стерильность",
    text: "Салон поддерживается в чистоте, оснащён климат-контролем. Особенно важно для послеоперационных и ослабленных пациентов.",
  },
  {
    icon: "🤝",
    title: "Координация с родственниками",
    text: "Держим родных в курсе: звоним перед выездом и после доставки. Можно заказать встречу у подъезда.",
  },
  {
    icon: "📋",
    title: "Помощь при оформлении",
    text: "Если нужно дождаться выписки или забрать документы — водитель поможет и подождёт. Организуем всё в одно окно.",
  },
];

const steps = [
  {
    num: "1",
    title: "Звоните заранее или в день выписки",
    text: "Сообщите название больницы, отделение, адрес назначения и примерное время. Цена и время подачи — сразу.",
  },
  {
    num: "2",
    title: "Бригада приезжает к месту выписки",
    text: "Водитель и сопровождающий поднимаются в отделение или ждут у входа. Согласовываем с медперсоналом.",
  },
  {
    num: "3",
    title: "Бережная погрузка на носилки",
    text: "Пациент укладывается на наши носилки. Фиксируем, создаём комфортное положение — и в путь.",
  },
  {
    num: "4",
    title: "Доставка и помощь до постели",
    text: "Поднимаем на нужный этаж, помогаем уложить на кровать или диван. При необходимости остаёмся, пока родственники не устроятся.",
  },
];

const hospitals = [
  "Городская больница Евпатории (ул. Некрасова)",
  "Республиканская больница им. Семашко, Симферополь",
  "Городская больница №1, Симферополь",
  "Севастопольская городская больница",
  "Ялтинский санаторий и реабилитационные центры",
  "Любая больница, поликлиника или стационар Крыма",
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />

      <Header />

      <main id="main-content">
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-800 to-blue-900 text-white py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap gap-1 text-sm text-blue-200">
                <li><Link href="/" className="hover:text-white transition-colors">Главная</Link></li>
                <li className="select-none">/</li>
                <li className="text-white font-medium">Перевозка лежачих из больницы домой</li>
              </ol>
            </nav>

            <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-3">Медтакси Евпатория</p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              Перевозка лежачих больных из больницы домой в Евпатории и по всему Крыму
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl">
              Специализированный медицинский транспорт, носилки, опытная бригада. Забираем из отделения, доставляем до постели — бережно и без лишних тревог.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="tel:+79789380221"
                className="inline-flex items-center justify-center bg-white text-blue-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
                aria-label="Позвонить +79789380221"
              >
                Позвонить: +7 (978) 938-02-21
              </a>
              <a
                href={`https://t.me/ritevp?text=${encodeURIComponent("Здравствуйте! Нужна перевозка лежачего из больницы домой")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-transparent border-2 border-blue-300 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition-colors"
                aria-label="Написать в Telegram"
              >
                Написать в Telegram
              </a>
            </div>

            <div className="flex flex-wrap gap-4">
              {["Носилки и каталки", "Бригада 2–3 человека", "Евпатория и весь Крым", "Работаем 24/7"].map((tag) => (
                <span key={tag} className="bg-blue-600 bg-opacity-60 text-white text-sm px-4 py-2 rounded-full border border-blue-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Why it's needed — empathy block */}
        <section className="py-12 px-4 bg-blue-50 border-b border-blue-100">
          <div className="container mx-auto max-w-3xl text-center">
            <p className="text-gray-700 text-lg leading-relaxed">
              Выписка из больницы — это стресс. Пациент ослаблен, родственники не всегда могут поднять человека,
              обычное такси не подходит. Мы занимаемся именно этим: <strong>безопасно и бережно везём лежачих и маломобильных пациентов</strong> туда, куда вам нужно.
            </p>
          </div>
        </section>

        {/* Features grid */}
        <section className="py-16 px-4 bg-white" aria-labelledby="features-heading">
          <div className="container mx-auto max-w-6xl">
            <h2 id="features-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Что входит в перевозку из больницы
            </h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
              Не просто «довезти» — а организовать всё от момента выписки до укладывания пациента дома.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => (
                <article key={f.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{f.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 px-4 bg-gray-50" aria-labelledby="how-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="how-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Как организовать перевозку из больницы
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {steps.map((s) => (
                <div key={s.num} className="flex gap-5 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl">
                    {s.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hospitals / geography */}
        <section className="py-16 px-4 bg-white" aria-labelledby="hospitals-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="hospitals-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Откуда забираем пациентов
            </h2>
            <p className="text-center text-gray-500 mb-10">
              Работаем с любыми больницами и стационарами Евпатории, Крыма и за его пределами.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {hospitals.map((h) => (
                <div key={h} className="flex items-center gap-3 bg-blue-50 rounded-xl px-5 py-4 border border-blue-100">
                  <span className="text-blue-600 text-xl flex-shrink-0">🏥</span>
                  <span className="text-gray-800 text-sm font-medium">{h}</span>
                </div>
              ))}
            </div>

            {/* Price block */}
            <div className="bg-gradient-to-r from-slate-700 to-blue-800 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-3">Стоимость перевозки</h3>
              <p className="text-blue-200 mb-2">По Евпатории — <strong className="text-white">от 2 500 руб.</strong></p>
              <p className="text-blue-200 mb-2">По Крыму — <strong className="text-white">от 5 000 руб.</strong></p>
              <p className="text-blue-200 mb-6 text-sm">Подъём на этаж без лифта — по договорённости</p>
              <a
                href="tel:+79789380221"
                className="inline-flex items-center justify-center bg-white text-blue-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
                aria-label="Позвонить для расчёта цены"
              >
                Рассчитать стоимость
              </a>
            </div>
          </div>
        </section>

        {/* Advantages — reused */}
        <Advantages />

        {/* FAQ */}
        <section className="py-16 px-4 bg-white" aria-labelledby="faq-heading">
          <div className="container mx-auto max-w-3xl">
            <h2 id="faq-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
              Частые вопросы
            </h2>
            <div className="space-y-4">
              {faqStructuredData.mainEntity.map((item) => (
                <details key={item.name} className="group bg-gray-50 rounded-2xl border border-gray-200 px-6 py-5 cursor-pointer">
                  <summary className="font-semibold text-gray-900 list-none flex justify-between items-center gap-4">
                    {item.name}
                    <span className="text-blue-600 text-2xl font-light group-open:rotate-45 transition-transform duration-200 select-none flex-shrink-0">+</span>
                  </summary>
                  <p className="mt-4 text-gray-600 leading-relaxed text-sm">{item.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

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
