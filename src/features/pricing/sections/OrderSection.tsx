import { TrackedPhoneLink } from "@/app/components/tracking/TrackedPhoneLink";

export function PricingOrderSection() {
  return (
    <section className="py-16 px-4 bg-white" aria-labelledby="order-heading">
      <div className="container mx-auto max-w-4xl">
        <h2 id="order-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Как оформить заказ и узнать точную цену
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              num: "1",
              title: "Позвоните или напишите",
              text: "Расскажите маршрут, состояние пациента и удобное время. Принимаем звонки и сообщения 24/7.",
            },
            {
              num: "2",
              title: "Получите точную цену",
              text: "За 2 минуты называем итоговую стоимость без скрытых доплат. Фиксируем сумму до выезда.",
            },
            {
              num: "3",
              title: "Подтвердите заказ",
              text: "Выезжаем в согласованное время. Пациент в безопасности — оплата после выполнения услуги.",
            },
          ].map((step) => (
            <div key={step.num} className="flex flex-col items-center text-center bg-teal-50 rounded-2xl p-7 border border-teal-100">
              <div className="w-14 h-14 bg-teal-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl mb-5 shadow-md">
                {step.num}
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-gradient-to-r from-teal-600 to-blue-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Рассчитать стоимость прямо сейчас</h3>
          <p className="text-teal-200 mb-6">Назовите маршрут — ответим за 2 минуты.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TrackedPhoneLink
              phone="+79789380221"
              trackingId="price_block"
              className="inline-flex items-center justify-center bg-white text-teal-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-50 transition-colors shadow-lg"
              aria-label="Позвонить для расчёта стоимости"
            >
              +7 (978) 938-02-21
            </TrackedPhoneLink>
            <a
              href={`https://t.me/ritevp?text=${encodeURIComponent("Здравствуйте! Хочу узнать стоимость перевозки")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-600 transition-colors"
              aria-label="Написать в Telegram"
            >
              Написать в Telegram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
