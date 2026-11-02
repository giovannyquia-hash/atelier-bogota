import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, PieChart, ShieldCheck, CheckCircle, Info } from 'lucide-react';

export const ProfitabilitySimulator: React.FC = () => {
  // Simulator parameters
  const [monthlyOrders, setMonthlyOrders] = useState<number>(120);
  const [averageTicketCOP, setAverageTicketCOP] = useState<number>(260000);
  const [commissionRate, setCommissionRate] = useState<number>(20);
  const [tailorsCount, setTailorsCount] = useState<number>(4);
  const [cacMetaAdsCOP, setCacMetaAdsCOP] = useState<number>(38000); // Cost per acquisition via Meta Ads
  const [gatewayFeePercent, setGatewayFeePercent] = useState<number>(2.9); // Bold/ePayco fee
  const [cloudInfraCOP, setCloudInfraCOP] = useState<number>(850000); // Fixed monthly infra

  // Calculations
  const grossGMV = monthlyOrders * averageTicketCOP;
  const platformGrossCommission = grossGMV * (commissionRate / 100);
  const totalTailorsGross = grossGMV - platformGrossCommission;
  const averageIncomePerTailor = Math.round(totalTailorsGross / tailorsCount);

  // Platform Costs
  const totalGatewayCost = grossGMV * (gatewayFeePercent / 100) + monthlyOrders * 900;
  const totalMetaAdsCost = monthlyOrders * cacMetaAdsCOP;
  const totalPlatformOperatingCost = totalGatewayCost + totalMetaAdsCost + cloudInfraCOP;

  // Platform Net Profit
  const netPlatformProfit = platformGrossCommission - totalPlatformOperatingCost;
  const netPlatformMargin = grossGMV > 0 ? ((netPlatformProfit / grossGMV) * 100).toFixed(1) : '0';

  // Break-even orders
  const contributionMarginPerOrder = averageTicketCOP * (commissionRate / 100) - cacMetaAdsCOP - (averageTicketCOP * (gatewayFeePercent / 100) + 900);
  const breakEvenOrders = contributionMarginPerOrder > 0 ? Math.ceil(cloudInfraCOP / contributionMarginPerOrder) : 0;

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-slate-900">
      {/* Title & Context */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <Calculator className="w-6 h-6 text-amber-600" />
          <h2 className="text-xl font-serif font-bold text-slate-900 tracking-wide">
            Calculadora de Rentabilidad & Comisión Ideal (Día 1)
          </h2>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          Diseñada para sustentar la viabilidad económica del proyecto ante socios o inversionistas en Bogotá. Demuestra cómo una comisión del 20% genera un negocio rentable desde el primer mes bajo el modelo "Asset-Light" (sin flota propia ni arriendos de locales).
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
            <span>Variables del Negocio</span>
            <span className="text-[10px] text-amber-800 font-mono font-bold bg-amber-100 px-2 py-0.5 rounded border border-amber-300">Modificar en Vivo</span>
          </h3>

          {/* Orders per month */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between font-medium">
              <span className="text-slate-600">Citas a Domicilio / Mes:</span>
              <span className="font-mono text-slate-900 font-bold">{monthlyOrders} citas (~{Math.round(monthlyOrders / 30)}/día)</span>
            </div>
            <input
              type="range"
              min="30"
              max="500"
              step="10"
              value={monthlyOrders}
              onChange={(e) => setMonthlyOrders(parseInt(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          {/* Average Ticket */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between font-medium">
              <span className="text-slate-600">Ticket Promedio por Visita:</span>
              <span className="font-mono text-amber-800 font-bold">${averageTicketCOP.toLocaleString('es-CO')} COP</span>
            </div>
            <input
              type="range"
              min="120000"
              max="650000"
              step="10000"
              value={averageTicketCOP}
              onChange={(e) => setAverageTicketCOP(parseInt(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-medium">
              <span>$120k (1 basta)</span>
              <span>$260k (Saco + pantalón)</span>
              <span>$650k (Gala / Smoking)</span>
            </div>
          </div>

          {/* Commission Rate */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between font-medium">
              <span className="text-slate-600">Comisión de la Plataforma (%):</span>
              <span className="font-mono text-emerald-700 font-bold">{commissionRate}%</span>
            </div>
            <input
              type="range"
              min="12"
              max="30"
              step="1"
              value={commissionRate}
              onChange={(e) => setCommissionRate(parseInt(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Number of Tailors in fleet */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between font-medium">
              <span className="text-slate-600">Sastres Activos en Patrulla:</span>
              <span className="font-mono text-slate-900 font-bold">{tailorsCount} maestros</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="1"
              value={tailorsCount}
              onChange={(e) => setTailorsCount(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Meta Ads CAC */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between font-medium">
              <span className="text-slate-600">CAC Meta Ads por Cliente VIP:</span>
              <span className="font-mono text-slate-900 font-bold">${cacMetaAdsCOP.toLocaleString('es-CO')} COP</span>
            </div>
            <input
              type="range"
              min="15000"
              max="80000"
              step="5000"
              value={cacMetaAdsCOP}
              onChange={(e) => setCacMetaAdsCOP(parseInt(e.target.value))}
              className="w-full accent-slate-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Results & Economic Breakdown Column (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Platform Gross Commission */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <span className="text-xs text-slate-500 font-semibold">Ingreso Bruto Plataforma ({commissionRate}%)</span>
              <div className="text-xl font-serif font-bold text-amber-800 font-mono">
                ${platformGrossCommission.toLocaleString('es-CO')}
              </div>
              <p className="text-[11px] text-slate-500 font-medium">De un GMV total de ${grossGMV.toLocaleString('es-CO')}</p>
            </div>

            {/* Net Operating Profit */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
              <span className="text-xs text-slate-500 font-semibold">Utilidad Neta Mensual Estimada</span>
              <div className={`text-xl font-serif font-bold font-mono ${netPlatformProfit >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                ${netPlatformProfit.toLocaleString('es-CO')}
              </div>
              <p className="text-[11px] text-emerald-700 font-medium">Margen neto operativo: {netPlatformMargin}%</p>
            </div>
          </div>

          {/* Tailor Value Proposition KPI */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Ingreso Promedio por Sastre al Mes:</span>
              <span className="text-lg font-serif font-bold text-amber-900 font-mono">
                ${averageIncomePerTailor.toLocaleString('es-CO')} COP
              </span>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
              Un sastre tradicional en taller gana en promedio $1.6M a $2.2M COP con jornadas de 10 horas. Con este modelo en Rosales/Chicó gana <strong className="text-slate-900">~${averageIncomePerTailor.toLocaleString('es-CO')} COP</strong> atendiendo ~{Math.round(monthlyOrders / tailorsCount)} clientes al mes en su propio vehículo.
            </p>
          </div>

          {/* Unit Cost Breakdown Table */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2 text-xs">
            <h4 className="font-bold text-slate-900">Estructura Mensual de Gastos Operativos</h4>
            <div className="space-y-1.5 divide-y divide-slate-100">
              <div className="flex justify-between pt-1 text-slate-600 font-medium">
                <span>Inversión Pauta Meta CAPI (Adquisición clientes):</span>
                <span className="font-mono text-slate-900 font-bold">${totalMetaAdsCost.toLocaleString('es-CO')} COP</span>
              </div>
              <div className="flex justify-between pt-1 text-slate-600 font-medium">
                <span>Comisión Pasarela (Bold/ePayco ~{gatewayFeePercent}%):</span>
                <span className="font-mono text-slate-900 font-bold">${Math.round(totalGatewayCost).toLocaleString('es-CO')} COP</span>
              </div>
              <div className="flex justify-between pt-1 text-slate-600 font-medium">
                <span>Infraestructura Cloud, Google Maps APIs & Hosting:</span>
                <span className="font-mono text-slate-900 font-bold">${cloudInfraCOP.toLocaleString('es-CO')} COP</span>
              </div>
              <div className="flex justify-between pt-1 text-slate-900 font-bold">
                <span>Punto de Equilibrio (Break-Even):</span>
                <span className="font-mono text-amber-800">{breakEvenOrders} citas / mes</span>
              </div>
            </div>
          </div>

          {/* Strategic Conclusion Badge */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="font-medium">
              <strong className="text-slate-900">Recomendación Estratégica:</strong> Mantener una comisión del <strong className="text-amber-800">20%</strong> es el "sweet spot": permite absorber el costo de adquisición de clientes por Meta Ads, deja una utilidad neta superior al 10% sobre GMV y paga a los sastres el 80% neto, asegurando lealtad y calidad sartorial impecable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
