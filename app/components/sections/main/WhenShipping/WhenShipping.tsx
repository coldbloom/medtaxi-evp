export const WhenShipping = () => {
  return (
    <section className="py-16 px-4 bg-white" aria-labelledby="when-needed-heading">
      <div className="container mx-auto max-w-6xl">
        <h2 id="when-needed-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
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
  );
};