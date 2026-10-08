// Reports photo dimensions and samples the bow-tie pink from the original logo.
import sharp from 'sharp';
import { readdirSync } from 'node:fs';

const dir = 'src/assets/photos/';
for (const f of readdirSync(dir)) {
  const m = await sharp(dir + f).metadata();
  console.log(f, `${m.width}x${m.height}`);
}

const logo = sharp('../La Fourchette/lafourchette_logo.jpg');
const { data, info } = await logo.raw().toBuffer({ resolveWithObject: true });
const pinks = [];
for (let i = 0; i < data.length; i += info.channels) {
  const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
  if (r > 150 && r - g > 90 && b > 60) pinks.push([r, g, b]);
}
const hex = (p) => '#' + p.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
const avg = [0, 1, 2].map((c) => pinks.reduce((s, p) => s + p[c], 0) / pinks.length);
pinks.sort((a, c) => c[0] - c[1] - (a[0] - a[1]));
console.log('logo', `${info.width}x${info.height}`, 'pink avg', hex(avg), 'most saturated', hex(pinks[0]));
