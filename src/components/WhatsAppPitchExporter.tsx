import React, { useState } from 'react';
import { Copy, Check, Share2, Send, MessageSquare, ExternalLink, HelpCircle, FileText } from 'lucide-react';

export const WhatsAppPitchExporter: React.FC = () => {
  const [recipientName, setRecipientName] = useState('Socio / Desarrollador');
  const [commissionRate, setCommissionRate] = useState('20%');
  const [copied, setCopied] = useState(false);

  const generateWhatsAppMessage = () => {
    return `¡Hola! Estuve estructurando la idea de negocio de la app tipo Uber para el sector de alta costura y arreglos premium aquí en Bogotá.

El modelo logístico operará sin activos propios (los sastres van a domicilio en sus propios carros) y captaremos clientes con pauta digital exclusiva hacia el nicho de altos ingresos (Rosales, El Chicó, Santa Ana, La Cabrera).

Te comparto la ruta de desarrollo y los requerimientos técnicos para que los revises. La idea es trabajar el proyecto bajo un esquema de pagos por hitos (entregables) para ir probando fase por fase:

🗺️ RUTA DE DESARROLLO (CRONOGRAMA SUGERIDO)
• Mes 1 (Hito 1 - Diseño UI/UX): Creación de los prototipos visuales en Figma de las pantallas de la app con estética Premium/Luxury.
• Mes 2 y 3 (Hitos 2 y 3 - Backend y App Cliente): Estructura del "cerebro" en la nube, perfiles VIP, agendamiento de citas On-Demand o programadas y ficha de medidas digital permanente.
• Mes 4 (Hito 4 - App del Sastre): Módulo para el proveedor con mapa de Bogotá integrado (Google Maps), botón de disponibilidad y cotizador automático de arreglos evaluados en sitio.
• Mes 5 (Hito 5 - Pruebas y Lanzamiento): Fase de pruebas (QA) controlada con los clientes actuales de mi taller y publicación oficial en las tiendas de Apple (App Store) y Android (Google Play).

🚀 REQUERIMIENTOS TÉCNICOS DEL ECOSISTEMA
Idealmente desarrollado en tecnologías híbridas (Flutter o React Native) para usar un solo código para iOS y Android.

📱 1. APP CLIENTE VIP
• Registro rápido (Apple ID, Google, Celular) con interfaz minimalista.
• Agendamiento de citas On-Demand o programadas a domicilio (Rosales, Chicó, Santa Ana, Cabrera, Santa Bárbara).
• Ficha de medidas digital guardada permanentemente en su perfil (patronaje anatómico en la nube).
• Pasarela de pagos local (Bold, ePayco o PayU) compatible con tarjetas de alta categoría (Black/Infinite).
• Seguimiento en tiempo real del sastre en camino y notificaciones push del estado de su prenda (Cita -> Taller -> Hilván -> Acabados -> Entrega).

📱 2. APP SASTRE / PROVEEDOR CALIFICADO
• Registro de perfil técnico, portafolio de costura y datos de su vehículo particular (cero flota propia).
• Switch de disponibilidad (Conectado / Desconectado).
• Cotizador integrado para calcular la tarifa final según los arreglos evaluados en la cita física.
• Navegación GPS integrada (Waze / Google Maps).
• Billetera digital para ver ganancias acumuladas y solicitar dispersión de dinero (Transfiya / Daviplata / Bancolombia).

💻 3. PANEL ADMINISTRATIVO WEB (NUESTRA CENTRAL)
• Gestión, activación y bloqueo de proveedores verificados.
• Motor de reglas para configurar nuestra comisión por servicio (ej. ${commissionRate}).
• Integración de la API de Conversiones de Meta e Instagram para optimizar la pauta digital exclusiva hacia el nicho de altos ingresos.

Échale un ojo a ver cómo lo ves técnicamente y nos sentamos a armar el plan de trabajo. ¡Un abrazo!`;
  };

  const handleCopy = () => {
    const text = generateWhatsAppMessage();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(generateWhatsAppMessage());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-900">
      {/* Header card */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-slate-900 tracking-wide">
                Exportador Oficial para WhatsApp
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Formato limpio, optimizado y con emojis funcionales para enviar a socios o desarrolladores
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4 text-amber-400" />}
              <span>{copied ? '¡Copiado al Portapapeles!' : 'Copiar Texto para WhatsApp'}</span>
            </button>

            <button
              type="button"
              onClick={handleOpenWhatsApp}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>Abrir WhatsApp Web</span>
            </button>
          </div>
        </div>

        {/* Customization bar */}
        <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-600 font-medium">Comisión configurada en propuesta:</span>
            <select
              value={commissionRate}
              onChange={(e) => setCommissionRate(e.target.value)}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-slate-900 font-mono font-bold text-xs focus:outline-none focus:border-amber-600"
            >
              <option value="15%">15% (Económica)</option>
              <option value="20%">20% (Recomendada Estándar)</option>
              <option value="25%">25% (Alta Rentabilidad)</option>
            </select>
          </div>
        </div>
      </div>

      {/* WhatsApp Chat Preview Mockup (Clean Authentic Light WhatsApp Mode) */}
      <div className="p-6 rounded-2xl bg-[#efeae2] border border-slate-300 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-300/80 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs shadow-2xs">
              AB
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Atelier Bogotá · Propuesta Técnica</span>
              <span className="text-[10px] text-emerald-700 font-semibold">en línea</span>
            </div>
          </div>
          <span className="text-[10px] text-slate-500 font-mono font-semibold">Vista Previa WhatsApp</span>
        </div>

        {/* WhatsApp Message Bubble */}
        <div className="max-w-2xl bg-[#d9fdd3] text-[#111b21] rounded-2xl rounded-tl-sm p-4 text-xs font-sans whitespace-pre-wrap leading-relaxed shadow-sm border border-emerald-200/60">
          {generateWhatsAppMessage()}
          <div className="text-right text-[10px] text-slate-500 pt-1 font-mono font-medium">
            12:45 PM ✓✓
          </div>
        </div>
      </div>

      {/* FAQ on Technical questions (Google Maps API & Commission) */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-bold text-slate-900">
            Guía de Respuestas para Dudas Técnicas de tu Socio o Desarrollador
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <strong className="text-slate-900 font-bold block">1. Dudas sobre costos de las APIs de Google Maps</strong>
            <p className="text-slate-600 text-[11px] leading-relaxed font-medium">
              Google Maps otorga un crédito mensual gratuito de $200 USD (~$800.000 COP) que cubre más de 28.000 consultas de mapas y geocodificación al mes. Para una operación inicial de 100 a 400 citas en Bogotá, el costo de Google Maps es prácticamente $0 COP. Además, para la navegación en ruta se puede disparar con un deep-link gratuito nativo hacia la app de Waze o Google Maps ya instalada en el teléfono del sastre.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <strong className="text-slate-900 font-bold block">2. Justificación de la Comisión Ideal del 20%</strong>
            <p className="text-slate-600 text-[11px] leading-relaxed font-medium">
              Con un ticket promedio de $260.000 COP, el 20% representa $52.000 COP por servicio para la plataforma. Esto cubre la pasarela de pago (~$8.400 COP), la pauta en Meta Ads (~$35.000 COP amortizada entre servicios recurrentes) y deja una utilidad neta de ~$8.000 a $15.000 COP por cita, al tiempo que el sastre se lleva $208.000 COP netos por 1 hora de visita.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
