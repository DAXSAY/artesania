import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { OrdersManager } from './OrdersManager';
import { ProductsManager } from './ProductsManager';
import { StoreSettingsView } from './StoreSettingsView';
import { 
  Package, 
  ShoppingBag, 
  Settings, 
  ArrowLeft, 
  Info
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { orders, products, setActiveView, formatPrice, t, language } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'settings'>('orders');

  // Compute Metrics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const totalRevenueUSD = orders.reduce((sum, o) => sum + o.totalUSD, 0);
  
  // Unique countries
  const countries = Array.from(new Set(orders.map(o => o.destinationCountry)));

  return (
    <div className="min-h-screen bg-[#FDFDFC] dark:bg-[#121110] pb-24 transition-colors">
      
      {/* Top Admin Header Bar */}
      <div className="bg-white dark:bg-[#161514] border-b border-[#EFECE6] dark:border-[#262422] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#7A756D] dark:text-[#8C867E] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#4A7C59]"></span>
                <span>{t('adminSubtitle')}</span>
              </div>
              <h1 className="font-serif text-3xl font-normal tracking-tight text-[#171615] dark:text-[#F6F4EE] mt-1">
                {t('adminTitle')}
              </h1>
            </div>

            <button
              onClick={() => setActiveView('store')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF9F6] dark:bg-[#232120] hover:bg-[#F2EFE9] dark:hover:bg-[#2C2926] text-[#171615] dark:text-[#F6F4EE] rounded-md text-xs font-medium transition-colors cursor-pointer border border-[#DDD8CE] dark:border-[#33302C]"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#8E785C]" />
              <span>{t('viewStore')}</span>
            </button>

          </div>

          {/* Quick Demo Note in soft bone */}
          <div className="mt-6 p-4 bg-[#FAF9F6] dark:bg-[#1E1D1B] rounded-xl border border-[#EAE6DE] dark:border-[#2C2926] flex items-start gap-3 text-xs text-[#5C5750] dark:text-[#A8A298]">
            <Info className="w-4 h-4 text-[#8E785C] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#171615] dark:text-[#F6F4EE]">{t('adminDemoNoteTitle')} </span>
              {t('adminDemoNoteDesc')}
            </div>
          </div>

          {/* Metrics KPIs Row in soft bone */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-[#FAF9F6] dark:bg-[#1E1D1B] p-4 rounded-xl border border-[#EFECE6] dark:border-[#2C2926]">
              <span className="text-[10px] font-semibold text-[#8C867B] dark:text-[#7A756D] block uppercase tracking-wider">
                {t('adminKpiTotalOrders')}
              </span>
              <span className="font-serif text-2xl font-normal text-[#171615] dark:text-[#F6F4EE] tabular-nums mt-0.5 block">
                {totalOrders}
              </span>
              <span className="text-[11px] text-[#7A756D] dark:text-[#8C867E]">
                {language === 'en' ? 'Logged in system' : 'Registrados en la plataforma'}
              </span>
            </div>

            <div className="bg-[#FAF9F6] dark:bg-[#1E1D1B] p-4 rounded-xl border border-[#EFECE6] dark:border-[#2C2926]">
              <span className="text-[10px] font-semibold text-[#8E785C] block uppercase tracking-wider">
                {t('adminKpiPending')}
              </span>
              <span className="font-serif text-2xl font-normal text-[#8E785C] tabular-nums mt-0.5 block">
                {pendingOrders}
              </span>
              <span className="text-[11px] text-[#7A756D] dark:text-[#8C867E]">
                {language === 'en' ? 'Awaiting WhatsApp confirmation' : 'Por confirmar en WhatsApp'}
              </span>
            </div>

            <div className="bg-[#FAF9F6] dark:bg-[#1E1D1B] p-4 rounded-xl border border-[#EFECE6] dark:border-[#2C2926]">
              <span className="text-[10px] font-semibold text-[#8C867B] dark:text-[#7A756D] block uppercase tracking-wider">
                {t('adminKpiDestinations')}
              </span>
              <span className="font-serif text-2xl font-normal text-[#171615] dark:text-[#F6F4EE] tabular-nums mt-0.5 block">
                {countries.length}
              </span>
              <span className="text-[11px] text-[#7A756D] dark:text-[#8C867E] truncate block">
                {countries.slice(0, 3).join(', ')}...
              </span>
            </div>

            <div className="bg-[#FAF9F6] dark:bg-[#1E1D1B] p-4 rounded-xl border border-[#EFECE6] dark:border-[#2C2926]">
              <span className="text-[10px] font-semibold text-[#8C867B] dark:text-[#7A756D] block uppercase tracking-wider">
                {t('adminKpiVolume')}
              </span>
              <span className="font-serif text-2xl font-normal text-[#171615] dark:text-[#F6F4EE] tabular-nums mt-0.5 block">
                {formatPrice(totalRevenueUSD)}
              </span>
              <span className="text-[11px] text-[#7A756D] dark:text-[#8C867E]">
                {language === 'en' ? 'Value in catalog' : 'Valor en catálogo'}
              </span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 mt-8 border-b border-[#EFECE6] dark:border-[#262422] text-xs">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'border-[#171615] dark:border-[#F6F4EE] text-[#171615] dark:text-[#F6F4EE] font-semibold'
                  : 'border-transparent text-[#7A756D] dark:text-[#8C867E] hover:text-[#171615] dark:hover:text-[#F6F4EE]'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>{t('adminTabOrders')}</span>
              {pendingOrders > 0 && (
                <span className="bg-[#171615] dark:bg-[#F6F4EE] text-white dark:text-[#171615] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {pendingOrders}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'border-[#171615] dark:border-[#F6F4EE] text-[#171615] dark:text-[#F6F4EE] font-semibold'
                  : 'border-transparent text-[#7A756D] dark:text-[#8C867E] hover:text-[#171615] dark:hover:text-[#F6F4EE]'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t('adminTabCatalog')} ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'border-[#171615] dark:border-[#F6F4EE] text-[#171615] dark:text-[#F6F4EE] font-semibold'
                  : 'border-transparent text-[#7A756D] dark:text-[#8C867E] hover:text-[#171615] dark:hover:text-[#F6F4EE]'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{t('adminTabSettings')}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'orders' && <OrdersManager />}
        {activeTab === 'products' && <ProductsManager />}
        {activeTab === 'settings' && <StoreSettingsView />}
      </main>

    </div>
  );
};
