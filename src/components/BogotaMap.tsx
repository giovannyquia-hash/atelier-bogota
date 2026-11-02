import React, { useState, useEffect } from 'react';
import { Navigation, Compass, ShieldCheck, MapPin, Car, Clock } from 'lucide-react';
import { TailorPartner } from '../types';

interface BogotaMapProps {
  activeTailor?: TailorPartner;
  clientZone?: string;
  onSelectZone?: (zone: string) => void;
  showTailorTransit?: boolean;
}

export const BogotaMap: React.FC<BogotaMapProps> = ({
  activeTailor,
  clientZone = 'Rosales',
  onSelectZone,
  showTailorTransit = true
}) => {
  const [transitProgress, setTransitProgress] = useState(65);
  const [selectedZone, setSelectedZone] = useState(clientZone);

  // Animate tailor progress smoothly
  useEffect(() => {
    if (!showTailorTransit) return;
    const interval = setInterval(() => {
      setTransitProgress((prev) => (prev >= 94 ? 35 : prev + 1));
    }, 1800);
    return () => clearInterval(interval);
  }, [showTailorTransit]);

  const zones = [
    { name: 'Rosales', x: 74, y: 55, estMin: '12 min', tag: 'Cra 1 - 7 / Cll 70-85', status: 'Alta Demanda' },
    { name: 'El Chicó', x: 64, y: 40, estMin: '16 min', tag: 'Cll 88 - 98 / Cra 8-15', status: 'Disponible' },
    { name: 'La Cabrera', x: 60, y: 48, estMin: '14 min', tag: 'Cll 82 - 87 / Cra 9-13', status: 'Disponible' },
    { name: 'Santa Ana', x: 78, y: 26, estMin: '22 min', tag: 'Cll 108 - 116 / Cra 2-7', status: 'Disponible' },
    { name: 'Santa Bárbara', x: 60, y: 22, estMin: '25 min', tag: 'Cll 116 - 127 / Cra 7-15', status: 'Disponible' },
    { name: 'El Virrey', x: 50, y: 46, estMin: '15 min', tag: 'Cll 85 - 88 / Parque', status: 'Disponible' },
  ];

  return (
    <div className="relative w-full h-[400px] md:h-[480px] bg-[#f8fafc] rounded-2xl overflow-hidden border border-slate-200/90 shadow-md">
      {/* Top Map HUD Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200/90 text-xs shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-900">Radar Bogotá Alta Costura</span>
          <span className="text-slate-300">·</span>
          <span className="text-slate-500 font-medium">Zona Norte & Cerros Orientales</span>
        </div>
        <div className="flex items-center gap-3 text-slate-600">
          <span className="flex items-center gap-1 font-mono text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            <Car className="w-3.5 h-3.5 text-amber-700" />
            3 Sastres en patrulla VIP
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Custodia & Logística Verificada
          </span>
        </div>
      </div>

      {/* SVG Map Canvas */}
      <svg
        viewBox="0 0 1000 700"
        className="w-full h-full select-none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="mountainsGradLight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.4" />
            <stop offset="40%" stopColor="#e2e8f0" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <radialGradient id="tailorGlowLight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Cerros Orientales (Mountains on the right/east) */}
        <path
          d="M 680 0 Q 720 180, 750 350 T 820 700 L 1000 700 L 1000 0 Z"
          fill="url(#mountainsGradLight)"
        />
        {/* Mountain contour subtle lines */}
        <path d="M 740 40 Q 770 200, 800 380 T 880 700" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,6" opacity="0.6" />
        <path d="M 810 0 Q 840 230, 870 420 T 940 700" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,8" opacity="0.5" />

        {/* Text for Cerros Orientales */}
        <text x="860" y="320" fill="#64748b" fontSize="13" letterSpacing="4" transform="rotate(75, 860, 320)" className="font-mono font-semibold">
          CERROS ORIENTALES
        </text>

        {/* Major Avenue Arteries of Bogotá */}
        {/* Carrera 7 (Runs North-South adjacent to mountains) */}
        <path
          d="M 710 40 L 680 180 L 650 320 L 610 500 L 580 680"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <text x="640" y="340" fill="#475569" fontSize="10" fontWeight="600" transform="rotate(-70, 640, 340)" className="font-mono">
          CRA 7MA (CORREDOR VIP)
        </text>

        {/* Carrera 9 / 11 */}
        <path
          d="M 640 40 L 610 180 L 580 320 L 530 500 L 490 680"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="3"
        />
        <text x="570" y="340" fill="#64748b" fontSize="9" transform="rotate(-70, 570, 340)" className="font-mono">
          CRA 11 (ZONA ROSA / CHICÓ)
        </text>

        {/* Carrera 15 */}
        <path
          d="M 570 40 L 540 180 L 500 330 L 450 510 L 400 680"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="2.5"
        />

        {/* Autopista Norte / Troncal */}
        <path
          d="M 440 30 L 410 180 L 370 340 L 320 520 L 270 690"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="4"
        />
        <text x="360" y="360" fill="#64748b" fontSize="10" fontWeight="600" transform="rotate(-68, 360, 360)" className="font-mono">
          AUTOPISTA NORTE
        </text>

        {/* Cross Avenues (Calles) */}
        {/* Calle 127 */}
        <line x1="200" y1="120" x2="800" y2="120" stroke="#e2e8f0" strokeWidth="2" />
        <text x="210" y="112" fill="#64748b" fontSize="9" className="font-mono">CLL 127</text>

        {/* Calle 116 (Pepe Sierra) */}
        <line x1="180" y1="200" x2="840" y2="200" stroke="#cbd5e1" strokeWidth="2.5" />
        <text x="190" y="192" fill="#475569" fontSize="9" fontWeight="600" className="font-mono">CLL 116 (PEPE SIERRA / SANTA BÁRBARA)</text>

        {/* Calle 100 */}
        <line x1="160" y1="310" x2="820" y2="310" stroke="#cbd5e1" strokeWidth="2.5" />
        <text x="170" y="302" fill="#475569" fontSize="9" fontWeight="600" className="font-mono">CLL 100 (CORREDOR EMPRESARIAL)</text>

        {/* Calle 85 / Virrey */}
        <line x1="150" y1="440" x2="770" y2="440" stroke="#e2e8f0" strokeWidth="2" />
        <text x="160" y="432" fill="#64748b" fontSize="9" className="font-mono">CLL 85 (VIRREY / LA CABRERA)</text>

        {/* Calle 72 (Centro Financiero) */}
        <line x1="140" y1="560" x2="740" y2="560" stroke="#cbd5e1" strokeWidth="2.5" />
        <text x="150" y="552" fill="#475569" fontSize="9" fontWeight="600" className="font-mono">CLL 72 (FINANCIERO / ROSALES)</text>

        {/* Active Route Path for Sastre towards Client Penthouse in Rosales */}
        {showTailorTransit && (
          <>
            {/* Pulsing route line */}
            <path
              d="M 520 440 L 610 500 L 680 540 L 730 550"
              fill="none"
              stroke="#0284c7"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="8 6"
              className="animate-pulse"
            />
            {/* Live moving vehicle position interpolated */}
            {(() => {
              const t = transitProgress / 100;
              const pX = 520 + (730 - 520) * t;
              const pY = 440 + (550 - 440) * Math.sin(t * (Math.PI / 2));

              return (
                <g transform={`translate(${pX}, ${pY})`}>
                  {/* Glowing radar radius */}
                  <circle r="32" fill="url(#tailorGlowLight)" className="animate-ping" opacity="0.4" />
                  <circle r="18" fill="#d97706" fillOpacity="0.2" stroke="#d97706" strokeWidth="1.5" />
                  <circle r="9" fill="#d97706" stroke="#ffffff" strokeWidth="2.5" />
                  {/* Vehicle Label Tag */}
                  <rect x="14" y="-22" width="145" height="28" rx="6" fill="#ffffff" stroke="#d97706" strokeWidth="1.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))" />
                  <text x="22" y="-4" fill="#92400e" fontSize="10.5" fontWeight="bold">
                    Hernán Gómez · CX-5
                  </text>
                  <text x="124" y="-4" fill="#0284c7" fontSize="9.5" fontWeight="bold">
                    {Math.max(3, Math.round((1 - t) * 15))}m
                  </text>
                </g>
              );
            })()}
          </>
        )}

        {/* Zone Markers on Map */}
        {zones.map((z) => {
          const isSelected = selectedZone === z.name;
          const cx = z.x * 10;
          const cy = z.y * 7;

          return (
            <g
              key={z.name}
              className="cursor-pointer transition-transform duration-300 hover:scale-110"
              onClick={() => {
                setSelectedZone(z.name);
                onSelectZone?.(z.name);
              }}
            >
              {/* Highlight halo */}
              <circle
                cx={cx}
                cy={cy}
                r={isSelected ? 36 : 24}
                fill={isSelected ? '#d97706' : '#94a3b8'}
                fillOpacity={isSelected ? 0.2 : 0.08}
                stroke={isSelected ? '#d97706' : '#cbd5e1'}
                strokeWidth={isSelected ? 2 : 1}
                strokeDasharray={isSelected ? 'none' : '2,4'}
              />

              {/* Center Pin */}
              <circle
                cx={cx}
                cy={cy}
                r={isSelected ? 8 : 5}
                fill={isSelected ? '#d97706' : '#64748b'}
                stroke="#ffffff"
                strokeWidth="2"
              />

              {/* Label */}
              <rect
                x={cx - 52}
                y={cy + 12}
                width="104"
                height="22"
                rx="5"
                fill="#ffffff"
                stroke={isSelected ? '#d97706' : '#cbd5e1'}
                strokeWidth={isSelected ? 1.5 : 1}
                filter="drop-shadow(0 1px 3px rgba(0,0,0,0.08))"
              />
              <text
                x={cx}
                y={cy + 27}
                textAnchor="middle"
                fill={isSelected ? '#92400e' : '#1e293b'}
                fontSize="10.5"
                fontWeight={isSelected ? 'bold' : '600'}
              >
                {z.name}
              </text>
            </g>
          );
        })}

        {/* Destination Pin (Client's Penthouse in Rosales) */}
        <g transform="translate(730, 550)">
          <circle r="14" fill="#ef4444" fillOpacity="0.25" className="animate-ping" />
          <circle r="8" fill="#dc2626" stroke="#ffffff" strokeWidth="2.5" />
          <rect x="-65" y="-36" width="130" height="26" rx="6" fill="#ffffff" stroke="#dc2626" strokeWidth="1.5" filter="drop-shadow(0 2px 4px rgba(220,38,38,0.15))" />
          <text x="0" y="-19" textAnchor="middle" fill="#b91c1c" fontSize="9.5" fontWeight="bold">
            Penthouse Rosales (Cliente)
          </text>
        </g>
      </svg>

      {/* Floating Bottom Zone Quick Selector */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-2 overflow-x-auto py-1 px-2 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 text-xs shadow-xs">
        <span className="text-slate-700 font-semibold whitespace-nowrap text-[11px] px-1 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-amber-600" />
          Zonas VIP:
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {zones.map((z) => {
            const active = selectedZone === z.name;
            return (
              <button
                key={z.name}
                type="button"
                onClick={() => {
                  setSelectedZone(z.name);
                  onSelectZone?.(z.name);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  active
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 bg-slate-100/80 hover:bg-slate-200 border border-slate-200/60'
                }`}
              >
                <span>{z.name}</span>
                <span className={`text-[10px] font-mono ${active ? 'text-amber-700' : 'text-slate-500'}`}>({z.estMin})</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
