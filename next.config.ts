import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), "app")],
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // НАЧАЛО: Добавьте этот новый блок с редиректами
  async redirects() {
    return [
      // 1. Редирект с HTTPS-версии БЕЗ www на версию С www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'medtaxi-evp.ru', // Ловим домен без www
          },
        ],
        destination: 'https://medtaxi-evp.ru/:path*',
        permanent: true, // Постоянный редирект (статус 308) - важно для SEO
      },
    ];
  },
  // КОНЕЦ нового блока
};

export default nextConfig;
