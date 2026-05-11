import { serviceOffers, SITE_URL } from "@/app/lib/serviceOffers";

const xmlEscape = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const buildYmlFeed = () => {
  const date = new Date().toISOString().slice(0, 19);
  const offersXml = serviceOffers
    .map(
      (offer) => `
      <offer id="${xmlEscape(offer.id)}" available="true">
        <url>${xmlEscape(`${SITE_URL}${offer.route}`)}</url>
        <price>${offer.price}</price>
        <currencyId>RUR</currencyId>
        <categoryId>1</categoryId>
        <name>${xmlEscape(offer.name)}</name>
        <description>${xmlEscape(offer.description)}</description>
        <picture>${SITE_URL}/peugeot.jpg</picture>
      </offer>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="${date}">
  <shop>
    <name>Медтакси Евпатория</name>
    <company>Медтакси Евпатория</company>
    <url>${SITE_URL}</url>
    <currencies>
      <currency id="RUR" rate="1" />
    </currencies>
    <categories>
      <category id="1">Перевозка маломобильных пациентов</category>
    </categories>
    <offers>${offersXml}
    </offers>
  </shop>
</yml_catalog>`;
};

export async function GET() {
  const xml = buildYmlFeed();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
