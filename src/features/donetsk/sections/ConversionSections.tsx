import { buttonPrimary, buttonSecondary } from "@/app/donetsk/components/buttonStyles";
import { DonetskContactTrigger } from "@/app/donetsk/DonetskContactTrigger";
import { DonetskImage } from "@/app/donetsk/DonetskImage";
import { DonetskPhoneLink } from "@/app/donetsk/DonetskPhoneLink";
import { PHONE_HREF, PHONE_LABEL } from "../content";

export function DonetskDiscountsSection() {
  return (
    <section
      id="discounts"
      className="relative overflow-hidden bg-[#f4f1e9] px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      aria-labelledby="discounts-heading"
    >
      <div className="pointer-events-none absolute -left-32 top-10 size-80 rounded-full bg-[#f3b941]/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-[#39715f]/12 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2rem] bg-[#153b30] text-white shadow-[0_30px_80px_rgba(20,43,36,.16)] sm:rounded-[2.5rem]">
          <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[.58fr_1fr] lg:items-center lg:gap-14 lg:p-14">
            <div>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#f3b941]/30 bg-[#f3b941]/10 px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-[#ffd476]">
                Социальная скидка
              </div>
              <p className="mt-7 text-[5.5rem] font-black leading-none tracking-[-0.07em] text-[#f3b941] sm:text-[7.5rem]">
                15<span className="text-[.48em] align-top">%</span>
              </p>
            </div>

            <div>
              <h2 id="discounts-heading" className="mt-5 text-3xl font-black tracking-[-0.035em] sm:text-4xl">
                Для пенсионеров и ветеранов СВО
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#c6d8d1]">
                Предоставляем скидку на услуги перевозки лежачих и маломобильных пациентов в Донецке и по согласованным направлениям.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#a9c1b7]">
                Сообщите о праве на скидку диспетчеру при оформлении заявки. Условия и итоговую стоимость согласуем до выезда.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <DonetskPhoneLink
                  href={`tel:${PHONE_HREF}`}
                  ctaPosition="discount"
                  className={buttonPrimary}
                  aria-label={`Узнать о скидке по телефону ${PHONE_LABEL}`}
                >
                  Узнать&nbsp;условия{' '}<span className="whitespace-nowrap">{PHONE_LABEL}</span>
                </DonetskPhoneLink>
                <DonetskContactTrigger className={buttonSecondary} label="Оставить заявку" ctaPosition="discount" />
              </div>
            </div>
          </div>

          <div className="grid bg-[#10211d] sm:grid-cols-2">
            <figure className="group relative aspect-[16/10] overflow-hidden sm:aspect-[16/9]">
              <DonetskImage
                name="pensioner"
                alt="Пенсионер — скидка на перевозку лежачих больных в Донецке"
                className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                sizes="(min-width: 1344px) 640px, (min-width: 1024px) calc(50vw - 32px), (min-width: 640px) calc(50vw - 24px), calc(100vw - 32px)"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10211d]/90 via-[#10211d]/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <p className="text-xl font-black">Пенсионерам</p>
                <p className="mt-1 text-sm text-white/75">Скидка 15% на перевозку</p>
              </figcaption>
            </figure>

            <figure className="group relative aspect-[16/10] overflow-hidden sm:aspect-[16/9]">
              <DonetskImage
                name="veteran"
                alt="Военнослужащие — иллюстрация скидки для ветеранов СВО"
                className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                sizes="(min-width: 1344px) 640px, (min-width: 1024px) calc(50vw - 32px), (min-width: 640px) calc(50vw - 24px), calc(100vw - 32px)"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10211d]/90 via-[#10211d]/15 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <p className="text-xl font-black">Ветеранам СВО</p>
                <p className="mt-1 text-sm text-white/75">Скидка 15% на перевозку</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DonetskFinalSection() {
  return (
    <section className="bg-[#10211d] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#f3b941]">Мы рядом</p>
        <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black tracking-[-0.04em] sm:text-6xl">Организуем бережную перевозку вашего близкого</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#c8d8d2]">Позвоните или оставьте номер. Уточним детали, предложим подходящий вариант и заранее согласуем стоимость.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <DonetskPhoneLink href={`tel:${PHONE_HREF}`} ctaPosition="final" className={buttonPrimary} aria-label={`Позвонить ${PHONE_LABEL}`}>{PHONE_LABEL}</DonetskPhoneLink>
          <DonetskContactTrigger className={buttonSecondary} label="Оставить заявку" ctaPosition="final" />
        </div>
      </div>
    </section>
  );
}
