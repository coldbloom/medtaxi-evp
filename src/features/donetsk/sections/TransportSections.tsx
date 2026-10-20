import { SprinterGallery } from "@/app/donetsk/components/SprinterGallery";
import { DonetskPhoneLink } from "@/app/donetsk/DonetskPhoneLink";
import { PHONE_HREF, PHONE_LABEL, steps } from "../content";
import styles from "@/app/donetsk/DonetskMotion.module.css";

export function DonetskTransportSection() {
  return (
    <section id="transport" className="bg-[#dfe9e4] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <div className="mx-auto min-w-0 w-full max-w-md">
          <SprinterGallery />
        </div>

        <div className="lg:pl-10">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#6e4b19]">Внутри автомобиля</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-[#142b24] sm:text-5xl">Специализированный транспорт для перевозки лежачих больных</h2>
          <p className="mt-6 text-lg leading-relaxed text-[#4f6059]">
            Салон подготовлен для перевозки лежачего пациента. Каталка фиксируется в автомобиле, а размещение оборудования и сопровождающего продумывается до начала маршрута.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2" role="list">
            {["Регулируемая каталка", "Мягкие и кресельные носилки", "Фиксаторы для поездки", "Место для близкого человека", "Климат в салоне", "Остановки по согласованию"].map((item) => (
              <li key={item} className="flex items-start gap-3 font-bold text-[#173d32]">
                <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-[#2f6757] text-[11px] text-white" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-7 rounded-2xl border border-[#8ba49a]/50 bg-white/45 p-4 text-sm leading-relaxed text-[#53625c]">
            Услуга не заменяет скорую помощь. Возможность перевозки пациента в тяжёлом или нестабильном состоянии необходимо заранее согласовать с лечащим врачом.
          </p>
        </div>
      </div>
    </section>
  );
}

export function DonetskPreparationSection() {
  return (
    <section className="bg-[#fbfaf6] px-4 py-20 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="preparation-heading">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#a66a1e]">Подготовка к заказу</p>
          <h2 id="preparation-heading" className="mt-4 text-3xl font-black tracking-[-0.035em] text-[#142b24] sm:text-5xl">
            Что сообщить диспетчеру
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#59645f]">
            Эти сведения помогут сразу подобрать транспорт, оборудование и необходимое число сопровождающих, а также точнее рассчитать стоимость.
          </p>
        </div>

        <ol className="grid gap-4 sm:grid-cols-2">
          {[
            ["Маршрут и время", "Адрес отправления, пункт назначения, дату и удобное время."],
            ["Состояние пациента", "Может ли человек сидеть, требуется ли перевозка только лёжа."],
            ["Этажи и лифт", "Этажи по обоим адресам, наличие и примерный размер лифта."],
            ["Вес и перенос", "Примерный вес пациента и нужна ли помощь от кровати до автомобиля."],
          ].map(([title, text], index) => (
            <li key={title} className={`${styles.reveal} rounded-2xl border border-[#ddd7cc] bg-white p-6`}>
              <span className="text-sm font-black text-[#b47725]">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-xl font-black text-[#173d32]">{title}</h3>
              <p className="mt-2 leading-relaxed text-[#65716c]">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function DonetskStepsSection() {
  return (
    <section id="how" className="bg-[#153b30] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#f3b941]">Четыре шага</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] sm:text-5xl">Как заказать перевозку в Донецке</h2>
          <p className="mt-5 text-lg leading-relaxed text-[#c6d8d1]">Без сложных анкет и ожидания: основные детали уточним в одном разговоре.</p>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="bg-[#153b30] p-7 sm:p-8">
              <span className="text-4xl font-black text-[#f3b941]">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-8 text-xl font-black">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#b9cec6]">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-[#f3b941] p-7 text-[#142b24] sm:flex-row sm:items-center sm:p-9">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] opacity-65">Диспетчер на связи 24/7</p>
            <p className="mt-2 text-2xl font-black sm:text-3xl">Обсудим маршрут и назовём стоимость</p>
          </div>
          <DonetskPhoneLink href={`tel:${PHONE_HREF}`} ctaPosition="how" className="shrink-0 rounded-full bg-[#142b24] px-7 py-4 text-center text-lg font-black text-white transition hover:-translate-y-0.5 hover:bg-[#204a3e]" aria-label={`Позвонить ${PHONE_LABEL}`}>
            {PHONE_LABEL}
          </DonetskPhoneLink>
        </div>
      </div>
    </section>
  );
}
