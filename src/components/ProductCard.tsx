import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Eye, ShoppingBag, Sparkles, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { formatPrice, addToCart, setActiveProductModal, settings, t, language } = useStore();

  const handleQuickWhatsAppInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const messageText = language === 'en'
      ? `Hello! I am interested in the authentic craft "${product.name}" (${formatPrice(product.priceUSD)}) from ${product.region}. Is it available for international delivery? Thank you.`
      : `¡Hola! Me interesa la pieza artesanal "${product.name}" (${formatPrice(product.priceUSD)}) de ${product.region}. ¿Está disponible para envío internacional? Muchas gracias.`;

    const message = encodeURIComponent(messageText);
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <div
      onClick={() => setActiveProductModal(product)}
      className="group flex flex-col bg-white dark:bg-[#1A1918] rounded-xl border border-[#EFECE6] dark:border-[#262422] overflow-hidden hover:border-[#D8D3C8] dark:hover:border-[#3D3935] hover:shadow-xs transition-all duration-300 cursor-pointer"
    >
      {/* Product Image Stage (bone/stone backing) */}
      <div className="relative aspect-[4/3] bg-[#FAF9F6] dark:bg-[#141312] overflow-hidden border-b border-[#EFECE6] dark:border-[#262422]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Fallback pattern in pure bone if image fails */}
        <div className="absolute inset-0 -z-10 bg-[#FAF9F6] dark:bg-[#181716] flex flex-col items-center justify-center p-4 text-center">
          <Sparkles className="w-5 h-5 text-[#B0AAA0] mb-2" />
          <span className="font-serif text-sm font-normal text-[#171615] dark:text-[#F6F4EE]">{product.name}</span>
          <span className="text-xs text-[#7A756D] dark:text-[#8C867E] mt-1">{product.categoryLabel}</span>
        </div>

        {/* Subtle hover quick-action bar */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-white/95 dark:bg-[#1A1918]/95 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between gap-2 border-t border-[#EFECE6] dark:border-[#262422]">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveProductModal(product);
            }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2 bg-[#FAF9F6] dark:bg-[#232120] hover:bg-white dark:hover:bg-[#2C2926] text-[#171615] dark:text-[#F6F4EE] border border-[#EAE6DE] dark:border-[#33302C] text-xs font-normal rounded-md transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#6B665E] dark:text-[#A8A298]" />
            <span>{t('viewDetails')}</span>
          </button>
          
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2 bg-[#171615] hover:bg-[#2C2A28] dark:bg-[#F6F4EE] dark:text-[#171615] dark:hover:bg-white text-white text-xs font-medium rounded-md shadow-xs transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#EFECE6] dark:text-[#171615]" />
            <span>{t('addBtn')}</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Clean metadata without pill boxes */}
          <div className="flex items-center gap-2 text-[11px] text-[#7A756D] dark:text-[#8C867E] mb-1.5 font-normal">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true" className="text-[#D8D3C8] dark:text-[#3D3935]">·</span>
            <span className="truncate max-w-[140px]">{product.region}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-lg font-normal text-[#171615] dark:text-[#F6F4EE] group-hover:text-[#8E785C] transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-[#5C5750] dark:text-[#A8A298] line-clamp-2 mt-1.5 font-normal leading-relaxed">
            {product.shortDescription}
          </p>

          <div className="mt-2 text-[11px] text-[#8C867E] dark:text-[#7A756D]">
            <span className="text-[#ABA59B] dark:text-[#57534D]">{t('byArtisan')} </span>
            <span className="font-medium text-[#423E3A] dark:text-[#D4CEBF]">{product.artisan}</span>
          </div>
        </div>

        {/* Price & Primary Action Baseline */}
        <div className="mt-4 pt-3 border-t border-[#F5F2EB] dark:border-[#232120] flex items-center justify-between gap-3">
          <div>
            <span className="block text-[10px] text-[#8C867E] dark:text-[#7A756D] uppercase tracking-wider font-normal">
              {t('priceLabel')}
            </span>
            <span className="font-serif text-xl font-normal text-[#171615] dark:text-[#F6F4EE] tabular-nums">
              {formatPrice(product.priceUSD)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleQuickWhatsAppInquiry}
              title="WhatsApp inquiry"
              className="p-2 text-[#2D5A3E] dark:text-[#4AE384] bg-[#FAF9F6] dark:bg-[#1F2C24] hover:bg-white dark:hover:bg-[#25362B] border border-[#EAE6DE] dark:border-[#2C3F33] rounded-md transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="px-3.5 py-1.5 text-xs font-medium text-white bg-[#171615] hover:bg-[#2C2A28] dark:bg-[#F6F4EE] dark:text-[#171615] dark:hover:bg-white rounded-md transition-colors cursor-pointer"
            >
              {t('orderBtn')}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
