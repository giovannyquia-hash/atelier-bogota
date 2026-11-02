import React, { useState } from 'react';
import { 
  Scissors, 
  Smartphone, 
  Monitor, 
  Car, 
  ShieldCheck, 
  Layers, 
  Sparkles, 
  MessageSquare, 
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  Ruler,
  Building2
} from 'lucide-react';
import { Navbar, AppViewType } from './components/Navbar';
import { ClientVIPApp } from './components/ClientVIPApp';
import { TailorPartnerApp } from './components/TailorPartnerApp';
import { AdminConsole } from './components/AdminConsole';
import { ProfitabilitySimulator } from './components/ProfitabilitySimulator';
import { WhatsAppPitchExporter } from './components/WhatsAppPitchExporter';
import { DevelopmentRoadmap } from './components/DevelopmentRoadmap';
import { VipUniformsModule } from './components/VipUniformsModule';
import { BespokeSuitsModule } from './components/BespokeSuitsModule';

import { 
  INITIAL_MEASUREMENTS, 
  TAILORS_DATA, 
  INITIAL_APPOINTMENTS, 
  DEFAULT_COMMISSION_RULE 
} from './data/mockData';
import { MeasurementProfile, TailorPartner, Appointment, CommissionRule } from './types';

export default function App() {
  const [activeView, setActiveView] = useState<AppViewType>('client');
  const [mobileFrameMode, setMobileFrameMode] = useState<boolean>(false);

  // Core state
  const [measurements, setMeasurements] = useState<MeasurementProfile>(INITIAL_MEASUREMENTS);
  const [tailors, setTailors] = useState<TailorPartner[]>(TAILORS_DATA);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [activeAppointment, setActiveAppointment] = useState<Appointment>(INITIAL_APPOINTMENTS[0]);
  const [commissionRule, setCommissionRule] = useState<CommissionRule>(DEFAULT_COMMISSION_RULE);

  const activeTailor = tailors.find(t => t.id === activeAppointment.tailorId) || tailors[0];

  const handleToggleTailorStatus = (tailorId: string) => {
    setTailors(prev =>
      prev.map(t => (t.id === tailorId ? { ...t, verified: !t.verified } : t))
    );
  };

  const handleUpdateTailor = (updatedTailor: TailorPartner) => {
    setTailors(prev =>
      prev.map(t => (t.id === updatedTailor.id ? updatedTailor : t))
    );
  };

  const handleUpdateAppointment = (updatedAppt: Appointment) => {
    setActiveAppointment(updatedAppt);
    setAppointments(prev =>
      prev.map(a => (a.id === updatedAppt.id ? updatedAppt : a))
    );
  };

  const handleScheduleBespokeAppointment = (data: {
    suitType: string;
    fabricName: string;
    tailorId: string;
    date: string;
    address: string;
    totalCOP: number;
    notes: string;
  }) => {
    const newAppointment: Appointment = {
      id: `APP-BESPOKE-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: measurements.clientName,
      clientPhone: measurements.phone,
      clientAddress: data.address,
      neighborhood: 'Rosales',
      coordinates: { x: 55, y: 40 },
      dateTime: data.date,
      status: 'sastre_asignado',
      tailorId: data.tailorId,
      items: [
        {
          serviceName: `Confección Bespoke: ${data.suitType}`,
          garmentType: data.fabricName,
          price: data.totalCOP,
          fabricNote: 'Paño de alta gama con cita 01 de toma de medidas a domicilio',
          complexity: 'Alta Sartoría'
        }
      ],
      totalEstimate: data.totalCOP,
      platformFee: Math.round(data.totalCOP * (commissionRule.baseRatePercent / 100)),
      tailorNet: Math.round(data.totalCOP * (1 - (commissionRule.baseRatePercent / 100))),
      paymentMethod: 'Bold Tarjeta Black',
      paymentStatus: 'pendiente',
      notes: data.notes
    };

    setAppointments(prev => [newAppointment, ...prev]);
    setActiveAppointment(newAppointment);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col selection:bg-amber-500/20 selection:text-slate-900 font-sans">
      {/* Top Bar Contract Navbar */}
      <Navbar activeView={activeView} onSelectView={setActiveView} />

      {/* Hero Overview Strip */}
      <section className="relative border-b border-slate-200 bg-white pt-6 pb-5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 tracking-wider">
              <span>ALTA COSTURA ON-DEMAND</span>
              <span>·</span>
              <span>BOGOTÁ VIP</span>
              <span>·</span>
              <span className="text-slate-500 font-medium">ECOSISTEMA UNIFICADO</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-slate-900 tracking-wide">
              Sastrería Sobre Medidas, Arreglos Finos & Dotaciones VIP
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Plataforma integral que conecta a maestros sastres en Bogotá con clientes de altos ingresos, firmas corporativas y residencias exclusivas. Paños Loro Piana y Scabal, cotizador en tiempo real y logística certificada.
            </p>
          </div>

          {/* Quick Ecosystem Segmented Switcher & Mobile Frame Toggle */}
          <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto">
            {/* View switcher buttons */}
            <div className="p-1 rounded-xl bg-slate-100 border border-slate-200 flex flex-wrap items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveView('client')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeView === 'client' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                App Cliente VIP
              </button>
              <button
                type="button"
                onClick={() => setActiveView('bespoke')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  activeView === 'bespoke' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Scissors className="w-3.5 h-3.5 text-amber-600" />
                Trajes sobre Medidas
              </button>
              <button
                type="button"
                onClick={() => setActiveView('uniforms')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  activeView === 'uniforms' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-amber-600" />
                Dotaciones VIP
              </button>
              <button
                type="button"
                onClick={() => setActiveView('tailor')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeView === 'tailor' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                App Sastre
              </button>
              <button
                type="button"
                onClick={() => setActiveView('admin')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeView === 'admin' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Central Web
              </button>
              <button
                type="button"
                onClick={() => setActiveView('simulator')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeView === 'simulator' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Calculadora
              </button>
            </div>

            {/* Mobile frame toggle for testing client or tailor phone ergonomics */}
            {(activeView === 'client' || activeView === 'tailor') && (
              <button
                type="button"
                onClick={() => setMobileFrameMode(!mobileFrameMode)}
                className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 cursor-pointer transition-colors ${
                  mobileFrameMode
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
                title="Alternar entre vista expandida o marco móvil tipo iPhone"
              >
                {mobileFrameMode ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                <span className="hidden sm:inline text-[11px] font-medium">
                  {mobileFrameMode ? 'Ver Pantalla Completa' : 'Simular Móvil'}
                </span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {mobileFrameMode && (activeView === 'client' || activeView === 'tailor') ? (
          /* Mobile Device Frame Simulation */
          <div className="flex justify-center py-4">
            <div className="w-full max-w-[430px] rounded-[48px] bg-slate-800 p-3 border-4 border-slate-300 shadow-2xl relative">
              {/* Dynamic Island Notch */}
              <div className="w-28 h-5 bg-black rounded-full mx-auto mb-3 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 mr-2" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              </div>

              {/* Mobile Content Screen */}
              <div className="rounded-[36px] overflow-hidden bg-[#f8fafc] min-h-[720px] max-h-[820px] overflow-y-auto p-3 border border-slate-200">
                {activeView === 'client' ? (
                  <ClientVIPApp
                    measurements={measurements}
                    onUpdateMeasurements={setMeasurements}
                    activeAppointment={activeAppointment}
                    onUpdateAppointment={handleUpdateAppointment}
                    activeTailor={activeTailor}
                    onNavigateToBespoke={() => setActiveView('bespoke')}
                    onNavigateToUniforms={() => setActiveView('uniforms')}
                  />
                ) : (
                  <TailorPartnerApp
                    tailor={activeTailor}
                    onUpdateTailor={handleUpdateTailor}
                    activeAppointment={activeAppointment}
                    onUpdateAppointment={handleUpdateAppointment}
                  />
                )}
              </div>

              {/* Bottom Home Indicator */}
              <div className="w-32 h-1 bg-slate-400 rounded-full mx-auto mt-2" />
            </div>
          </div>
        ) : (
          /* Full Width Responsive View */
          <>
            {activeView === 'client' && (
              <ClientVIPApp
                measurements={measurements}
                onUpdateMeasurements={setMeasurements}
                activeAppointment={activeAppointment}
                onUpdateAppointment={handleUpdateAppointment}
                activeTailor={activeTailor}
                onNavigateToBespoke={() => setActiveView('bespoke')}
                onNavigateToUniforms={() => setActiveView('uniforms')}
              />
            )}

            {activeView === 'bespoke' && (
              <BespokeSuitsModule
                userMeasurements={measurements}
                availableTailors={tailors}
                onBookFittingAppointment={handleScheduleBespokeAppointment}
                onNavigateToClient={() => setActiveView('client')}
              />
            )}

            {activeView === 'uniforms' && (
              <VipUniformsModule
                onScheduleFitting={(details) => {
                  handleScheduleBespokeAppointment({
                    suitType: 'Dotación Corporativa / Residencial',
                    fabricName: 'Muestrario de Paños Físico en Sede',
                    tailorId: tailors[0].id,
                    date: new Date().toISOString(),
                    address: details.address,
                    totalCOP: 890000 * 4,
                    notes: details.notes
                  });
                }}
                onNavigateToClient={() => setActiveView('client')}
              />
            )}

            {activeView === 'tailor' && (
              <TailorPartnerApp
                tailor={activeTailor}
                onUpdateTailor={handleUpdateTailor}
                activeAppointment={activeAppointment}
                onUpdateAppointment={handleUpdateAppointment}
              />
            )}

            {activeView === 'admin' && (
              <AdminConsole
                tailors={tailors}
                onToggleTailorStatus={handleToggleTailorStatus}
                commissionRule={commissionRule}
                onUpdateCommissionRule={setCommissionRule}
                appointments={appointments}
              />
            )}

            {activeView === 'simulator' && <ProfitabilitySimulator />}

            {activeView === 'roadmap' && <DevelopmentRoadmap />}

            {activeView === 'whatsapp' && <WhatsAppPitchExporter />}
          </>
        )}
      </main>

      {/* Clean Luxury Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-slate-900 tracking-wider">
              ATELIER BOGOTÁ
            </span>
            <span>·</span>
            <span>Alta Costura, Bespoke & Dotaciones VIP a Domicilio</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveView('bespoke')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Trajes sobre Medidas
            </button>
            <button
              onClick={() => setActiveView('uniforms')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Dotaciones VIP
            </button>
            <button
              onClick={() => setActiveView('roadmap')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Hitos de Entrega
            </button>
            <button
              onClick={() => setActiveView('simulator')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Unit Economics
            </button>
            <button
              onClick={() => setActiveView('whatsapp')}
              className="hover:text-amber-800 transition-colors cursor-pointer text-amber-700 font-semibold"
            >
              Copiar para WhatsApp
            </button>
          </div>

          <div>
            <span>Bogotá D.C., Colombia · Cobertura Rosales, Chicó & Santa Ana</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
