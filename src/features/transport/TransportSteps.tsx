const themes = {
  blue: {
    section: "bg-gray-50",
    card: "bg-white shadow-sm border-gray-100",
    number: "bg-blue-600",
  },
  indigo: {
    section: "bg-white",
    card: "bg-indigo-50 border-indigo-100",
    number: "bg-indigo-600",
  },
};

type TransportStepsProps = {
  title: string;
  items: readonly { num: string; title: string; text: string }[];
  tone?: keyof typeof themes;
};

export function TransportSteps({ title, items, tone = "blue" }: TransportStepsProps) {
  const theme = themes[tone];
  return (
    <section className={`py-16 px-4 ${theme.section}`} aria-labelledby="how-heading">
      <div className="container mx-auto max-w-4xl">
        <h2 id="how-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          {title}
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {items.map((item) => (
            <div key={item.num} className={`flex gap-5 rounded-2xl p-6 border ${theme.card}`}>
              <div className={`flex-shrink-0 w-12 h-12 text-white rounded-xl flex items-center justify-center font-bold text-xl ${theme.number}`}>
                {item.num}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
