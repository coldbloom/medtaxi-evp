import { TrackedPhoneLink } from "@/app/components/tracking/TrackedPhoneLink";
export function IntercityRoutePricing({ routes }: { routes: readonly { from: string; to: string; km: string; price: string }[] }) {
  return (
    <section className="py-16 px-4 bg-white" aria-labelledby="routes-heading">
      <div className="container mx-auto max-w-4xl">
        <h2 id="routes-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          Популярные направления и цены
        </h2>
        <p className="text-center text-gray-500 mb-10">
          Ориентировочные тарифы. Точная стоимость зависит от маршрута и дополнительных услуг.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm mb-8">
          <table className="w-full text-left">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-5 py-4 font-semibold text-sm">Откуда</th>
                <th className="px-5 py-4 font-semibold text-sm">Куда</th>
                <th className="px-5 py-4 font-semibold text-sm">Расстояние</th>
                <th className="px-5 py-4 font-semibold text-sm">Стоимость</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((r, i) => (
                <tr key={r.to} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-5 py-4 text-gray-700 font-medium">{r.from}</td>
                  <td className="px-5 py-4 text-gray-900 font-bold">{r.to}</td>
                  <td className="px-5 py-4 text-gray-500 text-sm">{r.km}</td>
                  <td className="px-5 py-4 text-indigo-700 font-bold whitespace-nowrap">{r.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400 text-center mb-8">
          Не нашли свой маршрут? Звоните — рассчитаем стоимость для любого направления.
        </p>

        <div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Рассчитать стоимость поездки</h3>
          <p className="text-indigo-200 mb-6">Назовите маршрут и состояние пациента — ответим за 2 минуты.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TrackedPhoneLink
              phone="+79789380221"
              trackingId="price_block"
              className="inline-flex items-center justify-center bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-colors shadow-lg"
              aria-label="Позвонить для расчёта"
            >
              Позвонить
            </TrackedPhoneLink>
            <a
              href={`https://t.me/ritevp?text=${encodeURIComponent("Здравствуйте! Нужно рассчитать стоимость перевозки из Крыма")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors"
              aria-label="Написать в Telegram"
            >
              Написать в Telegram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
