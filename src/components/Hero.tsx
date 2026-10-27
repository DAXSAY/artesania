import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { t } = useStore();

  return (
    <section className="relative overflow-hidden bg-[#FDFDFC] dark:bg-[#121110] pt-14 pb-20 border-b border-[#EFECE6] dark:border-[#262422] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Clean split balanced presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Presentation */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-[11px] font-medium text-[#7A756D] dark:text-[#A8A298] tracking-[0.25em] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#8E785C]" />
              <span>{t('heroSubtitle')}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#171615] dark:text-[#F6F4EE] leading-[1.12]">
              {t('heroTitle')}
            </h1>

            <p className="text-base text-[#5C5750] dark:text-[#A8A298] max-w-xl font-normal leading-relaxed">
              {t('heroDescription')}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#catalogo"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#171615] hover:bg-[#2C2A28] dark:bg-[#F6F4EE] dark:text-[#171615] dark:hover:bg-white rounded-md shadow-xs transition-all"
              >
                <span>{t('heroCtaCollection')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#artesanos"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-medium uppercase tracking-wider text-[#171615] dark:text-[#F6F4EE] bg-[#FAF9F6] dark:bg-[#1A1918] hover:bg-white dark:hover:bg-[#242220] border border-[#EAE6DE] dark:border-[#2C2926] rounded-md transition-all"
              >
                {t('heroCtaArtisans')}
              </a>
            </div>

            {/* Cultural Trust Badges */}
            <div className="pt-8 grid grid-cols-3 gap-6 border-t border-[#EFECE6] dark:border-[#262422] max-w-lg">
              <div>
                <p className="font-serif text-2xl font-normal text-[#171615] dark:text-[#F6F4EE] tabular-nums">
                  {t('heroBadge1Value')}
                </p>
                <p className="text-[11px] text-[#7A756D] dark:text-[#8C867E] font-normal mt-0.5">
                  {t('heroBadge1Label')}
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl font-normal text-[#171615] dark:text-[#F6F4EE] tabular-nums">
                  {t('heroBadge2Value')}
                </p>
                <p className="text-[11px] text-[#7A756D] dark:text-[#8C867E] font-normal mt-0.5">
                  {t('heroBadge2Label')}
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl font-normal text-[#171615] dark:text-[#F6F4EE] tabular-nums">
                  {t('heroBadge3Value')}
                </p>
                <p className="text-[11px] text-[#7A756D] dark:text-[#8C867E] font-normal mt-0.5">
                  {t('heroBadge3Label')}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Museum Art Presentation */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-[#1A1918] p-3 rounded-2xl border border-[#EFECE6] dark:border-[#262422] shadow-xs transition-colors">
              <div className="relative rounded-xl overflow-hidden bg-[#FAF9F6] dark:bg-[#121110] border border-[#EAE6DE] dark:border-[#2C2926]">
                <img
                  src="https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=85"
                  alt="Maestros tejedores y ceramistas tradicionales"
                  className="w-full h-[400px] object-cover hover:scale-102 transition-transform duration-700"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Museum Art Plaque */}
              <div className="pt-3.5 pb-1 px-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-semibold tracking-widest text-[#8E785C] block">
                    {t('heroPlaqueEyebrow')}
                  </span>
                  <p className="font-serif text-base font-normal text-[#171615] dark:text-[#F6F4EE]">
                    {t('heroPlaqueTitle')}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#7A756D] dark:text-[#8C867E] block">{t('heroPlaqueOrigin')}</span>
                  <span className="text-[10px] text-[#9E9991]">Cusco · Ayacucho · Puno</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
