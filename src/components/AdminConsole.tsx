import React, { useState } from 'react';
import { 
  Users, 
  Percent, 
  Target, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  Settings, 
  Sparkles, 
  Check, 
  X, 
  Sliders, 
  DollarSign,
  Activity,
  BarChart3,
  Globe,
  MapPin,
  Car,
  FileCheck2,
  Clock,
  Eye,
  Lock,
  Unlock,
  Radio,
  FileText
} from 'lucide-react';
import { TailorPartner, CommissionRule, Appointment, AnalyticsEventLog } from '../types';
import { BogotaMap } from './BogotaMap';
import { INITIAL_ANALYTICS_EVENTS } from '../data/mockData';

interface AdminConsoleProps {
  tailors: TailorPartner[];
  onToggleTailorStatus: (tailorId: string) => void;
  commissionRule: CommissionRule;
  onUpdateCommissionRule: (rule: CommissionRule) => void;
  appointments: Appointment[];
}

export const AdminConsole: React.FC<AdminConsoleProps> = ({
  tailors,
  onToggleTailorStatus,
  commissionRule,
  onUpdateCommissionRule,
  appointments
}) => {
  const [activeTab, setActiveTab] = useState<'operaciones' | 'usuarios_roles' | 'motor_comisiones' | 'analitica_pauta'>('operaciones');
  
  // Tailor filter & modal
  const [tailorFilter, setTailorFilter] = useState<'all' | 'verified' | 'pending'>('all');
  const [selectedTailorDossier, setSelectedTailorDossier] = useState<TailorPartner | null>(null);

  // Commission Engine state
  const [baseRate, setBaseRate] = useState(commissionRule.baseRatePercent);
  const [volumeDiscount, setVolumeDiscount] = useState(commissionRule.highVolumeDiscountPercent);
  const [expressSurcharge, setExpressSurcharge] = useState(commissionRule.expressSurchargePercent);
  const [minFee, setMinFee] = useState(commissionRule.minPlatformFeeCOP);
  const [nightSurcharge, setNightSurcharge] = useState(commissionRule.nightSurchargeActive);
  const [commissionSavedNotice, setCommissionSavedNotice] = useState(false);

  // Analytics & Meta CAPI / GA4 state
  const [metaPixelId, setMetaPixelId] = useState('892014902188201');
  const [capiAccessToken, setCapiAccessToken] = useState('EAAG...BOG_LUXURY_TOKEN_PROD');
  const [ga4MeasurementId, setGa4MeasurementId] = useState('G-BOGOTA99VIP');
  const [eventLogs, setEventLogs] = useState<AnalyticsEventLog[]>(INITIAL_ANALYTICS_EVENTS);
  const [testEventTriggered, setTestEventTriggered] = useState(false);

  const handleSaveCommissionRules = () => {
    onUpdateCommissionRule({
      ...commissionRule,
      baseRatePercent: baseRate,
      highVolumeDiscountPercent: volumeDiscount,
      expressSurchargePercent: expressSurcharge,
      minPlatformFeeCOP: minFee,
      nightSurchargeActive: nightSurcharge
    });
    setCommissionSavedNotice(true);
    setTimeout(() => setCommissionSavedNotice(false), 3000);
  };

  const handleFireTestAnalytics = () => {
    const newLog: AnalyticsEventLog = {
      id: `evt-${Date.now()}`,
      timestamp: 'Ahora mismo',
      channel: 'Meta CAPI (Graph API)',
      eventName: 'Schedule_VIP_Fitting',
      zone: 'La Cabrera (110221)',
      valueCOP: 380000,
      status: 'success_200',
      payloadSummary: '{"event_source": "server", "custom_data": {"stratum": 6, "neighborhood": "La Cabrera", "luxury_lead": true}}'
    };

    setEventLogs([newLog, ...eventLogs]);
    setTestEventTriggered(true);
    setTimeout(() => setTestEventTriggered(false), 3500);
  };

  // Financial aggregates
  const totalGMV = appointments.reduce((sum, a) => sum + a.totalEstimate, 0) + 9420000;
  const platformRevenue = Math.round(totalGMV * (baseRate / 100));

  const filteredTailors = tailors.filter(t => {
    if (tailorFilter === 'verified') return t.verified;
    if (tailorFilter === 'pending') return !t.verified;
    return true;
  });

  return (
    <div className="space-y-6 text-slate-900">
      {/* Top Header Central Console */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 font-serif font-bold text-xl shadow-2xs">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-wide">
                Nuestra Central · Panel Administrativo Web
              </h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                Bogotá VIP Core
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Torre de control operativa, validación de antecedentes, motor de comisiones y analítica CAPI
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('operaciones')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'operaciones' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            1. Seguimiento Operaciones
          </button>
          <button
            onClick={() => setActiveTab('usuarios_roles')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'usuarios_roles' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            2. Gestión Sastres & Roles ({tailors.length})
          </button>
          <button
            onClick={() => setActiveTab('motor_comisiones')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'motor_comisiones' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            3. Motor de Comisiones ({baseRate}%)
          </button>
          <button
            onClick={() => setActiveTab('analitica_pauta')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'analitica_pauta' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            4. Pauta Meta CAPI & GA4
          </button>
        </div>
      </div>

      {/* TAB 1: SEGUIMIENTO DE OPERACIONES (MAPA CENTRALIZADO DE BOGOTÁ) */}
      {activeTab === 'operaciones' && (
        <div className="space-y-6">
          {/* Top KPI Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-500 font-semibold">GMV Transaccionado (Mes)</span>
              <div className="text-2xl font-serif font-bold text-slate-900 font-mono">
                ${totalGMV.toLocaleString('es-CO')} COP
              </div>
              <p className="text-[11px] text-emerald-700 font-semibold">+38% vs mes previo en estrato 6</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-500 font-semibold">Comisión Retenida Central ({baseRate}%)</span>
              <div className="text-2xl font-serif font-bold text-amber-800 font-mono">
                ${platformRevenue.toLocaleString('es-CO')} COP
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Sin pasivos de inventario ni vehículos</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-500 font-semibold">Servicios Activos Hoy en Bogotá</span>
              <div className="text-2xl font-serif font-bold text-blue-700 font-mono">
                {appointments.length} Citas
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Rosales (1) · Chicó (1) · Santa Ana (1)</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-500 font-semibold">Sastres Conectados en Calle</span>
              <div className="text-2xl font-serif font-bold text-emerald-700 font-mono">
                {tailors.filter(t => t.status !== 'offline').length} / {tailors.length}
              </div>
              <p className="text-[11px] text-emerald-700 font-semibold">Tiempo respuesta promedio: 14 min</p>
            </div>
          </div>

          {/* Centralized Bogota Dispatch Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
                    Radar de Despacho en Vivo · Bogotá Zona Norte
                  </h3>
                  <p className="text-xs text-slate-500">
                    Monitoreo en tiempo real de vehículos, rutas y citas físicas en desarrollo
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
                  Actualización cada 2s
                </span>
              </div>

              <BogotaMap
                activeTailor={tailors[0]}
                clientZone="Rosales"
                showTailorTransit={true}
              />
            </div>

            {/* Active Services Live Feed Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">Servicios en Curso</h4>
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded">
                    3 Activos
                  </span>
                </div>

                <div className="space-y-3">
                  {appointments.map(a => {
                    const assigned = tailors.find(t => t.id === a.tailorId) || tailors[0];
                    return (
                      <div key={a.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="font-bold text-slate-900 block">{a.clientName}</span>
                            <span className="text-slate-600 text-[11px] flex items-center gap-1 font-medium">
                              <MapPin className="w-3 h-3 text-amber-600" />
                              {a.neighborhood}
                            </span>
                          </div>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                            a.status === 'en_camino'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : a.status === 'prendas_en_taller'
                              ? 'bg-blue-100 text-blue-900 border border-blue-300'
                              : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          }`}>
                            {a.status.replace(/_/g, ' ')}
                          </span>
                        </div>

                        <div className="pt-2 border-t border-slate-200 flex justify-between text-[11px]">
                          <span className="text-slate-600 font-medium">Sastre: {assigned.name.split(' ')[1]} ({assigned.vehicle.model})</span>
                          <span className="font-mono text-slate-900 font-bold">${a.totalEstimate.toLocaleString('es-CO')}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Fleet Readiness status */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-2 shadow-2xs">
                <span className="font-bold text-slate-900 block">Salud de la Flota Móvil:</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Todos los sastres activos cuentan con SOAT vigente, certificado judicial limpio e instrumental homologado. Cero incidencias reportadas hoy.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GESTIÓN DE USUARIOS Y ROLES (ACTIVACIÓN, BLOQUEO Y ANTECEDENTES) */}
      {activeTab === 'usuarios_roles' && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-slate-900 tracking-wide">
                Directorio, Verificación de Antecedentes & Activación de Sastres
              </h3>
              <p className="text-xs text-slate-500">
                Audite documentos de identidad, RUT DIAN, antecedentes de la Policía Nacional e inspección de vehículos.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={() => setTailorFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold ${
                  tailorFilter === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Todos ({tailors.length})
              </button>
              <button
                onClick={() => setTailorFilter('verified')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold ${
                  tailorFilter === 'verified' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Activos Aprobados ({tailors.filter(t => t.verified).length})
              </button>
              <button
                onClick={() => setTailorFilter('pending')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold ${
                  tailorFilter === 'pending' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Postulantes Pendientes ({tailors.filter(t => !t.verified).length})
              </button>
            </div>
          </div>

          {/* Tailors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {filteredTailors.map(tailor => (
              <div key={tailor.id} className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 font-serif font-bold flex items-center justify-center text-lg border border-amber-300">
                      {tailor.avatar}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{tailor.name}</h4>
                      <p className="text-xs text-slate-500">{tailor.experienceYears} años de experiencia en Bogotá</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    tailor.verified ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}>
                    {tailor.verified ? 'Aprobado & Activo' : 'Postulante en Revisión'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block font-semibold">Vehículo:</span>
                    <span className="text-slate-900 font-semibold">{tailor.vehicle.brand} {tailor.vehicle.model}</span>
                    <span className="text-[10px] text-amber-800 font-mono font-bold block">Placa: {tailor.vehicle.plate}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 block font-semibold">Antecedentes Judiciales:</span>
                    <span className="text-emerald-700 font-bold block flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Limpio (Policía)
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">RUT DIAN: Aprobado</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedTailorDossier(tailor)}
                    className="text-amber-800 hover:text-amber-900 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver Expediente Completo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleTailorStatus(tailor.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                      tailor.verified
                        ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-300'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    }`}
                  >
                    {tailor.verified ? (
                      <>
                        <Lock className="w-3 h-3" />
                        <span>Bloquear / Suspender</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-3 h-3" />
                        <span>Aprobar y Activar Sastre</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Dossier Modal Inspection */}
          {selectedTailorDossier && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="max-w-2xl w-full bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-serif font-bold flex items-center justify-center border border-amber-300">
                      {selectedTailorDossier.avatar}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{selectedTailorDossier.name}</h4>
                      <p className="text-xs text-slate-500">Expediente Oficial de Verificación</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedTailorDossier(null)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 bg-slate-100 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 text-xs text-slate-700">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block">Dictamen de Seguridad & Antecedentes:</span>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      {selectedTailorDossier.documents.observacionesSeguridad}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block">Vehículo Particular de Trabajo:</span>
                    <p className="text-slate-700 font-medium">
                      {selectedTailorDossier.vehicle.brand} {selectedTailorDossier.vehicle.model} {selectedTailorDossier.vehicle.year} · Placa {selectedTailorDossier.vehicle.plate} ({selectedTailorDossier.vehicle.color})
                    </p>
                    <p className="text-emerald-700 font-mono text-[11px] font-bold">SOAT Vigente hasta: {selectedTailorDossier.vehicle.soatExpiry}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block">Cuenta Bancaria para Dispersión:</span>
                    <p className="text-slate-800 font-mono font-medium">
                      {selectedTailorDossier.bankAccount.type} · No. {selectedTailorDossier.bankAccount.number}
                    </p>
                    <p className="text-slate-500 text-[11px]">Titular: {selectedTailorDossier.bankAccount.holderName} ({selectedTailorDossier.bankAccount.documentId})</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-900 block">Obras en Portafolio Técnico:</span>
                    {selectedTailorDossier.portfolio.map(p => (
                      <div key={p.id} className="pt-1 text-slate-600 font-medium">
                        <strong className="text-slate-900">• {p.title}</strong>: {p.technique} ({p.fabric})
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setSelectedTailorDossier(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    Cerrar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onToggleTailorStatus(selectedTailorDossier.id);
                      setSelectedTailorDossier(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                  >
                    {selectedTailorDossier.verified ? 'Suspender Acceso' : 'Aprobar y Conectar'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MOTOR DE REGLAS Y COMISIONES */}
      {activeTab === 'motor_comisiones' && (
        <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Percent className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-serif font-bold text-slate-900 tracking-wide">
                Motor de Reglas y Comisiones de la Plataforma
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Configure la retención por servicio para asegurar la rentabilidad neta del negocio desde el primer día.
            </p>
          </div>

          {commissionSavedNotice && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2 shadow-2xs">
              <Check className="w-4 h-4 text-emerald-600" />
              Parámetros de comisión sincronizados en el motor central. Aplicados a todos los servicios en Bogotá.
            </div>
          )}

          <div className="space-y-5 text-xs">
            {/* Base Commission Slider */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900">Porcentaje de Retención Estándar por Servicio (%)</span>
                <span className="font-mono text-xl font-bold text-amber-800">{baseRate}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="35"
                step="1"
                value={baseRate}
                onChange={(e) => setBaseRate(parseInt(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>10% (Tarifa de Entrada)</span>
                <span className="font-bold text-slate-700">20% (Estándar Recomendado)</span>
                <span>35% (Margen Alto)</span>
              </div>
            </div>

            {/* Loyalty Volume discount */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900">Descuento de Comisión por Alto Volumen (&gt;25 citas/mes)</span>
                <span className="font-mono text-sm font-bold text-emerald-700">-{volumeDiscount}% (Queda en {baseRate - volumeDiscount}%)</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Incentiva a los sastres más calificados a priorizar las citas de Atelier Bogotá sobre talleres externos.
              </p>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={volumeDiscount}
                onChange={(e) => setVolumeDiscount(parseInt(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Express surcharge */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900">Sobrecosto Express 24-48 horas</span>
                <span className="font-mono text-sm font-bold text-amber-800">+{expressSurcharge}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                step="5"
                value={expressSurcharge}
                onChange={(e) => setExpressSurcharge(parseInt(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>

            {/* Minimum flat floor */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900">Comisión Mínima Garantizada por Desplazamiento (COP)</span>
                <span className="font-mono text-sm font-bold text-slate-900">${minFee.toLocaleString('es-CO')} COP</span>
              </div>
              <input
                type="number"
                step="5000"
                value={minFee}
                onChange={(e) => setMinFee(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-mono text-xs font-bold focus:border-amber-600 focus:outline-none"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleSaveCommissionRules}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                Guardar Reglas de Comisión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INTEGRACIÓN DE ANALÍTICA PARA PAUTA EXCLUSIVA (META CAPI & GA4) */}
      {activeTab === 'analitica_pauta' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-serif font-bold text-slate-900 tracking-wide">
                Integración de Analítica & API de Conversiones de Meta (CAPI) y Google Analytics 4
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Mida con precisión quirúrgica el retorno publicitario (ROAS) de pautas en Instagram y Facebook dirigidas exclusivamente a estratos 5 y 6 en Rosales, El Chicó, Santa Ana y La Cabrera. Transmisión servidor a servidor sin pérdida de cookies.
            </p>
          </div>

          {testEventTriggered && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">Evento de prueba 'Schedule_VIP_Fitting' emitido con éxito al Graph API de Meta (HTTP 200 OK).</span>
              </div>
              <span className="font-mono text-emerald-800 font-bold">FBTRACE_ID: Ar19_BOG_OK</span>
            </div>
          )}

          {/* Credentials config */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 text-xs">
            <h4 className="font-bold text-slate-900">Credenciales del Servidor CAPI & GA4</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-slate-700 block mb-1 font-semibold">Meta Dataset / Pixel ID</label>
                <input
                  type="text"
                  value={metaPixelId}
                  onChange={(e) => setMetaPixelId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-mono text-xs font-bold focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-700 block mb-1 font-semibold">GA4 Measurement ID</label>
                <input
                  type="text"
                  value={ga4MeasurementId}
                  onChange={(e) => setGa4MeasurementId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-mono text-xs font-bold focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-700 block mb-1 font-semibold">CAPI Server Token (Graph v21.0)</label>
                <input
                  type="password"
                  value={capiAccessToken}
                  onChange={(e) => setCapiAccessToken(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-mono text-xs font-bold focus:border-amber-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleFireTestAnalytics}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Activity className="w-3.5 h-3.5 text-blue-400" />
                <span>Disparar Evento CAPI de Prueba (Servidor a Servidor)</span>
              </button>
            </div>
          </div>

          {/* Postal code geotargeting heat card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 text-xs">
            <h4 className="font-bold text-slate-900">Códigos Postales Bogotá Estratos 5 y 6 (Segmentación Pauta)</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block font-mono">110221</span>
                <span className="text-slate-600 text-[11px] font-medium">Rosales / El Nogal</span>
                <span className="text-[10px] text-emerald-700 block font-bold">ROAS Meta: 4.8x</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block font-mono">110221</span>
                <span className="text-slate-600 text-[11px] font-medium">El Chicó / Cabrera</span>
                <span className="text-[10px] text-emerald-700 block font-bold">ROAS Meta: 5.2x</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block font-mono">110111</span>
                <span className="text-slate-600 text-[11px] font-medium">Santa Ana Oriental</span>
                <span className="text-[10px] text-emerald-700 block font-bold">ROAS Meta: 4.4x</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block font-mono">110121</span>
                <span className="text-slate-600 text-[11px] font-medium">Santa Bárbara Alta</span>
                <span className="text-[10px] text-emerald-700 block font-bold">ROAS Meta: 4.1x</span>
              </div>
            </div>
          </div>

          {/* Real-time Event Stream Table */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 uppercase tracking-wider">
                Registro de Eventos CAPI en Tiempo Real
              </span>
              <span className="text-[11px] font-mono text-emerald-700 font-bold">100% Entregados</span>
            </div>

            <div className="space-y-2">
              {eventLogs.map(log => (
                <div key={log.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 font-mono text-[11px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-700 font-bold">{log.eventName}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-600 font-medium">{log.channel}</span>
                    </div>
                    <span className="text-slate-500">{log.timestamp}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="font-sans font-medium">Zona: {log.zone}</span>
                    <span className="text-slate-900 font-bold">${log.valueCOP.toLocaleString('es-CO')} COP</span>
                  </div>

                  <div className="p-2 rounded bg-white border border-slate-200 text-[10px] text-slate-600 overflow-x-auto">
                    {log.payloadSummary}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
