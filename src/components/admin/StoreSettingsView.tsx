import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Save, MessageCircle, Truck, Check } from 'lucide-react';

export const StoreSettingsView: React.FC = () => {
  const { settings, updateSettings, language } = useStore();

  const [shopName, setShopName] = useState(settings.shopName);
  const [sellerName, setSellerName] = useState(settings.sellerName);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [contactEmail, setContactEmail] = useState(settings.contactEmail);
  const [shopAddress, setShopAddress] = useState(settings.shopAddress);
  const [shippingFlatRateUSD, setShippingFlatRateUSD] = useState(settings.shippingFlatRateUSD);
  const [freeShippingThresholdUSD, setFreeShippingThresholdUSD] = useState(settings.freeShippingThresholdUSD);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      shopName,
      sellerName,
      whatsappNumber,
      contactEmail,
      shopAddress,
      shippingFlatRateUSD: Number(shippingFlatRateUSD),
      freeShippingThresholdUSD: Number(freeShippingThresholdUSD),
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const isEn = language === 'en';

  return (
    <div className="max-w-3xl bg-white dark:bg-[#1A1918] rounded-xl border border-[#EAE6DF] dark:border-[#262422] shadow-xs p-6 sm:p-8 space-y-6 transition-colors">
      <div>
        <h3 className="font-serif text-2xl font-normal text-[#1A1918] dark:text-[#F6F4EE]">
          {isEn ? 'Store & WhatsApp Settings' : 'Configuración de la Tienda & WhatsApp'}
        </h3>
        <p className="text-xs text-[#787267] dark:text-[#A19D94] mt-1">
          {isEn
            ? 'Adjust your phone number to receive tourist inquiries and order manifests directly to your personal or business WhatsApp.'
            : 'Ajusta tu número de contacto para recibir los pedidos internacionales directamente a tu WhatsApp personal o comercial.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        
        {/* WhatsApp Phone Config */}
        <div className="p-4 bg-[#F5F8F6] dark:bg-[#14261C] border border-[#D5E5DC] dark:border-[#20402E] rounded-xl space-y-2.5">
          <div className="flex items-center gap-2 text-[#2D5A3E] dark:text-[#6AD495] font-semibold text-xs">
            <MessageCircle className="w-4 h-4 text-[#3F7552] dark:text-[#52C581]" />
            <span>
              {isEn ? 'WhatsApp Phone for Order Inquiries' : 'Número de WhatsApp para Recepción de Pedidos'}
            </span>
          </div>
          <p className="text-[#3F7552] dark:text-[#9FD8B5] text-xs">
            {isEn
              ? 'Enter number with international country code (no + or spaces). e.g., 51987654321 (Peru) or 14158902341 (USA).'
              : 'Ingresa el número con su código de país (sin el signo + ni espacios). Por ejemplo: 51987654321 (Perú) o 14158902341 (EE. UU.).'}
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              required
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="51987654321"
              className="px-3 py-2 text-xs font-mono font-semibold text-[#1A1918] dark:text-[#F6F4EE] border border-[#C5D9CE] dark:border-[#2B543D] rounded-lg bg-white dark:bg-[#0E1A13] focus:outline-none focus:ring-1 focus:ring-[#3F7552]"
            />
          </div>
          <span className="text-[11px] text-[#4A785E] dark:text-[#88C6A1] block">
            {isEn
              ? '💡 When the tourist clicks "Send Order to WhatsApp", a chat opens to this number with the order code and live visual invoice link.'
              : '💡 Cuando el turista pulse "Enviar Pedido a WhatsApp", se abrirá una conversación hacia este número con las fotos y datos del pedido.'}
          </span>
        </div>

        {/* Store & Owner identity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-[#57534D] dark:text-[#B8B2A7] mb-1">
              {isEn ? 'Brand / Store Name' : 'Nombre de la Marca / Tienda'}
            </label>
            <input
              type="text"
              required
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-full px-3 py-2 border border-[#DDD8CE] dark:border-[#2D2A26] rounded-lg bg-[#FAF9F6] dark:bg-[#201E1C] text-[#1A1918] dark:text-[#F6F4EE] focus:bg-white dark:focus:bg-[#252321] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-[#57534D] dark:text-[#B8B2A7] mb-1">
              {isEn ? 'Owner / Master Artisan Name' : 'Nombre del Titular / Vendedor'}
            </label>
            <input
              type="text"
              required
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
              className="w-full px-3 py-2 border border-[#DDD8CE] dark:border-[#2D2A26] rounded-lg bg-[#FAF9F6] dark:bg-[#201E1C] text-[#1A1918] dark:text-[#F6F4EE] focus:bg-white dark:focus:bg-[#252321] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-[#57534D] dark:text-[#B8B2A7] mb-1">
              {isEn ? 'Contact Email' : 'Correo Electrónico de Contacto'}
            </label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full px-3 py-2 border border-[#DDD8CE] dark:border-[#2D2A26] rounded-lg bg-[#FAF9F6] dark:bg-[#201E1C] text-[#1A1918] dark:text-[#F6F4EE] focus:bg-white dark:focus:bg-[#252321] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-[#57534D] dark:text-[#B8B2A7] mb-1">
              {isEn ? 'Workshop / Studio Physical Address' : 'Dirección del Taller / Tienda Física'}
            </label>
            <input
              type="text"
              value={shopAddress}
              onChange={(e) => setShopAddress(e.target.value)}
              className="w-full px-3 py-2 border border-[#DDD8CE] dark:border-[#2D2A26] rounded-lg bg-[#FAF9F6] dark:bg-[#201E1C] text-[#1A1918] dark:text-[#F6F4EE] focus:bg-white dark:focus:bg-[#252321] focus:outline-none"
            />
          </div>
        </div>

        {/* Shipping configurations */}
        <div className="p-4 bg-[#FAF9F6] dark:bg-[#201E1C] rounded-xl border border-[#EDE9E1] dark:border-[#2A2723] space-y-4">
          <div className="flex items-center gap-2 text-[#1A1918] dark:text-[#F6F4EE] font-semibold">
            <Truck className="w-4 h-4 text-[#6E5D46] dark:text-[#CBBBB0]" />
            <span>{isEn ? 'International Shipping Rates (DHL Express)' : 'Tarifas Estimadas de Envío Internacional (DHL Express)'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-[#57534D] dark:text-[#B8B2A7] mb-1">
                {isEn ? 'Base Flat Shipping Rate (USD $)' : 'Costo Base de Envío Internacional (USD $)'}
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={shippingFlatRateUSD}
                onChange={(e) => setShippingFlatRateUSD(Number(e.target.value))}
                className="w-full px-3 py-2 border border-[#DDD8CE] dark:border-[#2D2A26] rounded-lg tabular-nums bg-white dark:bg-[#151413] text-[#1A1918] dark:text-[#F6F4EE] focus:outline-none"
              />
              <span className="text-[10px] text-[#8C867B] dark:text-[#7D766C] mt-1 block">
                {isEn ? 'Standard flat rate for North America & Europe' : 'Tarifa estándar para Norteamérica y Europa'}
              </span>
            </div>

            <div>
              <label className="block font-medium text-[#57534D] dark:text-[#B8B2A7] mb-1">
                {isEn ? 'Free Shipping Threshold (USD $)' : 'Umbral para Envío Internacional Gratuito (USD $)'}
              </label>
              <input
                type="number"
                min="0"
                step="10"
                value={freeShippingThresholdUSD}
                onChange={(e) => setFreeShippingThresholdUSD(Number(e.target.value))}
                className="w-full px-3 py-2 border border-[#DDD8CE] dark:border-[#2D2A26] rounded-lg tabular-nums bg-white dark:bg-[#151413] text-[#1A1918] dark:text-[#F6F4EE] focus:outline-none"
              />
              <span className="text-[10px] text-[#8C867B] dark:text-[#7D766C] mt-1 block">
                {isEn ? 'Orders above this subtotal qualify for complimentary shipping' : 'Pedidos mayores a este monto gozan de envío sin costo'}
              </span>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-2 flex items-center justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1A1918] dark:bg-[#F6F4EE] hover:bg-[#2F2C27] dark:hover:bg-[#EDE9E1] text-white dark:text-[#1A1918] font-medium rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#3CD070] dark:text-[#18753B]" />
                <span>{isEn ? 'Settings Saved!' : '¡Configuración Guardada!'}</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>{isEn ? 'Save Changes' : 'Guardar Cambios'}</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};
