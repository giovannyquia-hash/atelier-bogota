import { MeasurementProfile, TailorPartner, AlterationService, Appointment, CommissionRule, AnalyticsEventLog } from '../types';

export const INITIAL_MEASUREMENTS: MeasurementProfile = {
  id: 'VIP-BOG-001',
  clientName: 'Alejandro Santodomingo P.',
  phone: '+57 310 847 2291',
  email: 'a.santodomingo@inversionesbog.com',
  gender: 'Caballero',
  pechoBusto: 104,
  cintura: 88,
  cadera: 98,
  anchoHombros: 46.5,
  largoBrazo: 64,
  largoTalle: 48,
  entrepierna: 83,
  cuello: 40.5,
  contornoMuslo: 56,
  postura: 'Atleta / V-Taper',
  estiloPreferido: 'Soft Tailoring Napolitano',
  notasEspeciales: 'Preferencia por solapas en punta (peak lapels) de 9.5cm, forro desestructurado en seda y tiro medio-alto en pantalones con ajustadores laterales sin pasadores.',
  updatedAt: '2026-10-24 16:30'
};

export const TAILORS_DATA: TailorPartner[] = [
  {
    id: 'sastre-01',
    name: 'Maestro Hernán Gómez',
    avatar: 'HG',
    experienceYears: 24,
    rating: 4.98,
    totalServices: 412,
    status: 'en_camino',
    vehicle: {
      brand: 'Mazda',
      model: 'CX-5 Grand Touring',
      year: 2023,
      plate: 'KLU-842 (Bogotá)',
      color: 'Gris Grafito',
      soatExpiry: '15/12/2026'
    },
    currentZone: 'Carrera 7 con Calle 72 (Hacia Rosales)',
    coordinates: { x: 58, y: 44 },
    specialties: ['Paños Ingleses (Scabal / Holland & Sherry)', 'Smokings & Fracs', 'Desestructurado Spalla Camicia'],
    documents: {
      cedulaPdfUrl: 'CC_79.412.901_Bogota.pdf',
      cedulaStatus: 'aprobado',
      rutPdfUrl: 'RUT_Regimen_Comun_DIAN.pdf',
      rutStatus: 'aprobado',
      antecedentesPolicialesStatus: 'limpio_verificado',
      soatTecnomecanicaStatus: 'vigente',
      fechaVerificacion: '2026-08-15',
      observacionesSeguridad: 'Certificado de antecedentes penales y policivos sin registros. Licencia de conducción C1 vigente.'
    },
    portfolio: [
      {
        id: 'pf-01',
        title: 'Traje 3 Piezas Smoking Medianoche',
        category: 'Bespoke Etiqueta',
        description: 'Solapa chal en grosgrain de seda pura con ojal milanés hecho a mano y forro Bemberg transpirable.',
        fabric: 'Lana Super 160s Vitale Barberis Canonico',
        technique: 'Picado de solapa en crin animal natural'
      },
      {
        id: 'pf-02',
        title: 'Blazer Desestructurado Napolitano',
        category: 'Sartoría Fina',
        description: 'Hombro Spalla Camicia sin hombreras, bolsillos parche en media luna y doble abertura trasera.',
        fabric: 'Cashmere y Seda Loro Piana 280g',
        technique: 'Costura francesa e hilván de ajuste en seda'
      }
    ],
    bankAccount: {
      type: 'Bancolombia',
      number: '•••• 4920 (Ahorros)',
      holderName: 'Hernán Gómez R.',
      documentId: 'CC 79.412.901'
    },
    balancePending: 1840000,
    balanceWithdrawn: 8450000,
    verified: true,
    activeDispatchesToday: 4
  },
  {
    id: 'sastre-02',
    name: 'Maestra Cecilia Duarte',
    avatar: 'CD',
    experienceYears: 19,
    rating: 4.95,
    totalServices: 328,
    status: 'online',
    vehicle: {
      brand: 'Volkswagen',
      model: 'Jetta GLI Turbo',
      year: 2022,
      plate: 'FTW-319 (Bogotá)',
      color: 'Azul Noche',
      soatExpiry: '22/01/2027'
    },
    currentZone: 'Parque de la 93 (El Chicó)',
    coordinates: { x: 52, y: 32 },
    specialties: ['Vestidos de Alta Noche', 'Seda Natural & Encajes Chantilly', 'Entalles Femeninos Alta Costura'],
    documents: {
      cedulaPdfUrl: 'CC_52.890.114_Bogota.pdf',
      cedulaStatus: 'aprobado',
      rutPdfUrl: 'RUT_Duarte_Confeccion.pdf',
      rutStatus: 'aprobado',
      antecedentesPolicialesStatus: 'limpio_verificado',
      soatTecnomecanicaStatus: 'vigente',
      fechaVerificacion: '2026-09-02',
      observacionesSeguridad: 'Certificación técnica SENA Alta Costura aprobada. Récord de conducción impecable.'
    },
    portfolio: [
      {
        id: 'pf-03',
        title: 'Vestido Gala Pedrería en Torso',
        category: 'Alta Costura Noche',
        description: 'Ajuste milimétrico de corsetería interna con varillas francesas y reducción de cola.',
        fabric: 'Crepé de seda pesada y pedrería checa',
        technique: 'Bordado artesanal y cierre invisible reforzado'
      }
    ],
    bankAccount: {
      type: 'Transfiya',
      number: '312 904 1182',
      holderName: 'Cecilia Duarte P.',
      documentId: 'CC 52.890.114'
    },
    balancePending: 1250000,
    balanceWithdrawn: 6200000,
    verified: true,
    activeDispatchesToday: 2
  },
  {
    id: 'sastre-03',
    name: 'Maestro Marco Aurelio Silva',
    avatar: 'MS',
    experienceYears: 28,
    rating: 5.0,
    totalServices: 580,
    status: 'en_cita',
    vehicle: {
      brand: 'Toyota',
      model: 'Corolla Cross Hybrid',
      year: 2024,
      plate: 'BYZ-601 (Bogotá)',
      color: 'Plata Glaciar',
      soatExpiry: '04/04/2027'
    },
    currentZone: 'Calle 108 con Carrera 3 (Santa Ana Oriental)',
    coordinates: { x: 62, y: 22 },
    specialties: ['Sastrería Bespoke Tradicional', 'Ajuste de Abrigos de Cashmere', 'Ojales Milaneses a Mano'],
    documents: {
      cedulaPdfUrl: 'CC_19.340.281_Bogota.pdf',
      cedulaStatus: 'aprobado',
      rutPdfUrl: 'RUT_Silva_Sartoria.pdf',
      rutStatus: 'aprobado',
      antecedentesPolicialesStatus: 'limpio_verificado',
      soatTecnomecanicaStatus: 'vigente',
      fechaVerificacion: '2026-07-10',
      observacionesSeguridad: 'Maestro sastre con más de 25 años en talleres de la Carrera 11 y Calle 72.'
    },
    portfolio: [
      {
        id: 'pf-04',
        title: 'Abrigo Overcoat Cashmere Double-Breasted',
        category: 'Abrigos de Lujo',
        description: 'Confección artesanal de hombreras, forro de seda acolchado y solapas peak pronunciadas.',
        fabric: 'Cashmere 100% Dormeuil 540g',
        technique: 'Botones de cuerno de búfalo legítimo picados a mano'
      }
    ],
    bankAccount: {
      type: 'Bancolombia',
      number: '•••• 1109 (Ahorros)',
      holderName: 'Marco Aurelio Silva',
      documentId: 'CC 19.340.281'
    },
    balancePending: 2450000,
    balanceWithdrawn: 14300000,
    verified: true,
    activeDispatchesToday: 3
  },
  {
    id: 'sastre-04',
    name: 'Sastre Postulante Julián Méndez',
    avatar: 'JM',
    experienceYears: 12,
    rating: 4.8,
    totalServices: 45,
    status: 'offline',
    vehicle: {
      brand: 'Chevrolet',
      model: 'Onix RS Turbo',
      year: 2022,
      plate: 'WLT-502 (Bogotá)',
      color: 'Negro Ébano',
      soatExpiry: '10/05/2026'
    },
    currentZone: 'Calle 122 con 15 (Santa Bárbara)',
    coordinates: { x: 45, y: 18 },
    specialties: ['Pantalones Sartoriales con Ajustadores', 'Camisería a Medida'],
    documents: {
      cedulaPdfUrl: 'CC_1.020.441.902.pdf',
      cedulaStatus: 'pendiente',
      rutPdfUrl: 'RUT_Pendiente_Actualizar.pdf',
      rutStatus: 'pendiente',
      antecedentesPolicialesStatus: 'limpio_verificado',
      soatTecnomecanicaStatus: 'vigente',
      observacionesSeguridad: 'Documento RUT pendiente de validación de actividad económica 1410 (Confección de prendas de vestir).'
    },
    portfolio: [
      {
        id: 'pf-05',
        title: 'Pantalón Gurkha con Valona 5cm',
        category: 'Pantalones Bespoke',
        description: 'Cinturilla extendida cruzada tipo Gurkha con hebillas de latón pulido.',
        fabric: 'Lino Irlandés Pesado 320g',
        technique: 'Hilván interior y refuerzo de entrepierna'
      }
    ],
    bankAccount: {
      type: 'Daviplata',
      number: '315 889 4410',
      holderName: 'Julián Méndez C.',
      documentId: 'CC 1.020.441.902'
    },
    balancePending: 0,
    balanceWithdrawn: 0,
    verified: false,
    activeDispatchesToday: 0
  }
];

