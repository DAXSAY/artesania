export type ProductCategory = 
  | 'textiles' 
  | 'ceramics' 
  | 'jewelry' 
  | 'woodwork' 
  | 'basketry' 
  | 'sculpture';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  priceUSD: number;
  artisan: string;
  artisanBio?: string;
  region: string;
  shortDescription: string;
  fullStory: string;
  materials: string[];
  dimensions: string;
  weightKg: number;
  craftTimeDays: number;
  image: string;
  secondaryImages?: string[];
  stock: number;
  featured: boolean;
  fairTrade: boolean;
  culturalHeritage: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'pending' | 'in_preparation' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  unitPriceUSD: number;
  artisan: string;
  region: string;
  weightKg: number;
}

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  destinationCountry: string;
  destinationCity: string;
  destinationAddress: string;
  postalCode: string;
  items: OrderItem[];
  subtotalUSD: number;
  shippingEstimatedUSD: number;
  totalUSD: number;
  status: OrderStatus;
  trackingNumber?: string;
  carrier?: string;
  notes?: string;
  whatsappMessageSent: boolean;
}

export type Language = 'es' | 'en';
export type Theme = 'light' | 'dark';

export type CurrencyCode = 'USD' | 'EUR' | 'PEN' | 'JPY' | 'AUD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  label: string;
  rateFromUSD: number;
}

export interface StoreSettings {
  shopName: string;
  sellerName: string;
  whatsappNumber: string;
  whatsappCountryCode: string;
  contactEmail: string;
  shopAddress: string;
  welcomeMessage: string;
  shippingFlatRateUSD: number;
  freeShippingThresholdUSD: number;
}
