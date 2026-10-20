import { Product, MachineService, Formation, Order, ServiceRequest, Appointment, TrainingRegistration } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-demarrage-pro',
    name: 'Aliment Démarrage Volailles (Miettes Super-Croissance)',
    category: 'demarrage',
    description: 'Formule riche en acides aminés essentiels, vitamines et minéraux pour un démarrage vigoureux des poussins de chair et futures pondeuses du jour 1 au jour 21.',
    bagWeightKg: 50,
    retailPriceUsd: 32,
    wholesalePriceUsd: 28.5,
    wholesaleMinBags: 10,
    inStock: true,
    stockQuantity: 180,
    imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
    proteinPercent: '21.5% PB',
    targetAge: '0 à 3 semaines (J1 - J21)',
    compositionSummary: 'Maïs sélectionné, tourteau de soja toasté, concentré minéral vitaminé, farine de poisson, acides aminés (Lysine, Méthionine).',
    benefits: [
      'Immunité renforcée et vitalité dès les premiers jours',
      'Excellente digestibilité en micro-miettes adaptées aux petits becs',
      'Taux de mortalité minimisé (< 1.5%)',
      'Granulométrie homogène sans poussière'
    ]
  },
  {
    id: 'prod-croissance-chair',
    name: 'Aliment Croissance Poulet de Chair (Granulés 2.5mm)',
    category: 'croissance',
    description: 'Granulés calibrés conçus pour un développement musculo-squelettique optimal et un indice de consommation remarquable entre la 4e et 6e semaine.',
    bagWeightKg: 50,
    retailPriceUsd: 29.5,
    wholesalePriceUsd: 26.5,
    wholesaleMinBags: 10,
    inStock: true,
    stockQuantity: 240,
    imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
    proteinPercent: '19.5% PB',
    targetAge: '4e à 6e semaine (J22 - J42)',
    compositionSummary: 'Céréales nobles de la région des Grands Lacs, tourteau de soja, son de blé fin, acides gras énergétiques, prémix croissance.',
    benefits: [
      'Gain moyen quotidien (GMQ) maximal',
      'Format granulé évitant le gaspillage et le tri',
      'Optimisation de l\'indice de conversion alimentaire (IC)',
      'Plumage sain et pattes solides'
    ]
  },
  {
    id: 'prod-finition-lourde',
    name: 'Aliment Finition Chair (Granulés Haute Énergie)',
    category: 'finition',
    description: 'Formulation haute densité énergétique favorisant l\'engraissement harmonieux et la chair ferme avant commercialisation sur les marchés de Goma et environs.',
    bagWeightKg: 50,
    retailPriceUsd: 28,
    wholesalePriceUsd: 25,
    wholesaleMinBags: 10,
    inStock: true,
    stockQuantity: 115,
    imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80',
    proteinPercent: '18.0% PB',
    targetAge: '7e semaine jusqu\'à la vente',
    compositionSummary: 'Maïs broyé fin, tourteaux d\'oléagineux, huile végétale, son de blé, sel iodé, régulateur digestif.',
    benefits: [
      'Poids carcasse lourd et masse musculaire dense',
      'Finition rapide en 7 à 10 jours seulement',
      'Texture de viande tendre très appréciée des consommateurs',
      'Rendement carcasse exceptionnel'
    ]
  },
  {
    id: 'prod-pondeuse-performance',
    name: 'Aliment Pondeuse Production Intensive (Calci-Plus)',
    category: 'pondeuse',
    description: 'Équilibre parfait en calcium, phosphore assimilable et acides aminés pour maximiser le taux de ponte (pic > 90%) et assurer des coquilles épaisses et résistantes.',
    bagWeightKg: 50,
    retailPriceUsd: 27.5,
    wholesalePriceUsd: 24.5,
    wholesaleMinBags: 10,
    inStock: true,
    stockQuantity: 310,
    imageUrl: 'https://images.unsplash.com/photo-1569288063643-5d29ad64df09?auto=format&fit=crop&w=800&q=80',
    proteinPercent: '17.5% PB + 3.8% Ca',
    targetAge: 'De l\'entrée en ponte (18e semaine) jusqu\'à la réforme',
    compositionSummary: 'Maïs jaune, carbonate de calcium marin, tourteau de soja, tourteau de tournesol, acides aminés, pigments naturels de jaune.',
    benefits: [
      'Pic de ponte soutenu et durable tout au long du cycle',
      'Coquilles ultra dures réduisant la casse lors du transport',
      'Jaune d\'œuf bien orangé très demandé par les hôtels et ménages',
      'Protection hépatique de la poule'
    ]
  },
  {
    id: 'prod-concentre-5-pourcent',
    name: 'Concentré Protéique Volaille 5% & 10% (Supermix Formulateur)',
    category: 'concentre',
    description: 'Noyau ultra concentré en vitamines, oligo-éléments, acides aminés de synthèse et enzymes digestives pour les éleveurs qui mélangent leur propre maïs à la ferme.',
    bagWeightKg: 25,
    retailPriceUsd: 38,
    wholesalePriceUsd: 34,
    wholesaleMinBags: 5,
    inStock: true,
    stockQuantity: 65,
    imageUrl: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=800&q=80',
    proteinPercent: '38% - 42% PB équivalent',
    targetAge: 'Toutes phases selon charte d\'incorporation',
    compositionSummary: 'Acides aminés purs (Lysine HCl, DL-Méthionine, Thréonine), phosphate bicalcique, phytase, prémix 14 vitamines et minéraux.',
    benefits: [
      'Économisez jusqu\'à 25% en valorisant vos matières premières locales',
      'Fourni avec nos fiches techniques de formulation rationnelle',
      'Dosage précis pour 1 tonne d\'aliment fini',
      'Assistance technique gratuite par Sinaï Buturu'
    ]
  },
  {
    id: 'prod-poussin-starter',
    name: 'Pré-Démarrage Poussins 1er Âge (Micro-Granulé Vital)',
    category: 'demarrage',
    description: 'Micro-pellets digestifs spécialement formulés pour la transition du sac vitellin dès la sortie du couvoir.',
    bagWeightKg: 25,
    retailPriceUsd: 22,
    wholesalePriceUsd: 19.5,
    wholesaleMinBags: 5,
    inStock: true,
    stockQuantity: 40,
    imageUrl: 'https://images.unsplash.com/photo-1563281577-a7be47e20db9?auto=format&fit=crop&w=800&q=80',
    proteinPercent: '22.0% PB',
    targetAge: 'J1 à J10',
    compositionSummary: 'Ingrédients prédigérés, dextrose, acides organiques assainissants, levures vivantes.',
    benefits: [
      'Absorption immédiate et réhydratation du poussin',
      'Développement précoce des villosités intestinales',
      'Lot homogène sans retards de croissance'
    ]
  }
];

