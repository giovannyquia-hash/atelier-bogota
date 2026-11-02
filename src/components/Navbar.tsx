import React, { useState } from 'react';
import { Menu, X, Sparkles, Building2, Scissors, Download } from 'lucide-react';

export type AppViewType = 'client' | 'bespoke' | 'uniforms' | 'tailor' | 'admin' | 'simulator' | 'whatsapp' | 'roadmap';

interface NavbarProps {
  activeView: AppViewType;
  onSelectView: (view: AppViewType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView, onSelectView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (view: AppViewType) => {
    onSelectView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-3">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSelect('client')}
            className="text-lg sm:text-xl font-serif font-bold tracking-wider text-slate-900 whitespace-nowrap shrink-0 hover:text-amber-700 transition-colors cursor-pointer text-left"
          >
            ATELIER BOGOTÁ
          </button>
          <span className="hidden xl:inline-block text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-amber-100 text-amber-900 rounded">
            Haute Couture On-Demand
          </span>
        </div>

        {/* Zone 2: Clean Single-Line Text Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs font-medium text-slate-600">
          <button
            onClick={() => handleSelect('client')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 cursor-pointer ${
              activeView === 'client' ? 'text-amber-700 border-b-2 border-amber-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            App Cliente VIP
          </button>

          <button
            onClick={() => handleSelect('bespoke')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 cursor-pointer flex items-center gap-1.5 ${
              activeView === 'bespoke' ? 'text-amber-700 border-b-2 border-amber-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            <Scissors className="w-3.5 h-3.5 text-amber-600" />
            Trajes sobre Medidas
          </button>

          <button
            onClick={() => handleSelect('uniforms')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 cursor-pointer flex items-center gap-1.5 ${
              activeView === 'uniforms' ? 'text-amber-700 border-b-2 border-amber-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-amber-600" />
            Dotaciones VIP
          </button>

          <button
            onClick={() => handleSelect('tailor')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 cursor-pointer ${
              activeView === 'tailor' ? 'text-amber-700 border-b-2 border-amber-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            App Sastre
          </button>

          <button
            onClick={() => handleSelect('admin')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 cursor-pointer ${
              activeView === 'admin' ? 'text-amber-700 border-b-2 border-amber-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Central Admin
          </button>

          <button
            onClick={() => handleSelect('simulator')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 cursor-pointer ${
              activeView === 'simulator' ? 'text-amber-700 border-b-2 border-amber-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Rentabilidad
          </button>

          <button
            onClick={() => handleSelect('roadmap')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 cursor-pointer ${
              activeView === 'roadmap' ? 'text-amber-700 border-b-2 border-amber-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Hitos
          </button>
        </nav>

        {/* Zone 3: Primary Action + Mobile Hamburger */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={`${import.meta.env.BASE_URL}atelier-bogota.zip`}
            download="atelier-bogota.zip"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
            title="Descargar código fuente en archivo ZIP para GitHub"
          >
            <Download className="w-3.5 h-3.5 text-amber-800" />
            Descargar .ZIP
          </a>

          <button
            onClick={() => handleSelect('whatsapp')}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
          >
            Propuesta WhatsApp
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 shadow-lg">
          <button
            onClick={() => handleSelect('client')}
            className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-md ${
              activeView === 'client' ? 'bg-amber-50 text-amber-900' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            App Cliente VIP
          </button>
          <button
            onClick={() => handleSelect('bespoke')}
            className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-md flex items-center gap-2 ${
              activeView === 'bespoke' ? 'bg-amber-50 text-amber-900' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Scissors className="w-4 h-4 text-amber-600" />
            Trajes sobre Medidas (Bespoke)
          </button>
          <button
            onClick={() => handleSelect('uniforms')}
            className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-md flex items-center gap-2 ${
              activeView === 'uniforms' ? 'bg-amber-50 text-amber-900' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Building2 className="w-4 h-4 text-amber-600" />
            Dotaciones de Uniforme VIP
          </button>
          <button
            onClick={() => handleSelect('tailor')}
            className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-md ${
              activeView === 'tailor' ? 'bg-amber-50 text-amber-900' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            App Sastre Calificado
          </button>
          <button
            onClick={() => handleSelect('admin')}
            className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-md ${
              activeView === 'admin' ? 'bg-amber-50 text-amber-900' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Central Administrativa
          </button>
          <button
            onClick={() => handleSelect('simulator')}
            className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-md ${
              activeView === 'simulator' ? 'bg-amber-50 text-amber-900' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Calculadora de Rentabilidad
          </button>
          <button
            onClick={() => handleSelect('roadmap')}
            className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-md ${
              activeView === 'roadmap' ? 'bg-amber-50 text-amber-900' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Ruta de Desarrollo & Hitos
          </button>
          <a
            href={`${import.meta.env.BASE_URL}atelier-bogota.zip`}
            download="atelier-bogota.zip"
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 mt-2 text-xs font-semibold rounded-md bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300"
          >
            <Download className="w-4 h-4 text-amber-800" />
            Descargar Código Completo (.ZIP)
          </a>
        </div>
      )}
    </header>
  );
};
