// Copy for the five inner pages. Facts about services, atmosphere, payment,
// accessibility and parking come from the restaurant's public listing.
// Nothing about its history, team or awards is invented: where that content is
// missing, the page says so.
export const pages = {
  menu: {
    fr: {
      title: 'La Carte',
      metaTitle: 'La Carte | La Fourchette, Douala',
      lede: 'Entrées, plats, desserts et menu enfant : la cuisine du Cameroun, de la France, de l’Italie et de la Chine.',
      tabsLabel: 'Rubriques de la carte',
      words: ['Cameroun', 'France', 'Italie', 'Chine'],
      captions: {
        entrees: 'Avocat aux crevettes, sauce cocktail',
        plats: 'Magret de canard, plantains frits',
      },
      alts: {
        entrees: 'Timbale d’avocat et de crevettes, œuf dur et sauce cocktail sur une assiette blanche',
        plats: 'Magret de canard tranché servi avec des plantains frits',
      },
    },
    en: {
      title: 'Menu',
      metaTitle: 'Menu | La Fourchette, Douala',
      lede: 'Starters, mains, desserts and a children’s menu: cooking from Cameroon, France, Italy and China.',
      tabsLabel: 'Menu sections',
      words: ['Cameroon', 'France', 'Italy', 'China'],
      captions: {
        entrees: 'Avocado and prawns, cocktail sauce',
        plats: 'Duck breast, fried plantain',
      },
      alts: {
        entrees: 'Avocado and prawn timbale with a boiled egg and cocktail sauce on a white plate',
        plats: 'Sliced duck breast served with fried plantain',
      },
    },
  },
  bar: {
    fr: {
      title: 'Bar & Cave',
      metaTitle: 'Bar & Cave | La Fourchette, Douala',
      lede: 'Cocktails avec ou sans alcool, spiritueux, whiskies, vins et champagnes.',
      tabsLabel: 'Rubriques du bar et de la cave',
      words: ['Plus de quarante whiskies', 'Douze champagnes', 'Neuf cocktails sans alcool'],
      captions: { cocktails: 'Un cocktail servi au lounge' },
      alts: { cocktails: 'Cocktail orangé dans un verre tulipe avec une tranche d’orange, sur une table basse du lounge' },
    },
    en: {
      title: 'Bar & Cellar',
      metaTitle: 'Bar & Cellar | La Fourchette, Douala',
      lede: 'Cocktails with or without alcohol, spirits, whiskies, wines and champagnes.',
      tabsLabel: 'Bar and cellar sections',
      words: ['More than forty whiskies', 'Twelve champagnes', 'Nine alcohol-free cocktails'],
      captions: { cocktails: 'A cocktail served in the lounge' },
      alts: { cocktails: 'Orange cocktail in a tulip glass with a slice of orange, on a low table in the lounge' },
    },
  },
  lounge: {
    fr: {
      title: 'Le Lounge',
      metaTitle: 'Le Lounge | La Fourchette, Douala',
      lede: 'Des fauteuils club, un aquarium et un bar qui sert tard dans la soirée.',
      views: [
        {
          caption: 'Les fauteuils club, côté fenêtres',
          alt: 'Fauteuils club en cuir brun autour de tables basses, devant de grandes fenêtres et un claustra en bois sculpté',
        },
        {
          caption: 'L’aquarium, au milieu du salon',
          alt: 'Grand aquarium planté entouré de canapés en cuir brun, contre un mur bordeaux',
        },
      ],
      about: {
        title: 'Un salon pour prendre son temps.',
        text: 'Le lounge est la pièce la plus calme de la maison : du cuir, du bois sombre, et un aquarium qui occupe le regard quand la conversation s’arrête.',
      },
      moments: [
        {
          name: 'Avant le dîner',
          text: 'L’apéritif se prend ici : un cocktail, un verre de vin, de quoi patienter jusqu’à votre table.',
        },
        {
          name: 'Après le dessert',
          text: 'Un café, un thé ou un whisky. La carte en compte plus de quarante, des classiques aux japonais.',
        },
        {
          name: 'Tard le soir',
          text: 'La cuisine sert tard et propose des petites portions à partager, quand on n’a pas envie de passer à table.',
        },
      ],
      order: {
        title: 'À commander depuis votre fauteuil.',
        listLabel: 'Quelques repères, prix en FCFA',
        link: 'Voir toute la carte du bar',
        picks: [
          { name: 'Mojito', note: 'menthe, rhum, citron, sucre de canne', price: 6000 },
          { name: 'Virgin Colada', note: 'sans alcool', price: 4500 },
          { name: 'Coupe de champagne', note: '', price: 11000 },
          { name: 'Lagavulin 16 ans', note: 'whisky écossais', price: 12000 },
          { name: 'Hibiki', note: 'whisky japonais', price: 25000 },
        ],
      },
    },
    en: {
      title: 'The Lounge',
      metaTitle: 'The Lounge | La Fourchette, Douala',
      lede: 'Club chairs, an aquarium and a bar that serves late into the evening.',
      views: [
        {
          caption: 'The club chairs, by the windows',
          alt: 'Brown leather club chairs around low tables, by large windows and a carved wooden screen',
        },
        {
          caption: 'The aquarium, in the middle of the room',
          alt: 'A large planted aquarium surrounded by brown leather sofas, against a burgundy wall',
        },
      ],
      about: {
        title: 'A room for taking your time.',
        text: 'The lounge is the calmest room in the house: leather, dark wood, and an aquarium to rest your eyes on when the conversation pauses.',
      },
      moments: [
        {
          name: 'Before dinner',
          text: 'Have your aperitif here: a cocktail, a glass of wine, something to keep you until your table is ready.',
        },
        {
          name: 'After dessert',
          text: 'A coffee, a tea or a whisky. There are more than forty on the list, from the classics to the Japanese.',
        },
        {
          name: 'Late in the evening',
          text: 'The kitchen serves late and offers small plates to share, for when you would rather not sit down to a full meal.',
        },
      ],
      order: {
        title: 'To order from your armchair.',
        listLabel: 'A few markers, prices in FCFA',
        link: 'See the full bar list',
        picks: [
          { name: 'Mojito', note: 'mint, rum, lime, cane sugar', price: 6000 },
          { name: 'Virgin Colada', note: 'alcohol-free', price: 4500 },
          { name: 'Glass of champagne', note: '', price: 11000 },
          { name: 'Lagavulin 16 years', note: 'Scotch whisky', price: 12000 },
          { name: 'Hibiki', note: 'Japanese whisky', price: 25000 },
        ],
      },
    },
  },
  house: {
    fr: {
      title: 'La Maison',
      metaTitle: 'La Maison | La Fourchette, Douala',
      lede: 'La salle, l’ambiance, les services et tout ce qu’il est utile de savoir avant de venir.',
      bannerAlt: 'La salle de La Fourchette : tables nappées de blanc, chaises sombres, claustras en bois sculpté et rideaux bordeaux devant de grandes fenêtres',
      room: {
        title: 'Une salle claire, des tables qui ont de la place.',
        text: [
          'Nappes blanches, chaises en bois sombre, murs bordeaux. Entre les tables, des claustras en bois sculpté préservent les conversations.',
          'Les grandes fenêtres donnent sur la verdure : la salle est lumineuse à midi et se fait plus feutrée le soir. On y vient déjeuner ou dîner, seul, à deux ou en groupe, et le service à table vous laisse le temps.',
        ],
        caption: 'La salle, côté murs bordeaux',
        alt: 'Salle du restaurant aux murs bordeaux, tables nappées de blanc et plafond à poutres noires',
      },
      facts: {
        title: 'Bon à savoir avant de venir.',
        groups: [
          {
            name: 'Sur place et ailleurs',
            items: ['Déjeuner et dîner, service à table', 'Vente à emporter', 'Livraison', 'Service traiteur'],
          },
          {
            name: 'Réservation',
            items: ['Recommandée au déjeuner comme au dîner', 'Groupes bienvenus'],
          },
          {
            name: 'En famille',
            items: ['Menu enfant', 'Chaises hautes'],
          },
          {
            name: 'À table',
            items: ['Plats végétariens et végétaliens', 'Petites portions à partager', 'Service tard dans la soirée'],
          },
          {
            name: 'Accessibilité',
            items: [
              'Entrée accessible en fauteuil roulant',
              'Places assises et toilettes accessibles',
              'Parking accessible',
            ],
          },
          {
            name: 'Stationnement',
            items: ['Parking gratuit', 'Stationnement gratuit et facile dans la rue'],
          },
          {
            name: 'Paiement',
            items: ['Cartes de crédit et de débit', 'Paiement mobile sans contact'],
          },
        ],
      },
      story: {
        title: 'L’histoire de la maison.',
        label: 'Contenu à fournir par le restaurant',
        text: 'Cette page attend les mots de l’équipe : l’année d’ouverture, celles et ceux qui ont fondé la maison, le chef et sa cuisine. Rien n’est inventé ici en attendant.',
      },
      find: {
        title: 'Nous trouver.',
        text: 'L’entrée se trouve Rue du Prince de Galles, sous la marquise en fer forgé. Le parking est gratuit et l’on se gare facilement dans la rue.',
        link: 'Réservation et contact',
        map: 'Ouvrir dans Google Maps',
        alt: 'Entrée de La Fourchette de nuit, sous une marquise décorée de guirlandes lumineuses',
      },
    },
    en: {
      title: 'The House',
      metaTitle: 'The House | La Fourchette, Douala',
      lede: 'The room, the atmosphere, the services and everything worth knowing before you come.',
      bannerAlt: 'The dining room at La Fourchette: tables in white linen, dark chairs, carved wooden screens and burgundy curtains by large windows',
      room: {
        title: 'A bright room, with space between the tables.',
        text: [
          'White tablecloths, dark wooden chairs, burgundy walls. Between the tables, carved wooden screens keep conversations private.',
          'The large windows look onto greenery: the room is bright at lunch and softer in the evening. People come for lunch or dinner, alone, as a couple or in a group, and table service gives you time.',
        ],
        caption: 'The dining room, on the burgundy side',
        alt: 'Dining room with burgundy walls, tables in white linen and a ceiling of black beams',
      },
      facts: {
        title: 'Good to know before you come.',
        groups: [
          {
            name: 'Here and elsewhere',
            items: ['Lunch and dinner, table service', 'Takeaway', 'Delivery', 'Catering'],
          },
          {
            name: 'Booking',
            items: ['Recommended for lunch and for dinner', 'Groups welcome'],
          },
          {
            name: 'With children',
            items: ['Children’s menu', 'High chairs'],
          },
          {
            name: 'At the table',
            items: ['Vegetarian and vegan dishes', 'Small plates to share', 'Service late into the evening'],
          },
          {
            name: 'Accessibility',
            items: ['Wheelchair-accessible entrance', 'Accessible seating and toilets', 'Accessible parking'],
          },
          {
            name: 'Parking',
            items: ['Free car park', 'Free, easy street parking'],
          },
          {
            name: 'Payment',
            items: ['Credit and debit cards', 'Contactless mobile payment'],
          },
        ],
      },
      story: {
        title: 'The story of the house.',
        label: 'Content to be supplied by the restaurant',
        text: 'This page is waiting for the team’s own words: the year it opened, the people who founded it, the chef and the cooking. Nothing is invented here in the meantime.',
      },
      find: {
        title: 'Finding us.',
        text: 'The entrance is on Rue du Prince de Galles, under the wrought-iron canopy. The car park is free and street parking is easy.',
        link: 'Reservations and contact',
        map: 'Open in Google Maps',
        alt: 'The entrance of La Fourchette at night, under a canopy hung with strings of lights',
      },
    },
  },
  reservation: {
    fr: {
      title: 'Réservation & Contact',
      metaTitle: 'Réservation & Contact | La Fourchette, Douala',
      lede: 'Réservez en ligne, sur WhatsApp ou par téléphone. La réservation est recommandée, au déjeuner comme au dîner.',
      form: {
        title: 'Réserver une table.',
        date: 'Date',
        time: 'Heure',
        timePlaceholder: 'Choisir une heure',
        lunch: 'Déjeuner',
        dinner: 'Dîner',
        guests: 'Nombre de personnes',
        guestsOne: '1 personne',
        guestsMany: '{n} personnes',
        guestsMore: 'Plus de 12 personnes',
        groupHint: 'Pour un groupe de plus de 12 personnes, écrivez-nous sur WhatsApp ou appelez-nous : nous préparons la table avec vous.',
        seating: 'Où souhaitez-vous être installés ?',
        seatingOptions: ['Sans préférence', 'En salle', 'Au lounge'],
        name: 'Nom',
        phone: 'Téléphone',
        email: 'E-mail (facultatif)',
        message: 'Un mot pour nous ? (facultatif)',
        messagePlaceholder: 'Anniversaire, allergie, chaise haute…',
        submit: 'Envoyer ma demande',
        errors: {
          required: 'Ce champ est nécessaire.',
          date: 'Choisissez une date à partir d’aujourd’hui.',
          phone: 'Indiquez un numéro de téléphone valide.',
          email: 'Vérifiez l’adresse e-mail.',
        },
        summary: 'Bonjour, je souhaite réserver une table pour {guests}, le {date} à {time}, au nom de {name}.',
      },
      confirm: {
        title: 'Votre demande est prête.',
        text: 'Voici ce que nous avons noté.',
        demo: 'Site de démonstration : cette demande n’a pas été transmise au restaurant.',
        whatsapp: 'Envoyer sur WhatsApp',
        edit: 'Modifier ma demande',
      },
      direct: {
        title: 'Ou directement',
        mapLink: 'Ouvrir dans Google Maps',
        alt: 'Entrée de La Fourchette de nuit, sous une marquise décorée de guirlandes lumineuses',
      },
      also: {
        title: 'Aussi à La Fourchette.',
        note: 'Les modalités de ces services restent à préciser avec le restaurant.',
        items: [
          {
            name: 'Groupes',
            text: 'Anniversaire, repas d’équipe, table d’amis : dites-nous combien vous serez et nous préparons la salle.',
          },
          {
            name: 'Traiteur',
            text: 'La cuisine de La Fourchette se déplace pour vos réceptions. Parlez-nous de votre événement.',
          },
          {
            name: 'À emporter',
            text: 'Commandez par téléphone ou sur WhatsApp, puis passez chercher votre repas.',
          },
          {
            name: 'Livraison',
            text: 'Vos plats livrés chez vous ou au bureau. Demandez-nous si votre adresse est desservie.',
          },
        ],
      },
    },
    en: {
      title: 'Reservations & Contact',
      metaTitle: 'Reservations & Contact | La Fourchette, Douala',
      lede: 'Book online, on WhatsApp or by phone. We recommend booking, for lunch as for dinner.',
      form: {
        title: 'Reserve a table.',
        date: 'Date',
        time: 'Time',
        timePlaceholder: 'Choose a time',
        lunch: 'Lunch',
        dinner: 'Dinner',
        guests: 'Number of guests',
        guestsOne: '1 guest',
        guestsMany: '{n} guests',
        guestsMore: 'More than 12 guests',
        groupHint: 'For a group of more than 12, message us on WhatsApp or call us: we will plan the table with you.',
        seating: 'Where would you like to sit?',
        seatingOptions: ['No preference', 'Dining room', 'Lounge'],
        name: 'Name',
        phone: 'Phone',
        email: 'Email (optional)',
        message: 'Anything we should know? (optional)',
        messagePlaceholder: 'Birthday, allergy, high chair…',
        submit: 'Send my request',
        errors: {
          required: 'This field is needed.',
          date: 'Choose a date from today onwards.',
          phone: 'Enter a valid phone number.',
          email: 'Check the email address.',
        },
        summary: 'Hello, I would like to reserve a table for {guests}, on {date} at {time}, in the name of {name}.',
      },
      confirm: {
        title: 'Your request is ready.',
        text: 'Here is what we noted.',
        demo: 'Demonstration site: this request has not been sent to the restaurant.',
        whatsapp: 'Send on WhatsApp',
        edit: 'Change my request',
      },
      direct: {
        title: 'Or directly',
        mapLink: 'Open in Google Maps',
        alt: 'The entrance of La Fourchette at night, under a canopy hung with strings of lights',
      },
      also: {
        title: 'Also at La Fourchette.',
        note: 'The details of these services are to be confirmed with the restaurant.',
        items: [
          {
            name: 'Groups',
            text: 'A birthday, a team meal, a table of friends: tell us how many you will be and we will set the room.',
          },
          {
            name: 'Catering',
            text: 'La Fourchette’s kitchen travels to your receptions. Tell us about your event.',
          },
          {
            name: 'Takeaway',
            text: 'Order by phone or on WhatsApp, then come and collect your meal.',
          },
          {
            name: 'Delivery',
            text: 'Your dishes delivered to your home or office. Ask us whether we deliver to your address.',
          },
        ],
      },
    },
  },
} as const;
