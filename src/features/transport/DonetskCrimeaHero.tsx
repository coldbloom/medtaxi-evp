import type { ServiceOffer } from "@/app/lib/serviceOffers";
import { RouteChip } from "@/app/donetsk/components/RouteChip";
import { benefits } from "@/app/donetsk/moskva/content";
import { IntercityHero } from "./IntercityHero";

export function DonetskCrimeaHero({ offer, contact }: { offer: ServiceOffer; contact: { phone: string; phoneLabel: string } }) {
  return (
    <IntercityHero
      theme="blue"
      contact={contact}
      ctaPosition="donetsk_krym_hero"
      destination="в Крым"
      description="Перевозим лежачих и маломобильных пациентов из Донецка и ДНР в Евпаторию, Симферополь и другие города Крыма на Mercedes. Помогаем с переносом и доставляем от кровати до кровати. Стоимость согласуем до выезда."
      priceNote={offer.priceNote}
      breadcrumbs={[{ label: "Главная", href: "/" }, { label: "Услуги", href: "/#services" }, { label: offer.shortName }]}
      benefits={benefits}
      routes={
        <>
          <RouteChip destination="Крым" theme="blue" />
          <p className="mt-4 text-sm leading-relaxed text-blue-200">Евпатория, Симферополь, Ялта, Севастополь. Маршрут и остановки согласуем перед поездкой.</p>
        </>
      }
    />
  );
}
