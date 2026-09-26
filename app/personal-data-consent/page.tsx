import type { Metadata } from "next";
import Link from "next/link";
import { LegalSiteNavigation } from "@/app/components/LegalSiteNavigation";
import { Footer } from "@/app/components/sections/Footer";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных | Медтакси",
  description: "Условия согласия на обработку персональных данных при отправке формы на medtaxi-evp.ru.",
  alternates: { canonical: "/personal-data-consent" },
};

export default function PersonalDataConsentPage() {
  return (
    <>
      <header className="border-b border-gray-200 bg-white px-4 py-5">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <LegalSiteNavigation />
          <Link href="/privacy" className="text-sm font-semibold text-gray-700 hover:text-blue-700">Политика</Link>
        </div>
      </header>
      <main className="bg-gray-50 px-4 py-10 text-gray-800 sm:py-14">
        <article className="mx-auto max-w-4xl space-y-6 bg-white p-6 leading-relaxed shadow-sm sm:p-10">
          <p className="text-sm font-semibold text-blue-700">Редакция от 26 сентября 2026 года</p>
          <h1 className="text-3xl font-black leading-tight text-gray-950 sm:text-4xl">Согласие на обработку персональных данных</h1>
          <p>
            Проставляя отметку в чекбоксе формы и нажимая кнопку «Отправить заявку», пользователь свободно,
            своей волей и в своём интересе даёт Колеснику Константину Витальевичу, физическому лицу,
            применяющему специальный налоговый режим «Налог на профессиональный доход», ИНН 614323075500,
            владельцу сайта medtaxi-evp.ru и лицу, оказывающему услуги под обозначением «Медтакси Евпатория»
            (Оператор), согласие на обработку указанных в форме персональных данных.
          </p>
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-950">Состав данных и цель</h2>
            <p>
              Обрабатываются имя, номер телефона и необязательный текст комментария. Цель — принять заявку,
              связаться с пользователем, уточнить условия и подготовить предложение по услуге перевозки.
              Пользователь не должен указывать в комментарии сведения о здоровье, диагнозах, документах или оплате.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-950">Действия с данными</h2>
            <p>
              Согласие предоставляется на сбор, запись, систематизацию, накопление, хранение, уточнение, извлечение, использование, передачу поставщикам инфраструктуры,
              действующим по поручению Оператора, блокирование, удаление и уничтожение данных с использованием средств автоматизации и без них.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-950">Срок и отзыв</h2>
            <p>
              Согласие действует до достижения цели обработки, но не более одного года с последнего взаимодействия, либо до его отзыва.
              Для отзыва необходимо обратиться по телефону:{" "}
              <a href="tel:+79895052785" className="font-semibold text-blue-700 underline underline-offset-2 text-nowrap">+7 (989) 505-27-85</a>,
              сообщив имя, номер телефона и требование прекратить обработку. Обработка может быть продолжена при наличии иного основания, предусмотренного законом.
            </p>
          </section>
          <p>
            Согласие не включает получение рекламных сообщений и обработку сведений о здоровье. Подробные правила изложены в{" "}
            <Link href="/privacy" className="font-semibold text-blue-700 underline underline-offset-2">Политике обработки персональных данных</Link>.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
