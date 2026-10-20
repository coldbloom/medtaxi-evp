import type { ServiceOffer } from "@/app/lib/serviceOffers";
import { TrackedPhoneLink } from "@/app/components/tracking/TrackedPhoneLink";
export function ServiceOfferContent({ offer }: { offer: ServiceOffer }) {
  return (
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
              <TrackedPhoneLink
                phone="+79789380221"
                trackingId="price_block"
                className="mt-4 flex items-center justify-center bg-white text-blue-700 rounded-xl py-3 font-bold text-sm hover:bg-blue-50 transition-colors"
                aria-label="Позвонить"
              >
                Узнать точную цену
              </TrackedPhoneLink>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
