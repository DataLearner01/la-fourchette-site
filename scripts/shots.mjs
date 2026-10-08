// Review screenshots, driven through the locally installed Chrome.
//
//   node scripts/shots.mjs <outDir> <name> <url> [options]
//
//   --w=1440 --h=900   viewport size
//   --dpr=1            device pixel ratio
//   --mobile           emulate a touch phone
//   --lang=fr          browser language (drives the first-visit redirect)
//   --full             capture the whole page, cut into viewport-high slices
//   --motion           keep animations on (stills default to the settled state)
//   --click=<selector> click something before the capture
//   --scroll=<0..1|Npx> scroll into the opening scene, or to a pixel position
//   --wait=<ms>        extra wait before the capture
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';

const [outDir, name, url, ...rest] = process.argv.slice(2);
const opt = Object.fromEntries(
  rest.map((arg) => {
    const [key, value] = arg.replace(/^--/, '').split('=');
    return [key, value ?? true];
  }),
);
const width = Number(opt.w ?? 1440);
const height = Number(opt.h ?? 900);
const lang = opt.lang ?? 'fr';

mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: [`--lang=${lang}`, '--hide-scrollbars'],
});

try {
  const page = await browser.newPage();
  await page.setViewport({
    width,
    height,
    deviceScaleFactor: Number(opt.dpr ?? 1),
    isMobile: Boolean(opt.mobile),
    hasTouch: Boolean(opt.mobile),
  });
  await page.emulateMediaFeatures([
    { name: 'prefers-reduced-motion', value: opt.motion ? 'no-preference' : 'reduce' },
  ]);
  await page.evaluateOnNewDocument((code) => {
    Object.defineProperty(navigator, 'language', { get: () => code });
  }, lang);

  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => message.type() === 'error' && errors.push(message.text()));

  await page.goto(url, { waitUntil: 'networkidle0', timeout: 90000 });

  if (opt.click) {
    await page.click(opt.click);
  }

  // --scroll=0.5 scrolls to that share of the opening scene; --scroll=900px to a position.
  if (opt.scroll) {
    await page.evaluate((value) => {
      if (String(value).endsWith('px')) return window.scrollTo(0, parseFloat(value));
      const scene = document.querySelector('[data-scene]');
      const stage = document.querySelector('[data-scene-stage]');
      window.scrollTo(0, (scene.offsetHeight - stage.offsetHeight) * 0.9 * Number(value));
    }, opt.scroll);
  }

  if (opt.full) {
    // Walk down the page so lazy images load and reveals fire, then come back up.
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += Math.round(height * 0.7)) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    await page.evaluate(() => window.scrollTo(0, 0));
  }

  // --hover=<selector> rests the pointer on an element, off-centre, before the capture.
  if (opt.hover) {
    const box = await (await page.$(opt.hover)).boundingBox();
    await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.3);
    await page.mouse.move(box.x + box.width * 0.22, box.y + box.height * 0.32);
  }

  await new Promise((resolve) => setTimeout(resolve, Number(opt.wait ?? 600)));

  const file = join(outDir, `${name}.png`);
  await page.screenshot({ path: file, fullPage: Boolean(opt.full) });
  const meta = await sharp(file).metadata();
  const info = await page.evaluate(() => ({
    url: location.pathname + location.hash,
    overflowX: document.documentElement.scrollWidth > window.innerWidth,
  }));
  console.log(`${name}: ${meta.width}x${meta.height}`, JSON.stringify(info));
  if (errors.length) console.log('  console errors:', errors.slice(0, 5));

  if (opt.full) {
    const step = Math.round(height * Number(opt.dpr ?? 1));
    for (let top = 0, i = 1; top < meta.height; top += step, i++) {
      const h = Math.min(step, meta.height - top);
      if (h < 40) break;
      await sharp(file)
        .extract({ left: 0, top, width: meta.width, height: h })
        .jpeg({ quality: 84 })
        .toFile(join(outDir, `${name}-${String(i).padStart(2, '0')}.jpg`));
    }
  }
} finally {
  await browser.close();
}
