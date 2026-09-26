import type { Metadata, Viewport } from "next";
import { PhoneClickTracking } from "@/app/components/tracking/PhoneClickTracking";
import { SiteAnalytics } from "@/app/components/SiteAnalytics";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export const metadata: Metadata = {
  title: "Перевозка лежачих больных и инвалидов в Евпатории | Медтакси Евпатория",
  description: "Специализированная перевозка лежачих больных и инвалидов в Евпатории, Крыму и по всей России. Профессиональная бригада, медицинское оборудование, работа 24/7. Бережно, как дома, даже в дороге.",
  keywords: [
    "перевозка лежачих больных Евпатория",
    "перевозка инвалидов Крым",
    "санитарный транспорт Евпатория",
    "медтакси Евпатория",
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
    title: "Перевозка лежачих больных и инвалидов в Евпатории | Медтакси Евпатория",
    description: "Специализированная перевозка лежачих больных и инвалидов в Евпатории, Крыму и по всей России. Профессиональная бригада, медицинское оборудование, работа 24/7.",
    url: "https://medtaxi-evp.ru",
    siteName: "Медтакси Евпатория",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "https://medtaxi-evp.ru/peugeot.jpg",
        width: 1200,
        height: 630,
        alt: "Специализированный транспорт для перевозки лежачих больных — Медтакси Евпатория",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Перевозка лежачих больных и инвалидов в Евпатории | Медтакси Евпатория",
    description: "Специализированная перевозка лежачих больных и инвалидов в Евпатории, Крыму и по всей России. Работа 24/7.",
    images: ["/peugeot.jpg"],
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
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon-512x512.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon-192x192.png",
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
        <meta name="yandex-verification" content="473ebc6fd8a5398f" />
        <meta name="google-site-verification" content="j5vuo9bH1ow7xO4qzZ76ciMVfRZDl0pjLs-16_OVgPk" />
      </head>
      <body className="antialiased">
        {/*<ScrollToTop />*/}
        {children}
        {/* Маленький client leaf: layout и SEO-контент страниц остаются серверными. */}
        <PhoneClickTracking />
        <SiteAnalytics />
      </body>
    </html>
  );
}
