
import React, { useState } from 'react';
import { useApp } from '../App';

const Contact: React.FC = () => {
  const { lang } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const socials = [
    { name: 'Instagram', label: { ar: 'انستغرام', en: 'Instagram' }, color: '#E1306C', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
    { name: 'Facebook', label: { ar: 'فيسبوك', en: 'Facebook' }, color: '#1877F2', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
    { name: 'Snapchat', label: { ar: 'سناب شات', en: 'Snapchat' }, color: '#FFFC00', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.2c-3.1 0-5.8 2.2-6 5.5-.1 1.1.2 2.1.8 3 .1.1.2.3.2.4 0 .4-.5.7-1 .7-.6 0-1 .5-1 1s.4 1 1 1c.5 0 1 .4 1 1.1 0 1.2 1.3 1.9 2.5 1.9 1 0 2.1-.5 2.5-1.5.2.2.5.4.8.5.5.2 1 .3 1.5.3s1-.1 1.5-.3c.3-.1.6-.3.8-.5.4 1 1.5 1.5 2.5 1.5 1.2 0 2.5-.7 2.5-1.9 0-.7.5-1.1 1-1.1.6 0 1-.5 1-1s-.4-1-1-1c-.5 0-1-.3-1-.7 0-.1.1-.3.2-.4.6-.9.9-1.9.8-3-.2-3.3-2.9-5.5-6-5.5z"/></svg> },
    { name: 'TikTok', label: { ar: 'تيك توك', en: 'TikTok' }, color: '#000000', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31 0 2.591.215 3.758.63V5.05c-1.013-.306-2.104-.467-3.233-.467-2.903 0-5.257 2.354-5.257 5.257 0 2.903 2.354 5.257 5.257 5.257 2.903 0 5.257-2.354 5.257-5.257V0h4.212c0 2.97 2.409 5.379 5.379 5.379v4.211c-1.567 0-3.003-.591-4.093-1.56v5.813c0 5.231-4.238 9.472-9.472 9.472-5.232 0-9.472-4.241-9.472-9.472 0-5.233 4.24-9.472 9.472-9.472.105 0 .209.002.312.006V.02z"/></svg> }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-fadeIn">
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-main">{lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}</h1>
        <p className="text-muted">{lang === 'ar' ? 'نحن هنا للإجابة على جميع استفساراتكم' : 'We are here to answer all your inquiries'}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-surface p-8 rounded-3xl border border-main space-y-6 shadow-sm">
            <h3 className="text-xl font-bold text-main">{lang === 'ar' ? 'معلومات الاتصال' : 'Contact Info'}</h3>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-alt border border-main flex items-center justify-center text-[#d4af37]">📍</div>
                <div>
                  <div className="font-bold text-main text-sm">{lang === 'ar' ? 'المقر الرئيسي' : 'Headquarters'}</div>
                  <div className="text-muted text-xs">{lang === 'ar' ? 'الباحة، المملكة العربية السعودية' : 'Al-Baha, Saudi Arabia'}</div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-alt border border-main flex items-center justify-center text-[#d4af37]">📞</div>
                <div>
                  <div className="font-bold text-main text-sm">{lang === 'ar' ? 'الجوال' : 'Phone'}</div>
                  <div className="text-muted text-xs">+966 50 000 0000</div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-alt border border-main flex items-center justify-center text-[#d4af37]">📧</div>
                <div>
                  <div className="font-bold text-main text-sm">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</div>
                  <div className="text-muted text-xs">support@bjhoney.com</div>
                </div>
              </div>
            </div>

            <a 
              href="https://wa.me/966500000000" 
              className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white font-bold rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-[#25D366]/20"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.408 0 12.044c0 2.123.555 4.197 1.608 6.023L0 24l6.117-1.604a11.803 11.803 0 005.925 1.585h.005c6.637 0 12.046-5.411 12.05-12.048 0-3.218-1.251-6.242-3.522-8.513z"/></svg>
              {lang === 'ar' ? 'تحدث معنا عبر واتساب' : 'Chat via WhatsApp'}
            </a>
          </div>

          <div className="bg-surface p-8 rounded-3xl border border-main space-y-6 shadow-sm">
            <h3 className="text-xl font-bold text-main">{lang === 'ar' ? 'تابعنا على' : 'Follow Us'}</h3>
            <div className="grid grid-cols-2 gap-3">
              {socials.map(social => (
                <a 
                  key={social.name}
                  href="#" 
                  className="flex items-center gap-3 p-3 rounded-xl bg-alt border border-main hover:border-[#d4af37] transition-all group"
                >
                  <div className="text-muted group-hover:text-[#d4af37]">
                    {social.icon}
                  </div>
                  <span className="text-xs font-bold text-main">{social.label[lang]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-surface p-8 md:p-12 rounded-[3rem] border border-main space-y-6 shadow-md relative overflow-hidden">
            {submitted && (
              <div className="absolute inset-0 bg-[#d4af37] flex items-center justify-center text-black font-bold text-xl z-10 animate-fadeIn">
                {lang === 'ar' ? 'تم الإرسال بنجاح!' : 'Sent successfully!'}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase tracking-widest">{lang === 'ar' ? 'الاسم' : 'Name'}</label>
                <input required type="text" className="w-full bg-alt border border-main rounded-xl px-4 py-3 focus:border-[#d4af37] outline-none text-main" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase tracking-widest">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
                <input required type="email" className="w-full bg-alt border border-main rounded-xl px-4 py-3 focus:border-[#d4af37] outline-none text-main" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-widest">{lang === 'ar' ? 'الموضوع' : 'Subject'}</label>
              <input required type="text" className="w-full bg-alt border border-main rounded-xl px-4 py-3 focus:border-[#d4af37] outline-none text-main" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-widest">{lang === 'ar' ? 'الرسالة' : 'Message'}</label>
              <textarea required rows={5} className="w-full bg-alt border border-main rounded-xl px-4 py-3 focus:border-[#d4af37] outline-none text-main resize-none"></textarea>
            </div>
            <button type="submit" className="w-full py-5 bg-[#d4af37] text-black font-bold rounded-2xl hover:bg-[#b8860b] transition-all shadow-lg shadow-[#d4af37]/20">
              {lang === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
