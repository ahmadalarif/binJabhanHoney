
import express from 'express';
import type { Request, Response } from 'express';
import * as vite from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

console.log('Starting server initialization...');
console.log('Port:', PORT);
console.log('Data file path:', DATA_FILE);

// Initial Data Structure
const initialData: any = {
  products: [
    {
      id: '1',
      name: { en: "Dahyana Wild Honey", ar: "عسل ضهيانة البلدي" },
      description: {
        en: "Rare wild honey harvested from the untouched valleys of Al-Baha. Known for its light floral notes and smooth texture. Lab-tested for purity and SFDA compliance.",
        ar: "عسل نادر مستخلص من الوديان البكر في منطقة الباحة. يتميز بنكهته الزهرية الخفيفة وقوامه الناعم. خضع للفحص المخبري للتأكد من نقائه وامتثاله لهيئة الغذاء والدواء."
      },
      price: 110,
      category: "honey",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800&auto=format&fit=crop",
      origin: "Al-Baha, Saudi Arabia",
      availability: "in_stock",
      weightKg: 0.5
    },
    {
      id: '2',
      name: { en: "Sidr Honey", ar: "عسل السدر" },
      description: {
        en: "Premium Sidr honey from Baha’s ancient Ziziphus trees. Rich amber color, thick consistency, and unmatched depth of flavor. Fully compliant with SFDA moisture and HMF standards.",
        ar: "عسل سدر بريميوم من أشجار السدر القديمة في الباحة. يتميز بلونه الكهرماني الغني وقوامه الكثيف وعمق نكهته الفريد. متوافق تمامًا مع معايير هيئة الغذاء والدواء للرطوبة وHMF."
      },
      price: 240,
      category: "honey",
      image: "https://images.unsplash.com/photo-1558611997-d77901767664?q=80&w=800&auto=format&fit=crop",
      origin: "Baha, Saudi Arabia",
      availability: "in_stock",
      weightKg: 1.0
    }
  ],
  orders: [],
  users: [
    { id: 'u101', name: 'Ahmed Al-Ghamdi', phone: '0551234567', role: 'user', email: 'ahmed@example.com' },
    { id: 'u102', name: 'Sara Bin Jabhan', phone: '0509876543', role: 'user', email: 'sara@example.com' }
  ],
  notifications: [
    {
      id: 'n1',
      title: { ar: 'عرض خاص!', en: 'Special Offer!' },
      message: { ar: 'خصم ٢٠٪ على عسل السدر الجبلي لفترة محدودة.', en: '20% off on Sidr Mountain Honey for a limited time.' },
      date: new Date().toISOString(),
      read: false,
      type: 'offer'
    }
  ],
  settings: {
    customLogo: null
  }
};

// Load or Initialize Data
let db = initialData;
if (fs.existsSync(DATA_FILE)) {
  try {
    db = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch (e) {
    console.error('Error loading data file, using defaults');
  }
}

const saveData = () => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
};

async function startServer() {
  const app = express();
  app.use(express.json());

  // --- API ROUTES ---

  // Products
  app.get('/api/products', (req: Request, res: Response) => {
    res.json(db.products || []);
  });

  app.post('/api/products', (req: Request, res: Response) => {
    const product = req.body;
    if (product.id) {
      db.products = db.products.map((p: any) => p.id === product.id ? product : p);
    } else {
      product.id = Date.now().toString();
      db.products.unshift(product);
    }
    saveData();
    res.json(product);
  });

  app.delete('/api/products/:id', (req: Request, res: Response) => {
    db.products = db.products.filter((p: any) => p.id !== req.params.id);
    saveData();
    res.json({ success: true });
  });

  // Orders
  app.get('/api/orders', (req: Request, res: Response) => {
    res.json(db.orders);
  });

  app.post('/api/orders', (req: Request, res: Response) => {
    const order = req.body;
    db.orders.unshift(order);
    
    // Auto-notify admin
    const notification = {
      id: Date.now().toString(),
      title: { ar: 'طلب جديد!', en: 'New Order!' },
      message: { 
        ar: `تم استلام طلب جديد برقم ${order.id} بقيمة ${order.total} ر.س`, 
        en: `New order received #${order.id} with total ${order.total} SAR` 
      },
      date: new Date().toISOString(),
      read: false,
      type: 'order'
    };
    db.notifications.unshift(notification);
    
    saveData();
    res.json(order);
  });

  // Users
  app.get('/api/users', (req: Request, res: Response) => {
    res.json(db.users);
  });

  app.post('/api/users', (req: Request, res: Response) => {
    const user = req.body;
    if (!db.users.find((u: any) => u.phone === user.phone)) {
      db.users.push(user);
      saveData();
    }
    res.json(user);
  });

  // Notifications
  app.get('/api/notifications', (req: Request, res: Response) => {
    res.json(db.notifications);
  });

  app.post('/api/notifications/read/:id', (req: Request, res: Response) => {
    db.notifications = db.notifications.map((n: any) => 
      n.id === req.params.id ? { ...n, read: true } : n
    );
    saveData();
    res.json({ success: true });
  });

  // Settings
  app.get('/api/settings', (req: Request, res: Response) => {
    res.json(db.settings);
  });

  app.post('/api/settings/logo', (req: Request, res: Response) => {
    db.settings.customLogo = req.body.logo;
    saveData();
    res.json({ success: true });
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== 'production') {
    const viteInstance = await vite.createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(viteInstance.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
