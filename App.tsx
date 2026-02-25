
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Language, Theme, Product, CartItem, User, Order, AppNotification } from './types';
import { INITIAL_PRODUCTS } from './data/products';
import { trackShipment } from './services/torod';
import { analytics } from './services/analytics';

// --- Contexts ---
interface AppContextType {
  lang: Language;
  setLang: (l: Language) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (p: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
  orders: Order[];
  addOrder: (o: Order) => void;
  saveProduct: (p: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  notifications: AppNotification[];
  addNotification: (n: Omit<AppNotification, 'id' | 'date' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  customLogo: string | null;
  setCustomLogo: (logo: string | null) => void;
  allUsers: User[];
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

// --- Components ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileTabNav from './components/MobileTabNav';
import HoneyAssistant from './components/HoneyAssistant';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import RefundPolicy from './pages/RefundPolicy';
import TrackOrder from './pages/TrackOrder';

const MOCK_CUSTOMERS: User[] = [
  { id: 'u101', name: 'Ahmed Al-Ghamdi', phone: '0551234567', role: 'user', email: 'ahmed@example.com' },
  { id: 'u102', name: 'Sara Bin Jabhan', phone: '0509876543', role: 'user', email: 'sara@example.com' },
  { id: 'u103', name: 'Khalid Al-Zahrani', phone: '0544556677', role: 'user' },
  { id: 'u104', name: 'Mona Al-Shehri', phone: '0566778899', role: 'user' },
];

const AppContent: React.FC = () => {
  const { lang, theme, user } = useApp();
  const location = useLocation();

  useEffect(() => {
    analytics.track({
      type: 'page_view',
      path: location.pathname,
      title: document.title
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-main text-main">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 pb-24 md:pb-8 page-transition" key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/admin/*" element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/track" element={<TrackOrder />} />
        </Routes>
      </main>
      <Footer />
      <MobileTabNav />
      <HoneyAssistant />
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');
  const [theme, setTheme] = useState<Theme>('light');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [allUsers, setAllUsers] = useState<User[]>(MOCK_CUSTOMERS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(() => {
    const saved = sessionStorage.getItem('bj_current_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // --- API Sync ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, orderRes, userRes, notifRes, settingsRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/orders'),
          fetch('/api/users'),
          fetch('/api/notifications'),
          fetch('/api/settings')
        ]);

        const [prods, ords, users, notifs, settings] = await Promise.all([
          prodRes.json(),
          orderRes.json(),
          userRes.json(),
          notifRes.json(),
          settingsRes.json()
        ]);

        if (prods.length > 0) setProducts(prods);
        setOrders(ords);
        if (users.length > 0) setAllUsers(users);
        setNotifications(notifs);
        setCustomLogo(settings.customLogo);
      } catch (error) {
        console.error('Failed to fetch data from backend:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    document.body.className = `${theme}-mode`;
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const addToCart = (product: Product) => {
    analytics.track({
      type: 'add_to_cart',
      productId: product.id,
      name: product.name[lang],
      price: product.price
    });
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    analytics.track({ type: 'remove_from_cart', productId: id });
    setCart(prev => prev.filter(item => item.id !== id));
  };
  const clearCart = () => setCart([]);

  const updateProducts = async (newProducts: React.SetStateAction<Product[]>) => {
    const updated = typeof newProducts === 'function' ? (newProducts as any)(products) : newProducts;
    setProducts(updated);
    
    // Find what changed
    // For simplicity, we'll just sync the whole list or the specific item if we had it.
    // In this implementation, we'll assume the caller might have added or edited one.
    // Let's just provide a way to save a single product.
  };

  const saveProduct = async (product: Product) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      const saved = await res.json();
      setProducts(prev => {
        const exists = prev.find(p => p.id === saved.id);
        if (exists) return prev.map(p => p.id === saved.id ? saved : p);
        return [saved, ...prev];
      });
    } catch (e) {
      console.error('Failed to save product to backend');
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error('Failed to delete product from backend');
    }
  };

  const addNotification = async (n: Omit<AppNotification, 'id' | 'date' | 'read'>) => {
    // In a real app, this would be a POST to /api/notifications
    // For now, we'll keep it simple and the server handles order notifications
  };

  const markNotificationRead = async (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    try {
      await fetch(`/api/notifications/read/${id}`, { method: 'POST' });
    } catch (e) {
      console.error('Failed to mark notification as read');
    }
  };

  const addOrder = async (order: Order) => {
    setOrders(prev => [order, ...prev]);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      const savedOrder = await res.json();
      // Refresh notifications since server adds one
      const notifRes = await fetch('/api/notifications');
      setNotifications(await notifRes.json());
    } catch (e) {
      console.error('Failed to save order to backend');
    }
  };
  
  const login = async (u: User) => {
    setUser(u);
    analytics.setUserId(u.id);
    sessionStorage.setItem('bj_current_user', JSON.stringify(u));
    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(u)
      });
      const userRes = await fetch('/api/users');
      setAllUsers(await userRes.json());
    } catch (e) {
      console.error('Failed to sync user with backend');
    }
  };
  
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('bj_current_user');
  };

  const handleSetCustomLogo = async (logo: string | null) => {
    setCustomLogo(logo);
    try {
      await fetch('/api/settings/logo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logo })
      });
    } catch (e) {
      console.error('Failed to save logo to backend');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-main">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#d4af37] font-bold animate-pulse">Bin Jabhan Honey...</p>
        </div>
      </div>
    );
  }

  return (
    <AppContext.Provider value={{ 
      lang, setLang, theme, setTheme, toggleTheme, products, setProducts: updateProducts as any, saveProduct, deleteProduct, cart, addToCart, removeFromCart, clearCart, user, login, logout, 
      orders, addOrder, notifications, addNotification, markNotificationRead, customLogo, setCustomLogo: handleSetCustomLogo, allUsers, setAllUsers
    }}>
      <Router>
        <AppContent />
      </Router>
    </AppContext.Provider>
  );
};

export default App;
