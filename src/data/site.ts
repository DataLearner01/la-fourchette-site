import type { Lang } from './routes';

type Localised = Record<Lang, string>;

// Verified details.
export const venue = {
  name: 'La Fourchette',
  tagline: { fr: 'Restaurant & bar lounge', en: 'Restaurant & bar lounge' } as Localised,
  street: 'Rue du Prince de Galles',
  city: 'Douala',
  country: { fr: 'Cameroun', en: 'Cameroon' } as Localised,
  currency: 'FCFA',
};

// DEMO VALUES — everything in this block is a placeholder.
// Replace with the restaurant's own details; nothing else needs to change.
export const demo = {
  phone: { display: '+237 6 00 00 00 00', href: 'tel:+237600000000' },
  whatsapp: 'https://wa.me/237600000000',
  email: 'bonjour@lafourchette.example',
  hours: [
    {
      label: { fr: 'Déjeuner', en: 'Lunch' } as Localised,
      value: { fr: 'Tous les jours, 12 h – 15 h', en: 'Every day, 12 pm – 3 pm' } as Localised,
    },
    {
      label: { fr: 'Dîner', en: 'Dinner' } as Localised,
      value: { fr: 'Tous les jours, 19 h – 23 h', en: 'Every day, 7 pm – 11 pm' } as Localised,
    },
    {
      label: { fr: 'Lounge', en: 'Lounge' } as Localised,
      value: { fr: 'Tous les jours, 18 h – minuit', en: 'Every day, 6 pm – midnight' } as Localised,
    },
  ],
  socials: [
    { name: 'Instagram', href: '#' },
    { name: 'Facebook', href: '#' },
  ],
};

export const common = {
  fr: {
    skip: 'Aller au contenu',
    menuOpen: 'Menu',
    menuClose: 'Fermer',
    navLabel: 'Navigation principale',
    menuTitle: 'Menu du site',
    langLabel: 'Langue',
    reserveShort: 'Réserver',
    callShort: 'Appeler',
    quickActions: 'Actions rapides',
    notFoundTitle: 'Cette table n’existe pas.',
    notFoundText: 'La page que vous cherchez a été déplacée ou n’a jamais existé. Voici où aller à la place.',
    notFoundHome: 'Retour à l’accueil',
    call: 'Appeler le restaurant',
    whatsapp: 'Écrire sur WhatsApp',
    address: 'Adresse',
    hours: 'Horaires',
    contact: 'Contact',
    follow: 'Suivre',
    pages: 'Pages',
    conceptNote:
      'Site concept, présenté à titre de démonstration. Le téléphone, les horaires, les réseaux sociaux et les plats de la carte sont provisoires.',
    rights: 'La Fourchette, Douala',
    soon: 'Cette page est en cours de mise en place.',
  },
  en: {
    skip: 'Skip to content',
    menuOpen: 'Menu',
    menuClose: 'Close',
    navLabel: 'Main navigation',
    menuTitle: 'Site menu',
    langLabel: 'Language',
    reserveShort: 'Reserve',
    callShort: 'Call',
    quickActions: 'Quick actions',
    notFoundTitle: 'This table does not exist.',
    notFoundText: 'The page you are looking for has moved or never existed. Here is where to go instead.',
    notFoundHome: 'Back to the home page',
    call: 'Call the restaurant',
    whatsapp: 'Message us on WhatsApp',
    address: 'Address',
    hours: 'Opening hours',
    contact: 'Contact',
    follow: 'Follow',
    pages: 'Pages',
    conceptNote:
      'Concept site, shown as a demonstration. The phone number, opening hours, social accounts and food dishes are placeholders.',
    rights: 'La Fourchette, Douala',
    soon: 'This page is being set up.',
  },
} as const;
