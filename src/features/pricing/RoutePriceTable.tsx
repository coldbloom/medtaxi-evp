import type { ReactNode } from "react";
import Link from "next/link";

type RoutePrice = {
  route: string;
  price: string;
  km: string;
  link: string | null;
};

const themes = {
  blue: {
    background: "bg-gray-50",
    heading: "bg-blue-600",
    link: "hover:text-blue-700 decoration-blue-300",
    price: "text-blue-700",
  },
  indigo: {
    background: "bg-white",
    heading: "bg-indigo-600",
    link: "hover:text-indigo-700 decoration-indigo-300",
    price: "text-indigo-700",
  },
};

type RoutePriceTableProps = {
  rows: readonly RoutePrice[];
  theme: keyof typeof themes;
  headingId: string;
  title: string;
  description: string;
  note: string;
  children?: ReactNode;
};

export function RoutePriceTable({
  rows,
  theme,
  headingId,
  title,
  description,
  note,
  children,
}: RoutePriceTableProps) {
  const colors = themes[theme];

  return (
    <section className={`py-16 px-4 ${colors.background}`} aria-labelledby={headingId}>
      <div className="container mx-auto max-w-4xl">
        <h2 id={headingId} className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
          {title}
        </h2>
        <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto">{description}</p>
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm mb-4">
          <table className="w-full text-left">
            <thead className={`${colors.heading} text-white`}>
              <tr>
                <th scope="col" className="px-5 py-4 font-semibold text-sm">Маршрут</th>
                <th scope="col" className="px-5 py-4 font-semibold text-sm">Расстояние</th>
                <th scope="col" className="px-5 py-4 font-semibold text-sm">Стоимость</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.route} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-5 py-4 text-gray-900 font-semibold">
                    {row.link ? (
                      <Link href={row.link} className={`transition-colors underline underline-offset-2 ${colors.link}`}>
                        {row.route}
                      </Link>
                    ) : row.route}
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-sm">{row.km}</td>
                  <td className={`px-5 py-4 ${colors.price} font-bold whitespace-nowrap`}>{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 text-center">{note}</p>
        {children}
      </div>
    </section>
  );
}
