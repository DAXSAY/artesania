import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, OrderStatus, StoreSettings, CartItem, Language, Theme } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_SETTINGS } from '../data/initialData';
import { TRANSLATIONS } from '../data/translations';

type TranslationKey = keyof typeof TRANSLATIONS.es;

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotalUSD: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'whatsappMessageSent'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string, carrier?: string) => void;
  deleteOrder: (orderId: string) => void;
  selectedOrderForReceipt: Order | null;
  setSelectedOrderForReceipt: (order: Order | null) => void;

  // Settings
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;

  // Language & Translation
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;

  // Theme (Light / Dark)
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  // Formatting (USD)
  formatPrice: (usdAmount: number) => string;

  // App Navigation View
  activeView: 'store' | 'admin';
  setActiveView: (view: 'store' | 'admin') => void;

  // Modal inspection
  activeProductModal: Product | null;
  setActiveProductModal: (product: Product | null) => void;

  // Notification Toast
  toast: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('qala_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('qala_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Settings
  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('qala_settings');
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('qala_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Language: 'es' | 'en'
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('qala_lang');
      return (saved === 'en' || saved === 'es') ? saved : 'es';
    } catch {
      return 'es';
    }
  });

  // Theme: 'light' | 'dark'
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('qala_theme');
      return (saved === 'dark' || saved === 'light') ? saved : 'light';
    } catch {
      return 'light';
    }
  });

  const [activeView, setActiveView] = useState<'store' | 'admin'>('store');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [selectedOrderForReceipt, setSelectedOrderForReceipt] = useState<Order | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Sync products, orders, settings, cart
  useEffect(() => {
    try {
      localStorage.setItem('qala_products', JSON.stringify(products));
    } catch (e) {
      console.warn('Could not save products to localStorage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('qala_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Could not save orders to localStorage', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('qala_settings', JSON.stringify(settings));
    } catch (e) {
      console.warn('Could not save settings to localStorage', e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('qala_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('qala_lang', language);
    } catch (e) {
      console.warn('Could not save language to localStorage', e);
    }
  }, [language]);

  // Sync theme with DOM and localStorage
  useEffect(() => {
    try {
      localStorage.setItem('qala_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.warn('Could not save theme to localStorage', e);
    }
  }, [theme]);

  // Check URL query parameters for direct receipt preview (e.g. ?order=ORD-8921)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderIdParam = urlParams.get('order');
    if (orderIdParam) {
      const found = orders.find(o => o.id.toLowerCase() === orderIdParam.toLowerCase());
      if (found) {
        setSelectedOrderForReceipt(found);
      }
    }
    const adminParam = urlParams.get('admin');
    if (adminParam === 'true') {
      setActiveView('admin');
    }
  }, [orders]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const t = (key: TranslationKey): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.es;
    return dict[key] || TRANSLATIONS.es[key] || String(key);
  };

  // Product CRUD
  const addProduct = (productData: Omit<Product, 'id'>): Product => {
    const newId = `art-${Date.now().toString().slice(-4)}`;
    const newProduct: Product = {
      ...productData,
      id: newId,
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(language === 'es' ? `Artesanía "${newProduct.name}" agregada con éxito` : `Craft piece "${newProduct.name}" added successfully`);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    showToast(language === 'es' ? 'Producto actualizado correctamente' : 'Product updated successfully');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast(language === 'es' ? 'Producto eliminado del catálogo' : 'Product removed from catalog');
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(language === 'es' ? `"${product.name}" agregado a tu pedido` : `"${product.name}" added to order`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotalUSD = cart.reduce((sum, item) => sum + (item.product.priceUSD * item.quantity), 0);

  // Orders operations
  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'whatsappMessageSent'>): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${randomSuffix}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
      whatsappMessageSent: true,
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setSelectedOrderForReceipt(newOrder);
    showToast(language === 'es' ? `¡Pedido ${newOrder.id} generado exitosamente!` : `Order ${newOrder.id} created successfully!`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, trackingNumber?: string, carrier?: string) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            status,
            trackingNumber: trackingNumber !== undefined ? trackingNumber : o.trackingNumber,
            carrier: carrier !== undefined ? carrier : o.carrier,
          };
        }
        return o;
      })
    );
    showToast(language === 'es' ? `Estado de la orden ${orderId} actualizado` : `Order status for ${orderId} updated`);
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
    showToast(language === 'es' ? `Orden ${orderId} eliminada` : `Order ${orderId} deleted`);
  };

  // Settings
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    showToast(language === 'es' ? 'Configuración de la tienda guardada' : 'Store settings saved');
  };

  // Formatting (USD)
  const formatPrice = (usdAmount: number): string => {
    return `$${usdAmount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} USD`;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotalUSD,
        isCartOpen,
        setIsCartOpen,
        orders,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        selectedOrderForReceipt,
        setSelectedOrderForReceipt,
        settings,
        updateSettings,
        language,
        setLanguage,
        t,
        theme,
        setTheme,
        toggleTheme,
        formatPrice,
        activeView,
        setActiveView,
        activeProductModal,
        setActiveProductModal,
        toast,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
