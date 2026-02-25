
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { SARSymbol } from '../components/ProductCard';
import { analytics } from '../services/analytics';
import { useForm } from 'react-hook-form';

interface CheckoutForm {
  name: string;
  phone: string;
  address: string;
  city: string;
  neighborhood: string;
  shortCode: string;
}

const Checkout: React.FC = () => {
  const { lang, cart, clearCart, addOrder } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>();

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal - discountAmount;

  const applyDiscount = () => {
    if (discountCode.toUpperCase() === 'HONEY20') {
      setDiscountAmount(subtotal * 0.2);
      alert(lang === 'ar' ? 'تم تطبيق الخصم بنجاح!' : 'Discount applied successfully!');
    } else {
      alert(lang === 'ar' ? 'كود الخصم غير صحيح' : 'Invalid discount code');
    }
  };

  React.useEffect(() => {
    analytics.track({
      type: 'begin_checkout',
      cartTotal: total,
      itemCount: cart.length
    });
  }, []);

  const onSubmit = async (data: CheckoutForm) => {
    setLoading(true);
    
    const newOrder = {
      id: `BJ-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      total: total,
      status: 'pending' as const,
      items: [...cart],
      trackingNumber: `TRD-${Math.floor(100000 + Math.random() * 900000)}`,
      lastUpdated: new Date().toISOString(),
      customer: data
    };
    
    analytics.track({
      type: 'purchase',
      orderId: newOrder.id,
      total: total,
      items: newOrder.items
    });

    await addOrder(newOrder);
    setLoading(false);
    clearCart();
    alert(lang === 'ar' ? 'تم استلام طلبك بنجاح! شكراً لثقتك' : 'Order placed successfully! Thank you for choosing us.');
    navigate('/profile');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <h1 className="text-4xl font-bold text-main">{lang === 'ar' ? 'إتمام الطلب' : 'Checkout'}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <section className="bg-surface p-8 rounded-3xl border border-main space-y-6 shadow-sm">
              <h2 className="text-2xl font-bold flex items-center gap-2 text-main">
                <span className="w-8 h-8 rounded-full bg-[#d4af37] text-black flex items-center justify-center text-sm font-bold">1</span>
                {lang === 'ar' ? 'معلومات الشحن' : 'Shipping Info'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <input 
                    type="text" 
                    {...register('name', { required: lang === 'ar' ? 'الاسم مطلوب' : 'Name is required' })}
                    placeholder={lang === 'ar' ? 'الاسم الكامل' : 'Full Name'} 
                    className={`w-full bg-alt border ${errors.name ? 'border-red-500' : 'border-main'} rounded-xl px-4 py-3 focus:border-[#d4af37] outline-none text-main`} 
                  />
                  {errors.name && <p className="text-red-500 text-[10px] font-bold">{errors.name.message}</p>}
                </div>
                <div className="space-y-1">
                  <input 
                    type="tel" 
                    {...register('phone', { 
                      required: lang === 'ar' ? 'رقم الجوال مطلوب' : 'Phone is required',
                      pattern: { value: /^(05|5)([0-9]{8})$/, message: lang === 'ar' ? 'رقم غير صحيح' : 'Invalid number' }
                    })}
                    placeholder={lang === 'ar' ? 'رقم الجوال' : 'Mobile'} 
                    className={`w-full bg-alt border ${errors.phone ? 'border-red-500' : 'border-main'} rounded-xl px-4 py-3 focus:border-[#d4af37] outline-none text-main`} 
                  />
                  {errors.phone && <p className="text-red-500 text-[10px] font-bold">{errors.phone.message}</p>}
                </div>
                <div className="md:col-span-2 space-y-1">
                  <input 
                    type="text" 
                    {...register('address', { required: lang === 'ar' ? 'العنوان مطلوب' : 'Address is required' })}
                    placeholder={lang === 'ar' ? 'العنوان بالتفصيل' : 'Address Detail'} 
                    className={`w-full bg-alt border ${errors.address ? 'border-red-500' : 'border-main'} rounded-xl px-4 py-3 focus:border-[#d4af37] outline-none text-main`} 
                  />
                  {errors.address && <p className="text-red-500 text-[10px] font-bold">{errors.address.message}</p>}
                </div>
                <div className="space-y-1">
                  <input 
                    type="text" 
                    {...register('city', { required: lang === 'ar' ? 'المدينة مطلوبة' : 'City is required' })}
                    placeholder={lang === 'ar' ? 'المدينة' : 'City'} 
                    className={`w-full bg-alt border ${errors.city ? 'border-red-500' : 'border-main'} rounded-xl px-4 py-3 focus:border-[#d4af37] outline-none text-main`} 
                  />
                  {errors.city && <p className="text-red-500 text-[10px] font-bold">{errors.city.message}</p>}
                </div>
                <div className="space-y-1">
                  <input 
                    type="text" 
                    {...register('neighborhood', { required: lang === 'ar' ? 'الحي مطلوب' : 'Neighborhood is required' })}
                    placeholder={lang === 'ar' ? 'الحي' : 'Neighborhood'} 
                    className={`w-full bg-alt border ${errors.neighborhood ? 'border-red-500' : 'border-main'} rounded-xl px-4 py-3 focus:border-[#d4af37] outline-none text-main`} 
                  />
                  {errors.neighborhood && <p className="text-red-500 text-[10px] font-bold">{errors.neighborhood.message}</p>}
                </div>
                <div className="md:col-span-2">
                  <input 
                    type="text" 
                    {...register('shortCode')}
                    placeholder={lang === 'ar' ? 'العنوان المختصر (Short Code)' : 'Short Code Address'} 
                    className="w-full bg-alt border border-main rounded-xl px-4 py-3 focus:border-[#d4af37] outline-none text-main" 
                  />
                </div>
              </div>
            </section>

            <section className="bg-surface p-8 rounded-3xl border border-main space-y-6 shadow-sm">
              <h2 className="text-2xl font-bold flex items-center gap-2 text-main">
                <span className="w-8 h-8 rounded-full bg-[#d4af37] text-black flex items-center justify-center text-sm font-bold">2</span>
                {lang === 'ar' ? 'طريقة الدفع' : 'Payment Method'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button type="button" className="flex items-center justify-between p-4 bg-alt border-2 border-[#d4af37] rounded-xl font-bold text-main">
                  <span>{lang === 'ar' ? 'مدى / البطاقة الائتمانية' : 'Mada / Credit Card'}</span>
                  <span className="text-lg">💳</span>
                </button>
                <button type="button" className="flex items-center justify-between p-4 bg-alt border border-main rounded-xl text-muted">
                  <span>{lang === 'ar' ? 'الدفع عند الاستلام' : 'Cash on Delivery'}</span>
                  <span className="text-lg">💵</span>
                </button>
              </div>
            </section>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-surface p-8 rounded-3xl border border-main space-y-6 sticky top-28 shadow-md">
            <h3 className="text-xl font-bold text-main">{lang === 'ar' ? 'ملخص الطلب' : 'Order Summary'}</h3>
            <div className="space-y-3 pb-6 border-b border-main">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm items-center">
                  <span className="text-muted">{item.name[lang]} x {item.quantity}</span>
                  <div className="flex items-center gap-1 font-bold text-main">
                    {item.price * item.quantity}
                    <SARSymbol className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-main items-center">
                <span className="text-muted">{lang === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}</span>
                <div className="flex items-center gap-1 font-bold">
                  {subtotal}
                  <SARSymbol className="w-3 h-3" />
                </div>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-red-500 items-center">
                  <span>{lang === 'ar' ? 'الخصم' : 'Discount'}</span>
                  <div className="flex items-center gap-1 font-bold">
                    -{discountAmount.toFixed(2)}
                    <SARSymbol className="w-3 h-3" />
                  </div>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-muted">{lang === 'ar' ? 'الشحن' : 'Shipping'}</span>
                <span className="text-green-500 font-bold">{lang === 'ar' ? 'مجاني' : 'FREE'}</span>
              </div>
              
              <div className="pt-4 space-y-2">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder={lang === 'ar' ? 'كود الخصم' : 'Discount Code'} 
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="flex-grow bg-alt border border-main rounded-xl px-4 py-2 text-sm focus:border-[#d4af37] outline-none text-main uppercase"
                  />
                  <button 
                    onClick={applyDiscount}
                    className="px-4 py-2 bg-main text-white text-xs font-bold rounded-xl hover:bg-[#d4af37] hover:text-black transition-colors"
                  >
                    {lang === 'ar' ? 'تطبيق' : 'Apply'}
                  </button>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-black pt-4 border-t border-main text-main items-center">
                <span>{lang === 'ar' ? 'الإجمالي' : 'Total'}</span>
                <div className="text-[#d4af37] flex items-center gap-1.5">
                  {total.toFixed(2)} 
                  <SARSymbol className="w-6 h-6" />
                </div>
              </div>
            </div>
            <button 
              form="checkout-form"
              type="submit"
              disabled={loading || cart.length === 0}
              className={`w-full py-5 bg-[#d4af37] text-black font-bold rounded-2xl transition-all ${loading || cart.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] shadow-lg shadow-[#d4af37]/20'}`}
            >
              {loading ? (lang === 'ar' ? 'جاري الطلب...' : 'Processing...') : (lang === 'ar' ? 'تأكيد الطلب' : 'Confirm Order')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
