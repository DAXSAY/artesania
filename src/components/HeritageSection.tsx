import React from 'react';
import { Sparkles, HeartHandshake, Award } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HeritageSection: React.FC = () => {
  const { t } = useStore();

  return (
    <section id="artesanos" className="py-20 bg-[#FAF9F6] dark:bg-[#151413] border-b border-[#EFECE6] dark:border-[#262422] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-medium text-[#7A756D] dark:text-[#8C867E] uppercase tracking-[0.25em] block mb-2">
            {t('heritageEyebrow')}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#171615] dark:text-[#F6F4EE] leading-tight">
            {t('heritageTitle')}
          </h2>
          <p className="text-[#5C5750] dark:text-[#A8A298] text-sm mt-3 leading-relaxed font-normal">
            {t('heritageDescription')}
          </p>
        </div>

        {/* 3 Pillar Heritage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 bg-white dark:bg-[#1A1918] rounded-xl border border-[#EFECE6] dark:border-[#262422] shadow-xs flex flex-col justify-between transition-colors">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#FAF9F6] dark:bg-[#232120] border border-[#EAE6DE] dark:border-[#2C2926] text-[#8E785C] flex items-center justify-center mb-6">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-xl font-normal text-[#171615] dark:text-[#F6F4EE] mb-2">
                {t('pillar1Title')}
              </h3>
              <p className="text-xs text-[#5C5750] dark:text-[#A8A298] leading-relaxed font-normal">
                {t('pillar1Desc')}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F5F2EB] dark:border-[#232120] text-[#7A756D] dark:text-[#8C867E] text-[11px] font-normal">
              {t('pillar1Footer')}
            </div>
          </div>

          <div className="p-8 bg-white dark:bg-[#1A1918] rounded-xl border border-[#EFECE6] dark:border-[#262422] shadow-xs flex flex-col justify-between transition-colors">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#FAF9F6] dark:bg-[#232120] border border-[#EAE6DE] dark:border-[#2C2926] text-[#8E785C] flex items-center justify-center mb-6">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-xl font-normal text-[#171615] dark:text-[#F6F4EE] mb-2">
                {t('pillar2Title')}
              </h3>
              <p className="text-xs text-[#5C5750] dark:text-[#A8A298] leading-relaxed font-normal">
                {t('pillar2Desc')}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F5F2EB] dark:border-[#232120] text-[#7A756D] dark:text-[#8C867E] text-[11px] font-normal">
              {t('pillar2Footer')}
            </div>
          </div>

          <div className="p-8 bg-white dark:bg-[#1A1918] rounded-xl border border-[#EFECE6] dark:border-[#262422] shadow-xs flex flex-col justify-between transition-colors">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#FAF9F6] dark:bg-[#232120] border border-[#EAE6DE] dark:border-[#2C2926] text-[#8E785C] flex items-center justify-center mb-6">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-xl font-normal text-[#171615] dark:text-[#F6F4EE] mb-2">
                {t('pillar3Title')}
              </h3>
              <p className="text-xs text-[#5C5750] dark:text-[#A8A298] leading-relaxed font-normal">
                {t('pillar3Desc')}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F5F2EB] dark:border-[#232120] text-[#7A756D] dark:text-[#8C867E] text-[11px] font-normal">
              {t('pillar3Footer')}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
