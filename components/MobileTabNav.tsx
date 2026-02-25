
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../App';

const MobileTabNav: React.FC = () => {
  const { lang, cart, user } = useApp();
  const location = useLocation();

  const tabs = [
    { 
      path: '/', 
      label: { ar: 'الرئيسية', en: 'Home' },
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? 'text-[#d4af37]' : 'text-muted'}`} fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      path: '/shop', 
      label: { ar: 'المتجر', en: 'Shop' },
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? 'text-[#d4af37]' : 'text-muted'}`} fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    { 
      path: '/cart', 
      label: { ar: 'السلة', en: 'Cart' },
      badge: cart.length > 0 ? cart.length : null,
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? 'text-[#d4af37]' : 'text-muted'}`} fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      path: user ? '/profile' : '/login', 
      label: { ar: 'حسابي', en: 'Profile' },
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? 'text-[#d4af37]' : 'text-muted'}`} fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-xl border-t border-main safe-bottom z-[100]">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <Link key={tab.path} to={tab.path} className="flex flex-col items-center justify-center flex-1 py-2 relative">
              {tab.icon(isActive)}
              <span className={`text-[10px] mt-1 font-medium transition-colors ${isActive ? 'text-[#d4af37]' : 'text-muted'}`}>
                {tab.label[lang]}
              </span>
              {tab.badge && (
                <span className="absolute top-1 right-1/2 translate-x-4 bg-[#d4af37] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-surface">
                  {tab.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileTabNav;
