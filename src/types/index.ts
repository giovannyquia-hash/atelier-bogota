export type UserRole = 'client' | 'tailor' | 'admin';

export interface MeasurementProfile {
  id: string;
  clientName: string;
  phone: string;
  email: string;
  gender: 'Caballero' | 'Dama' | 'Unisex';
  pechoBusto: number; // cm
  cintura: number;
  cadera: number;
  anchoHombros: number;
  largoBrazo: number;
  largoTalle: number;
  entrepierna: number;
  cuello: number;
  contornoMuslo: number;
  postura: 'Erguida' | 'Inclinada al frente' | 'Hombros caídos' | 'Atleta / V-Taper';
  estiloPreferido: 'Slim Fit Europeo' | 'Classic Tailored' | 'Soft Tailoring Napolitano' | 'Oversize Sartorial';
  notasEspeciales: string;
  updatedAt: string;
}

export interface DocumentVerification {
  cedulaPdfUrl?: string;
  cedulaStatus: 'aprobado' | 'pendiente' | 'rechazado';
  rutPdfUrl?: string;
  rutStatus: 'aprobado' | 'pendiente' | 'rechazado';
  antecedentesPolicialesStatus: 'limpio_verificado' | 'pendiente' | 'rechazado';
  soatTecnomecanicaStatus: 'vigente' | 'vencido' | 'pendiente';
  fechaVerificacion?: string;
  observacionesSeguridad?: string;
}

export interface PortfolioPiece {
  id: string;
  title: string;
  category: string;
  description: string;
  fabric: string;
  technique: string;
}

export interface TailorPartner {
  id: string;
  name: string;
  avatar: string;
  experienceYears: number;
  rating: number;
  totalServices: number;
  status: 'online' | 'offline' | 'en_camino' | 'en_cita';
  vehicle: {
    brand: string;
    model: string;
    year: number;
    plate: string;
    color: string;
    soatExpiry: string;
    photoPlaceholder?: string;
  };
  currentZone: string;
  coordinates: { x: number; y: number }; // percentage on Bogota map
  specialties: string[];
  documents: DocumentVerification;
  portfolio: PortfolioPiece[];
  bankAccount: {
    type: 'Bancolombia' | 'Transfiya' | 'Daviplata';
    number: string;
    holderName: string;
    documentId: string;
  };
  balancePending: number;
  balanceWithdrawn: number;
  verified: boolean;
  activeDispatchesToday: number;
}

export interface AlterationService {
  id: string;
  name: string;
  category: 'Trajes & Sacos' | 'Pantalones & Faldas' | 'Vestidos de Gala' | 'Camisas & Blusas' | 'Alta Costura Nueva';
  description: string;
  basePrice: number; // in COP
  estimatedDays: number;
  complexity: 'Baja' | 'Media' | 'Alta' | 'Maestría';
}

export interface InFittingMeasurements {
  cuello: number; // cm
  hombros: number; // cm
  cintura: number; // cm
  largoBota: number; // cm
}

export interface CustodyEvent {
  time: string;
  title: string;
  status: 'completado' | 'en_proceso' | 'pendiente';
  description: string;
  location?: string;
  badge?: string;
}

export interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  neighborhood: 'Rosales' | 'El Chicó' | 'Santa Ana' | 'La Cabrera' | 'Santa Bárbara' | 'El Virrey' | 'Nogal';
  coordinates: { x: number; y: number };
  dateTime: string;
  status: 'solicitada' | 'sastre_asignado' | 'en_camino' | 'en_cita' | 'prendas_en_taller' | 'prueba_hilvan' | 'finalizado';
  tailorId?: string;
  items: {
    serviceName: string;
    garmentType: string;
    price: number;
    fabricNote?: string;
    complexity?: string;
  }[];
  totalEstimate: number;
  platformFee: number; // COP (e.g. 20%)
  tailorNet: number;
  paymentMethod: 'Bold Tarjeta Black' | 'ePayco' | 'PayU' | 'Apple Pay';
  paymentStatus: 'autorizado' | 'liquidado' | 'pendiente';
  etaMinutes?: number;
  notes?: string;
  clientSignature?: boolean;
  qrVerified?: boolean;
  qrVerifiedAt?: string;
  inFittingMeasurements?: InFittingMeasurements;
  custodyTimeline?: CustodyEvent[];
  custodySealNumber?: string;
}

