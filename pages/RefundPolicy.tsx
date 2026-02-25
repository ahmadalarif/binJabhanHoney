
import React from 'react';
import { useApp } from '../App';

const RefundPolicy: React.FC = () => {
  const { lang } = useApp();

  const sections = [
    {
      title: { ar: 'سياسة الاسترجاع', en: 'Return Policy' },
      content: { 
        ar: 'يمكنك طلب استرجاع المنتجات خلال 7 أيام من تاريخ الاستلام، بشرط أن يكون المنتج في حالته الأصلية ومغلفاً بغلاف المصنع ولم يتم فتحه.',
        en: 'You can request a return within 7 days of delivery, provided the product is in its original condition, factory-sealed, and unopened.'
      }
    },
    {
      title: { ar: 'المنتجات غير القابلة للاسترجاع', en: 'Non-Returnable Items' },
      content: { 
        ar: 'نظراً لأن منتجاتنا غذائية، لا يمكن استرجاع أي عبوة تم فتح غلاف الأمان الخاص بها لضمان سلامة الجودة والصحة العامة.',
        en: 'Since our products are food items, any package with a broken safety seal cannot be returned to ensure quality and public health safety.'
      }
    },
    {
      title: { ar: 'طريقة الاسترجاع', en: 'Refund Process' },
      content: { 
        ar: 'يتم التواصل مع خدمة العملاء عبر الواتساب أو البريد الإلكتروني. في حال كان الاسترجاع بسبب عيب مصنعي، نتحمل تكاليف الشحن بالكامل.',
        en: 'Contact customer service via WhatsApp or email. If the return is due to a manufacturing defect, we will cover all shipping costs.'
      }
    },
    {
      title: { ar: 'استعادة الأموال', en: 'Refund Timelines' },
      content: { 
        ar: 'يتم إعادة المبلغ إلى وسيلة الدفع الأصلية خلال 7-14 يوم عمل بعد وصول المنتج لمستودعاتنا وفحصه.',
        en: 'Refunds are processed to the original payment method within 7-14 business days after the product reaches our warehouse and is inspected.'
      }
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-12 animate-fadeIn">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-main">{lang === 'ar' ? 'سياسة الاستبدال والاسترجاع' : 'Refund & Return Policy'}</h1>
        <div className="h-1 w-24 bg-[#d4af37] mx-auto rounded-full"></div>
      </header>

      <div className="space-y-8">
        {sections.map((sec, i) => (
          <div key={i} className="bg-surface p-8 rounded-3xl border border-main space-y-4 shadow-sm hover:border-[#d4af37]/30 transition-all">
            <h2 className="text-xl font-bold text-[#d4af37]">{sec.title[lang]}</h2>
            <p className="text-muted leading-relaxed">
              {sec.content[lang]}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-alt p-8 rounded-2xl border border-main text-center">
        <p className="text-sm text-muted">
          {lang === 'ar' 
            ? 'لأي استفسارات إضافية، يرجى التواصل مع فريق الدعم الفني.' 
            : 'For any additional inquiries, please contact our technical support team.'}
        </p>
      </div>
    </div>
  );
};

export default RefundPolicy;
