import { UniformPackage, FabricOption } from '../types';

export const UNIFORM_PACKAGES: UniformPackage[] = [
  {
    id: 'pkg-concierge',
    category: 'residential_concierge',
    title: 'Conserjería & Recepción Residencial de Lujo',
    subtitle: 'Edificios Inteligentes y Condominios Campestres (Rosales, Chicó, Santa Ana, La Cabrera)',
    targetSector: 'Propiedad Raíz de Alta Gama & Concierge',
    description: 'Uniformidad sartorial de presencia impecable para personal de lobby y recepción. Proyecta sobriedad, elegancia y seguridad institucional ante copropietarios y diplomáticos.',
    includedGarments: [
      'Saco Sastre con estructura semiformal y hombrera anatómica',
      'Pantalón sastre con pretina reforzada y bota protegida',
      '2 Camisas en Algodón Pima 100/2 con cuello estructurado',
      'Corbata o Pañuelo en seda microfibra con tonos corporativos'
    ],
    fabricSpecs: {
      material: 'Lana Tropical 55% / Microfibra Poliéster 45%',
      durability: '45.000 ciclos Martindale (Resistencia anti-roce superior)',
      treatment: 'Recubrimiento Teflon EcoElite repelente a manchas y llovizna',
      origin: 'Hilatura importada con teñido de alta solidez al lavado'
    },
    basePricePerColaborador: 890000,
    minOrderQuantity: 4,
    turnaroundDays: 14,
    highlightBadge: 'Más Cotizado en Bogotá Norte'
  },
  {
    id: 'pkg-drivers',
    category: 'diplomatic_drivers',
    title: 'Choferes Ejecutivos & Seguridad Diplomática',
    subtitle: 'Blindados, Caravanas VIP y Movilidad de Altos Mandos',
    targetSector: 'Transporte Especial & Escoltas Corporativos',
    description: 'Patronaje especializado para conducción prolongada con fuelles de expansión ocultos en omóplatos, tejido con elasticidad mecánica y bolsillos técnicos discretos.',
    includedGarments: [
      'Blazer Técnico con fuelles dorsales de movimiento libre',
      '2 Pantalones sastre en tejido bielástico antiarrugas',
      '2 Camisas transpirables con cuello suave antimanchas',
      'Corbata de seguridad con clip de desenganche rápido anti-asfixia'
    ],
    fabricSpecs: {
      material: 'Lana Stretch 96% con 4% Elastano técnico DuPont',
      durability: '60.000 ciclos Martindale de uso intensivo al volante',
      treatment: 'Acabado Nanotex hidrorrepelente y termorregulador',
      origin: 'Tejido bi-elástico con memoria de forma'
    },
    basePricePerColaborador: 1150000,
    minOrderQuantity: 2,
    turnaroundDays: 12,
    highlightBadge: 'Resistencia Térmica & Confort al Volante'
  },
  {
    id: 'pkg-hospitality',
    category: 'hospitality_luxury',
    title: 'Hotelería Boutique & Gastronomía Fine Dining',
    subtitle: 'Hoteles 5 Estrellas, Clubes Privados y Restaurantes de Autor en Zona G',
    targetSector: 'Hospitality de Autor & Sommeliers',
    description: 'Estética contemporánea con influencias del tailoring europeo. Líneas limpias, materiales orgánicos frescos y versatilidad para turnos de servicio exigentes.',
    includedGarments: [
      'Chaqueta de Servicio corte Spalla Camicia o Chaleco Sastre',
      'Pantalón formal con ajustadores laterales sin pasadores',
      '2 Camisas cuello mandarín o formal en algodón transpirable',
      'Delantal de lino y cuero graso para sommelier / mixólogo'
    ],
    fabricSpecs: {
      material: 'Mezcla Lino Irlandés 40% & Lana Fina Peinada 60%',
      durability: 'Alta resistencia al lavado industrial suave',
      treatment: 'Pre-encogido sanforizado y tratamiento anti-salpicaduras',
      origin: 'Confección artesanal reforzada en puntos de tensión'
    },
    basePricePerColaborador: 980000,
    minOrderQuantity: 6,
    turnaroundDays: 15,
    highlightBadge: 'Estilo Editorial Europeo'
  },
  {
    id: 'pkg-corporate',
    category: 'executive_corporate',
    title: 'Equipos Directivos & Consultoría C-Suite',
    subtitle: 'Bancos de Inversión, Firmas de Abogados y Comités Ejecutivos',
    targetSector: 'Corporativo Premium & Banca Privada',
    description: 'La máxima expresión del vestuario corporativo. Cada prenda se corta con patrones individuales adaptados a la fisonomía de los directivos, entregando un look de sastrería a medida.',
    includedGarments: [
      'Traje Sastre 2 Piezas (Saco con media tapeta de lienzo artesanal)',
      '2 Camisas de etiqueta en Algodón Egipcio Giza 87 / Pima 120/2',
      'Pañuelo de bolsillo en seda natural con orillo cosido a mano'
    ],
    fabricSpecs: {
      material: 'Lana Virgen 100% Super 130s',
      durability: 'Caída impecable con recuperación natural de arrugas',
      treatment: 'Acabado natural transpirable sin siliconas pesadas',
      origin: 'Biella, Italia (Casas textiles históricas)'
    },
    basePricePerColaborador: 1850000,
    minOrderQuantity: 3,
    turnaroundDays: 18,
    highlightBadge: 'Calidad Sartorial Ejecutiva'
  }
];

