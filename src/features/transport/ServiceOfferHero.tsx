import type { ServiceOffer } from "@/app/lib/serviceOffers";
import Link from "next/link";
import { TrackedPhoneLink } from "@/app/components/tracking/TrackedPhoneLink";
export function ServiceOfferHero({ offer }: { offer: ServiceOffer }) {
  return (
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
              <TrackedPhoneLink
                phone="+79789380221"
                trackingId="hero"
                className="inline-flex items-center justify-center bg-white text-blue-800 px-7 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
                aria-label="Позвонить +79789380221"
              >
                Позвонить: +7 (978) 938-02-21
              </TrackedPhoneLink>
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
  );
}
