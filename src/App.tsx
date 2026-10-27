import React, { useState, useMemo } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderReceiptModal } from './components/OrderReceiptModal';
import { HeritageSection } from './components/HeritageSection';
import { ShippingTrustSection } from './components/ShippingTrustSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Search, Sparkles, Check } from 'lucide-react';
import { ARTISAN_REGIONS } from './data/initialData';

const StoreContent: React.FC = () => {
  const { products, activeView, toast, t, language } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesRegion = selectedRegion === 'all' || p.region.includes(selectedRegion);
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.artisan.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesRegion && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
        if (sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedRegion, searchQuery, sortBy]);

  const categories = [
    { id: 'all', label: t('catAll') },
    { id: 'textiles', label: t('catTextiles') },
    { id: 'ceramics', label: t('catCeramics') },
    { id: 'jewelry', label: t('catJewelry') },
    { id: 'woodwork', label: t('catWoodwork') },
    { id: 'basketry', label: t('catBasketry') },
    { id: 'sculpture', label: t('catSculpture') },
  ];

  const regionOptions = [
    { id: 'all', label: t('allOrigins') },
    { id: 'Cusco', label: 'Cusco & Valle Sagrado' },
    { id: 'Ayacucho', label: 'Ayacucho' },
    { id: 'Puno', label: 'Puno & Altiplano' },
    { id: 'Piura', label: 'Piura (Chulucanas & Catacaos)' },
  ];

  if (activeView === 'admin') {
    return (
      <div className="min-h-screen bg-[#FDFDFC] dark:bg-[#121110] transition-colors">
        <Navbar />
        <AdminDashboard />
        <OrderReceiptModal />
        <ProductModal />
        
        {/* Toast */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#171615] dark:bg-[#F6F4EE] text-[#FAF9F6] dark:text-[#171615] px-4 py-3 rounded-xl shadow-lg border border-[#3A3733] dark:border-[#DDD8CE] text-xs flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-[#4AE384] dark:text-[#2D5A3E] shrink-0" />
            <span>{toast}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFC] dark:bg-[#121110] flex flex-col justify-between transition-colors">
      <Navbar />

      <main className="flex-1">
        <Hero />

        {/* Catalog Section */}
        <section id="catalogo" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#EFECE6] dark:border-[#262422]">
            <div>
              <span className="text-[11px] font-medium text-[#7A756D] dark:text-[#8C867E] uppercase tracking-[0.25em] block mb-1">
                {t('catalogEyebrow')}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#171615] dark:text-[#F6F4EE] tracking-tight">
                {t('catalogTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-[#5C5750] dark:text-[#A8A298] mt-1 max-w-lg font-normal">
                {t('catalogDescription')}
              </p>
            </div>

            {/* Search and Sort controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[240px]">
                <Search className="w-3.5 h-3.5 text-[#8C867E] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#EAE6DE] dark:border-[#33302C] rounded-lg bg-[#FAF9F6] dark:bg-[#1A1918] text-[#171615] dark:text-[#F6F4EE] focus:bg-white dark:focus:bg-[#232120] focus:outline-none focus:ring-1 focus:ring-[#171615] dark:focus:ring-[#8E785C]"
                />
              </div>

              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-3 py-2 text-xs border border-[#EAE6DE] dark:border-[#33302C] rounded-lg bg-[#FAF9F6] dark:bg-[#1A1918] text-[#171615] dark:text-[#F6F4EE] focus:outline-none cursor-pointer"
              >
                {regionOptions.map((region) => (
                  <option key={region.id} value={region.id} className="dark:bg-[#1A1918]">
                    {region.label}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 text-xs border border-[#EAE6DE] dark:border-[#33302C] rounded-lg bg-[#FAF9F6] dark:bg-[#1A1918] text-[#171615] dark:text-[#F6F4EE] focus:outline-none cursor-pointer"
              >
                <option value="featured" className="dark:bg-[#1A1918]">{t('sortFeatured')}</option>
                <option value="price-asc" className="dark:bg-[#1A1918]">{t('sortPriceAsc')}</option>
                <option value="price-desc" className="dark:bg-[#1A1918]">{t('sortPriceDesc')}</option>
              </select>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#171615] text-[#FAF9F6] dark:bg-[#F6F4EE] dark:text-[#171615] shadow-xs'
                    : 'bg-[#FAF9F6] dark:bg-[#1A1918] text-[#5C5750] dark:text-[#A8A298] border border-[#EAE6DE] dark:border-[#2C2926] hover:bg-white dark:hover:bg-[#232120]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-[#1A1918] rounded-2xl border border-[#EFECE6] dark:border-[#262422]">
              <Sparkles className="w-10 h-10 text-[#C9C4B8] dark:text-[#57534D] mx-auto mb-3" />
              <h3 className="font-serif text-lg font-normal text-[#171615] dark:text-[#F6F4EE]">
                {t('noProductsTitle')}
              </h3>
              <p className="text-xs text-[#7A756D] dark:text-[#8C867E] mt-1 font-normal">
                {t('noProductsSubtitle')}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedRegion('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-[#171615] text-white dark:bg-[#F6F4EE] dark:text-[#171615] text-xs font-medium rounded-lg hover:bg-[#2C2A28] dark:hover:bg-white cursor-pointer"
              >
                {t('resetFilters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </section>

        <HeritageSection />
        <ShippingTrustSection />
      </main>

      <Footer />

      {/* Global Interactive Drawers & Modals */}
      <CartDrawer />
      <ProductModal />
      <OrderReceiptModal />

      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#171615] dark:bg-[#F6F4EE] text-[#FAF9F6] dark:text-[#171615] px-4 py-3 rounded-xl shadow-lg border border-[#3A3733] dark:border-[#DDD8CE] text-xs flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-[#4AE384] dark:text-[#2D5A3E] shrink-0" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  );
}
