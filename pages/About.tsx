
import React from 'react';
import { useApp } from '../App';

const About: React.FC = () => {
  const { lang } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-20 animate-fadeIn pt-12">
      <section className="text-center space-y-6">
        <div className="w-24 h-24 honey-gradient rounded-[2rem] mx-auto flex items-center justify-center text-white text-4xl shadow-2xl mb-8">🍯</div>
        <h1 className="text-6xl font-black text-main font-amiri">
          {lang === 'ar' ? 'عسل بن جبهان: قصة الأصالة' : 'Bin Jabhan: A Story of Authenticity'}
        </h1>
        <p className="text-2xl text-muted leading-relaxed max-w-2xl mx-auto font-light">
          {lang === 'ar' 
            ? 'من مرتفعات منطقة الباحة الشاهقة، نأتيك بأنقى ما تجود به طبيعتنا لنضعه بين يديك.' 
            : 'From the high peaks of the Al-Baha region, we bring you the purest of our nature to your hands.'}
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative group">
          <div className="absolute -inset-4 bg-[#d4af37] opacity-10 blur-2xl group-hover:opacity-20 transition-opacity"></div>
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border-2 border-main shadow-2xl transform group-hover:scale-[1.02] transition-transform">
            <img 
              src="https://images.unsplash.com/photo-1558611997-d77901767664?q=80&w=2070&auto=format&fit=crop" 
              alt="Heritage Production" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-main font-amiri">{lang === 'ar' ? 'إرث بن جبهان' : 'The Bin Jabhan Legacy'}</h2>
          <p className="text-muted text-lg leading-relaxed">
            {lang === 'ar'
              ? 'نحن في عسل بن جبهان نؤمن بأن العسل ليس مجرد غذاء، بل هو رمز للكرم العربي والجودة الأصيلة. نلتزم بأعلى معايير الاستخلاص التي تحافظ على الإنزيمات الحية والفوائد العلاجية.'
              : 'At Bin Jabhan Honey, we believe honey is not just food; it is a symbol of Arab hospitality and authentic quality. We are committed to the highest extraction standards that preserve live enzymes and therapeutic benefits.'}
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-surface p-6 rounded-3xl border-2 border-main hover:border-[#d4af37]/50 transition-colors">
              <div className="text-[#d4af37] font-black text-3xl mb-1">100%</div>
              <div className="text-[10px] text-muted uppercase tracking-[0.2em] font-bold">{lang === 'ar' ? 'نقي وخام' : 'Pure & Raw'}</div>
            </div>
            <div className="bg-surface p-6 rounded-3xl border-2 border-main hover:border-[#d4af37]/50 transition-colors">
              <div className="text-[#d4af37] font-black text-3xl mb-1">SFDA</div>
              <div className="text-[10px] text-muted uppercase tracking-[0.2em] font-bold">{lang === 'ar' ? 'معايير عالمية' : 'Global Standards'}</div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-alt/50 p-12 md:p-20 rounded-[4rem] border-2 border-main space-y-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#d4af37]"></div>
        <h2 className="text-4xl font-bold text-center text-main font-amiri">{lang === 'ar' ? 'التزامنا لعملائنا' : 'Our Promise to You'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { 
              title: { ar: 'فحص مخبري', en: 'Lab Certified' }, 
              desc: { ar: 'كل قطرة عسل تمر عبر فحوصات دقيقة لضمان النقاء.', en: 'Every drop of honey undergoes rigorous testing to guarantee purity.' }
            },
            { 
              title: { ar: 'تعبئة فاخرة', en: 'Luxury Packaging' }, 
              desc: { ar: 'نستخدم عبوات زجاجية مصممة خصيصاً للحفاظ على الطعم والجودة.', en: 'We use glass jars specially designed to preserve taste and quality.' }
            },
            { 
              title: { ar: 'خدمة راقية', en: 'Premium Service' }, 
              desc: { ar: 'تجربة تسوق تليق بذوقكم الرفيع من الطلب حتى التوصيل.', en: 'A shopping experience that matches your fine taste from order to delivery.' }
            }
          ].map((item, i) => (
            <div key={i} className="space-y-4 text-center">
              <div className="text-[#d4af37] text-2xl">✦</div>
              <h3 className="text-xl font-bold text-main">{item.title[lang]}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.desc[lang]}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