export const FABRIC_OPTIONS: FabricOption[] = [
  {
    id: 'loro-piana-150',
    millName: 'Loro Piana',
    country: 'Italia',
    collection: 'Tasmanian Super 150s Extra Fine Wool',
    name: 'Azul Medianoche Micropatrón Sartorial',
    composition: '100% Lana Merino Super 150s (16 micrones)',
    weightGsm: 250,
    colorHex: '#141d36',
    pattern: 'Liso Clásico',
    surchargeCOP: 1450000,
    description: 'El tejido insignia del lujo italiano. Textura incomparablemente sedosa con un brillo óptico sutil perfecto para el clima templado y noches de Bogotá.',
    badge: 'Selección de la Casa'
  },
  {
    id: 'scabal-diamond',
    millName: 'Scabal',
    country: 'Inglaterra',
    collection: 'Diamond Chip Luxury Collection (Huddersfield)',
    name: 'Negro Azabache Real con Microdiamantes',
    composition: 'Lana Super 180s entrelazada con fragmentos microscópicos de diamantes',
    weightGsm: 280,
    colorHex: '#0f0f11',
    pattern: 'Liso Clásico',
    surchargeCOP: 2600000,
    description: 'La cumbre de Savile Row. Micropartículas de diamante incrustadas directamente en la fibra que refractan la luz de forma tenue y señorial.',
    badge: 'Black Tie & Ultra Lujo'
  },
  {
    id: 'dormeuil-millennial',
    millName: 'Dormeuil',
    country: 'Francia',
    collection: 'Millennial Collection (Paris / England)',
    name: 'Gris Marengo con Raya Diplomática Fina (Chalkstripe)',
    composition: '100% Lana Peinada Worsted con tratamiento antimanchas natural',
    weightGsm: 265,
    colorHex: '#2b303a',
    pattern: 'Raya Diplomática Fina',
    surchargeCOP: 1250000,
    description: 'Elegancia parisina en su máxima expresión. La raya tiza sutil alarga la figura y proyecta autoridad serena en reuniones de negocios.',
    badge: 'Clásico Financiero'
  },
  {
    id: 'zegna-trofeo',
    millName: 'Ermenegildo Zegna',
    country: 'Italia',
    collection: 'Trofeo Comfort Natural Stretch',
    name: 'Azul Índigo en Ojo de Perdiz (Birdseye)',
    composition: '100% Lana Australiana de fibras largas seleccionadas',
    weightGsm: 240,
    colorHex: '#1e293b',
    pattern: 'Ojo de Perdiz (Birdseye)',
    surchargeCOP: 1350000,
    description: 'Estructura micro-texturizada que resiste las arrugas en viajes de negocios y jornadas prolongadas sin perder un ápice de nitidez.',
    badge: 'Máxima Resiliencia'
  },
  {
    id: 'nacional-reserva',
    millName: 'Paño Nacional Reserva 100%',
    country: 'Colombia',
    collection: 'Reserva Artesanal Sabana de Bogotá',
    name: 'Azul Marino Clásico Sartorial',
    composition: '100% Lana Pura Nacional con hilado tradicional de alta densidad',
    weightGsm: 310,
    colorHex: '#1b2434',
    pattern: 'Liso Clásico',
    surchargeCOP: 0,
    description: 'Cuerpo firme y drapeado estructurado ideal para quienes buscan el peso tradicional de los abrigos y trajes de la Bogotá de antaño.',
    badge: 'Incluido en Base'
  },
  {
    id: 'loro-piana-prince',
    millName: 'Loro Piana',
    country: 'Italia',
    collection: 'Zelander Dream Wool & Cashmere',
    name: 'Príncipe de Gales Gris Humo con Cuadro Celeste',
    composition: '90% Lana Zelander + 10% Cashmere de Mongolia',
    weightGsm: 275,
    colorHex: '#475569',
    pattern: 'Príncipe de Gales',
    surchargeCOP: 1650000,
    description: 'La silueta del caballero cosmopolita. Cuadro británico suave con el toque cálido y aterciopelado del cashmere mongol.',
    badge: 'Distinción Británica'
  }
];

