// Crops a region of a photo and overlays a labelled pixel grid, to read coordinates off it.
//   node scripts/measure.mjs <image> <out> <left> <top> <width> <height> [zoom] [gridStep]
import sharp from 'sharp';

const [src, out, l, t, w, h, z = '2', step = '20'] = process.argv.slice(2);
const [left, top, width, height, zoom, grid] = [l, t, w, h, z, step].map(Number);

let lines = '';
for (let x = Math.ceil(left / grid) * grid; x < left + width; x += grid) {
  const px = (x - left) * zoom;
  const major = x % (grid * 5) === 0;
  lines += `<line x1="${px}" y1="0" x2="${px}" y2="${height * zoom}" stroke="${major ? '#00ffff' : '#00ffff55'}" stroke-width="1"/>`;
  if (major) lines += `<text x="${px + 2}" y="12" fill="#ffff00" font-size="12" font-family="Arial">${x}</text>`;
}
for (let y = Math.ceil(top / grid) * grid; y < top + height; y += grid) {
  const py = (y - top) * zoom;
  const major = y % (grid * 5) === 0;
  lines += `<line x1="0" y1="${py}" x2="${width * zoom}" y2="${py}" stroke="${major ? '#00ffff' : '#00ffff55'}" stroke-width="1"/>`;
  if (major) lines += `<text x="2" y="${py - 2}" fill="#ffff00" font-size="12" font-family="Arial">${y}</text>`;
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width * zoom}" height="${height * zoom}">${lines}</svg>`;

await sharp(src)
  .extract({ left, top, width, height })
  .resize(width * zoom, height * zoom, { kernel: 'nearest' })
  .composite([{ input: Buffer.from(svg) }])
  .jpeg({ quality: 88 })
  .toFile(out);
console.log(out);
