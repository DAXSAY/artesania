import React from 'react';
import { useStore } from '../context/StoreContext';
import { MessageCircle, Mail, MapPin, LayoutDashboard } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setActiveView, activeView, t } = useStore();

  return (
    <footer id="autenticidad" className="bg-[#FAF9F6] dark:bg-[#151413] text-[#171615] dark:text-[#F6F4EE] pt-16 pb-12 border-t border-[#EFECE6] dark:border-[#262422] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#EFECE6] dark:border-[#262422] text-xs">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <span className="font-serif text-3xl font-normal tracking-tight text-[#171615] dark:text-[#F6F4EE] block">
              QALA
            </span>
            <p className="text-[#5C5750] dark:text-[#A8A298] max-w-md leading-relaxed text-xs font-normal">
              {t('footerBrandDesc')}
            </p>
            <div className="flex items-center gap-2 text-[#7A756D] dark:text-[#8C867E] text-xs">
              <MapPin className="w-3.5 h-3.5 text-[#8E785C] shrink-0" />
              <span>{settings.shopAddress}</span>
            </div>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#171615] dark:text-[#F6F4EE]">
              {t('footerTouristService')}
            </h4>
            <ul className="space-y-2 text-[#5C5750] dark:text-[#A8A298]">
              <li className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#4A7C59] dark:text-[#4AE384] shrink-0" />
                <a 
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-[#171615] dark:hover:text-white transition-colors font-medium"
                >
                  +{settings.whatsappNumber}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#7A756D] dark:text-[#8C867E] shrink-0" />
                <span>{settings.contactEmail}</span>
              </li>
              <li className="pt-1 text-[11px] text-[#7A756D] dark:text-[#8C867E]">
                Lunes - Domingo / Monday - Sunday (GMT-5)
              </li>
            </ul>
          </div>

          {/* Quick links & Admin switcher */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#171615] dark:text-[#F6F4EE]">
              {t('footerInternalAdmin')}
            </h4>
            <p className="text-[#5C5750] dark:text-[#A8A298] text-[11px] leading-relaxed">
              {t('footerAdminDesc')}
            </p>
            <button
              onClick={() => {
                setActiveView(activeView === 'admin' ? 'store' : 'admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#232120] hover:bg-[#FAF9F6] dark:hover:bg-[#2C2926] text-[#171615] dark:text-[#F6F4EE] rounded-md text-xs font-medium transition-colors cursor-pointer border border-[#EAE6DE] dark:border-[#33302C] shadow-xs"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#8E785C]" />
              <span>{activeView === 'admin' ? t('viewStore') : t('adminBadge')}</span>
            </button>
          </div>

        </div>

        {/* Quiet copyright baseline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A756D] dark:text-[#8C867E]">
          <p>© {new Date().getFullYear()} {settings.shopName}. {t('footerRights')}</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Fair Trade</span>
            <span aria-hidden="true">·</span>
            <span>DHL Express Worldwide</span>
            <span aria-hidden="true">·</span>
            <span>Master Andean Craftsmanship</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
