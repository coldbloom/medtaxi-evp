import type { Metadata } from "next";

const SITE_URL = "https://medtaxi-evp.ru";

type SocialImage = {
  url: string;
  width: number;
  height: number;
  type: "image/jpeg" | "image/png";
  alt: string;
};

export const DONETSK_SITE_NAME = "Медтакси Донецк | Перевозка лежачих больных";

export const DONETSK_SOCIAL_IMAGE: SocialImage = {
  url: "/donetsk/images/white-sprinter.png",
  width: 1254,
  height: 1254,
  type: "image/png",
  alt: "Белый Sprinter с носилками — иллюстрация Медтакси Донецк",
};

export const MOSCOW_SOCIAL_IMAGE: SocialImage = {
  url: "/donetsk/images/mercedes-moskva-social.jpg",
  width: 1200,
  height: 900,
  type: "image/jpeg",
  alt: "Mercedes для перевозки лежачих больных из Донецка в Москву",
};

export const CRIMEA_SOCIAL_IMAGE: SocialImage = {
  url: "/peugeot.jpg",
  width: 1280,
  height: 960,
  type: "image/jpeg",
  alt: "Специализированный транспорт Медтакси Евпатория для перевозки лежачих больных",
};

export const SERVICE_SOCIAL_IMAGE: SocialImage = {
  url: "/mercedas-optimized.jpg",
  width: 767,
  height: 656,
  type: "image/jpeg",
  alt: "Медтакси Евпатория — автомобиль для перевозки лежачих больных",
};

// Each page supplies its own URL and text; nested Next metadata is not deep-merged.
// Use public JPEG/PNG files so crawlers need neither JavaScript nor image negotiation.
export function createSocialMetadata({
  title,
  description,
  path,
  siteName = "Медтакси Евпатория",
  image = CRIMEA_SOCIAL_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  siteName?: string;
  image?: SocialImage;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const socialImage = { ...image, url: new URL(image.url, SITE_URL).href };

  return {
    openGraph: {
      title,
      description,
      url: new URL(path, SITE_URL).href,
      siteName,
      locale: "ru_RU",
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: socialImage.url, alt: socialImage.alt }],
    },
  };
}
