import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--lang=fr'] });
const page = await browser.newPage();
await page.setViewport({ width: 1366, height: 768 });
// JavaScript off: pictures must still show.
for (const js of [true, false]) {
  await page.setJavaScriptEnabled(js);
  for (const path of ['/', '/la-carte', '/bar-et-cave', '/le-lounge', '/la-maison', '/reservation', '/en/the-house']) {
    await page.goto('http://127.0.0.1:4322' + path, { waitUntil: 'networkidle0' });
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += 500) { await page.evaluate((t) => window.scrollTo(0, t), y); await new Promise((r) => setTimeout(r, 120)); }
    const report = await page.evaluate(() => {
      const imgs = [...document.querySelectorAll('main img')].filter((i) => i.offsetParent !== null);
      const broken = imgs.filter((i) => !(i.complete && i.naturalWidth > 0)).length;
      const hidden = [...document.querySelectorAll('main .reveal')].filter((f) => f.offsetParent !== null && getComputedStyle(f).clipPath.includes('100%')).length;
      return { shown: imgs.length, broken, hidden };
    });
    console.log(`${js ? 'JS on ' : 'JS off'} ${path.padEnd(16)} pictures ${report.shown}, not loaded ${report.broken}, still hidden ${report.hidden}`);
  }
}
await browser.close();
