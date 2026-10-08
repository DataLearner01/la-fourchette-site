// Where the browser's main thread spends its time while a page loads.
//   node scripts/profile-load.mjs <url> [cpuRate]
import puppeteer from 'puppeteer-core';

// An optional third argument is CSS to inject before the page renders, to test a suspicion.
const [url, rate = '4', testCss = ''] = process.argv.slice(2);
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--lang=fr'],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const client = await page.createCDPSession();
await client.send('Emulation.setCPUThrottlingRate', { rate: Number(rate) });
await page.evaluateOnNewDocument(() => {
  window.__long = [];
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) window.__long.push([Math.round(entry.startTime), Math.round(entry.duration)]);
  }).observe({ type: 'longtask', buffered: true });
  window.__paints = [];
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) window.__paints.push([entry.name, Math.round(entry.startTime)]);
  }).observe({ type: 'paint', buffered: true });
});
if (testCss) {
  await page.evaluateOnNewDocument((css) => {
    new MutationObserver((_, observer) => {
      if (!document.head) return;
      const style = document.createElement('style');
      style.textContent = css;
      document.head.appendChild(style);
      observer.disconnect();
    }).observe(document, { childList: true, subtree: true });
  }, testCss);
}
await page.goto(url, { waitUntil: 'networkidle0', timeout: 120000 });
const m = await page.metrics();
const extra = await page.evaluate(() => ({
  long: window.__long,
  paints: window.__paints,
  nav: (({ responseEnd, domInteractive, domContentLoadedEventEnd, loadEventEnd }) => ({
    responseEnd: Math.round(responseEnd),
    domInteractive: Math.round(domInteractive),
    domContentLoaded: Math.round(domContentLoadedEventEnd),
    load: Math.round(loadEventEnd),
  }))(performance.getEntriesByType('navigation')[0]),
  slowest: performance
    .getEntriesByType('resource')
    .map((r) => [r.name.split('/').pop().slice(0, 40), Math.round(r.startTime), Math.round(r.responseEnd)])
    .sort((a, b) => b[2] - a[2])
    .slice(0, 6),
}));
console.log('script', m.ScriptDuration.toFixed(2), 'layout', m.LayoutDuration.toFixed(2), 'style', m.RecalcStyleDuration.toFixed(2), 'all tasks', m.TaskDuration.toFixed(2));
if (!process.env.BRIEF) {
  console.log('navigation', JSON.stringify(extra.nav));
  console.log('paints', JSON.stringify(extra.paints));
  console.log('long tasks [start, duration]', JSON.stringify(extra.long));
  console.log('last resources [name, start, end]', JSON.stringify(extra.slowest));
}
await browser.close();
