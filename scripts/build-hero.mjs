// Prepares the layers of the home page's opening scene from the entrance photo:
// the facade with the doorway cut out, and the two door leaves as separate images.
//   node scripts/build-hero.mjs
// If the doorway is re-measured, update `door` here and the matching
// percentages in src/styles/scene.css.
import { mkdirSync } from 'node:fs';
import sharp from 'sharp';

const source = 'src/assets/graded/hero-entree.jpg';
const outDir = 'src/assets/hero/';

// The wooden doors inside their frame, in pixels of the 2000 x 1116 photo.
const door = { left: 760, top: 419, width: 467, height: 469, seam: 994 };

mkdirSync(outDir, { recursive: true });
const { width, height } = await sharp(source).metadata();

const hole = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${door.width}" height="${door.height}"><rect width="100%" height="100%" fill="#000"/></svg>`,
);

await sharp(source)
  .ensureAlpha()
  .composite([{ input: hole, left: door.left, top: door.top, blend: 'dest-out' }])
  .webp({ quality: 76, alphaQuality: 100 })
  .toFile(outDir + 'entree-facade.webp');

const leftWidth = door.seam - door.left;
await sharp(source)
  .extract({ left: door.left, top: door.top, width: leftWidth, height: door.height })
  .webp({ quality: 88 })
  .toFile(outDir + 'porte-gauche.webp');
await sharp(source)
  .extract({ left: door.seam, top: door.top, width: door.width - leftWidth, height: door.height })
  .webp({ quality: 88 })
  .toFile(outDir + 'porte-droite.webp');

const pct = (value, total) => ((value / total) * 100).toFixed(3) + '%';
console.log('photo', `${width}x${height}`, 'ratio', (width / height).toFixed(4));
console.log('doorway  left', pct(door.left, width), 'top', pct(door.top, height));
console.log('doorway  width', pct(door.width, width), 'height', pct(door.height, height));
console.log('centre   x', pct(door.left + door.width / 2, width), 'y', pct(door.top + door.height / 2, height));
console.log('left leaf width', pct(leftWidth, door.width));
