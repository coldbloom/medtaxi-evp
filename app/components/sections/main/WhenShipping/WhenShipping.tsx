import Image from "next/image";

export const WhenShipping = () => {
  return (
    <>
      <section
        className="border-b border-gray-200/80 bg-slate-100 py-12 md:py-16 px-4"
        aria-labelledby="dispatch-photo-caption"
      >
        <div className="container mx-auto max-w-6xl">
          <figure className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-gray-950 shadow-xl ring-1 ring-gray-200/80 md:max-w-2xl">
            <div className="flex w-full justify-center bg-gray-950">
              <Image
                src="/mercedas-optimized.jpg"
                alt="Медицинский транспорт Mercedes Медтакси у приёмного отделения больницы в Евпатории"
                width={767}
                height={656}
                className="mx-auto block h-auto w-full object-contain"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
            <figcaption
              id="dispatch-photo-caption"
              className="border-t border-white/10 bg-gray-950/90 px-4 py-3 text-center text-sm font-medium text-white/95 sm:text-left sm:px-6"
            >
              Подъезжаем к медучреждениям Евпатории — в том числе к приёмному отделению, когда нужна помощь с погрузкой и транспортировкой.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="py-16 px-4 bg-white" aria-labelledby="when-needed-heading">
        <div className="container mx-auto max-w-6xl">
          <h2
            id="when-needed-heading"
            className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl"
          >
            Когда нужна перевозка лежачих больных и инвалидов
          </h2>

          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          <li>
            <article className="p-6 bg-gray-50 rounded-xl border border-gray-200 h-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Из больницы домой</h3>
              <p className="text-gray-600">
                <strong>Перевозка лежачего больного из больницы домой в Евпатории</strong> — выписка, погрузка и доставка до двери. Бережная транспортировка после операции или лечения.
              </p>
            </article>
          </li>
          <li>
            <article className="p-6 bg-gray-50 rounded-xl border border-gray-200 h-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">На процедуры и обследования</h3>
              <p className="text-gray-600">
                <strong>Транспортировка на процедуры</strong>, в поликлинику, на МРТ и обследования. Регулярные поездки в медучреждения Евпатории и Крыма.
              </p>
            </article>
          </li>
          <li>
            <article className="p-6 bg-gray-50 rounded-xl border border-gray-200 h-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">В реабилитационный центр и санаторий</h3>
              <p className="text-gray-600">
                <strong>Перевозка в реабилитационный центр</strong> и санатории Крыма. Из Евпатории в Симферополь, Ялту и другие города — с сопровождением при необходимости.
              </p>
            </article>
          </li>
          <li>
            <article className="p-6 bg-gray-50 rounded-xl border border-gray-200 h-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">После операции</h3>
              <p className="text-gray-600">
                <strong>Перевозка после операции</strong> — щадящая транспортировка лежачих пациентов. Спецтранспорт с фиксацией, без тряски и резких движений.
              </p>
            </article>
          </li>
          <li>
            <article className="p-6 bg-gray-50 rounded-xl border border-gray-200 h-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Между городами</h3>
              <p className="text-gray-600">
                <strong>Междугородняя перевозка лежачих больных</strong> из Евпатории в Москву, Санкт-Петербург и другие города России. Долгие маршруты с комфортом.
              </p>
            </article>
          </li>
          <li>
            <article className="p-6 bg-gray-50 rounded-xl border border-gray-200 h-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Из пансионата и обратно</h3>
              <p className="text-gray-600">
                Транспортировка из дома в пансионат, дом престарелых или обратно. По <strong>Евпатории</strong>, <strong>Крыму</strong> и при необходимости в другие регионы.
              </p>
            </article>
          </li>
          </ul>
        </div>
      </section>
    </>
  );
};