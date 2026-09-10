import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { CodeCake } from "@/app/components/CodeCake";
import { DonetskContactModal, DonetskContactTrigger } from "./DonetskContactTrigger";
import { DonetskPhoneLink } from "./DonetskPhoneLink";

export const dynamic = "force-static";

const SITE_URL = "https://medtaxi-evp.ru";
const PAGE_PATH = "/donetsk";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PHONE_HREF = "+79895052785";
const PHONE_LABEL = "+7 (989) 505-27-85";
const MIN_PRICE = 3500;
const MIN_PRICE_LABEL = "3 500 ₽";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10211d",
};

export const metadata: Metadata = {
  title: "Перевозка лежачих больных в Донецке и ДНР 24/7 | Медтакси",
  description:
    "Перевозка лежачих больных в Донецке и по ДНР от 3 500 ₽. Спецтранспорт, носилки, помощь от кровати до кровати. Заказ 24/7: +7 989 505-27-85.",
  authors: [{ name: "Медтакси Донецк" }],
  creator: "Медтакси Донецк",
  publisher: "Медтакси Донецк",
  keywords: [
    "перевозка лежачих больных Донецк",
    "перевозка больных ДНР",
    "медтакси Донецк",
    "санитарная перевозка Донецк",
    "перевозка инвалидов Донецк",
    "перевозка больного из больницы домой Донецк",
    "транспортировка лежачих больных ДНР",
    "перевозка лежачих больных Донецк цена",
    "медицинское такси Донецк цена",
  ],
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: "Перевозка лежачих больных в Донецке и по ДНР 24/7",
    description:
      "Специализированный транспорт, помощь от кровати до кровати. Минимальная стоимость подачи — 3 500 ₽. Работаем круглосуточно.",
    url: PAGE_URL,
    siteName: "Медтакси",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/mercedas-optimized.jpg`,
        width: 767,
        height: 656,
        alt: "Специализированный автомобиль Mercedes для перевозки лежачих больных",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Перевозка лежачих больных в Донецке и ДНР 24/7",
    description: "Медтакси в Донецке: перевозка от кровати до кровати, подача от 3 500 ₽.",
    images: [`${SITE_URL}/mercedas-optimized.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.placename": "Донецк",
    "geo.position": "48.0159;37.8029",
    ICBM: "48.0159, 37.8029",
  },
};

const situations = [
  {
    number: "01",
    title: "Из больницы домой",
    text: "Встретим после выписки, аккуратно переместим пациента на носилки и доставим до кровати по указанному адресу.",
  },
  {
    number: "02",
    title: "На обследование",
    text: "Организуем поездку в клинику, на МРТ, КТ, консультацию или процедуру с ожиданием и обратной доставкой по договорённости.",
  },
  {
    number: "03",
    title: "В другой город",
    text: "Перевезём пациента между городами ДНР и по дальнему маршруту. Заранее согласуем остановки и особенности поездки.",
  },
  {
    number: "04",
    title: "В пансионат или на реабилитацию",
    text: "Поможем добраться в пансионат, реабилитационный центр или домой после лечения — от адреса до адреса.",
  },
];

const patientTypes = [
  {
    title: "После операции",
    text: "Доставим из стационара домой, на контрольный осмотр или реабилитацию в согласованном положении.",
  },
  {
    title: "После переломов и травм",
    text: "Организуем поездку, когда пациенту трудно сидеть, вставать или пользоваться обычным автомобилем.",
  },
  {
    title: "Пожилые люди",
    text: "Поможем пройти путь от кровати до автомобиля и бережно сопроводим до места назначения.",
  },
  {
    title: "Инвалиды-колясочники",
    text: "Заранее уточним особенности кресла, подъезда и пересаживания, чтобы подготовить поездку.",
  },
  {
    title: "Лежачие пациенты",
    text: "Перевезём на носилках или каталке с фиксацией в салоне специализированного автомобиля.",
  },
  {
    title: "Маломобильные пассажиры",
    text: "Подберём формат сопровождения для человека, которому сложно самостоятельно спуститься и сесть в машину.",
  },
];

