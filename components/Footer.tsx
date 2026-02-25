
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../App';

const Footer: React.FC = () => {
  const { lang, customLogo } = useApp();

  const socialLinks = [
    { name: 'Instagram', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>, url: '#' },
    { name: 'Snapchat', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c-3.1 0-5.8 2.2-6 5.5-.1 1.1.2 2.1.8 3 .1.1.2.3.2.4 0 .4-.5.7-1 .7-.6 0-1 .5-1 1s.4 1 1 1c.5 0 1 .4 1 1.1 0 1.2 1.3 1.9 2.5 1.9 1 0 2.1-.5 2.5-1.5.2.2.5.4.8.5.5.2 1 .3 1.5.3s1-.1 1.5-.3c.3-.1.6-.3.8-.5.4 1 1.5 1.5 2.5 1.5 1.2 0 2.5-.7 2.5-1.9 0-.7.5-1.1 1-1.1.6 0 1-.5 1-1s-.4-1-1-1c-.5 0-1-.3-1-.7 0-.1.1-.3.2-.4.6-.9.9-1.9.8-3-.2-3.3-2.9-5.5-6-5.5z"/></svg>, url: '#' },
    { name: 'TikTok', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31 0 2.591.215 3.758.63V5.05c-1.013-.306-2.104-.467-3.233-.467-2.903 0-5.257 2.354-5.257 5.257 0 2.903 2.354 5.257 5.257 5.257 2.903 0 5.257-2.354 5.257-5.257V0h4.212c0 2.97 2.409 5.379 5.379 5.379v4.211c-1.567 0-3.003-.591-4.093-1.56v5.813c0 5.231-4.238 9.472-9.472 9.472-5.232 0-9.472-4.241-9.472-9.472 0-5.233 4.24-9.472 9.472-9.472.105 0 .209.002.312.006V.02z"/></svg> }
  ];

  return (
    <footer className="bg-surface border-t border-main pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            {customLogo ? (
              <img src={customLogo} alt="Logo" className="w-12 h-12 object-contain rounded-lg border border-main" />
            ) : null}
            <h3 className="text-2xl font-bold text-main">{lang === 'ar' ? 'عسل بن جبهان' : 'Bin Jabhan Honey'}</h3>
          </div>
          <p className="text-muted max-w-sm mb-6">
            {lang === 'ar' 
              ? 'نقدم أجود أنواع العسل والسمن البلدي من قلب طبيعة المملكة العربية السعودية. جودة مختبرية مضمونة.'
              : 'Providing the finest types of honey and local ghee from the heart of Saudi Arabia. Lab-tested quality guaranteed.'}
          </p>
          
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-[11px] font-bold text-muted uppercase tracking-widest">
              <span>{lang === 'ar' ? 'سجل تجاري:' : 'CR No:'}</span>
              <span className="text-main">1234567890</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-muted uppercase tracking-widest">
              <span>{lang === 'ar' ? 'الرقم الضريبي:' : 'VAT No:'}</span>
              <span className="text-main">300000000000003</span>
            </div>
          </div>

          <div className="flex gap-4">
            {socialLinks.map(social => (
              <a 
                key={social.name} 
                href={social.url} 
                className="w-10 h-10 rounded-full bg-alt border border-main text-main flex items-center justify-center cursor-pointer hover:bg-main hover:text-[#d4af37] hover:border-[#d4af37] transition-all"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-main">{lang === 'ar' ? 'روابط هامة' : 'Useful Links'}</h4>
          <ul className="space-y-2 text-muted text-sm">
            <li><Link to="/about" className="hover:text-[#d4af37] transition-colors">{lang === 'ar' ? 'من نحن' : 'About Us'}</Link></li>
            <li><Link to="/contact" className="hover:text-[#d4af37] transition-colors">{lang === 'ar' ? 'تواصل معنا' : 'Contact'}</Link></li>
            <li><Link to="/refund-policy" className="hover:text-[#d4af37] transition-colors">{lang === 'ar' ? 'سياسة الاسترجاع' : 'Refund Policy'}</Link></li>
            <li><Link to="/track" className="hover:text-[#d4af37] transition-colors">{lang === 'ar' ? 'تتبع الشحنة' : 'Track Order'}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-main">{lang === 'ar' ? 'العنوان' : 'Address'}</h4>
          <p className="text-muted mb-4 text-sm">
            {lang === 'ar' 
              ? 'المملكة العربية السعودية، الباحة'
              : 'Saudi Arabia, Al-Baha'}
            <br />
            <span className="text-[#d4af37]">support@bjhoney.com</span>
          </p>
          <div className="pt-4 flex items-center gap-4">
             <a href="https://business.sa" target="_blank" rel="noreferrer" className="block w-24 grayscale hover:grayscale-0 transition-all">
                <img src="https://business.sa/images/logo-badge.png" alt="Business.sa Authentication" className="w-full h-auto" onError={(e) => (e.currentTarget.src = "https://cdn.worldvectorlogo.com/logos/saudi-vision-2030.svg")}/>
             </a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-main">{lang === 'ar' ? 'حمل التطبيق' : 'Download App'}</h4>
          <div className="flex flex-col gap-3">
            <a href="#" className="flex items-center gap-3 bg-alt border border-main px-4 py-2 rounded-xl hover:border-[#d4af37] transition-colors group">
              <div className="text-main group-hover:text-[#d4af37]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.48-1.34.03-1.77-.79-3.29-.79-1.53 0-1.99.77-3.27.82-1.31.05-2.31-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              </div>
              <div className="text-left rtl:text-right">
                <div className="text-[10px] text-muted leading-none">Download on the</div>
                <div className="text-sm font-bold text-main">App Store</div>
              </div>
            </a>
            <a href="#" className="flex items-center gap-3 bg-alt border border-main px-4 py-2 rounded-xl hover:border-[#d4af37] transition-colors group">
              <div className="text-main group-hover:text-[#d4af37]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 20.5v-17c0-.3.1-.5.3-.7l9.5 9.5-9.5 9.5c-.2-.2-.3-.4-.3-.7v-1.3zm11.2-8.2l-3.2-3.2 8-4.6c.4-.2.8-.2 1.1 0l-5.9 7.8zm-1.8 1.8l-9.4 9.4c.1.1.3.1.5.1.4 0 .8-.2 1.1-.4l7.8-4.5-5.9-4.6zM21 12c0 .4-.2.8-.4 1l-2.6 1.5-3.3-3.3 3.3-3.3L20.6 11c.2.2.4.6.4 1z"/></svg>
              </div>
              <div className="text-left rtl:text-right">
                <div className="text-[10px] text-muted leading-none">Get it on</div>
                <div className="text-sm font-bold text-main">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-main flex flex-col md:flex-row justify-between items-center gap-4 text-muted text-[11px] font-bold uppercase tracking-widest">
        <span>&copy; {new Date().getFullYear()} Bin Jabhan Honey. All rights reserved.</span>
        <div className="flex items-center gap-6">
           <Link to="/refund-policy" className="hover:text-main">Terms</Link>
           <Link to="/refund-policy" className="hover:text-main">Privacy</Link>
           <div className="flex items-center gap-2">
              <span>{lang === 'ar' ? 'نقبل دفع' : 'We Accept'}</span>
              <div className="flex gap-1 h-4 grayscale opacity-60">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Mada_Logo.svg" alt="Mada" className="h-full w-auto" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-full w-auto" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-full w-auto" />
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
