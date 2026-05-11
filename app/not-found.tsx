import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/app/components/sections/Header";
import { Footer } from "@/app/components/sections/Footer";

export const metadata: Metadata = {
  title: "Страница не найдена | Медтакси Евпатория",
  description: "Страница не найдена. Вернитесь на главную страницу Медтакси Евпатория.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header />

      <main id="main-content">
        <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white min-h-[calc(100vh-200px)] flex items-center px-4 py-20">
          <div className="container mx-auto max-w-2xl text-center">
            {/* 404 number */}
            <div className="mb-8 select-none">
              <p className="text-[160px] md:text-[220px] font-black leading-none text-white opacity-15">
                404
              </p>
            </div>

            {/* Text */}
            <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-4">
              Медтакси Евпатория
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
              Страница не найдена
            </h1>
            <p className="text-lg text-blue-100 mb-10 max-w-md mx-auto leading-relaxed">
              Возможно, адрес изменился или такой страницы не существует. Вернитесь на главную — там есть всё, что нужно.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                ← На главную
              </Link>
              <a
                href="tel:+79789380221"
                className="inline-flex items-center justify-center bg-blue-600 border-2 border-blue-300 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-500 transition-colors"
                aria-label="Позвонить +79789380221"
              >
                Позвонить нам
              </a>
            </div>

            {/* Quick links */}
            <div className="border-t border-blue-600 pt-8">
              <p className="text-blue-200 text-sm mb-5">Или перейдите в нужный раздел:</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {[
                  { href: "/uslugi/perevozka-iz-bolnitsy-domoj", label: "Из больницы домой" },
                  { href: "/uslugi/perevozka-invalidov-kolyasochnikov", label: "Инвалиды-колясочники" },
                  { href: "/uslugi/mezhdugorodnye-perevozki", label: "Междугородние перевозки" },
                  { href: "/contacts", label: "Контакты" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="bg-blue-600 bg-opacity-60 hover:bg-opacity-80 text-white text-sm px-5 py-2.5 rounded-full border border-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
