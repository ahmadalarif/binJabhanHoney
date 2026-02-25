
import React, { useState, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useApp } from '../App';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Product, User, AvailabilityStatus, AppNotification } from '../types';
import { SARSymbol } from '../components/ProductCard';

const NotificationsPanel: React.FC = () => {
  const { lang, notifications, markNotificationRead } = useApp();

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-main">{lang === 'ar' ? 'التنبيهات' : 'Notifications'}</h2>
      <div className="space-y-4">
        {notifications.map(n => (
          <div 
            key={n.id} 
            className={`p-6 rounded-3xl border ${n.read ? 'bg-surface border-main opacity-60' : 'bg-alt border-[#d4af37] shadow-lg shadow-[#d4af37]/5'} transition-all`}
            onClick={() => markNotificationRead(n.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {n.type === 'order' ? '📦' : n.type === 'offer' ? '🔥' : '🍯'}
                </span>
                <h4 className="font-bold text-main">{n.title[lang]}</h4>
              </div>
              <span className="text-[10px] text-muted font-bold uppercase">{new Date(n.date).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-muted">{n.message[lang]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingsPanel: React.FC = () => {
  const { lang, customLogo, setCustomLogo } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCustomLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-2xl font-bold text-main">{lang === 'ar' ? 'إعدادات المتجر' : 'Store Settings'}</h2>
      
      <div className="bg-surface p-8 rounded-3xl border border-main space-y-6 shadow-sm">
        <h3 className="font-bold text-main">{lang === 'ar' ? 'شعار المتجر' : 'Store Logo'}</h3>
        <div className="flex items-center gap-8">
          <div className="w-32 h-32 rounded-full border-2 border-dashed border-main flex items-center justify-center overflow-hidden bg-alt">
            {customLogo ? (
              <img src={customLogo} className="w-full h-full object-contain" alt="Logo" />
            ) : (
              <span className="text-4xl opacity-20">🐝</span>
            )}
          </div>
          <div className="space-y-4">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 bg-main text-white font-bold rounded-xl hover:bg-[#d4af37] hover:text-black transition-colors"
            >
              {lang === 'ar' ? 'تغيير الشعار' : 'Change Logo'}
            </button>
            <p className="text-xs text-muted max-w-xs leading-relaxed">
              {lang === 'ar' ? 'يفضل استخدام صورة بخلفية شفافة (PNG) وبأبعاد مربعة.' : 'Prefer using a transparent PNG with square dimensions.'}
            </p>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Stats: React.FC = () => {
  const { lang, theme, orders } = useApp();
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 124500;
  const chartStroke = theme === 'dark' ? '#333' : '#e5e7eb';
  const chartText = theme === 'dark' ? '#666' : '#9ca3af';

  const data = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 2000 },
    { name: 'Apr', sales: 2780 },
    { name: 'May', sales: 1890 },
    { name: 'Jun', sales: 2390 },
  ];

  return (
    <div className="space-y-12 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { 
            label: { ar: 'إجمالي المبيعات', en: 'Total Sales' }, 
            val: totalRevenue.toLocaleString(), 
            icon: '💰',
            currency: true
          },
          { label: { ar: 'الطلبات النشطة', en: 'Active Orders' }, val: orders.length.toString(), icon: '📦' },
          { label: { ar: 'العملاء المسجلين', en: 'Registered Customers' }, val: '1,248', icon: '👥' },
          { 
            label: { ar: 'متوسط الطلب', en: 'Avg. Order' }, 
            val: '280', 
            icon: '📈',
            currency: true
          },
        ].map((s, i) => (
          <div key={i} className="bg-surface p-6 rounded-2xl border border-main space-y-2 shadow-sm">
            <div className="text-2xl">{s.icon}</div>
            <div className="text-muted text-sm font-bold uppercase">{s.label[lang]}</div>
            <div className="text-2xl font-black text-main flex items-center gap-1.5">
              {s.val}
              {s.currency && <SARSymbol className="w-5 h-5 text-[#d4af37]" />}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface p-8 rounded-3xl border border-main shadow-sm">
        <h3 className="font-bold text-xl text-main mb-6">{lang === 'ar' ? 'تقرير المبيعات النصف سنوي' : 'Half-Year Sales Report'}</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartStroke} />
              <XAxis dataKey="name" stroke={chartText} />
              <YAxis stroke={chartText} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-primary)', borderRadius: '12px' }} 
              />
              <Bar dataKey="sales" fill="#d4af37" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const ProductsPanel: React.FC = () => {
  const { lang, products, saveProduct, deleteProduct } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: { en: '', ar: '' },
    description: { en: '', ar: '' },
    details: { en: '', ar: '' },
    price: 0,
    discountPercentage: 0,
    availability: 'in_stock',
    weightKg: 0.5,
    category: 'honey',
    origin: 'Al-Baha, Saudi Arabia',
    image: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, image: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const openAdd = () => {
    setEditingId(null);
    setFormData({ 
      name: { en: '', ar: '' }, 
      description: { en: '', ar: '' }, 
      details: { en: '', ar: '' },
      price: 0, 
      discountPercentage: 0,
      availability: 'in_stock',
      weightKg: 0.5,
      category: 'honey', 
      origin: 'Al-Baha, Saudi Arabia', 
      image: '' 
    });
    setIsFormOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setFormData({ ...p });
    setIsFormOpen(true);
  };

  const handleSave = async () => {
    const finalData = { ...formData } as Product;
    if (editingId) {
      await saveProduct({ ...finalData, id: editingId });
    } else {
      await saveProduct({ ...finalData, id: Date.now().toString() });
    }
    setIsFormOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا المنتج نهائياً؟' : 'Are you sure you want to permanently delete this product?')) {
      await deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-main">{lang === 'ar' ? 'المخزون والمنتجات' : 'Inventory & Products'}</h2>
        <button onClick={openAdd} className="px-6 py-2 bg-[#d4af37] text-black font-bold rounded-xl hover:scale-105 transition-transform shadow-lg shadow-[#d4af37]/20">
          {lang === 'ar' ? 'إضافة منتج جديد' : 'Add New Product'}
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-surface p-8 rounded-[2.5rem] border-2 border-[#d4af37] animate-fadeIn space-y-6 shadow-2xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-4">
              <label className="text-[10px] font-black text-muted uppercase tracking-widest block">{lang === 'ar' ? 'صورة المنتج' : 'Product Image'}</label>
              <div 
                onClick={() => fileInputRef.current?.click()} 
                className="aspect-square bg-alt border-2 border-dashed border-main rounded-3xl flex flex-col items-center justify-center cursor-pointer overflow-hidden group relative"
              >
                {formData.image ? (
                  <>
                    <img src={formData.image} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                       <span className="text-white text-xs font-bold uppercase">{lang === 'ar' ? 'تغيير الصورة' : 'Change Image'}</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center space-y-2 p-4">
                    <span className="text-3xl opacity-40">📸</span>
                    <p className="text-xs text-muted font-bold uppercase tracking-widest">{lang === 'ar' ? 'اضغط لرفع صورة' : 'Click to Upload'}</p>
                  </div>
                )}
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest">{lang === 'ar' ? 'الاسم (عربي)' : 'Name (Arabic)'}</label>
                 <input className="w-full bg-alt border border-main rounded-xl px-4 py-3 text-main focus:border-[#d4af37] outline-none" value={formData.name?.ar} onChange={(e) => setFormData({...formData, name: {...formData.name!, ar: e.target.value}})} />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest">{lang === 'ar' ? 'الاسم (إنجليزي)' : 'Name (English)'}</label>
                 <input className="w-full bg-alt border border-main rounded-xl px-4 py-3 text-main focus:border-[#d4af37] outline-none" value={formData.name?.en} onChange={(e) => setFormData({...formData, name: {...formData.name!, en: e.target.value}})} />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest">{lang === 'ar' ? 'السعر الحالي' : 'Final Price'}</label>
                 <div className="relative">
                   <input type="number" className="w-full bg-alt border border-main rounded-xl px-4 py-3 text-main focus:border-[#d4af37] outline-none font-mono" value={formData.price} onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})} />
                   <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40">
                      <SARSymbol className="w-5 h-5" />
                   </div>
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest">{lang === 'ar' ? 'نسبة الخصم (%)' : 'Discount Percentage (%)'}</label>
                 <input type="number" className="w-full bg-alt border border-main rounded-xl px-4 py-3 text-main focus:border-[#d4af37] outline-none font-mono" value={formData.discountPercentage} onChange={(e) => setFormData({...formData, discountPercentage: parseFloat(e.target.value)})} />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest">{lang === 'ar' ? 'حالة التوفر' : 'Availability Status'}</label>
                 <select 
                    className="w-full bg-alt border border-main rounded-xl px-4 py-3 text-main focus:border-[#d4af37] outline-none"
                    value={formData.availability}
                    onChange={(e) => setFormData({...formData, availability: e.target.value as AvailabilityStatus})}
                 >
                    <option value="in_stock">{lang === 'ar' ? 'متوفر' : 'In Stock'}</option>
                    <option value="limited_stock">{lang === 'ar' ? 'كمية محدودة' : 'Limited Stock'}</option>
                    <option value="out_of_stock">{lang === 'ar' ? 'نفذت الكمية' : 'Out of Stock'}</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest">{lang === 'ar' ? 'الوزن (كجم)' : 'Weight (Kg)'}</label>
                 <input type="number" step="0.01" className="w-full bg-alt border border-main rounded-xl px-4 py-3 text-main focus:border-[#d4af37] outline-none font-mono" value={formData.weightKg} onChange={(e) => setFormData({...formData, weightKg: parseFloat(e.target.value)})} />
               </div>
               <div className="md:col-span-2 space-y-2">
                 <label className="text-[10px] font-black text-muted uppercase tracking-widest">{lang === 'ar' ? 'الوصف المختصر (عربي)' : 'Short Description (Arabic)'}</label>
                 <textarea className="w-full bg-alt border border-main rounded-xl px-4 py-3 text-main h-20 resize-none focus:border-[#d4af37] outline-none" value={formData.description?.ar} onChange={(e) => setFormData({...formData, description: {...formData.description!, ar: e.target.value}})} />
               </div>
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button onClick={handleSave} className="flex-grow py-5 honey-gradient text-black font-black rounded-2xl shadow-xl hover:brightness-110 active:scale-95 transition-all uppercase tracking-widest">{lang === 'ar' ? 'حفظ البيانات' : 'Save Product'}</button>
            <button onClick={() => setIsFormOpen(false)} className="px-10 py-5 bg-alt border border-main text-main font-bold rounded-2xl hover:bg-surface">{lang === 'ar' ? 'إلغاء' : 'Cancel'}</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p.id} className="bg-surface p-4 rounded-3xl border border-main group hover:border-[#d4af37] transition-all relative overflow-hidden flex flex-col h-full">
            <div className="aspect-video w-full rounded-2xl overflow-hidden mb-4 relative">
               <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black text-[#d4af37] uppercase tracking-tighter">
                 {p.weightKg} KG
               </div>
               {p.discountPercentage && p.discountPercentage > 0 && (
                 <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter">
                   {p.discountPercentage}% OFF
                 </div>
               )}
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-lg text-main leading-tight mb-1">{p.name[lang]}</h4>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                  p.availability === 'in_stock' ? 'border-green-500/30 text-green-500' : 
                  p.availability === 'limited_stock' ? 'border-amber-500/30 text-amber-500' : 'border-red-500/30 text-red-500'
                }`}>
                  {p.availability.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-muted line-clamp-2 mb-4">{p.description[lang]}</p>
            </div>
            <div className="flex justify-between items-center mt-auto pt-4 border-t border-main">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-[#d4af37]">{p.price}</span>
                <SARSymbol className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(p)} className="p-2.5 bg-alt rounded-xl hover:text-[#d4af37] transition-colors border border-main">✏️</button>
                <button onClick={() => handleDelete(p.id)} className="p-2.5 bg-alt rounded-xl text-red-500 hover:bg-red-500/10 transition-colors border border-main">🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CRMPanel: React.FC = () => {
  const { lang, allUsers } = useApp();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const splitName = (name: string) => {
    const parts = name.trim().split(/\s+/);
    return { 
      first: parts[0] || 'Unknown', 
      last: parts.length > 1 ? parts.slice(1).join(' ') : (lang === 'ar' ? 'غير مسجل' : 'Not Provided') 
    };
  };

  const formatPhoneForWA = (phone: string) => {
    return phone.replace(/^0/, '966').replace(/\D/g, '');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-main">{lang === 'ar' ? 'إدارة علاقات العملاء' : 'Customer Relationship Management'}</h2>
        <div className="px-4 py-1.5 bg-alt border border-main rounded-full text-[10px] font-bold text-muted uppercase tracking-widest">
           {allUsers.length} {lang === 'ar' ? 'عميل نشط' : 'Active Users'}
        </div>
      </div>
      
      <div className="bg-surface rounded-[2.5rem] border border-main overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse">
            <thead className="bg-alt text-[10px] text-muted uppercase tracking-widest font-black border-b border-main">
              <tr>
                <th className="px-8 py-5">{lang === 'ar' ? 'العميل' : 'Profile'}</th>
                <th className="px-8 py-5">{lang === 'ar' ? 'الاسم الأول' : 'First Name'}</th>
                <th className="px-8 py-5">{lang === 'ar' ? 'الاسم الأخير' : 'Last Name'}</th>
                <th className="px-8 py-5">{lang === 'ar' ? 'رقم التواصل' : 'Contact'}</th>
                <th className="px-8 py-5 text-center">{lang === 'ar' ? 'الإجراءات الذكية' : 'Smart Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-main">
              {allUsers.map(u => {
                const { first, last } = splitName(u.name);
                const cleanPhone = formatPhoneForWA(u.phone);
                return (
                  <tr key={u.id} className="hover:bg-alt/40 transition-colors group">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl honey-gradient text-black flex items-center justify-center font-black text-xs shadow-md">
                          {getInitials(u.name)}
                        </div>
                        <div className="flex flex-col">
                           <span className="font-bold text-main text-sm">{u.name}</span>
                           <span className="text-[9px] text-muted uppercase font-bold tracking-tighter">ID: {u.id.toUpperCase()}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-sm font-medium">{first}</td>
                    <td className="px-8 py-4 text-sm text-muted">{last}</td>
                    <td className="px-8 py-4 font-mono text-xs text-[#d4af37] font-bold">{u.phone}</td>
                    <td className="px-8 py-4">
                      <div className="flex justify-center gap-3">
                        <button 
                          onClick={() => window.open(`https://wa.me/${cleanPhone}`, '_blank', 'width=800,height=600')} 
                          className="w-10 h-10 flex items-center justify-center bg-[#25D366]/10 text-[#25D366] rounded-xl hover:bg-[#25D366] hover:text-white transition-all transform active:scale-90"
                          title="WhatsApp"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.408 0 12.044c0 2.123.555 4.197 1.608 6.023L0 24l6.117-1.604a11.803 11.803 0 005.925 1.585h.005c6.637 0 12.046-5.411 12.05-12.048 0-3.218-1.251-6.242-3.522-8.513z"/></svg>
                        </button>
                        <a 
                          href={`sms:+${cleanPhone}`} 
                          className="w-10 h-10 flex items-center justify-center bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all transform active:scale-90"
                          title="SMS"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                        </a>
                        <a 
                          href={`tel:+${cleanPhone}`} 
                          className="w-10 h-10 flex items-center justify-center bg-[#d4af37]/10 text-[#d4af37] rounded-xl hover:bg-[#d4af37] hover:text-black transition-all transform active:scale-90"
                          title="Call"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const { lang, logout } = useApp();
  const location = useLocation();

  const menu = [
    { name: { ar: 'الرئيسية', en: 'Dashboard' }, path: '/admin', icon: '📊' },
    { name: { ar: 'المنتجات', en: 'Inventory' }, path: '/admin/products', icon: '🍯' },
    { name: { ar: 'العملاء', en: 'CRM' }, path: '/admin/crm', icon: '👥' },
    { name: { ar: 'التنبيهات', en: 'Notifications' }, path: '/admin/notifications', icon: '🔔' },
    { name: { ar: 'الإعدادات', en: 'Settings' }, path: '/admin/settings', icon: '⚙️' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="lg:w-64 shrink-0">
        <div className="bg-surface p-4 rounded-3xl border border-main space-y-1 shadow-sm sticky top-28">
          {menu.map(item => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`flex items-center gap-3 px-4 py-4 rounded-2xl transition-all ${location.pathname === item.path ? 'bg-[#d4af37] text-black font-black shadow-lg shadow-[#d4af37]/20' : 'hover:bg-alt text-muted'}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm uppercase tracking-widest font-bold">{item.name[lang]}</span>
            </Link>
          ))}
          <div className="pt-4 border-t border-main mt-4">
            <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl hover:bg-red-500/10 text-red-500 transition-colors">
              <span className="text-xl">🚪</span>
              <span className="text-sm uppercase tracking-widest font-bold">{lang === 'ar' ? 'خروج' : 'Logout'}</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Stats />} />
          <Route path="/products" element={<ProductsPanel />} />
          <Route path="/crm" element={<CRMPanel />} />
          <Route path="/notifications" element={<NotificationsPanel />} />
          <Route path="/settings" element={<SettingsPanel />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
