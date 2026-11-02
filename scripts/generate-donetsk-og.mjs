import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const requireFromNext = createRequire(require.resolve("next/package.json"));
const sharp = requireFromNext("sharp");
const source = fileURLToPath(new URL("../public/donetsk/sprinter/medtaxi-lift-side-960.jpg", import.meta.url));
const output = fileURLToPath(new URL("../public/donetsk/og-donetsk.jpg", import.meta.url));

// A code-rendered social card using the same real vehicle photo as the gallery.
// Generate once and commit: sharing bots receive a static JPEG without a runtime renderer.
const photo = await sharp(source).rotate().resize(444, 554, { fit: "cover" }).jpeg({ quality: 90 }).toBuffer();
const card = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#10211d"/>
  <rect x="54" y="50" width="54" height="5" rx="2.5" fill="#f3b941"/>
  <g font-family="Arial, sans-serif">
    <text x="54" y="99" font-size="25" font-weight="700" letter-spacing="4" fill="#cfddd7">МЕДТАКСИ · ДНР</text>
    <text x="50" y="206" font-size="88" font-weight="700" fill="#f3b941">Донецк</text>
    <text x="54" y="287" font-size="42" font-weight="700" fill="#ffffff">Перевозка лежачих</text>
    <text x="54" y="341" font-size="42" font-weight="700" fill="#ffffff">и маломобильных людей</text>
    <text x="54" y="410" font-size="28" fill="#cfddd7">Спецтранспорт с подъёмником</text>
    <text x="54" y="453" font-size="28" fill="#cfddd7">От кровати до кровати</text>
    <rect x="54" y="507" width="580" height="67" rx="16" fill="#f3b941"/>
    <text x="78" y="550" font-size="28" font-weight="700" fill="#10211d">Подача от 3 500 ₽ · Заявки 24/7</text>
  </g>
  <defs><clipPath id="photo"><rect x="714" y="38" width="444" height="554" rx="24"/></clipPath></defs>
  <image x="714" y="38" width="444" height="554" href="data:image/jpeg;base64,${photo.toString("base64")}" clip-path="url(#photo)"/>
</svg>`);

const info = await sharp(card).jpeg({ quality: 88, mozjpeg: true }).toFile(output);
console.log(`og-donetsk.jpg: ${info.width}×${info.height}, ${info.size} bytes`);
