// Prints the box and a few computed styles of elements, for layout debugging.
//   node scripts/probe-layout.mjs <url> <width> <height> <selector> [selector...]
import puppeteer from 'puppeteer-core';

const [url, width, height, ...selectors] = process.argv.slice(2);
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--lang=fr'],
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: Number(width), height: Number(height) });
  await page.goto(url, { waitUntil: 'networkidle0' });
  const rows = await page.evaluate(
    (list) =>
      list.map((selector) => {
        const element = document.querySelector(selector);
        if (!element) return `${selector}: not found`;
        const box = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return `${selector}: x ${Math.round(box.x)} y ${Math.round(box.y)} w ${Math.round(box.width)} h ${Math.round(box.height)} | display ${style.display} | margin-left ${style.marginLeft} | width ${style.width} | columns ${style.gridTemplateColumns} | transform ${style.transform} | perspective ${style.perspective}`;
      }),
    selectors,
  );
  console.log(rows.join('\n'));
} finally {
  await browser.close();
}
