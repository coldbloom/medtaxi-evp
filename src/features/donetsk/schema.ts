import { SITE_URL, PAGE_URL, PHONE_HREF, MIN_PRICE, faqItems } from "./content";

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${PAGE_URL}#service`,
  name: "Перевозка лежачих больных в Донецке",
  serviceType: "Перевозка лежачих и маломобильных пациентов",
  description:
    "Специализированная перевозка лежачих больных и маломобильных людей в Донецке и по ДНР.",
  url: PAGE_URL,
  image: `${SITE_URL}/mercedas-optimized.jpg`,
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
    logo: `${SITE_URL}/logo-donetsk.svg`,
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

export const webPageSchema = {
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

export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${PAGE_URL}#breadcrumb`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Перевозка больных в Донецке", item: PAGE_URL },
  ],
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};
