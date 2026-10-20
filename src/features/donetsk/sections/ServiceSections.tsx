import { DonetskContactTrigger } from "@/app/donetsk/DonetskContactTrigger";
import { DonetskPhoneLink } from "@/app/donetsk/DonetskPhoneLink";
import { PHONE_HREF, PHONE_LABEL, MIN_PRICE_LABEL, situations, patientTypes } from "../content";
import styles from "@/app/donetsk/DonetskMotion.module.css";

export function DonetskBenefitsSection() {
  return (
    <section className="border-b border-[#dcd7cc] bg-[#f4f1e9]" aria-label="Преимущества услуги">
      <div className="mx-auto grid max-w-7xl divide-y divide-[#dcd7cc] px-4 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:px-6 lg:grid-cols-4 lg:px-8">
        {[
          ["Бережная погрузка", "Помогаем переместить пациента"],
          ["Носилки и фиксация", "Учитываем состояние человека"],
          ["Комфортный салон", "Место для сопровождающих"],
          ["Понятная стоимость", "Согласуем до подачи машины"],
        ].map(([title, text]) => (
          <div key={title} className="px-0 py-6 sm:px-6 lg:py-8">
            <p className="font-extrabold text-[#173d32]">{title}</p>
            <p className="mt-1 text-sm text-[#65716c]">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function DonetskPriceSection() {
  return (
    <section id="price" className="bg-[#fbfaf6] px-4 py-20 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="price-heading">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-[#d8d2c6] bg-white shadow-[0_24px_60px_rgba(52,62,57,.08)] lg:grid-cols-[.82fr_1.18fr]">
        <div className="bg-[#f3b941] p-7 text-[#142b24] sm:p-10 lg:p-12">
          <p className="text-sm font-black uppercase tracking-[0.18em] opacity-65">Стоимость перевозки в Донецке</p>
          <h2 id="price-heading" className="mt-5 text-3xl font-black tracking-[-0.04em] sm:text-5xl">
            Подача автомобиля от <span className="whitespace-nowrap">{MIN_PRICE_LABEL}</span>
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-[#35443f]">
            Минимальная стоимость относится к подаче специализированного автомобиля. Полную цену поездки назовём после уточнения деталей и зафиксируем до выезда.
          </p>
        </div>

        <div className="p-7 sm:p-10 lg:p-12">
          <h3 className="text-2xl font-black tracking-tight text-[#173d32]">Что влияет на итоговый расчёт</h3>
          <ul className="mt-7 grid gap-4 sm:grid-cols-2" role="list">
            {["Адреса и расстояние", "Этажи и наличие лифта", "Вес и состояние пациента", "Необходимая помощь при переносе", "Ожидание и обратная поездка", "Междугородний маршрут"].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[#56635d]">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#dfe9e4] text-xs font-black text-[#245445]" aria-hidden="true">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <DonetskPhoneLink
              href={`tel:${PHONE_HREF}`}
              ctaPosition="price"
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#173d32] px-7 py-3.5 text-center font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#245445]"
              aria-label={`Узнать точную стоимость по телефону ${PHONE_LABEL}`}
            >
              Узнать точную стоимость
            </DonetskPhoneLink>
            <DonetskContactTrigger
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#aebbb5] px-7 py-3.5 text-center font-bold text-[#173d32] transition hover:-translate-y-0.5 hover:bg-[#eef3f0]"
              label="Заказать звонок"
              ctaPosition="price"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function DonetskSituationsSection() {
  return (
    <section id="services" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-7 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#a66a1e]">Когда мы нужны</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-[#142b24] sm:text-5xl">Когда нужна перевозка лежачего больного в Донецке</h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-[#59645f] lg:justify-self-end">
            Каждую поездку планируем индивидуально: уточняем состояние пациента, особенности дома и пункта назначения, выбираем подходящее оборудование.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {situations.map((item) => (
            <article key={item.number} className={`${styles.reveal} rounded-[1.75rem] border border-[#d8d2c6] bg-[#fbfaf6] p-6 sm:p-8`}>
              <div className="flex items-start justify-between gap-5">
                <h3 className="text-2xl font-black tracking-tight text-[#173d32]">{item.title}</h3>
                <span className="text-sm font-black text-[#b47725]">{item.number}</span>
              </div>
              <p className="mt-5 leading-relaxed text-[#66706b]">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DonetskPatientsSection() {
  return (
    <section className="border-y border-[#d8d2c6] bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="patients-heading">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-7 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#a66a1e]">Каких пациентов перевозим</p>
            <h2 id="patients-heading" className="mt-4 text-3xl font-black tracking-[-0.035em] text-[#142b24] sm:text-5xl">
              Перевозим лежачих и маломобильных пациентов
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-[#59645f] lg:justify-self-end">
            Организуем перевозку людей после операций, травм и лечения, пожилых и маломобильных пассажиров, инвалидов-колясочников и пациентов, которым сложно самостоятельно добраться до автомобиля.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {patientTypes.map((patient, index) => (
            <li key={patient.title} className={`${styles.reveal} rounded-[1.5rem] border border-[#d8d2c6] bg-[#fbfaf6] p-6`}>
              <div className="flex items-center gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#dfe9e4] text-sm font-black text-[#245445]" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-black tracking-tight text-[#173d32]">{patient.title}</h3>
              </div>
              <p className="mt-5 leading-relaxed text-[#66706b]">{patient.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
