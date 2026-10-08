// Navigation checks: direct URLs, tab clicks, back/forward, refresh,
// language switching and the phone menu.
//   node scripts/check-nav.mjs [baseUrl]
import puppeteer from 'puppeteer-core';

const base = process.argv[2] ?? 'http://127.0.0.1:4321';
const routes = {
  home: { fr: '/', en: '/en/' },
  menu: { fr: '/la-carte', en: '/en/menu' },
  bar: { fr: '/bar-et-cave', en: '/en/bar-cellar' },
  lounge: { fr: '/le-lounge', en: '/en/lounge' },
  house: { fr: '/la-maison', en: '/en/the-house' },
  reservation: { fr: '/reservation', en: '/en/reservation' },
};
const order = Object.keys(routes);
const same = (a, b) => a.replace(/\/$/, '') === b.replace(/\/$/, '');

let failures = 0;
const check = (label, ok, detail = '') => {
  if (!ok) failures++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? `  (${detail})` : ''}`);
};

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
});

const newPage = async ({ lang = 'fr', width = 1440, height = 900, mobile = false } = {}) => {
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  await page.setViewport({ width, height, isMobile: mobile, hasTouch: mobile });
  await page.evaluateOnNewDocument((code) => {
    Object.defineProperty(navigator, 'language', { get: () => code });
  }, lang);
  return page;
};

// Page changes are animated; wait for the transition before the next action.
const settle = () => new Promise((resolve) => setTimeout(resolve, 900));

const state = async (page) => {
  await settle();
  return page.evaluate(() => ({
    path: location.pathname,
    lang: document.documentElement.lang,
    h1: document.querySelector('h1')?.textContent.trim().replace(/\s+/g, ' ') ?? '',
    current: [...document.querySelectorAll('.primary-nav [aria-current="page"]')].map((a) =>
      a.getAttribute('href'),
    ),
    menuOpen: document.getElementById('site-menu')?.open ?? false,
  }));
};

try {
  // 1. Every address opens directly, in the right language, with its own tab marked.
  {
    const page = await newPage();
    for (const lang of ['fr', 'en']) {
      for (const key of order) {
        const path = routes[key][lang];
        const response = await page.goto(base + path, { waitUntil: 'domcontentloaded' });
        const s = await state(page);
        check(
          `direct ${path}`,
          response.status() === 200 &&
            same(s.path, path) &&
            s.lang === lang &&
            s.current.length === 1 &&
            same(s.current[0], path) &&
            s.h1.length > 0,
          `status ${response.status()}, h1 "${s.h1}"`,
        );
      }
    }
    await page.close();
  }

  // 2. Clicking through the tabs, then back, forward and refresh.
  {
    const page = await newPage();
    await page.goto(base + '/', { waitUntil: 'networkidle0' });
    for (const key of order.slice(1)) {
      const path = routes[key].fr;
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
        page.click(`.primary-nav a[href="${path}"]`),
      ]);
      const s = await state(page);
      check(`click to ${path}`, same(s.path, path) && same(s.current[0] ?? '', path));
    }
    await page.goBack({ waitUntil: 'domcontentloaded' });
    check('back', same((await state(page)).path, routes.house.fr));
    await page.goBack({ waitUntil: 'domcontentloaded' });
    check('back again', same((await state(page)).path, routes.lounge.fr));
    await page.goForward({ waitUntil: 'domcontentloaded' });
    check('forward', same((await state(page)).path, routes.house.fr));
    await page.reload({ waitUntil: 'domcontentloaded' });
    const s = await state(page);
    check('refresh keeps the page', same(s.path, routes.house.fr) && same(s.current[0] ?? '', routes.house.fr));
    await page.close();
  }

  // 3. Language: the switch keeps the same page, and the choice is remembered.
  {
    const page = await newPage();
    await page.goto(base + routes.bar.fr, { waitUntil: 'networkidle0' });
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.click('.site-header__lang a[data-set-lang="en"]'),
    ]);
    check('FR to EN keeps the page', same((await state(page)).path, routes.bar.en));
    await page.goto(base + '/', { waitUntil: 'networkidle0' });
    check('English choice is remembered at /', same((await state(page)).path, routes.home.en));
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.click('.site-header__lang a[data-set-lang="fr"]'),
    ]);
    check('EN to FR returns to French', same((await state(page)).path, routes.home.fr));
    await page.reload({ waitUntil: 'networkidle0' });
    check('French choice is remembered', same((await state(page)).path, routes.home.fr));
    await page.close();
  }

  // 4. First visit from an English-set browser.
  {
    const page = await newPage({ lang: 'en-GB' });
    await page.goto(base + '/', { waitUntil: 'networkidle0' });
    check('English browser opens / in English', same((await state(page)).path, routes.home.en));
    await page.goto(base + routes.menu.fr + '#plats', { waitUntil: 'networkidle0' });
    const hash = await page.evaluate(() => location.hash);
    check(
      'English browser on a deep French link',
      same((await state(page)).path, routes.menu.en) && hash === '#plats',
      `hash ${hash}`,
    );
    await page.close();

    const french = await newPage({ lang: 'fr-FR' });
    await french.goto(base + '/', { waitUntil: 'networkidle0' });
    check('French browser stays in French', same((await state(french)).path, routes.home.fr));
    await french.close();
  }

  // 5. Phone menu.
  {
    const page = await newPage({ width: 390, height: 844, mobile: true });
    await page.goto(base + '/', { waitUntil: 'networkidle0' });
    const barVisible = await page.evaluate(
      () => getComputedStyle(document.querySelector('.primary-nav')).display !== 'none',
    );
    check('phone hides the desktop tabs', !barVisible);
    await page.click('[data-menu-open]');
    check('menu opens', (await state(page)).menuOpen);
    const links = await page.$$eval('#site-menu nav a', (items) => items.map((a) => a.getAttribute('href')));
    check('menu lists the six pages', links.length === 6, links.join(' '));
    await page.keyboard.press('Escape');
    check('Escape closes the menu', !(await state(page)).menuOpen);
    await page.click('[data-menu-open]');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.click(`#site-menu nav a[href="${routes.lounge.fr}"]`),
    ]);
    const s = await state(page);
    check('menu link opens the page, menu closed', same(s.path, routes.lounge.fr) && !s.menuOpen);
    await page.goBack({ waitUntil: 'domcontentloaded' });
    const back = await state(page);
    check('back from a menu link', same(back.path, routes.home.fr) && !back.menuOpen);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    check('no sideways scroll on phone', !overflow);
    await page.close();
  }
  // 6. Menu categories: switch in place, shareable address, survive a language change.
  {
    const active = (page) =>
      page.evaluate(() => ({
        hash: location.hash,
        path: location.pathname,
        shown: [...document.querySelectorAll('[data-panel]')]
          .filter((panel) => getComputedStyle(panel).display !== 'none')
          .map((panel) => panel.id),
        selected: document.querySelector('[data-tab][aria-selected="true"]')?.getAttribute('href'),
      }));

    const page = await newPage();
    await page.goto(base + routes.menu.fr, { waitUntil: 'networkidle0' });
    let s = await active(page);
    check('La Carte opens on the first category', s.shown.join() === 'entrees' && s.selected === '#entrees', s.shown.join());

    await page.click('[data-tab][href="#plats"]');
    s = await active(page);
    check('category tab switches in place', s.shown.join() === 'plats' && s.hash === '#plats' && same(s.path, routes.menu.fr));

    await page.reload({ waitUntil: 'networkidle0' });
    s = await active(page);
    check('refresh keeps the category', s.shown.join() === 'plats' && s.selected === '#plats');

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
      page.click('.site-header__lang a[data-set-lang="en"]'),
    ]);
    await settle();
    s = await active(page);
    check('language switch keeps the category', same(s.path, routes.menu.en) && s.shown.join() === 'plats', `${s.path}${s.hash}`);

    await page.goto(base + routes.bar.fr + '#champagnes', { waitUntil: 'networkidle0' });
    s = await active(page);
    check('direct link to a bar category', s.shown.join() === 'champagnes' && s.selected === '#champagnes', s.shown.join());

    await page.focus('[data-tab][aria-selected="true"]');
    await page.keyboard.press('ArrowLeft');
    s = await active(page);
    check('arrow keys move between categories', s.shown.join() === 'vins' && s.hash === '#vins', s.shown.join());

    await page.goBack({ waitUntil: 'domcontentloaded' });
    await settle();
    s = await active(page);
    check('back leaves the page instead of stepping through categories', same(s.path, routes.menu.en), s.path);
    await page.close();
  }

  // 7. Booking form: validation, confirmation, nothing sent.
  {
    const page = await newPage();
    const requests = [];
    page.on('request', (request) => request.method() !== 'GET' && requests.push(request.url()));
    await page.goto(base + routes.reservation.fr, { waitUntil: 'networkidle0' });

    await page.click('[data-booking] button[type="submit"]');
    const errors = await page.$$eval('.field__error', (items) => items.filter((item) => item.textContent.trim()).length);
    const stillForm = await page.$eval('[data-confirm]', (panel) => panel.hidden);
    check('empty form shows its errors and stays', errors >= 4 && stillForm, `${errors} errors`);

    const tomorrow = await page.evaluate(() => {
      const date = new Date(Date.now() + 86400000);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    });
    await page.$eval('#booking-date', (input, value) => { input.value = value; }, tomorrow);
    await page.select('#booking-time', '20:00');
    await page.select('#booking-guests', '4');
    await page.type('#booking-name', 'Test Demo');
    await page.type('#booking-phone', '+237 6 00 00 00 00');
    await page.click('[data-booking] button[type="submit"]');

    const result = await page.evaluate(() => ({
      confirmShown: !document.querySelector('[data-confirm]').hidden,
      formHidden: document.querySelector('[data-booking]').hidden,
      rows: [...document.querySelectorAll('[data-confirm-list] dd')].map((item) => item.textContent),
      whatsapp: document.querySelector('[data-confirm-whatsapp]').href,
    }));
    check(
      'filled form shows the confirmation',
      result.confirmShown && result.formHidden && result.rows.includes('Test Demo') && result.rows.some((row) => row.includes('20 h')),
      result.rows.join(' | '),
    );
    check('WhatsApp link carries the request', result.whatsapp.includes('text=') && decodeURIComponent(result.whatsapp).includes('Test Demo'));
    check('the form sends nothing', requests.length === 0, requests.join(' '));

    await page.click('[data-confirm-edit]');
    const back = await page.evaluate(() => ({
      formShown: !document.querySelector('[data-booking]').hidden,
      name: document.querySelector('#booking-name').value,
    }));
    check('"modify" returns to the form with its values', back.formShown && back.name === 'Test Demo');
    await page.close();
  }
} finally {
  await browser.close();
}

console.log(failures ? `\n${failures} check(s) failed` : '\nAll navigation checks passed');
process.exit(failures ? 1 : 0);
