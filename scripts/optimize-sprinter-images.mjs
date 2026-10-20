import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const requireFromNext = createRequire(require.resolve("next/package.json"));
const sharp = requireFromNext("sharp");
const directory = fileURLToPath(new URL("../public/donetsk/sprinter/", import.meta.url));

// Keep the supplied JPGs untouched and encode full-frame responsive WebP copies.
for (const name of ["medtaxi-interior", "medtaxi-lift-rear", "medtaxi-lift-side"]) {
  const input = path.join(directory, `${name}-960.jpg`);
  for (const width of [480, 960]) {
    const output = path.join(directory, `${name}-${width}.webp`);
    const info = await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(output);
    console.log(`${path.basename(output)}: ${info.width}×${info.height}, ${info.size} bytes`);
  }
}
