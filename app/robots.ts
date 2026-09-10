import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    host: "https://medtaxi-evp.ru",
    sitemap: "https://medtaxi-evp.ru/sitemap.xml",
  };
}