export interface CommissionRule {
  id: string;
  name: string;
  baseRatePercent: number; // e.g. 20%
  highVolumeDiscountPercent: number; // e.g. 5% if > 25 appointments
  expressSurchargePercent: number; // e.g. 15%
  minPlatformFeeCOP: number;
  nightSurchargeActive: boolean;
  active: boolean;
}

export interface AnalyticsEventLog {
  id: string;
  timestamp: string;
  channel: 'Meta CAPI (Graph API)' | 'Google Analytics 4 (Measurement Protocol)';
  eventName: string;
  zone: string;
  valueCOP: number;
  status: 'success_200' | 'processing';
  payloadSummary: string;
}

// ==========================================
// MÓDULO: DOTACIONES DE UNIFORME VIP
// ==========================================

export type UniformCategory = 
  | 'residential_concierge' 
  | 'executive_corporate' 
  | 'hospitality_luxury' 
  | 'diplomatic_drivers';

export interface UniformItemOption {
  id: string;
  name: string;
  pieceType: 'Saco Sastre' | 'Pantalón Lana Tropical' | 'Falda Sastre' | 'Camisa Algodón Pima' | 'Blusa Seda/Algodón' | 'Chaleco Estructurado' | 'Corbata/Pañuelo Seda';
  unitPriceCOP: number;
  description: string;
}

export interface UniformPackage {
  id: string;
  category: UniformCategory;
  title: string;
  subtitle: string;
  targetSector: string;
  description: string;
  includedGarments: string[];
  fabricSpecs: {
    material: string;
    durability: string;
    treatment: string;
    origin: string;
  };
  basePricePerColaborador: number; // COP
  minOrderQuantity: number;
  turnaroundDays: number;
  highlightBadge: string;
}

export interface UniformQuoteState {
  packageId: string;
  category: UniformCategory;
  collaboratorsCount: number;
  includeEmbroideredLogo: boolean;
  includeIndividualMonogram: boolean;
  includeCustomEngravedButtons: boolean;
  includeOnSiteMeasurementVisit: boolean;
  expressDelivery: boolean;
  companyName: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  addressZone: string;
  deliveryDateEstimated: string;
  notes: string;
}

// ==========================================
// MÓDULO: TRAJES SOBRE MEDIDAS (BESPOKE)
// ==========================================

export type BespokeSuitType = 
  | 'two_piece' 
  | 'three_piece' 
  | 'tuxedo_black_tie' 
  | 'sport_jacket_blazer';

export interface FabricOption {
  id: string;
  millName: 'Loro Piana' | 'Scabal' | 'Dormeuil' | 'Ermenegildo Zegna' | 'Paño Nacional Reserva 100%';
  country: 'Italia' | 'Inglaterra' | 'Francia' | 'Colombia';
  collection: string;
  name: string;
  composition: string;
  weightGsm: number;
  colorHex: string;
  pattern: 'Liso Clásico' | 'Raya Diplomática Fina' | 'Ojo de Perdiz (Birdseye)' | 'Príncipe de Gales' | 'Espiga Sutil (Herringbone)';
  surchargeCOP: number;
  description: string;
  badge?: string;
}

export type CanvasConstruction = 
  | 'full_canvas' 
  | 'half_canvas' 
  | 'unstructured_napolitano';

export type LapelStyle = 
  | 'notch' 
  | 'peak' 
  | 'shawl';

export interface BespokeConfigState {
  suitType: BespokeSuitType;
  fabricId: string;
  canvasConstruction: CanvasConstruction;
  lapelStyle: LapelStyle;
  buttonCount: '1_boton' | '2_botones' | 'cruzado_double_breasted';
  ventType: 'doble_inglesa' | 'central_americana' | 'sin_aberturas_italiana';
  liningStyle: 'seda_jacquard_monograma' | 'seda_burgundy_paisley' | 'guacamaya_real_ilustrada' | 'cupro_zafiro_liso';
  buttonMaterial: 'cuerno_bufalo_mate' | 'nacar_italiano_iridiscente' | 'alpaca_repujada_artesanal';
  customMonogram: {
    enabled: boolean;
    initials: string;
    threadColor: 'Oro Clásico' | 'Plata Inglesa' | 'Tono sobre Tono Champagne';
    placement: 'Interior del saco' | 'Debajo del cuello' | 'Puño izquierdo de camisa';
  };
  clientNotes: string;
  selectedTailorId?: string;
  fittingScheduleRequested: boolean;
}

