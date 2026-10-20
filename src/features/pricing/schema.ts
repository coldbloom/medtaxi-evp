import { SITE_URL, PAGE_URL } from "./content";

export const structuredData = {
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

export const faqStructuredData = {
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

export const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Цены", item: PAGE_URL },
  ],
};
