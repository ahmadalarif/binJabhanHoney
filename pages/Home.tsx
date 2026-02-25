
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../App';
import { INITIAL_PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { lang, theme } = useApp();
  const featured = INITIAL_PRODUCTS.slice(0, 3);

  React.useEffect(() => {
    document.title = lang === 'ar' 
      ? 'عسل بن جبهان | الصفحة الرئيسية - عسل طبيعي نقي' 
      : 'Bin Jabhan Honey | Home - Pure Natural Honey';
  }, [lang]);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden rounded-[3rem] shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1589733901241-5d5d9b6ad8c4?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-60 scale-105 hover:scale-100 transition-transform duration-[15s]"
            alt="Hero Background"
          />
          <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-r from-black via-black/60 to-transparent' : 'bg-gradient-to-r from-white via-white/60 to-transparent'}`} />
          
          {/* Mountain Silhouette Overlay (Visual Identity) */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-20 pointer-events-none">
            <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
              <path fill="var(--accent-gold)" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,218.7C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </div>
        
        <div className="relative z-10 max-w-2xl ml-8 md:ml-20 space-y-8 px-4">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/30 text-[#d4af37] text-xs font-bold uppercase ${lang === 'en' ? 'tracking-[0.2em]' : 'tracking-normal'}`}>
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
            {lang === 'ar' ? 'عسل طبيعي نقي 100%' : '100% Pure Natural Honey'}
          </div>
          <h1 className={`text-5xl md:text-8xl font-black leading-[1.1] text-main font-amiri ${lang === 'en' ? 'tracking-tight' : 'tracking-normal'}`}>
            {lang === 'ar' ? 'عسل بن جبهان: إرث الطبيعة' : 'Bin Jabhan: Nature\'s Heritage'}
          </h1>
          <p className="text-xl md:text-2xl text-muted max-w-xl leading-relaxed">
            {lang === 'ar' 
              ? 'نقدم لكم أجود أنواع العسل المستخلص من جبال الباحة الشاهقة، حيث تلتقي الأصالة بالجودة العالمية.' 
              : 'The finest honey harvested from the towering mountains of Al-Baha, where authenticity meets world-class quality.'}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link 
              to="/shop" 
              className="px-10 py-5 bg-[#d4af37] hover:bg-[#b8860b] text-black font-black rounded-2xl transition-all hover:scale-105 shadow-2xl shadow-[#d4af37]/30 text-lg"
            >
              {lang === 'ar' ? 'اكتشف مجموعتنا' : 'Explore Collection'}
            </Link>
            <Link 
              to="/about" 
              className="px-10 py-5 bg-surface border-2 border-main text-main font-bold rounded-2xl transition-all hover:bg-alt shadow-lg text-lg"
            >
              {lang === 'ar' ? 'قصتنا' : 'Our Story'}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 space-y-12">
        <div className="flex items-center gap-4">
          <div className="h-px flex-grow bg-main opacity-20"></div>
          <h2 className={`text-3xl font-black text-main font-amiri uppercase px-4 ${lang === 'en' ? 'tracking-widest' : 'tracking-normal'}`}>
            {lang === 'ar' ? 'الأكثر طلباً' : 'Best Sellers'}
          </h2>
          <div className="h-px flex-grow bg-main opacity-20"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="relative overflow-hidden bg-surface py-20 border-y border-main group">
        <div className="absolute top-0 right-0 w-64 h-64 honey-gradient opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-4 text-center space-y-8 relative z-10">
          <div className="text-6xl mx-auto mb-4 animate-bounce-slow">🐝</div>
          <h2 className="text-4xl md:text-6xl font-bold text-main font-amiri">
            {lang === 'ar' ? 'انضم لعشاق عسل بن جبهان' : 'Join the Bin Jabhan Circle'}
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            {lang === 'ar' 
              ? 'انضم لقناتنا على واتساب للحصول على تنبيهات بالمنتجات الموسمية النادرة والعروض الحصرية.' 
              : 'Join our WhatsApp channel to get alerts on rare seasonal harvests and exclusive member offers.'}
          </p>
          <div className="flex justify-center pt-4">
            <a 
              href="https://whatsapp.com/channel/example" 
              target="_blank" 
              rel="noreferrer"
              className="px-12 py-5 bg-[#25D366] text-white font-black rounded-2xl transition-all hover:scale-105 shadow-2xl shadow-[#25D366]/30 flex items-center gap-3 text-xl"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.408 0 12.044c0 2.123.555 4.197 1.608 6.023L0 24l6.117-1.604a11.803 11.803 0 005.925 1.585h.005c6.637 0 12.046-5.411 12.05-12.048 0-3.218-1.251-6.242-3.522-8.513z"/></svg>
              {lang === 'ar' ? 'انضم للقناة' : 'Join Channel'}
            </a>
          </div>
        </div>
      </section>
      
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 5s ease-in-out infinite;
        }
        .font-amiri { font-family: 'Amiri', serif; }
      `}</style>
    </div>
  );
};

export default Home;
