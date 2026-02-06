export const OurWork = () => {
  return (
    <section className="py-16 px-4 bg-blue-50" aria-labelledby="how-we-work-heading">
      <div className="container mx-auto max-w-4xl">
        <h2 id="how-we-work-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Как заказать перевозку лежачего больного в Евпатории
        </h2>
        <ol className="space-y-6" start={1}>
          <li className="flex gap-4 items-start">
            <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Позвоните или напишите</h3>
              <p className="text-gray-600">Опишите маршрут и состояние пациента. Мы подберём подходящий транспорт и согласуем время.</p>
            </div>
          </li>
          <li className="flex gap-4 items-start">
            <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Встреча в назначенном месте</h3>
              <p className="text-gray-600">Машина приедет в больницу, дом или пансионат. Помощь с погрузкой на носилках или в кресле.</p>
            </div>
          </li>
          <li className="flex gap-4 items-start">
            <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Безопасная доставка</h3>
              <p className="text-gray-600">Перевозка в пункт назначения с учётом состояния пациента. При необходимости — сопровождение родственником.</p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
};