export const INITIAL_SERVICES: MachineService[] = [
  {
    id: 'srv-entretien-preventif',
    title: 'Entretien préventif des machines à granulés',
    description: 'Protocole complet de révision systématique pour éviter les arrêts inopinés de production dans votre provenderie et allonger la durée de vie de vos équipements.',
    badge: 'Recommandé Mensuel',
    estimatedDelay: 'Intervention sous 24h - 48h',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    commonMachines: ['Presse à matrice plate (100 à 500 kg/h)', 'Presse filière annulaire industrielle', 'Broyeur à marteaux'],
    details: [
      'Graissage haute température des roulements et rouleaux compresseurs',
      'Contrôle du jeu entre matrice et galets',
      'Vérification de l\'étanchéité du réducteur et vidange d\'huile',
      'Nettoyage approfondi de la chambre de compression',
      'Rapport d\'état d\'usure et recommandations'
    ]
  },
  {
    id: 'srv-reparation-machines',
    title: 'Réparation des machines',
    description: 'Dépannage mécanique et électromécanique d\'urgence ou en atelier pour toutes marques de presses à granulés, broyeurs et mélangeurs.',
    badge: 'Intervention Rapide',
    estimatedDelay: 'Urgence disponible 7j/7',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    commonMachines: ['Presses diesel et électriques', 'Mélangeurs verticaux & horizontaux', 'Vis sans fin et convoyeurs'],
    details: [
      'Démontage minutieux et sécurisé sur site ou en atelier NUTRIGOMA',
      'Réparation des pignons, clavettes, arbres principaux et paliers',
      'Réalignement des moteurs et transmission par courroies',
      'Remise en route et test de charge avec matières réelles',
      'Garantie de service technique NUTRIGOMA BUSINESS'
    ]
  },
  {
    id: 'srv-diagnostic-pannes',
    title: 'Diagnostic des pannes',
    description: 'Recherche méthodique de dysfonctionnement : bourrage récurrent, granulés mous, baisse de débit horaire, surchauffe moteur ou bruits anormaux.',
    badge: 'Diagnostic Expert',
    estimatedDelay: 'Sur rendez-vous ou appel d\'urgence',
    imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
    commonMachines: ['Presses chinoises, turques, européennes', 'Moteurs thermiques diesel & triphasés'],
    details: [
      'Mesure de l\'échauffement thermique et des vibrations',
      'Analyse de l\'humidité et granulométrie de la farine entrant dans la presse',
      'Contrôle de l\'ampérage électrique et surcharge moteur',
      'Identification précise de la cause racine avant toute dépense inutile',
      'Devis clair et transparent sans mauvaise surprise'
    ]
  },
  {
    id: 'srv-reglage-equipements',
    title: 'Réglage des équipements',
    description: 'Calibrage millimétrique de la matrice, des rouleaux compresseurs et des couteaux de coupe pour un granulé brillant, dur et parfaitement digestible.',
    badge: 'Optimisation Qualité',
    estimatedDelay: 'Intervention sur demi-journée',
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    commonMachines: ['Presses matrices 2.5mm, 3mm, 4mm, 6mm', 'Coupeurs rotatifs', 'Doseurs à vis'],
    details: [
      'Ajustement du gap optimal entre rouleau et filière (0.1 à 0.3 mm)',
      'Réglage des couteaux de coupe selon la longueur voulue pour volailles',
      'Calibrage du débit d\'alimentation pour éviter les bourrages',
      'Test d\'indice de durabilité du granulé (PDI) en sortie',
      'Formation de votre opérateur aux gestes de réglage quotidien'
    ]
  },
  {
    id: 'srv-remplacement-pieces',
    title: 'Remplacement des pièces défectueuses',
    description: 'Fourniture et montage de pièces d\'usure d\'origine ou réusinées de haute dureté : matrices plates, rouleaux complets, roulements, courroies.',
    badge: 'Pièces Certifiées',
    estimatedDelay: 'Pièces courantes en stock à Goma',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    commonMachines: ['Matrices alliage chrome & acier traité', 'Kits rouleaux galets', 'Bagues d\'usure et joints'],
    details: [
      'Remplacement de matrices usées ou bouchées',
      'Changement des roulements haute température coniques et à billes',
      'Remplacement des arbres d\'entraînement et clavettes forgées',
      'Rodage initial de la nouvelle matrice à l\'huile et son pour ouverture parfaite des trous',
      'Conseils d\'entretien pour doubler la durée de vie des pièces neuves'
    ]
  },
  {
    id: 'srv-assistance-technique',
    title: 'Assistance technique',
    description: 'Support technique réactif sur site ou par appel vidéo WhatsApp directement avec le Technicien Supérieur Sinaï Buturu pour débloquer votre production.',
    badge: 'Support Continu',
    estimatedDelay: 'Réponse WhatsApp instantanée / prioritaire',
    imageUrl: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80',
    commonMachines: ['Ligne complète de provenderie', 'Broyeurs, mélangeurs, ensacheuses'],
    details: [
      'Assistance en direct lors des démarrages de lots de production',
      'Aide au débouchage rapide d\'une filière bloquée sans endommager l\'acier',
      'Contrats d\'accompagnement technique trimestriels et annuels pour provenderies',
      'Conseils par WhatsApp avec Sinaï Buturu en cas d\'aléa urgent'
    ]
  },
  {
    id: 'srv-conseils-fonctionnement',
    title: 'Conseils pour améliorer le fonctionnement des machines',
    description: 'Audit technique complet de votre atelier de fabrication d\'aliments pour augmenter le rendement horaire en kg/h et réduire votre consommation d\'électricité ou carburant.',
    badge: 'Audit & Rentabilité',
    estimatedDelay: 'Rapport complet sous 48h',
    imageUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80',
    commonMachines: ['Ateliers artisanaux et semi-industriels'],
    details: [
      'Optimisation de la formule farine pour faciliter la granulation (taux de lipides, fibres et humidité)',
      'Conseils de pré-conditionnement et mélange des matières premières',
      'Amélioration de l\'agencement de l\'atelier pour un flux de travail fluide',
      'Plan de maintenance autonome pour vos opérateurs sur site'
    ]
  }
];

