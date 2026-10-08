// Home page copy. Drink names and prices come from the restaurant's printed
// menus; the food dishes named under "origins" are demo content.
export const home = {
  fr: {
    meta: {
      title: 'La Fourchette, restaurant et bar lounge à Douala',
      description:
        'Rue du Prince de Galles, à Douala : une cuisine camerounaise, française, italienne et chinoise, un bar lounge, une cave et plus de quarante whiskies.',
    },
    hero: {
      title: ['Le Cameroun', 'et le monde,', 'à la même table.'],
      hint: 'Faites défiler pour entrer',
      tagline: 'Entrez, votre table est prête.',
      primary: 'Réserver une table',
      secondary: 'Découvrir la carte',
      entranceAlt: 'Entrée de La Fourchette de nuit : porte vitrée en bois sous une marquise décorée de guirlandes lumineuses',
      roomAlt: 'Salle du restaurant : tables nappées de blanc, chaises sombres, claustras en bois sculpté et rideaux bordeaux devant de grandes fenêtres',
      factAddress: 'Rue du Prince de Galles, Douala',
      factHours: 'Ouvert tous les jours, midi et soir',
    },
    cuisine: {
      title: 'Une carte qui voyage, avec l’accent d’ici.',
      text: 'Vous pouvez commencer par un avocat aux crevettes, continuer avec un magret de canard et le voir arriver entouré de plantains frits. Chez nous, les cuisines se croisent dans la même assiette, et personne ne s’en plaint.',
      link: 'Voir toute la carte',
      origins: [
        { name: 'Cameroun', dishes: 'Ndolé, poisson braisé, poulet DG, plantains mûrs.' },
        { name: 'France', dishes: 'Magret de canard, pavé de saumon au beurre blanc, desserts de pâtissier.' },
        { name: 'Italie', dishes: 'Tagliatelles à la crème, risottos, tiramisu.' },
        { name: 'Chine', dishes: 'Nems croustillants, riz cantonais, bœuf sauté au gingembre.' },
      ],
      plates: [
        { caption: 'Magret de canard, plantains frits', alt: 'Magret de canard tranché servi avec des plantains frits, verres de vin rouge et bougie sur une nappe blanche' },
        { caption: 'Avocat et crevettes, sauce cocktail', alt: 'Timbale d’avocat et de crevettes, œuf dur et sauce cocktail sur une assiette blanche' },
      ],
    },
    bar: {
      title: 'Au bar, prenez le temps de choisir.',
      text: 'La carte compte plus de quarante whiskies, du Ballantine’s au Hibiki japonais, une cave qui va de Bordeaux à l’Afrique du Sud et douze champagnes. Si vous préférez commencer léger, neuf cocktails sans alcool vous attendent.',
      listLabel: 'Quelques repères, prix en FCFA',
      link: 'Ouvrir la carte du bar et de la cave',
      alt: 'Cocktail orangé servi dans un verre tulipe avec une tranche d’orange, posé sur une table basse du lounge',
      picks: [
        { name: 'Mojito', note: 'menthe, rhum, citron, sucre de canne', price: '6 000' },
        { name: 'Virgin Colada', note: 'sans alcool', price: '4 500' },
        { name: 'Jameson', note: 'Irish whiskey', price: '5 000' },
        { name: 'Hibiki', note: 'whisky japonais', price: '25 000' },
        { name: 'Château Pontac Lynch', note: 'Margaux', price: '75 000' },
        { name: 'Veuve Clicquot', note: 'champagne', price: '90 000' },
      ],
    },
    rooms: {
      title: 'Côté salle, côté lounge.',
      room: {
        name: 'La salle',
        text: 'Nappes blanches, murs bordeaux et claustras en bois sculpté. La salle est lumineuse à midi, plus feutrée le soir, et toujours calme.',
        link: 'Découvrir la maison',
        alt: 'Salle du restaurant : tables nappées de blanc, chaises en bois sombre, rideaux bordeaux et grandes fenêtres sur la verdure',
      },
      lounge: {
        name: 'Le lounge',
        text: 'Des fauteuils club en cuir, un aquarium, le bar à portée de main. On s’y installe pour l’apéritif, on y revient après le dessert.',
        link: 'Entrer dans le lounge',
        alt: 'Lounge : fauteuils club en cuir brun autour de tables basses, claustra en bois sculpté et bar au fond',
      },
    },
  },
  en: {
    meta: {
      title: 'La Fourchette, restaurant and bar lounge in Douala',
      description:
        'Rue du Prince de Galles, Douala: Cameroonian, French, Italian and Chinese cooking, a bar lounge, a cellar and more than forty whiskies.',
    },
    hero: {
      title: ['Cameroon', 'and the world,', 'at the same table.'],
      hint: 'Scroll to step inside',
      tagline: 'Come in, your table is ready.',
      primary: 'Reserve a table',
      secondary: 'See the menu',
      entranceAlt: 'The entrance of La Fourchette at night: a glazed wooden door under a canopy hung with strings of lights',
      roomAlt: 'The dining room: tables in white linen, dark chairs, carved wooden screens and burgundy curtains by large windows',
      factAddress: 'Rue du Prince de Galles, Douala',
      factHours: 'Open every day, lunch and dinner',
    },
    cuisine: {
      title: 'A menu that travels, with a local accent.',
      text: 'You can start with avocado and prawns, move on to duck breast, and watch it arrive with fried plantain on the side. Here the cuisines meet on the same plate, and nobody complains.',
      link: 'See the full menu',
      origins: [
        { name: 'Cameroon', dishes: 'Ndolé, grilled fish, poulet DG, ripe plantain.' },
        { name: 'France', dishes: 'Duck breast, salmon with beurre blanc, pastry-chef desserts.' },
        { name: 'Italy', dishes: 'Tagliatelle in cream, risottos, tiramisu.' },
        { name: 'China', dishes: 'Crisp spring rolls, Cantonese rice, beef stir-fried with ginger.' },
      ],
      plates: [
        { caption: 'Duck breast, fried plantain', alt: 'Sliced duck breast served with fried plantain, glasses of red wine and a candle on a white tablecloth' },
        { caption: 'Avocado and prawns, cocktail sauce', alt: 'Avocado and prawn timbale with a boiled egg and cocktail sauce on a white plate' },
      ],
    },
    bar: {
      title: 'At the bar, take your time choosing.',
      text: 'The list runs to more than forty whiskies, from Ballantine’s to Japanese Hibiki, a cellar that goes from Bordeaux to South Africa, and twelve champagnes. If you would rather start light, there are nine alcohol-free cocktails.',
      listLabel: 'A few markers, prices in FCFA',
      link: 'Open the bar and cellar list',
      alt: 'Orange cocktail in a tulip glass with a slice of orange, on a low table in the lounge',
      picks: [
        { name: 'Mojito', note: 'mint, rum, lime, cane sugar', price: '6 000' },
        { name: 'Virgin Colada', note: 'alcohol-free', price: '4 500' },
        { name: 'Jameson', note: 'Irish whiskey', price: '5 000' },
        { name: 'Hibiki', note: 'Japanese whisky', price: '25 000' },
        { name: 'Château Pontac Lynch', note: 'Margaux', price: '75 000' },
        { name: 'Veuve Clicquot', note: 'champagne', price: '90 000' },
      ],
    },
    rooms: {
      title: 'The dining room, and the lounge.',
      room: {
        name: 'The dining room',
        text: 'White tablecloths, burgundy walls and carved wooden screens. The room is bright at lunch, softer in the evening, and always calm.',
        link: 'Discover the house',
        alt: 'Dining room: tables in white linen, dark wooden chairs, burgundy curtains and large windows onto greenery',
      },
      lounge: {
        name: 'The lounge',
        text: 'Leather club chairs, an aquarium, the bar within reach. Settle in for a drink before dinner, and come back after dessert.',
        link: 'Step into the lounge',
        alt: 'Lounge: brown leather club chairs around low tables, a carved wooden screen and the bar at the back',
      },
    },
  },
} as const;
