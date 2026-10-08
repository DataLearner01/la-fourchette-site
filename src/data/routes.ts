export type Lang = 'fr' | 'en';
export type PageKey = 'home' | 'menu' | 'bar' | 'lounge' | 'house' | 'reservation';

export const langs: Lang[] = ['fr', 'en'];
export const defaultLang: Lang = 'fr';

// Order of the six top-level tabs.
export const pageOrder: PageKey[] = ['home', 'menu', 'bar', 'lounge', 'house', 'reservation'];

// Folder the site is served from ('' at the root, '/la-fourchette-site' on GitHub Pages).
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');
// Prefix a root-relative path (such as '/og.jpg') with that folder.
export const withBase = (path: string) => base + path;

// One address per page and per language. French is the default and has no prefix.
export const routes: Record<PageKey, Record<Lang, string>> = {
  home: { fr: withBase('/'), en: withBase('/en/') },
  menu: { fr: withBase('/la-carte'), en: withBase('/en/menu') },
  bar: { fr: withBase('/bar-et-cave'), en: withBase('/en/bar-cellar') },
  lounge: { fr: withBase('/le-lounge'), en: withBase('/en/lounge') },
  house: { fr: withBase('/la-maison'), en: withBase('/en/the-house') },
  reservation: { fr: withBase('/reservation'), en: withBase('/en/reservation') },
};

export const navLabels: Record<PageKey, Record<Lang, string>> = {
  home: { fr: 'Accueil', en: 'Home' },
  menu: { fr: 'La Carte', en: 'Menu' },
  bar: { fr: 'Bar & Cave', en: 'Bar & Cellar' },
  lounge: { fr: 'Le Lounge', en: 'The Lounge' },
  house: { fr: 'La Maison', en: 'The House' },
  reservation: { fr: 'Réservation & Contact', en: 'Reservations & Contact' },
};

export const otherLang = (lang: Lang): Lang => (lang === 'fr' ? 'en' : 'fr');
