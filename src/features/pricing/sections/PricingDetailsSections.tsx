import { TrackedPhoneLink } from "@/app/components/tracking/TrackedPhoneLink";
import { includedItems, extraItems, priceFactors, discounts } from "../content";

export function PricingIncludedSection() {
  return (
    <section className="py-16 px-4 bg-teal-50" aria-labelledby="included-heading">
      <div className="container mx-auto max-w-6xl">
        <h2 id="included-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          Что входит в стоимость
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
          Базовый тариф покрывает всё необходимое для безопасной поездки. Никаких сюрпризов после.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {includedItems.map((item) => (
            <article key={item.title} className="bg-white rounded-2xl p-6 border border-teal-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
            </article>
          ))}
        </div>

        {/* Extra items */}
        <div className="mt-10 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-800">Что оплачивается дополнительно</h3>
          </div>
          <ul className="divide-y divide-gray-100">
            {extraItems.map((item) => (
              <li key={item.label} className="flex items-center justify-between px-6 py-4">
                <span className="text-gray-700 text-sm">{item.label}</span>
                <span className={`text-sm font-semibold whitespace-nowrap ml-4 ${item.note === "Бесплатно" || item.note === "Включено" ? "text-teal-600" : "text-orange-600"}`}>
                  {item.note}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function PricingFactorsSection() {
  return (
    <section className="py-16 px-4 bg-white" aria-labelledby="factors-heading">
      <div className="container mx-auto max-w-5xl">
        <h2 id="factors-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          Что влияет на итоговую стоимость
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
          Объясняем, почему цена рассчитывается индивидуально — и как получить точную сумму заранее.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {priceFactors.map((f) => (
            <div key={f.title} className="flex gap-5 bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex-shrink-0 text-4xl">{f.icon}</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingDiscountsSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-teal-700 to-blue-800 text-white" aria-labelledby="discounts-heading">
      <div className="container mx-auto max-w-5xl">
        <h2 id="discounts-heading" className="text-2xl md:text-4xl font-bold text-center mb-3">
          Скидки на перевозку
        </h2>
        <p className="text-center text-teal-200 mb-10 max-w-xl mx-auto">
          Мы ценим своих клиентов. Скидки не суммируются — применяется наиболее выгодная.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {discounts.map((d) => (
            <div key={d.label} className="flex items-center gap-4 bg-white rounded-2xl px-5 py-5 shadow-md">
              <div className="flex-shrink-0 w-14 h-14 bg-teal-600 rounded-xl flex items-center justify-center text-2xl shadow-inner">
                {d.icon}
              </div>
              <div className="min-w-0">
                <p className="text-teal-700 font-black text-3xl leading-none mb-1">{d.amount}</p>
                <p className="text-gray-600 text-sm leading-snug">{d.label}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <TrackedPhoneLink
            phone="+79789380221"
            trackingId="discount"
            className="inline-flex items-center justify-center bg-white text-teal-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-50 transition-colors shadow-lg"
            aria-label="Позвонить для уточнения скидок"
          >
            Позвонить и уточнить скидку
          </TrackedPhoneLink>
        </div>
      </div>
    </section>
  );
}