export const INITIAL_FORMATIONS: Formation[] = [
  {
    id: 'form-fabrication-formulation',
    title: 'Fabrication & Formulation Rationnelle des Aliments Volailles',
    subtitle: 'Maîtrisez la formulation d\'aliments démarrage, croissance et ponte avec les matières premières locales disponibles à Goma.',
    description: 'Formation 100% pratique alliant la science de la nutrition aviaire et la pratique en atelier : calcul de ration aux moindres coûts, choix des ingrédients (maïs, soja, poisson, prémix), techniques de broyage et conditionnement.',
    duration: '5 jours (30 heures)',
    targetAudience: 'Éleveurs de volailles, porteurs de projets agropastoraux, gérants de provenderie.',
    priceUsd: 120,
    nextSessionDate: 'Prochaine session : Du 10 au 15 du mois prochain',
    imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
    certified: true,
    modulesCount: 5,
    program: [
      'Module 1 : Besoins nutritionnels spécifiques des poulets de chair et pondeuses selon l\'âge',
      'Module 2 : Connaissance des matières premières locales du Kivu et contrôle qualité',
      'Module 3 : Méthode du carré de Pearson et utilisation d\'outils informatiques de formulation',
      'Module 4 : Techniques pratiques de dosage, broyage fin et mélange homogène',
      'Module 5 : Calcul du coût de revient au kilo et rentabilité comparée face aux aliments importés'
    ]
  },
  {
    id: 'form-maintenance-presses',
    title: 'Conduite, Réglage & Maintenance des Presses à Granulés',
    subtitle: 'Devenez autonome sur le fonctionnement, l\'entretien et le dépannage de votre machine à granulés.',
    description: 'Une formation technique de haut niveau dispensée par le Technicien Supérieur Sinaï Buturu. Vous manipulerez directement les machines, apprendrez à changer les matrices, régler le gap galet-matrice et résoudre 95% des pannes courantes.',
    duration: '4 jours (Pratique atelier)',
    targetAudience: 'Opérateurs de machines, techniciens de maintenance, propriétaires de provenderie.',
    priceUsd: 150,
    nextSessionDate: 'Session bimensuelle en petit groupe (max 6 pers.)',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    certified: true,
    modulesCount: 4,
    program: [
      'Module 1 : Anatomie complète d\'une presse à granulés (moteur, réducteur, filière, rouleaux)',
      'Module 2 : Préparation de la matière : taux d\'humidité critique et lubrification naturelle',
      'Module 3 : Protocole de démarrage, rodage d\'une matrice neuve et arrêt sécurisé',
      'Module 4 : Diagnostic des bourrages, démontage des galets et remplacement des roulements'
    ]
  },
  {
    id: 'form-elevage-rentable',
    title: 'Élevage Moderne & Rentabilité des Poulets de Chair et Pondeuses',
    subtitle: 'De la poussinière à la vente : biosécurité, conduite d\'élevage et maximisation des marges.',
    description: 'Apprenez à gérer un poulailler rentable à Goma : préparation du bâtiment, chauffage des poussins, programme de prophylaxie et vaccination, gestion de la litière, calcul du taux de conversion et vente rémunératrice.',
    duration: '3 jours intensifs',
    targetAudience: 'Futurs éleveurs, agri-entrepreneurs, fermiers souhaitant professionnaliser leur cheptel.',
    priceUsd: 90,
    nextSessionDate: 'Inscriptions ouvertes toute l\'année',
    imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
    certified: true,
    modulesCount: 4,
    program: [
      'Module 1 : Aménagement de la poussinière et gestion de la température/ventilation',
      'Module 2 : Calendrier vaccinal et mesures de biosécurité adaptées au Nord-Kivu',
      'Module 3 : Programme de rationnement alimentaire pour atteindre 2.5 kg en 42 jours',
      'Module 4 : Gestion des comptes d\'exploitation et stratégie de vente'
    ]
  },
  {
    id: 'form-gestion-provenderie',
    title: 'Création & Gestion d\'une Unité de Provenderie Locale Rentable',
    subtitle: 'Le guide complet pour monter votre atelier d\'aliments bétail et volailles à Goma.',
    description: 'De l\'étude de marché au dimensionnement des machines, approvisionnement en matières premières, gestion des stocks contre l\'humidité, tarification et fidélisation des éleveurs de la région.',
    duration: '3 jours',
    targetAudience: 'Investisseurs, coopératives agricoles, responsables de fermes intégrées.',
    priceUsd: 110,
    nextSessionDate: 'Sur demande et sessions mensuelles',
    imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80',
    certified: true,
    modulesCount: 4,
    program: [
      'Module 1 : Choix et dimensionnement des machines (broyeur, mélangeur, presse, couseuse)',
      'Module 2 : Circuits d\'approvisionnement en matières premières et contrôle qualité à la réception',
      'Module 3 : Gestion du fonds de roulement, amortissement du matériel et structure des prix',
      'Module 4 : Conformité, normes d\'hygiène et stratégie commerciale'
    ]
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'cmd-8021',
    createdAt: '2026-10-18T14:32:00Z',
    clientName: 'Justin Muhindo (Ferme Espoir)',
    phone: '+243 997 812 345',
    productId: 'prod-croissance-chair',
    productName: 'Aliment Croissance Poulet de Chair (Granulés 2.5mm)',
    quantity: 15,
    priceType: 'gros',
    unitPrice: 26.5,
    totalPrice: 397.5,
    deliveryMethod: 'livraison_peripherie',
    deliveryAddress: 'Ferme vers Sake, Km 14',
    notes: 'Livrer avant samedi matin si possible pour réapprovisionnement de 1000 poussins.',
    status: 'confirmee'
  },
  {
    id: 'cmd-8022',
    createdAt: '2026-10-19T09:15:00Z',
    clientName: 'Mme Clarisse Zawadi',
    phone: '+243 854 219 008',
    productId: 'prod-pondeuse-performance',
    productName: 'Aliment Pondeuse Production Intensive (Calci-Plus)',
    quantity: 6,
    priceType: 'detail',
    unitPrice: 27.5,
    totalPrice: 165,
    deliveryMethod: 'livraison_goma',
    deliveryAddress: 'Quartier Himbi, près de l\'Hôtel Serena',
    notes: 'Paiement en cash à la livraison ou Airtel Money.',
    status: 'en_attente'
  }
];

