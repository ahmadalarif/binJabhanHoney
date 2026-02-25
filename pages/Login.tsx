
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { sendOTP, verifyOTP } from '../services/verification';
import { useForm } from 'react-hook-form';

interface LoginForm {
  phone: string;
}

const Login: React.FC = () => {
  const { lang, login } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSendOtp = async (data: LoginForm, method: 'sms' | 'whatsapp') => {
    setLoading(true);
    setError('');
    setPhone(data.phone);
    
    const result = await sendOTP(method, data.phone, lang);
    setLoading(false);
    
    if (result.success) {
      setStep(2);
    } else {
      setError(result.message);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const code = otp.join('');
    const result = await verifyOTP(code, lang);
    
    if (result.success) {
      const role = (phone === 'admin' || phone === '0500000000') ? 'admin' : 'user';
      login({
        id: `u${Date.now()}`,
        phone: phone,
        name: role === 'admin' ? 'Administrator' : 'Valued Customer',
        role: role as 'admin' | 'user'
      });
      navigate(role === 'admin' ? '/admin' : '/profile');
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus next
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <div className="bg-surface p-8 md:p-10 rounded-3xl border border-main shadow-2xl space-y-8 animate-fadeIn">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-main">{lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}</h1>
          <p className="text-muted text-sm">
            {step === 1 
              ? (lang === 'ar' ? 'أدخل رقم جوالك للمتابعة' : 'Enter your mobile number to continue')
              : (lang === 'ar' ? 'أدخل الرمز المكون من 4 أرقام' : 'Enter the 4-digit code sent to you')}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl text-xs text-center">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-widest">
                {lang === 'ar' ? 'رقم الجوال' : 'Mobile Number'}
              </label>
              <div className="flex gap-2">
                <span className="bg-alt px-4 py-3 rounded-xl border border-main text-main flex items-center font-bold">+966</span>
                <input 
                  type="tel" 
                  {...register('phone', { 
                    required: lang === 'ar' ? 'رقم الجوال مطلوب' : 'Phone number is required',
                    pattern: {
                      value: /^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$|^admin$/,
                      message: lang === 'ar' ? 'رقم جوال سعودي غير صحيح' : 'Invalid Saudi phone number'
                    }
                  })}
                  placeholder="5xxxxxxx" 
                  className={`flex-grow bg-alt border ${errors.phone ? 'border-red-500' : 'border-main'} rounded-xl px-4 py-3 focus:outline-none focus:border-[#d4af37] text-main font-medium`} 
                />
              </div>
              {errors.phone && <p className="text-red-500 text-[10px] font-bold">{errors.phone.message}</p>}
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button 
                type="button"
                onClick={handleSubmit((data) => onSendOtp(data, 'whatsapp'))}
                disabled={loading}
                className="w-full py-4 bg-[#25D366] text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-lg shadow-[#25D366]/20 disabled:opacity-50"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.408 0 12.044c0 2.123.555 4.197 1.608 6.023L0 24l6.117-1.604a11.803 11.803 0 005.925 1.585h.005c6.637 0 12.046-5.411 12.05-12.048 0-3.218-1.251-6.242-3.522-8.513z"/></svg>
                {lang === 'ar' ? 'تفعيل عبر واتساب' : 'Verify via WhatsApp'}
              </button>
              
              <button 
                type="button"
                onClick={handleSubmit((data) => onSendOtp(data, 'sms'))}
                disabled={loading}
                className="w-full py-4 bg-alt border border-main text-main font-bold rounded-2xl flex items-center justify-center gap-3 transition-transform active:scale-95 disabled:opacity-50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                {lang === 'ar' ? 'إرسال عبر الرسائل النصية' : 'Send via SMS'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-8">
            <div className="flex justify-center gap-3">
              {otp.map((digit, i) => (
                <input 
                  key={i}
                  id={`otp-${i}`}
                  type="text" 
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  className="w-14 h-14 bg-alt border border-main rounded-2xl text-center font-bold text-2xl text-main focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all" 
                />
              ))}
            </div>
            
            <div className="space-y-3">
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-[#d4af37] text-black font-bold rounded-2xl transition-transform active:scale-95 shadow-lg shadow-[#d4af37]/20 disabled:opacity-50"
              >
                {loading ? (lang === 'ar' ? 'جاري التحقق...' : 'Verifying...') : (lang === 'ar' ? 'تحقق ومتابعة' : 'Verify & Continue')}
              </button>
              
              <button 
                type="button" 
                onClick={() => setStep(1)} 
                className="w-full text-center text-muted text-sm hover:text-[#d4af37] transition-colors"
              >
                {lang === 'ar' ? 'تغيير رقم الجوال؟' : 'Change number?'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