export const LINING_OPTIONS = [
  {
    id: 'seda_jacquard_monograma',
    name: 'Seda Jacquard Monograma Atelier Bogotá',
    description: 'Tejido exclusivo en telar jacquard con monograma sutil tono sobre tono.',
    priceCOP: 180000,
    swatchColor: '#1e293b'
  },
  {
    id: 'seda_burgundy_paisley',
    name: 'Seda Imperial Borgoña Motivo Paisley',
    description: 'Inspiración clásica italiana con arabescos elegantes en tonos vino tinto y bronce.',
    priceCOP: 220000,
    swatchColor: '#581c25'
  },
  {
    id: 'guacamaya_real_ilustrada',
    name: 'Seda Habotai Ilustrada: Fauna & Flora Andina',
    description: 'Ilustración exclusiva de orquídeas y colibríes andinos en acuarela sobre seda.',
    priceCOP: 290000,
    swatchColor: '#064e3b'
  },
  {
    id: 'cupro_zafiro_liso',
    name: 'Cupro Bemberg Transpirable Azul Zafiro',
    description: 'Fibra celulósica japonesa antiestática y ultra transpirable que evita la humedad corporal.',
    priceCOP: 0,
    swatchColor: '#1e3a8a'
  }
];

export const BUTTON_OPTIONS = [
  {
    id: 'cuerno_bufalo_mate',
    name: 'Cuerno de Búfalo de Agua Natural (Mate)',
    description: 'Botones tallados en cuerno genuino con betas únicas irrepetibles y acabado pulido mate.',
    priceCOP: 95000
  },
  {
    id: 'nacar_italiano_iridiscente',
    name: 'Nácar Australiano Iridiscente Grabado',
    description: 'Corte de concha marina pura con destellos prismáticos y grabado perimetral.',
    priceCOP: 140000
  },
  {
    id: 'alpaca_repujada_artesanal',
    name: 'Alpaca Metálica Pulida a Mano con Corona',
    description: 'Metal noble artesanal forjado en talleres de orfebrería de Bogotá para blazer náutico.',
    priceCOP: 190000
  }
];

export const BESPOKE_FITTING_STAGES = [
  {
    number: '01',
    title: 'Antropometría & Selección Táctil a Domicilio',
    subtitle: 'El Maestro Sastre visita tu residencia con la valija de paños',
    details: 'Toma de más de 32 medidas corporales: contornos, balance de postura, inclinación de hombros, caída cervical y análisis de movimiento en tu propio vestidor.',
    duration: '60 - 75 min',
    location: 'En tu domicilio (Bogotá Norte / Campestre)'
  },
  {
    number: '02',
    title: 'Prueba del Lienzo en Crudo (Basted Canvas Fitting)',
    subtitle: 'El esqueleto del traje antes de cortar el paño final',
    details: 'La prenda se prueba hilvanada a mano con hilos blancos temporales sin mangas definitivas para moldear la tapeta de pelo de caballo exactamente a la anatomía de tu torso.',
    duration: '40 - 50 min',
    location: 'En tu domicilio o taller privado'
  },
  {
    number: '03',
    title: 'Ajuste Fino de Caída & Entrega en Funda de Viaje',
    subtitle: 'Verificación milimétrica y planchado artesanal a vapor',
    details: 'Revisión final de longitud de manga (mostrando 1.2 cm de puño de camisa), caída de bota sobre el calzado y entrega en porta-trajes de lona transpirable con percha anatómica de cedro.',
    duration: '30 min',
    location: 'En tu domicilio'
  }
];
