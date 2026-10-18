import { serializeJsonLd } from "@/app/lib/serializeJsonLd";
import type { Viewport } from "next";
import { ScrollProgressBar } from "@/app/components/ScrollProgressBar";
import { DonetskInteractions } from "../DonetskInteractions";
import { DonetskHeader, DonetskFooter, DonetskMobileActions } from "../components/DonetskLanding";
import styles from "../DonetskMotion.module.css";
import { PAGE_PATH, routeMetadata, createRouteSchema } from "./seo";
import {
  RouteHero, RouteJourney, RoutePrice, RouteTransport,
  RoutePreparation, RouteOrder, RouteFaq, RouteFinalCta,
} from "./sections";

const PHONE_HREF = "+79490676701";
const PHONE_LABEL = "+7 (949) 067-67-01";
const routeSchema = createRouteSchema(PHONE_HREF);

export const dynamic = "force-static";
export const metadata = routeMetadata;
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#10211d" };

export default function DonetskMoscowPage() {
  const contact = { phone: PHONE_HREF, phoneLabel: PHONE_LABEL, ctaPrefix: "donetsk_moskva" };
  return (
    <div className={`${styles.page} min-h-screen bg-[#f4f1e9] text-[#17231f] selection:bg-[#f3b941] selection:text-[#14221e]`}>
      <a href="#main-content" className={styles.skipLink}>Перейти к содержимому</a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(routeSchema) }} />
      <DonetskHeader {...contact} navigation={[
        { href: "#route", label: "Маршрут" },
        { href: "#price", label: "Стоимость" },
        { href: "#transport", label: "Транспорт" },
        { href: "#faq", label: "Вопросы" },
      ]} />
      <ScrollProgressBar color="#f3b941" className="sticky top-0 z-30 bg-[#10211d]" />
      <main id="main-content" tabIndex={-1}>
        <RouteHero contact={contact} />
        <RouteJourney />
        <RoutePrice />
        <RouteTransport />
        <RoutePreparation />
        <RouteOrder contact={contact} />
        <RouteFaq />
        <RouteFinalCta contact={contact} />
      </main>
      <DonetskFooter {...contact} />
      <DonetskMobileActions {...contact} />
      <DonetskInteractions pagePath={PAGE_PATH} contactPhoneHref={PHONE_HREF} contactPhoneLabel={PHONE_LABEL} />
    </div>
  );
}
