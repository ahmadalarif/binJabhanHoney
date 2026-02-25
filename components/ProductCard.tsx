
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useApp } from '../App';

interface Props {
  product: Product;
}

// Official-style Saudi Riyal Symbol SVG Component
export const SARSymbol: React.FC<{ className?: string; color?: string }> = ({ className = "w-4 h-4", color = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12Z" stroke={color} strokeWidth="1.5"/>
    <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize="10" fontWeight="900" fill={color} style={{ fontFamily: 'Amiri, serif' }}>﷼</text>
  </svg>
);

const ProductCard: React.FC<Props> = ({ product }) => {
  const { lang, addToCart } = useApp();

  const getAvailabilityText = () => {
    switch (product.availability) {
      case 'in_stock': return lang === 'ar' ? 'متوفر' : 'In Stock';
      case 'limited_stock': return lang === 'ar' ? 'كمية محدودة' : 'Limited Stock';
      case 'out_of_stock': return lang === 'ar' ? 'نفذت الكمية' : 'Out of Stock';
      default: return '';
    }
  };

  const getAvailabilityColor = () => {
    switch (product.availability) {
      case 'in_stock': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'limited_stock': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'out_of_stock': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'text-muted';
    }
  };

  return (
    <div className="group bg-surface rounded-2xl border border-main overflow-hidden transition-all hover:border-[#d4af37]/50 hover:shadow-xl hover:shadow-[#d4af37]/5">
      <Link to={`/product/${product.id}`} className="block relative h-72 overflow-hidden bg-alt">
        <img 
          src={product.image} 
          alt={product.name[lang]} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
          <div className="ribbon-label">
            {product.category === 'honey' ? (lang === 'ar' ? 'عسل' : 'Honey') : (lang === 'ar' ? 'سمن' : 'Ghee')}
          </div>
          {product.discountPercentage && product.discountPercentage > 0 && (
            <div className={`bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg uppercase ${lang === 'en' ? 'tracking-widest' : 'tracking-normal'}`}>
              {product.discountPercentage}% OFF
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-6 space-y-4">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold leading-tight group-hover:text-[#d4af37] transition-colors text-main">
              {product.name[lang]}
            </h3>
          </div>
          <div className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${lang === 'en' ? 'tracking-tighter' : 'tracking-normal'} ${getAvailabilityColor()}`}>
            {getAvailabilityText()}
          </div>
          <p className="text-muted text-sm line-clamp-2 mt-2">
            {product.description[lang]}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="flex flex-col">
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-muted line-through opacity-60">
                  {product.originalPrice}
                </span>
              )}
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black text-[#d4af37]">{product.price}</span>
                <SARSymbol className="w-5 h-5 text-[#d4af37]" />
              </div>
            </div>
          </div>
          
          <button 
            disabled={product.availability === 'out_of_stock'}
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className={`p-3 rounded-xl transition-all active:scale-90 shadow-md ${
              product.availability === 'out_of_stock' 
                ? 'bg-alt text-muted cursor-not-allowed' 
                : 'bg-[#d4af37] hover:bg-[#b8860b] text-black shadow-[#d4af37]/10'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