export const ALTERATION_SERVICES: AlterationService[] = [
  {
    id: 'srv-01',
    name: 'Entalle y Ajuste de Cintura / Espalda en Saco Bespoke',
    category: 'Trajes & Sacos',
    description: 'Alineación de costuras laterales y centro de espalda respetando la curvatura lumbar natural.',
    basePrice: 110000,
    estimatedDays: 3,
    complexity: 'Alta'
  },
  {
    id: 'srv-02',
    name: 'Ajuste de Hombros y Sisa (Desmonte Total)',
    category: 'Trajes & Sacos',
    description: 'Desmontaje artesanal de mangas y reducción milimétrica de hombreras con costura a mano.',
    basePrice: 195000,
    estimatedDays: 4,
    complexity: 'Maestría'
  },
  {
    id: 'srv-03',
    name: 'Basta / Ruedo de Pantalón con Hilván Invisible o Valona',
    category: 'Pantalones & Faldas',
    description: 'Terminación con cinta de refuerzo interior y puntada ciega o valona italiana de 4.5cm.',
    basePrice: 48000,
    estimatedDays: 2,
    complexity: 'Baja'
  },
  {
    id: 'srv-04',
    name: 'Estrechado de Pierna / Bota (Tapering a Medida)',
    category: 'Pantalones & Faldas',
    description: 'Reducción de holgura desde la rodilla hasta el tobillo manteniendo el aplomo del quiebre.',
    basePrice: 65000,
    estimatedDays: 2,
    complexity: 'Media'
  },
  {
    id: 'srv-05',
    name: 'Entalle de Vestido de Noche / Gala con Pedrería',
    category: 'Vestidos de Gala',
    description: 'Ajuste de corsetería, busto y cadera protegiendo pedrería bordada y forros en gasa de seda.',
    basePrice: 220000,
    estimatedDays: 5,
    complexity: 'Maestría'
  },
  {
    id: 'srv-06',
    name: 'Cambio de Forro Interior en Seda Pura Italiana',
    category: 'Trajes & Sacos',
    description: 'Confección y reemplazo del forro interno con costuras francesas y bolsillos internos personalizados.',
    basePrice: 280000,
    estimatedDays: 4,
    complexity: 'Alta'
  },
  {
    id: 'srv-07',
    name: 'Confección a Medida: Traje 2 Piezas (Paño Loro Piana / Dormeuil)',
    category: 'Alta Costura Nueva',
    description: 'Proceso sartorial completo de 3 pruebas: corte a mano, picado de solapa en crin y ojales en seda.',
    basePrice: 2850000,
    estimatedDays: 14,
    complexity: 'Maestría'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'CITA-BOG-1049',
    clientName: 'Alejandro Santodomingo P.',
    clientPhone: '+57 310 847 2291',
    clientAddress: 'Cra. 1 # 74-32, Rosales Penthouse 1102',
    neighborhood: 'Rosales',
    coordinates: { x: 74, y: 55 },
    dateTime: 'Hoy · En camino (ETA 12 mins)',
    status: 'en_camino',
    tailorId: 'sastre-01',
    items: [
      {
        serviceName: 'Ajuste de Hombros y Sisa (Desmonte Total)',
        garmentType: 'Blazer Tom Ford Azul Cobalto',
        price: 195000,
        fabricNote: 'Lana 150s con forro de cupro',
        complexity: 'Maestría'
      },
      {
        serviceName: 'Basta / Ruedo de Pantalón con Hilván Invisible o Valona',
        garmentType: 'Pantalón Loro Piana Gris Perla',
        price: 48000,
        fabricNote: 'Valona italiana 4.5cm sin quiebre',
        complexity: 'Baja'
      }
    ],
    totalEstimate: 243000,
    platformFee: 48600, // 20%
    tailorNet: 194400,
    paymentMethod: 'Bold Tarjeta Black',
    paymentStatus: 'autorizado',
    etaMinutes: 12,
    notes: 'Seguridad del edificio notificada. Parqueadero de visitantes asignado #4.',
    clientSignature: true,
    custodySealNumber: 'BOG-SEC-9402',
    inFittingMeasurements: {
      cuello: 40.5,
      hombros: 46.5,
      cintura: 88.0,
      largoBota: 102.5
    },
    custodyTimeline: [
      {
        time: '14:30',
        title: 'Medidas tomadas por Maestro Sastre Carlos Mendoza',
        status: 'completado',
        description: 'Toma milimétrica en penthouse del cliente con cinta de precisión y alfileres franceses. Firma de autorización capturada.',
        location: 'Rosales, Bogotá (Cra. 1 # 74-32)',
        badge: 'Firma Registrada'
      },
      {
        time: '15:15',
        title: 'Prenda ingresada de forma segura al Taller Asociado',
        status: 'completado',
        description: 'Traslado privado en vehículo verificado con portatrajes impermeable y precinto #BOG-SEC-9402.',
        location: 'Taller Central Sartorial (Norte de Bogotá - Cl. 85 # 11-53)',
        badge: 'Precinto Activo'
      },
      {
        time: 'En Proceso',
        title: 'Modificación y costura fina en ejecución',
        status: 'en_proceso',
        description: 'Desmonte artesanal de hombreras, entalle de costados e hilván invisible en paño lana 150s.',
        location: 'Mesa de Corte & Picado No. 3'
      },
      {
        time: 'Pendiente',
        title: 'Control de calidad y planchado premium',
        status: 'pendiente',
        description: 'Inspección de aplomo bajo maniquí termofijado y vaporizado a mano sin brillos.',
        location: 'Estación de Planchado Artesanal'
      },
      {
        time: 'Pendiente',
        title: 'Ruta de devolución a domicilio',
        status: 'pendiente',
        description: 'Despacho privado en portatrajes de lujo hacia su residencia u oficina.',
        location: 'Destino: Penthouse Rosales'
      }
    ]
  },
  {
    id: 'CITA-BOG-1048',
    clientName: 'Valeria Cárdenas Restrepo',
    clientPhone: '+57 318 450 9902',
    clientAddress: 'Calle 93B # 8-40, Penthouse El Chicó',
    neighborhood: 'El Chicó',
    coordinates: { x: 64, y: 40 },
    dateTime: 'Hoy · 11:30 AM',
    status: 'prendas_en_taller',
    tailorId: 'sastre-02',
    items: [
      {
        serviceName: 'Entalle de Vestido de Noche / Gala con Pedrería',
        garmentType: 'Vestido Carolina Herrera Esmeralda',
        price: 220000,
        fabricNote: 'Ajuste de torso y reducción de cola',
        complexity: 'Maestría'
      }
    ],
    totalEstimate: 220000,
    platformFee: 44000,
    tailorNet: 176000,
    paymentMethod: 'ePayco',
    paymentStatus: 'liquidado',
    notes: 'Prueba programada para el jueves en taller central.',
    clientSignature: true
  },
  {
    id: 'CITA-BOG-1047',
    clientName: 'Rodrigo Echeverri D.',
    clientPhone: '+57 315 229 1140',
    clientAddress: 'Cra. 4 # 112-20, Santa Ana Oriental',
    neighborhood: 'Santa Ana',
    coordinates: { x: 78, y: 26 },
    dateTime: 'Ayer · 4:00 PM',
    status: 'prueba_hilvan',
    tailorId: 'sastre-03',
    items: [
      {
        serviceName: 'Confección a Medida: Traje 2 Piezas (Paño Loro Piana / Dormeuil)',
        garmentType: 'Traje Gris Oxford Raya Tiza',
        price: 2850000,
        fabricNote: 'Segunda prueba de mangas y forros',
        complexity: 'Maestría'
      }
    ],
    totalEstimate: 2850000,
    platformFee: 570000,
    tailorNet: 2280000,
    paymentMethod: 'Bold Tarjeta Black',
    paymentStatus: 'liquidado',
    notes: 'Aprobado ajuste de solapas. Listo para botones de cuerno natural.',
    clientSignature: true
  }
];

