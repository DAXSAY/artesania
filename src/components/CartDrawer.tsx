import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, MessageCircle, Globe } from 'lucide-react';
import { POPULAR_COUNTRIES } from '../data/initialData';
import { OrderItem } from '../types';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotalUSD,
    formatPrice,
    createOrder,
    settings,
    t,
    language,
  } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [destinationCountry, setDestinationCountry] = useState('Estados Unidos');
  const [destinationCity, setDestinationCity] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCartOpen) return null;

  // Shipping calculation
  const isFreeShipping = cartSubtotalUSD >= settings.freeShippingThresholdUSD;
  const shippingCostUSD = cart.length === 0 ? 0 : isFreeShipping ? 0 : settings.shippingFlatRateUSD;
  const totalUSD = cartSubtotalUSD + shippingCostUSD;
  const totalWeightKg = cart.reduce((sum, item) => sum + (item.product.weightKg * item.quantity), 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!customerName.trim() || !customerPhone.trim() || !destinationCity.trim()) {
      alert(language === 'en' ? 'Please fill in your name, WhatsApp/phone, and destination city.' : 'Por favor complete su nombre, WhatsApp/teléfono y ciudad de destino.');
      return;
    }

    setIsSubmitting(true);

    const orderItems: OrderItem[] = cart.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      productImage: item.product.image,
      quantity: item.quantity,
      unitPriceUSD: item.product.priceUSD,
      artisan: item.product.artisan,
      region: item.product.region,
      weightKg: item.product.weightKg,
    }));

    // Create the order in app database / storage
    const newOrder = createOrder({
      customerName,
      customerEmail: customerEmail || 'no-email@turista.com',
      customerPhone,
      destinationCountry,
      destinationCity,
      destinationAddress: destinationAddress || (language === 'en' ? 'To coordinate via WhatsApp' : 'A coordinar por WhatsApp'),
      postalCode: postalCode || 'N/A',
      items: orderItems,
      subtotalUSD: cartSubtotalUSD,
      shippingEstimatedUSD: shippingCostUSD,
      totalUSD,
      notes,
    });

    // Build the visual receipt URL
    const appBaseUrl = window.location.origin + window.location.pathname;
    const visualOrderUrl = `${appBaseUrl}?order=${newOrder.id}`;

    // Prepare structured WhatsApp text
    const cleanSellerPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    
    let itemsText = '';
    cart.forEach((item, index) => {
      itemsText += `\n${index + 1}. *${item.product.name}* (x${item.quantity})\n   • Price: $${item.product.priceUSD.toFixed(2)} USD ea\n   • Artisan: ${item.product.artisan} (${item.product.region})`;
    });

    const message = encodeURIComponent(
      `🏛️ *NUEVO PEDIDO TURÍSTICO / NEW ARTISAN ORDER*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📦 *Order ID:* ${newOrder.id}\n` +
      `👤 *Customer / Cliente:* ${customerName}\n` +
      `📱 *WhatsApp / Phone:* ${customerPhone}\n` +
      `🌍 *Destination / Destino:* ${destinationCity}, ${destinationCountry} (ZIP: ${postalCode || 'N/A'})\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `🛍️ *PIECES / PRODUCTOS:*${itemsText}\n\n` +
      `⚖️ *Total Weight / Peso:* ${totalWeightKg.toFixed(2)} kg\n` +
      `💵 *Subtotal:* $${cartSubtotalUSD.toFixed(2)} USD\n` +
      `✈️ *DHL Express Shipping:* ${shippingCostUSD === 0 ? 'FREE!' : `$${shippingCostUSD.toFixed(2)} USD`}\n` +
      `💰 *ESTIMATED TOTAL:* $${totalUSD.toFixed(2)} USD\n` +
      (notes ? `📝 *Notes:* ${notes}\n` : '') +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `🖼️ *VISUAL PHOTO SPEC SHEET / FICHA TÉCNICA CON FOTOS:*\n` +
      `${visualOrderUrl}\n\n` +
      `_Hello Don ${settings.sellerName}, I would like to coordinate payment and courier shipment for my order. Thank you!_`
    );

    // Close the cart drawer
    setIsCartOpen(false);
    setIsSubmitting(false);

    // Open WhatsApp in new tab
    const waUrl = `https://wa.me/${cleanSellerPhone}?text=${message}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 dark:bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-lg bg-white dark:bg-[#1A1918] h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#EFECE6] dark:border-[#2C2926]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header in soft bone */}
        <div className="p-5 border-b border-[#EFECE6] dark:border-[#2C2926] flex items-center justify-between bg-[#FAF9F6] dark:bg-[#161514]">
          <div>
            <h3 className="font-serif text-xl font-normal text-[#171615] dark:text-[#F6F4EE]">
              {t('cartTitle')}
            </h3>
            <p className="text-xs text-[#7A756D] dark:text-[#8C867E] font-medium">
              {cart.length === 0 ? t('cartEmptyTitle') : `${cart.length} ${language === 'en' ? 'piece(s) in bag' : 'tipo(s) de artesanía en lista'}`}
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-[#7A756D] dark:text-[#8C867E] hover:text-[#171615] dark:hover:text-[#F6F4EE] rounded-md hover:bg-[#EFECE6] dark:hover:bg-[#232120] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-white dark:bg-[#1A1918]">
          {cart.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-14 h-14 bg-[#FAF9F6] dark:bg-[#232120] border border-[#EAE6DE] dark:border-[#33302C] rounded-full flex items-center justify-center mx-auto mb-4 text-[#8C867E]">
                <Globe className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-normal text-[#171615] dark:text-[#F6F4EE]">
                {t('cartEmptyTitle')}
              </h4>
              <p className="text-xs text-[#7A756D] dark:text-[#8C867E] mt-1 max-w-xs mx-auto">
                {t('cartEmptySubtitle')}
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="mt-5 px-5 py-2.5 text-xs font-semibold text-white bg-[#171615] dark:bg-[#F6F4EE] dark:text-[#171615] rounded-md hover:bg-[#2F2C27] dark:hover:bg-white transition-colors"
              >
                {t('heroCtaCollection')}
              </button>
            </div>
          ) : (
            <>
              {/* Product items list */}
              <div className="space-y-3">
                <span className="text-[11px] font-semibold text-[#8C867E] uppercase tracking-wider block">
                  {t('cartSelectedPieces')}
                </span>
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3 p-3 bg-[#FAF9F6] dark:bg-[#232120] rounded-xl border border-[#EDE9E1] dark:border-[#2C2926] items-center"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover bg-white dark:bg-[#1A1918] shrink-0 border border-[#EAE6DE] dark:border-[#33302C]"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-medium text-[#171615] dark:text-[#F6F4EE] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#7A756D] dark:text-[#8C867E] truncate">
                        {item.product.artisan} · {item.product.region}
                      </p>
                      <p className="text-xs font-semibold text-[#171615] dark:text-[#F6F4EE] mt-1 tabular-nums">
                        {formatPrice(item.product.priceUSD)} {t('eachUnit')}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <div className="flex items-center border border-[#DDD8CE] dark:border-[#33302C] rounded bg-white dark:bg-[#1A1918] text-xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-[#5C5750] dark:text-[#A8A298] hover:bg-[#FAF9F6] dark:hover:bg-[#2C2926] cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 font-bold tabular-nums text-[#171615] dark:text-[#F6F4EE]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-[#5C5750] dark:text-[#A8A298] hover:bg-[#FAF9F6] dark:hover:bg-[#2C2926] cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#9E978C] hover:text-[#C53B3B] text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>{t('removeBtn')}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Form for Tourist / Client */}
              <form id="order-form" onSubmit={handleSubmitOrder} className="space-y-4 pt-4 border-t border-[#F0ECE4] dark:border-[#262422]">
                <span className="text-xs font-semibold text-[#171615] dark:text-[#F6F4EE] uppercase tracking-wider block">
                  {t('shippingDataTitle')}
                </span>

                <div>
                  <label className="block text-xs font-medium text-[#5C5750] dark:text-[#A8A298] mb-1">
                    {t('fullNameLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Michael Smith / Hiroshi Tanaka"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#DDD8CE] dark:border-[#33302C] rounded-lg bg-[#FAF9F6] dark:bg-[#232120] text-[#171615] dark:text-[#F6F4EE] focus:bg-white dark:focus:bg-[#1A1918] focus:outline-none focus:ring-1 focus:ring-[#171615] dark:focus:ring-[#8E785C]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#5C5750] dark:text-[#A8A298] mb-1">
                      {t('phoneLabel')}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (415) 890 2341"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#DDD8CE] dark:border-[#33302C] rounded-lg bg-[#FAF9F6] dark:bg-[#232120] text-[#171615] dark:text-[#F6F4EE] focus:bg-white dark:focus:bg-[#1A1918] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5C5750] dark:text-[#A8A298] mb-1">
                      {t('emailLabel')}
                    </label>
                    <input
                      type="email"
                      placeholder="client@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#DDD8CE] dark:border-[#33302C] rounded-lg bg-[#FAF9F6] dark:bg-[#232120] text-[#171615] dark:text-[#F6F4EE] focus:bg-white dark:focus:bg-[#1A1918] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#5C5750] dark:text-[#A8A298] mb-1">
                      {t('destinationCountryLabel')}
                    </label>
                    <select
                      value={destinationCountry}
                      onChange={(e) => setDestinationCountry(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#DDD8CE] dark:border-[#33302C] rounded-lg bg-[#FAF9F6] dark:bg-[#232120] text-[#171615] dark:text-[#F6F4EE] focus:outline-none cursor-pointer"
                    >
                      {POPULAR_COUNTRIES.map((country) => (
                        <option key={country} value={country} className="dark:bg-[#1A1918]">
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5C5750] dark:text-[#A8A298] mb-1">
                      {t('cityLabel')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. New York, NY / Tokyo"
                      value={destinationCity}
                      onChange={(e) => setDestinationCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#DDD8CE] dark:border-[#33302C] rounded-lg bg-[#FAF9F6] dark:bg-[#232120] text-[#171615] dark:text-[#F6F4EE] focus:bg-white dark:focus:bg-[#1A1918] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-[#5C5750] dark:text-[#A8A298] mb-1">
                      {t('addressLabel')}
                    </label>
                    <input
                      type="text"
                      placeholder="Street, apartment"
                      value={destinationAddress}
                      onChange={(e) => setDestinationAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#DDD8CE] dark:border-[#33302C] rounded-lg bg-[#FAF9F6] dark:bg-[#232120] text-[#171615] dark:text-[#F6F4EE] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5C5750] dark:text-[#A8A298] mb-1">
                      {t('postalCodeLabel')}
                    </label>
                    <input
                      type="text"
                      placeholder="94111"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#DDD8CE] dark:border-[#33302C] rounded-lg bg-[#FAF9F6] dark:bg-[#232120] text-[#171615] dark:text-[#F6F4EE] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5C5750] dark:text-[#A8A298] mb-1">
                    {t('notesLabel')}
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Gift wrapping, special packaging, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#DDD8CE] dark:border-[#33302C] rounded-lg bg-[#FAF9F6] dark:bg-[#232120] text-[#171615] dark:text-[#F6F4EE] focus:outline-none"
                  />
                </div>
              </form>
            </>
          )}
        </div>

        {/* Drawer Footer in soft bone */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#EFECE6] dark:border-[#2C2926] bg-[#FAF9F6] dark:bg-[#161514] space-y-3">
            <div className="space-y-1.5 text-xs text-[#5C5750] dark:text-[#A8A298]">
              <div className="flex justify-between">
                <span>{t('subtotalLabel')}</span>
                <span className="font-medium text-[#171615] dark:text-[#F6F4EE] tabular-nums">
                  {formatPrice(cartSubtotalUSD)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{t('shippingCourierLabel')} ({destinationCountry}):</span>
                <span className="font-medium text-[#171615] dark:text-[#F6F4EE] tabular-nums">
                  {shippingCostUSD === 0 ? (
                    <span className="text-[#3F7552] dark:text-[#4AE384] font-semibold">{t('freeShippingBadge')}</span>
                  ) : (
                    formatPrice(shippingCostUSD)
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#EAE6DE] dark:border-[#2C2926] text-sm font-semibold text-[#171615] dark:text-[#F6F4EE]">
                <span className="font-serif text-base">{t('totalEstimatedLabel')}</span>
                <span className="font-serif text-lg tabular-nums">
                  {formatPrice(totalUSD)}
                </span>
              </div>
            </div>

            <div className="pt-1">
              <button
                type="submit"
                form="order-form"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#171615] hover:bg-[#2C2A28] dark:bg-[#F6F4EE] dark:text-[#171615] dark:hover:bg-white text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#4AE384] dark:text-[#2D5A3E]" />
                <span>{t('sendWhatsAppBtn')}</span>
              </button>
            </div>

            <p className="text-[11px] text-[#7A756D] dark:text-[#8C867E] text-center leading-tight font-normal">
              {t('cartDisclaimer')}
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
