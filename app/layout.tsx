import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const YANDEX_METRIKA_ID = 106710031;

export const metadata: Metadata = {
  title: "Перевозка лежачих больных и инвалидов в Евпатории | Медтакси Крым",
  description: "Специализированная перевозка лежачих больных и инвалидов в Евпатории, Крыму и по всей России. Профессиональная бригада, медицинское оборудование, работа 24/7. Бережно, как дома, даже в дороге.",
  keywords: [
    "перевозка лежачих больных Евпатория",
    "перевозка инвалидов Крым",
    "санитарный транспорт Евпатория",
    "медтакси Крым",
    "транспортировка больных Евпатория",
    "перевозка лежачих больных Крым",
    "медицинская перевозка Евпатория",
    "перевозка инвалидов-колясочников Крым",
    "санитарная перевозка по России",
    "междугородние перевозки больных",
  ],
  authors: [{ name: "Медтакси Евпатория" }],
  creator: "Медтакси Евпатория",
  publisher: "Медтакси Евпатория",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://medtaxi-evp.ru"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Перевозка лежачих больных и инвалидов в Евпатории | Медтакси Крым",
    description: "Специализированная перевозка лежачих больных и инвалидов в Евпатории, Крыму и по всей России. Профессиональная бригада, медицинское оборудование, работа 24/7.",
    url: "https://medtaxi-evp.ru",
    siteName: "Медтакси Евпатория",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/peugeot.jpg",
        width: 1200,
        height: 630,
        alt: "Специализированный транспорт для перевозки лежачих больных — Медтакси Евпатория",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Перевозка лежачих больных и инвалидов в Евпатории | Медтакси Крым",
    description: "Специализированная перевозка лежачих больных и инвалидов в Евпатории, Крыму и по всей России. Работа 24/7.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/logo.svg", type: "image/svg+xml", sizes: "any" },
    ],
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="yandex-verification" content="473ebc6fd8a5398f" />
        <meta name="google-site-verification" content="j5vuo9bH1ow7xO4qzZ76ciMVfRZDl0pjLs-16_OVgPk" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="geo.region" content="RU-CR" />
        <meta name="geo.placename" content="Евпатория" />
        <meta name="geo.position" content="45.1906;33.3676" />
        <meta name="ICBM" content="45.1906, 33.3676" />
      </head>
      <body className="antialiased">
        {children}
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}', 'ym');
              ym(${YANDEX_METRIKA_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
            `,
          }}
        />
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
              style={{ position: "absolute", left: -9999 }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
