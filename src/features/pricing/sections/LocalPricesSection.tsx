import Link from "next/link";
import { localPrices } from "../content";

export function LocalPricesSection() {
  return (
    <section className="py-16 px-4 bg-white" aria-labelledby="local-prices-heading">
      <div className="container mx-auto max-w-4xl">
        <h2 id="local-prices-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
          Перевозка по Евпатории и ближайшему району
        </h2>
        <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto">
          Локальные поездки, выезды в больницу, из больницы домой и перевозка инвалидов-колясочников.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm mb-4">
          <table className="w-full text-left">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th scope="col" className="px-5 py-4 font-semibold text-sm">Услуга / Маршрут</th>
                <th scope="col" className="px-5 py-4 font-semibold text-sm">Зона</th>
                <th scope="col" className="px-5 py-4 font-semibold text-sm">Включено</th>
                <th scope="col" className="px-5 py-4 font-semibold text-sm">Стоимость</th>
              </tr>
            </thead>
            <tbody>
              {localPrices.map((row, i) => (
                <tr key={row.service} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-5 py-4 text-gray-900 font-semibold">
                    {row.link ? (
                      <Link href={row.link} className="hover:text-teal-700 transition-colors underline underline-offset-2 decoration-teal-300">
                        {row.service}
                      </Link>
                    ) : row.service}
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-sm">{row.note}</td>
                  <td className="px-5 py-4 text-gray-600 text-sm">{row.includes}</td>
                  <td className="px-5 py-4 text-teal-700 font-bold whitespace-nowrap">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 text-center">
          Цены ориентировочные. Точную стоимость называем после уточнения маршрута.
        </p>
      </div>
    </section>
  );
}
