
import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: { en: "Dahyana Wild Honey", ar: "عسل ضهيانة البلدي" },
    description: {
      en: "Rare wild honey harvested from the untouched valleys of Al-Baha. Known for its light floral notes and smooth texture. Lab-tested for purity and SFDA compliance.",
      ar: "عسل نادر مستخلص من الوديان البكر في منطقة الباحة. يتميز بنكهته الزهرية الخفيفة وقوامه الناعم. خضع للفحص المخبري للتأكد من نقائه وامتثاله لهيئة الغذاء والدواء."
    },
    price: 110,
    category: "honey",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800&auto=format&fit=crop",
    moisture: 18,
    hmf: 32,
    diastase: 10,
    reducingSugars: 63,
    sucrose: 4,
    addedSugars: false,
    fermented: false,
    origin: "Al-Baha, Saudi Arabia",
    availability: "in_stock",
    weightKg: 0.5
  },
  {
    id: '2',
    name: { en: "Sidr Honey", ar: "عسل السدر" },
    description: {
      en: "Premium Sidr honey from Baha’s ancient Ziziphus trees. Rich amber color, thick consistency, and unmatched depth of flavor. Fully compliant with SFDA moisture and HMF standards.",
      ar: "عسل سدر بريميوم من أشجار السدر القديمة في الباحة. يتميز بلونه الكهرماني الغني وقوامه الكثيف وعمق نكهته الفريد. متوافق تمامًا مع معايير هيئة الغذاء والدواء للرطوبة وHMF."
    },
    price: 240,
    category: "honey",
    image: "https://images.unsplash.com/photo-1558611997-d77901767664?q=80&w=800&auto=format&fit=crop",
    moisture: 17,
    hmf: 28,
    diastase: 12,
    reducingSugars: 65,
    sucrose: 3,
    addedSugars: false,
    fermented: false,
    pollenType: "Ziziphus spina-christi",
    origin: "Baha, Saudi Arabia",
    availability: "in_stock",
    weightKg: 1.0
  },
  {
    id: '3',
    name: { en: "Samar Honey", ar: "عسل السمر" },
    description: {
      en: "Traditional Samar honey from Asir’s Acacia tortilis trees. Mild sweetness with a delicate woody aroma. Ideal for daily use and family wellness.",
      ar: "عسل السمر التقليدي من أشجار الطلح في عسير. حلاوة خفيفة ورائحة خشبية لطيفة. مثالي للاستخدام اليومي وصحة العائلة."
    },
    price: 95,
    category: "honey",
    image: "https://images.unsplash.com/photo-1471943311424-646960669fbc?q=80&w=800&auto=format&fit=crop",
    moisture: 19,
    hmf: 35,
    diastase: 9,
    reducingSugars: 62,
    sucrose: 4,
    addedSugars: false,
    fermented: false,
    pollenType: "Acacia tortilis",
    origin: "Asir, Saudi Arabia",
    availability: "in_stock",
    weightKg: 0.5
  },
  {
    id: '4',
    name: { en: "Wild Acacia Honey", ar: "عسل السنط البري" },
    description: {
      en: "Light, clear honey from wild Acacia trees. Naturally low in sucrose and high in fructose. Perfect for those seeking a gentle, everyday honey.",
      ar: "عسل فاتح وشفاف من أشجار السنط البرية. منخفض طبيعيًا في السكروز وغني بالفركتوز. مثالي لمن يبحث عن عسل يومي لطيف."
    },
    price: 85,
    category: "honey",
    image: "https://images.unsplash.com/photo-1464305795204-6f5bdf7f1c30?q=80&w=800&auto=format&fit=crop",
    moisture: 18,
    hmf: 30,
    diastase: 11,
    reducingSugars: 68,
    sucrose: 2,
    addedSugars: false,
    fermented: false,
    origin: "Taif, Saudi Arabia",
    availability: "in_stock",
    weightKg: 0.5
  },
  {
    id: '5',
    name: { en: "Clover Honey", ar: "عسل البرسيم" },
    description: {
      en: "Delicate and mildly sweet clover honey from Saudi highlands. Smooth texture with a clean finish. A favorite for baking and tea.",
      ar: "عسل البرسيم الرقيق وذو الحلاوة الخفيفة من مرتفعات السعودية. قوام ناعم وطعم نظيف. مفضل للخبز وتحضير الشاي."
    },
    price: 75,
    category: "honey",
    image: "https://images.unsplash.com/photo-1581515286208-8e6d62886c96?q=80&w=800&auto=format&fit=crop",
    moisture: 19,
    hmf: 36,
    diastase: 9,
    reducingSugars: 61,
    sucrose: 5,
    addedSugars: false,
    fermented: false,
    origin: "Al-Jouf, Saudi Arabia",
    availability: "in_stock",
    weightKg: 0.5
  },
  {
    id: '6',
    name: { en: "Majra Honey", ar: "عسل المجرى" },
    description: {
      en: "Distinctive Majra honey from the forest oases of Baha region. Earthy notes with a lingering floral aftertaste. Harvested using traditional beekeeping methods.",
      ar: "عسل المجرى المميز من واحات منطقة الباحة الصحراوية. نكهات ترابية مع طعم زهري يدوم. يُستخلص باستخدام طرق تربية النحل التقليدية."
    },
    price: 100,
    category: "honey",
    image: "https://images.unsplash.com/photo-1590779033100-9f60705a2d3d?q=80&w=800&auto=format&fit=crop",
    moisture: 18,
    hmf: 33,
    diastase: 10,
    reducingSugars: 60,
    sucrose: 4,
    addedSugars: false,
    fermented: false,
    origin: "Baha, Saudi Arabia",
    availability: "in_stock",
    weightKg: 0.5
  },
  {
    id: '7',
    name: { en: "Milkvetch Honey", ar: "عسل الحنظل" },
    description: {
      en: "Rare Milkvetch (Hanthal) honey with herbal undertones. Traditionally used for digestive wellness in central Saudi Arabia.",
      ar: "عسل الحنظل النادر بنكهته العشبية. يستخدم تقليديًا لدعم صحة الجهاز الهضمي في وسط المملكة العربية السعودية."
    },
    price: 130,
    category: "honey",
    image: "https://images.unsplash.com/photo-1621251342400-5896b52c0336?q=80&w=800&auto=format&fit=crop",
    moisture: 17,
    hmf: 29,
    diastase: 11,
    reducingSugars: 64,
    sucrose: 3,
    addedSugars: false,
    fermented: false,
    origin: "Qassim, Saudi Arabia",
    availability: "limited_stock",
    weightKg: 0.5
  },
  {
    id: '8',
    name: { en: "Tamarisk Honey", ar: "عسل الأثيل" },
    description: {
      en: "Unique Tamarisk (Athel) honey from saline forest regions. Slightly salty-sweet profile with mineral-rich complexity. A true forest treasure.",
      ar: "عسل الأثيل الفريد من المناطق الصحراوية المالحة. نكهة حلوة-مالحة قليلاً مع تعقيد غني بالمعادن. كنز صحراوي حقيقي."
    },
    price: 120,
    category: "honey",
    image: "https://images.unsplash.com/photo-1563736113591-11d084abc48e?q=80&w=800&auto=format&fit=crop",
    moisture: 18,
    hmf: 31,
    diastase: 10,
    reducingSugars: 62,
    sucrose: 4,
    addedSugars: false,
    fermented: false,
    origin: "Eastern Province, Saudi Arabia",
    availability: "in_stock",
    weightKg: 0.5
  },
  {
    id: '9',
    name: { en: "Honey Spoons Gift Set", ar: "ملعقات عسل جاهزة" },
    description: {
      en: "Convenient single-serve honey spoons filled with premium Baha Sidr honey. Perfect for gifting, travel, or office use. No mess, pure taste.",
      ar: "ملعقات عسل جاهزة للاستخدام الفردي، مملوءة بعسل سدر الباحة الراقي. مثالية للهدايا أو السفر أو المكتب. بدون فوضى، طعم نقي."
    },
    price: 65,
    category: "honey",
    image: "https://images.unsplash.com/photo-1584344412035-1f9e23253724?q=80&w=800&auto=format&fit=crop",
    moisture: 17,
    hmf: 28,
    diastase: 12,
    reducingSugars: 65,
    sucrose: 3,
    addedSugars: false,
    fermented: false,
    origin: "Baha, Saudi Arabia",
    availability: "in_stock",
    weightKg: 0.25
  },
  {
    id: '10',
    name: { en: "Mountain Wildflowers Honey", ar: "عسل الزهور البرية" },
    description: {
      en: "Vibrant blend of wild mountain flowers from Asir and Taif. Captures the essence of Saudi highland biodiversity in every drop.",
      ar: "مزيج نابض من الزهور الجبلية البرية من عسير والطائف. يجسد جوهر التنوع البيولوجي للمرتفعات السعودية في كل قطرة."
    },
    price: 90,
    category: "honey",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    moisture: 19,
    hmf: 37,
    diastase: 9,
    reducingSugars: 60,
    sucrose: 5,
    addedSugars: false,
    fermented: false,
    origin: "Asir & Taif, Saudi Arabia",
    availability: "in_stock",
    weightKg: 0.5
  },
  {
    id: '11',
    name: { en: "Black Seed Honey", ar: "عسل الحبة السوداء" },
    description: {
      en: "Pure wildflower honey infused with cold-pressed black seed oil. A powerful Saudi remedy for immune support and respiratory health.",
      ar: "عسل زهور برية نقي ممزوج بزيت الحبة السوداء المعصور على البارد. وصفة سعودية فعالة لدعم المناعة والصحة التنفسية."
    },
    price: 120,
    category: "honey",
    image: "https://images.unsplash.com/photo-1527334134460-f21a05ef62f3?q=80&w=800&auto=format&fit=crop",
    moisture: 18,
    hmf: 34,
    diastase: 10,
    reducingSugars: 61,
    sucrose: 4,
    addedSugars: false,
    fermented: false,
    origin: "Saudi Arabia",
    availability: "in_stock",
    weightKg: 0.5
  },
  {
    id: '12',
    name: { en: "Black Forest Honey", ar: "عسل الغابة السوداء" },
    description: {
      en: "Imported premium forest honey with deep, robust flavor. Blended with local Sidr for a unique Saudi-German fusion experience.",
      ar: "عسل غابة مستورد بريميوم بنكهة عميقة وقوية. ممزوج مع عسل السدر المحلي لتجربة اندماج سعودي-ألماني فريدة."
    },
    price: 150,
    category: "honey",
    image: "https://images.unsplash.com/photo-1621251342400-5896b52c0336?q=80&w=800&auto=format&fit=crop",
    moisture: 18,
    hmf: 35,
    diastase: 9,
    reducingSugars: 60,
    sucrose: 5,
    addedSugars: false,
    fermented: false,
    origin: "Germany & Saudi Arabia",
    availability: "limited_stock",
    weightKg: 0.5
  },
  {
    id: '13',
    name: { en: "Qard Honey", ar: "عسل القرض (طلحة)" },
    description: {
      en: "Traditional Qard (Acacia ehrenbergiana) honey from Baha. Light amber hue with a subtle vanilla-like aroma. Highly valued in southern Saudi heritage.",
      ar: "عسل القرض التقليدي (طلح) من الباحة. لون كهرماني فاتح ورائحة تشبه الفانيليا. يحظى بتقدير كبير في التراث السعودي الجنوبي."
    },
    price: 105,
    category: "honey",
    image: "https://images.unsplash.com/photo-1589733901241-5d5d9b6ad8c4?q=80&w=800&auto=format&fit=crop",
    moisture: 18,
    hmf: 32,
    diastase: 10,
    reducingSugars: 62,
    sucrose: 4,
    addedSugars: false,
    fermented: false,
    pollenType: "Acacia ehrenbergiana",
    origin: "Baha, Saudi Arabia",
    availability: "in_stock",
    weightKg: 0.5
  },
  {
    id: '14',
    name: { en: "Summer Floral Honey", ar: "عسل صيفي" },
    description: {
      en: "Seasonal summer harvest capturing the bloom of Saudi forests flowers. Bright, fruity notes with a refreshing finish.",
      ar: "عسل موسمي يعكس إزهار زهور الغابات السعودية في الصيف. نكهات فواكه زاهية وطعم منعش."
    },
    price: 80,
    category: "honey",
    image: "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?q=80&w=800&auto=format&fit=crop",
    moisture: 19,
    hmf: 38,
    diastase: 8,
    reducingSugars: 59,
    sucrose: 5,
    addedSugars: false,
    fermented: false,
    origin: "Central Saudi Arabia",
    availability: "in_stock",
    weightKg: 0.5
  },
  {
    id: '15',
    name: { en: "Pumpkin Flower Honey", ar: "عسل اليقطين البلدي" },
    description: {
      en: "Rare pumpkin blossom honey with a delicate vegetal sweetness. Sourced from organic farms in Al-Qassim region.",
      ar: "عسل نادر من زهور اليقطين بحلاوة نباتية لطيفة. مستخلص من مزارع عضوية في منطقة القصيم."
    },
    price: 95,
    category: "honey",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800&auto=format&fit=crop",
    moisture: 18,
    hmf: 33,
    diastase: 9,
    reducingSugars: 61,
    sucrose: 4,
    addedSugars: false,
    fermented: false,
    origin: "Al-Qassim, Saudi Arabia",
    availability: "in_stock",
    weightKg: 0.5
  },
  {
    id: '16',
    name: { en: "Shafalah Wild Honey", ar: "عسل الشفلح البلدي" },
    description: {
      en: "Authentic Shafalah honey from the coastal plains of Jazan. Distinctive coastal terroir with hints of sea breeze and wild herbs.",
      ar: "عسل الشفلح الأصيل من السهول الساحلية لجازان. يتميز بنكهة الساحل الفريدة مع لمحات من نسمة البحر والأعشاب البرية."
    },
    price: 115,
    category: "honey",
    image: "https://images.unsplash.com/photo-1622321453443-43183be1701a?q=80&w=800&auto=format&fit=crop",
    moisture: 18,
    hmf: 31,
    diastase: 10,
    reducingSugars: 63,
    sucrose: 4,
    addedSugars: false,
    fermented: false,
    origin: "Jazan, Saudi Arabia",
    availability: "in_stock",
    weightKg: 0.5
  }
];
