
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { SARSymbol } from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang, addToCart, products } = useApp();
  
  const product = products.find(p => p.id === id);

  React.useEffect(() => {
    if (product) {
      document.title = `${product.name[lang]} | Bin Jabhan Honey`;
    }
  }, [product, lang]);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-main">{lang === 'ar' ? 'المنتج غير موجود' : 'Product Not Found'}</h2>
        <button onClick={() => navigate('/shop')} className="text-[#d4af37]">
          {lang === 'ar' ? 'العودة للمتجر' : 'Back to Shop'}
        </button>
      </div>
    );
  }

  const getAvailabilityText = () => {
    switch (product.availability) {
      case 'in_stock': return lang === 'ar' ? 'متوفر حالياً' : 'Available Now';
      case 'limited_stock': return lang === 'ar' ? 'الكمية محدودة جداً' : 'Very Limited Stock';
      case 'out_of_stock': return lang === 'ar' ? 'نفذت الكمية' : 'Out of Stock';
      default: return '';
    }
  };

  const getAvailabilityColor = () => {
    switch (product.availability) {
      case 'in_stock': return 'bg-green-500';
      case 'limited_stock': return 'bg-amber-500';
      case 'out_of_stock': return 'bg-red-500';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 animate-fadeIn items-start py-8">
      {/* Product Image Section */}
      <div className="space-y-6">
        <div className="aspect-square bg-surface rounded-[3rem] overflow-hidden border border-main shadow-2xl group relative">
          <img 
            src={product.image} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            alt={product.name[lang]} 
          />
          {product.discountPercentage && product.discountPercentage > 0 && (
            <div className="absolute top-8 right-8 bg-red-600 text-white px-6 py-2 rounded-xl text-lg font-black shadow-2xl rotate-3">
              {product.discountPercentage}% OFF
            </div>
          )}
        </div>
        
        {/* Badges/Info Grid */}
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-surface p-6 rounded-3xl border border-main flex flex-col items-center justify-center text-center space-y-1">
             <span className="text-[10px] font-black text-muted uppercase tracking-widest">{lang === 'ar' ? 'الوزن الصافي' : 'Net Weight'}</span>
             <span className="text-2xl font-black text-main">{product.weightKg} <span className="text-xs text-[#d4af37] uppercase">{lang === 'ar' ? 'كجم' : 'KG'}</span></span>
           </div>
           <div className="bg-surface p-6 rounded-3xl border border-main flex flex-col items-center justify-center text-center space-y-1">
             <span className="text-[10px] font-black text-muted uppercase tracking-widest">{lang === 'ar' ? 'المصدر' : 'Origin'}</span>
             <span className="text-sm font-black text-main uppercase">{product.origin.split(',')[0]}</span>
           </div>
        </div>
      </div>

      {/* Product Content Section */}
      <div className="space-y-10 lg:sticky lg:top-28">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`inline-block px-4 py-1.5 bg-[#d4af37]/10 text-[#d4af37] rounded-full text-[10px] font-black uppercase border border-[#d4af37]/20 ${lang === 'en' ? 'tracking-widest' : 'tracking-normal'}`}>
              {product.category === 'honey' ? (lang === 'ar' ? 'عسل طبيعي' : 'Natural Honey') : (lang === 'ar' ? 'سمن بلدي' : 'Traditional Ghee')}
            </div>
            <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-white ${getAvailabilityColor()} ${lang === 'en' ? 'tracking-widest' : 'tracking-normal'}`}>
              {getAvailabilityText()}
            </div>
          </div>
          
          <h1 className={`text-5xl lg:text-7xl font-black text-main leading-[0.95] ${lang === 'en' ? 'tracking-tight' : 'tracking-normal'}`}>{product.name[lang]}</h1>
          
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-lg text-muted line-through opacity-50 mb-1">
                  {product.originalPrice} SAR
                </span>
              )}
              <div className="flex items-center gap-3">
                <span className="text-5xl font-black text-[#d4af37]">{product.price}</span>
                <SARSymbol className="w-10 h-10 text-[#d4af37]" />
              </div>
            </div>
            <div className="h-14 w-px bg-main/20" />
            <div className="flex flex-col gap-1">
               <div className="flex items-center gap-2">
                 <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${getAvailabilityColor()}`}></div>
                 <span className={`text-xs font-black uppercase text-main ${lang === 'en' ? 'tracking-widest' : 'tracking-normal'}`}>
                   {product.availability === 'out_of_stock' ? (lang === 'ar' ? 'غير متوفر' : 'Unavailable') : (lang === 'ar' ? 'جاهز للشحن' : 'Ready for Shipping')}
                 </span>
               </div>
               {product.discountPercentage && product.discountPercentage > 0 && (
                 <span className={`text-[10px] font-bold text-red-500 uppercase ${lang === 'en' ? 'tracking-widest' : 'tracking-normal'}`}>
                   {lang === 'ar' ? `وفر ${product.discountPercentage}%` : `Save ${product.discountPercentage}% Now`}
                 </span>
               )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
             <h3 className={`text-xs font-black text-muted uppercase ${lang === 'en' ? 'tracking-widest' : 'tracking-normal'}`}>{lang === 'ar' ? 'نبذة عن المنتج' : 'About Product'}</h3>
             <p className="text-xl text-muted leading-relaxed font-light">{product.description[lang]}</p>
          </div>

          {product.details && (
            <div className="space-y-2 pt-4 border-t border-main/10">
               <h3 className={`text-xs font-black text-muted uppercase ${lang === 'en' ? 'tracking-widest' : 'tracking-normal'}`}>{lang === 'ar' ? 'المواصفات الفنية' : 'Technical Specs'}</h3>
               <p className="text-md text-main font-medium leading-relaxed">{product.details[lang]}</p>
            </div>
          )}
        </div>

        <div className="pt-4">
          <button 
            disabled={product.availability === 'out_of_stock'}
            onClick={() => addToCart(product)}
            className={`w-full py-6 font-black rounded-[2rem] transition-all text-xl uppercase ${lang === 'en' ? 'tracking-widest' : 'tracking-normal'} ${
              product.availability === 'out_of_stock'
                ? 'bg-alt border border-main text-muted cursor-not-allowed opacity-50'
                : 'bg-[#d4af37] hover:bg-[#b8860b] text-black hover:scale-[1.02] shadow-2xl shadow-[#d4af37]/30'
            }`}
          >
            {product.availability === 'out_of_stock' 
              ? (lang === 'ar' ? 'نفذت الكمية' : 'Out of Stock') 
              : (lang === 'ar' ? 'أضف للسلة الآن' : 'Add to Cart Now')}
          </button>
          <p className={`text-center text-[10px] text-muted font-bold uppercase mt-4 ${lang === 'en' ? 'tracking-widest' : 'tracking-normal'}`}>
            {lang === 'ar' ? 'توصيل مجاني للطلبات فوق ٣٥٠ ر.س' : 'Free Shipping on orders above 350 SAR'}
          </p>
        </div>
      </div>

      {/* Other Products Section */}
      <div className="lg:col-span-2 pt-16 border-t border-main/10 mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className={`text-3xl font-black text-main font-amiri ${lang === 'en' ? 'tracking-tight' : 'tracking-normal'}`}>
            {lang === 'ar' ? 'منتجات قد تعجبك' : 'Other Products You May Like'}
          </h2>
          <button onClick={() => navigate('/shop')} className="text-[#d4af37] font-bold text-sm hover:underline">
            {lang === 'ar' ? 'مشاهدة الكل' : 'View All'}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {products
            .filter(p => p.id !== id)
            .slice(0, 4)
            .map(p => (
              <div 
                key={p.id} 
                onClick={() => {
                  navigate(`/product/${p.id}`);
                  window.scrollTo(0, 0);
                }}
                className="bg-surface p-4 rounded-3xl border border-main group hover:border-[#d4af37] transition-all cursor-pointer"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                  <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={p.name[lang]} />
                </div>
                <h4 className="font-bold text-main mb-1 truncate">{p.name[lang]}</h4>
                <div className="flex items-center gap-1.5 text-[#d4af37] font-black">
                  <span>{p.price}</span>
                  <SARSymbol className="w-4 h-4" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
