import {HeadingSection} from "@/app/components/sections/HeadingSection";

export const Geography = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <HeadingSection tag="h2">
          Мы находимся в <strong><span className="text-blue-600">Евпатории</span></strong> и
          работаем по всему <strong>Крыму</strong> и <strong>России</strong>
        </HeadingSection>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                Территория обслуживания
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">📍</span>
                  <span>
                        <strong>Евпатория</strong> — основной регион работы
                      </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">📍</span>
                  <span>
                        <strong>Весь Крым</strong> — перевозки по полуострову
                      </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">📍</span>
                  <span>
                        <strong>Вся Россия</strong> — междугородние перевозки
                      </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                Популярные направления
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Симферополь</li>
                <li>• Севастополь</li>
                <li>• Ялта</li>
                <li>• Алушта</li>
                <li>• Феодосия</li>
                <li>• Керчь</li>
                <li>• Херсонская область</li>
                <li>• ДНР, ЛНР</li>
                <li>• Москва</li>
                <li>• Санкт-Петербург</li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-gray-600">
          <strong>Перевозка лежачих больных из Евпатории</strong> и по{" "}
          <strong>Крыму</strong> осуществляется на специализированном
          транспорте с медицинским оборудованием. Мы обеспечиваем безопасную
          транспортировку пациентов в любой город России.
        </p>
      </div>
    </section>
  );
};