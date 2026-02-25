
import React from 'react';
import { useApp } from '../App';
import { SARSymbol } from '../components/ProductCard';

const Profile: React.FC = () => {
  const { lang, user, logout, orders } = useApp();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'shipped': return 'bg-blue-500/20 text-blue-500';
      case 'delivered': return 'bg-green-500/20 text-green-500';
      case 'pending': return 'bg-yellow-500/20 text-yellow-500';
      default: return 'bg-gray-500/20 text-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, {ar: string, en: string}> = {
      shipped: { ar: 'تم الشحن', en: 'Shipped' },
      delivered: { ar: 'تم التوصيل', en: 'Delivered' },
      pending: { ar: 'قيد الانتظار', en: 'Pending' },
      cancelled: { ar: 'ملغي', en: 'Cancelled' }
    };
    return labels[status]?.[lang] || status;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full honey-gradient flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {user?.name?.[0]}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-main">{user?.name}</h1>
            <p className="text-muted">{user?.phone}</p>
          </div>
        </div>
        <button onClick={logout} className="px-6 py-2 border border-red-500/30 text-red-500 rounded-xl hover:bg-red-500/10 transition-colors font-bold">
          {lang === 'ar' ? 'خروج' : 'Logout'}
        </button>
      </header>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-main">{lang === 'ar' ? 'طلباتي السابقة' : 'Order History'}</h2>
          <span className="text-[10px] text-muted italic font-bold tracking-widest uppercase">
            {lang === 'ar' ? 'تحديث تلقائي' : 'Live Sync'}
          </span>
        </div>
        
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-surface p-6 rounded-3xl border border-main flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#d4af37]/30 transition-all shadow-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-black text-xl text-main">{order.id}</span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </div>
                <p className="text-muted text-sm">{order.date}</p>
              </div>
              
              <div className="flex flex-col md:items-end gap-2">
                <div className="text-[#d4af37] font-black text-xl flex items-center gap-1.5">
                  {order.total} 
                  <SARSymbol className="w-5 h-5" />
                </div>
                {order.trackingNumber && (
                  <div className="text-xs text-muted">
                    {lang === 'ar' ? 'تتبع:' : 'Track:'} <span className="font-bold text-[#d4af37] cursor-pointer hover:underline">{order.trackingNumber}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button className="px-4 py-2 bg-alt hover:bg-main text-main border border-main rounded-xl text-sm font-bold transition-colors">
                  {lang === 'ar' ? 'التفاصيل' : 'Details'}
                </button>
                {order.status === 'shipped' && (
                  <button className="px-4 py-2 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/20 rounded-xl text-sm font-bold transition-colors">
                    {lang === 'ar' ? 'تتبع' : 'Track'}
                  </button>
                )}
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <div className="py-20 text-center text-muted">
              {lang === 'ar' ? 'لا يوجد طلبات سابقة' : 'No previous orders'}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Profile;
