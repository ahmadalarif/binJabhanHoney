
export type Language = 'en' | 'ar';
export type Theme = 'light' | 'dark';

export interface BilingualText {
  en: string;
  ar: string;
}

export type AvailabilityStatus = 'in_stock' | 'out_of_stock' | 'limited_stock';

export interface Product {
  id: string;
  name: BilingualText;
  description: BilingualText;
  details?: BilingualText; 
  price: number;
  originalPrice?: number; // Added to calculate discount
  discountPercentage?: number; // Added: Discount percentage
  availability: AvailabilityStatus; // Added: Stock status
  weightKg?: number; 
  category: 'honey' | 'ghee';
  image: string;
  moisture?: number;
  hmf?: number;
  diastase?: number;
  reducingSugars?: number;
  sucrose?: number;
  addedSugars?: boolean;
  fermented?: boolean;
  origin: string;
  pollenType?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: CartItem[];
  trackingNumber?: string;
  lastUpdated?: string;
}

export interface User {
  id: string;
  phone: string;
  name: string;
  firstName?: string;
  lastName?: string;
  role: 'user' | 'admin';
  email?: string;
}

export interface AppNotification {
  id: string;
  title: BilingualText;
  message: BilingualText;
  date: string;
  read: boolean;
  type: 'order' | 'offer' | 'product';
}
