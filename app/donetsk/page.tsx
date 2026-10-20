import { serializeJsonLd } from "@/app/lib/serializeJsonLd";
import type { Metadata, Viewport } from "next";
import { DonetskHeader, DonetskFooter, DonetskMobileActions } from "./components/DonetskLanding";
import { DonetskInteractions } from "./DonetskInteractions";
import { ScrollProgressBar } from "@/app/components/ScrollProgressBar";
import { SITE_URL, PAGE_PATH, PAGE_URL, PHONE_HREF, PHONE_LABEL } from "@/src/features/donetsk/content";
import { serviceSchema, breadcrumbSchema, webPageSchema, faqSchema } from "@/src/features/donetsk/schema";
import styles from "./DonetskMotion.module.css";
import { DonetskHeroSection } from "@/src/features/donetsk/sections/HeroSection";
import { DonetskBenefitsSection, DonetskPriceSection, DonetskSituationsSection, DonetskPatientsSection } from "@/src/features/donetsk/sections/ServiceSections";
import { DonetskTransportSection, DonetskPreparationSection, DonetskStepsSection } from "@/src/features/donetsk/sections/TransportSections";
import { DonetskGeographySection, DonetskFaqSection } from "@/src/features/donetsk/sections/InformationSections";
import { DonetskDiscountsSection, DonetskFinalSection } from "@/src/features/donetsk/sections/ConversionSections";

export const dynamic = "force-static";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10211d",
};

export const metadata: Metadata = {
  title: "Перевозка лежачих больных в Донецке и ДНР 24/7 | Медтакси",
  description:
    `Перевозка лежачих больных в Донецке и по ДНР от 3 500 ₽. Спецтранспорт, носилки, помощь от кровати до кровати. Заказ 24/7: ${PHONE_LABEL}.`,
  authors: [{ name: "Медтакси Донецк" }],
  creator: "Медтакси Донецк",
  publisher: "Медтакси Донецк",
  icons: {
    icon: [
      { url: "/favicon-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon-192x192.png",
  },
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

export default function DonetskPage() {
  return (
    <div className={`${styles.page} min-h-screen bg-[#f4f1e9] text-[#17231f] selection:bg-[#f3b941] selection:text-[#14221e]`}>
      <a href="#main-content" className={styles.skipLink}>Перейти к содержимому</a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }} />

      <DonetskHeader phone={PHONE_HREF} phoneLabel={PHONE_LABEL} />

      {/* Сосед header: sticky ограничен всей страницей, а не высотой шапки. */}
      <ScrollProgressBar color="#f3b941" className="sticky top-0 z-30 bg-[#10211d]" />

      <main id="main-content" tabIndex={-1}>
        <DonetskHeroSection />

        <DonetskBenefitsSection />

        <DonetskPriceSection />

        <DonetskSituationsSection />

        <DonetskPatientsSection />

        <DonetskTransportSection />

        <DonetskPreparationSection />

        <DonetskStepsSection />

        <DonetskGeographySection />

        <DonetskFaqSection />

        <DonetskDiscountsSection />

        <DonetskFinalSection />
      </main>

      <DonetskFooter phone={PHONE_HREF} phoneLabel={PHONE_LABEL} />
      <DonetskMobileActions phone={PHONE_HREF} phoneLabel={PHONE_LABEL} />

      <DonetskInteractions contactPhoneHref={PHONE_HREF} contactPhoneLabel={PHONE_LABEL} />
    </div>
  );
}
