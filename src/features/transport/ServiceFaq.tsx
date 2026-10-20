type ServiceFaqProps = {
  title?: string;
  items: readonly { name: string; acceptedAnswer: { text: string } }[];
  tone?: "blue" | "indigo";
};

export function ServiceFaq({ title = "Частые вопросы", items, tone = "blue" }: ServiceFaqProps) {
  return (
    <section className="py-16 px-4 bg-white" aria-labelledby="faq-heading">
      <div className="container mx-auto max-w-3xl">
        <h2 id="faq-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
          {title}
        </h2>
        <div className="space-y-4">
          {items.map((item) => (
            <details key={item.name} className="group bg-gray-50 rounded-2xl border border-gray-200 px-6 py-5 cursor-pointer">
              <summary className="font-semibold text-gray-900 list-none flex justify-between items-center gap-4">
                {item.name}
                <span aria-hidden="true" className={`text-2xl font-light group-open:rotate-45 transition-transform duration-200 select-none flex-shrink-0 ${tone === "indigo" ? "text-indigo-600" : "text-blue-600"}`}>+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed text-sm">{item.acceptedAnswer.text}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
