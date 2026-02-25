
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useApp } from '../App';

const HoneyAssistant: React.FC = () => {
  const { lang, theme } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are an expert sommelier for "Bin Jabhan", a premium Saudi honey and ghee brand based in Al-Baha. 
          Your tone is premium, professional, and helpful. 
          You recommend honey based on health benefits (e.g., Sidr for immunity, Samar for digestion) and share authentic Saudi recipes using ghee.
          Current language: ${lang}. Always respond in the language the user uses.`,
          temperature: 0.7,
        },
      });

      const aiText = response.text || (lang === 'ar' ? 'عذراً، حدث خطأ ما.' : 'Sorry, something went wrong.');
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: lang === 'ar' ? 'فشل الاتصال بالمساعد الذكي.' : 'Failed to connect to AI assistant.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-50 w-14 h-14 honey-gradient rounded-full shadow-2xl flex items-center justify-center text-white transition-transform active:scale-90 hover:scale-105"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:bottom-28 md:right-8 md:w-96 md:h-[500px] z-50 bg-surface md:rounded-3xl border border-main shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="p-6 honey-gradient text-white flex justify-between items-center safe-top md:pt-6">
            <div>
              <h3 className="font-bold text-lg">{lang === 'ar' ? 'خبير بن جبهان' : 'Bin Jabhan Expert'}</h3>
              <p className="text-xs opacity-80">{lang === 'ar' ? 'متاح لمساعدتك الآن' : 'Available to help you now'}</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-alt/30">
            {messages.length === 0 && (
              <div className="text-center py-10 px-6 space-y-2">
                <div className="text-4xl">🍯</div>
                <p className="text-sm text-muted">
                  {lang === 'ar' 
                    ? 'أهلاً بك! أنا خبير عسل بن جبهان. كيف يمكنني مساعدتك اليوم؟ يمكنك سؤالي عن فوائد العسل أو وصفات السمن.'
                    : 'Welcome! I am the Bin Jabhan expert. How can I help you today? Ask me about honey benefits or ghee recipes.'}
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#d4af37] text-black rounded-tr-none' 
                    : 'bg-surface border border-main text-main rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-surface border border-main p-3 rounded-2xl rounded-tl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-surface border-t border-main safe-bottom md:pb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={lang === 'ar' ? 'اكتب استفسارك هنا...' : 'Type your question...'}
                className="flex-grow bg-alt border border-main rounded-xl px-4 py-2 text-sm text-main focus:outline-none focus:border-[#d4af37]"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="p-2 bg-[#d4af37] text-black rounded-xl disabled:opacity-50 transition-transform active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HoneyAssistant;
