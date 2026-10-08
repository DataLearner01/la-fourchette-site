import type { Localised } from '../data/format';
import type { MenuCategory } from './menu';

// A selection transcribed from photographs of La Fourchette's printed bar and
// wine lists, with the prices printed there (FCFA). Lines that were cut off or
// hidden by glare in the photographs are left out rather than guessed.

const same = (text: string): Localised => ({ fr: text, en: text });

export const barMenu: MenuCategory[] = [
  {
    id: 'cocktails',
    label: same('Cocktails'),
    intro: {
      fr: 'Les classiques, préparés au bar du lounge.',
      en: 'The classics, made at the lounge bar.',
    },
    groups: [
      {
        items: [
          {
            name: same('Mojito'),
            note: { fr: 'Menthe, rhum, citron, soda, sucre de canne', en: 'Mint, rum, lime, soda, cane sugar' },
            price: 6000,
          },
          {
            name: same('Ti Punch'),
            note: { fr: 'Rhum blanc, citron, sucre de canne', en: 'White rum, lime, cane sugar' },
            price: 6000,
          },
          {
            name: same('Caïpirinha'),
            note: { fr: 'Cachaça, citron vert, sucre de canne', en: 'Cachaça, lime, cane sugar' },
            price: 6000,
          },
          {
            name: same('Margarita'),
            note: { fr: 'Tequila, triple sec, jus de citron', en: 'Tequila, triple sec, lemon juice' },
            price: 6000,
          },
          {
            name: same('Piña Colada'),
            note: { fr: 'Ananas, Malibu, rhum, crème sucrée', en: 'Pineapple, Malibu, rum, sweet cream' },
            price: 7000,
          },
          {
            name: same('Saint Germain'),
            note: { fr: 'Liqueur de sureau, orange glacée, soda', en: 'Elderflower liqueur, iced orange, soda' },
            price: 7000,
          },
          {
            name: same('Blue Lagoon'),
            note: { fr: 'Vodka, curaçao bleu, jus de citron', en: 'Vodka, blue curaçao, lemon juice' },
            price: 7000,
          },
          {
            name: same('Scorpion'),
            note: {
              fr: 'Rhum blanc, cognac, jus d’orange, orgeat, citron, menthe fraîche',
              en: 'White rum, cognac, orange juice, orgeat, lemon, fresh mint',
            },
            price: 8000,
          },
          {
            name: same('Kir Royal'),
            price: 12000,
          },
        ],
      },
    ],
  },
  {
    id: 'sans-alcool',
    label: { fr: 'Sans alcool', en: 'Alcohol-free' },
    intro: {
      fr: 'Neuf cocktails sans alcool figurent à la carte. En voici six.',
      en: 'There are nine alcohol-free cocktails on the list. Here are six.',
    },
    groups: [
      {
        items: [
          {
            name: same('Virgin Mojito'),
            note: { fr: 'Menthe fraîche, jus de citron, sucre de canne, soda', en: 'Fresh mint, lemon juice, cane sugar, soda' },
            price: 4000,
          },
          {
            name: same('Bambou Cooler'),
            note: { fr: 'Ananas, orange, citron, fruit de la passion, grenadine', en: 'Pineapple, orange, lemon, passion fruit, grenadine' },
            price: 4000,
          },
          {
            name: same('Cocktail Rio'),
            note: { fr: 'Jus d’orange, Sprite, grenadine, rondelles de citron', en: 'Orange juice, Sprite, grenadine, lemon slices' },
            price: 4000,
          },
          {
            name: same('Femme Fatale'),
            note: { fr: 'Ananas, citron, orgeat, mangue, grenadine', en: 'Pineapple, lemon, orgeat, mango, grenadine' },
            price: 4500,
          },
          {
            name: same('Fleur d’Amour'),
            note: { fr: 'Nectar de banane, mangue, ananas, coco râpée', en: 'Banana nectar, mango, pineapple, grated coconut' },
            price: 4500,
          },
          {
            name: same('Virgin Colada'),
            note: { fr: 'Lait de coco, jus d’ananas, jus d’orange', en: 'Coconut milk, pineapple juice, orange juice' },
            price: 4500,
          },
        ],
      },
    ],
  },
  {
    id: 'spiritueux',
    label: { fr: 'Spiritueux', en: 'Spirits' },
    intro: {
      fr: 'Gins, rhums, vodkas et apéritifs.',
      en: 'Gins, rums, vodkas and aperitifs.',
    },
    groups: [
      {
        items: [
          { name: same('Ricard'), price: 3500 },
          { name: same('Porto'), price: 3500 },
          { name: same('Plymouth Gin'), price: 3500 },
          { name: same('Gin Tanqueray'), price: 5000 },
          { name: same('Rhum Havana Club 7 ans'), price: 6500 },
          { name: same('Rhum Zacapa'), price: 9500 },
          { name: same('Vodka Absolut'), price: 3500 },
          { name: same('Vodka Belvedere'), price: 7500 },
        ],
      },
    ],
  },
  {
    id: 'whiskies',
    label: same('Whiskies'),
    intro: {
      fr: 'Plus de quarante références, classées par âge sur la carte.',
      en: 'More than forty whiskies, listed by age on the menu.',
    },
    groups: [
      {
        title: { fr: 'Les classiques', en: 'The classics' },
        items: [
          { name: same('Ballantine’s Finest'), price: 3500 },
          { name: same('Johnnie Walker Red Label'), price: 3500 },
          { name: same('Jameson'), note: same('Irish whiskey'), price: 5000 },
          { name: same('Monkey Shoulder'), price: 5500 },
          { name: same('Jack Daniel’s'), price: 5500 },
        ],
      },
      {
        title: { fr: 'De 15 à 21 ans', en: 'From 15 to 21 years' },
        items: [
          { name: { fr: 'Glenfiddich 15 ans', en: 'Glenfiddich 15 years' }, price: 7000 },
          { name: { fr: 'Chivas 18 ans', en: 'Chivas 18 years' }, price: 11000 },
          { name: { fr: 'Lagavulin 16 ans', en: 'Lagavulin 16 years' }, price: 12000 },
          { name: { fr: 'Laphroaig 18 ans', en: 'Laphroaig 18 years' }, price: 12500 },
          { name: { fr: 'Royal Salute 21 ans', en: 'Royal Salute 21 years' }, price: 15000 },
          { name: same('Johnnie Walker Blue Label'), price: 17000 },
        ],
      },
      {
        title: { fr: 'Du Japon', en: 'From Japan' },
        items: [
          { name: same('Togouchi'), price: 21000 },
          { name: same('Nikka Pure Malt'), price: 21000 },
          { name: same('Hibiki'), price: 25000 },
        ],
      },
    ],
  },
  {
    id: 'vins',
    label: { fr: 'Vins', en: 'Wines' },
    intro: {
      fr: 'De Bordeaux à l’Afrique du Sud, à la bouteille ou en pichet.',
      en: 'From Bordeaux to South Africa, by the bottle or by the carafe.',
    },
    groups: [
      {
        title: { fr: 'Blancs et rosés', en: 'Whites and rosés' },
        items: [
          { name: same('Domaine Landreau'), note: same('Muscadet'), price: 18000 },
          { name: same('Riesling'), note: same('Alsace'), price: 21000 },
          { name: same('Chablis'), price: 32000 },
          { name: same('Sancerre'), price: 36000 },
          { name: same('Minuty Prestige'), note: { fr: 'Rosé de Provence', en: 'Provence rosé' }, price: 26000 },
        ],
      },
      {
        title: { fr: 'Bordeaux rouges', en: 'Red Bordeaux' },
        items: [
          { name: same('Château Goélane'), note: same('Bordeaux Supérieur'), price: 20000 },
          { name: same('Château Fonsèche'), note: same('Haut-Médoc'), price: 25000 },
          { name: same('Château Chapelle de la Trinité'), note: same('Saint-Émilion'), price: 27000 },
          { name: same('Château Baret'), note: same('Pessac-Léognan'), price: 46000 },
          { name: same('Château Pontac Lynch'), note: same('Margaux'), price: 75000 },
          { name: same('Château Batailley'), note: same('Pauillac, Grand Cru Classé'), price: 95000 },
        ],
      },
      {
        title: { fr: 'Loire, Bourgogne, Rhône', en: 'Loire, Burgundy, Rhône' },
        items: [
          { name: same('Côtes du Rhône'), price: 17000 },
          { name: same('Brouilly'), price: 28000 },
          { name: same('Châteauneuf-du-Pape'), price: 39000 },
          { name: same('Nuits-Saint-Georges'), price: 69000 },
        ],
      },
      {
        title: { fr: 'Afrique du Sud', en: 'South Africa' },
        items: [
          { name: same('Two Oceans'), note: same('Cabernet Sauvignon, Merlot'), price: 18000 },
          { name: same('Nederburg'), note: same('Cabernet Sauvignon'), price: 23000 },
          { name: same('Clos Malverne'), note: same('Pinotage Reserve'), price: 45000 },
        ],
      },
      {
        title: { fr: 'En pichet, blanc ou rouge', en: 'By the carafe, white or red' },
        items: [
          { name: same('25 cl'), price: 4000 },
          { name: same('50 cl'), price: 8000 },
          { name: { fr: '1 litre', en: '1 litre' }, price: 12000 },
        ],
      },
    ],
  },
  {
    id: 'champagnes',
    label: same('Champagnes'),
    intro: {
      fr: 'Douze cuvées à la carte, à la bouteille. La coupe est à 11 000.',
      en: 'Twelve champagnes on the list, by the bottle. A glass is 11 000.',
    },
    groups: [
      {
        items: [
          { name: same('Gratiot Brut Maison'), price: 60000 },
          { name: same('Mumm Cordon Rouge'), price: 70000 },
          { name: same('Moët & Chandon'), price: 70000 },
          { name: same('Gosset Grande Réserve'), price: 80000 },
          { name: same('Veuve Clicquot'), price: 90000 },
          { name: same('Ruinart Blanc de Blancs'), price: 110000 },
        ],
      },
    ],
  },
];

export const barMenuNote: Localised = {
  fr: 'Sélection relevée sur la carte imprimée de La Fourchette, prix en FCFA. La carte complète, avec les bières, les thés et les cafés, vous est présentée sur place.',
  en: 'A selection taken from La Fourchette’s printed list, prices in FCFA. The full list, with beers, teas and coffees, is presented at the table.',
};
