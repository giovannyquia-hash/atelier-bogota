import React from 'react';
import { Calendar, CheckCircle2, Clock, Code2, Smartphone, ShieldCheck, Rocket, ChevronRight } from 'lucide-react';

export const DevelopmentRoadmap: React.FC = () => {
  const milestones = [
    {
      month: 'Mes 1',
      title: 'Hito 1 - Diseño UI/UX & Prototipos Luxury',
      status: 'completado',
      progress: '100%',
      deliverables: [
        'Prototipos en Figma de pantallas Cliente VIP y Sastre con estética Luxury / Haute Couture',
        'Definición de paleta de color (Blanco Marfil, Dorado Champagne, Slate Grafito)',
        'Diseño de la Ficha Anatómica Digital de Medidas Permanente',
        'Validación ergonómica de uso con sastres mayores de 50 años (botones táctiles grandes)'
      ]
    },
    {
      month: 'Meses 2 y 3',
      title: 'Hitos 2 y 3 - Backend en la Nube & App Cliente VIP',
      status: 'en_progreso',
      progress: '65%',
      deliverables: [
        'Arquitectura de microservicios o Firebase/Node.js para autenticación rápida (Apple/Google)',
        'Motor de agendamiento On-Demand y programado por zonas de Bogotá (Rosales, Chicó, Santa Ana)',
        'Base de datos segura para almacenamiento de fichas de medidas y preferencias textiles',
        'Integración con pasarela local de pagos (Bold / ePayco) para pre-autorizaciones Black/Amex'
      ]
    },
    {
      month: 'Mes 4',
      title: 'Hito 4 - App del Sastre & Proveedor Calificado',
      status: 'pendiente',
      progress: '15%',
      deliverables: [
        'Módulo móvil con mapa en vivo de Bogotá (Google Maps SDK) y deep-link a Waze',
        'Switch de disponibilidad (Conectado / Desconectado con cálculo de demanda en tiempo real)',
        'Cotizador integrado en sitio para calcular valor final con alfileres y marcas de tiza',
        'Billetera digital del sastre con balance acumulado y solicitudes de dispersión Transfiya'
      ]
    },
    {
      month: 'Mes 5',
      title: 'Hito 5 - Fase de Pruebas (QA) & Publicación Oficial',
      status: 'pendiente',
      progress: '0%',
      deliverables: [
        'Pruebas controladas "Friends & Family" con los 30 clientes más fieles del taller actual',
        'Auditoría de seguridad en pasarelas de pago y custodia de datos personales (Habeas Data)',
        'Configuración de cuentas de desarrollador Apple Developer y Google Play Console',
        'Publicación y lanzamiento de la pauta VIP segmentada con Meta Conversions API'
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-900">
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <Rocket className="w-6 h-6 text-amber-600" />
          <h2 className="text-xl font-serif font-bold text-slate-900 tracking-wide">
            Ruta de Desarrollo por Hitos (Cronograma Sugerido)
          </h2>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          Esquema de pagos por entregables auditables para ir validando cada fase técnica sin asumir riesgos de sobrecostos.
        </p>
      </div>

      <div className="space-y-4">
        {milestones.map((m, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 relative overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-900 text-white shadow-2xs">
                  {m.month}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{m.title}</h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-500 font-semibold">Avance: {m.progress}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider font-bold ${
                    m.status === 'completado'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : m.status === 'en_progreso'
                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                      : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}
                >
                  {m.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {m.deliverables.map((del, dIdx) => (
                <div key={dIdx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
