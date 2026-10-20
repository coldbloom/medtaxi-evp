import { DonetskFaq } from "@/app/donetsk/components/DonetskLanding";
import { DonetskRouteLink } from "@/app/donetsk/components/DonetskRouteLink";
import { faqItems } from "../content";

export function DonetskGeographySection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28" aria-labelledby="geography-heading">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#a66a1e]">География</p>
          <h2 id="geography-heading" className="mt-4 text-3xl font-black tracking-[-0.035em] text-[#142b24] sm:text-5xl">Перевозка больных по Донецку, ДНР и между городами</h2>
          <p className="mt-6 text-lg leading-relaxed text-[#59645f]">
            Забираем из дома, больницы, пансионата или реабилитационного центра. Конечным пунктом может быть любой адрес, доступный для согласованного маршрута.
          </p>
          <p className="mt-5 leading-relaxed text-[#59645f]">
            Для дальней поездки: <DonetskRouteLink href="/donetsk/moskva" className="font-bold text-[#173d32] underline decoration-[#a66a1e] underline-offset-4 transition hover:text-[#a66a1e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#173d32]">Перевозка лежачих больных из Донецка в Москву</DonetskRouteLink>.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[#d8d2c6] bg-[#fbfaf6] p-6 sm:p-9">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-lg font-black text-[#173d32]">По городу и рядом</h3>
              <ul className="mt-4 space-y-3 text-[#65716c]">
                {["Донецк", "Макеевка", "Ясиноватая", "Харцызск", "Иловайск"].map((city) => <li key={city}>— {city}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-black text-[#173d32]">Популярные задачи</h3>
              <ul className="mt-4 space-y-3 text-[#65716c]">
                <li>— Дом — больница</li>
                <li>— Больница — дом</li>
                <li>— Донецк — города ДНР</li>
                <li>— Донецк — Крым</li>
                <li>— Дальние поездки по РФ</li>
              </ul>
            </div>
          </div>
          <p className="mt-8 border-t border-[#dfd9cf] pt-6 text-sm leading-relaxed text-[#707a75]">Маршрут, время выезда и возможность поездки по конкретному направлению подтверждаем при обращении с учётом актуальной дорожной обстановки.</p>
        </div>
      </div>
    </section>
  );
}

export function DonetskFaqSection() {
  return (
    <section id="faq" className="bg-[#ebe6db] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.7fr_1.3fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#a66a1e]">Коротко о главном</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-[#142b24] sm:text-5xl">Частые вопросы</h2>
          <p className="mt-5 text-[#636e69]">Не нашли ответ? Позвоните — спокойно разберём вашу ситуацию.</p>
        </div>

        <DonetskFaq items={faqItems} />
      </div>
    </section>
  );
}