const steps = [
  {
    title: "Расскажите о поездке",
    text: "Назовите адреса, желаемое время, этажи и состояние пациента.",
  },
  {
    title: "Получите точный расчёт",
    text: "Подберём формат перевозки и согласуем стоимость до выезда.",
  },
  {
    title: "Встретьте экипаж",
    text: "Приедем к назначенному времени и поможем безопасно переместить пациента.",
  },
  {
    title: "Доставим до места",
    text: "Сопроводим в дороге и передадим пациента близким или сотрудникам учреждения.",
  },
];

const faqItems = [
  {
    question: "Сколько стоит перевозка лежачего больного в Донецке?",
    answer:
      "Минимальная стоимость подачи специализированного автомобиля — 3 500 рублей. Итоговая цена зависит от адресов, расстояния, этажей, наличия лифта, веса и состояния пациента. Позвоните по номеру +7 (989) 505-27-85 — уточним детали и назовём полную стоимость до выезда.",
  },
  {
    question: "Работаете ли вы ночью и в выходные?",
    answer:
      "Да, заявки на перевозку в Донецке и по ДНР принимаем круглосуточно. Плановую поездку лучше согласовать заранее, чтобы закрепить удобное время.",
  },
  {
    question: "Поможете спустить и поднять пациента?",
    answer:
      "Да. При оформлении заявки сообщите этаж, наличие и размер лифта, вес пациента и особенности подъезда. Это поможет заранее определить необходимое число сопровождающих и оборудование.",
  },
  {
    question: "Можно ли ехать родственнику вместе с пациентом?",
    answer:
      "Как правило, да. Возможность и число сопровождающих согласуем при заказе с учётом маршрута и комплектации автомобиля.",
  },
  {
    question: "Что нужно сообщить диспетчеру для расчёта стоимости?",
    answer:
      "Назовите адрес отправления и назначения, дату и время поездки, этажи, наличие и размер лифта, примерный вес и состояние пациента. Также сообщите, сможет ли пациент сидеть и требуется ли помощь при переносе.",
  },
  {
    question: "Выезжаете ли вы из Донецка в другие города?",
    answer:
      "Да, по предварительному согласованию организуем перевозки по ДНР и междугородние поездки, в том числе в Макеевку, Харцызск, Иловайск, Ясиноватую и по дальним направлениям.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${PAGE_URL}#service`,
  name: "Перевозка лежачих больных в Донецке",
  serviceType: "Перевозка лежачих и маломобильных пациентов",
  description:
    "Специализированная перевозка лежачих больных и маломобильных людей в Донецке и по ДНР.",
  url: PAGE_URL,
  image: `${SITE_URL}/mercedas-optimized.jpg`,
  telephone: PHONE_HREF,
  areaServed: [
    { "@type": "City", name: "Донецк" },
    { "@type": "City", name: "Макеевка" },
    { "@type": "AdministrativeArea", name: "ДНР" },
  ],
  provider: {
    "@type": "Organization",
    "@id": `${PAGE_URL}#organization`,
    name: "Медтакси Донецк",
    url: PAGE_URL,
    telephone: PHONE_HREF,
    image: `${SITE_URL}/mercedas-optimized.jpg`,
    logo: `${SITE_URL}/logo.svg`,
  },
  offers: {
    "@type": "Offer",
    price: String(MIN_PRICE),
    priceCurrency: "RUB",
    description: "Минимальная стоимость подачи специализированного автомобиля в Донецке",
    availability: "https://schema.org/InStock",
  },
  hoursAvailable: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: "Перевозка лежачих больных в Донецке и ДНР 24/7",
  description:
    "Перевозка лежачих и маломобильных пациентов в Донецке и по ДНР на специализированном транспорте.",
  inLanguage: "ru-RU",
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${SITE_URL}/mercedas-optimized.jpg`,
    width: 767,
    height: 656,
  },
  breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
  mainEntity: { "@id": `${PAGE_URL}#service` },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${PAGE_URL}#breadcrumb`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Перевозка больных в Донецке", item: PAGE_URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const buttonPrimary =
  "min-h-14 rounded-full bg-[#f3b941] px-7 py-3.5 text-center text-base font-extrabold text-[#14221e] shadow-[0_16px_35px_rgba(243,185,65,0.22)] transition hover:-translate-y-0.5 hover:bg-[#ffd06d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3b941]";
const buttonSecondary =
  "inline-flex min-h-14 items-center justify-center rounded-full border border-white/25 bg-white/8 px-7 py-3.5 text-center text-base font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/14 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export default function DonetskPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f4f1e9] pb-[65px] text-[#17231f] selection:bg-[#f3b941] selection:text-[#14221e] md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="relative z-30 border-b border-white/10 bg-[#10211d] text-white">
        <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href={PAGE_PATH} className="group flex items-center gap-3" aria-label="Медтакси Донецк — главная страница">
            <span className="grid size-11 place-items-center rounded-2xl bg-[#f3b941] text-[#10211d] shadow-lg shadow-black/10" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 3v18M3 12h18" strokeLinecap="round" />
              </svg>
            </span>
            <span>
              <span className="block text-base font-black leading-tight tracking-tight">Медтакси</span>
              <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#bdd0c8]">Донецк · ДНР</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#dce8e3] md:flex" aria-label="Навигация по странице">
            <a href="#price" className="transition hover:text-[#f3b941]">Стоимость</a>
            <a href="#services" className="transition hover:text-[#f3b941]">Когда поможем</a>
            <a href="#transport" className="transition hover:text-[#f3b941]">Транспорт</a>
            <a href="#faq" className="transition hover:text-[#f3b941]">Вопросы</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <DonetskPhoneLink href={`tel:${PHONE_HREF}`} ctaPosition="header" className="rounded-full border border-white/15 bg-white/8 px-3 py-2 text-sm font-extrabold transition hover:bg-white/14 sm:px-5" aria-label={`Позвонить ${PHONE_LABEL}`}>
              <span className="sm:hidden">Позвонить</span>
              <span className="hidden sm:inline">{PHONE_LABEL}</span>
            </DonetskPhoneLink>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="relative isolate bg-[#10211d] text-white">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div className="absolute -left-24 top-24 size-80 rounded-full bg-[#2d6959]/30 blur-3xl" />
            <div className="absolute -right-32 bottom-0 size-96 rounded-full bg-[#a9712a]/20 blur-3xl" />
            <div className="absolute inset-0 opacity-[0.055] [background-image:radial-gradient(circle_at_center,#fff_1px,transparent_1px)] [background-size:22px_22px]" />
          </div>

          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-14 pt-8 sm:px-6 md:pb-20 md:pt-12 lg:grid-cols-[1.03fr_.97fr] lg:px-8 lg:py-20">
            <div>
              <nav aria-label="Хлебные крошки" className="mb-7 text-sm text-[#a9c1b7]">
                <ol className="flex flex-wrap items-center gap-2">
                  <li><Link href="/" className="hover:text-white">Главная</Link></li>
                  <li aria-hidden="true">/</li>
                  <li className="text-white">Донецк</li>
                </ol>
              </nav>

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f3b941]/35 bg-[#f3b941]/10 px-4 py-2 text-sm font-bold text-[#ffd476]">
                <span className="size-2 rounded-full bg-[#f3b941] shadow-[0_0_0_5px_rgba(243,185,65,.12)]" />
                Принимаем заявки круглосуточно
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-[4.15rem]">
                Перевозка лежачих больных <span className="text-[#f3b941]">в Донецке</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#cfddd7] sm:text-xl">
                Бережно перевозим лежачих и маломобильных людей по Донецку, ДНР и между городами — на специализированном транспорте, от кровати до кровати.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <DonetskPhoneLink href={`tel:${PHONE_HREF}`} ctaPosition="hero" className={buttonPrimary} aria-label={`Позвонить ${PHONE_LABEL}`}>
                  Позвонить&nbsp;<span className="whitespace-nowrap">{PHONE_LABEL}</span>
                </DonetskPhoneLink>
                <DonetskContactTrigger className={buttonSecondary} ctaPosition="hero" />
              </div>

              <ul className="mt-9 grid max-w-2xl gap-3 text-sm font-semibold text-[#d8e5df] sm:grid-cols-3" role="list">
                {["Заявки 24/7", "От кровати до кровати", `Цена до выезда`].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="grid size-5 place-items-center rounded-full bg-[#39715f] text-xs text-white" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-[610px] lg:mx-0">
              <div className="absolute z-10 -left-5 -top-5 hidden rounded-3xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-xl sm:block">
                <p className="text-2xl font-black text-[#f3b941]">24/7</p>
              </div>
              <div className="relative aspect-[1.08/1] overflow-hidden rounded-[2rem] border border-white/10 bg-[#20332c] shadow-[0_35px_80px_rgba(0,0,0,.35)] sm:rounded-[2.5rem]">
                <Image
                  src="/mercedas-optimized.jpg"
                  alt="Специализированный автомобиль Mercedes для перевозки лежачих больных в Донецке"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10211d]/65 via-transparent to-transparent" />
                <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-[#10211d]/80 p-4 backdrop-blur-md sm:inset-x-7 sm:bottom-7 sm:p-5 max-[500px]:hidden">
                  <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#f3b941]">Mercedes · спецтранспорт</p>
                  <p className="mt-1 text-sm text-[#e0ebe6]">Для плановых перевозок стабильных пациентов</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#dcd7cc] bg-[#f4f1e9]" aria-label="Преимущества услуги">
          <div className="mx-auto grid max-w-7xl divide-y divide-[#dcd7cc] px-4 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:px-6 lg:grid-cols-4 lg:px-8">
            {[
              ["Бережная погрузка", "Помогаем переместить пациента"],
              ["Носилки и фиксация", "Учитываем состояние человека"],
              ["Комфортный салон", "Место для сопровождающего"],
              ["Понятная стоимость", "Согласуем до подачи машины"],
            ].map(([title, text]) => (
              <div key={title} className="px-0 py-6 sm:px-6 lg:py-8">
                <p className="font-extrabold text-[#173d32]">{title}</p>
                <p className="mt-1 text-sm text-[#65716c]">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="price" className="bg-[#fbfaf6] px-4 py-20 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="price-heading">
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-[#d8d2c6] bg-white shadow-[0_24px_60px_rgba(52,62,57,.08)] lg:grid-cols-[.82fr_1.18fr]">
            <div className="bg-[#f3b941] p-7 text-[#142b24] sm:p-10 lg:p-12">
              <p className="text-sm font-black uppercase tracking-[0.18em] opacity-65">Стоимость перевозки в Донецке</p>
              <h2 id="price-heading" className="mt-5 text-3xl font-black tracking-[-0.04em] sm:text-5xl">
                Подача автомобиля от <span className="whitespace-nowrap">{MIN_PRICE_LABEL}</span>
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-[#35443f]">
                Минимальная стоимость относится к подаче специализированного автомобиля. Полную цену поездки назовём после уточнения деталей и зафиксируем до выезда.
              </p>
            </div>

            <div className="p-7 sm:p-10 lg:p-12">
              <h3 className="text-2xl font-black tracking-tight text-[#173d32]">Что влияет на итоговый расчёт</h3>
              <ul className="mt-7 grid gap-4 sm:grid-cols-2" role="list">
                {["Адреса и расстояние", "Этажи и наличие лифта", "Вес и состояние пациента", "Необходимая помощь при переносе", "Ожидание и обратная поездка", "Междугородний маршрут"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#56635d]">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#dfe9e4] text-xs font-black text-[#245445]" aria-hidden="true">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <DonetskPhoneLink
                  href={`tel:${PHONE_HREF}`}
                  ctaPosition="price"
                  className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#173d32] px-7 py-3.5 text-center font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#245445]"
                  aria-label={`Узнать точную стоимость по телефону ${PHONE_LABEL}`}
                >
                  Узнать точную стоимость
                </DonetskPhoneLink>
                <DonetskContactTrigger
                  className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#aebbb5] px-7 py-3.5 text-center font-bold text-[#173d32] transition hover:-translate-y-0.5 hover:bg-[#eef3f0]"
                  label="Заказать звонок"
                  ctaPosition="price"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-7 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#a66a1e]">Когда мы нужны</p>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-[#142b24] sm:text-5xl">Когда нужна перевозка лежачего больного в Донецке</h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-[#59645f] lg:justify-self-end">
                Каждую поездку планируем индивидуально: уточняем состояние пациента, особенности дома и пункта назначения, выбираем подходящее оборудование.
              </p>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {situations.map((item) => (
                <article key={item.number} className="group rounded-[1.75rem] border border-[#d8d2c6] bg-[#fbfaf6] p-6 transition hover:-translate-y-1 hover:border-[#c69a50] hover:shadow-[0_20px_45px_rgba(52,62,57,.08)] sm:p-8">
                  <div className="flex items-start justify-between gap-5">
                    <h3 className="text-2xl font-black tracking-tight text-[#173d32]">{item.title}</h3>
                    <span className="text-sm font-black text-[#b47725]">{item.number}</span>
                  </div>
                  <p className="mt-5 leading-relaxed text-[#66706b]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#d8d2c6] bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="patients-heading">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-7 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#a66a1e]">Каких пациентов перевозим</p>
                <h2 id="patients-heading" className="mt-4 text-3xl font-black tracking-[-0.035em] text-[#142b24] sm:text-5xl">
                  Перевозим лежачих и маломобильных пациентов
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-[#59645f] lg:justify-self-end">
                Организуем перевозку людей после операций, травм и лечения, пожилых и маломобильных пассажиров, инвалидов-колясочников и пациентов, которым сложно самостоятельно добраться до автомобиля.
              </p>
            </div>

            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
              {patientTypes.map((patient, index) => (
                <li key={patient.title} className="rounded-[1.5rem] border border-[#d8d2c6] bg-[#fbfaf6] p-6 transition hover:-translate-y-1 hover:border-[#c69a50] hover:shadow-[0_18px_40px_rgba(52,62,57,.08)]">
                  <div className="flex items-center gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#dfe9e4] text-sm font-black text-[#245445]" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-black tracking-tight text-[#173d32]">{patient.title}</h3>
                  </div>
                  <p className="mt-5 leading-relaxed text-[#66706b]">{patient.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="transport" className="bg-[#dfe9e4] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative">
              <div className="absolute -bottom-5 -right-5 size-full rounded-[2rem] border border-[#759388]/35" aria-hidden="true" />
              <div className="relative aspect-[1.2/1] overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_70px_rgba(20,43,36,.14)]">
                <Image
                  src="/inside.jpg"
                  alt="Салон медицинского автомобиля с каталкой для перевозки лежачего пациента"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="lg:pl-10">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#6e4b19]">Внутри автомобиля</p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-[#142b24] sm:text-5xl">Специализированный транспорт для перевозки лежачих больных</h2>
              <p className="mt-6 text-lg leading-relaxed text-[#4f6059]">
                Салон подготовлен для перевозки лежачего пациента. Каталка фиксируется в автомобиле, а размещение оборудования и сопровождающего продумывается до начала маршрута.
              </p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2" role="list">
                {["Регулируемая каталка", "Мягкие и кресельные носилки", "Фиксаторы для поездки", "Место для близкого человека", "Климат в салоне", "Остановки по согласованию"].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-bold text-[#173d32]">
                    <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-[#2f6757] text-[11px] text-white" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-7 rounded-2xl border border-[#8ba49a]/50 bg-white/45 p-4 text-sm leading-relaxed text-[#53625c]">
                Услуга не заменяет скорую помощь. Возможность перевозки пациента в тяжёлом или нестабильном состоянии необходимо заранее согласовать с лечащим врачом.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#fbfaf6] px-4 py-20 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="preparation-heading">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#a66a1e]">Подготовка к заказу</p>
              <h2 id="preparation-heading" className="mt-4 text-3xl font-black tracking-[-0.035em] text-[#142b24] sm:text-5xl">
                Что сообщить диспетчеру
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[#59645f]">
                Эти сведения помогут сразу подобрать транспорт, оборудование и необходимое число сопровождающих, а также точнее рассчитать стоимость.
              </p>
            </div>

            <ol className="grid gap-4 sm:grid-cols-2">
              {[
                ["Маршрут и время", "Адрес отправления, пункт назначения, дату и удобное время."],
                ["Состояние пациента", "Может ли человек сидеть, требуется ли перевозка только лёжа."],
                ["Этажи и лифт", "Этажи по обоим адресам, наличие и примерный размер лифта."],
                ["Вес и перенос", "Примерный вес пациента и нужна ли помощь от кровати до автомобиля."],
              ].map(([title, text], index) => (
                <li key={title} className="rounded-2xl border border-[#ddd7cc] bg-white p-6">
                  <span className="text-sm font-black text-[#b47725]">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 text-xl font-black text-[#173d32]">{title}</h3>
                  <p className="mt-2 leading-relaxed text-[#65716c]">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="how" className="bg-[#153b30] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#f3b941]">Четыре шага</p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] sm:text-5xl">Как заказать перевозку в Донецке</h2>
              <p className="mt-5 text-lg leading-relaxed text-[#c6d8d1]">Без сложных анкет и ожидания: основные детали уточним в одном разговоре.</p>
            </div>

            <ol className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <li key={step.title} className="bg-[#153b30] p-7 sm:p-8">
                  <span className="text-4xl font-black text-[#f3b941]">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-8 text-xl font-black">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#b9cec6]">{step.text}</p>
                </li>
              ))}
            </ol>

            <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-[#f3b941] p-7 text-[#142b24] sm:flex-row sm:items-center sm:p-9">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] opacity-65">Диспетчер на связи 24/7</p>
                <p className="mt-2 text-2xl font-black sm:text-3xl">Обсудим маршрут и назовём стоимость</p>
              </div>
              <DonetskPhoneLink href={`tel:${PHONE_HREF}`} ctaPosition="how" className="shrink-0 rounded-full bg-[#142b24] px-7 py-4 text-center text-lg font-black text-white transition hover:-translate-y-0.5 hover:bg-[#204a3e]" aria-label={`Позвонить ${PHONE_LABEL}`}>
                {PHONE_LABEL}
              </DonetskPhoneLink>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28" aria-labelledby="geography-heading">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#a66a1e]">География</p>
              <h2 id="geography-heading" className="mt-4 text-3xl font-black tracking-[-0.035em] text-[#142b24] sm:text-5xl">Перевозка больных по Донецку, ДНР и между городами</h2>
              <p className="mt-6 text-lg leading-relaxed text-[#59645f]">
                Забираем из дома, больницы, пансионата или реабилитационного центра. Конечным пунктом может быть любой адрес, доступный для согласованного маршрута.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#d8d2c6] bg-[#fbfaf6] p-6 sm:p-9">
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="text-lg font-black text-[#173d32]">По городу и рядом</h3>
                  <ul className="mt-4 space-y-3 text-[#65716c]">
                    {["Донецк", "Макеевка", "Ясиноватая", "Харцызск", "Иловайск"].map((city) => <li key={city}>— {city}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#173d32]">Популярные задачи</h3>
                  <ul className="mt-4 space-y-3 text-[#65716c]">
                    <li>— Дом — больница</li>
                    <li>— Больница — дом</li>
                    <li>— Донецк — города ДНР</li>
                    <li>— Донецк — Крым</li>
                    <li>— Дальние поездки по РФ</li>
                  </ul>
                </div>
              </div>
              <p className="mt-8 border-t border-[#dfd9cf] pt-6 text-sm leading-relaxed text-[#707a75]">Маршрут, время выезда и возможность поездки по конкретному направлению подтверждаем при обращении с учётом актуальной дорожной обстановки.</p>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-[#ebe6db] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#a66a1e]">Коротко о главном</p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-[#142b24] sm:text-5xl">Частые вопросы</h2>
              <p className="mt-5 text-[#636e69]">Не нашли ответ? Позвоните — спокойно разберём вашу ситуацию.</p>
            </div>

            <div className="space-y-3">
              {faqItems.map((item, index) => (
                <details key={item.question} className="group rounded-2xl border border-[#d5cec1] bg-[#f8f6f0] px-5 py-1 open:shadow-sm sm:px-7" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-lg font-black text-[#173d32] marker:hidden">
                    {item.question}
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#e2ddd2] text-xl font-normal transition group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="max-w-3xl pb-6 pr-10 leading-relaxed text-[#626d68]">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          id="discounts"
          className="relative overflow-hidden bg-[#f4f1e9] px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
          aria-labelledby="discounts-heading"
        >
          <div className="pointer-events-none absolute -left-32 top-10 size-80 rounded-full bg-[#f3b941]/15 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-[#39715f]/12 blur-3xl" aria-hidden="true" />

          <div className="relative mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-[2rem] bg-[#153b30] text-white shadow-[0_30px_80px_rgba(20,43,36,.16)] sm:rounded-[2.5rem]">
              <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[.58fr_1fr] lg:items-center lg:gap-14 lg:p-14">
                <div>
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#f3b941]/30 bg-[#f3b941]/10 px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-[#ffd476]">
                    Социальная скидка
                  </div>
                  <p className="mt-7 text-[5.5rem] font-black leading-none tracking-[-0.07em] text-[#f3b941] sm:text-[7.5rem]">
                    15<span className="text-[.48em] align-top">%</span>
                  </p>
                </div>

                <div>
                  <h2 id="discounts-heading" className="mt-5 text-3xl font-black tracking-[-0.035em] sm:text-4xl">
                    Для пенсионеров и ветеранов СВО
                  </h2>
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#c6d8d1]">
                    Предоставляем скидку на услуги перевозки лежачих и маломобильных пациентов в Донецке и по согласованным направлениям.
                  </p>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#a9c1b7]">
                    Сообщите о праве на скидку диспетчеру при оформлении заявки. Условия и итоговую стоимость согласуем до выезда.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <DonetskPhoneLink
                      href={`tel:${PHONE_HREF}`}
                      ctaPosition="discount"
                      className={buttonPrimary}
                      aria-label={`Узнать о скидке по телефону ${PHONE_LABEL}`}
                    >
                      Узнать&nbsp;условия{' '}<span className="whitespace-nowrap">{PHONE_LABEL}</span>
                    </DonetskPhoneLink>
                    <DonetskContactTrigger className={buttonSecondary} label="Оставить заявку" ctaPosition="discount" />
                  </div>
                </div>
              </div>

              <div className="grid bg-[#10211d] sm:grid-cols-2">
                <figure className="group relative aspect-[16/10] overflow-hidden sm:aspect-[16/9]">
                  <Image
                    src="/pens.jpg"
                    alt="Пенсионер — скидка на перевозку лежачих больных в Донецке"
                    fill
                    className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10211d]/90 via-[#10211d]/10 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                    <p className="text-xl font-black">Пенсионерам</p>
                    <p className="mt-1 text-sm text-white/75">Скидка 15% на перевозку</p>
                  </figcaption>
                </figure>

                <figure className="group relative aspect-[16/10] overflow-hidden sm:aspect-[16/9]">
                  <Image
                    src="/svo.jpeg"
                    alt="Военнослужащие — иллюстрация скидки для ветеранов СВО"
                    fill
                    className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10211d]/90 via-[#10211d]/15 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                    <p className="text-xl font-black">Ветеранам СВО</p>
                    <p className="mt-1 text-sm text-white/75">Скидка 15% на перевозку</p>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#10211d] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#f3b941]">Мы рядом</p>
            <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black tracking-[-0.04em] sm:text-6xl">Организуем бережную перевозку вашего близкого</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#c8d8d2]">Позвоните или оставьте номер. Уточним детали, предложим подходящий вариант и заранее согласуем стоимость.</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <DonetskPhoneLink href={`tel:${PHONE_HREF}`} ctaPosition="final" className={buttonPrimary} aria-label={`Позвонить ${PHONE_LABEL}`}>{PHONE_LABEL}</DonetskPhoneLink>
              <DonetskContactTrigger className={buttonSecondary} label="Оставить заявку" ctaPosition="final" />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#0c1916] px-4 py-10 text-[#b9c9c3] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="font-black text-white">Медтакси · Донецк</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed">Перевозка лежачих больных и маломобильных людей в Донецке, по ДНР и между городами.</p>
            <Link href="/" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-[#f3b941]">
              <span aria-hidden="true">←</span> Вернуться на главную
            </Link>
          </div>
          <div className="sm:text-right">
            <DonetskPhoneLink href={`tel:${PHONE_HREF}`} ctaPosition="footer" className="text-lg font-black text-[#f3b941] hover:text-[#ffd06d]">{PHONE_LABEL}</DonetskPhoneLink>
            <p className="mt-1 text-sm">Приём заявок круглосуточно</p>
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-7 border-t border-white/10 pt-6 text-xs text-[#7f938b] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Медтакси Донецк. Информация на странице не является медицинской консультацией.</p>
          <div className="shrink-0 opacity-70 transition hover:opacity-100 flex justify-center">
            <CodeCake />
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#d7d1c5] bg-[#fbfaf6]/95 px-3 py-2 shadow-[0_-12px_35px_rgba(20,43,36,.16)] backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-[1.15fr_.85fr] gap-2">
          <DonetskPhoneLink
            href={`tel:${PHONE_HREF}`}
            ctaPosition="mobile_sticky"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f3b941] px-4 text-center text-sm font-black text-[#14221e]"
            aria-label={`Позвонить ${PHONE_LABEL}`}
          >
            Позвонить сейчас
          </DonetskPhoneLink>
          <DonetskContactTrigger
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#173d32] px-4 text-center text-sm font-bold text-white"
            label="Заказать звонок"
            ctaPosition="mobile_sticky"
          />
        </div>
      </div>

      <DonetskContactModal />
    </div>
  );
}
