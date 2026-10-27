import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { EditProductModal } from './EditProductModal';
import { Plus, Search, Edit3, Trash2, Eye } from 'lucide-react';

export const ProductsManager: React.FC = () => {
  const { products, deleteProduct, formatPrice, setActiveProductModal, language } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingProduct, setEditingProduct] = useState<Product | null | undefined>(undefined);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.artisan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.region.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string, name: string) => {
    const confirmMsg = language === 'en'
      ? `Are you sure you want to remove the craft "${name}" from the catalog?`
      : `¿Estás seguro de que deseas eliminar la artesanía "${name}" del catálogo?`;
    if (window.confirm(confirmMsg)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Controls: Search, Filter & New Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-white dark:bg-[#1A1918] rounded-xl border border-[#EFECE6] dark:border-[#262422] shadow-xs transition-colors">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-[#8C867B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={language === 'en' ? 'Search by craft, master or region...' : 'Buscar por artesanía, artesano o región...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-[#DDD8CE] dark:border-[#33302C] rounded-lg bg-[#FAF9F6] dark:bg-[#232120] text-[#171615] dark:text-[#F6F4EE] focus:bg-white dark:focus:bg-[#1A1918] focus:outline-none focus:ring-1 focus:ring-[#171615] dark:focus:ring-[#8E785C]"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-[#DDD8CE] dark:border-[#33302C] rounded-lg bg-[#FAF9F6] dark:bg-[#232120] text-[#171615] dark:text-[#F6F4EE] focus:outline-none cursor-pointer"
          >
            <option value="all" className="dark:bg-[#1A1918]">{language === 'en' ? 'All Categories' : 'Todas las Categorías'}</option>
            <option value="textiles" className="dark:bg-[#1A1918]">{language === 'en' ? 'Alpaca Textiles' : 'Textiles Ancestrales'}</option>
            <option value="ceramics" className="dark:bg-[#1A1918]">{language === 'en' ? 'Traditional Ceramics' : 'Cerámica Tradicional'}</option>
            <option value="jewelry" className="dark:bg-[#1A1918]">{language === 'en' ? 'Silver Filigree' : 'Orfebrería & Joyería'}</option>
            <option value="woodwork" className="dark:bg-[#1A1918]">{language === 'en' ? 'Retablos & Wood' : 'Retablos & Madera'}</option>
            <option value="basketry" className="dark:bg-[#1A1918]">{language === 'en' ? 'Plant Fibers' : 'Fibras Vegetales'}</option>
            <option value="sculpture" className="dark:bg-[#1A1918]">{language === 'en' ? 'Stone Sculpture' : 'Escultura en Piedra'}</option>
          </select>

          <button
            onClick={() => setEditingProduct(null)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#171615] hover:bg-[#2C2A28] dark:bg-[#F6F4EE] dark:text-[#171615] dark:hover:bg-white text-white text-xs font-medium rounded-lg shadow-xs cursor-pointer whitespace-nowrap transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'New Craft' : 'Nueva Artesanía'}</span>
          </button>
        </div>
      </div>

      {/* Products Table / Cards */}
      <div className="bg-white dark:bg-[#1A1918] rounded-xl border border-[#EFECE6] dark:border-[#262422] shadow-xs overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF9F6] dark:bg-[#161514] border-b border-[#EDE9E1] dark:border-[#262422] text-[#787267] dark:text-[#8C867E] uppercase tracking-wider font-semibold text-[10px]">
                <th className="py-3 px-4">{language === 'en' ? 'Photo & Craft' : 'Foto & Producto'}</th>
                <th className="py-3 px-4">{language === 'en' ? 'Category' : 'Categoría'}</th>
                <th className="py-3 px-4">{language === 'en' ? 'Artisan & Region' : 'Artesano & Región'}</th>
                <th className="py-3 px-4 text-right">{language === 'en' ? 'Price USD' : 'Precio USD'}</th>
                <th className="py-3 px-4 text-center">{language === 'en' ? 'Stock' : 'Stock'}</th>
                <th className="py-3 px-4 text-center">{language === 'en' ? 'Actions' : 'Acciones'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0ECE4] dark:divide-[#262422]">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-[#FBF9F5] dark:hover:bg-[#232120] transition-colors">
                  {/* Photo & Name */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover bg-[#FAF9F6] dark:bg-[#232120] shrink-0 border border-[#E3DFD7] dark:border-[#33302C]"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-serif font-medium text-[#171615] dark:text-[#F6F4EE] text-sm">
                          {product.name}
                        </h4>
                        <span className="text-[10px] text-[#8C867B] dark:text-[#7A756D] font-mono">
                          ID: {product.id}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4 text-[#57534D] dark:text-[#A8A298] font-medium">
                    {product.categoryLabel}
                  </td>

                  {/* Artisan & Region */}
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-[#171615] dark:text-[#F6F4EE] block">{product.artisan}</span>
                    <span className="text-[11px] text-[#787267] dark:text-[#8C867E]">{product.region}</span>
                  </td>

                  {/* Price */}
                  <td className="py-3.5 px-4 text-right font-serif text-sm font-normal text-[#171615] dark:text-[#F6F4EE] tabular-nums">
                    {formatPrice(product.priceUSD)}
                  </td>

                  {/* Stock */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium tabular-nums bg-[#FAF9F6] dark:bg-[#232120] border border-[#EDE9E1] dark:border-[#2C2926] text-[#171615] dark:text-[#F6F4EE]">
                      {product.stock} un.
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setActiveProductModal(product)}
                        title="Ver detalle"
                        className="p-1.5 text-[#736E65] dark:text-[#A8A298] hover:text-[#171615] dark:hover:text-[#F6F4EE] rounded hover:bg-[#FAF9F6] dark:hover:bg-[#232120] cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setEditingProduct(product)}
                        title="Editar información y fotografía"
                        className="p-1.5 text-[#736E65] dark:text-[#A8A298] hover:text-[#171615] dark:hover:text-[#F6F4EE] rounded hover:bg-[#FAF9F6] dark:hover:bg-[#232120] cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        title="Eliminar producto"
                        className="p-1.5 text-[#9E978C] hover:text-[#C53B3B] rounded hover:bg-[#FAF9F6] dark:hover:bg-[#232120] cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingProduct !== undefined && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(undefined)}
        />
      )}

    </div>
  );
};
