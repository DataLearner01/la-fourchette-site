import type { Localised } from '../data/format';

// DEMO CONTENT. Only the dishes marked `fromPhoto` were photographed at
// La Fourchette; every other dish, and every food price, is an example to be
// replaced with the restaurant's own menu.

export interface MenuItem {
  name: Localised;
  note?: Localised;
  price?: number;
  diet?: 'vegetarian' | 'vegan';
  fromPhoto?: boolean;
}

export interface MenuGroup {
  title?: Localised;
  items: MenuItem[];
}

export interface MenuCategory {
  id: string;
  label: Localised;
  intro?: Localised;
  groups: MenuGroup[];
}

const from = {
  cameroon: { fr: 'Du Cameroun', en: 'From Cameroon' },
  france: { fr: 'De France', en: 'From France' },
  italy: { fr: 'D’Italie', en: 'From Italy' },
  china: { fr: 'De Chine', en: 'From China' },
} satisfies Record<string, Localised>;

export const dietLabels = {
  vegetarian: { fr: 'végétarien', en: 'vegetarian' },
  vegan: { fr: 'végétalien', en: 'vegan' },
} satisfies Record<string, Localised>;

export const foodMenu: MenuCategory[] = [
  {
    id: 'entrees',
    label: { fr: 'Entrées', en: 'Starters' },
    intro: {
      fr: 'Pour ouvrir l’appétit, d’ici ou d’ailleurs.',
      en: 'To start, from here or from further afield.',
    },
    groups: [
      {
        title: from.cameroon,
        items: [
          {
            name: { fr: 'Soya de bœuf', en: 'Beef soya' },
            note: { fr: 'Brochettes grillées aux épices du pays', en: 'Skewers grilled with local spices' },
            price: 5000,
          },
          {
            name: { fr: 'Pepper soup de poisson', en: 'Fish pepper soup' },
            note: { fr: 'Bouillon relevé, herbes fraîches', en: 'Spiced broth, fresh herbs' },
            price: 5500,
          },
        ],
      },
      {
        title: from.france,
        items: [
          {
            name: { fr: 'Avocat aux crevettes, sauce cocktail', en: 'Avocado and prawns, cocktail sauce' },
            note: { fr: 'Avocat en éventail, crevettes, œuf dur', en: 'Fanned avocado, prawns, boiled egg' },
            price: 6500,
            fromPhoto: true,
          },
          {
            name: { fr: 'Velouté de légumes de saison', en: 'Seasonal vegetable soup' },
            note: { fr: 'Crème légère, croûtons', en: 'Light cream, croutons' },
            price: 4500,
            diet: 'vegetarian',
          },
        ],
      },
      {
        title: from.italy,
        items: [
          {
            name: { fr: 'Tomates et mozzarella', en: 'Tomato and mozzarella' },
            note: { fr: 'Basilic, huile d’olive', en: 'Basil, olive oil' },
            price: 5500,
            diet: 'vegetarian',
          },
          {
            name: { fr: 'Carpaccio de bœuf', en: 'Beef carpaccio' },
            note: { fr: 'Copeaux de parmesan, roquette', en: 'Parmesan shavings, rocket' },
            price: 7000,
          },
        ],
      },
      {
        title: from.china,
        items: [
          {
            name: { fr: 'Nems au poulet', en: 'Chicken spring rolls' },
            note: { fr: 'Quatre pièces, sauce aigre-douce', en: 'Four pieces, sweet and sour sauce' },
            price: 5000,
          },
          {
            name: { fr: 'Raviolis vapeur aux crevettes', en: 'Steamed prawn dumplings' },
            note: { fr: 'Quatre pièces, sauce soja', en: 'Four pieces, soy sauce' },
            price: 5500,
          },
        ],
      },
    ],
  },
  {
    id: 'plats',
    label: { fr: 'Plats', en: 'Mains' },
    intro: {
      fr: 'Quatre cuisines, une seule brigade.',
      en: 'Four cuisines, one kitchen team.',
    },
    groups: [
      {
        title: from.cameroon,
        items: [
          {
            name: { fr: 'Ndolé aux crevettes', en: 'Ndolé with prawns' },
            note: { fr: 'Feuilles de ndolé, arachide, plantains mûrs', en: 'Ndolé leaves, groundnut, ripe plantain' },
            price: 11000,
          },
          {
            name: { fr: 'Poulet DG', en: 'Poulet DG' },
            note: { fr: 'Poulet fermier, plantains, légumes', en: 'Free-range chicken, plantain, vegetables' },
            price: 12000,
          },
          {
            name: { fr: 'Poisson braisé', en: 'Grilled whole fish' },
            note: { fr: 'Bar entier, sauce verte, bâtons de manioc', en: 'Whole bass, green sauce, cassava sticks' },
            price: 13000,
          },
          {
            name: { fr: 'Sanga', en: 'Sanga' },
            note: { fr: 'Maïs frais, légumes-feuilles, noix de palme', en: 'Fresh maize, leafy greens, palm nut' },
            price: 8500,
            diet: 'vegan',
          },
        ],
      },
      {
        title: from.france,
        items: [
          {
            name: { fr: 'Magret de canard, plantains frits', en: 'Duck breast, fried plantain' },
            note: { fr: 'Magret tranché, plantains dorés', en: 'Sliced duck breast, golden plantain' },
            price: 15000,
            fromPhoto: true,
          },
          {
            name: { fr: 'Pavé de saumon, beurre blanc', en: 'Salmon, beurre blanc' },
            note: { fr: 'Légumes en ruban de courgette', en: 'Vegetables in a courgette ribbon' },
            price: 16000,
            fromPhoto: true,
          },
          {
            name: { fr: 'Filet de bœuf au poivre vert', en: 'Beef fillet, green peppercorn sauce' },
            note: { fr: 'Pommes sautées, légumes du marché', en: 'Sautéed potatoes, market vegetables' },
            price: 17000,
          },
        ],
      },
      {
        title: from.italy,
        items: [
          {
            name: { fr: 'Tagliatelles à la crème', en: 'Tagliatelle in cream' },
            note: { fr: 'Crème, champignons, parmesan', en: 'Cream, mushrooms, parmesan' },
            price: 9500,
            fromPhoto: true,
          },
          {
            name: { fr: 'Risotto aux gambas', en: 'King prawn risotto' },
            note: { fr: 'Riz arborio, gambas poêlées', en: 'Arborio rice, pan-fried king prawns' },
            price: 13000,
          },
          {
            name: { fr: 'Penne all’arrabbiata', en: 'Penne all’arrabbiata' },
            note: { fr: 'Tomate, ail, piment', en: 'Tomato, garlic, chilli' },
            price: 8000,
            diet: 'vegan',
          },
        ],
      },
      {
        title: from.china,
        items: [
          {
            name: { fr: 'Riz cantonais', en: 'Cantonese rice' },
            note: { fr: 'Œuf, petits pois, volaille', en: 'Egg, peas, chicken' },
            price: 7500,
          },
          {
            name: { fr: 'Bœuf sauté au gingembre', en: 'Beef stir-fried with ginger' },
            note: { fr: 'Ciboule, sauce soja, riz blanc', en: 'Spring onion, soy sauce, steamed rice' },
            price: 11000,
          },
          {
            name: { fr: 'Poulet aux noix de cajou', en: 'Chicken with cashew nuts' },
            note: { fr: 'Légumes croquants, riz blanc', en: 'Crisp vegetables, steamed rice' },
            price: 10500,
          },
          {
            name: { fr: 'Nouilles sautées aux légumes', en: 'Stir-fried vegetable noodles' },
            note: { fr: 'Légumes au wok, sauce soja', en: 'Wok vegetables, soy sauce' },
            price: 8000,
            diet: 'vegan',
          },
        ],
      },
    ],
  },
  {
    id: 'desserts',
    label: { fr: 'Desserts', en: 'Desserts' },
    intro: {
      fr: 'Gardez une place, ils la méritent.',
      en: 'Leave some room. They are worth it.',
    },
    groups: [
      {
        items: [
          {
            name: { fr: 'Fondant au chocolat', en: 'Chocolate fondant' },
            note: { fr: 'Cœur coulant, glace vanille', en: 'Molten centre, vanilla ice cream' },
            price: 4500,
          },
          {
            name: { fr: 'Crème brûlée à la vanille', en: 'Vanilla crème brûlée' },
            price: 4000,
          },
          {
            name: { fr: 'Tiramisu', en: 'Tiramisu' },
            note: { fr: 'Mascarpone, café, cacao', en: 'Mascarpone, coffee, cocoa' },
            price: 4500,
          },
          {
            name: { fr: 'Banane flambée au rhum', en: 'Banana flambéed in rum' },
            note: { fr: 'Glace vanille', en: 'Vanilla ice cream' },
            price: 4000,
          },
          {
            name: { fr: 'Salade de fruits du pays', en: 'Local fruit salad' },
            note: { fr: 'Ananas, papaye, mangue', en: 'Pineapple, papaya, mango' },
            price: 3500,
            diet: 'vegan',
          },
          {
            name: { fr: 'Glaces et sorbets', en: 'Ice creams and sorbets' },
            note: { fr: 'Trois boules au choix', en: 'Three scoops of your choice' },
            price: 3500,
          },
        ],
      },
    ],
  },
  {
    id: 'enfants',
    label: { fr: 'Menu enfant', en: 'Children’s menu' },
    intro: {
      fr: 'Un plat, un dessert et une boisson : 6 000 FCFA. Des chaises hautes sont à votre disposition.',
      en: 'A main, a dessert and a drink: 6 000 FCFA. High chairs are available.',
    },
    groups: [
      {
        title: { fr: 'Le plat', en: 'The main' },
        items: [
          { name: { fr: 'Émincé de poulet, frites maison', en: 'Sliced chicken, house fries' } },
          { name: { fr: 'Pâtes à la sauce tomate', en: 'Pasta in tomato sauce' }, diet: 'vegetarian' },
          { name: { fr: 'Poisson pané maison, riz', en: 'House breaded fish, rice' } },
        ],
      },
      {
        title: { fr: 'Le dessert', en: 'The dessert' },
        items: [
          { name: { fr: 'Deux boules de glace', en: 'Two scoops of ice cream' } },
          { name: { fr: 'Salade de fruits', en: 'Fruit salad' } },
        ],
      },
      {
        title: { fr: 'La boisson', en: 'The drink' },
        items: [{ name: { fr: 'Jus de fruits frais', en: 'Fresh fruit juice' } }],
      },
    ],
  },
];

export const foodMenuNote: Localised = {
  fr: 'Carte de démonstration. Hormis les plats photographiés à La Fourchette, les intitulés et les prix sont donnés à titre d’exemple. Prix en FCFA.',
  en: 'Demonstration menu. Apart from the dishes photographed at La Fourchette, the names and prices are examples. Prices in FCFA.',
};
