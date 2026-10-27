import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus } from '../../types';
import { 
  Package, 
  MessageCircle, 
  Truck, 
  Search, 
  Globe, 
  Trash2, 
  Eye
} from 'lucide-react';

export const OrdersManager: React.FC = () => {
  const { 
    orders, 
    updateOrderStatus, 
    deleteOrder, 
    setSelectedOrderForReceipt, 
    formatPrice,
    language
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingTrackingId, setEditingTrackingId] = useState<string | null>(null);
  const [trackingInput, setTrackingInput] = useState('');
  const [carrierInput, setCarrierInput] = useState('DHL Express');

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.destinationCountry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.destinationCity.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleOpenClientWhatsApp = (order: Order) => {
    const cleanPhone = order.customerPhone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `¡Hola ${order.customerName}! Le saluda la administración de QALA Artesanías. Hemos recibido su pedido *${order.id}* con destino a *${order.destinationCity}, ${order.destinationCountry}*. Estamos coordinando el embalaje y despacho internacional. ¿Desea confirmar algún detalle adicional? ¡Muchas gracias!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const handleSaveTracking = (orderId: string) => {
    updateOrderStatus(orderId, 'shipped', trackingInput, carrierInput);
    setEditingTrackingId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-white dark:bg-[#1A1918] rounded-xl border border-[#EFECE6] dark:border-[#262422] shadow-xs transition-colors">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-[#8C867B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={language === 'en' ? 'Search by order ID, customer name, country (USA, Japan...) or city...' : 'Buscar por código de orden, cliente, país (EE. UU., Japón...) o ciudad...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-[#DDD8CE] dark:border-[#33302C] rounded-lg bg-[#FAF9F6] dark:bg-[#232120] text-[#171615] dark:text-[#F6F4EE] focus:bg-white dark:focus:bg-[#1A1918] focus:outline-none focus:ring-1 focus:ring-[#171615] dark:focus:ring-[#8E785C]"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          {[
            { id: 'all', label: language === 'en' ? 'All' : 'Todos' },
            { id: 'pending', label: language === 'en' ? 'Pending' : 'Pendientes' },
            { id: 'in_preparation', label: language === 'en' ? 'In Atelier' : 'En Taller' },
            { id: 'shipped', label: language === 'en' ? 'Shipped' : 'Enviados' },
            { id: 'delivered', label: language === 'en' ? 'Delivered' : 'Entregados' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-[#171615] dark:bg-[#F6F4EE] text-white dark:text-[#171615]'
                  : 'bg-[#FAF9F6] dark:bg-[#232120] text-[#6B665E] dark:text-[#A8A298] hover:bg-[#F2EFE9] dark:hover:bg-[#2C2926] border border-[#EDE9E1] dark:border-[#2C2926]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List with Photo View */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#1A1918] rounded-xl border border-[#EFECE6] dark:border-[#262422]">
          <Package className="w-10 h-10 text-[#C9C4B8] dark:text-[#57534D] mx-auto mb-3" />
          <h4 className="font-serif text-lg font-normal text-[#171615] dark:text-[#F6F4EE]">
            {language === 'en' ? 'No orders match this criteria' : 'No hay pedidos con este criterio'}
          </h4>
          <p className="text-xs text-[#787267] dark:text-[#8C867E] mt-1">
            {language === 'en' ? 'New customer orders will automatically appear here.' : 'Los nuevos pedidos realizados aparecerán aquí automáticamente.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const isEditingTracking = editingTrackingId === order.id;

            return (
              <div
                key={order.id}
                className="bg-white dark:bg-[#1A1918] rounded-xl border border-[#EFECE6] dark:border-[#262422] shadow-xs overflow-hidden transition-all hover:border-[#DDD8CE] dark:hover:border-[#33302C]"
              >
                {/* Order Top Bar in soft bone */}
                <div className="p-4 sm:p-5 bg-[#FAF9F6] dark:bg-[#161514] border-b border-[#EDE9E1] dark:border-[#262422] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-lg font-medium text-[#171615] dark:text-[#F6F4EE]">
                      {order.id}
                    </span>
                    <span className="text-xs text-[#C9C4B8] dark:text-[#57534D]">·</span>
                    <span className="text-xs text-[#787267] dark:text-[#8C867E]">
                      {new Date(order.createdAt).toLocaleString(language === 'en' ? 'en-US' : 'es-ES', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    <span className="text-xs text-[#C9C4B8] dark:text-[#57534D]">·</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#8E785C]">
                      <Globe className="w-3.5 h-3.5" />
                      {order.destinationCountry}
                    </span>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-[#787267] dark:text-[#8C867E]">
                        {language === 'en' ? 'Status:' : 'Estado:'}
                      </span>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className={`text-xs font-medium px-2.5 py-1 rounded-md border focus:outline-none cursor-pointer ${
                          order.status === 'pending'
                            ? 'bg-[#FBF9F5] dark:bg-[#23201C] text-[#8C7355] border-[#E3DFD7] dark:border-[#3D352A]'
                            : order.status === 'in_preparation'
                            ? 'bg-[#F4F7FB] dark:bg-[#1C232B] text-[#2C5282] dark:text-[#63B3ED] border-[#DCE4EC] dark:border-[#2B394A]'
                            : order.status === 'shipped'
                            ? 'bg-[#F9F5FB] dark:bg-[#261E2E] text-[#6B46C1] dark:text-[#B794F4] border-[#E9D8FD] dark:border-[#3B2C47]'
                            : order.status === 'delivered'
                            ? 'bg-[#F2F7F4] dark:bg-[#1B2920] text-[#2D5A3E] dark:text-[#68D391] border-[#D5E5DC] dark:border-[#2C4233]'
                            : 'bg-[#FAF9F6] dark:bg-[#232120] text-[#736E65] border-[#EDE9E1] dark:border-[#2C2926]'
                        }`}
                      >
                        <option value="pending" className="dark:bg-[#1A1918]">⏳ {language === 'en' ? 'Awaiting Payment' : 'Pendiente de Pago'}</option>
                        <option value="in_preparation" className="dark:bg-[#1A1918]">🛠️ {language === 'en' ? 'In Atelier' : 'En Taller / Embalaje'}</option>
                        <option value="shipped" className="dark:bg-[#1A1918]">✈️ {language === 'en' ? 'Shipped / Dispatched' : 'Despachado / Enviado'}</option>
                        <option value="delivered" className="dark:bg-[#1A1918]">✅ {language === 'en' ? 'Delivered' : 'Entregado'}</option>
                        <option value="cancelled" className="dark:bg-[#1A1918]">❌ {language === 'en' ? 'Cancelled' : 'Cancelado'}</option>
                      </select>
                    </div>

                    <button
                      onClick={() => deleteOrder(order.id)}
                      title="Eliminar orden"
                      className="p-1.5 text-[#9E978C] hover:text-[#C53B3B] rounded-md hover:bg-white dark:hover:bg-[#232120] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Order Body: Customer & Requested Crafts with Photographs */}
                <div className="p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left: Customer & Address Details */}
                  <div className="lg:col-span-4 space-y-3 text-xs border-r-0 lg:border-r border-[#EDE9E1] dark:border-[#262422] pr-0 lg:pr-6">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#8C867B] dark:text-[#7A756D] tracking-wider block">
                        {language === 'en' ? 'International Customer' : 'Cliente Internacional'}
                      </span>
                      <p className="font-semibold text-[#171615] dark:text-[#F6F4EE] text-sm mt-0.5">{order.customerName}</p>
                      <p className="text-[#57534D] dark:text-[#A8A298]">📱 {order.customerPhone}</p>
                      <p className="text-[#787267] dark:text-[#8C867E]">{order.customerEmail}</p>
                    </div>

                    <div className="pt-2 border-t border-[#F0ECE4] dark:border-[#232120]">
                      <span className="text-[10px] uppercase font-bold text-[#8C867B] dark:text-[#7A756D] tracking-wider block">
                        {language === 'en' ? 'Dispatch Address' : 'Dirección de Despacho'}
                      </span>
                      <p className="font-medium text-[#171615] dark:text-[#F6F4EE]">{order.destinationCity}, {order.destinationCountry}</p>
                      <p className="text-[#6B655B] dark:text-[#A8A298] text-[11px] mt-0.5">{order.destinationAddress}</p>
                      <p className="text-[#8C867B] dark:text-[#7A756D] text-[11px]">ZIP / CP: {order.postalCode}</p>
                    </div>

                    {order.notes && (
                      <div className="p-2.5 bg-[#FAF9F6] dark:bg-[#232120] border border-[#EDE9E1] dark:border-[#2C2926] rounded-lg text-[#57534D] dark:text-[#A8A298] text-[11px]">
                        <span className="font-bold text-[#171615] dark:text-[#F6F4EE]">{language === 'en' ? 'Note:' : 'Nota:'} </span>
                        {order.notes}
                      </div>
                    )}

                    {/* WhatsApp Quick Chat Action */}
                    <div className="pt-2">
                      <button
                        onClick={() => handleOpenClientWhatsApp(order)}
                        className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#171615] hover:bg-[#2C2A28] dark:bg-[#F6F4EE] dark:text-[#171615] dark:hover:bg-white text-white text-xs font-medium rounded-md shadow-xs transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#4AE384] dark:text-[#2D5A3E]" />
                        <span>{language === 'en' ? 'Message Customer on WhatsApp' : 'Chatear por WhatsApp con Cliente'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Right: Ordered Products WITH PHOTOS */}
                  <div className="lg:col-span-8 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-[#8C867B] dark:text-[#7A756D] tracking-wider">
                        {language === 'en' ? 'Requested Crafts (Photographs & Quantities)' : 'Productos Solicitados (Fotografías y Cantidades)'}
                      </span>
                      <button
                        onClick={() => setSelectedOrderForReceipt(order)}
                        className="text-xs font-medium text-[#8E785C] hover:text-[#171615] dark:hover:text-white inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'View Spec Sheet with Photos' : 'Ver Ficha Técnica con Fotos'}</span>
                      </button>
                    </div>

                    {/* Visual photo row of crafts in white/bone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex gap-3 p-3 bg-[#FAF9F6] dark:bg-[#232120] rounded-xl border border-[#EDE9E1] dark:border-[#2C2926] items-center"
                        >
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-16 h-16 rounded-lg object-cover bg-white dark:bg-[#1A1918] shrink-0 border border-[#EAE6DE] dark:border-[#33302C]"
                            referrerPolicy="no-referrer"
                          />

                          <div className="flex-1 min-w-0 text-xs">
                            <h5 className="font-serif font-medium text-[#171615] dark:text-[#F6F4EE] truncate">
                              {item.productName}
                            </h5>
                            <p className="text-[11px] text-[#7A756D] dark:text-[#8C867E] truncate">
                              {item.artisan} · {item.region}
                            </p>
                            <div className="flex items-center justify-between mt-1 text-[#171615] dark:text-[#F6F4EE]">
                              <span className="text-[#787267] dark:text-[#8C867E]">{language === 'en' ? 'Qty:' : 'Cant:'} <strong className="tabular-nums text-[#171615] dark:text-[#F6F4EE]">{item.quantity}</strong></span>
                              <span className="font-medium tabular-nums">
                                {formatPrice(item.quantity * item.unitPriceUSD)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Financial & Courier Tracking Strip */}
                    <div className="pt-3 border-t border-[#F0ECE4] dark:border-[#262422] flex flex-wrap items-center justify-between gap-4 text-xs">
                      
                      {/* Tracking number badge or editor */}
                      <div>
                        {isEditingTracking ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="Ej. DHL-EXPRESS-984210"
                              value={trackingInput}
                              onChange={(e) => setTrackingInput(e.target.value)}
                              className="px-2.5 py-1 text-xs border border-[#DDD8CE] dark:border-[#33302C] rounded font-mono bg-white dark:bg-[#232120] text-[#171615] dark:text-[#F6F4EE]"
                            />
                            <button
                              onClick={() => handleSaveTracking(order.id)}
                              className="px-2.5 py-1 bg-[#171615] dark:bg-[#F6F4EE] text-white dark:text-[#171615] rounded font-medium text-xs cursor-pointer"
                            >
                              {language === 'en' ? 'Save' : 'Guardar'}
                            </button>
                            <button
                              onClick={() => setEditingTrackingId(null)}
                              className="px-2 py-1 bg-[#FAF9F6] dark:bg-[#232120] text-[#57534D] dark:text-[#A8A298] border border-[#DDD8CE] dark:border-[#33302C] rounded text-xs cursor-pointer"
                            >
                              {language === 'en' ? 'Cancel' : 'Cancelar'}
                            </button>
                          </div>
                        ) : order.trackingNumber ? (
                          <div className="flex items-center gap-2">
                            <Truck className="w-3.5 h-3.5 text-[#8E785C]" />
                            <span className="text-[#787267] dark:text-[#8C867E]">Tracking:</span>
                            <span className="font-mono font-medium text-[#171615] dark:text-[#F6F4EE] bg-[#FAF9F6] dark:bg-[#232120] px-2 py-0.5 rounded border border-[#EDE9E1] dark:border-[#2C2926]">
                              {order.trackingNumber}
                            </span>
                            <button
                              onClick={() => {
                                setEditingTrackingId(order.id);
                                setTrackingInput(order.trackingNumber || '');
                              }}
                              className="text-[11px] text-[#8C867B] hover:text-[#171615] dark:hover:text-[#F6F4EE] underline ml-1 cursor-pointer"
                            >
                              {language === 'en' ? 'Edit' : 'Editar'}
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingTrackingId(order.id);
                              setTrackingInput('');
                            }}
                            className="inline-flex items-center gap-1.5 text-[#736E65] dark:text-[#A8A298] hover:text-[#171615] dark:hover:text-[#F6F4EE] text-xs font-medium cursor-pointer"
                          >
                            <Truck className="w-3.5 h-3.5 text-[#8C867B]" />
                            <span>+ {language === 'en' ? 'Assign DHL Tracking Code' : 'Asignar Guía DHL / Courier'}</span>
                          </button>
                        )}
                      </div>

                      {/* Total calculation */}
                      <div className="text-right">
                        <span className="text-[11px] text-[#787267] dark:text-[#8C867E] mr-2">{language === 'en' ? 'Order Total:' : 'Total Orden:'}</span>
                        <span className="font-serif text-lg font-normal text-[#171615] dark:text-[#F6F4EE] tabular-nums">
                          {formatPrice(order.totalUSD)}
                        </span>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
