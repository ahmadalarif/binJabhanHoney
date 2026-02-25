
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { SARSymbol } from '../components/ProductCard';

const Cart: React.FC = () => {
  const { lang, cart, removeFromCart } = useApp();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center space-y-8">
        <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto border border-main">
          <svg className="w-12 h-12 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-main">{lang === 'ar' ? 'سلة التسوق فارغة' : 'Your cart is empty'}</h2>
          <p className="text-muted">{lang === 'ar' ? 'يبدو أنك لم تضف أي منتجات بعد' : 'Looks like you haven\'t added any products yet'}</p>
        </div>
        <Link to="/shop" className="inline-block px-8 py-4 bg-[#d4af37] text-black font-bold rounded-xl shadow-lg shadow-[#d4af37]/20">
          {lang === 'ar' ? 'ابدأ التسوق' : 'Start Shopping'}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <h1 className="text-4xl font-bold text-main">{lang === 'ar' ? 'سلة التسوق' : 'Shopping Cart'}</h1>

      <div className="space-y-4">
        {cart.map(item => (
          <div key={item.id} className="bg-surface p-6 rounded-2xl border border-main flex items-center gap-6 shadow-sm">
            <img src={item.image} className="w-20 h-20 object-cover rounded-xl border border-main" />
            <div className="flex-grow">
              <h3 className="font-bold text-xl text-main">{item.name[lang]}</h3>
              <p className="text-muted text-sm">{item.category === 'honey' ? (lang === 'ar' ? 'عسل' : 'Honey') : (lang === 'ar' ? 'سمن' : 'Ghee')}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="font-black text-xl text-[#d4af37] flex items-center justify-end gap-1.5">
                {item.price} 
                <SARSymbol className="w-4 h-4" />
              </div>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm hover:underline"
              >
                {lang === 'ar' ? 'إزالة' : 'Remove'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface p-8 rounded-3xl border border-main space-y-6 shadow-md">
        <div className="flex justify-between text-2xl font-bold text-main">
          <span>{lang === 'ar' ? 'الإجمالي' : 'Total'}</span>
          <div className="text-[#d4af37] flex items-center gap-2">
            {total} 
            <SARSymbol className="w-6 h-6" />
          </div>
        </div>
        <button 
          onClick={() => navigate('/checkout')}
          className="w-full py-5 bg-[#d4af37] text-black font-bold rounded-2xl hover:bg-[#b8860b] transition-all shadow-lg shadow-[#d4af37]/20"
        >
          {lang === 'ar' ? 'إتمام الشراء' : 'Proceed to Checkout'}
        </button>
      </div>
    </div>
  );
};

export default Cart;
