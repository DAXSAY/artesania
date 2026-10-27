import React from 'react';
import { Plane, Package, ShieldCheck, CreditCard, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ShippingTrustSection: React.FC = () => {
  const { settings, t, language } = useStore();

  const handleWhatsAppContact = () => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const messageText = language === 'en'
      ? `Hello! I would like more information regarding international DHL shipping to my country. Could you please assist me with rates and delivery estimates?`
      : `¡Hola! Estoy interesado en conocer más sobre los envíos internacionales de artesanías a mi país. ¿Podrían orientarme sobre los costos y tiempos de entrega?`;

    const message = encodeURIComponent(messageText);
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <section id="envios" className="py-20 bg-white dark:bg-[#121110] border-b border-[#EFECE6] dark:border-[#262422] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-medium text-[#7A756D] dark:text-[#8C867E] uppercase tracking-[0.25em] block">
              {t('shippingEyebrow')}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#171615] dark:text-[#F6F4EE] leading-tight">
              {t('shippingTitle')}
            </h2>
            <p className="text-[#5C5750] dark:text-[#A8A298] text-sm leading-relaxed font-normal">
              {t('shippingDescription')}
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-4">
                <div className="w-9 h-9 rounded-lg bg-[#FAF9F6] dark:bg-[#1A1918] border border-[#EDE9E1] dark:border-[#2C2926] flex items-center justify-center text-[#171615] dark:text-[#F6F4EE] shrink-0">
                  <Package className="w-4 h-4 text-[#8E785C]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#171615] dark:text-[#F6F4EE] uppercase tracking-wide">{t('feature1Title')}</h4>
                  <p className="text-xs text-[#5C5750] dark:text-[#A8A298] mt-0.5 font-normal">
                    {t('feature1Desc')}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-9 h-9 rounded-lg bg-[#FAF9F6] dark:bg-[#1A1918] border border-[#EDE9E1] dark:border-[#2C2926] flex items-center justify-center text-[#171615] dark:text-[#F6F4EE] shrink-0">
                  <Plane className="w-4 h-4 text-[#8E785C]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#171615] dark:text-[#F6F4EE] uppercase tracking-wide">{t('feature2Title')}</h4>
                  <p className="text-xs text-[#5C5750] dark:text-[#A8A298] mt-0.5 font-normal">
                    {t('feature2Desc')}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-9 h-9 rounded-lg bg-[#FAF9F6] dark:bg-[#1A1918] border border-[#EDE9E1] dark:border-[#2C2926] flex items-center justify-center text-[#171615] dark:text-[#F6F4EE] shrink-0">
                  <CreditCard className="w-4 h-4 text-[#8E785C]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#171615] dark:text-[#F6F4EE] uppercase tracking-wide">{t('feature3Title')}</h4>
                  <p className="text-xs text-[#5C5750] dark:text-[#A8A298] mt-0.5 font-normal">
                    {t('feature3Desc')}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={handleWhatsAppContact}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-medium text-white bg-[#171615] hover:bg-[#2C2A28] dark:bg-[#F6F4EE] dark:text-[#171615] dark:hover:bg-white rounded-md transition-colors cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#4AE384] dark:text-[#2D5A3E]" />
                <span>{t('consultWhatsAppStore')}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-[#FAF9F6] dark:bg-[#1A1918] border border-[#EFECE6] dark:border-[#262422] rounded-2xl p-6 sm:p-8 space-y-6 transition-colors">
              <h3 className="font-serif text-xl font-normal text-[#171615] dark:text-[#F6F4EE]">
                {t('ratesTableTitle')}
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-3.5 bg-white dark:bg-[#232120] rounded-xl border border-[#EDE9E1] dark:border-[#2C2926]">
                  <div>
                    <span className="font-medium text-[#171615] dark:text-[#F6F4EE] block">{t('regionNorthAmerica')}</span>
                    <span className="text-[#7A756D] dark:text-[#8C867E] text-[11px]">DHL Express Courier · Door to door</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-[#171615] dark:text-[#F6F4EE] block">3 - 5 {t('daysUnit')}</span>
                    <span className="text-[#3F7552] dark:text-[#4AE384] font-medium text-[11px]">{language === 'en' ? 'Free over $250' : 'Gratis desde $250'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-white dark:bg-[#232120] rounded-xl border border-[#EDE9E1] dark:border-[#2C2926]">
                  <div>
                    <span className="font-medium text-[#171615] dark:text-[#F6F4EE] block">{t('regionEurope')}</span>
                    <span className="text-[#7A756D] dark:text-[#8C867E] text-[11px]">Customs declaration & certificate</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-[#171615] dark:text-[#F6F4EE] block">4 - 6 {t('daysUnit')}</span>
                    <span className="text-[#7A756D] dark:text-[#8C867E] text-[11px]">$38.00 USD</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-white dark:bg-[#232120] rounded-xl border border-[#EDE9E1] dark:border-[#2C2926]">
                  <div>
                    <span className="font-medium text-[#171615] dark:text-[#F6F4EE] block">{t('regionAsia')}</span>
                    <span className="text-[#7A756D] dark:text-[#8C867E] text-[11px]">Special moisture insulation</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-[#171615] dark:text-[#F6F4EE] block">5 - 7 {t('daysUnit')}</span>
                    <span className="text-[#7A756D] dark:text-[#8C867E] text-[11px]">$42.00 USD</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-white dark:bg-[#232120] rounded-xl border border-[#EDE9E1] dark:border-[#2C2926]">
                  <div>
                    <span className="font-medium text-[#171615] dark:text-[#F6F4EE] block">{t('regionLatam')}</span>
                    <span className="text-[#7A756D] dark:text-[#8C867E] text-[11px]">Certified postal service</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-[#171615] dark:text-[#F6F4EE] block">2 - 3 {t('daysUnit')}</span>
                    <span className="text-[#7A756D] dark:text-[#8C867E] text-[11px]">$15.00 USD</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-[#232120] rounded-xl border border-[#EDE9E1] dark:border-[#2C2926] text-[11px] text-[#5C5750] dark:text-[#A8A298] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#3F7552] dark:text-[#4AE384] shrink-0" />
                <span>
                  {t('guaranteeText')}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
