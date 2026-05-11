import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceOfferBySlug, serviceOffers, SITE_URL } from "@/app/lib/serviceOffers";
import { Header } from "@/app/components/sections/Header";
import { Footer } from "@/app/components/sections/Footer";
import { Reviews } from "@/app/components/sections/Reviews";
import { CallToActionSection } from "@/app/components/sections/main/CallToActionSection";

type PageProps = {
  params: Promise<{ slug: string }>;
};

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
      images: [{ url: `${SITE_URL}/mercedas-optimized.jpg`, width: 1200, height: 630, alt: "Медтакси Евпатория" }],
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
      { "@type": "ListItem", position: 2, name: "Услуги", item: `${SITE_URL}/uslugi` },
      { "@type": "ListItem", position: 3, name: offer.shortName, item: `${SITE_URL}${offer.route}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />

      <Header />

      <main id="main-content">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white">
          <div className="container mx-auto max-w-5xl px-4 py-16 md:py-20">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap gap-1 text-sm text-blue-200">
                <li><Link href="/" className="hover:text-white transition-colors">Главная</Link></li>
                <li className="select-none">/</li>
                <li><Link href="/#services" className="hover:text-white transition-colors">Услуги</Link></li>
                <li className="select-none">/</li>
                <li className="text-white font-medium">{offer.shortName}</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <div>
                <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-3">
                  Медтакси Евпатория
                </p>
                <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-5">
                  {offer.name}
                </h1>
                <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                  {offer.description}
                </p>

                {/* Price badge */}
                <div className="inline-flex items-center gap-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-2xl px-5 py-3 mb-8">
                  <span className="text-blue-800 text-sm font-medium">Стоимость:</span>
                  <span className="text-blue-800 font-bold text-xl">{offer.priceNote}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:+79789380221"
                    className="inline-flex items-center justify-center bg-white text-blue-800 px-7 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
                    aria-label="Позвонить +79789380221"
                  >
                    Позвонить: +7 (978) 938-02-21
                  </a>
                  <a
                    href={`https://t.me/ritevp?text=${encodeURIComponent(`Здравствуйте! Нужна услуга: ${offer.shortName}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-transparent border-2 border-blue-300 text-white px-7 py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition-colors"
                    aria-label="Написать в Telegram"
                  >
                    Telegram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

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
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <div className="grid lg:grid-cols-3 gap-10">

              {/* Left: h2 blocks */}
              <div className="lg:col-span-2 space-y-8">
                {offer.h2Blocks.map((block) => (
                  <article key={block.title} className="border-l-4 border-blue-500 pl-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{block.title}</h2>
                    <p className="text-gray-600 leading-relaxed">{block.text}</p>
                  </article>
                ))}
              </div>

              {/* Right: sidebar */}
              <aside className="space-y-5">
                {/* Coverage */}
                <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                  <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-2">Зона обслуживания</p>
                  <p className="text-gray-800 text-sm leading-relaxed">{offer.coverage}</p>
                </div>

                {/* Popular routes */}
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Популярные маршруты</p>
                  <ul className="space-y-2">
                    {offer.popularRoutes.map((route) => (
                      <li key={route} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1 w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                        {route}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-white">
                  <p className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">Стоимость</p>
                  <p className="text-2xl font-black mb-1">{offer.priceNote}</p>
                  <p className="text-blue-100 text-xs">Точную цену называем до выезда</p>
                  <a
                    href="tel:+79789380221"
                    className="mt-4 flex items-center justify-center bg-white text-blue-700 rounded-xl py-3 font-bold text-sm hover:bg-blue-50 transition-colors"
                    aria-label="Позвонить"
                  >
                    Узнать точную цену
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Quick links to other services */}
        <section className="py-12 px-4 bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Другие услуги</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {serviceOffers
                .filter((s) => s.slug !== offer.slug)
                .slice(0, 6)
                .map((s) => (
                  <Link
                    key={s.slug}
                    href={s.route}
                    className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm leading-snug">{s.shortName}</p>
                      <p className="text-blue-600 text-xs mt-0.5">{s.priceNote}</p>
                    </div>
                  </Link>
                ))}
            </div>

            <div className="mt-6 text-center flex flex-wrap justify-center gap-3">
              <Link href="/" className="text-sm text-blue-600 font-semibold hover:underline">← На главную</Link>
              <Link href="/prices" className="text-sm text-blue-600 font-semibold hover:underline">Все цены</Link>
              <Link href="/contacts" className="text-sm text-blue-600 font-semibold hover:underline">Контакты</Link>
            </div>
          </div>
        </section>

        <Reviews />
        <CallToActionSection />
      </main>

      <Footer />
    </>
  );
}
