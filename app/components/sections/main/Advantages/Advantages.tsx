import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export const Advantages = () => {
  return (
    <section className="py-16 px-4 bg-blue-50">
      <div className="container mx-auto max-w-6xl">
        <AnimateOnScroll direction="up">
          <h4 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Почему доверяют именно нам?
          </h4>
        </AnimateOnScroll>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimateOnScroll direction="up" delay={0}>
            <article className="bg-white p-6 rounded-lg shadow-md md:h-full">
              <div className="text-3xl mb-4">🚐</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Специализированный транспорт
              </h3>
              <p className="text-gray-600">
                Автомобили, оборудованные <strong>подъёмниками</strong>,{" "}
                фиксаторами и местами для сопровождающих.
                Возможность транспортировки на носилках или в инвалидном
                кресле.
              </p>
            </article>
          </AnimateOnScroll>

          <AnimateOnScroll direction="up" delay={100}>
            <article className="bg-white p-6 rounded-lg shadow-md md:h-full">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Безопасность и комфорт
              </h3>
              <p className="text-gray-600">
                Плавный ход, климат-контроль,{" "}
                стерильный салон. Все условия для
                минимизации дискомфорта в пути.
              </p>
            </article>
          </AnimateOnScroll>

          <AnimateOnScroll direction="up" delay={200}>
            <article className="bg-white p-6 rounded-lg shadow-md md:h-full">
              <div className="text-3xl mb-4">👨‍⚕️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Опытные водители и сопровождающие
              </h3>
              <p className="text-gray-600">
                Наши сотрудники проходят специальную подготовку по
                транспортировке пациентов, тактичны и внимательны.
              </p>
            </article>
          </AnimateOnScroll>

          <AnimateOnScroll direction="up" delay={300}>
            <article className="bg-white p-6 rounded-lg shadow-md md:h-full">
              <div className="text-3xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Работаем 24/7
              </h3>
              <p className="text-gray-600">
                Готовы помочь в любой день и время суток.{" "}
                Срочные и плановые <strong>перевозки лежачих больных</strong> в{" "}
                <strong>Евпатории</strong> и по <strong>Крыму</strong>.
              </p>
            </article>
          </AnimateOnScroll>

          <AnimateOnScroll direction="up" delay={400}>
            <article className="bg-white p-6 rounded-lg shadow-md md:col-span-2 lg:col-span-1 md:h-full">
              <div className="text-3xl mb-4">🔑</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                «Под ключ» в Крыму и России
              </h3>
              <p className="text-gray-600">
                Мы берём на себя организацию всей поездки: от подготовки
                документов (при необходимости) и погрузки до сопровождения до
                конечной точки.
              </p>
            </article>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
};