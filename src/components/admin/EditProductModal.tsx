import React, { useState } from 'react';
import { Product, ProductCategory } from '../../types';
import { useStore } from '../../context/StoreContext';
import { X, Upload, Check } from 'lucide-react';

interface EditProductModalProps {
  product?: Product | null;
  onClose: () => void;
}

const PRESET_ARTISAN_PHOTOS = [
  {
    label: 'Textil Chinchero / Alpaca',
    url: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Cerámica Torito de Pucará',
    url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Joyería Filigrana Plata 950',
    url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Retablo Ayacuchano Tallado',
    url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Vasija Cerámica Chulucanas',
    url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Cestería Fibras Junco Silvestre',
    url: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Escultura en Piedra Alabastro',
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Poncho Alpaca Negra Tradicional',
    url: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1000&q=80',
  },
];

export const EditProductModal: React.FC<EditProductModalProps> = ({ product, onClose }) => {
  const { addProduct, updateProduct, language } = useStore();

  const [name, setName] = useState(product ? product.name : '');
  const [category, setCategory] = useState<ProductCategory>(product ? product.category : 'textiles');
  const [priceUSD, setPriceUSD] = useState<number>(product ? product.priceUSD : 95);
  const [artisan, setArtisan] = useState(product ? product.artisan : '');
  const [region, setRegion] = useState(product ? product.region : 'Cusco, Perú');
  const [shortDescription, setShortDescription] = useState(product ? product.shortDescription : '');
  const [fullStory, setFullStory] = useState(product ? product.fullStory : '');
  const [dimensions, setDimensions] = useState(product ? product.dimensions : '30 cm x 20 cm');
  const [weightKg, setWeightKg] = useState<number>(product ? product.weightKg : 0.8);
  const [craftTimeDays, setCraftTimeDays] = useState<number>(product ? product.craftTimeDays : 10);
  const [stock, setStock] = useState<number>(product ? product.stock : 10);
  const [image, setImage] = useState(product ? product.image : PRESET_ARTISAN_PHOTOS[0].url);
  const [culturalHeritage, setCulturalHeritage] = useState(product ? product.culturalHeritage : 'Patrimonio Cultural Tradicional');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getCategoryLabel = (cat: ProductCategory): string => {
    switch (cat) {
      case 'textiles': return language === 'en' ? 'Alpaca Textiles' : 'Textiles Ancestrales';
      case 'ceramics': return language === 'en' ? 'Traditional Ceramics' : 'Cerámica Tradicional';
      case 'jewelry': return language === 'en' ? 'Sterling Silver Filigree' : 'Orfebrería & Joyería';
      case 'woodwork': return language === 'en' ? 'Retablos & Cedar Art' : 'Retablos & Madera';
      case 'basketry': return language === 'en' ? 'Woven Plant Fibers' : 'Fibras Vegetales';
      case 'sculpture': return language === 'en' ? 'Alabaster Stone Sculpture' : 'Escultura en Piedra';
      default: return 'Artesanía';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (product) {
      updateProduct(product.id, {
        name,
        category,
        categoryLabel: getCategoryLabel(category),
        priceUSD: Number(priceUSD),
        artisan,
        region,
        shortDescription,
        fullStory,
        dimensions,
        weightKg: Number(weightKg),
        craftTimeDays: Number(craftTimeDays),
        stock: Number(stock),
        image,
        culturalHeritage,
      });
    } else {
      addProduct({
        name,
        category,
        categoryLabel: getCategoryLabel(category),
        priceUSD: Number(priceUSD),
        artisan: artisan || (language === 'en' ? 'Traditional Master Artisan' : 'Maestro Artesano Tradicional'),
        region: region || 'Cusco, Perú',
        shortDescription,
        fullStory: fullStory || shortDescription,
        materials: ['Materia prima 100% natural', 'Acabado manual'],
        dimensions,
        weightKg: Number(weightKg),
        craftTimeDays: Number(craftTimeDays),
        stock: Number(stock),
        image,
        featured: false,
        fairTrade: true,
        culturalHeritage,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-[#1A1918] rounded-2xl shadow-xl border border-[#EFECE6] dark:border-[#2C2926] overflow-hidden my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header in soft bone */}
        <div className="p-5 border-b border-[#EFECE6] dark:border-[#2C2926] flex items-center justify-between bg-[#FAF9F6] dark:bg-[#161514]">
          <div>
            <h3 className="font-serif text-xl font-normal text-[#171615] dark:text-[#F6F4EE]">
              {product 
                ? (language === 'en' ? 'Edit Craft & Photographs' : 'Editar Artesanía y Fotografías') 
                : (language === 'en' ? 'New Craft for Catalog' : 'Nueva Artesanía para el Catálogo')}
            </h3>
            <p className="text-xs text-[#787267] dark:text-[#8C867E]">
              {language === 'en' ? 'Update details, export price, and craft images' : 'Modifica la información, precio de exportación e imagen del producto'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#736E65] dark:text-[#8C867E] hover:text-[#171615] dark:hover:text-[#F6F4EE] rounded-md hover:bg-[#EDE9E1] dark:hover:bg-[#232120] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} id="edit-product-form" className="p-6 overflow-y-auto space-y-6 text-xs bg-white dark:bg-[#1A1918]">
          
          {/* Photo Management Section */}
          <div className="p-4 bg-[#FAF9F6] dark:bg-[#232120] rounded-xl border border-[#EDE9E1] dark:border-[#2C2926] space-y-3">
            <span className="font-semibold text-[#171615] dark:text-[#F6F4EE] uppercase text-[10px] tracking-wider block">
              {language === 'en' ? 'Primary Product Photograph' : 'Fotografía Principal del Producto'}
            </span>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-28 h-28 rounded-lg overflow-hidden border border-[#DDD8CE] dark:border-[#33302C] bg-white dark:bg-[#141312] shrink-0">
                <img
                  src={image}
                  alt="Vista previa"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-1 space-y-2 w-full">
                <div>
                  <label className="block text-[11px] font-medium text-[#57534D] dark:text-[#A8A298] mb-1">
                    {language === 'en' ? 'Image URL:' : 'URL de la Imagen:'}
                  </label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-1.5 border border-[#DDD8CE] dark:border-[#33302C] rounded-lg bg-white dark:bg-[#1A1918] text-[#171615] dark:text-[#F6F4EE] focus:outline-none focus:ring-1 focus:ring-[#171615] dark:focus:ring-[#8E785C]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#1A1918] hover:bg-[#F2EFE9] dark:hover:bg-[#2C2926] border border-[#DDD8CE] dark:border-[#33302C] text-[#171615] dark:text-[#F6F4EE] rounded-md cursor-pointer text-xs font-medium">
                    <Upload className="w-3.5 h-3.5 text-[#8E785C]" />
                    <span>{language === 'en' ? 'Upload photo from device' : 'Subir Foto desde tu PC / Celular'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[10px] text-[#8C867B] dark:text-[#7A756D]">JPG, PNG, WebP</span>
                </div>
              </div>
            </div>

            {/* Presets Gallery */}
            <div className="pt-2">
              <span className="text-[11px] text-[#787267] dark:text-[#8C867E] font-medium block mb-1.5">
                {language === 'en' ? 'Or pick from curated artisan craft photos:' : 'O elige una foto artesanal de muestra en alta resolución:'}
              </span>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {PRESET_ARTISAN_PHOTOS.map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setImage(preset.url)}
                    title={preset.label}
                    className={`relative rounded-md overflow-hidden border-2 aspect-square cursor-pointer transition-all ${
                      image === preset.url ? 'border-[#171615] dark:border-[#F6F4EE] ring-1 ring-[#171615]' : 'border-transparent hover:opacity-80'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {image === preset.url && (
                      <div className="absolute inset-0 bg-[#171615]/40 flex items-center justify-center text-white">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Core Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-[#57534D] dark:text-[#A8A298] mb-1">
                {language === 'en' ? 'Craft Piece Name *' : 'Nombre de la Artesanía *'}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Torito de Pucará Tradicional"
                className="w-full px-3 py-2 border border-[#DDD8CE] dark:border-[#33302C] rounded-lg bg-[#FAF9F6] dark:bg-[#232120] text-[#171615] dark:text-[#F6F4EE] focus:bg-white dark:focus:bg-[#1A1918] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-[#57534D] dark:text-[#A8A298] mb-1">
                {language === 'en' ? 'Category *' : 'Categoría *'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full px-3 py-2 border border-[#DDD8CE] dark:border-[#33302C] rounded-lg bg-[#FAF9F6] dark:bg-[#232120] text-[#171615] dark:text-[#F6F4EE] focus:outline-none cursor-pointer"
              >
                <option value="textiles" className="dark:bg-[#1A1918]">{language === 'en' ? 'Alpaca Textiles' : 'Textiles Ancestrales'}</option>
                <option value="ceramics" className="dark:bg-[#1A1918]">{language === 'en' ? 'Traditional Ceramics' : 'Cerámica Tradicional'}</option>
                <option value="jewelry" className="dark:bg-[#1A1918]">{language === 'en' ? 'Silver Filigree' : 'Orfebrería & Joyería'}</option>
                <option value="woodwork" className="dark:bg-[#1A1918]">{language === 'en' ? 'Retablos & Wood' : 'Retablos & Madera'}</option>
                <option value="basketry" className="dark:bg-[#1A1918]">{language === 'en' ? 'Plant Fibers' : 'Fibras Vegetales'}</option>
                <option value="sculpture" className="dark:bg-[#1A1918]">{language === 'en' ? 'Stone Sculpture' : 'Escultura en Piedra'}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium text-[#57534D] dark:text-[#A8A298] mb-1">
                {language === 'en' ? 'Price (USD $) *' : 'Precio de Venta (USD $) *'}
              </label>
              <input
                type="number"
                step="0.01"
                min="1"
                required
                value={priceUSD}
                onChange={(e) => setPriceUSD(Number(e.target.value))}
                className="w-full px-3 py-2 border border-[#DDD8CE] dark:border-[#33302C] rounded-lg tabular-nums bg-[#FAF9F6] dark:bg-[#232120] text-[#171615] dark:text-[#F6F4EE] focus:bg-white dark:focus:bg-[#1A1918] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-[#57534D] dark:text-[#A8A298] mb-1">
                {language === 'en' ? 'Stock Available *' : 'Unidades en Stock *'}
              </label>
              <input
                type="number"
                min="0"
                required
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full px-3 py-2 border border-[#DDD8CE] dark:border-[#33302C] rounded-lg tabular-nums bg-[#FAF9F6] dark:bg-[#232120] text-[#171615] dark:text-[#F6F4EE] focus:bg-white dark:focus:bg-[#1A1918] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-[#57534D] dark:text-[#A8A298] mb-1">
                {language === 'en' ? 'Elaboration (Days)' : 'Días de Elaboración'}
              </label>
              <input
                type="number"
                min="1"
                value={craftTimeDays}
                onChange={(e) => setCraftTimeDays(Number(e.target.value))}
                className="w-full px-3 py-2 border border-[#DDD8CE] dark:border-[#33302C] rounded-lg tabular-nums bg-[#FAF9F6] dark:bg-[#232120] text-[#171615] dark:text-[#F6F4EE] focus:bg-white dark:focus:bg-[#1A1918] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-[#57534D] dark:text-[#A8A298] mb-1">
                {language === 'en' ? 'Master Artisan / Workshop' : 'Maestro Artesano / Taller'}
              </label>
              <input
                type="text"
                value={artisan}
                onChange={(e) => setArtisan(e.target.value)}
                placeholder="Ej. Taller Familia Huamán"
                className="w-full px-3 py-2 border border-[#DDD8CE] dark:border-[#33302C] rounded-lg bg-[#FAF9F6] dark:bg-[#232120] text-[#171615] dark:text-[#F6F4EE] focus:bg-white dark:focus:bg-[#1A1918] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-[#57534D] dark:text-[#A8A298] mb-1">
                {language === 'en' ? 'Region of Origin' : 'Región / Origen Geográfico'}
              </label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="Ej. Chulucanas, Piura"
                className="w-full px-3 py-2 border border-[#DDD8CE] dark:border-[#33302C] rounded-lg bg-[#FAF9F6] dark:bg-[#232120] text-[#171615] dark:text-[#F6F4EE] focus:bg-white dark:focus:bg-[#1A1918] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-[#57534D] dark:text-[#A8A298] mb-1">
                {language === 'en' ? 'Dimensions' : 'Medidas / Dimensiones'}
              </label>
              <input
                type="text"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                placeholder="Ej. 25 cm x 20 cm"
                className="w-full px-3 py-2 border border-[#DDD8CE] dark:border-[#33302C] rounded-lg bg-[#FAF9F6] dark:bg-[#232120] text-[#171615] dark:text-[#F6F4EE] focus:bg-white dark:focus:bg-[#1A1918] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-[#57534D] dark:text-[#A8A298] mb-1">
                {language === 'en' ? 'Shipping Weight (Kg)' : 'Peso para Envío Internacional (Kg)'}
              </label>
              <input
                type="number"
                step="0.05"
                min="0.01"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full px-3 py-2 border border-[#DDD8CE] dark:border-[#33302C] rounded-lg tabular-nums bg-[#FAF9F6] dark:bg-[#232120] text-[#171615] dark:text-[#F6F4EE] focus:bg-white dark:focus:bg-[#1A1918] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-[#57534D] dark:text-[#A8A298] mb-1">
              {language === 'en' ? 'Short Description for Catalog *' : 'Descripción Breve para el Catálogo *'}
            </label>
            <textarea
              rows={2}
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full px-3 py-2 border border-[#DDD8CE] dark:border-[#33302C] rounded-lg bg-[#FAF9F6] dark:bg-[#232120] text-[#171615] dark:text-[#F6F4EE] focus:bg-white dark:focus:bg-[#1A1918] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-[#57534D] dark:text-[#A8A298] mb-1">
              {language === 'en' ? 'Ancestral History & Craft Story' : 'Historia Ancestral & Técnica Completa'}
            </label>
            <textarea
              rows={3}
              value={fullStory}
              onChange={(e) => setFullStory(e.target.value)}
              className="w-full px-3 py-2 border border-[#DDD8CE] dark:border-[#33302C] rounded-lg bg-[#FAF9F6] dark:bg-[#232120] text-[#171615] dark:text-[#F6F4EE] focus:bg-white dark:focus:bg-[#1A1918] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-[#57534D] dark:text-[#A8A298] mb-1">
              {language === 'en' ? 'Cultural Heritage Seal' : 'Sello / Reconocimiento Cultural'}
            </label>
            <input
              type="text"
              value={culturalHeritage}
              onChange={(e) => setCulturalHeritage(e.target.value)}
              className="w-full px-3 py-2 border border-[#DDD8CE] dark:border-[#33302C] rounded-lg bg-[#FAF9F6] dark:bg-[#232120] text-[#171615] dark:text-[#F6F4EE] focus:bg-white dark:focus:bg-[#1A1918] focus:outline-none"
            />
          </div>

        </form>

        {/* Footer */}
        <div className="p-4 border-t border-[#EFECE6] dark:border-[#2C2926] bg-[#FAF9F6] dark:bg-[#161514] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white dark:bg-[#232120] hover:bg-[#EDE9E1] dark:hover:bg-[#2C2926] text-[#171615] dark:text-[#F6F4EE] border border-[#DDD8CE] dark:border-[#33302C] text-xs font-medium rounded-lg cursor-pointer"
          >
            {language === 'en' ? 'Cancel' : 'Cancelar'}
          </button>
          <button
            type="submit"
            form="edit-product-form"
            className="px-5 py-2 bg-[#171615] hover:bg-[#2C2A28] dark:bg-[#F6F4EE] dark:text-[#171615] dark:hover:bg-white text-white text-xs font-semibold rounded-lg cursor-pointer shadow-xs"
          >
            {product ? (language === 'en' ? 'Save Changes' : 'Guardar Cambios') : (language === 'en' ? 'Publish Craft' : 'Publicar Artesanía')}
          </button>
        </div>

      </div>
    </div>
  );
};
