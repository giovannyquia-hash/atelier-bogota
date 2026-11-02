import React, { useState } from 'react';
import { 
  Scissors, 
  Sparkles, 
  Check, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Ruler, 
  Layers, 
  Award, 
  Clock, 
  ChevronRight, 
  Compass, 
  Eye, 
  HeartHandshake,
  CheckCircle2,
  X,
  FileCheck2,
  UserCheck
} from 'lucide-react';
import { 
  FABRIC_OPTIONS, 
  LINING_OPTIONS, 
  BUTTON_OPTIONS, 
  BESPOKE_FITTING_STAGES 
} from '../data/bespokeAndUniformsData';
import { 
  BespokeSuitType, 
  CanvasConstruction, 
  LapelStyle, 
  MeasurementProfile, 
  TailorPartner 
} from '../types';

interface BespokeSuitsModuleProps {
  userMeasurements: MeasurementProfile;
  availableTailors: TailorPartner[];
  onBookFittingAppointment?: (appointmentData: {
    suitType: string;
    fabricName: string;
    tailorId: string;
    date: string;
    address: string;
    totalCOP: number;
    notes: string;
  }) => void;
  onNavigateToClient?: () => void;
}

const SUIT_TYPES = [
  {
    id: 'two_piece' as BespokeSuitType,
    name: 'Traje 2 Piezas Clásico',
    subtitle: 'Saco Sastre + Pantalón de Corte Italiano',
    basePrice: 2850000,
    leadTime: '21 días hábiles',
    description: 'El pilar del armario masculino. Corte impecable, solapa proporcionada al pecho y pantalón con tiro medio anatómico.'
  },
  {
    id: 'three_piece' as BespokeSuitType,
    name: 'Traje 3 Piezas Ceremonial',
    subtitle: 'Saco + Pantalón + Chaleco Entallado',
    basePrice: 3450000,
    leadTime: '24 días hábiles',
    description: 'La máxima distinción para bodas, actos solemnes y juntas directivas. El chaleco ciñe el torso con caída regia.'
  },
  {
    id: 'tuxedo_black_tie' as BespokeSuitType,
    name: 'Esmoquin Black Tie / Gala',
    subtitle: 'Solapa en Raso de Seda Pura + Vivo Lateral',
    basePrice: 3650000,
    leadTime: '25 días hábiles',
    description: 'Etiqueta rigurosa. Solapa en grosgrain de seda, botones forrados a mano y pantalón con galón de satén perimetral.'
  },
  {
    id: 'sport_jacket_blazer' as BespokeSuitType,
    name: 'Blazer Náutico / Saco Sport',
    subtitle: 'Desestructurado Spalla Camicia',
    basePrice: 2150000,
    leadTime: '18 días hábiles',
    description: 'Sastrería informal de lujo. Sin hombreras rígidas, ultraligero y versátil para combinar con pantalones de lino o dril.'
  }
];

