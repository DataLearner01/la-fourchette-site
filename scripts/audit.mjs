// Speed and accessibility audit of the built site.
//   1. npm run build
//   2. npx astro preview --port 4322      (in another window)
//   3. node scripts/audit.mjs [baseUrl]
//
// Speed is measured twice per page: on a laptop with no throttling, and as a
// mid-range phone on a slow 4G connection (the profile Lighthouse uses).
// Accessibility runs the axe-core WCAG 2.1 A and AA rules, contrast included.
import { readFileSync } from 'node:fs';
import puppeteer from 'puppeteer-core';

const base = process.argv[2] ?? 'http://127.0.0.1:4322';
const paths = (process.env.AUDIT_PATHS ?? '/,/la-carte,/bar-et-cave,/le-lounge,/la-maison,/reservation,/en/,/en/menu').split(',');
const only = process.env.AUDIT_ONLY; // 'speed' or 'access' to run one half
const axeSource = readFileSync('node_modules/axe-core/axe.min.js', 'utf8');

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--lang=fr'],
});

async function measure(path, profile) {
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  const client = await page.createCDPSession();
  if (profile === 'phone') {
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await client.send('Network.enable');
    if (!process.env.NO_NET) await client.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 150,
      downloadThroughput: (1.6 * 1024 * 1024) / 8,
      uploadThroughput: (750 * 1024) / 8,
    });
    // Lighthouse slows the processor 4x on a fast computer. On a slow one that
    // overstates the delay, so the rate can be set: CPU_RATE=1 node scripts/audit.mjs
    await client.send('Emulation.setCPUThrottlingRate', { rate: Number(process.env.CPU_RATE ?? 4) });
  } else {
    await page.setViewport({ width: 1366, height: 768 });
  }
  await page.evaluateOnNewDocument((lang) => {
    Object.defineProperty(navigator, 'language', { get: () => lang });
    window.__lcp = 0;
    window.__cls = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) window.__lcp = entry.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__cls += entry.value;
    }).observe({ type: 'layout-shift', buffered: true });
  }, path.startsWith('/en') ? 'en' : 'fr');

  await page.goto(base + path, { waitUntil: 'networkidle0', timeout: 120000 });
  const result = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const resources = performance.getEntriesByType('resource');
    const bytes = resources.reduce((sum, entry) => sum + (entry.transferSize || entry.encodedBodySize || 0), nav.transferSize || 0);
    return {
      fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? 0,
      lcp: window.__lcp,
      cls: window.__cls,
      load: nav.loadEventEnd,
      kb: bytes / 1024,
      requests: resources.length + 1,
    };
  });
  await context.close();
  return result;
}

async function accessibility(path, width) {
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  await page.setViewport({ width, height: 900, isMobile: width < 500, hasTouch: width < 500 });
  // Settled state: no element is caught half-faded by an entrance animation.
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.evaluateOnNewDocument((lang) => {
    Object.defineProperty(navigator, 'language', { get: () => lang });
  }, path.startsWith('/en') ? 'en' : 'fr');
  await page.goto(base + path, { waitUntil: 'networkidle0', timeout: 120000 });
  await page.evaluate(axeSource);
  const violations = await page.evaluate(async () => {
    const report = await window.axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
    });
    return report.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      count: violation.nodes.length,
      example: violation.nodes[0].target.join(' '),
      detail: violation.nodes[0].failureSummary?.split('\n').slice(1, 2).join(' ').trim(),
    }));
  });
  await context.close();
  return violations;
}

const ms = (value) => `${(value / 1000).toFixed(2)}s`;
let failures = 0;

console.log('SPEED');
for (const path of only === 'access' ? [] : paths) {
  for (const profile of ['laptop', 'phone']) {
    const r = await measure(path, profile);
    console.log(
      `${path.padEnd(14)} ${profile.padEnd(6)} first paint ${ms(r.fcp)}  largest paint ${ms(r.lcp)}  loaded ${ms(r.load)}  shift ${r.cls.toFixed(3)}  ${r.kb.toFixed(0)} KB in ${r.requests} requests`,
    );
  }
}

console.log('\nACCESSIBILITY (WCAG 2.1 A + AA)');
for (const path of only === 'speed' ? [] : paths) {
  for (const width of [390, 1366]) {
    const violations = await accessibility(path, width);
    failures += violations.length;
    console.log(`${path.padEnd(14)} ${String(width).padEnd(5)} ${violations.length ? '' : 'no violations'}`);
    for (const v of violations) console.log(`    ${v.impact} ${v.id} x${v.count}: ${v.example} | ${v.detail}`);
  }
}

await browser.close();
console.log(failures ? `\n${failures} accessibility issue type(s) to fix` : '\nNo accessibility violations found');
