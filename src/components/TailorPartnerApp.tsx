import React, { useState, useEffect, useRef } from 'react';
import { 
  Car, 
  Power, 
  MapPin, 
  Navigation, 
  Wallet, 
  Plus, 
  Trash2, 
  Check, 
  Calculator, 
  Send, 
  Phone, 
  FileText, 
  CheckCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
  ShieldAlert,
  FileCheck2,
  FolderOpen,
  Camera,
  Scissors,
  Upload,
  AlertCircle,
  Ruler,
  Sparkles,
  Award,
  Layers,
  ChevronRight,
  QrCode,
  ScanLine,
  Lock,
  Unlock,
  KeyRound,
  X,
  Flashlight,
  Maximize2,
  RefreshCw
} from 'lucide-react';
import { TailorPartner, Appointment, AlterationService, PortfolioPiece } from '../types';
import { ALTERATION_SERVICES } from '../data/mockData';
import { BogotaMap } from './BogotaMap';

interface TailorPartnerAppProps {
  tailor: TailorPartner;
  onUpdateTailor: (tailor: TailorPartner) => void;
  activeAppointment: Appointment;
  onUpdateAppointment: (appt: Appointment) => void;
}

export const TailorPartnerApp: React.FC<TailorPartnerAppProps> = ({
  tailor,
  onUpdateTailor,
  activeAppointment,
  onUpdateAppointment
}) => {
  const [activeTab, setActiveTab] = useState<'turn' | 'cotizador' | 'perfil_vehiculo' | 'billetera'>('turn');
  const [isOnline, setIsOnline] = useState(tailor.status !== 'offline');
  const [coverageRadius, setCoverageRadius] = useState<'8km' | '12km' | 'Zonas VIP Exclusivas'>('Zonas VIP Exclusivas');

  // QR Code Scanner State
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [scanErrorMessage, setScanErrorMessage] = useState<string | null>(null);
  const [manualCodeInput, setManualCodeInput] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // In-home quote builder state
  const [quoteItems, setQuoteItems] = useState([
    {
      garment: 'Blazer Tom Ford Azul Cobalto',
      serviceId: ALTERATION_SERVICES[1].id,
      serviceName: ALTERATION_SERVICES[1].name,
      basePrice: ALTERATION_SERVICES[1].basePrice,
      adjustmentFee: 0,
      fabricNotes: 'Lana Super 150s, forro de cupro impecable',
      complexity: 'Maestría'
    },
    {
      garment: 'Pantalón Loro Piana Gris Perla',
      serviceId: ALTERATION_SERVICES[2].id,
      serviceName: ALTERATION_SERVICES[2].name,
      basePrice: ALTERATION_SERVICES[2].basePrice,
      adjustmentFee: 5000,
      fabricNotes: 'Valona italiana 4.5cm con hilván ciego a mano',
      complexity: 'Baja'
    }
  ]);

  // In-fitting specific measurements requested: Cuello, Hombros, Cintura, Largo de bota
  const [inFittingCuello, setInFittingCuello] = useState(activeAppointment.inFittingMeasurements?.cuello || 40.5);
  const [inFittingHombros, setInFittingHombros] = useState(activeAppointment.inFittingMeasurements?.hombros || 46.5);
  const [inFittingCintura, setInFittingCintura] = useState(activeAppointment.inFittingMeasurements?.cintura || 88.0);
  const [inFittingLargoBota, setInFittingLargoBota] = useState(activeAppointment.inFittingMeasurements?.largoBota || 102.5);

  // Menú Desplegable de Modificaciones con listado para marcar con un check:
  // • Entallar costados (+ $35.000)
  // • Subir mangas (+ $25.000)
  // • Ajustar bota (+ $20.000)
  const [quickModifications, setQuickModifications] = useState([
    { id: 'mod-1', name: 'Entallar costados', price: 35000, checked: true },
    { id: 'mod-2', name: 'Subir mangas', price: 25000, checked: true },
    { id: 'mod-3', name: 'Ajustar bota', price: 20000, checked: true },
    { id: 'mod-4', name: 'Ajuste de pretina / valona italiana', price: 18000, checked: false },
    { id: 'mod-5', name: 'Desmonte y afinación de sisa', price: 42000, checked: false },
  ]);

  const [urgentDelivery, setUrgentDelivery] = useState(false);
  const [quoteSentNotice, setQuoteSentNotice] = useState(false);
  const [clientSignatureCaptured, setClientSignatureCaptured] = useState(false);
  
  // Withdrawal / Payout state
  const [payoutRequested, setPayoutRequested] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState<number>(tailor.balancePending || 1200000);
  const [payoutBank, setPayoutBank] = useState<'Bancolombia' | 'Transfiya' | 'Daviplata'>(tailor.bankAccount.type);

  // New portfolio piece modal state
  const [showAddPortfolio, setShowAddPortfolio] = useState(false);
  const [newPieceTitle, setNewPieceTitle] = useState('');
  const [newPieceCategory, setNewPieceCategory] = useState('Bespoke Etiqueta');
  const [newPieceFabric, setNewPieceFabric] = useState('Lana 160s Scabal');
  const [newPieceTechnique, setNewPieceTechnique] = useState('Picado de solapa en crin natural');

  // Document upload mock simulation
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  // Handle hardware camera lifecycle
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (showQRScanner) {
      setScanSuccess(false);
      setIsScanning(false);
      setScanErrorMessage(null);

      // Attempt to access rear/environment camera
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: { facingMode: 'environment' } })
          .then((mediaStream) => {
            stream = mediaStream;
            if (videoRef.current) {
              videoRef.current.srcObject = mediaStream;
              videoRef.current.play().catch(() => {});
              setCameraActive(true);
            }
          })
          .catch(() => {
            setCameraActive(false);
          });
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const s = videoRef.current.srcObject as MediaStream;
        s.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [showQRScanner]);

  const handleToggleOnline = () => {
    const nextState = !isOnline;
    setIsOnline(nextState);
    onUpdateTailor({
      ...tailor,
      status: nextState ? 'online' : 'offline'
    });
  };

  const calculateQuickModsTotal = () => {
    return quickModifications.filter(m => m.checked).reduce((sum, m) => sum + m.price, 0);
  };

  const calculateSubtotal = () => {
    const modsTotal = calculateQuickModsTotal();
    const raw = modsTotal > 0 ? modsTotal : quoteItems.reduce((acc, item) => acc + item.basePrice + item.adjustmentFee, 0);
    return urgentDelivery ? Math.round(raw * 1.15) : raw;
  };

  const platformCommissionPercent = 20; // Standard 20%
  const subtotal = calculateSubtotal();
  const platformFee = Math.round(subtotal * (platformCommissionPercent / 100));
  const tailorNet = subtotal - platformFee;

  const handleToggleQuickMod = (id: string) => {
    setQuickModifications(prev =>
      prev.map(m => (m.id === id ? { ...m, checked: !m.checked } : m))
    );
  };

  // QR Code Verification Handler
  const handleVerifyQRCode = (codeValue: string) => {
    setIsScanning(true);
    setScanErrorMessage(null);

    // Simulate optical decoding
    setTimeout(() => {
      const cleanCode = codeValue.trim().toUpperCase();
      const expectedId = activeAppointment.id.toUpperCase();
      
      const isValid = 
        cleanCode === expectedId || 
        cleanCode.includes('CITA') || 
        cleanCode.includes('BOG') || 
        cleanCode.includes('9402') ||
        cleanCode.includes('1049') ||
        cleanCode === 'PASE-VIP';

      if (isValid) {
        // Haptic feedback
        if (typeof window !== 'undefined' && 'vibrate' in navigator) {
          try {
            navigator.vibrate([70, 70, 120]);
          } catch (e) {}
        }

        setIsScanning(false);
        setScanSuccess(true);

        const verifiedTime = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });

        onUpdateAppointment({
          ...activeAppointment,
          qrVerified: true,
          qrVerifiedAt: verifiedTime,
          status: activeAppointment.status === 'en_camino' ? 'en_cita' : activeAppointment.status,
          notes: `${activeAppointment.notes || ''} [QR Verificado a las ${verifiedTime}]`
        });

        setTimeout(() => {
          setShowQRScanner(false);
          setActiveTab('cotizador');
        }, 1500);
      } else {
        setIsScanning(false);
        setScanErrorMessage(`El código "${codeValue}" no coincide con la reserva VIP #${activeAppointment.id}. Verifique con el cliente.`);
      }
    }, 1100);
  };

  const handleAcceptAndRequestBiometric = () => {
    // Vibrate device if supported (haptic feedback)
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([60, 100, 60, 120]);
      } catch (err) {
        // haptics unavailable
      }
    }

    const checkedMods = quickModifications.filter(m => m.checked);
    const updatedItems = checkedMods.map(m => ({
      serviceName: m.name,
      garmentType: 'Prenda Bespoke en Cita',
      price: m.price,
      fabricNote: 'Marcas con tiza en cita física',
      complexity: 'Media'
    }));

    onUpdateAppointment({
      ...activeAppointment,
      items: updatedItems.length > 0 ? updatedItems : activeAppointment.items,
      totalEstimate: subtotal,
      platformFee,
      tailorNet,
      status: 'prendas_en_taller',
      clientSignature: true,
      inFittingMeasurements: {
        cuello: inFittingCuello,
        hombros: inFittingHombros,
        cintura: inFittingCintura,
        largoBota: inFittingLargoBota
      },
      custodySealNumber: activeAppointment.custodySealNumber || 'BOG-SEC-9402',
      custodyTimeline: [
        {
          time: '14:30',
          title: `Medidas tomadas por ${tailor.name}`,
          status: 'completado',
          description: `Cuello: ${inFittingCuello}cm · Hombros: ${inFittingHombros}cm · Cintura: ${inFittingCintura}cm · Bota: ${inFittingLargoBota}cm`,
          location: activeAppointment.clientAddress,
          badge: 'Firma & FaceID'
        },
        {
          time: '15:15',
          title: 'Prenda ingresada de forma segura al Taller Asociado',
          status: 'completado',
          description: 'Custodia garantizada en vehículo particular con precinto digital #BOG-SEC-9402.',
          location: 'Taller Central Norte Bogotá (Cl. 85 # 11-53)',
          badge: 'Precinto Activo'
        },
        {
          time: 'En Proceso',
          title: 'Modificación y costura fina en ejecución',
          status: 'en_proceso',
          description: checkedMods.map(m => m.name).join(' · ') || 'Entallar costados, mangas y bota',
          location: 'Estación de Corte y Aplomo'
        },
        {
          time: 'Pendiente',
          title: 'Control de calidad y planchado premium',
          status: 'pendiente',
          description: 'Inspección de simetría sobre maniquí y vaporizado artesanal.',
          location: 'Planchado & Acabados'
        },
        {
          time: 'Pendiente',
          title: 'Ruta de devolución a domicilio',
          status: 'pendiente',
          description: 'Entrega final privada en portatrajes de lujo.',
          location: `Destino: ${activeAppointment.neighborhood}`
        }
      ],
      notes: `Servicio autorizado en cita. Medidas in situ: Cuello ${inFittingCuello}cm, Hombros ${inFittingHombros}cm, Cintura ${inFittingCintura}cm, Bota ${inFittingLargoBota}cm.`
    });

    setClientSignatureCaptured(true);
    setQuoteSentNotice(true);
    setTimeout(() => setQuoteSentNotice(false), 5000);
  };

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    setPayoutRequested(true);
    setTimeout(() => setPayoutRequested(false), 4500);
  };

  const handleAddPortfolioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPieceTitle) return;

    const newPiece: PortfolioPiece = {
      id: `pf-${Date.now()}`,
      title: newPieceTitle,
      category: newPieceCategory,
      description: 'Confección y aplomo artesanal certificado en Bogotá.',
      fabric: newPieceFabric,
      technique: newPieceTechnique
    };

    onUpdateTailor({
      ...tailor,
      portfolio: [newPiece, ...tailor.portfolio]
    });

    setNewPieceTitle('');
    setShowAddPortfolio(false);
  };

  const handleSimulateDocUpload = (docName: string) => {
    setUploadNotice(`Documento "${docName}" cargado en el expediente de seguridad.`);
    setTimeout(() => setUploadNotice(null), 3500);
  };

  // Real Navigation Deep-links for Bogota address
  const encodedAddress = encodeURIComponent(activeAppointment.clientAddress);
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  const wazeUrl = `https://waze.com/ul?q=${encodedAddress}&navigate=yes`;

  const isAppointmentUnlocked = Boolean(activeAppointment.qrVerified);

  return (
    <div className="space-y-6 text-slate-900">
      {/* Uber-Style Top Availability Switch Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-13 h-13 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center font-serif font-bold text-amber-800 text-xl shadow-2xs">
              {tailor.avatar}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              isOnline ? 'bg-emerald-500' : 'bg-slate-400'
            }`} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">{tailor.name}</h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300">
                Sastre Verificado
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {tailor.vehicle.brand} {tailor.vehicle.model} · Placa: <span className="font-mono text-slate-900 font-bold">{tailor.vehicle.plate}</span>
            </p>
          </div>
        </div>

        {/* Uber-like Connect Button & Hot Demand Indicator */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Real-time demand chip */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span className="text-slate-600 font-medium">Demanda Chicó / Rosales:</span>
            <span className="font-mono text-amber-800 font-bold">+25% Citas VIP</span>
          </div>

          {/* Quick Scanner Shortcut in Top Header */}
          <button
            type="button"
            onClick={() => setShowQRScanner(true)}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs border ${
              isAppointmentUnlocked
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-400 animate-pulse'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>{isAppointmentUnlocked ? 'Pase QR Verificado' : 'Escanear QR Cliente'}</span>
          </button>

          {/* Connect / Disconnect Big Button */}
          <button
            type="button"
            onClick={handleToggleOnline}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95 ${
              isOnline
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700 border border-slate-300'
            }`}
          >
            <Power className="w-4 h-4" />
            <span>{isOnline ? '● Conectado (Recibiendo Citas)' : '○ Desconectado'}</span>
          </button>
        </div>
      </div>

      {/* Module 2 Navigation Sub-tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 text-xs">
        <button
          onClick={() => setActiveTab('turn')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'turn'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Navigation className="w-4 h-4" />
          <span>1. En Ruta & Navegación GPS</span>
        </button>

        <button
          onClick={() => setActiveTab('cotizador')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'cotizador'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>2. Cotizador en Cita Física</span>
          {!isAppointmentUnlocked && (
            <span className="w-2 h-2 rounded-full bg-amber-500" title="Requiere escanear QR de llegada" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('perfil_vehiculo')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'perfil_vehiculo'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>3. Registro, Documentos & Vehículo</span>
        </button>

        <button
          onClick={() => setActiveTab('billetera')}
          className={`px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'billetera'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Wallet className="w-4 h-4" />
          <span>4. Billetera & Dispersión Bancaria</span>
        </button>
      </div>

      {uploadNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2 shadow-2xs">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{uploadNotice}</span>
        </div>
      )}

      {/* QR CODE SCANNER MODAL (OPTICAL SCANNING VIEWPORT) */}
      {showQRScanner && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold border border-amber-300">
                  <ScanLine className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Escáner Óptico de Pase VIP
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Llegada a {activeAppointment.neighborhood} · Cita #{activeAppointment.id}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowQRScanner(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Viewfinder Camera / Optical Target */}
            <div className="relative w-full aspect-square max-h-72 bg-slate-950 rounded-2xl overflow-hidden border-2 border-slate-300 flex items-center justify-center shadow-inner">
              {/* Real camera video if available */}
              {cameraActive ? (
                <video
                  ref={videoRef}
                  playsInline
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                /* Simulated optical grid & QR graphic backdrop */
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-b from-slate-900 to-slate-950">
                  <div className="w-32 h-32 opacity-25 flex items-center justify-center">
                    <QrCode className="w-full h-full text-slate-400" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 mt-2">
                    Visor de alta precisión listo
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Alinee el código QR del cliente dentro del marco
                  </span>
                </div>
              )}

              {/* Viewfinder Reticle & Golden Corner Brackets */}
              <div className="absolute inset-8 pointer-events-none">
                {/* 4 Corner Markers */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-3 border-l-3 border-amber-400 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-3 border-r-3 border-amber-400 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-3 border-l-3 border-amber-400 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-3 border-r-3 border-amber-400 rounded-br-lg" />

                {/* Laser scan line animation */}
                <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse top-1/2 -translate-y-1/2" />
              </div>

              {/* Success Overlay on Detection */}
              {scanSuccess && (
                <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center z-20 space-y-2">
                  <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg animate-bounce">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
                    ¡Código QR Verificado!
                  </span>
                  <h4 className="text-sm font-bold text-white">
                    {activeAppointment.clientName}
                  </h4>
                  <p className="text-[11px] text-emerald-200">
                    Pase #{activeAppointment.id} · Herramientas de calibración desbloqueadas
                  </p>
                </div>
              )}

              {/* Scanning status banner */}
              {isScanning && !scanSuccess && (
                <div className="absolute bottom-3 left-4 right-4 bg-slate-900/90 text-amber-300 text-[11px] font-mono py-1.5 px-3 rounded-lg text-center border border-amber-400/40 z-10 animate-pulse">
                  Decodificando token seguro de la cita...
                </div>
              )}
            </div>

            {/* Error Message if wrong QR */}
            {scanErrorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{scanErrorMessage}</span>
              </div>
            )}

            {/* Instant Detection Simulator & Manual Input */}
            <div className="space-y-3 pt-1">
              <button
                type="button"
                onClick={() => handleVerifyQRCode(activeAppointment.id)}
                disabled={isScanning || scanSuccess}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all disabled:opacity-50"
              >
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>{isScanning ? 'Verificando...' : `Detectar QR del Cliente (${activeAppointment.id})`}</span>
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-2 text-[10px] font-mono text-slate-400 uppercase absolute">
                  O ingreso manual
                </span>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (manualCodeInput) handleVerifyQRCode(manualCodeInput);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ej. CITA-BOG-1049"
                  value={manualCodeInput}
                  onChange={(e) => setManualCodeInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono text-xs uppercase focus:outline-none focus:border-amber-600"
                />
                <button
                  type="submit"
                  disabled={!manualCodeInput.trim() || isScanning}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 cursor-pointer disabled:opacity-40"
                >
                  Validar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: EN RUTA & NAVEGACIÓN GPS */}
      {activeTab === 'turn' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: GPS Map and routing */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-serif font-bold text-slate-900 tracking-wide">
                  Desplazamiento Hacia el Hogar del Cliente
                </h3>
                <p className="text-xs text-slate-500">
                  Ruta recomendada evitando la congestión de la Carrera 7ma y Calle 100
                </p>
              </div>

              {/* Real Waze and Google Maps Deep-link triggers */}
              <div className="flex items-center gap-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-200 shadow-2xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-blue-600" />
                  <span>Abrir Google Maps</span>
                </a>

                <a
                  href={wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-900 border border-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-cyan-700" />
                  <span>Abrir Waze</span>
                </a>
              </div>
            </div>

            {/* Interactive Bogota Vector Map */}
            <BogotaMap
              activeTailor={tailor}
              clientZone={activeAppointment.neighborhood}
              showTailorTransit={true}
            />

            {/* In-Transit HUD Control */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 shadow-2xs">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block font-medium">Vehículo verificado:</span>
                  <span className="text-xs font-bold text-slate-900">
                    {tailor.vehicle.brand} {tailor.vehicle.model} ({tailor.vehicle.color})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 block font-medium">Tiempo estimado de llegada</span>
                  <span className="text-sm font-mono font-bold text-amber-800">
                    ~{activeAppointment.etaMinutes || 12} mins (4.2 km)
                  </span>
                </div>

                <a
                  href={`tel:${activeAppointment.clientPhone}`}
                  className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Llamar al Cliente</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Appointment Details & Step Progression */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 tracking-wide">
                  Detalles de la Cita Residencial
                </h4>
                <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                  #{activeAppointment.id}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-500 block font-semibold text-[11px]">Cliente VIP:</span>
                  <span className="font-bold text-slate-900 text-sm block">{activeAppointment.clientName}</span>
                  <p className="text-slate-600 text-[11px] font-medium">{activeAppointment.clientAddress}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-500 block font-semibold text-[11px]">Instrucciones de Acceso / Portería:</span>
                  <p className="text-slate-700 italic text-[11px] font-medium">{activeAppointment.notes}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-slate-500 block font-semibold text-[11px]">Prendas Solicitadas para Evaluar:</span>
                  {activeAppointment.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-slate-800">
                      <div>
                        <span className="font-bold text-slate-900 block">• {it.garmentType}</span>
                        <span className="text-[10px] text-slate-500">{it.serviceName}</span>
                      </div>
                      <span className="font-mono text-slate-900 font-bold shrink-0">${it.price.toLocaleString('es-CO')}</span>
                    </div>
                  ))}
                </div>

                {/* QR Arrival Scan CTA Banner */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <QrCode className="w-4 h-4 text-amber-700" />
                      Protocolo de Llegada a Residencia
                    </span>
                    {isAppointmentUnlocked ? (
                      <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                        Verificado
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded">
                        Pendiente
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {isAppointmentUnlocked
                      ? `Cita verificada a las ${activeAppointment.qrVerifiedAt || '14:28'}. Puede pasar directamente al cotizador.`
                      : 'Al llegar a la portería o puerta del cliente, escanee su pase QR para validar identidad y habilitar el cotizador.'}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      if (isAppointmentUnlocked) {
                        setActiveTab('cotizador');
                      } else {
                        setShowQRScanner(true);
                      }
                    }}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all ${
                      isAppointmentUnlocked
                        ? 'bg-slate-900 text-white hover:bg-slate-800'
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                    }`}
                  >
                    {isAppointmentUnlocked ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Abrir Cotizador In-Situ</span>
                      </>
                    ) : (
                      <>
                        <ScanLine className="w-4 h-4" />
                        <span>Escanear QR del Cliente en Puerta</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Tips for Tailor */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 space-y-1.5 shadow-2xs">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Protocolo de Calidad Atelier Bogotá
              </span>
              <p className="text-[11px] leading-relaxed">
                Recuerde llevar siempre el maletín rígido con cinta métrica de precisión, alfiletero magnético, tiza francesa blanca/gris y portatrajes de cortesía para el transporte de las prendas al taller central.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COTIZADOR INTEGRADO EN CITA FÍSICA */}
      {activeTab === 'cotizador' && (
        <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-600" />
                <h3 className="text-xl font-serif font-bold text-slate-900 tracking-wide">
                  Cotizador Técnico de Arreglos en la Cita Física
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Ingrese las marcas milimétricas tomadas al cliente. El sistema calcula automáticamente la comisión del 20% y el valor neto a liquidarle.
              </p>
            </div>

            <div className="text-right flex items-center gap-2">
              {isAppointmentUnlocked ? (
                <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-300 text-right">
                  <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase flex items-center gap-1 justify-end">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Pase QR Verificado
                  </span>
                  <span className="text-[11px] text-slate-600 block">Hora: {activeAppointment.qrVerifiedAt || '14:28'}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowQRScanner(true)}
                  className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs animate-bounce"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Escanear QR de Cita</span>
                </button>
              )}
            </div>
          </div>

          {quoteSentNotice && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="font-medium">
                  ¡Cotización formal emitida y firmada digitalmente por el cliente! Las prendas pueden trasladarse al taller central.
                </span>
              </div>
              <span className="font-mono text-emerald-800 font-bold">
                Total: ${subtotal.toLocaleString('es-CO')} COP
              </span>
            </div>
          )}

          {/* SECURITY GATE: LOCKED IF QR HAS NOT BEEN SCANNED */}
          {!isAppointmentUnlocked ? (
            <div className="p-8 rounded-2xl bg-amber-50/60 border-2 border-dashed border-amber-300 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center mx-auto shadow-sm">
                <Lock className="w-8 h-8" />
              </div>

              <div className="max-w-md mx-auto space-y-1">
                <h4 className="text-base font-bold text-slate-900">
                  Herramientas de Calibración In-Situ Protegidas
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Por protocolo de confidencialidad y cadena de custodia en residencias VIP, el sastre debe escanear el código QR que el cliente exhibe en su app para verificar la cita y desbloquear la toma de medidas.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowQRScanner(true)}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md transition-all"
                >
                  <ScanLine className="w-4 h-4 text-amber-400" />
                  <span>Escanear Código QR del Cliente</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleVerifyQRCode(activeAppointment.id)}
                  className="px-4 py-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all"
                  title="Simula la lectura instantánea del código QR de la cita para pruebas"
                >
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>Auto-desbloquear con Pase #{activeAppointment.id}</span>
                </button>
              </div>
            </div>
          ) : (
            /* UNLOCKED TOOLSET */
            <>
              {/* Unlocked Confirmation Banner */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center justify-between text-xs shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold block">Pase QR #{activeAppointment.id} Validado</span>
                    <span className="text-[11px] text-emerald-800">
                      Identidad del cliente ({activeAppointment.clientName}) y residencia en {activeAppointment.neighborhood} confirmadas.
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowQRScanner(true)}
                  className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 underline cursor-pointer"
                >
                  Re-escanear
                </button>
              </div>

              {/* Section 1: In-Situ Measurements explicitly requested */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-amber-600" />
                    Medidas Tomadas en la Cita Física
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 font-medium">Milímetros de precisión</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-white border border-slate-300 shadow-2xs space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 block">Cuello:</label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        step="0.5"
                        value={inFittingCuello}
                        onChange={(e) => setInFittingCuello(parseFloat(e.target.value) || 0)}
                        className="w-full bg-transparent text-slate-900 font-mono text-sm font-bold focus:outline-none"
                      />
                      <span className="text-xs text-amber-700 font-mono font-bold">cm</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-300 shadow-2xs space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 block">Hombros:</label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        step="0.5"
                        value={inFittingHombros}
                        onChange={(e) => setInFittingHombros(parseFloat(e.target.value) || 0)}
                        className="w-full bg-transparent text-slate-900 font-mono text-sm font-bold focus:outline-none"
                      />
                      <span className="text-xs text-amber-700 font-mono font-bold">cm</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-300 shadow-2xs space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 block">Cintura:</label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        step="0.5"
                        value={inFittingCintura}
                        onChange={(e) => setInFittingCintura(parseFloat(e.target.value) || 0)}
                        className="w-full bg-transparent text-slate-900 font-mono text-sm font-bold focus:outline-none"
                      />
                      <span className="text-xs text-amber-700 font-mono font-bold">cm</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-300 shadow-2xs space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 block">Largo de bota:</label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        step="0.5"
                        value={inFittingLargoBota}
                        onChange={(e) => setInFittingLargoBota(parseFloat(e.target.value) || 0)}
                        className="w-full bg-transparent text-slate-900 font-mono text-sm font-bold focus:outline-none"
                      />
                      <span className="text-xs text-amber-700 font-mono font-bold">cm</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Menú Desplegable de Modificaciones (Checklist Técnico Rápido) */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                      Menú Desplegable de Modificaciones (Checklist)
                    </span>
                    <span className="text-[11px] text-slate-600 font-medium">
                      Marque los arreglos evaluados con el cliente en la cita física:
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded">
                    {quickModifications.filter(m => m.checked).length} Arreglos activos
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  {quickModifications.map((mod) => (
                    <label
                      key={mod.id}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        mod.checked
                          ? 'bg-amber-50 border-amber-300 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={mod.checked}
                          onChange={() => handleToggleQuickMod(mod.id)}
                          className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
                        />
                        <span className="text-xs font-bold text-slate-900">
                          {mod.name}
                        </span>
                      </div>

                      <span className="text-xs font-mono font-bold text-amber-800">
                        + ${mod.price.toLocaleString('es-CO')} COP
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section 3: Cálculo en Tiempo Real & Barra de Aceptación Biométrica */}
              <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] uppercase font-mono text-amber-400 block tracking-wider font-semibold">
                      Cálculo en Tiempo Real
                    </span>
                    <div className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
                      Valor del servicio: <span className="text-amber-400 font-mono">${subtotal.toLocaleString('es-CO')} COP</span>
                    </div>
                  </div>

                  <div className="text-right text-xs">
                    <span className="text-slate-400 block font-medium">Comisión plataforma (20%): <strong className="text-slate-300 font-mono">-${platformFee.toLocaleString('es-CO')}</strong></span>
                    <span className="text-emerald-400 font-bold block">Su pago líquido (80%): <strong className="text-emerald-400 font-mono font-bold">${tailorNet.toLocaleString('es-CO')} COP</strong></span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Al hacer clic en <strong>"Aceptar"</strong>, el dispositivo del cliente VIP emitirá una vibración háptica inmediata y abrirá la pantalla de autorización biométrica (Face ID / Huella Dactilar) para formalizar la custodia y el pago.
                </p>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleAcceptAndRequestBiometric}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Aceptar y Solicitar Face ID / Huella al Cliente</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* TAB 3: REGISTRO DE PROVEEDOR, DOCUMENTOS & VEHÍCULO */}
      {activeTab === 'perfil_vehiculo' && (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Vehicle Dossier */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Car className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Datos del Vehículo Particular (Logística Propia)
                </h3>
              </div>
              <span className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded">
                SOAT & Tecnomecánica Vigente
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 block font-semibold text-[11px]">Marca & Línea:</span>
                <span className="font-bold text-slate-900 text-sm">{tailor.vehicle.brand} {tailor.vehicle.model}</span>
                <span className="text-slate-500 block text-[11px]">Año {tailor.vehicle.year}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 block font-semibold text-[11px]">Placa Registrada:</span>
                <span className="font-mono text-amber-800 font-bold text-sm">{tailor.vehicle.plate}</span>
                <span className="text-slate-500 block text-[11px]">Bogotá D.C.</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 block font-semibold text-[11px]">Color del Vehículo:</span>
                <span className="font-bold text-slate-900 text-sm">{tailor.vehicle.color}</span>
                <span className="text-slate-500 block text-[11px]">Carrocería ejecutiva</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 block font-semibold text-[11px]">Vencimiento SOAT:</span>
                <span className="font-mono text-emerald-700 font-bold text-sm">{tailor.vehicle.soatExpiry}</span>
                <span className="text-slate-500 block text-[11px]">Póliza digital cargada</span>
              </div>
            </div>
          </div>

          {/* Legal Documents Verification Status */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileCheck2 className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Documentación Legal & Antecedentes Judiciales
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500 font-medium">
                Verificado el {tailor.documents.fechaVerificacion || '2026-08-15'}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Cédula de Ciudadanía Colombiana</span>
                    <span className="text-slate-500 text-[11px]">{tailor.documents.cedulaPdfUrl || 'CC_79412901_Bogota.pdf'}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleSimulateDocUpload('Cédula de Ciudadanía')}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer border border-slate-200"
                >
                  Actualizar PDF
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Certificado de Antecedentes (Policía Nacional)</span>
                    <span className="text-slate-500 text-[11px]">Sin antecedentes penales ni requerimientos judiciales</span>
                  </div>
                </div>
                <span className="text-emerald-700 font-mono text-[11px] font-bold">Limpio / Vigente</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Registro Único Tributario (RUT - DIAN)</span>
                    <span className="text-slate-500 text-[11px]">Actividad 1410 (Confección) y 9529 (Reparación de prendas)</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleSimulateDocUpload('RUT')}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer border border-slate-200"
                >
                  Ver Certificado
                </button>
              </div>
            </div>
          </div>

          {/* Sewing Portfolio */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Portafolio Técnico de Costura & Confección Bespoke
                </h3>
                <p className="text-xs text-slate-500">
                  Muestrario de alta costura visible para clientes de Rosales y Chicó al solicitar sus servicios
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddPortfolio(true)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>Agregar Trabajo al Portafolio</span>
              </button>
            </div>

            {showAddPortfolio && (
              <form onSubmit={handleAddPortfolioSubmit} className="p-4 rounded-xl bg-slate-50 border border-slate-300 space-y-3 text-xs">
                <span className="font-bold text-slate-900 block">Registrar Nueva Obra / Confección</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-700 block mb-1 font-semibold">Título de la Prenda</label>
                    <input
                      type="text"
                      placeholder="Ej. Frac de Gala Solapa Seda"
                      value={newPieceTitle}
                      onChange={(e) => setNewPieceTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 block mb-1 font-semibold">Categoría</label>
                    <select
                      value={newPieceCategory}
                      onChange={(e) => setNewPieceCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900"
                    >
                      <option value="Bespoke Etiqueta">Bespoke Etiqueta</option>
                      <option value="Sartoría Fina">Sartoría Fina</option>
                      <option value="Alta Costura Noche">Alta Costura Noche</option>
                      <option value="Abrigos de Lujo">Abrigos de Lujo</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-700 block mb-1 font-semibold">Paño / Tejido Utilizado</label>
                    <input
                      type="text"
                      placeholder="Ej. Lana Super 160s Vitale Barberis"
                      value={newPieceFabric}
                      onChange={(e) => setNewPieceFabric(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 block mb-1 font-semibold">Técnica Especial</label>
                    <input
                      type="text"
                      placeholder="Ej. Ojal milanés a mano"
                      value={newPieceTechnique}
                      onChange={(e) => setNewPieceTechnique(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddPortfolio(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-slate-900 text-white font-bold text-xs cursor-pointer"
                  >
                    Guardar en Portafolio
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tailor.portfolio.map(piece => (
                <div key={piece.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded">
                      {piece.category}
                    </span>
                    <Scissors className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{piece.title}</h4>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{piece.description}</p>
                  <div className="pt-2 border-t border-slate-200 space-y-0.5 text-[10px] text-slate-500">
                    <p><strong className="text-slate-700">Tejido:</strong> {piece.fabric}</p>
                    <p><strong className="text-slate-700">Técnica:</strong> {piece.technique}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BILLETERA DIGITAL INTEGRADA & DISPERSIÓN */}
      {activeTab === 'billetera' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-500 font-semibold">Saldo Disponible para Retiro</span>
              <div className="text-2xl font-serif font-bold text-emerald-700 font-mono">
                ${tailor.balancePending.toLocaleString('es-CO')} COP
              </div>
              <p className="text-[11px] text-slate-500">Comisión de plataforma ya deducida (80% neto)</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-500 font-semibold">Total Liquidado Histórico</span>
              <div className="text-2xl font-serif font-bold text-slate-900 font-mono">
                ${tailor.balanceWithdrawn.toLocaleString('es-CO')} COP
              </div>
              <p className="text-[11px] text-slate-500">Transferido a cuenta bancaria verificada</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-500 font-semibold">Comisión Promedio Plataforma</span>
              <div className="text-2xl font-serif font-bold text-amber-800 font-mono">
                20% Retención
              </div>
              <p className="text-[11px] text-slate-500">Incluye seguros de prenda y captación de clientes</p>
            </div>
          </div>

          {payoutRequested && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold block">¡Solicitud de dispersión procesada con éxito!</span>
                  <span className="text-slate-600 text-[11px]">
                    Se han transferido ${payoutAmount.toLocaleString('es-CO')} COP vía {payoutBank} a su cuenta registrada.
                  </span>
                </div>
              </div>
              <span className="font-mono text-emerald-800 text-[11px] font-bold">REF: TRANSF-8921BOG</span>
            </div>
          )}

          {/* Withdrawal Form */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-base font-bold text-slate-900">Solicitar Retiro de Dinero</h4>
            <form onSubmit={handleRequestPayout} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 block mb-1 font-semibold">Monto a Retirar (COP)</label>
                  <input
                    type="number"
                    step="50000"
                    max={tailor.balancePending}
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-mono font-bold text-sm focus:border-amber-600 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-700 block mb-1 font-semibold">Canal de Dispersión Inmediata</label>
                  <select
                    value={payoutBank}
                    onChange={(e) => setPayoutBank(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm font-medium focus:border-amber-600 focus:outline-none"
                  >
                    <option value="Bancolombia">Bancolombia (Ahorros {tailor.bankAccount.number})</option>
                    <option value="Transfiya">Transfiya (Celular 310 847 2291)</option>
                    <option value="Daviplata">Daviplata Inmediato</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-500">
                  Sin costos de comisión bancaria para el sastre aliado.
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-xs transition-all"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Transferir Dinero a Mi Cuenta</span>
                </button>
              </div>
            </form>
          </div>

          {/* Breakdown Ledger Table */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 text-xs">
            <span className="font-bold text-slate-800 uppercase tracking-wider block">
              Desglose de Comisiones de Servicios Recientes
            </span>

            <div className="space-y-2 divide-y divide-slate-100">
              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Ajuste de Esmoquin Lanificio Cerruti · Rosales</span>
                  <span className="text-[11px] text-slate-500">28 Oct · Tarifa Bruta: $280.000 COP</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-emerald-700 font-bold text-sm block">+$224.000 COP (80%)</span>
                  <span className="font-mono text-rose-700 text-[10px] font-semibold">Comisión Central: -$56.000 COP (20%)</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Valonas y bastas invisibles 3 pantalones · El Chicó</span>
                  <span className="text-[11px] text-slate-500">26 Oct · Tarifa Bruta: $144.000 COP</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-emerald-700 font-bold text-sm block">+$115.200 COP (80%)</span>
                  <span className="font-mono text-rose-700 text-[10px] font-semibold">Comisión Central: -$28.800 COP (20%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
