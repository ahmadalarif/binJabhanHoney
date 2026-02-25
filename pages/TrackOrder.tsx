
import React, { useState } from 'react';
import { useApp } from '../App';
import { trackShipment } from '../services/torod';

const TrackOrder: React.FC = () => {
  const { lang } = useApp();
  const [trackingNum, setTrackingNum] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNum) return;
    
    setLoading(true);
    setError('');
    try {
      const data = await trackShipment(trackingNum);
      setResult(data);
    } catch (err) {
      setError(lang === 'ar' ? 'رقم التتبع غير صحيح' : 'Invalid tracking number');
    } finally {
      setLoading(false);
    }
  };

  const statusSteps = ['pending', 'shipped', 'delivered'];
  const currentStepIdx = result ? statusSteps.indexOf(result.status) : -1;

  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-fadeIn">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-main">{lang === 'ar' ? 'تتبع شحنتك' : 'Track Your Shipment'}</h1>
        <p className="text-muted">{lang === 'ar' ? 'أدخل رقم التتبع الخاص بـ تورود لمتابعة حالة طلبك' : 'Enter your Torod tracking number to follow your order status'}</p>
      </header>

      <form onSubmit={handleTrack} className="flex gap-4">
        <input 
          type="text" 
          value={trackingNum}
          onChange={(e) => setTrackingNum(e.target.value)}
          placeholder="TRD-XXXXXX"
          className="flex-grow bg-surface border border-main rounded-2xl px-6 py-4 focus:border-[#d4af37] outline-none text-main shadow-lg"
        />
        <button 
          disabled={loading}
          className="px-8 py-4 bg-[#d4af37] text-black font-bold rounded-2xl transition-transform active:scale-95 disabled:opacity-50"
        >
          {loading ? '...' : (lang === 'ar' ? 'تتبع' : 'Track')}
        </button>
      </form>

      {error && <div className="text-center text-red-500 font-bold">{error}</div>}

      {result && (
        <div className="bg-surface p-10 rounded-[3rem] border border-main space-y-12 shadow-xl animate-fadeIn">
          <div className="flex justify-between items-center border-b border-main pb-6">
            <div>
              <div className="text-xs text-muted uppercase tracking-widest">{lang === 'ar' ? 'رقم التتبع' : 'Tracking Number'}</div>
              <div className="text-xl font-bold text-main">{result.trackingNumber}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted uppercase tracking-widest">{lang === 'ar' ? 'الناقل' : 'Carrier'}</div>
              <div className="text-xl font-bold text-[#d4af37]">{result.carrier}</div>
            </div>
          </div>

          <div className="relative flex justify-between">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-alt z-0"></div>
            {statusSteps.map((step, idx) => {
              const isActive = idx <= currentStepIdx;
              const isCurrent = idx === currentStepIdx;
              return (
                <div key={step} className="relative z-10 flex flex-col items-center gap-3">
                  <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center transition-all ${
                    isActive ? 'bg-[#d4af37] border-[#d4af37] text-black' : 'bg-surface border-alt text-muted'
                  } ${isCurrent ? 'ring-4 ring-[#d4af37]/20 scale-110' : ''}`}>
                    {isActive ? '✓' : idx + 1}
                  </div>
                  <div className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-main' : 'text-muted'}`}>
                    {step}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 pt-6 border-t border-main">
            <h3 className="font-bold text-main">{lang === 'ar' ? 'آخر التحديثات' : 'Last Updates'}</h3>
            {result.events.map((ev: any, i: number) => (
              <div key={i} className="flex gap-4 text-sm">
                <div className="text-[#d4af37] font-mono whitespace-nowrap">{new Date(ev.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                <div className="text-main font-bold">{ev.description}</div>
                <div className="text-muted ml-auto italic">@{ev.location}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
