import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, LayoutDashboard, Store as StoreIcon, Globe, Sun, Moon } from 'lucide-react';
import { Language } from '../types';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    language,
    setLanguage,
    t,
    theme,
    toggleTheme,
    activeView,
    setActiveView,
    orders,
  } = useStore();

  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#121110]/90 backdrop-blur-md border-b border-[#EFECE6] dark:border-[#262422] transition-colors">
      {/* Subtle top announcement in bone white / dark ink */}
      <div className="bg-[#FAF9F6] dark:bg-[#181716] border-b border-[#EFECE6] dark:border-[#262422] text-[#6B665E] dark:text-[#A8A298] text-[11px] py-1.5 px-4 text-center tracking-wide font-normal transition-colors">
        <span className="text-[#171615] dark:text-[#F6F4EE] font-medium">{t('announcement')}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark (Editorial Serif, Minimalist) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveView('store')}
              className="text-left group cursor-pointer"
            >
              <span className="font-serif text-3xl font-normal tracking-tight text-[#171615] dark:text-[#F6F4EE] group-hover:text-[#8E785C] transition-colors">
                QALA
              </span>
              <span className="block text-[10px] tracking-[0.25em] uppercase text-[#8C867E] dark:text-[#8C867E] font-sans -mt-1 font-medium">
                Arte Ancestral & Turismo
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          {activeView === 'store' ? (
            <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-normal text-[#6B665E] dark:text-[#A8A298]">
              <a href="#catalogo" className="hover:text-[#171615] dark:hover:text-[#F6F4EE] transition-colors whitespace-nowrap">
                {t('navCatalog')}
              </a>
              <a href="#artesanos" className="hover:text-[#171615] dark:hover:text-[#F6F4EE] transition-colors whitespace-nowrap">
                {t('navArtisans')}
              </a>
              <a href="#envios" className="hover:text-[#171615] dark:hover:text-[#F6F4EE] transition-colors whitespace-nowrap">
                {t('navShipping')}
              </a>
              <a href="#autenticidad" className="hover:text-[#171615] dark:hover:text-[#F6F4EE] transition-colors whitespace-nowrap">
                {t('navGuarantee')}
              </a>
            </nav>
          ) : (
            <div className="hidden md:flex items-center gap-2 text-xs font-normal text-[#6B665E] dark:text-[#A8A298]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#4A7C59]"></span>
              <span>{t('adminSubtitle')}</span>
            </div>
          )}

          {/* Zone 3: Actions (Language, Theme Toggle, Cart, Admin toggle) */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Language Selector (Replaced Currency selector as requested) */}
            <div className="relative inline-flex items-center bg-[#FAF9F6] dark:bg-[#1A1918] rounded-md px-2 py-1 border border-[#EAE6DE] dark:border-[#2C2926] transition-colors">
              <Globe className="w-3.5 h-3.5 text-[#8C867E] mr-1.5 shrink-0" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                aria-label="Seleccionar idioma / Select language"
                className="bg-transparent text-xs font-medium text-[#171615] dark:text-[#F6F4EE] focus:outline-none cursor-pointer"
              >
                <option value="es" className="dark:bg-[#1A1918] dark:text-[#F6F4EE]">ES · Español</option>
                <option value="en" className="dark:bg-[#1A1918] dark:text-[#F6F4EE]">EN · English</option>
              </select>
            </div>

            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? t('themeLight') : t('themeDark')}
              className="p-2 text-[#171615] dark:text-[#F6F4EE] bg-[#FAF9F6] dark:bg-[#1A1918] hover:bg-white dark:hover:bg-[#242220] rounded-md border border-[#EAE6DE] dark:border-[#2C2926] transition-colors cursor-pointer"
              aria-label="Alternar modo claro / modo oscuro"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#E8C56B]" />
              ) : (
                <Moon className="w-4 h-4 text-[#6B665E]" />
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#171615] dark:text-[#F6F4EE] bg-[#FAF9F6] dark:bg-[#1A1918] hover:bg-white dark:hover:bg-[#242220] rounded-md border border-[#EAE6DE] dark:border-[#2C2926] transition-colors cursor-pointer"
              aria-label="Abrir carrito de pedidos"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#171615] dark:bg-[#F6F4EE] text-[#FAF9F6] dark:text-[#171615] text-[10px] font-semibold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Switch between Storefront and Admin Dashboard */}
            {activeView === 'store' ? (
              <button
                onClick={() => setActiveView('admin')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#171615] dark:text-[#F6F4EE] bg-[#FAF9F6] dark:bg-[#1A1918] hover:bg-white dark:hover:bg-[#242220] border border-[#EAE6DE] dark:border-[#2C2926] rounded-md transition-all cursor-pointer whitespace-nowrap shadow-xs"
                title="Acceder al Panel de Administración"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#6B665E] dark:text-[#8C867E]" />
                <span className="hidden sm:inline">{t('adminBadge')}</span>
                {pendingOrdersCount > 0 && (
                  <span className="bg-[#8E785C] text-white text-[10px] font-medium px-1.5 py-0.2 rounded-full">
                    {pendingOrdersCount}
                  </span>
                )}
              </button>
            ) : (
              <button
                onClick={() => setActiveView('store')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-[#171615] dark:text-[#F6F4EE] bg-[#FAF9F6] dark:bg-[#1A1918] hover:bg-white dark:hover:bg-[#242220] border border-[#EAE6DE] dark:border-[#2C2926] rounded-md transition-all cursor-pointer whitespace-nowrap shadow-xs"
              >
                <StoreIcon className="w-3.5 h-3.5 text-[#8E785C]" />
                <span>{t('viewStore')}</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
