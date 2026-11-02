import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Calendar, 
  Clock, 
  Scissors, 
  CreditCard, 
  ShieldCheck, 
  Phone, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  Ruler, 
  Layers, 
  AlertCircle,
  Car,
  FileCheck,
  Plus,
  ScanFace,
  Fingerprint,
  QrCode,
  Shield,
  Check,
  ExternalLink,
  Award,
  X
} from 'lucide-react';
import { MeasurementProfile, Appointment, AlterationService, TailorPartner } from '../types';
import { BogotaMap } from './BogotaMap';
import { ALTERATION_SERVICES } from '../data/mockData';

interface ClientVIPAppProps {
  measurements: MeasurementProfile;
  onUpdateMeasurements: (m: MeasurementProfile) => void;
  activeAppointment: Appointment;
  onUpdateAppointment: (appt: Appointment) => void;
  activeTailor: TailorPartner;
  onNavigateToBespoke?: () => void;
  onNavigateToUniforms?: () => void;
}

export const ClientVIPApp: React.FC<ClientVIPAppProps> = ({
  measurements,
  onUpdateMeasurements,
  activeAppointment,
  onUpdateAppointment,
  activeTailor,
  onNavigateToBespoke,
  onNavigateToUniforms,
}) => {
  const [activeTab, setActiveTab] = useState<'tracker' | 'custodia' | 'agendamiento' | 'ficha_medidas' | 'servicios'>(
    activeAppointment.status === 'prendas_en_taller' ? 'custodia' : 'tracker'
  );
  const [editingMeasurements, setEditingMeasurements] = useState<MeasurementProfile>(measurements);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Biometric authorization state (FaceID / Fingerprint)
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const [biometricScanning, setBiometricScanning] = useState(false);
  const [biometricSuccess, setBiometricSuccess] = useState(false);

  // Client QR Pass Modal State
  const [showQRPassModal, setShowQRPassModal] = useState(false);

  // Booking form states
  const [bookingType, setBookingType] = useState<'on_demand' | 'programado'>('on_demand');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<'Rosales' | 'El Chicó' | 'Santa Ana' | 'La Cabrera' | 'Santa Bárbara' | 'El Virrey' | 'Nogal'>('Rosales');
  const [addressDetail, setAddressDetail] = useState('Cra. 1 # 74-32, Penthouse 1102');
  const [selectedServices, setSelectedServices] = useState<AlterationService[]>([ALTERATION_SERVICES[0], ALTERATION_SERVICES[2]]);
  const [selectedGateway, setSelectedGateway] = useState<'Bold Tarjeta Black' | 'ePayco' | 'PayU' | 'Apple Pay'>('Bold Tarjeta Black');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleSaveMeasurements = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateMeasurements(editingMeasurements);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const calculateTotal = () => {
    return selectedServices.reduce((sum, s) => sum + s.basePrice, 0);
  };

  const handleConfirmNewAppointment = () => {
    const total = calculateTotal();
    const newAppt: Appointment = {
      id: `CITA-BOG-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: measurements.clientName,
      clientPhone: measurements.phone,
      clientAddress: `${addressDetail}, ${selectedNeighborhood}`,
      neighborhood: selectedNeighborhood,
      coordinates: { x: 74, y: 55 },
      dateTime: bookingType === 'on_demand' ? 'En camino · ETA 15 mins' : 'Mañana · 10:00 AM',
      status: 'en_camino',
      tailorId: activeTailor.id,
      items: selectedServices.map(s => ({
        serviceName: s.name,
        garmentType: s.category,
        price: s.basePrice,
        fabricNote: 'Revisión en cita física'
      })),
      totalEstimate: total,
      platformFee: Math.round(total * 0.20),
      tailorNet: Math.round(total * 0.80),
      paymentMethod: selectedGateway,
      paymentStatus: 'autorizado',
      etaMinutes: 14,
      notes: 'Portería avisada. Sastre con kit de medición de precisión.'
    };

    onUpdateAppointment(newAppt);
    setBookingConfirmed(true);
    setActiveTab('tracker');
    setTimeout(() => setBookingConfirmed(false), 4000);
  };

  const handleTriggerBiometric = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([50, 100, 50]);
      } catch (e) {}
    }
    setShowBiometricModal(true);
    setBiometricScanning(false);
    setBiometricSuccess(false);
  };

  const handleExecuteBiometricScan = () => {
    setBiometricScanning(true);
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([40, 80, 40]);
      } catch (e) {}
    }

    setTimeout(() => {
      setBiometricScanning(false);
      setBiometricSuccess(true);
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate([80, 150]);
        } catch (e) {}
      }

      onUpdateAppointment({
        ...activeAppointment,
        paymentStatus: 'liquidado',
        clientSignature: true
      });

      setTimeout(() => {
        setShowBiometricModal(false);
        setActiveTab('custodia');
      }, 1600);
    }, 1400);
  };

  const steps = [
    { title: 'Cita a Domicilio', desc: 'Toma de medidas y prueba física en su residencia', status: 'completado' },
    { title: 'Corte e Hilván Central', desc: 'Desarme y trazo milimétrico por sastres certificados', status: 'actual' },
    { title: 'Prueba de Aplomo', desc: 'Revisión de caídas, hombros y contornos', status: 'pendiente' },
    { title: 'Acabados & Ojales a Mano', desc: 'Puntadas invisibles y planchado al vapor artesanal', status: 'pendiente' },
    { title: 'Entrega en Portatraje de Lujo', desc: 'Despacho privado en vehículo asignado', status: 'pendiente' }
  ];

  return (
    <div className="space-y-6 text-slate-900">
      {/* Biometric Payment Pending Notification Banner */}
      <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-300 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-300">
            <ScanFace className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-xs sm:text-sm">
                Autorización Biométrica Requerida · Total: ${activeAppointment.totalEstimate.toLocaleString('es-CO')} COP
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                Face ID / Huella
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              El maestro evaluó las prendas en su domicilio. Toque para autorizar la retención y custodia.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowQRPassModal(true)}
            className="px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-amber-400" />
            <span>Pase QR Cita</span>
          </button>

          <button
            type="button"
            onClick={handleTriggerBiometric}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Fingerprint className="w-4 h-4" />
            <span>Autorizar con Face ID</span>
          </button>
        </div>
      </div>

      {/* VIP User Status Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 p-0.5 flex items-center justify-center shadow-xs">
            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
              <span className="font-serif text-lg font-bold text-amber-300">AS</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-wide">{measurements.clientName}</h2>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                Miembro VIP Black
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Bogotá Norte · Residencia {measurements.postura} · {measurements.estiloPreferido}
            </p>
          </div>
        </div>

        {/* Tab Controls with Pantalla 4: Rastreo Premium (Custodia) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('custodia')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'custodia'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-amber-500" />
            <span>Pantalla 4: Rastreo Premium (Custodia)</span>
          </button>
          <button
            onClick={() => setActiveTab('tracker')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'tracker'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            Radar GPS
          </button>
          <button
            onClick={() => setActiveTab('agendamiento')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'agendamiento'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            Agendar Sastre
          </button>
          <button
            onClick={() => setActiveTab('ficha_medidas')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'ficha_medidas'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            Ficha Medidas
          </button>
          <button
            onClick={() => setActiveTab('servicios')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'servicios'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            Catálogo
          </button>

          {onNavigateToBespoke && (
            <button
              onClick={onNavigateToBespoke}
              className="px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300 flex items-center gap-1.5"
            >
              <Scissors className="w-3.5 h-3.5 text-amber-700" />
              <span>Trajes sobre Medidas</span>
            </button>
          )}

          {onNavigateToUniforms && (
            <button
              onClick={onNavigateToUniforms}
              className="px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-300 flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5 text-slate-600" />
              <span>Dotaciones VIP</span>
            </button>
          )}
        </div>
      </div>

      {bookingConfirmed && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-sm font-semibold">
              ¡Cita solicitada con éxito! El sastre se encuentra en camino en su vehículo a su residencia.
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">ETA: 14 mins</span>
        </div>
      )}

      {/* PANTALLA 4: EL RASTREO PREMIUM (FLUJO DE CONFIANZA / TIMELINE DE CUSTODIA) */}
      {activeTab === 'custodia' && (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-900 font-bold bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300">
                    Pantalla 4 · Exclusivo VIP
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-500 font-semibold">Cadena de Custodia Inviolable</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight">
                  El Rastreo Premium · Flujo de Confianza
                </h3>
                <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                  Una vez el sastre se lleva la prenda en su vehículo, usted puede consultar en cualquier momento el estado milimétrico de la confección, el precinto de seguridad del portatrajes y el ingreso seguro al taller.
                </p>
              </div>

              {/* Security Seal Tag */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-right space-y-1 shadow-xs">
                <span className="text-[10px] font-mono text-slate-500 uppercase block font-semibold">Precinto de Custodia:</span>
                <span className="font-mono text-sm font-bold text-slate-900 flex items-center justify-end gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  {activeAppointment.custodySealNumber || 'BOG-SEC-9402'}
                </span>
                <span className="text-[10px] text-emerald-700 block font-mono font-semibold">Póliza Todo Riesgo Activa</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Vertical Custody Timeline (7 cols) */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 tracking-wide uppercase flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  Timeline de Custodia & Manipulación
                </h4>
                <span className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded">
                  En Taller Central (Norte)
                </span>
              </div>

              {/* Vertical Luxury Timeline */}
              <div className="space-y-6 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                {/* 1. Medidas Tomadas */}
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
                    🟢
                  </div>
                  <div className="flex-1 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        14:30 - Medidas tomadas por Maestro Sastre Carlos Mendoza
                      </span>
                      <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                        Firma & Face ID
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Toma milimétrica de aplomo realizada en su residencia en Rosales. Alfileres franceses e hilván de prueba colocados.
                    </p>
                    {/* Measurements badge summary */}
                    <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-slate-800">
                      <span className="bg-white px-2 py-0.5 rounded border border-slate-300 shadow-2xs font-semibold">
                        Cuello: {activeAppointment.inFittingMeasurements?.cuello || 40.5} cm
                      </span>
                      <span className="bg-white px-2 py-0.5 rounded border border-slate-300 shadow-2xs font-semibold">
                        Hombros: {activeAppointment.inFittingMeasurements?.hombros || 46.5} cm
                      </span>
                      <span className="bg-white px-2 py-0.5 rounded border border-slate-300 shadow-2xs font-semibold">
                        Cintura: {activeAppointment.inFittingMeasurements?.cintura || 88.0} cm
                      </span>
                      <span className="bg-white px-2 py-0.5 rounded border border-slate-300 shadow-2xs font-semibold">
                        Largo bota: {activeAppointment.inFittingMeasurements?.largoBota || 102.5} cm
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Prenda Ingresada al Taller */}
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
                    🟢
                  </div>
                  <div className="flex-1 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        15:15 - Prenda ingresada de forma segura al Taller Asociado (Norte de Bogotá)
                      </span>
                      <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                        Verificado
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Custodia recibida en sede central Calle 85 # 11-53 (La Cabrera). Portatrajes impermeable desinfectado y precintado con código #{activeAppointment.custodySealNumber || 'BOG-SEC-9402'}.
                    </p>
                  </div>
                </div>

                {/* 3. En Proceso de Modificación */}
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-blue-500 text-blue-700 flex items-center justify-center shrink-0 font-bold text-xs ring-4 ring-blue-100 animate-pulse">
                    🔵
                  </div>
                  <div className="flex-1 p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-bold text-blue-950">
                        En Proceso - Modificación y costura fina en ejecución
                      </span>
                      <span className="text-[10px] font-mono font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded border border-blue-300">
                        Mesa No. 3
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Desmonte de mangas, entalle milimétrico en cintura y basta invisible con cinta protectora de valona en paño Loro Piana.
                    </p>
                    {/* Itemized active modifications */}
                    <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1.5 text-xs shadow-2xs">
                      <span className="text-[10px] uppercase font-mono text-slate-500 block font-semibold">Modificaciones autorizadas:</span>
                      <div className="flex flex-wrap justify-between text-slate-700 text-[11px] font-medium">
                        <span>• Entallar costados (+ $35.000)</span>
                        <span>• Subir mangas (+ $25.000)</span>
                        <span>• Ajustar bota (+ $20.000)</span>
                      </div>
                      <div className="pt-2 border-t border-slate-200 flex justify-between text-amber-800 font-mono font-bold text-xs">
                        <span>Valor total del servicio:</span>
                        <span>${activeAppointment.totalEstimate.toLocaleString('es-CO')} COP</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Control de Calidad y Planchado */}
                <div className="flex items-start gap-4 relative z-10 opacity-75">
                  <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-slate-300 text-slate-500 flex items-center justify-center shrink-0 font-bold text-xs">
                    ⚪
                  </div>
                  <div className="flex-1 p-4 rounded-xl bg-slate-50/70 border border-slate-200 space-y-1">
                    <span className="text-xs font-bold text-slate-700 block">
                      Pendiente - Control de calidad y planchado premium
                    </span>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Inspección de simetría con maniquí termofijado y vaporizado manual con caldera de baja presión para preservar la suavidad de la fibra de lana.
                    </p>
                  </div>
                </div>

                {/* 5. Ruta de Devolución */}
                <div className="flex items-start gap-4 relative z-10 opacity-75">
                  <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-slate-300 text-slate-500 flex items-center justify-center shrink-0 font-bold text-xs">
                    ⚪
                  </div>
                  <div className="flex-1 p-4 rounded-xl bg-slate-50/70 border border-slate-200 space-y-1">
                    <span className="text-xs font-bold text-slate-700 block">
                      Pendiente - Ruta de devolución a domicilio
                    </span>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Despacho en vehículo particular asignado en portatrajes de lujo transpirable directo a su penthouse en {activeAppointment.neighborhood}.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Custody Certificate & Master Tailor Dossier (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Certificate Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-600" />
                    <h4 className="text-sm font-bold text-slate-900 tracking-wide">
                      Certificado Digital de Custodia VIP
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">#CERT-9402</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Sastre Responsable:</span>
                    <strong className="text-slate-900 font-semibold">Carlos Mendoza / {activeTailor.name}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Vehículo Registrado:</span>
                    <strong className="text-slate-800 font-semibold">{activeTailor.vehicle.model} ({activeTailor.vehicle.plate})</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Póliza Seguro Prenda:</span>
                    <strong className="text-emerald-700 font-mono font-bold">Hasta $25.000.000 COP</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Precinto Físico:</span>
                    <strong className="text-amber-800 font-mono font-bold">{activeAppointment.custodySealNumber || 'BOG-SEC-9402'}</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-8 h-8 text-slate-700" />
                    <span className="text-[10px] text-slate-500 leading-tight">
                      Escanee para verificar trazabilidad en Blockchain privado
                    </span>
                  </div>
                  <a
                    href={`tel:${activeTailor.bankAccount.number}`}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-200"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Llamar al Sastre</span>
                  </a>
                </div>
              </div>

              {/* In-Home Fitted Measurements Dossier */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Mediciones Tomadas en Esta Cita
                </span>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block text-[10px] font-semibold">Contorno Cuello:</span>
                    <span className="font-mono text-slate-900 font-bold">{activeAppointment.inFittingMeasurements?.cuello || 40.5} cm</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block text-[10px] font-semibold">Ancho Hombros:</span>
                    <span className="font-mono text-slate-900 font-bold">{activeAppointment.inFittingMeasurements?.hombros || 46.5} cm</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block text-[10px] font-semibold">Contorno Cintura:</span>
                    <span className="font-mono text-slate-900 font-bold">{activeAppointment.inFittingMeasurements?.cintura || 88.0} cm</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block text-[10px] font-semibold">Largo de Bota:</span>
                    <span className="font-mono text-slate-900 font-bold">{activeAppointment.inFittingMeasurements?.largoBota || 102.5} cm</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-xs text-slate-600">
                  <span>Modificaciones evaluadas:</span>
                  <span className="font-mono text-amber-800 font-bold">$80.000 COP</span>
                </div>
              </div>

              {/* Direct Re-auth button if needed */}
              <button
                type="button"
                onClick={handleTriggerBiometric}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs"
              >
                <ScanFace className="w-4 h-4 text-amber-400" />
                <span>Verificar Firma Biométrica Face ID</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BIOMETRIC AUTHORIZATION MODAL (FACE ID / TOUCH ID) */}
      {showBiometricModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-sm w-full bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-2xl text-center relative overflow-hidden">
            {/* Top iOS-style notch pill */}
            <div className="w-16 h-1.5 bg-slate-200 rounded-full mx-auto" />

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-800 block font-bold">
                Seguridad Biométrica Atelier Bogotá
              </span>
              <h4 className="text-lg font-serif font-bold text-slate-900">
                Autorizar Retención & Custodia
              </h4>
              <p className="text-xs text-slate-600">
                Confirmación de arreglos en domicilio · <strong className="text-slate-900">${activeAppointment.totalEstimate.toLocaleString('es-CO')} COP</strong>
              </p>
            </div>

            {/* Face ID Viewfinder Animation */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center bg-slate-50 rounded-2xl border border-slate-200">
              {/* Corner brackets simulating FaceID */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-600 rounded-tl-md" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-600 rounded-tr-md" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-600 rounded-bl-md" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-600 rounded-br-md" />

              {/* Scanning icon / laser */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                {biometricSuccess ? (
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl font-bold">
                    ✓
                  </div>
                ) : biometricScanning ? (
                  <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center animate-pulse">
                    <ScanFace className="w-10 h-10" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
                    <ScanFace className="w-10 h-10" />
                  </div>
                )}
              </div>

              {/* Scanning laser line */}
              {biometricScanning && (
                <div className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent animate-pulse top-1/2" />
              )}
            </div>

            {/* Status text */}
            <div className="text-xs font-mono font-medium">
              {biometricSuccess ? (
                <span className="text-emerald-700 font-bold block">
                  ✓ Face ID Reconocido · Pago Pre-Autorizado
                </span>
              ) : biometricScanning ? (
                <span className="text-amber-800 block animate-pulse">
                  Escaneando rostro y validando token biométrico...
                </span>
              ) : (
                <span className="text-slate-600 block">
                  Acerque su rostro o coloque su huella en el lector
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-2">
              {!biometricSuccess && (
                <button
                  type="button"
                  onClick={handleExecuteBiometricScan}
                  disabled={biometricScanning}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 transition-all"
                >
                  <ScanFace className="w-4 h-4 text-amber-400" />
                  <span>Escanear con Face ID</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setShowBiometricModal(false)}
                className="w-full py-2 rounded-xl text-slate-500 hover:text-slate-900 text-xs font-medium cursor-pointer"
              >
                {biometricSuccess ? 'Cerrar' : 'Cancelar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CLIENT OFFICIAL BOOKING QR PASS MODAL */}
      {showQRPassModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-sm w-full bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-2xl text-center relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-left">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Pase Digital de Cita VIP</h4>
                  <p className="text-[10px] text-slate-500 font-mono">Atelier Bogotá · Validación en Puerta</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowQRPassModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 shadow-inner">
              {/* Scalable Vector QR Code Graphic */}
              <div className="w-44 h-44 mx-auto bg-white p-3 rounded-xl border border-slate-300 shadow-sm flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900" fill="currentColor">
                  {/* Pattern representation for QR code matrix */}
                  <path d="M0 0h30v30H0zm4 4h22v22H4zm4 4h14v14H8zm62-8h30v30H70zm4 4h22v22H74zm4 4h14v14H78zM0 70h30v30H0zm4 4h22v22H4zm4 4h14v14H8zm38-70h6v6h-6zm10 0h6v6h-6zm-10 10h6v6h-6zm10 0h6v6h-6zm-10 10h6v6h-6zm10 0h6v6h-6zm-48 10h6v6h-6zm10 0h6v6h-6zm10 0h6v6h-6zm10 0h6v6h-6zm10 0h6v6h-6zm10 0h6v6h-6zm10 0h6v6h-6zm10 0h6v6h-6zm-70 10h6v6h-6zm20 0h6v6h-6zm20 0h6v6h-6zm20 0h6v6h-6zm-70 10h6v6h-6zm10 0h6v6h-6zm20 0h6v6h-6zm20 0h6v6h-6zm-60 10h6v6h-6zm20 0h6v6h-6zm10 0h6v6h-6zm20 0h6v6h-6zm10 0h6v6h-6zm-50 10h6v6h-6zm10 0h6v6h-6zm20 0h6v6h-6zm20 0h6v6h-6zm-70 10h6v6h-6zm10 0h6v6h-6zm20 0h6v6h-6zm20 0h6v6h-6zm-50 10h6v6h-6zm20 0h6v6h-6zm20 0h6v6h-6z" />
                </svg>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-slate-900 block tracking-wider">
                  #{activeAppointment.id}
                </span>
                <span className="text-[11px] text-slate-600 block font-medium">
                  {measurements.clientName} · {activeAppointment.neighborhood}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border inline-block font-semibold ${
                  activeAppointment.qrVerified 
                    ? 'text-emerald-800 bg-emerald-100 border-emerald-300' 
                    : 'text-amber-800 bg-amber-100 border-amber-300'
                }`}>
                  {activeAppointment.qrVerified 
                    ? `✓ Verificado en Puerta (${activeAppointment.qrVerifiedAt || '14:28'})` 
                    : '● Listo para Escaneo del Sastre'}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
              Presente este código QR al Maestro Sastre a su llegada en portería o residencia para autorizar el ingreso y la toma de medidas.
            </p>

            <button
              type="button"
              onClick={() => setShowQRPassModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs transition-colors"
            >
              Cerrar Pase
            </button>
          </div>
        </div>
      )}

      {/* TAB 1: RADAR & TRACKING */}
      {activeTab === 'tracker' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Interactive Radar of Bogota */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-slate-900 tracking-wide">
                  Rastreo en Ruta · Maestro Asignado
                </h3>
                <p className="text-xs text-slate-500">
                  Desplazamiento privado en vehículo propio con kit de sastrería de alta precisión
                </p>
              </div>
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                Cita #{activeAppointment.id}
              </span>
            </div>

            {/* Interactive Vector Map of Bogota */}
            <BogotaMap
              activeTailor={activeTailor}
              clientZone={activeAppointment.neighborhood}
              showTailorTransit={true}
            />

            {/* Tailor Card on Route */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 font-serif font-bold text-lg shadow-2xs">
                  {activeTailor.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{activeTailor.name}</span>
                    <span className="text-xs text-amber-700 font-mono font-bold">★ {activeTailor.rating}</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {activeTailor.experienceYears} años de oficio · {activeTailor.vehicle.model} ({activeTailor.vehicle.plate})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`tel:${measurements.phone}`}
                  className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-200"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  Llamada Segura
                </a>
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 block font-medium">Llegada estimada</span>
                  <span className="text-sm font-mono font-bold text-amber-800">
                    ~{activeAppointment.etaMinutes || 12} minutos
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Garment Status & Active Order Summary */}
          <div className="lg:col-span-5 space-y-4">
            {/* Garment Status Timeline */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 tracking-wide flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-amber-600" />
                  Estado de sus Prendas
                </h4>
                <span className="text-[11px] font-mono font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded">
                  En Proceso Artesanal
                </span>
              </div>

              <div className="space-y-3 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {steps.map((st, i) => (
                  <div key={i} className="flex items-start gap-3 relative z-10">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border text-xs font-mono font-bold ${
                        st.status === 'completado'
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-800'
                          : st.status === 'actual'
                          ? 'bg-amber-100 border-amber-500 text-amber-900 ring-2 ring-amber-200'
                          : 'bg-slate-100 border-slate-300 text-slate-500'
                      }`}
                    >
                      {st.status === 'completado' ? '✓' : i + 1}
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs font-semibold ${st.status === 'actual' ? 'text-amber-900 font-bold' : 'text-slate-800'}`}>
                        {st.title}
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Itemized Order & Payment Receipt */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Detalle del Servicio en Curso
              </h4>

              <div className="space-y-2 text-xs divide-y divide-slate-100">
                {activeAppointment.items.map((it, idx) => (
                  <div key={idx} className="pt-2 first:pt-0 flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{it.garmentType}</p>
                      <p className="text-slate-500 text-[11px]">{it.serviceName}</p>
                      {it.fabricNote && <p className="text-amber-800 text-[10px] italic">Nota: {it.fabricNote}</p>}
                    </div>
                    <span className="font-mono text-slate-900 font-bold">
                      ${it.price.toLocaleString('es-CO')} COP
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal Arreglos</span>
                  <span className="font-mono text-slate-900 font-medium">${activeAppointment.totalEstimate.toLocaleString('es-CO')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Visita y Prueba a Domicilio VIP</span>
                  <span className="text-emerald-700 font-mono font-semibold">Cortesía Membresía</span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold text-sm pt-2 border-t border-slate-200">
                  <span>Total Autorizado</span>
                  <span className="font-mono text-amber-800">
                    ${activeAppointment.totalEstimate.toLocaleString('es-CO')} COP
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <div className="flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-amber-700" />
                  <span className="font-medium">Pasarela: {activeAppointment.paymentMethod}</span>
                </div>
                <span className="text-emerald-700 font-mono font-bold uppercase text-[10px] tracking-wider">
                  ● {activeAppointment.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AGENDAMIENTO ON-DEMAND / PROGRAMADO */}
      {activeTab === 'agendamiento' && (
        <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-serif font-bold text-slate-900 tracking-wide">
              Solicitar Sastre a Domicilio
            </h3>
            <p className="text-xs text-slate-500">
              Servicio exclusivo para zonas residenciales premium de Bogotá (Rosales, Chicó, Santa Ana, Cabrera, Santa Bárbara).
            </p>
          </div>

          {/* Modalidad: On-Demand vs Programado */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setBookingType('on_demand')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                bookingType === 'on_demand'
                  ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-300'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">⚡ Sastre On-Demand (Inmediato)</span>
                <span className="text-xs font-mono font-bold text-amber-800">15-25 min</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                El maestro más cercano acude de inmediato a su penthouse u oficina con kit completo.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setBookingType('programado')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                bookingType === 'programado'
                  ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-300'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">📅 Agendamiento Programado</span>
                <span className="text-xs font-mono text-slate-500 font-semibold">Fecha & Hora</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Elija el horario exacto para prueba de smoking, vestidos de fiesta o ajuar completo.
              </p>
            </button>
          </div>

          {/* Ubicación y Zona */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              1. Zona VIP & Dirección en Bogotá
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Rosales', 'El Chicó', 'Santa Ana', 'La Cabrera', 'Santa Bárbara', 'El Virrey', 'Nogal'] as const).map(zone => (
                <button
                  key={zone}
                  type="button"
                  onClick={() => setSelectedNeighborhood(zone)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border text-center transition-all cursor-pointer ${
                    selectedNeighborhood === zone
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {zone}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
              placeholder="Dirección exacta, torre, número de apto o casa..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-amber-600"
            />
          </div>

          {/* Selección de Servicios Iniciales */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                2. Seleccione las Prendas / Arreglos a Evaluar
              </label>
              <span className="text-xs text-slate-500 italic">
                *El sastre confirmará el valor final en persona
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
              {ALTERATION_SERVICES.map(srv => {
                const isChecked = selectedServices.some(s => s.id === srv.id);
                return (
                  <div
                    key={srv.id}
                    onClick={() => {
                      if (isChecked) {
                        setSelectedServices(selectedServices.filter(s => s.id !== srv.id));
                      } else {
                        setSelectedServices([...selectedServices, srv]);
                      }
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-amber-50 border-amber-400 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <span className="text-xs font-bold block text-slate-900">{srv.name}</span>
                        <span className="text-[11px] text-slate-600 line-clamp-1">{srv.description}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-800 shrink-0">
                        ${srv.basePrice.toLocaleString('es-CO')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pasarela Local de Pagos */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              3. Pasarela de Pago VIP (Pre-Autorización Segura)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {(['Bold Tarjeta Black', 'ePayco', 'PayU', 'Apple Pay'] as const).map(gw => (
                <button
                  key={gw}
                  type="button"
                  onClick={() => setSelectedGateway(gw)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedGateway === gw
                      ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1 text-slate-600" />
                  <span className="text-xs block">{gw}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Confirmation Action */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 block font-medium">Total Estimado Inicial:</span>
              <span className="text-xl font-serif font-bold text-slate-900 font-mono">
                ${calculateTotal().toLocaleString('es-CO')} COP
              </span>
            </div>

            <button
              type="button"
              onClick={handleConfirmNewAppointment}
              disabled={selectedServices.length === 0}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Car className="w-4 h-4 text-amber-400" />
              Confirmar Sastre en Camino a Mi Domicilio
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: FICHA DE MEDIDAS PERMANENTE */}
      {activeTab === 'ficha_medidas' && (
        <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-amber-600" />
                <h3 className="text-xl font-serif font-bold text-slate-900 tracking-wide">
                  Ficha de Medidas Digital Permanente
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Patronaje digital guardado en la nube para confección inmediata sin requerir volver a medirse.
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 font-mono uppercase block font-semibold">Última calibración:</span>
              <span className="text-xs font-mono font-bold text-amber-800">{measurements.updatedAt}</span>
            </div>
          </div>

          {saveSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Ficha de medidas actualizada y sincronizada en el cerebro de Atelier Bogotá.
            </div>
          )}

          <form onSubmit={handleSaveMeasurements} className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Pecho / Busto (cm)</label>
                <input
                  type="number"
                  step="0.5"
                  value={editingMeasurements.pechoBusto}
                  onChange={(e) => setEditingMeasurements({ ...editingMeasurements, pechoBusto: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-mono text-sm font-bold focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Cintura (cm)</label>
                <input
                  type="number"
                  step="0.5"
                  value={editingMeasurements.cintura}
                  onChange={(e) => setEditingMeasurements({ ...editingMeasurements, cintura: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-mono text-sm font-bold focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Cadera (cm)</label>
                <input
                  type="number"
                  step="0.5"
                  value={editingMeasurements.cadera}
                  onChange={(e) => setEditingMeasurements({ ...editingMeasurements, cadera: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-mono text-sm font-bold focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Ancho Hombros (cm)</label>
                <input
                  type="number"
                  step="0.5"
                  value={editingMeasurements.anchoHombros}
                  onChange={(e) => setEditingMeasurements({ ...editingMeasurements, anchoHombros: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-mono text-sm font-bold focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Largo de Brazo (cm)</label>
                <input
                  type="number"
                  step="0.5"
                  value={editingMeasurements.largoBrazo}
                  onChange={(e) => setEditingMeasurements({ ...editingMeasurements, largoBrazo: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-mono text-sm font-bold focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Largo Talle (cm)</label>
                <input
                  type="number"
                  step="0.5"
                  value={editingMeasurements.largoTalle}
                  onChange={(e) => setEditingMeasurements({ ...editingMeasurements, largoTalle: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-mono text-sm font-bold focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Entrepierna / Tiro (cm)</label>
                <input
                  type="number"
                  step="0.5"
                  value={editingMeasurements.entrepierna}
                  onChange={(e) => setEditingMeasurements({ ...editingMeasurements, entrepierna: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-mono text-sm font-bold focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Cuello (cm)</label>
                <input
                  type="number"
                  step="0.5"
                  value={editingMeasurements.cuello}
                  onChange={(e) => setEditingMeasurements({ ...editingMeasurements, cuello: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-mono text-sm font-bold focus:border-amber-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Postura y Estilo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Perfil Anatómico / Postura</label>
                <select
                  value={editingMeasurements.postura}
                  onChange={(e) => setEditingMeasurements({ ...editingMeasurements, postura: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm font-medium focus:border-amber-600 focus:outline-none"
                >
                  <option value="Atleta / V-Taper">Atleta / V-Taper</option>
                  <option value="Erguida">Erguida Clásica</option>
                  <option value="Inclinada al frente">Inclinada al frente</option>
                  <option value="Hombros caídos">Hombros caídos</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Corte & Caída Predilecta</label>
                <select
                  value={editingMeasurements.estiloPreferido}
                  onChange={(e) => setEditingMeasurements({ ...editingMeasurements, estiloPreferido: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm font-medium focus:border-amber-600 focus:outline-none"
                >
                  <option value="Soft Tailoring Napolitano">Soft Tailoring Napolitano (Spalla Camicia)</option>
                  <option value="Slim Fit Europeo">Slim Fit Europeo</option>
                  <option value="Classic Tailored">Classic Tailored Savile Row</option>
                  <option value="Oversize Sartorial">Oversize Sartorial</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Notas de Estilo & Preferencias Textiles</label>
              <textarea
                rows={2}
                value={editingMeasurements.notasEspeciales}
                onChange={(e) => setEditingMeasurements({ ...editingMeasurements, notasEspeciales: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm font-medium focus:border-amber-600 focus:outline-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                Guardar Cambios en Ficha Digital
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 4: CATÁLOGO DE SERVICIOS */}
      {activeTab === 'servicios' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALTERATION_SERVICES.map(srv => (
            <div key={srv.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-800 font-mono text-[11px] font-bold uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {srv.category}
                  </span>
                  <span className="text-slate-500 font-mono text-[11px] font-semibold">
                    {srv.estimatedDays} días hábiles
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">{srv.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{srv.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block font-medium">Tarifa base sugerida</span>
                  <span className="font-mono text-sm font-bold text-amber-800">
                    ${srv.basePrice.toLocaleString('es-CO')} COP
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!selectedServices.some(s => s.id === srv.id)) {
                      setSelectedServices([...selectedServices, srv]);
                    }
                    setActiveTab('agendamiento');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cotizar en Cita
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
