import type { Metadata } from "next";
import { faqItems } from "./content";
import { mercedesImages } from "./mercedes-images.generated";

export const PAGE_PATH = "/donetsk/moskva";
export const SITE_URL = "https://medtaxi-evp.ru";
export const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const title = "Перевозка лежачих больных Донецк — Москва | Медтакси";
const description = "Перевозка лежачих больных из Донецка в Москву на специализированном автомобиле. Междугородняя транспортировка от кровати до кровати, носилки, помощь при переносе. Расчёт стоимости по телефону.";
const photo = mercedesImages.front;
const image = `${SITE_URL}${photo.webp[photo.webp.length - 1].src}`;

export const routeMetadata: Metadata = {
  title,
  description,
  authors: [{ name: "Медтакси" }],
  creator: "Медтакси",
  publisher: "Медтакси",
  keywords: ["перевозка лежачих больных Донецк Москва", "медицинское такси Донецк Москва", "перевозка лежачего больного из ДНР в Москву"],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title, description, url: PAGE_URL, siteName: "Медтакси", locale: "ru_RU", type: "website",
    images: [{ url: image, width: photo.width, height: photo.height, alt: "Наш Mercedes для перевозки лежачих больных на дальние расстояния" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [image] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export function createRouteSchema(phone: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization", "@id": `${PAGE_URL}#organization`,
        name: "Медтакси", url: SITE_URL, telephone: phone,
        logo: `${SITE_URL}/logo-donetsk.svg`,
      },
      {
        "@type": "Service", "@id": `${PAGE_URL}#service`,
        name: "Перевозка лежачих больных из Донецка в Москву",
        serviceType: "Плановая междугородняя перевозка лежачих и маломобильных пациентов",
        description, url: PAGE_URL, image,
        provider: { "@id": `${PAGE_URL}#organization` },
        areaServed: [
          { "@type": "City", name: "Донецк" },
          { "@type": "AdministrativeArea", name: "ДНР" },
          { "@type": "City", name: "Москва" },
        ],
      },
      {
        "@type": "BreadcrumbList", "@id": `${PAGE_URL}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Донецк", item: `${SITE_URL}/donetsk` },
          { "@type": "ListItem", position: 3, name: "Москва", item: PAGE_URL },
        ],
      },
      {
        "@type": "WebPage", "@id": `${PAGE_URL}#webpage`,
        name: title, description, url: PAGE_URL, inLanguage: "ru-RU",
        about: { "@id": `${PAGE_URL}#service` },
        breadcrumb: { "@id": `${PAGE_URL}#breadcrumbs` },
      },
      {
        "@type": "FAQPage", "@id": `${PAGE_URL}#faq`,
        mainEntity: faqItems.map(({ question, answer }) => ({
          "@type": "Question", name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };
}
