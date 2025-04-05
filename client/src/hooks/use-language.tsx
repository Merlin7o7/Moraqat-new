import { createContext, ReactNode, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  rtl: boolean;
};

// Simple translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Common
    "app.name": "Moraqqat",
    "language.toggle": "العربية",
    "need.help": "Need Help?",
    "login": "Login",
    "signup": "Sign Up",
    "join.waitlist": "Join Waitlist",
    
    // Navigation
    "nav.how.it.works": "How It Works",
    "nav.pricing": "Pricing",
    "nav.about": "About Us",
    
    // Hero Section
    "hero.title": "Premium Cat Food, Delivered Monthly",
    "hero.subtitle": "Personalized nutrition plans based on your cat's unique needs. High-quality ingredients, delivered to your doorstep.",
    "hero.cta.primary": "Join Waitlist",
    "hero.cta.secondary": "Learn More",
    
    // How it Works
    "how.title": "How Moraqqat Works",
    "how.subtitle": "Premium cat food subscription tailored to your cat's unique needs and preferences.",
    "how.step1.title": "Create Your Cat's Profile",
    "how.step1.desc": "Tell us about your cat's age, weight, breed, and dietary preferences.",
    "how.step2.title": "Choose Your Subscription",
    "how.step2.desc": "Select from our Basic, Premium, or VIP subscription plans with optional add-ons.",
    "how.step3.title": "Receive Monthly Deliveries",
    "how.step3.desc": "Your cat's personalized food box arrives at your doorstep every month.",
    "how.personalized.title": "Personalized for Your Cat",
    "how.personalized.desc": "Our nutrition experts create a personalized meal plan based on your cat's unique characteristics. We consider factors like age, weight, activity level, and health conditions.",
    "how.quality": "Premium quality ingredients with no fillers",
    "how.portion": "Proper portion sizes to maintain healthy weight",
    "how.adjust": "Adjust your plan anytime as your cat grows",
    
    // Pricing
    "pricing.title": "Simple, Transparent Pricing",
    "pricing.subtitle": "Choose the plan that's right for your cat's needs with no hidden fees.",
    "pricing.basic.title": "Basic Plan",
    "pricing.basic.desc": "For cats with standard dietary needs",
    "pricing.basic.price": "210 SAR",
    "pricing.premium.title": "Premium Plan",
    "pricing.premium.desc": "For cats needing better nutrition",
    "pricing.premium.price": "280 SAR",
    "pricing.premium.tag": "Most Popular",
    "pricing.vip.title": "VIP Plan",
    "pricing.vip.desc": "The ultimate cat nutrition experience",
    "pricing.vip.price": "350 SAR",
    "pricing.per.month": "/month",
    "pricing.select": "Select",
    
    // Add-ons
    "addons.title": "Available Add-ons",
    "addons.litter.title": "Premium Cat Litter",
    "addons.litter.desc": "Premium clumping litter with odor control",
    "addons.litter.price": "+65 SAR/month",
    "addons.toys.title": "Monthly Toys",
    "addons.toys.desc": "New interactive toys delivered every month",
    "addons.toys.price": "+45 SAR/month",
    "addons.treats.title": "Gourmet Treats",
    "addons.treats.desc": "Assorted healthy treats for your feline friend",
    "addons.treats.price": "+55 SAR/month",
    
    // Testimonials
    "testimonials.title": "What Happy Cats Are Saying",
    "testimonials.subtitle": "Join hundreds of satisfied cats and their humans",
    
    // Waitlist
    "waitlist.title": "Join Our Waitlist",
    "waitlist.desc": "Be among the first to experience Moraqqat's personalized nutrition for your furry friend. Limited spots available for our initial launch.",
    "waitlist.benefit1": "Early access to our subscription service",
    "waitlist.benefit2": "Special launch discount (15% off)",
    "waitlist.benefit3": "Exclusive welcome gift with first delivery",
    "waitlist.form.name": "Full Name",
    "waitlist.form.email": "Email Address",
    "waitlist.form.phone": "Phone Number",
    "waitlist.form.cat": "Tell Us About Your Cat",
    "waitlist.form.cat.placeholder": "Name, age, breed, any special needs...",
    "waitlist.form.newsletter": "I'd like to receive updates, special offers, and cat nutrition tips via email",
    "waitlist.form.submit": "Join Waitlist",
    
    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Everything you need to know about our service",
    "faq.q1": "How does the subscription work?",
    "faq.a1": "After signing up, you'll create a profile for your cat, and we'll recommend a personalized nutrition plan. Choose your preferred subscription tier (Basic, Premium, or VIP) and any add-ons you want. We'll deliver your cat's food box directly to your doorstep every month. You can adjust or cancel your subscription anytime.",
    "faq.q2": "Can I change my subscription plan?",
    "faq.a2": "Yes, you can upgrade, downgrade, or modify your subscription at any time through your account dashboard. Changes will be applied to your next delivery. You can also pause or cancel your subscription if needed.",
    "faq.q3": "What areas do you deliver to?",
    "faq.a3": "Currently, we deliver to all major cities in Saudi Arabia. We're expanding our delivery network regularly. If your area is not covered yet, join our waitlist to be notified when we expand to your location.",
    "faq.q4": "What if my cat doesn't like the food?",
    "faq.a4": "We understand that cats can be picky eaters! If your cat doesn't like the food in your first box, contact our customer service team, and we'll help find a solution. We offer a satisfaction guarantee for your first delivery.",
    "faq.q5": "How can I contact customer support?",
    "faq.a5": "Our customer support team is available via WhatsApp, email, or phone Monday through Saturday, 9AM to 9PM. Just click the WhatsApp support button in the top right of our website, or email us at support@moraqqat.com.",
    
    // Footer
    "footer.desc": "Premium personalized cat food subscription service. Nutrition made simple for your feline friends.",
    "footer.service": "Service",
    "footer.company": "Company",
    "footer.contact": "Contact Us",
    "footer.copyright": "© 2023 Moraqqat. All rights reserved.",
    
    // Success Modal
    "success.title": "You're on the Waitlist!",
    "success.message": "Thank you for joining our waitlist! We'll notify you as soon as Moraqqat launches in your area.",
    "success.close": "Close",
    
    // Auth
    "auth.login.title": "Welcome Back",
    "auth.login.subtitle": "Log in to manage your subscription",
    "auth.register.title": "Create an Account",
    "auth.register.subtitle": "Join Moraqqat to start your cat's nutrition journey",
    "auth.username": "Username",
    "auth.password": "Password",
    "auth.fullname": "Full Name",
    "auth.email": "Email",
    "auth.phone": "Phone Number (Optional)",
    "auth.login.button": "Log In",
    "auth.register.button": "Create Account",
    "auth.or": "OR",
    "auth.no.account": "Don't have an account?",
    "auth.has.account": "Already have an account?",
    
    // Pet Profile
    "pet.profile.title": "Tell Us About Your Cat",
    "pet.profile.subtitle": "This helps us create a personalized nutrition plan",
    "pet.name": "Cat's Name",
    "pet.breed": "Breed",
    "pet.age": "Age (Years)",
    "pet.weight": "Weight (kg)",
    "pet.dietary": "Dietary Preferences",
    "pet.dietary.options.regular": "Regular Diet",
    "pet.dietary.options.grain": "Grain Free",
    "pet.dietary.options.sensitive": "Sensitive Stomach",
    "pet.dietary.options.weight": "Weight Management",
    "pet.food.type": "Preferred Food Type",
    "pet.food.type.options.dry": "Dry Food",
    "pet.food.type.options.wet": "Wet Food",
    "pet.food.type.options.mixed": "Mixed (Dry & Wet)",
    "pet.continue": "Continue to Subscription",
    
    // Dashboard
    "dashboard.title": "My Dashboard",
    "dashboard.welcome": "Welcome back",
    "dashboard.subscription.title": "Current Subscription",
    "dashboard.subscription.none": "You don't have an active subscription yet.",
    "dashboard.subscription.start": "Start a Subscription",
    "dashboard.pet.title": "My Cats",
    "dashboard.pet.add": "Add a Cat",
    "dashboard.settings": "Account Settings",
    "dashboard.logout": "Log Out",
    
    // Admin
    "admin.title": "Admin Dashboard",
    "admin.users": "Users",
    "admin.subscriptions": "Subscriptions",
    "admin.waitlist": "Waitlist Entries"
  },
  ar: {
    // Common
    "app.name": "مرقط",
    "language.toggle": "English",
    "need.help": "تحتاج مساعدة؟",
    "login": "تسجيل الدخول",
    "signup": "إنشاء حساب",
    "join.waitlist": "انضم لقائمة الانتظار",
    
    // Navigation
    "nav.how.it.works": "كيف يعمل",
    "nav.pricing": "الأسعار",
    "nav.about": "من نحن",
    
    // Hero Section
    "hero.title": "طعام قطط فاخر، يصلك شهرياً",
    "hero.subtitle": "خطط تغذية مخصصة بناءً على احتياجات قطتك الفريدة. مكونات عالية الجودة، تصل إلى باب منزلك.",
    "hero.cta.primary": "انضم لقائمة الانتظار",
    "hero.cta.secondary": "اعرف المزيد",
    
    // How it Works
    "how.title": "كيف يعمل مرقط",
    "how.subtitle": "اشتراك طعام قطط فاخر مخصص لاحتياجات وتفضيلات قطتك.",
    "how.step1.title": "أنشئ ملف قطتك",
    "how.step1.desc": "أخبرنا عن عمر قطتك ووزنها وسلالتها وتفضيلاتها الغذائية.",
    "how.step2.title": "اختر اشتراكك",
    "how.step2.desc": "اختر من خطط الاشتراك الأساسية أو المميزة أو VIP مع إضافات اختيارية.",
    "how.step3.title": "استلم التوصيلات الشهرية",
    "how.step3.desc": "صندوق طعام قطتك المخصص يصل إلى باب منزلك كل شهر.",
    "how.personalized.title": "مخصص لقطتك",
    "how.personalized.desc": "يقوم خبراء التغذية لدينا بإنشاء خطة وجبات مخصصة بناءً على خصائص قطتك الفريدة. نأخذ في الاعتبار عوامل مثل العمر والوزن ومستوى النشاط والحالات الصحية.",
    "how.quality": "مكونات عالية الجودة بدون مواد مالئة",
    "how.portion": "أحجام حصص مناسبة للحفاظ على وزن صحي",
    "how.adjust": "عدل خطتك في أي وقت مع نمو قطتك",
    
    // Pricing
    "pricing.title": "أسعار بسيطة وشفافة",
    "pricing.subtitle": "اختر الخطة المناسبة لاحتياجات قطتك بدون رسوم خفية.",
    "pricing.basic.title": "الخطة الأساسية",
    "pricing.basic.desc": "للقطط ذات الاحتياجات الغذائية العادية",
    "pricing.basic.price": "٢١٠ ريال",
    "pricing.premium.title": "الخطة المميزة",
    "pricing.premium.desc": "للقطط التي تحتاج تغذية أفضل",
    "pricing.premium.price": "٢٨٠ ريال",
    "pricing.premium.tag": "الأكثر شعبية",
    "pricing.vip.title": "خطة VIP",
    "pricing.vip.desc": "تجربة تغذية القطط المطلقة",
    "pricing.vip.price": "٣٥٠ ريال",
    "pricing.per.month": "/شهر",
    "pricing.select": "اختر",
    
    // Add-ons
    "addons.title": "الإضافات المتاحة",
    "addons.litter.title": "فضلات قطط فاخرة",
    "addons.litter.desc": "فضلات متكتلة فاخرة مع التحكم في الرائحة",
    "addons.litter.price": "+٦٥ ريال/شهر",
    "addons.toys.title": "ألعاب شهرية",
    "addons.toys.desc": "ألعاب تفاعلية جديدة كل شهر",
    "addons.toys.price": "+٤٥ ريال/شهر",
    "addons.treats.title": "وجبات خفيفة فاخرة",
    "addons.treats.desc": "وجبات خفيفة صحية متنوعة لصديقك الأليف",
    "addons.treats.price": "+٥٥ ريال/شهر",
    
    // Testimonials
    "testimonials.title": "ماذا تقول القطط السعيدة",
    "testimonials.subtitle": "انضم إلى مئات القطط وأصحابها الراضين",
    
    // Waitlist
    "waitlist.title": "انضم لقائمة الانتظار",
    "waitlist.desc": "كن من أوائل من يجربون تغذية مرقط المخصصة لصديقك الأليف. المقاعد محدودة لإطلاقنا الأولي.",
    "waitlist.benefit1": "وصول مبكر لخدمة الاشتراك",
    "waitlist.benefit2": "خصم خاص للإطلاق (١٥٪ خصم)",
    "waitlist.benefit3": "هدية ترحيبية حصرية مع أول توصيل",
    "waitlist.form.name": "الاسم الكامل",
    "waitlist.form.email": "البريد الإلكتروني",
    "waitlist.form.phone": "رقم الهاتف",
    "waitlist.form.cat": "أخبرنا عن قطتك",
    "waitlist.form.cat.placeholder": "الاسم، العمر، السلالة، أي احتياجات خاصة...",
    "waitlist.form.newsletter": "أود تلقي التحديثات والعروض الخاصة ونصائح تغذية القطط عبر البريد الإلكتروني",
    "waitlist.form.submit": "انضم لقائمة الانتظار",
    
    // FAQ
    "faq.title": "الأسئلة الشائعة",
    "faq.subtitle": "كل ما تحتاج معرفته عن خدمتنا",
    "faq.q1": "كيف يعمل الاشتراك؟",
    "faq.a1": "بعد التسجيل، ستنشئ ملفًا لقطتك، وسنوصي بخطة تغذية مخصصة. اختر مستوى الاشتراك المفضل لديك (أساسي، مميز، أو VIP) وأي إضافات تريدها. سنوصل صندوق طعام قطتك مباشرة إلى باب منزلك كل شهر. يمكنك تعديل أو إلغاء اشتراكك في أي وقت.",
    "faq.q2": "هل يمكنني تغيير خطة الاشتراك؟",
    "faq.a2": "نعم، يمكنك الترقية أو التخفيض أو تعديل اشتراكك في أي وقت من خلال لوحة تحكم حسابك. سيتم تطبيق التغييرات على التوصيل التالي. يمكنك أيضًا إيقاف أو إلغاء اشتراكك إذا لزم الأمر.",
    "faq.q3": "ما هي المناطق التي توصلون إليها؟",
    "faq.a3": "حاليًا، نوصل إلى جميع المدن الرئيسية في المملكة العربية السعودية. نقوم بتوسيع شبكة التوصيل بانتظام. إذا لم تكن منطقتك مشمولة بعد، انضم إلى قائمة الانتظار ليتم إخطارك عند التوسع إلى موقعك.",
    "faq.q4": "ماذا لو لم تحب قطتي الطعام؟",
    "faq.a4": "نحن نتفهم أن القطط يمكن أن تكون انتقائية في طعامها! إذا لم تحب قطتك الطعام في الصندوق الأول، اتصل بفريق خدمة العملاء وسنساعد في إيجاد حل. نقدم ضمان الرضا للتوصيل الأول.",
    "faq.q5": "كيف يمكنني الاتصال بدعم العملاء؟",
    "faq.a5": "فريق دعم العملاء متاح عبر WhatsApp أو البريد الإلكتروني أو الهاتف من الاثنين إلى السبت، من 9 صباحًا إلى 9 مساءً. ما عليك سوى النقر على زر دعم WhatsApp في أعلى يمين موقعنا، أو مراسلتنا عبر البريد الإلكتروني على support@moraqqat.com.",
    
    // Footer
    "footer.desc": "خدمة اشتراك طعام قطط مخصصة فاخرة. التغذية المبسطة لأصدقائك الأليفين.",
    "footer.service": "الخدمة",
    "footer.company": "الشركة",
    "footer.contact": "اتصل بنا",
    "footer.copyright": "© 2023 مرقط. جميع الحقوق محفوظة.",
    
    // Success Modal
    "success.title": "أنت على قائمة الانتظار!",
    "success.message": "شكرًا لانضمامك إلى قائمة الانتظار! سنخطرك بمجرد إطلاق مرقط في منطقتك.",
    "success.close": "إغلاق",
    
    // Auth
    "auth.login.title": "مرحبًا بعودتك",
    "auth.login.subtitle": "سجل الدخول لإدارة اشتراكك",
    "auth.register.title": "إنشاء حساب",
    "auth.register.subtitle": "انضم إلى مرقط لبدء رحلة تغذية قطتك",
    "auth.username": "اسم المستخدم",
    "auth.password": "كلمة المرور",
    "auth.fullname": "الاسم الكامل",
    "auth.email": "البريد الإلكتروني",
    "auth.phone": "رقم الهاتف (اختياري)",
    "auth.login.button": "تسجيل الدخول",
    "auth.register.button": "إنشاء حساب",
    "auth.or": "أو",
    "auth.no.account": "ليس لديك حساب؟",
    "auth.has.account": "لديك حساب بالفعل؟",
    
    // Pet Profile
    "pet.profile.title": "أخبرنا عن قطتك",
    "pet.profile.subtitle": "هذا يساعدنا على إنشاء خطة تغذية مخصصة",
    "pet.name": "اسم القطة",
    "pet.breed": "السلالة",
    "pet.age": "العمر (سنوات)",
    "pet.weight": "الوزن (كجم)",
    "pet.dietary": "التفضيلات الغذائية",
    "pet.dietary.options.regular": "نظام غذائي عادي",
    "pet.dietary.options.grain": "خالي من الحبوب",
    "pet.dietary.options.sensitive": "معدة حساسة",
    "pet.dietary.options.weight": "إدارة الوزن",
    "pet.food.type": "نوع الطعام المفضل",
    "pet.food.type.options.dry": "طعام جاف",
    "pet.food.type.options.wet": "طعام رطب",
    "pet.food.type.options.mixed": "مختلط (جاف ورطب)",
    "pet.continue": "استمر إلى الاشتراك",
    
    // Dashboard
    "dashboard.title": "لوحة التحكم",
    "dashboard.welcome": "مرحبًا بعودتك",
    "dashboard.subscription.title": "الاشتراك الحالي",
    "dashboard.subscription.none": "ليس لديك اشتراك نشط بعد.",
    "dashboard.subscription.start": "ابدأ اشتراكًا",
    "dashboard.pet.title": "قططي",
    "dashboard.pet.add": "إضافة قطة",
    "dashboard.settings": "إعدادات الحساب",
    "dashboard.logout": "تسجيل الخروج",
    
    // Admin
    "admin.title": "لوحة تحكم المشرف",
    "admin.users": "المستخدمين",
    "admin.subscriptions": "الاشتراكات",
    "admin.waitlist": "قائمة الانتظار"
  }
};

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
  rtl: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get language from localStorage, default to English
    const savedLanguage = localStorage.getItem("moraqqat-language");
    return (savedLanguage === "ar" ? "ar" : "en") as Language;
  });

  const rtl = language === "ar";

  useEffect(() => {
    // Update lang attribute and direction on html element
    document.documentElement.lang = language;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
    
    // Save language preference to localStorage
    localStorage.setItem("moraqqat-language", language);
  }, [language, rtl]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, rtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
