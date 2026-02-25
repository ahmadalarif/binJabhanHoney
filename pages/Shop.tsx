
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../App';
import ProductCard from '../components/ProductCard';

const Shop: React.FC = () => {
  const { lang, products } = useApp();
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') as any || 'all';
  
  const [category, setCategory] = useState<'all' | 'honey' | 'ghee'>(initialCat);
  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = category === 'all' || p.category === category;
      const matchesSearch = p.name[lang].toLowerCase().includes(search.toLowerCase()) || 
                           p.description[lang].toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [category, search, lang, products]);

  return (
    <div className="space-y-12 animate-fadeIn">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-main">{lang === 'ar' ? 'كتالوج المنتجات' : 'Product Catalog'}</h1>
          <p className="text-muted">{lang === 'ar' ? 'تصفح أفضل منتجاتنا المختارة بعناية' : 'Browse our handpicked finest products'}</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder={lang === 'ar' ? 'ابحث عن منتج...' : 'Search products...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-64 bg-surface border border-main rounded-xl px-4 py-2 focus:outline-none focus:border-[#d4af37] text-main shadow-sm"
            />
          </div>
          <div className="flex bg-surface p-1 rounded-xl border border-main shadow-sm">
            {(['all', 'honey', 'ghee'] as const).map((cat) => (
               <button 
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-sm transition-all ${category === cat ? 'bg-[#d4af37] text-black font-bold shadow-md shadow-[#d4af37]/20' : 'text-muted hover:text-main'}`}
              >
                {cat === 'all' ? (lang === 'ar' ? 'الكل' : 'All') : (cat === 'honey' ? (lang === 'ar' ? 'عسل' : 'Honey') : (lang === 'ar' ? 'سمن' : 'Ghee'))}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-20 text-center text-muted border-2 border-dashed border-main rounded-3xl">
            {lang === 'ar' ? 'لا توجد منتجات تطابق بحثك' : 'No products found matching your search'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
