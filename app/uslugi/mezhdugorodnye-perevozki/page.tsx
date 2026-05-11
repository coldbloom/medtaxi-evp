import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/app/components/sections/Header";
import { Footer } from "@/app/components/sections/Footer";
import { Advantages } from "@/app/components/sections/main/Advantages";
import { Reviews } from "@/app/components/sections/Reviews";
import { CallToActionSection } from "@/app/components/sections/main/CallToActionSection";
import { Discounts } from "@/app/components/sections/Discounts";

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
    images: [{ url: `${SITE_URL}/peugeot.jpg`, width: 1200, height: 630, alt: "Медтакси Евпатория" }],
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
    { "@type": "ListItem", position: 2, name: "Услуги", item: `${SITE_URL}/uslugi` },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />

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
              <a
                href="tel:+79789380221"
                className="inline-flex items-center justify-center bg-white text-indigo-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-colors shadow-lg"
                aria-label="Позвонить +79789380221"
              >
                Позвонить: +7 (978) 938-02-21
              </a>
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
        <section className="py-16 px-4 bg-white" aria-labelledby="routes-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="routes-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Популярные направления и цены
            </h2>
            <p className="text-center text-gray-500 mb-10">
              Ориентировочные тарифы. Точная стоимость зависит от маршрута и дополнительных услуг.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm mb-8">
              <table className="w-full text-left">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="px-5 py-4 font-semibold text-sm">Откуда</th>
                    <th className="px-5 py-4 font-semibold text-sm">Куда</th>
                    <th className="px-5 py-4 font-semibold text-sm">Расстояние</th>
                    <th className="px-5 py-4 font-semibold text-sm">Стоимость</th>
                  </tr>
                </thead>
                <tbody>
                  {routes.map((r, i) => (
                    <tr key={r.to} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-5 py-4 text-gray-700 font-medium">{r.from}</td>
                      <td className="px-5 py-4 text-gray-900 font-bold">{r.to}</td>
                      <td className="px-5 py-4 text-gray-500 text-sm">{r.km}</td>
                      <td className="px-5 py-4 text-indigo-700 font-bold whitespace-nowrap">{r.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-400 text-center mb-8">
              Не нашли свой маршрут? Звоните — рассчитаем стоимость для любого направления.
            </p>

            <div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-3">Рассчитать стоимость поездки</h3>
              <p className="text-indigo-200 mb-6">Назовите маршрут и состояние пациента — ответим за 2 минуты.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+79789380221"
                  className="inline-flex items-center justify-center bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-colors shadow-lg"
                  aria-label="Позвонить для расчёта"
                >
                  Позвонить
                </a>
                <a
                  href={`https://t.me/ritevp?text=${encodeURIComponent("Здравствуйте! Нужно рассчитать стоимость перевозки из Крыма")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors"
                  aria-label="Написать в Telegram"
                >
                  Написать в Telegram
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 bg-gray-50" aria-labelledby="features-heading">
          <div className="container mx-auto max-w-6xl">
            <h2 id="features-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Что обеспечивает комфорт в дальней дороге
            </h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
              Дальняя поездка требует особой подготовки. Мы продумываем каждый этап.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => (
                <article key={f.title} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{f.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 px-4 bg-white" aria-labelledby="how-heading">
          <div className="container mx-auto max-w-4xl">
            <h2 id="how-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Как проходит дальняя перевозка
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {steps.map((s) => (
                <div key={s.num} className="flex gap-5 bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-xl">
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
        <section className="py-16 px-4 bg-white" aria-labelledby="faq-heading">
          <div className="container mx-auto max-w-3xl">
            <h2 id="faq-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
              Частые вопросы о дальних перевозках
            </h2>
            <div className="space-y-4">
              {faqStructuredData.mainEntity.map((item) => (
                <details key={item.name} className="group bg-gray-50 rounded-2xl border border-gray-200 px-6 py-5 cursor-pointer">
                  <summary className="font-semibold text-gray-900 list-none flex justify-between items-center gap-4">
                    {item.name}
                    <span className="text-indigo-600 text-2xl font-light group-open:rotate-45 transition-transform duration-200 select-none flex-shrink-0">+</span>
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
