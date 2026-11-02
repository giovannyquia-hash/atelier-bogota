import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  Truck, 
  Calendar, 
  FileText, 
  Scissors, 
  Layers, 
  ArrowRight, 
  BadgePercent, 
  HelpCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  Download,
  Share2,
  X
} from 'lucide-react';
import { UNIFORM_PACKAGES } from '../data/bespokeAndUniformsData';
import { UniformCategory, UniformPackage } from '../types';

interface VipUniformsModuleProps {
  onScheduleFitting?: (details: { address: string; date: string; notes: string }) => void;
  onNavigateToClient?: () => void;
}

export const VipUniformsModule: React.FC<VipUniformsModuleProps> = ({ 
  onScheduleFitting,
  onNavigateToClient 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<UniformCategory | 'all'>('all');
  const [selectedPackageId, setSelectedPackageId] = useState<string>(UNIFORM_PACKAGES[0].id);
  
  // Cotizador state
  const [collaboratorsCount, setCollaboratorsCount] = useState<number>(12);
  const [includeEmbroideredLogo, setIncludeEmbroideredLogo] = useState<boolean>(true);
  const [includeIndividualMonogram, setIncludeIndividualMonogram] = useState<boolean>(true);
  const [includeCustomButtons, setIncludeCustomButtons] = useState<boolean>(false);
  const [includeOnSiteMeasurement, setIncludeOnSiteMeasurement] = useState<boolean>(true);
  const [expressDelivery, setExpressDelivery] = useState<boolean>(false);
  
  // Corporate client details
  const [companyName, setCompanyName] = useState<string>('Reserva del Chicó - Consejo de Administración');
  const [contactName, setContactName] = useState<string>('Dra. Marcela Echeverri');
  const [contactPhone, setContactPhone] = useState<string>('+57 312 908 4421');
  const [contactEmail, setContactEmail] = useState<string>('administracion@reservadelchico.com');
  const [addressZone, setAddressZone] = useState<string>('Chicó Reservado - Carrera 7 con Calle 94, Bogotá');
  const [quoteNotes, setQuoteNotes] = useState<string>('Requerimos uniformidad para 6 recepcionistas diurnos y 6 de nocturno con toma de medidas en el lobby.');
  
  // Modal states
  const [showQuoteModal, setShowQuoteModal] = useState<boolean>(false);
  const [showSampleKitSuccess, setShowSampleKitSuccess] = useState<boolean>(false);

  const activePackage = UNIFORM_PACKAGES.find(p => p.id === selectedPackageId) || UNIFORM_PACKAGES[0];

  const filteredPackages = selectedCategory === 'all' 
    ? UNIFORM_PACKAGES 
    : UNIFORM_PACKAGES.filter(p => p.category === selectedCategory);

  // Volume discount rules
  const getDiscountPercent = (count: number): number => {
    if (count >= 50) return 0.22; // 22%
    if (count >= 25) return 0.15; // 15%
    if (count >= 10) return 0.08; // 8%
    return 0;
  };

  const discountRate = getDiscountPercent(collaboratorsCount);
  const baseSubtotal = activePackage.basePricePerColaborador * collaboratorsCount;
  const volumeDiscountAmount = baseSubtotal * discountRate;

  // Personalization costs
  const logoEmbroideryCost = includeEmbroideredLogo ? (22000 * collaboratorsCount) : 0;
  const monogramCost = includeIndividualMonogram ? (15000 * collaboratorsCount) : 0;
  const customButtonsCost = includeCustomButtons ? (28000 * collaboratorsCount) : 0;
  const measurementVisitCost = includeOnSiteMeasurement ? (collaboratorsCount >= 10 ? 0 : 120000) : 0;
  
  const personalizationsTotal = logoEmbroideryCost + monogramCost + customButtonsCost + measurementVisitCost;
  
  const netBeforeExpress = (baseSubtotal - volumeDiscountAmount) + personalizationsTotal;
  const expressSurcharge = expressDelivery ? (netBeforeExpress * 0.15) : 0;
  const subtotalNeto = netBeforeExpress + expressSurcharge;
  const ivaEstimado = subtotalNeto * 0.19;
  const totalGeneralCOP = subtotalNeto + ivaEstimado;

  const handleRequestSampleKit = () => {
    setShowSampleKitSuccess(true);
    if (onScheduleFitting) {
      onScheduleFitting({
        address: addressZone,
        date: 'Próximo Martes 10:00 AM',
        notes: `Valija de Muestras y Telas Físicas para ${companyName} (${collaboratorsCount} personas - ${activePackage.title})`
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Hero Banner Luxury */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-amber-800 uppercase mb-3">
                <Building2 className="w-4 h-4 text-amber-700" />
                <span>División Corporativa & Dotaciones Institucionales VIP</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Dotaciones Sartoriales de Alto Nivel para Bogotá
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                Elevamos la presencia de condominios campestres, conserjerías de lujo, esquemas diplomáticos y comités directivos. Prendas con patrón individual, tejidos técnicos antimanchas de alta durabilidad y servicio de sastre a domicilio para toma de medidas en sus instalaciones.
              </p>
              
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1.5 bg-slate-100 text-slate-800 px-3 py-1.5 rounded-md border border-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Patronaje Individual por Colaborador
                </span>
                <span className="flex items-center gap-1.5 bg-slate-100 text-slate-800 px-3 py-1.5 rounded-md border border-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  Tratamiento Teflon Dupont Antimanchas
                </span>
                <span className="flex items-center gap-1.5 bg-slate-100 text-slate-800 px-3 py-1.5 rounded-md border border-slate-200">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                  Valija de Muestras Física en tu Oficina
                </span>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-6 lg:max-w-sm shrink-0 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Servicio Especializado
                </span>
                <span className="text-xs px-2 py-0.5 bg-amber-200 text-amber-900 font-semibold rounded">
                  Bogotá & Sabana
                </span>
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-lg">
                ¿Deseas tocar las telas antes de decidir?
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Despachamos un Maestro Sastre con el catálogo físico de paños nacionales e importados y tallero completo a su edificio o sede corporativa.
              </p>
              <button
                onClick={handleRequestSampleKit}
                className="mt-4 w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <Scissors className="w-3.5 h-3.5 text-amber-400" />
                Agendar Visita de Muestrario
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation Pills */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 flex-wrap gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              Todos los Sectores
            </button>
            <button
              onClick={() => setSelectedCategory('residential_concierge')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'residential_concierge'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              Conserjería & Edificios VIP
            </button>
            <button
              onClick={() => setSelectedCategory('diplomatic_drivers')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'diplomatic_drivers'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              Choferes & Seguridad Diplomática
            </button>
            <button
              onClick={() => setSelectedCategory('hospitality_luxury')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'hospitality_luxury'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              Hotelería & Fine Dining
            </button>
            <button
              onClick={() => setSelectedCategory('executive_corporate')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'executive_corporate'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              C-Suite & Equipos Directivos
            </button>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Mostrando {filteredPackages.length} paquetes sartoriales especializados
          </div>
        </div>
      </div>

      {/* Main Grid: Packages List + Live Quotation Engine */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Packages Catalog Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl font-serif font-bold text-slate-900">
              Líneas de Dotación Sartorial Disponibles
            </h2>

            <div className="space-y-5">
              {filteredPackages.map((pkg) => {
                const isSelected = pkg.id === selectedPackageId;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`bg-white rounded-xl border p-6 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-600 shadow-md ring-1 ring-amber-500/20'
                        : 'border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                            {pkg.highlightBadge}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            Sector: {pkg.targetSector}
                          </span>
                        </div>
                        <h3 className="text-lg font-serif font-bold text-slate-900">
                          {pkg.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5 font-medium">
                          {pkg.subtitle}
                        </p>
                      </div>

                      <div className="text-left sm:text-right shrink-0 bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-lg">
                        <span className="text-[11px] text-slate-500 block uppercase font-medium">
                          Inversión por colaborador
                        </span>
                        <span className="text-xl font-serif font-bold text-slate-900">
                          ${(pkg.basePricePerColaborador).toLocaleString('es-CO')}
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          COP + IVA
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                      {pkg.description}
                    </p>

                    {/* Garments Breakdown */}
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
                        Prendas Incluidas en el Set Básico:
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                        {pkg.includedGarments.map((garment, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                            <span>{garment}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technical Fabric Specs Box */}
                    <div className="mt-4 bg-slate-50 rounded-lg p-3 text-xs text-slate-600 grid grid-cols-1 sm:grid-cols-2 gap-2 border border-slate-200">
                      <div>
                        <span className="font-semibold text-slate-800">Tejido:</span> {pkg.fabricSpecs.material}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800">Resistencia:</span> {pkg.fabricSpecs.durability}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800">Tratamiento:</span> {pkg.fabricSpecs.treatment}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800">Tiempo de entrega:</span> {pkg.turnaroundDays} días hábiles
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between pt-2">
                      <span className="text-xs text-slate-500 font-medium">
                        Pedido mínimo: {pkg.minOrderQuantity} unidades
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPackageId(pkg.id);
                        }}
                        className={`text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-amber-700 text-white hover:bg-amber-800'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {isSelected ? '✓ Paquete Seleccionado' : 'Configurar este Paquete'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quality Standard Info Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h3 className="font-serif font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                <Scissors className="w-4 h-4 text-amber-700" />
                Garantía de Sastrería Atelier Bogotá para Empresas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
                <div className="border-l-2 border-amber-600 pl-3">
                  <h4 className="font-bold text-slate-900">Reposición 24 Meses</h4>
                  <p className="mt-1">
                    Guardamos los lotes de tinte y patrones digitales para reponer prendas de nuevos ingresos con exactitud cromática.
                  </p>
                </div>
                <div className="border-l-2 border-slate-300 pl-3">
                  <h4 className="font-bold text-slate-900">Ajuste Post-Entrega</h4>
                  <p className="mt-1">
                    Incluye una ronda gratuita de afinación milimétrica por sastre en caso de variaciones de peso o calce.
                  </p>
                </div>
                <div className="border-l-2 border-slate-300 pl-3">
                  <h4 className="font-bold text-slate-900">Facturación Corporativa</h4>
                  <p className="mt-1">
                    Factura electrónica DIAN, certificado parafiscal y cumplimiento estricto de estándares laborales colombianos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Quotation Engine Column (5 cols) */}
          <div className="lg:col-span-5 sticky top-20">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="border-b border-slate-200 pb-4 mb-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Cotizador en Tiempo Real
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                    Tarifas 2026 Vigentes
                  </span>
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900 mt-1">
                  {activePackage.title}
                </h3>
                <p className="text-xs text-slate-500">
                  Calculado para entrega con toma de medidas personalizada en Bogotá.
                </p>
              </div>

              {/* Volume Slider & Counter */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <label className="font-semibold text-slate-900 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-500" />
                      Número de Colaboradores:
                    </label>
                    <span className="font-bold text-amber-800 text-sm">
                      {collaboratorsCount} personas
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={activePackage.minOrderQuantity}
                      max="100"
                      value={collaboratorsCount}
                      onChange={(e) => setCollaboratorsCount(parseInt(e.target.value) || activePackage.minOrderQuantity)}
                      className="w-full accent-amber-700 h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <input
                      type="number"
                      min={activePackage.minOrderQuantity}
                      max="500"
                      value={collaboratorsCount}
                      onChange={(e) => setCollaboratorsCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 px-2 py-1 text-center font-bold text-xs border border-slate-300 rounded-md text-slate-900"
                    />
                  </div>

                  {/* Volume Discount Indicator */}
                  <div className="mt-2.5 flex items-center justify-between text-[11px] bg-slate-50 p-2 rounded border border-slate-200">
                    <span className="flex items-center gap-1 text-slate-600">
                      <BadgePercent className="w-3.5 h-3.5 text-amber-700" />
                      Descuento por volumen aplicado:
                    </span>
                    <span className="font-bold text-emerald-700">
                      {discountRate > 0 ? `${(discountRate * 100).toFixed(0)}% OFF` : 'Precio base unitario'}
                    </span>
                  </div>
                  {discountRate === 0 && (
                    <p className="text-[10px] text-slate-500 mt-1 italic">
                      * Aplica 8% de descuento a partir de 10 colaboradores (15% para 25+, 22% para 50+).
                    </p>
                  )}
                </div>

                {/* Personalization Options Toggles */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Personalizaciones & Acabados:
                  </h4>

                  <label className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={includeEmbroideredLogo}
                        onChange={(e) => setIncludeEmbroideredLogo(e.target.checked)}
                        className="rounded text-amber-700 focus:ring-amber-600 h-4 w-4"
                      />
                      <div>
                        <span className="font-medium text-slate-900 block">Bordado Computarizado de Escudo/Logo</span>
                        <span className="text-[10px] text-slate-500">Hilo metalizado o color pantone institucional</span>
                      </div>
                    </div>
                    <span className="font-semibold text-slate-700 whitespace-nowrap">
                      +$22.000 / c.u.
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={includeIndividualMonogram}
                        onChange={(e) => setIncludeIndividualMonogram(e.target.checked)}
                        className="rounded text-amber-700 focus:ring-amber-600 h-4 w-4"
                      />
                      <div>
                        <span className="font-medium text-slate-900 block">Monograma de Nombre Individual</span>
                        <span className="text-[10px] text-slate-500">Bordado fino en pecho o manga por colaborador</span>
                      </div>
                    </div>
                    <span className="font-semibold text-slate-700 whitespace-nowrap">
                      +$15.000 / c.u.
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={includeCustomButtons}
                        onChange={(e) => setIncludeCustomButtons(e.target.checked)}
                        className="rounded text-amber-700 focus:ring-amber-600 h-4 w-4"
                      />
                      <div>
                        <span className="font-medium text-slate-900 block">Botones Grabados con Láser</span>
                        <span className="text-[10px] text-slate-500">En resina vegetal o metal con siglas del edificio/empresa</span>
                      </div>
                    </div>
                    <span className="font-semibold text-slate-700 whitespace-nowrap">
                      +$28.000 / c.u.
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={includeOnSiteMeasurement}
                        onChange={(e) => setIncludeOnSiteMeasurement(e.target.checked)}
                        className="rounded text-amber-700 focus:ring-amber-600 h-4 w-4"
                      />
                      <div>
                        <span className="font-medium text-slate-900 block">Visita Sastre Medición In Situ</span>
                        <span className="text-[10px] text-slate-500">
                          {collaboratorsCount >= 10 ? 'Cortesía de la casa (>= 10 personas)' : 'Tarifa fija desplazamiento y toma individual'}
                        </span>
                      </div>
                    </div>
                    <span className="font-semibold text-slate-700 whitespace-nowrap">
                      {collaboratorsCount >= 10 ? 'GRATIS' : '+$120.000'}
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={expressDelivery}
                        onChange={(e) => setExpressDelivery(e.target.checked)}
                        className="rounded text-amber-700 focus:ring-amber-600 h-4 w-4"
                      />
                      <div>
                        <span className="font-medium text-slate-900 block">Entrega Express Prioritaria</span>
                        <span className="text-[10px] text-slate-500">Despacho garantizado en 8 días hábiles</span>
                      </div>
                    </div>
                    <span className="font-semibold text-slate-700 whitespace-nowrap">
                      +15%
                    </span>
                  </label>
                </div>

                {/* Financial Summary */}
                <div className="pt-4 border-t border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal Prendas ({collaboratorsCount} colab.):</span>
                    <span className="font-medium">${baseSubtotal.toLocaleString('es-CO')} COP</span>
                  </div>

                  {volumeDiscountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Descuento de Escala (-{(discountRate * 100).toFixed(0)}%):</span>
                      <span>-${volumeDiscountAmount.toLocaleString('es-CO')} COP</span>
                    </div>
                  )}

                  {personalizationsTotal > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>Personalizaciones & Bordados:</span>
                      <span className="font-medium">+${personalizationsTotal.toLocaleString('es-CO')} COP</span>
                    </div>
                  )}

                  {expressSurcharge > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>Recargo Confección Express:</span>
                      <span className="font-medium">+${expressSurcharge.toLocaleString('es-CO')} COP</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>IVA (19% Factura Legal DIAN):</span>
                    <span>+${ivaEstimado.toLocaleString('es-CO')} COP</span>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                    <span className="font-serif font-bold text-slate-900 text-sm">
                      Total Inversión Proyectada:
                    </span>
                    <div className="text-right">
                      <span className="text-xl font-serif font-bold text-slate-900 block">
                        ${totalGeneralCOP.toLocaleString('es-CO')}
                      </span>
                      <span className="text-[10px] text-slate-500 font-normal">
                        ≈ ${(totalGeneralCOP / collaboratorsCount).toLocaleString('es-CO', { maximumFractionDigits: 0 })} COP / persona
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="pt-4 space-y-2.5">
                  <button
                    onClick={() => setShowQuoteModal(true)}
                    className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  >
                    <FileText className="w-4 h-4 text-amber-400" />
                    Generar Cotización Formal (PDF / Imprimir)
                  </button>

                  <button
                    onClick={handleRequestSampleKit}
                    className="w-full py-2.5 px-4 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Truck className="w-4 h-4 text-amber-700" />
                    Solicitar Valija de Muestras y Telas a Domicilio
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Official Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8">
            <button
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Document Header */}
            <div className="border-b border-slate-200 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-serif font-bold tracking-widest text-slate-900 uppercase">
                  ATELIER BOGOTÁ • DIVISIÓN CORPORATIVA
                </span>
                <h3 className="text-xl font-serif font-bold text-slate-900 mt-1">
                  Cotización Formal de Dotaciones VIP
                </h3>
                <p className="text-xs text-slate-500">
                  Documento Ref: COT-DOT-{Math.floor(100000 + Math.random() * 900000)} • Válido por 15 días calendario
                </p>
              </div>

              <div className="text-right text-xs text-slate-600 shrink-0">
                <span className="font-semibold block text-slate-900">Fecha de Emisión:</span>
                <span>{new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>

            {/* Client Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
              <div>
                <span className="text-slate-500 block uppercase font-medium text-[10px]">Cliente / Razón Social:</span>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full mt-1 font-semibold text-slate-900 bg-white px-2 py-1 border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <span className="text-slate-500 block uppercase font-medium text-[10px]">Atención a:</span>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full mt-1 font-semibold text-slate-900 bg-white px-2 py-1 border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <span className="text-slate-500 block uppercase font-medium text-[10px]">Teléfono de Contacto:</span>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full mt-1 text-slate-800 bg-white px-2 py-1 border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <span className="text-slate-500 block uppercase font-medium text-[10px]">Ubicación en Bogotá:</span>
                <input
                  type="text"
                  value={addressZone}
                  onChange={(e) => setAddressZone(e.target.value)}
                  className="w-full mt-1 text-slate-800 bg-white px-2 py-1 border border-slate-300 rounded text-xs"
                />
              </div>
            </div>

            {/* Items Breakdown Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Concepto / Especificación</th>
                    <th className="py-2.5 px-3 text-center">Cant.</th>
                    <th className="py-2.5 px-3 text-right">V. Unitario</th>
                    <th className="py-2.5 px-3 text-right">Total (COP)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-2.5 px-3">
                      <span className="font-semibold text-slate-900 block">{activePackage.title}</span>
                      <span className="text-[11px] text-slate-500">{activePackage.fabricSpecs.material} • {activePackage.fabricSpecs.treatment}</span>
                    </td>
                    <td className="py-2.5 px-3 text-center font-semibold">{collaboratorsCount}</td>
                    <td className="py-2.5 px-3 text-right">${activePackage.basePricePerColaborador.toLocaleString('es-CO')}</td>
                    <td className="py-2.5 px-3 text-right font-semibold">${baseSubtotal.toLocaleString('es-CO')}</td>
                  </tr>

                  {discountRate > 0 && (
                    <tr className="text-emerald-700 bg-emerald-50/50">
                      <td className="py-2 px-3">Descuento Institucional por Escala de Volumen ({(discountRate * 100).toFixed(0)}%)</td>
                      <td className="py-2 px-3 text-center">-</td>
                      <td className="py-2 px-3 text-right">-</td>
                      <td className="py-2 px-3 text-right font-semibold">-${volumeDiscountAmount.toLocaleString('es-CO')}</td>
                    </tr>
                  )}

                  {includeEmbroideredLogo && (
                    <tr>
                      <td className="py-2 px-3">Bordado Computarizado de Escudo/Logotipo Corporativo</td>
                      <td className="py-2 px-3 text-center">{collaboratorsCount}</td>
                      <td className="py-2 px-3 text-right">$22.000</td>
                      <td className="py-2 px-3 text-right">${logoEmbroideryCost.toLocaleString('es-CO')}</td>
                    </tr>
                  )}

                  {includeIndividualMonogram && (
                    <tr>
                      <td className="py-2 px-3">Monograma Individual de Nombre por Colaborador</td>
                      <td className="py-2 px-3 text-center">{collaboratorsCount}</td>
                      <td className="py-2 px-3 text-right">$15.000</td>
                      <td className="py-2 px-3 text-right">${monogramCost.toLocaleString('es-CO')}</td>
                    </tr>
                  )}

                  {includeCustomButtons && (
                    <tr>
                      <td className="py-2 px-3">Set de Botones Grabados con Láser Personalizados</td>
                      <td className="py-2 px-3 text-center">{collaboratorsCount}</td>
                      <td className="py-2 px-3 text-right">$28.000</td>
                      <td className="py-2 px-3 text-right">${customButtonsCost.toLocaleString('es-CO')}</td>
                    </tr>
                  )}

                  {includeOnSiteMeasurement && (
                    <tr>
                      <td className="py-2 px-3">Jornada de Toma de Medidas In Situ por Maestro Sastre</td>
                      <td className="py-2 px-3 text-center">1 sesión</td>
                      <td className="py-2 px-3 text-right">{collaboratorsCount >= 10 ? 'Cortesía' : '$120.000'}</td>
                      <td className="py-2 px-3 text-right font-semibold">{collaboratorsCount >= 10 ? '$0' : '$120.000'}</td>
                    </tr>
                  )}
                </tbody>
                <tfoot className="bg-slate-50 border-t border-slate-200 font-semibold text-slate-900">
                  <tr>
                    <td colSpan={3} className="py-2 px-3 text-right">Subtotal Neto:</td>
                    <td className="py-2 px-3 text-right">${subtotalNeto.toLocaleString('es-CO')}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="py-2 px-3 text-right text-slate-500 font-normal">IVA (19%):</td>
                    <td className="py-2 px-3 text-right text-slate-500 font-normal">${ivaEstimado.toLocaleString('es-CO')}</td>
                  </tr>
                  <tr className="text-sm bg-slate-100">
                    <td colSpan={3} className="py-3 px-3 text-right font-serif font-bold">TOTAL GENERAL (COP):</td>
                    <td className="py-3 px-3 text-right font-serif font-bold text-amber-800">${totalGeneralCOP.toLocaleString('es-CO')}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-[11px] text-slate-500">
                Condiciones de pago: 50% anticipo al corte / 50% contra entrega a satisfacción con acta.
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  Descargar / Imprimir
                </button>
                <button
                  onClick={() => {
                    setShowQuoteModal(false);
                    handleRequestSampleKit();
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  Confirmar y Agendar Muestras
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sample Kit Toast / Modal Success */}
      {showSampleKitSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-emerald-300 rounded-xl p-4 shadow-xl max-w-md animate-fade-in">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <h4 className="font-bold text-slate-900">
                ¡Solicitud de Valija de Muestras Confirmada!
              </h4>
              <p className="text-slate-600 mt-1">
                Hemos asignado al Maestro Sastre para coordinar la visita a <strong>{addressZone}</strong> con el muestrario físico de telas para {companyName}.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => setShowSampleKitSuccess(false)}
                  className="px-3 py-1 bg-slate-900 text-white text-xs font-semibold rounded-md hover:bg-slate-800"
                >
                  Entendido
                </button>
                {onNavigateToClient && (
                  <button
                    onClick={() => {
                      setShowSampleKitSuccess(false);
                      onNavigateToClient();
                    }}
                    className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-semibold rounded-md hover:bg-slate-200"
                  >
                    Ver en Mi Portal
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
