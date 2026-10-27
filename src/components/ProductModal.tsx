import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, ShoppingBag, MessageCircle, Clock, Scale, Ruler, Sparkles, CheckCircle2 } from 'lucide-react';

export const ProductModal: React.FC = () => {
  const { activeProductModal, setActiveProductModal, addToCart, formatPrice, settings, t, language } = useStore();
  const [quantity, setQuantity] = useState(1);

  if (!activeProductModal) return null;

  const product = activeProductModal;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setActiveProductModal(null);
  };

  const handleDirectWhatsApp = () => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const messageText = language === 'en'
      ? `Hello! I am browsing the online collection of ${settings.shopName}. I would like to order this authentic craft:\n\n• Piece: *${product.name}*\n• Quantity: *${quantity} unit(s)*\n• Unit Price: *${formatPrice(product.priceUSD)}*\n• Master/Workshop: *${product.artisan}* (${product.region})\n\nCould you please quote international courier delivery? Thank you very much.`
      : `¡Hola! Estoy visitando el catálogo online de ${settings.shopName}. Deseo comprar la artesanía:\n\n• Pieza: *${product.name}*\n• Cantidad: *${quantity} unidad(es)*\n• Precio unitario: *${formatPrice(product.priceUSD)}*\n• Artesano/Taller: *${product.artisan}* (${product.region})\n\n¿Tienen disponibilidad y me podrían cotizar el envío internacional? Muchas gracias.`;

    const message = encodeURIComponent(messageText);
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-[#1A1918] rounded-2xl shadow-xl overflow-hidden my-8 max-h-[90vh] flex flex-col md:flex-row border border-[#EFECE6] dark:border-[#2C2926]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveProductModal(null)}
          className="absolute top-4 right-4 z-10 p-2 text-[#7A756D] dark:text-[#A8A298] hover:text-[#171615] dark:hover:text-[#F6F4EE] bg-[#FAF9F6] dark:bg-[#232120] hover:bg-white dark:hover:bg-[#2C2926] rounded-full transition-colors cursor-pointer border border-[#EAE6DE] dark:border-[#33302C]"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Side: Product Image Display */}
        <div className="md:w-1/2 bg-[#FAF9F6] dark:bg-[#141312] flex flex-col relative min-h-[300px] border-r border-[#EFECE6] dark:border-[#2C2926]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover max-h-[480px] md:max-h-none"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-white/95 dark:bg-[#1A1918]/95 backdrop-blur-md rounded-xl text-[#171615] dark:text-[#F6F4EE] border border-[#EFECE6] dark:border-[#2C2926] shadow-xs">
            <div className="flex items-center gap-2 text-xs font-medium text-[#8E785C]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{product.culturalHeritage}</span>
            </div>
            <p className="text-[11px] text-[#7A756D] dark:text-[#8C867E] mt-0.5 font-normal">
              {product.region}
            </p>
          </div>
        </div>

        {/* Right Side: Narrative Details & Purchase Panel */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-white dark:bg-[#1A1918]">
          <div>
            <div className="text-xs text-[#7A756D] dark:text-[#8C867E] font-normal">
              <span>{product.categoryLabel}</span>
              <span className="mx-2">·</span>
              <span>{product.region}</span>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-normal text-[#171615] dark:text-[#F6F4EE] mt-1">
              {product.name}
            </h2>

            <div className="mt-2.5 text-xs text-[#5C5750] dark:text-[#A8A298] bg-[#FAF9F6] dark:bg-[#232120] p-3 rounded-lg border border-[#EFECE6] dark:border-[#2C2926]">
              <span className="font-medium text-[#171615] dark:text-[#F6F4EE]">{t('artisanCreator')} </span>
              {product.artisan}
              {product.artisanBio && (
                <p className="mt-1 text-[#6B665E] dark:text-[#8C867E] italic font-serif text-sm">
                  "{product.artisanBio}"
                </p>
              )}
            </div>

            {/* Cultural Story */}
            <div className="mt-4">
              <h4 className="text-[11px] font-semibold text-[#171615] dark:text-[#F6F4EE] uppercase tracking-wider">
                {t('culturalStoryTitle')}
              </h4>
              <p className="text-xs sm:text-sm text-[#5C5750] dark:text-[#A8A298] mt-1.5 leading-relaxed font-normal">
                {product.fullStory}
              </p>
            </div>

            {/* Technical Specs */}
            <div className="mt-5 grid grid-cols-3 gap-2.5 pt-4 border-t border-[#F5F2EB] dark:border-[#262422] text-xs">
              <div className="p-2.5 bg-[#FAF9F6] dark:bg-[#232120] rounded-lg border border-[#EFECE6] dark:border-[#2C2926]">
                <div className="flex items-center gap-1 text-[#7A756D] dark:text-[#8C867E] mb-1">
                  <Ruler className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-medium uppercase">{t('dimensionsLabel')}</span>
                </div>
                <span className="font-medium text-[#171615] dark:text-[#F6F4EE] block truncate">{product.dimensions}</span>
              </div>

              <div className="p-2.5 bg-[#FAF9F6] dark:bg-[#232120] rounded-lg border border-[#EFECE6] dark:border-[#2C2926]">
                <div className="flex items-center gap-1 text-[#7A756D] dark:text-[#8C867E] mb-1">
                  <Scale className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-medium uppercase">{t('shippingWeightLabel')}</span>
                </div>
                <span className="font-medium text-[#171615] dark:text-[#F6F4EE] block tabular-nums">{product.weightKg} kg</span>
              </div>

              <div className="p-2.5 bg-[#FAF9F6] dark:bg-[#232120] rounded-lg border border-[#EFECE6] dark:border-[#2C2926]">
                <div className="flex items-center gap-1 text-[#7A756D] dark:text-[#8C867E] mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-medium uppercase">{t('craftDaysLabel')}</span>
                </div>
                <span className="font-medium text-[#171615] dark:text-[#F6F4EE] block tabular-nums">{product.craftTimeDays} {t('daysUnit')}</span>
              </div>
            </div>

            {/* Materials Breakdown */}
            <div className="mt-4">
              <span className="text-[11px] font-semibold text-[#171615] dark:text-[#F6F4EE] block mb-1">
                {t('materialsTitle')}
              </span>
              <ul className="space-y-1 text-xs text-[#5C5750] dark:text-[#A8A298]">
                {product.materials.map((mat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4A7C59] shrink-0" />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pricing & Checkout Actions */}
          <div className="mt-6 pt-5 border-t border-[#F5F2EB] dark:border-[#262422]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="block text-xs text-[#7A756D] dark:text-[#8C867E] font-normal">{t('exportPriceLabel')}</span>
                <span className="font-serif text-3xl font-normal text-[#171615] dark:text-[#F6F4EE] tabular-nums">
                  {formatPrice(product.priceUSD)}
                </span>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center border border-[#EAE6DE] dark:border-[#33302C] rounded-lg overflow-hidden bg-[#FAF9F6] dark:bg-[#232120]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-[#5C5750] dark:text-[#A8A298] hover:bg-white dark:hover:bg-[#2C2926] transition-colors cursor-pointer font-bold"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-sm font-medium text-[#171615] dark:text-[#F6F4EE] tabular-nums min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-1.5 text-[#5C5750] dark:text-[#A8A298] hover:bg-white dark:hover:bg-[#2C2926] transition-colors cursor-pointer font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-[#FAF9F6] dark:bg-[#232120] hover:bg-white dark:hover:bg-[#2C2926] text-[#171615] dark:text-[#F6F4EE] border border-[#EAE6DE] dark:border-[#33302C] text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#8E785C]" />
                <span>{t('addToCartBtn')}</span>
              </button>

              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-[#171615] hover:bg-[#2C2A28] dark:bg-[#F6F4EE] dark:text-[#171615] dark:hover:bg-white text-white text-xs font-medium rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#4AE384]" />
                <span>{t('orderWhatsAppBtn')}</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