export const DEFAULT_COMMISSION_RULE: CommissionRule = {
  id: 'rule-standard',
  name: 'Esquema Estándar Bogotá VIP',
  baseRatePercent: 20,
  highVolumeDiscountPercent: 5,
  expressSurchargePercent: 15,
  minPlatformFeeCOP: 30000,
  nightSurchargeActive: true,
  active: true
};

export const INITIAL_ANALYTICS_EVENTS: AnalyticsEventLog[] = [
  {
    id: 'evt-01',
    timestamp: 'Hace 3 min',
    channel: 'Meta CAPI (Graph API)',
    eventName: 'Schedule_VIP_Fitting',
    zone: 'Rosales (110221)',
    valueCOP: 243000,
    status: 'success_200',
    payloadSummary: '{"event_source": "server", "custom_data": {"neighborhood": "Rosales", "stratum": 6, "garment_count": 2}}'
  },
  {
    id: 'evt-02',
    timestamp: 'Hace 18 min',
    channel: 'Google Analytics 4 (Measurement Protocol)',
    eventName: 'Measurement_Profile_Calibrated',
    zone: 'El Chicó (110221)',
    valueCOP: 0,
    status: 'success_200',
    payloadSummary: '{"client_tier": "VIP_Black", "preferred_style": "Soft Tailoring Napolitano", "posture": "Atleta"}'
  },
  {
    id: 'evt-03',
    timestamp: 'Hace 42 min',
    channel: 'Meta CAPI (Graph API)',
    eventName: 'Purchase_Luxury_Service',
    zone: 'Santa Ana Oriental (110111)',
    valueCOP: 2850000,
    status: 'success_200',
    payloadSummary: '{"currency": "COP", "content_type": "haute_couture_bespoke", "value": 2850000, "user_data": {"ph_sha256": "e3b0c442..."}}'
  }
];
