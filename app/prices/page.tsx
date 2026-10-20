import { serializeJsonLd } from "@/app/lib/serializeJsonLd";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/app/components/sections/Header";
import { Footer } from "@/app/components/sections/Footer";
import { Reviews } from "@/app/components/sections/Reviews";
import { CallToActionSection } from "@/app/components/sections/main/CallToActionSection";
import { SITE_URL, PAGE_URL, crimeaPrices, russiaPrices } from "@/src/features/pricing/content";
import { structuredData, faqStructuredData, breadcrumbData } from "@/src/features/pricing/schema";
import { RoutePriceTable } from "@/src/features/pricing/RoutePriceTable";
import { PricingHeroSection, PricingTrustSection } from "@/src/features/pricing/sections/HeroSection";
import { LocalPricesSection } from "@/src/features/pricing/sections/LocalPricesSection";
import { PricingIncludedSection, PricingFactorsSection, PricingDiscountsSection } from "@/src/features/pricing/sections/PricingDetailsSections";
import { PricingOrderSection } from "@/src/features/pricing/sections/OrderSection";
import { PricingFaqSection, PricingServiceLinksSection } from "@/src/features/pricing/sections/InformationSections";

export const metadata: Metadata = {
  title: "Цены на перевозку лежачих больных и инвалидов | Медтакси Евпатория",
  description:
    "Актуальные тарифы на перевозку лежачих больных и инвалидов в Евпатории, по Крыму и России. Перевозка по Евпатории от 2\u00A0500\u00A0руб., Симферополь от 5\u00A0000\u00A0руб., Москва от 45\u00A0000\u00A0руб. Без скрытых платежей.",
  alternates: { canonical: "/prices" },
  openGraph: {
    title: "Цены на перевозку лежачих больных | Медтакси Евпатория",
    description:
      "Тарифы на медицинскую перевозку: по Евпатории, по Крыму и в Россию. Прозрачное ценообразование без скрытых доплат.",
    type: "website",
    url: PAGE_URL,
    images: [{ url: `${SITE_URL}/peugeot.jpg`, width: 1280, height: 960, alt: "Медтакси Евпатория" }],
  },
};

export default function PricesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbData) }} />

      <Header />

      <main id="main-content">
        {/* Hero */}
        <PricingHeroSection />

        {/* Trust strip */}
        <PricingTrustSection />

        {/* Local prices */}
        <LocalPricesSection />

        {/* Crimea prices */}
        <RoutePriceTable
          rows={crimeaPrices}
          theme="blue"
          headingId="crimea-prices-heading"
          title="Перевозка по Крыму"
          description="Симферополь, Севастополь, Ялта и другие города полуострова. Все направления по одному звонку."
          note="Нужен маршрут, которого нет в списке? Позвоните — рассчитаем за 2 минуты."
        />

        {/* Russia prices */}
        <RoutePriceTable
          rows={russiaPrices}
          theme="indigo"
          headingId="russia-prices-heading"
          title="Междугородние перевозки по России"
          description="Москва, Краснодар, Ростов-на-Дону, Донецк, Воронеж и другие города. Специализированный транспорт, остановки в пути, связь с семьёй."
          note="Везём в любой город России. Ориентировочные тарифы, точная цена — по звонку."
        >
          <div className="mt-8 text-center">
            <Link
              href="/uslugi/mezhdugorodnye-perevozki"
              className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 border border-indigo-200 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-100 transition-colors"
            >
              Подробнее о дальних перевозках →
            </Link>
          </div>
        </RoutePriceTable>

        {/* What's included */}
        <PricingIncludedSection />

        {/* Price factors */}
        <PricingFactorsSection />

        {/* Discounts */}
        <PricingDiscountsSection />

        {/* How to order */}
        <PricingOrderSection />

        {/* FAQ */}
        <PricingFaqSection />

        {/* Reviews */}
        <Reviews />

        {/* Services quick nav */}
        <PricingServiceLinksSection />

        <CallToActionSection />
      </main>

      <Footer />
    </>
  );
}
