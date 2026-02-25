
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../App';

const Navbar: React.FC = () => {
  const { lang, setLang, theme, toggleTheme, cart, user, customLogo, notifications, markNotificationRead } = useApp();
  const [showNotifs, setShowNotifs] = React.useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { name: { en: 'Home', ar: 'الرئيسية' }, path: '/' },
    { name: { en: 'Shop', ar: 'المتجر' }, path: '/shop' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-main py-3 safe-top">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            {customLogo ? (
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#d4af37] shadow-lg shadow-[#d4af37]/10 bg-black flex items-center justify-center">
                <img src={customLogo} alt="Bin Jabhan Logo" className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="w-12 h-12 honey-gradient rounded-xl rotate-3 group-hover:rotate-0 transition-transform flex items-center justify-center text-white shadow-lg shadow-[#d4af37]/20">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
               <div className="w-4 h-4 bg-[#d4af37] rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className={`text-xl font-bold text-main leading-none font-amiri ${lang === 'en' ? 'tracking-tight' : 'tracking-normal'}`}>
              {lang === 'ar' ? 'عسل بن جبهان' : 'Bin Jabhan Honey'}
            </span>
            <span className={`text-[9px] font-bold text-[#d4af37] uppercase mt-1 ${lang === 'en' ? 'tracking-[0.25em]' : 'tracking-normal'}`}>
              {lang === 'ar' ? 'جودة فاخرة من الباحة' : 'Premium Al-Baha Quality'}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`text-sm font-bold uppercase hover:text-[#d4af37] transition-colors text-main ${lang === 'en' ? 'tracking-widest' : 'tracking-normal'}`}
            >
              {item.name[lang]}
            </Link>
          ))}
          {user?.role === 'admin' && (
            <Link to="/admin" className="text-xs font-bold text-black bg-[#d4af37] px-4 py-2 rounded-full hover:bg-white transition-all shadow-md">
              {lang === 'ar' ? 'لوحة التحكم' : 'ADMIN PANEL'}
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-alt hover:bg-main border border-main text-main transition-all active:scale-95 shadow-sm"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.95 16.95l.707.707M7.05 7.05l.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <button 
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="w-10 h-10 flex items-center justify-center text-[10px] font-black border border-main rounded-full hover:bg-alt text-main transition-colors"
          >
            {lang === 'ar' ? 'EN' : 'ع'}
          </button>

          <div className="flex items-center gap-1 md:gap-2">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifs(!showNotifs)}
                className="p-2.5 text-main bg-alt rounded-full hover:bg-[#d4af37]/10 transition-colors relative"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold border-2 border-surface">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifs && (
                <div className="absolute right-0 mt-2 w-80 bg-surface border border-main rounded-2xl shadow-2xl overflow-hidden animate-fadeIn z-[60]">
                  <div className="p-4 border-b border-main flex justify-between items-center bg-alt">
                    <span className="font-bold text-xs uppercase tracking-widest">{lang === 'ar' ? 'التنبيهات' : 'Notifications'}</span>
                    {unreadCount > 0 && <span className="text-[10px] text-[#d4af37] font-bold">{unreadCount} {lang === 'ar' ? 'جديد' : 'New'}</span>}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-muted text-xs italic">
                        {lang === 'ar' ? 'لا توجد تنبيهات حالياً' : 'No notifications yet'}
                      </div>
                    ) : (
                      notifications.slice(0, 5).map(n => (
                        <div 
                          key={n.id} 
                          onClick={() => {
                            markNotificationRead(n.id);
                            setShowNotifs(false);
                          }}
                          className={`p-4 border-b border-main hover:bg-alt transition-colors cursor-pointer ${!n.read ? 'bg-[#d4af37]/5' : ''}`}
                        >
                          <div className="flex gap-3">
                            <span className="text-xl">
                              {n.type === 'order' ? '📦' : n.type === 'offer' ? '🔥' : '🍯'}
                            </span>
                            <div className="space-y-1">
                              <p className="text-xs font-bold text-main leading-tight">{n.title[lang]}</p>
                              <p className="text-[10px] text-muted line-clamp-2">{n.message[lang]}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <Link 
                    to={user?.role === 'admin' ? "/admin/notifications" : "#"} 
                    className="block p-3 text-center text-[10px] font-bold text-[#d4af37] uppercase hover:bg-alt"
                    onClick={() => setShowNotifs(false)}
                  >
                    {lang === 'ar' ? 'عرض الكل' : 'View All'}
                  </Link>
                </div>
              )}
            </div>

            <Link to="/cart" className="relative p-2.5 text-main bg-alt rounded-full hover:bg-[#d4af37]/10 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d4af37] text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-surface shadow-md">
                  {cart.length}
                </span>
              )}
            </Link>

            <Link to={user ? "/profile" : "/login"} className="p-2.5 text-main bg-alt rounded-full hover:bg-[#d4af37]/10 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
