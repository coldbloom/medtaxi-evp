import { MetadataRoute } from "next";
import { serviceOffers, SITE_URL } from "@/app/lib/serviceOffers";

const staticPages = [
  {
    url: `${SITE_URL}/donetsk`,
    changeFrequency: "weekly" as const,
    priority: 0.95,
  },
  {
    url: `${SITE_URL}/prices`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/contacts`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  },
];

const servicePages = [
  {
    url: `${SITE_URL}/uslugi/perevozka-invalidov-kolyasochnikov`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  },
  {
    url: `${SITE_URL}/uslugi/perevozka-iz-bolnitsy-domoj`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  },
  {
    url: `${SITE_URL}/uslugi/mezhdugorodnye-perevozki`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...staticPages.map((page) => ({
      ...page,
      lastModified: new Date(),
    })),
    ...servicePages.map((page) => ({
      ...page,
      lastModified: new Date(),
    })),
    ...serviceOffers.map((offer) => ({
      url: `${SITE_URL}${offer.route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
