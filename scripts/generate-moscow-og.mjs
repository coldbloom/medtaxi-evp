import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const source = fileURLToPath(new URL("../public/donetsk/moskva/front.webp", import.meta.url));
const output = fileURLToPath(new URL("../public/donetsk/images/mercedes-moskva-social.jpg", import.meta.url));

// Preserve the entire photo; social crawlers receive a static JPEG, not a WebP
// gallery variant or a request to the runtime Next.js image optimizer.
const info = await sharp(source).rotate().resize({ width: 1200, withoutEnlargement: true })
  .jpeg({ quality: 88, mozjpeg: true }).toFile(output);
console.log(`mercedes-moskva-social.jpg: ${info.width}×${info.height}, ${info.size} bytes`);
