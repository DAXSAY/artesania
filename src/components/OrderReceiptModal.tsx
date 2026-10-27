import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, CheckCircle, MessageCircle, Printer, Globe, Copy } from 'lucide-react';

export const OrderReceiptModal: React.FC = () => {
  const {
    selectedOrderForReceipt,
    setSelectedOrderForReceipt,
    formatPrice,
    settings,
    showToast,
    t,
    language,
  } = useStore();

  if (!selectedOrderForReceipt) return null;

  const order = selectedOrderForReceipt;

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}?order=${order.id}`;
    navigator.clipboard.writeText(url);
    showToast(language === 'en' ? 'Order spec sheet link copied to clipboard' : 'Enlace de la Ficha copiado al portapapeles');
  };

  const handleOpenWhatsAppChat = () => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const messageText = language === 'en'
      ? `Hello! I am reviewing the Photo Specification Sheet for order ${order.id} under ${order.customerName} (${order.destinationCountry}). I would like to confirm status and payment.`
      : `¡Hola! Estoy revisando la Ficha Técnica con Fotos del pedido ${order.id} a nombre de ${order.customerName} (${order.destinationCountry}). Deseo confirmar el estado.`;

    const message = encodeURIComponent(messageText);
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return t('statusPending');
      case 'in_preparation': return t('statusInPrep');
      case 'shipped': return t('statusShipped');
      case 'delivered': return t('statusDelivered');
      case 'cancelled': return t('statusCancelled');
      default: return status;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-[#1A1918] rounded-2xl shadow-xl border border-[#EFECE6] dark:border-[#2C2926] overflow-hidden my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header in soft Bone & White */}
        <div className="bg-[#FAF9F6] dark:bg-[#161514] border-b border-[#EFECE6] dark:border-[#2C2926] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white dark:bg-[#232120] border border-[#EAE6DE] dark:border-[#33302C] flex items-center justify-center text-[#171615] dark:text-[#F6F4EE]">
              <CheckCircle className="w-5 h-5 text-[#3F7552] dark:text-[#4AE384]" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8E785C] font-semibold block">
                {t('receiptEyebrow')}
              </span>
              <h2 className="font-serif text-2xl font-normal tracking-tight text-[#171615] dark:text-[#F6F4EE]">
                {t('receiptOrder')} {order.id}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              title="Copy link"
              className="px-2.5 py-1.5 text-[#5C5750] dark:text-[#A8A298] hover:text-[#171615] dark:hover:text-[#F6F4EE] bg-white dark:bg-[#232120] hover:bg-[#F5F2EB] dark:hover:bg-[#2C2926] border border-[#EAE6DE] dark:border-[#33302C] rounded-md text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('copyLinkBtn')}</span>
            </button>

            <button
              onClick={() => window.print()}
              title="Print"
              className="px-2.5 py-1.5 text-[#5C5750] dark:text-[#A8A298] hover:text-[#171615] dark:hover:text-[#F6F4EE] bg-white dark:bg-[#232120] hover:bg-[#F5F2EB] dark:hover:bg-[#2C2926] border border-[#EAE6DE] dark:border-[#33302C] rounded-md text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('printBtn')}</span>
            </button>

            <button
              onClick={() => setSelectedOrderForReceipt(null)}
              className="p-1.5 text-[#7A756D] dark:text-[#8C867E] hover:text-[#171615] dark:hover:text-[#F6F4EE] rounded-md hover:bg-white dark:hover:bg-[#232120] border border-transparent hover:border-[#EAE6DE] dark:hover:border-[#33302C] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 bg-white dark:bg-[#1A1918]">
          
          {/* Status banner in subtle bone */}
          <div className="p-4 bg-[#FAF9F6] dark:bg-[#232120] border border-[#EFECE6] dark:border-[#2C2926] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-medium text-[#171615] dark:text-[#F6F4EE]">{t('statusLabel')} </span>
              <span className="font-semibold uppercase tracking-wider text-[#8E785C]">
                {getStatusText(order.status)}
              </span>
              {order.trackingNumber && (
                <p className="text-[#5C5750] dark:text-[#A8A298] mt-1">
                  DHL Tracking: <span className="font-mono font-medium text-[#171615] dark:text-[#F6F4EE]">{order.trackingNumber}</span> ({order.carrier || 'DHL Express'})
                </p>
              )}
            </div>

            <div className="text-[11px] text-[#8C867E]">
              {new Date(order.createdAt).toLocaleString(language === 'en' ? 'en-US' : 'es-ES', { dateStyle: 'medium', timeStyle: 'short' })}
            </div>
          </div>

          {/* Customer & Destination Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-[#FAF9F6] dark:bg-[#232120] rounded-xl border border-[#EFECE6] dark:border-[#2C2926]">
              <span className="font-medium text-[#8C867E] block mb-2 uppercase text-[10px] tracking-wider">
                {t('buyerInfoTitle')}
              </span>
              <p className="font-medium text-[#171615] dark:text-[#F6F4EE] text-sm">{order.customerName}</p>
              <p className="text-[#5C5750] dark:text-[#A8A298] mt-0.5">📱 {order.customerPhone}</p>
              <p className="text-[#7A756D] dark:text-[#8C867E]">{order.customerEmail}</p>
            </div>

            <div className="p-4 bg-[#FAF9F6] dark:bg-[#232120] rounded-xl border border-[#EFECE6] dark:border-[#2C2926]">
              <span className="font-medium text-[#8C867E] block mb-2 uppercase text-[10px] tracking-wider">
                {t('intlDestinationTitle')}
              </span>
              <p className="font-medium text-[#171615] dark:text-[#F6F4EE] text-sm flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#8E785C]" />
                <span>{order.destinationCountry}</span>
              </p>
              <p className="text-[#5C5750] dark:text-[#A8A298] mt-0.5">{order.destinationCity} · ZIP: {order.postalCode}</p>
              <p className="text-[#7A756D] dark:text-[#8C867E] text-[11px]">{order.destinationAddress}</p>
            </div>
          </div>

          {/* Photographic Inventory Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-serif text-lg font-normal text-[#171615] dark:text-[#F6F4EE]">
                {t('photoInventoryTitle')}
              </span>
              <span className="text-xs text-[#7A756D] dark:text-[#8C867E] font-normal">
                {order.items.length} {language === 'en' ? 'item(s)' : 'modelo(s)'}
              </span>
            </div>

            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white dark:bg-[#1A1918] border border-[#EFECE6] dark:border-[#2C2926] rounded-xl"
                >
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover bg-[#FAF9F6] dark:bg-[#232120] shrink-0 border border-[#EAE6DE] dark:border-[#33302C]"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <span className="text-[10px] uppercase font-semibold text-[#8E785C]">
                      #{idx + 1} · {item.region}
                    </span>
                    <h4 className="font-serif text-base sm:text-lg font-normal text-[#171615] dark:text-[#F6F4EE] mt-0.5">
                      {item.productName}
                    </h4>
                    <p className="text-xs text-[#5C5750] dark:text-[#A8A298] mt-0.5">
                      {t('byArtisan')} <span className="font-medium text-[#171615] dark:text-[#F6F4EE]">{item.artisan}</span>
                    </p>
                    <p className="text-xs text-[#7A756D] dark:text-[#8C867E] mt-1">
                      {t('shippingWeightLabel')}: <span className="tabular-nums">{item.weightKg} kg</span>
                    </p>
                  </div>

                  <div className="text-center sm:text-right shrink-0">
                    <span className="text-xs text-[#7A756D] dark:text-[#8C867E] block">
                      {item.quantity} × {formatPrice(item.unitPriceUSD)}
                    </span>
                    <span className="font-serif text-lg font-normal text-[#171615] dark:text-[#F6F4EE] tabular-nums">
                      {formatPrice(item.quantity * item.unitPriceUSD)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="p-4 bg-[#FAF9F6] dark:bg-[#232120] rounded-xl border border-[#EFECE6] dark:border-[#2C2926] space-y-2 text-xs">
            <div className="flex justify-between text-[#5C5750] dark:text-[#A8A298]">
              <span>{t('subtotalLabel')}</span>
              <span className="font-medium text-[#171615] dark:text-[#F6F4EE] tabular-nums">{formatPrice(order.subtotalUSD)}</span>
            </div>
            <div className="flex justify-between text-[#5C5750] dark:text-[#A8A298]">
              <span>{t('shippingCourierLabel')}:</span>
              <span className="font-medium text-[#171615] dark:text-[#F6F4EE] tabular-nums">
                {order.shippingEstimatedUSD === 0 ? (language === 'en' ? 'Free Courier Delivery' : 'Envío Gratuito') : formatPrice(order.shippingEstimatedUSD)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-semibold text-[#171615] dark:text-[#F6F4EE] pt-2 border-t border-[#EAE6DE] dark:border-[#33302C]">
              <span className="font-serif text-base font-normal">{t('totalToSettle')}</span>
              <span className="font-serif text-xl font-normal tabular-nums">{formatPrice(order.totalUSD)}</span>
            </div>
          </div>

          {order.notes && (
            <div className="p-3 bg-[#FAF9F6] dark:bg-[#232120] border border-[#EFECE6] dark:border-[#2C2926] rounded-lg text-xs text-[#5C5750] dark:text-[#A8A298]">
              <span className="font-medium text-[#171615] dark:text-[#F6F4EE]">{t('notesLabel')}: </span>
              {order.notes}
            </div>
          )}

        </div>

        {/* Modal Action Footer */}
        <div className="p-5 border-t border-[#EFECE6] dark:border-[#2C2926] bg-[#FAF9F6] dark:bg-[#161514] flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-[#7A756D] dark:text-[#8C867E]">
            {language === 'en' ? 'Direct follow-up via official WhatsApp:' : 'Coordinación y confirmación directa por WhatsApp oficial:'}
          </p>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleOpenWhatsAppChat}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#171615] hover:bg-[#2C2A28] dark:bg-[#F6F4EE] dark:text-[#171615] dark:hover:bg-white text-white text-xs font-medium rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#4AE384] dark:text-[#2D5A3E]" />
              <span>{t('chatOrderWhatsApp')}</span>
            </button>
            <button
              onClick={() => setSelectedOrderForReceipt(null)}
              className="px-4 py-2.5 bg-white dark:bg-[#232120] hover:bg-[#FAF9F6] dark:hover:bg-[#2C2926] text-[#171615] dark:text-[#F6F4EE] border border-[#EAE6DE] dark:border-[#33302C] text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              {t('closeBtn')}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
