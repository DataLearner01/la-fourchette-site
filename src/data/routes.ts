export type Lang = 'fr' | 'en';
export type PageKey = 'home' | 'menu' | 'bar' | 'lounge' | 'house' | 'reservation';

export const langs: Lang[] = ['fr', 'en'];
export const defaultLang: Lang = 'fr';

// Order of the six top-level tabs.
export const pageOrder: PageKey[] = ['home', 'menu', 'bar', 'lounge', 'house', 'reservation'];

// One address per page and per language. French is the default and has no prefix.
export const routes: Record<PageKey, Record<Lang, string>> = {
  home: { fr: '/', en: '/en/' },
  menu: { fr: '/la-carte', en: '/en/menu' },
  bar: { fr: '/bar-et-cave', en: '/en/bar-cellar' },
  lounge: { fr: '/le-lounge', en: '/en/lounge' },
  house: { fr: '/la-maison', en: '/en/the-house' },
  reservation: { fr: '/reservation', en: '/en/reservation' },
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
