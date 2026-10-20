import Link from "next/link";
import { faqStructuredData } from "../schema";

export function PricingFaqSection() {
  return (
    <section className="py-16 px-4 bg-gray-50" aria-labelledby="faq-heading">
      <div className="container mx-auto max-w-3xl">
        <h2 id="faq-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
          Частые вопросы о ценах
        </h2>
        <div className="space-y-4">
          {faqStructuredData.mainEntity.map((item) => (
            <details key={item.name} className="group bg-white rounded-2xl border border-gray-200 px-6 py-5 cursor-pointer">
              <summary className="font-semibold text-gray-900 list-none flex justify-between items-center gap-4">
                {item.name}
                <span className="text-teal-600 text-2xl font-light group-open:rotate-45 transition-transform duration-200 select-none flex-shrink-0">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed text-sm">{item.acceptedAnswer.text}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingServiceLinksSection() {
  return (
    <section className="py-12 px-4 bg-white border-t border-gray-100">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Страницы наших услуг</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { href: "/uslugi/perevozka-iz-bolnitsy-domoj", label: "Из больницы домой" },
            { href: "/uslugi/perevozka-invalidov-kolyasochnikov", label: "Инвалиды-колясочники" },
            { href: "/uslugi/mezhdugorodnye-perevozki", label: "Междугородние перевозки" },
            { href: "/contacts", label: "Контакты" },
            { href: "/", label: "На главную" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-teal-50 text-teal-700 font-semibold text-sm px-5 py-2.5 rounded-full border border-teal-200 hover:bg-teal-100 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