export const BespokeSuitsModule: React.FC<BespokeSuitsModuleProps> = ({
  userMeasurements,
  availableTailors,
  onBookFittingAppointment,
  onNavigateToClient
}) => {
  // Configuration State
  const [selectedSuitType, setSelectedSuitType] = useState<BespokeSuitType>('two_piece');
  const [selectedFabricId, setSelectedFabricId] = useState<string>(FABRIC_OPTIONS[0].id);
  const [canvasConstruction, setCanvasConstruction] = useState<CanvasConstruction>('full_canvas');
  const [lapelStyle, setLapelStyle] = useState<LapelStyle>('peak');
  const [buttonCount, setButtonCount] = useState<'1_boton' | '2_botones' | 'cruzado_double_breasted'>('2_botones');
  const [ventType, setVentType] = useState<'doble_inglesa' | 'central_americana' | 'sin_aberturas_italiana'>('doble_inglesa');
  const [selectedLiningId, setSelectedLiningId] = useState<string>(LINING_OPTIONS[0].id);
  const [selectedButtonId, setSelectedButtonId] = useState<string>(BUTTON_OPTIONS[0].id);
  
  // Monogram State
  const [monogramEnabled, setMonogramEnabled] = useState<boolean>(true);
  const [monogramText, setMonogramText] = useState<string>('A.S.P.');
  const [monogramColor, setMonogramColor] = useState<'Oro Clásico' | 'Plata Inglesa' | 'Tono sobre Tono Champagne'>('Oro Clásico');
  const [monogramPlacement, setMonogramPlacement] = useState<'Interior del saco' | 'Bajo el cuello' | 'Puño de camisa'>('Interior del saco');

  // Appointment & Tailor selection
  const [selectedTailorId, setSelectedTailorId] = useState<string>(availableTailors[0]?.id || 'sastre-01');
  const [appointmentDate, setAppointmentDate] = useState<string>('2026-11-06T10:00');
  const [fittingAddress, setFittingAddress] = useState<string>('Calle 77 # 2-45, Apto 801, Rosales, Bogotá');
  const [specialTailorNotes, setSpecialTailorNotes] = useState<string>('Preferencia por solapas generosas de 9.5cm y hombrera casi nula (estilo napolitano suave).');
  
  // Modals
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  // Active items calculation
  const activeSuit = SUIT_TYPES.find(s => s.id === selectedSuitType) || SUIT_TYPES[0];
  const activeFabric = FABRIC_OPTIONS.find(f => f.id === selectedFabricId) || FABRIC_OPTIONS[0];
  const activeLining = LINING_OPTIONS.find(l => l.id === selectedLiningId) || LINING_OPTIONS[0];
  const activeButton = BUTTON_OPTIONS.find(b => b.id === selectedButtonId) || BUTTON_OPTIONS[0];
  const activeTailor = availableTailors.find(t => t.id === selectedTailorId) || availableTailors[0];

  // Price Calculation
  const canvasSurcharge = canvasConstruction === 'full_canvas' ? 450000 : (canvasConstruction === 'half_canvas' ? 0 : 200000);
  const monogramSurcharge = monogramEnabled ? 75000 : 0;
  
  const totalPriceCOP = 
    activeSuit.basePrice + 
    activeFabric.surchargeCOP + 
    canvasSurcharge + 
    activeLining.priceCOP + 
    activeButton.priceCOP + 
    monogramSurcharge;

  const handleConfirmBooking = () => {
    setShowBookingModal(false);
    setBookingSuccess(true);
    if (onBookFittingAppointment) {
      onBookFittingAppointment({
        suitType: activeSuit.name,
        fabricName: `${activeFabric.millName} - ${activeFabric.name}`,
        tailorId: selectedTailorId,
        date: appointmentDate,
        address: fittingAddress,
        totalCOP: totalPriceCOP,
        notes: specialTailorNotes
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      {/* Editorial Luxury Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-amber-800 uppercase mb-3">
                <Scissors className="w-4 h-4 text-amber-700" />
                <span>Atelier Sartorial Privé • Hecho Sobre Medidas en Bogotá</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Trajes Sobre Medidas (Bespoke Sartorial)
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                El ritual intemporal de la sastrería a medida, llevado directamente a tu residencia. Selecciona entre las casas laneras más prestigiosas del mundo (Loro Piana, Scabal, Dormeuil), personaliza cada detalle estructural y recibe la visita del Maestro Sastre para el protocolo de las tres pruebas sartoriales.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
                <span className="flex items-center gap-1.5 bg-slate-100 text-slate-800 px-3 py-1.5 rounded-md border border-slate-200">
                  <Ruler className="w-3.5 h-3.5 text-amber-700" />
                  32 Puntos Antropométricos Guardados
                </span>
                <span className="flex items-center gap-1.5 bg-slate-100 text-slate-800 px-3 py-1.5 rounded-md border border-slate-200">
                  <Layers className="w-3.5 h-3.5 text-blue-600" />
                  Full Canvas Flotante en Pelo de Caballo
                </span>
                <span className="flex items-center gap-1.5 bg-slate-100 text-slate-800 px-3 py-1.5 rounded-md border border-slate-200">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  Paños Certificados de Importación
                </span>
              </div>
            </div>

            {/* User Profile Connected Card */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5 lg:max-w-sm shrink-0 shadow-xs">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-amber-900 uppercase tracking-wider">
                  Ficha Antropométrica Activa
                </span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-semibold rounded text-[10px]">
                  Verificada
                </span>
              </div>
              <h4 className="font-serif font-bold text-slate-900 text-base">
                {userMeasurements.clientName}
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Postura: <strong>{userMeasurements.postura}</strong> • Estilo: <strong>{userMeasurements.estiloPreferido}</strong>
              </p>
              <div className="mt-3 pt-3 border-t border-amber-200/60 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white/80 p-1.5 rounded border border-amber-200/50">
                  <span className="text-[10px] text-slate-500 block">Pecho</span>
                  <span className="font-bold text-slate-900">{userMeasurements.pechoBusto} cm</span>
                </div>
                <div className="bg-white/80 p-1.5 rounded border border-amber-200/50">
                  <span className="text-[10px] text-slate-500 block">Cintura</span>
                  <span className="font-bold text-slate-900">{userMeasurements.cintura} cm</span>
                </div>
                <div className="bg-white/80 p-1.5 rounded border border-amber-200/50">
                  <span className="text-[10px] text-slate-500 block">Hombros</span>
                  <span className="font-bold text-slate-900">{userMeasurements.anchoHombros} cm</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 italic text-center">
                El Maestro Sastre cotejará estas medidas en tu primera cita a domicilio.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Studio Configurator Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Customization Options (8 Columns) */}
          <div className="lg:col-span-8 space-y-10">

            {/* STEP 1: SILUETA Y TIPO DE PRENDA */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold font-serif">
                    1
                  </span>
                  <h2 className="text-lg font-serif font-bold text-slate-900">
                    Silueta & Tipo de Prenda
                  </h2>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {SUIT_TYPES.length} opciones disponibles
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SUIT_TYPES.map((suit) => {
                  const isSelected = suit.id === selectedSuitType;
                  return (
                    <div
                      key={suit.id}
                      onClick={() => setSelectedSuitType(suit.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/30 ring-1 ring-amber-500/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-serif font-bold text-slate-900 text-sm">
                          {suit.name}
                        </h3>
                        <span className="text-xs font-bold text-amber-800 shrink-0 font-serif">
                          ${suit.basePrice.toLocaleString('es-CO')}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {suit.subtitle}
                      </p>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {suit.description}
                      </p>
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {suit.leadTime}
                        </span>
                        <span className={`font-semibold ${isSelected ? 'text-amber-700' : 'text-slate-400'}`}>
                          {isSelected ? '✓ Seleccionado' : 'Elegir'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* STEP 2: PAÑOS Y CASAS TEXTILES */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold font-serif">
                    2
                  </span>
                  <h2 className="text-lg font-serif font-bold text-slate-900">
                    Casa Textil & Paño Exclusivo
                  </h2>
                </div>
                <span className="text-xs text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Lana Merino Super 130s a 180s
                </span>
              </div>

              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Cada paño cuenta con trazabilidad de origen y certificación de hilatura. El Maestro Sastre llevará los retazos táctiles reales a tu primera sesión.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FABRIC_OPTIONS.map((fabric) => {
                  const isSelected = fabric.id === selectedFabricId;
                  return (
                    <div
                      key={fabric.id}
                      onClick={() => setSelectedFabricId(fabric.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/20 ring-1 ring-amber-500/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      {fabric.badge && (
                        <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 bg-slate-900 text-white rounded">
                          {fabric.badge}
                        </span>
                      )}

                      <div className="flex items-center gap-3 mb-2">
                        {/* Fabric Color Swatch */}
                        <div 
                          className="w-8 h-8 rounded-full border border-slate-300 shadow-inner shrink-0" 
                          style={{ backgroundColor: fabric.colorHex }}
                        />
                        <div>
                          <div className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                            {fabric.millName} • {fabric.country}
                          </div>
                          <h4 className="font-serif font-bold text-slate-900 text-sm leading-tight">
                            {fabric.name}
                          </h4>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {fabric.description}
                      </p>

                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">
                          {fabric.weightGsm} g/m² • {fabric.pattern}
                        </span>
                        <span className="font-bold text-slate-900 font-serif">
                          {fabric.surchargeCOP === 0 ? 'Incluido' : `+ $${fabric.surchargeCOP.toLocaleString('es-CO')} COP`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* STEP 3: CONSTRUCCIÓN INTERIOR & ARQUITECTURA */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold font-serif">
                    3
                  </span>
                  <h2 className="text-lg font-serif font-bold text-slate-900">
                    Estructura Interna & Solapas
                  </h2>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  Corte Napolitano & Británico
                </span>
              </div>

              {/* Canvas Construction Options */}
              <div>
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                  Construcción del Torso (Canvas):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    onClick={() => setCanvasConstruction('full_canvas')}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                      canvasConstruction === 'full_canvas'
                        ? 'border-amber-600 bg-amber-50/40 text-slate-900 font-medium'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div className="font-bold font-serif text-slate-900 mb-1 flex items-center justify-between">
                      <span>Full Canvas Flotante</span>
                      <span className="text-[10px] text-amber-800 font-normal">+$450.000 COP</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Tapeta completa de pelo de caballo cosida a mano. Se adapta al cuerpo con el uso y drapeado impecable.
                    </p>
                  </div>

                  <div
                    onClick={() => setCanvasConstruction('half_canvas')}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                      canvasConstruction === 'half_canvas'
                        ? 'border-amber-600 bg-amber-50/40 text-slate-900 font-medium'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div className="font-bold font-serif text-slate-900 mb-1 flex items-center justify-between">
                      <span>Half-Canvas Estructurado</span>
                      <span className="text-[10px] text-emerald-700 font-normal">Incluido</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Lienzo artesanal en pecho y solapa con fusión térmica ligera en faldón para excelente relación peso/estructura.
                    </p>
                  </div>

                  <div
                    onClick={() => setCanvasConstruction('unstructured_napolitano')}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                      canvasConstruction === 'unstructured_napolitano'
                        ? 'border-amber-600 bg-amber-50/40 text-slate-900 font-medium'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div className="font-bold font-serif text-slate-900 mb-1 flex items-center justify-between">
                      <span>Desestructurado Spalla Camicia</span>
                      <span className="text-[10px] text-amber-800 font-normal">+$200.000 COP</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Sin hombrera rígida, manga encajada con fruncido napolitano suave. Sensación de segunda piel.
                    </p>
                  </div>
                </div>
              </div>

              {/* Lapels & Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3 border-t border-slate-100">
                {/* Lapel Style */}
                <div>
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                    Estilo de Solapa:
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setLapelStyle('notch')}
                      className={`py-2 px-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                        lapelStyle === 'notch'
                          ? 'border-amber-600 bg-slate-900 text-white font-semibold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      Muesca (Notch 8.5cm)
                    </button>
                    <button
                      type="button"
                      onClick={() => setLapelStyle('peak')}
                      className={`py-2 px-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                        lapelStyle === 'peak'
                          ? 'border-amber-600 bg-slate-900 text-white font-semibold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      Punta (Peak 9.5cm)
                    </button>
                    <button
                      type="button"
                      onClick={() => setLapelStyle('shawl')}
                      className={`py-2 px-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                        lapelStyle === 'shawl'
                          ? 'border-amber-600 bg-slate-900 text-white font-semibold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      Chal Redonda (Smoking)
                    </button>
                  </div>
                </div>

                {/* Button Config */}
                <div>
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                    Botonadura Frontal:
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setButtonCount('2_botones')}
                      className={`py-2 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                        buttonCount === '2_botones'
                          ? 'border-amber-600 bg-slate-900 text-white font-semibold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      2 Botones (Clásico)
                    </button>
                    <button
                      type="button"
                      onClick={() => setButtonCount('1_boton')}
                      className={`py-2 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                        buttonCount === '1_boton'
                          ? 'border-amber-600 bg-slate-900 text-white font-semibold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      1 Botón (Etiqueta)
                    </button>
                    <button
                      type="button"
                      onClick={() => setButtonCount('cruzado_double_breasted')}
                      className={`py-2 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                        buttonCount === 'cruzado_double_breasted'
                          ? 'border-amber-600 bg-slate-900 text-white font-semibold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      Cruzado 6x2 (Regio)
                    </button>
                  </div>
                </div>
              </div>

              {/* Linings and Buttons Selection */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                    Forro Interior de Seda:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {LINING_OPTIONS.map((lining) => (
                      <div
                        key={lining.id}
                        onClick={() => setSelectedLiningId(lining.id)}
                        className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                          selectedLiningId === lining.id
                            ? 'border-amber-600 bg-amber-50/30'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span 
                            className="w-4 h-4 rounded-full border border-slate-300 shrink-0" 
                            style={{ backgroundColor: lining.swatchColor }}
                          />
                          <div>
                            <span className="font-semibold text-slate-900 block">{lining.name}</span>
                            <span className="text-[10px] text-slate-500">{lining.description}</span>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-slate-700 shrink-0 font-serif ml-2">
                          {lining.priceCOP === 0 ? 'Incluido' : `+$${lining.priceCOP.toLocaleString('es-CO')}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                    Botones Artesanales:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    {BUTTON_OPTIONS.map((btn) => (
                      <div
                        key={btn.id}
                        onClick={() => setSelectedButtonId(btn.id)}
                        className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                          selectedButtonId === btn.id
                            ? 'border-amber-600 bg-amber-50/30 font-medium'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-semibold text-slate-900 block">{btn.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 block mt-1">{btn.description}</span>
                        <span className="text-[11px] font-bold text-amber-800 font-serif block mt-2">
                          +${btn.priceCOP.toLocaleString('es-CO')} COP
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* STEP 4: MONOGRAMA ARTESANAL */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold font-serif">
                    4
                  </span>
                  <h2 className="text-lg font-serif font-bold text-slate-900">
                    Monograma & Sello Personal
                  </h2>
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={monogramEnabled}
                    onChange={(e) => setMonogramEnabled(e.target.checked)}
                    className="rounded text-amber-700 focus:ring-amber-600 h-4 w-4"
                  />
                  <span>Habilitar Bordado Personal (+ $75.000 COP)</span>
                </label>
              </div>

              {monogramEnabled && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <label className="text-slate-600 font-medium block mb-1">
                      Iniciales o Nombre (Máx 6 letras):
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={monogramText}
                      onChange={(e) => setMonogramText(e.target.value.toUpperCase())}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-serif font-bold tracking-widest text-slate-900 uppercase"
                      placeholder="A.S.P."
                    />
                  </div>

                  <div>
                    <label className="text-slate-600 font-medium block mb-1">
                      Tonalidad del Hilo:
                    </label>
                    <select
                      value={monogramColor}
                      onChange={(e) => setMonogramColor(e.target.value as any)}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-800"
                    >
                      <option value="Oro Clásico">Oro Clásico Sartorial</option>
                      <option value="Plata Inglesa">Plata Inglesa</option>
                      <option value="Tono sobre Tono Champagne">Tono sobre Tono Champagne</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-600 font-medium block mb-1">
                      Ubicación del Bordado:
                    </label>
                    <select
                      value={monogramPlacement}
                      onChange={(e) => setMonogramPlacement(e.target.value as any)}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-800"
                    >
                      <option value="Interior del saco">Bolsillo Interior del Saco</option>
                      <option value="Bajo el cuello">Bajo el Cuello (Secreto)</option>
                      <option value="Puño de camisa">Puño Izquierdo</option>
                    </select>
                  </div>
                </div>
              )}
            </section>

            {/* PROTOCOLO DE LAS 3 PRUEBAS (Pedagogía de Alta Sastrería) */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-700" />
                  <h3 className="text-lg font-serif font-bold text-slate-900">
                    El Protocolo de las Tres Pruebas Sartoriales
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  Servicio 100% a Domicilio en Bogotá
                </span>
              </div>

              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                Un verdadero traje bespoke jamás se entrega en una sola visita. Cada cita afina la arquitectura de la prenda sobre tu cuerpo en reposo y en movimiento:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {BESPOKE_FITTING_STAGES.map((stage) => (
                  <div key={stage.number} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 relative">
                    <span className="text-2xl font-serif font-bold text-amber-700/40 block mb-1">
                      {stage.number}
                    </span>
                    <h4 className="font-serif font-bold text-slate-900 text-sm leading-snug">
                      {stage.title}
                    </h4>
                    <p className="text-[11px] text-amber-900 font-medium mt-1">
                      {stage.subtitle}
                    </p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {stage.details}
                    </p>
                    <div className="mt-4 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
                      <span>{stage.duration}</span>
                      <span className="font-semibold text-slate-700">{stage.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Configuration Summary & Booking Sticky Column (4 Columns) */}
          <div className="lg:col-span-4 sticky top-20">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="border-b border-slate-200 pb-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Resumen de Configuración
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold">
                    Bespoke Privé
                  </span>
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900 mt-1">
                  {activeSuit.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {activeFabric.millName} • {activeFabric.name}
                </p>
              </div>

              {/* Specs Itemized */}
              <div className="space-y-2.5 text-xs border-b border-slate-200 pb-4 mb-4 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Silueta Base:</span>
                  <span className="font-semibold text-slate-900">${activeSuit.basePrice.toLocaleString('es-CO')}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Paño {activeFabric.millName}:</span>
                  <span className="font-semibold text-slate-900">
                    {activeFabric.surchargeCOP === 0 ? 'Incluido' : `+$${activeFabric.surchargeCOP.toLocaleString('es-CO')}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Construcción Canvas:</span>
                  <span className="font-semibold text-slate-900">
                    {canvasConstruction === 'full_canvas' ? '+$450.000 (Full Floating)' : (canvasConstruction === 'half_canvas' ? 'Half Canvas (Base)' : '+$200.000 (Spalla)')}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Solapa & Botonadura:</span>
                  <span className="font-semibold text-slate-900">
                    {lapelStyle === 'peak' ? 'Peak 9.5cm' : (lapelStyle === 'notch' ? 'Notch 8.5cm' : 'Shawl')} • {buttonCount}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Forro Interior:</span>
                  <span className="font-semibold text-slate-900">
                    {activeLining.priceCOP === 0 ? 'Cupro Bemberg (Base)' : `+$${activeLining.priceCOP.toLocaleString('es-CO')}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Botones Artesanales:</span>
                  <span className="font-semibold text-slate-900">+${activeButton.priceCOP.toLocaleString('es-CO')}</span>
                </div>

                {monogramEnabled && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Monograma ("{monogramText}"):</span>
                    <span className="font-semibold text-slate-900">+$75.000</span>
                  </div>
                )}

                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>3 Pruebas a Domicilio:</span>
                  <span>Cortesía Atelier</span>
                </div>
              </div>

              {/* Master Tailor Assigned */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 mb-4 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-500 uppercase font-medium text-[10px]">Maestro Sastre Asignado:</span>
                  <span className="text-[11px] font-bold text-amber-800">★ {activeTailor.rating}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center font-serif">
                    {activeTailor.avatar}
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-slate-900">{activeTailor.name}</h5>
                    <p className="text-[10px] text-slate-500">{activeTailor.experienceYears} años de oficio • Vehículo {activeTailor.vehicle.model}</p>
                  </div>
                </div>
              </div>

              {/* Total COP Price */}
              <div className="pt-2 pb-4">
                <span className="text-[11px] text-slate-500 uppercase block font-medium">
                  Inversión Total Prenda Bespoke
                </span>
                <span className="text-2xl font-serif font-bold text-slate-900 block">
                  ${totalPriceCOP.toLocaleString('es-CO')} <span className="text-xs font-sans font-normal text-slate-500">COP</span>
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Anticipo 50% al corte ($ {(totalPriceCOP / 2).toLocaleString('es-CO')} COP) / Saldo en entrega final.
                </span>
              </div>

              {/* Primary Call to Action */}
              <div className="space-y-2">
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <Calendar className="w-4 h-4 text-amber-400" />
                  Agendar Primera Toma de Medidas
                </button>

                <p className="text-[11px] text-slate-500 text-center">
                  El sastre acude con el muestrario físico de paños a tu dirección.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Booking Appointment Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8">
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-200 pb-4 mb-5">
              <span className="text-xs font-serif font-bold tracking-widest text-slate-900 uppercase">
                PROTOCOLO DE ALTA SASTRERÍA
              </span>
              <h3 className="text-xl font-serif font-bold text-slate-900 mt-1">
                Agendar Cita 01: Toma de Medidas & Valija de Paños
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                El Maestro {activeTailor.name} asistirá a tu residencia en Bogotá con la valija de tejidos reales y tu ficha antropométrica digital.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-900 block mb-1">
                  Dirección de Residencia u Oficina en Bogotá:
                </label>
                <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-3 py-2 bg-slate-50">
                  <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                  <input
                    type="text"
                    value={fittingAddress}
                    onChange={(e) => setFittingAddress(e.target.value)}
                    className="w-full bg-transparent text-slate-900 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-900 block mb-1">
                    Fecha y Hora Preferida:
                  </label>
                  <input
                    type="datetime-local"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-800 text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-900 block mb-1">
                    Maestro Sastre Asignado:
                  </label>
                  <select
                    value={selectedTailorId}
                    onChange={(e) => setSelectedTailorId(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-800 text-xs"
                  >
                    {availableTailors.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.name} (★ {t.rating}) - {t.experienceYears} años exp.
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-900 block mb-1">
                  Notas Especiales de Silueta o Postura:
                </label>
                <textarea
                  rows={2}
                  value={specialTailorNotes}
                  onChange={(e) => setSpecialTailorNotes(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-slate-800 text-xs focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Order Summary Box */}
              <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3.5 space-y-1">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{activeSuit.name} ({activeFabric.millName})</span>
                  <span>${totalPriceCOP.toLocaleString('es-CO')} COP</span>
                </div>
                <div className="text-[11px] text-slate-600">
                  Incluye: Full Canvas, Solapa {lapelStyle}, Forro {activeLining.name}, Botones {activeButton.name} {monogramEnabled ? `y monograma "${monogramText}"` : ''}.
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowBookingModal(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Modificar Prenda
              </button>
              <button
                onClick={handleConfirmBooking}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Confirmar Cita con Maestro Sastre
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Success Toast */}
      {bookingSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-emerald-300 rounded-xl p-4 shadow-xl max-w-md animate-fade-in">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <h4 className="font-bold text-slate-900">
                ¡Cita de Medidas Bespoke Confirmada!
              </h4>
              <p className="text-slate-600 mt-1">
                El Maestro <strong>{activeTailor.name}</strong> ha recibido tu solicitud para acudir a <strong>{fittingAddress}</strong> con la valija de paños {activeFabric.millName}.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => setBookingSuccess(false)}
                  className="px-3 py-1 bg-slate-900 text-white text-xs font-semibold rounded-md hover:bg-slate-800"
                >
                  Entendido
                </button>
                {onNavigateToClient && (
                  <button
                    onClick={() => {
                      setBookingSuccess(false);
                      onNavigateToClient();
                    }}
                    className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-semibold rounded-md hover:bg-slate-200"
                  >
                    Ver en App Cliente VIP
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
