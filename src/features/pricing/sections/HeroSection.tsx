import Link from "next/link";
import { TrackedPhoneLink } from "@/app/components/tracking/TrackedPhoneLink";

export function PricingHeroSection() {
  return (
    <section className="bg-gradient-to-br from-teal-800 to-blue-800 text-white py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap gap-1 text-sm text-teal-200">
            <li><Link href="/" className="hover:text-white transition-colors">Главная</Link></li>
            <li className="select-none">/</li>
            <li className="text-white font-medium">Цены</li>
          </ol>
        </nav>

        <p className="text-teal-200 text-sm font-semibold uppercase tracking-widest mb-3">Медтакси Евпатория</p>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
          Цены на перевозку лежачих больных и инвалидов
        </h1>
        <p className="text-lg md:text-xl text-teal-100 mb-8 max-w-2xl leading-relaxed">
          Прозрачные тарифы без скрытых доплат. Евпатория, Крым и все регионы России.
          Точную стоимость назовём за 2 минуты — позвоните или напишите.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <TrackedPhoneLink
            phone="+79789380221"
            trackingId="hero"
            className="inline-flex items-center justify-center bg-white text-teal-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-50 transition-colors shadow-lg"
            aria-label="Позвонить +79789380221"
          >
            Узнать цену: +7 (978) 938-02-21
          </TrackedPhoneLink>
          <a
            href={`https://t.me/ritevp?text=${encodeURIComponent("Здравствуйте! Хочу узнать стоимость перевозки")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-transparent border-2 border-teal-300 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-colors"
            aria-label="Написать в Telegram"
          >
            Написать в Telegram
          </a>
        </div>

        {/* Quick price summary */}
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { zone: "По Евпатории", price: "от\u00A02\u00A0500\u00A0руб.", icon: "🏙️", sub: "Местные поездки" },
            { zone: "По Крыму", price: "от\u00A05\u00A0000\u00A0руб.", icon: "🗺️", sub: "Межгород в Крыму" },
            { zone: "По России", price: "от\u00A015\u00A0000\u00A0руб.", icon: "🚗", sub: "Дальние маршруты" },
          ].map((item) => (
            <div key={item.zone} className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 shadow-md">
              <div className="flex-shrink-0 w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-2xl">
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide leading-none mb-0.5">{item.zone}</p>
                <p className="text-teal-700 font-black text-lg leading-tight whitespace-nowrap">{item.price}</p>
                <p className="text-gray-400 text-xs mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingTrustSection() {
  return (
    <section className="py-5 px-4 bg-teal-700 text-white">
      <div className="container mx-auto max-w-4xl">
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium text-teal-100">
          {["Без скрытых доплат", "Цена фиксируется до выезда", "Работаем 24/7", "Скидки постоянным клиентам"].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-300 flex-shrink-0" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
