// Enlarges the small (1000 px) room photos to 2000 px with a careful resample
// and a light sharpen, so they hold up better on high-density screens.
// This smooths the enlargement; it cannot add detail the original lacks.
//   node scripts/enlarge-photos.mjs
import { mkdirSync } from 'node:fs';
import sharp from 'sharp';

const inDir = 'src/assets/photos/';
const outDir = 'src/assets/photos/large/';
const names = ['lounge-fauteuils', 'lounge-aquarium', 'salle-rouge'];

mkdirSync(outDir, { recursive: true });

for (const name of names) {
  const image = sharp(`${inDir}${name}.jpg`);
  const { width, height } = await image.metadata();
  await image
    .resize({ width: width * 2, kernel: 'lanczos3' })
    .sharpen({ sigma: 0.9, m1: 0.5, m2: 1.4 })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(`${outDir}${name}.jpg`);
  console.log(`${name}: ${width}x${height} -> ${width * 2}x${height * 2}`);
}
