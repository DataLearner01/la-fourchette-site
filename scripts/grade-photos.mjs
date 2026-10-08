// One consistent look for every photo on the site, so a mixed set of phone
// pictures reads as a single art-directed series:
//   - tighter crops that cut clutter
//   - exposure pulled toward a common level
//   - slightly lower saturation, a touch more contrast, a warm cast
//   - a soft vignette and fine grain (which also hides enlargement softness)
//
//   node scripts/grade-photos.mjs          writes src/assets/graded/*.jpg
//   node scripts/grade-photos.mjs <dir>    also writes a contact sheet to <dir>
//
// The originals in src/assets/photos are never modified.
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const photos = 'src/assets/photos/';
const outDir = 'src/assets/graded/';

// level: target average brightness (0-255). warm: strength of the warm cast.
const jobs = [
  {
    name: 'magret-plantain',
    src: photos + 'magret-plantain.jpg',
    // Drops the second plate and the diner behind it; keeps the duck and plantain.
    crop: { left: 200, top: 640, width: 1800, height: 1360 },
    level: 104,
    warm: 0.02,
  },
  {
    name: 'avocat-crevettes',
    src: photos + 'avocat-crevettes.jpg',
    crop: { left: 150, top: 120, width: 1750, height: 1312 },
    level: 108,
    warm: 0.07,
  },
  {
    name: 'cocktail',
    src: photos + 'cocktail.jpg',
    // Closer on the glass, away from the phone and fabric at the top.
    crop: { left: 230, top: 270, width: 1080, height: 1440 },
    level: 84,
    warm: 0.03,
  },
  { name: 'lounge-fauteuils', src: photos + 'large/lounge-fauteuils.jpg', level: 78, warm: 0.04 },
  {
    name: 'lounge-aquarium',
    src: photos + 'large/lounge-aquarium.jpg',
    // The aquarium and the sofa in front of it, without the television above.
    crop: { left: 660, top: 500, width: 800, height: 1000 },
    level: 84,
    warm: 0.03,
  },
  { name: 'salle-rouge', src: photos + 'large/salle-rouge.jpg', level: 108, warm: 0.04 },
  { name: 'hero-salle', src: photos + 'hero-salle.jpg', level: 106, warm: 0.04 },
  // The entrance is zoomed into on the home page, so it gets no grain or vignette.
  { name: 'hero-entree', src: photos + 'hero-entree.jpg', level: null, warm: 0.02, grain: 0, vignette: 0 },
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

async function grade(job) {
  let image = sharp(job.src);
  if (job.crop) image = image.extract(job.crop);
  const base = await image.toBuffer();
  const { width, height } = await sharp(base).metadata();

  const { channels } = await sharp(base).stats();
  const luminance = 0.2126 * channels[0].mean + 0.7152 * channels[1].mean + 0.0722 * channels[2].mean;
  const lift = job.level ? clamp(job.level / luminance, 0.82, 1.2) : 1;
  const warm = job.warm ?? 0.03;

  const layers = [];
  const vignette = job.vignette ?? 0.34;
  if (vignette) {
    layers.push({
      input: Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
          <defs><radialGradient id="v" cx="50%" cy="46%" r="75%">
            <stop offset="55%" stop-color="#000" stop-opacity="0"/>
            <stop offset="100%" stop-color="#000" stop-opacity="${vignette}"/>
          </radialGradient></defs>
          <rect width="100%" height="100%" fill="url(#v)"/>
        </svg>`,
      ),
    });
  }
  const grain = job.grain ?? 11;
  if (grain) {
    const noise = await sharp({
      create: { width, height, channels: 3, background: '#808080', noise: { type: 'gaussian', mean: 128, sigma: grain } },
    })
      .greyscale()
      .toColourspace('srgb')
      .png()
      .toBuffer();
    layers.push({ input: noise, blend: 'soft-light' });
  }

  await sharp(base)
    .modulate({ brightness: lift, saturation: 0.9 })
    .linear(1.07, -9)
    .recomb([
      [1 + warm, 0, 0],
      [0, 1, 0],
      [0, 0, 1 - warm * 1.4],
    ])
    .composite(layers)
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(`${outDir}${job.name}.jpg`);

  console.log(`${job.name.padEnd(18)} ${width}x${height}  brightness ${luminance.toFixed(0)} -> x${lift.toFixed(2)}`);
  return { name: job.name, width, height };
}

mkdirSync(outDir, { recursive: true });
const done = [];
for (const job of jobs) done.push(await grade(job));

// Optional contact sheet, to judge the set side by side.
const sheetDir = process.argv[2];
if (sheetDir) {
  mkdirSync(sheetDir, { recursive: true });
  const cell = 480;
  const columns = 4;
  const rows = Math.ceil(done.length / columns);
  const tiles = await Promise.all(
    done.map(async (photo, index) => ({
      input: await sharp(`${outDir}${photo.name}.jpg`).resize(cell, cell, { fit: 'cover' }).toBuffer(),
      left: (index % columns) * cell,
      top: Math.floor(index / columns) * cell,
    })),
  );
  const file = join(sheetDir, 'graded-sheet.jpg');
  await sharp({ create: { width: cell * columns, height: cell * rows, channels: 3, background: '#000' } })
    .composite(tiles)
    .jpeg({ quality: 86 })
    .toFile(file);
  console.log(file);
}
