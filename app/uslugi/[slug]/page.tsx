import { RelatedServices } from "@/src/features/transport/RelatedServices";
import { ServiceOfferContent } from "@/src/features/transport/ServiceOfferContent";
import { ServiceOfferHero } from "@/src/features/transport/ServiceOfferHero";
import { serializeJsonLd } from "@/app/lib/serializeJsonLd";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceOfferBySlug, serviceOffers, SITE_URL } from "@/app/lib/serviceOffers";
import { Header } from "@/app/components/sections/Header";
import { Footer } from "@/app/components/sections/Footer";
import { Reviews } from "@/app/components/sections/Reviews";
import { CallToActionSection } from "@/app/components/sections/main/CallToActionSection";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Only the routes returned below are served; each is prerendered at build time.
export const dynamicParams = false;

export async function generateStaticParams() {
  return serviceOffers.map((offer) => ({ slug: offer.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const offer = getServiceOfferBySlug(slug);

  if (!offer) {
    return { title: "Услуга не найдена | Медтакси Евпатория" };
  }

  const pageUrl = `${SITE_URL}${offer.route}`;

  return {
    title: offer.seoTitle,
    description: offer.seoDescription,
    alternates: { canonical: offer.route },
    openGraph: {
      title: offer.seoTitle,
      description: offer.seoDescription,
      type: "website",
      url: pageUrl,
      images: [{ url: `${SITE_URL}/mercedas-optimized.jpg`, width: 767, height: 656, alt: "Медтакси Евпатория" }],
    },
    twitter: {
      card: "summary_large_image",
      title: offer.seoTitle,
      description: offer.seoDescription,
      images: [`${SITE_URL}/mercedas-optimized.jpg`],
    },
  };
}

export default async function ServiceOfferPage({ params }: PageProps) {
  const { slug } = await params;
  const offer = getServiceOfferBySlug(slug);

  if (!offer) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: offer.name,
    description: offer.description,
    provider: {
      "@type": "MedicalBusiness",
      name: "Медтакси Евпатория",
      telephone: "+79789380221",
      url: SITE_URL,
    },
    areaServed: offer.coverage,
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      price: String(offer.price),
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: offer.price,
        priceCurrency: "RUB",
      },
    },
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Услуги", item: `${SITE_URL}/#services` },
      { "@type": "ListItem", position: 3, name: offer.shortName, item: `${SITE_URL}${offer.route}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbData) }} />

      <Header />

      <main id="main-content">
        {/* Hero */}
        <ServiceOfferHero offer={offer} />

        {/* Trust strip */}
        <section className="py-4 px-4 bg-blue-700 text-white">
          <div className="container mx-auto max-w-5xl">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-1.5 text-sm font-medium text-blue-100">
              {["Работаем 24/7", "Без скрытых доплат", "Бережная погрузка", "Сопровождение в дороге"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-300 flex-shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Main content */}
        <ServiceOfferContent offer={offer} />

        {/* Quick links to other services */}
        <RelatedServices offer={offer} />

        <Reviews />
        <CallToActionSection />
      </main>

      <Footer />
    </>
  );
}
