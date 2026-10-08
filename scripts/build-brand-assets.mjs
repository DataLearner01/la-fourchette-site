// Share image and touch icon, written to public/.
//   node scripts/build-brand-assets.mjs
import sharp from 'sharp';

// The card shown when a link to the site is shared (WhatsApp, Facebook, X):
// the entrance, with its sign, at the standard 1200 x 630.
await sharp('src/assets/graded/hero-entree.jpg')
  .extract({ left: 240, top: 150, width: 1520, height: 798 })
  .resize(1200, 630)
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile('public/og.jpg');

// Home-screen icon for phones: the pink bow tie on black.
await sharp('public/favicon.svg', { density: 600 }).resize(180, 180).png().toFile('public/apple-touch-icon.png');

console.log('public/og.jpg and public/apple-touch-icon.png written');
