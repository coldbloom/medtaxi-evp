import { serviceOffers, type ServiceOffer } from "@/app/lib/serviceOffers";
import Link from "next/link";
export function RelatedServices({ offer }: { offer: ServiceOffer }) {
  return (
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
  );
}
