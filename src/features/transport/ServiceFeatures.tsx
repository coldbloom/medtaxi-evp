import type { ReactNode } from "react";

const themes = {
  blue: { section: "bg-white", card: "bg-blue-50 border-blue-100" },
  neutral: { section: "bg-white", card: "bg-gray-50 border-gray-200" },
  indigo: { section: "bg-gray-50", card: "bg-white border-gray-200" },
};

type ServiceFeaturesProps = {
  title: string;
  description: string;
  items: readonly { icon: ReactNode; title: string; text: string }[];
  tone?: keyof typeof themes;
};

export function ServiceFeatures({ title, description, items, tone = "blue" }: ServiceFeaturesProps) {
  const theme = themes[tone];
  return (
    <section className={`py-16 px-4 ${theme.section}`} aria-labelledby="features-heading">
      <div className="container mx-auto max-w-6xl">
        <h2 id="features-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          {title}
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">{description}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <article key={item.title} className={`rounded-2xl p-6 border hover:shadow-md transition-shadow ${theme.card}`}>
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