export const INITIAL_SERVICE_REQUESTS: ServiceRequest[] = [
  {
    id: 'req-3011',
    createdAt: '2026-10-17T16:00:00Z',
    serviceId: 'srv-reglage-equipements',
    serviceTitle: 'Réglage des équipements',
    clientName: 'Emmanuel Kanyere (Provenderie du Lac)',
    phone: '+243 971 654 321',
    location: 'Quartier Katindo, Goma',
    machineType: 'Presse à filière plate 200 kg/h avec moteur électrique 7.5 kW',
    problemDescription: 'Le granulé sort effrité et la matrice chauffe énormément après 30 minutes de travail. Les galets semblent mal ajustés.',
    preferredDate: '2026-10-22',
    urgency: 'urgent',
    photoNote: 'Photos envoyées par WhatsApp montrant l\'usure de la filière',
    status: 'confirmee'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'rdv-501',
    createdAt: '2026-10-18T11:20:00Z',
    clientName: 'Dr. Patrick Baraka',
    phone: '+243 812 345 678',
    location: 'Ferme Avicole Baraka, Ndosho',
    serviceTopic: 'Diagnostic complet et maintenance préventive de 2 presses',
    preferredDate: '2026-10-23',
    preferredTimeSlot: 'matin',
    notes: 'Demande de validation sur place avec Sinaï Buturu pour planifier l\'entretien trimestriel.',
    status: 'en_attente_confirmation'
  }
];

export const INITIAL_REGISTRATIONS: TrainingRegistration[] = [
  {
    id: 'reg-101',
    createdAt: '2026-10-19T08:45:00Z',
    formationId: 'form-fabrication-formulation',
    formationTitle: 'Fabrication & Formulation Rationnelle des Aliments Volailles',
    participantName: 'Alain Kambale',
    phone: '+243 998 765 432',
    city: 'Goma (Mabanga Sud)',
    sessionType: 'presentiel_goma',
    experienceLevel: 'eleveur_actif',
    notes: 'Je souhaite réduire le coût de mes aliments actuels pour 1500 pondeuses.',
    status: 'en_attente'
  }
];
