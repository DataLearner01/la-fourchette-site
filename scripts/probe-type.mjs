import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--lang=fr'] });
for (const url of process.argv.slice(2)) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle0' });
  console.log(url, await page.evaluate(async () => {
    await document.fonts.ready;
    const span = document.createElement('span');
    span.textContent = 'Vous pouvez commencer par un avocat aux crevettes';
    span.style.cssText = 'position:absolute;white-space:nowrap;left:0;top:0';
    document.body.appendChild(span);
    const s = getComputedStyle(span);
    return JSON.stringify({ width: Math.round(span.getBoundingClientRect().width), size: s.fontSize, spacing: s.letterSpacing, rendering: s.textRendering, faces: [...document.fonts].filter((f) => f.family.includes('Jost')).map((f) => `${f.status} ${f.unicodeRange.slice(0, 14)}`).join(' / ') });
  }));
  await page.close();
}
await browser.close();
