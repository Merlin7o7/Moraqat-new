// Translation data
const translations = {
  en: {
    // Header
    'header.howItWorks': 'How It Works',
    'header.pricing': 'Pricing',
    'header.faq': 'FAQ',
    'header.login': 'Log In',
    'header.signup': 'Sign Up',
    
    // Hero section
    'hero.tagline': 'Premium Pet Food Subscription',
    'hero.title1': 'Personalized Nutrition',
    'hero.title2': 'For Your Beloved Cat',
    'hero.description': 'Premium, personalized pet food delivered to your doorstep monthly. Tailored to your cat\'s needs, preferences, and health requirements.',
    'hero.emailPlaceholder': 'Enter your email',
    'hero.joinWaitlist': 'Join Waitlist',
    'hero.privacy': 'We respect your privacy. No spam, ever.',
    
    // How it works section
    'howItWorks.title': 'How Moraqqat Works',
    'howItWorks.subtitle': 'Simple steps to personalized pet nutrition.',
    'howItWorks.step1.title': 'Create Your Cat\'s Profile',
    'howItWorks.step1.description': 'Tell us about your cat\'s age, weight, breed, and dietary preferences or restrictions.',
    'howItWorks.step2.title': 'Select Your Subscription',
    'howItWorks.step2.description': 'Choose from Basic, Premium, or VIP plans. Add special items like toys or treats.',
    'howItWorks.step3.title': 'Receive Monthly Deliveries',
    'howItWorks.step3.description': 'Get perfectly portioned, fresh food delivered to your door every month. Adjust or cancel anytime.',
    
    // Pricing section
    'pricing.title': 'Subscription Plans',
    'pricing.subtitle': 'Choose the perfect plan for your feline friend.',
    'pricing.basic.title': 'Basic Plan',
    'pricing.basic.description': 'Essentials for a balanced diet.',
    'pricing.basic.price': '210',
    'pricing.basic.select': 'Select Basic',
    'pricing.premium.title': 'Premium Plan',
    'pricing.premium.description': 'Advanced nutrition for optimal health.',
    'pricing.premium.price': '280',
    'pricing.premium.select': 'Select Premium',
    'pricing.vip.title': 'VIP Plan',
    'pricing.vip.description': 'Ultimate luxury for pampered pets.',
    'pricing.vip.price': '350',
    'pricing.vip.select': 'Select VIP',
    'pricing.included': 'What\'s included:',
    'pricing.currency': 'SAR / month',
    
    // Basic plan features
    'pricing.basic.feature1': 'Standard dry food',
    'pricing.basic.feature2': 'Monthly delivery',
    'pricing.basic.feature3': 'Basic health tracking',
    
    // Premium plan features
    'pricing.premium.feature1': 'Premium dry & wet food mix',
    'pricing.premium.feature2': 'Monthly delivery',
    'pricing.premium.feature3': 'Detailed health tracking',
    'pricing.premium.feature4': 'Monthly treats',
    
    // VIP plan features
    'pricing.vip.feature1': 'Gourmet wet food & premium dry food',
    'pricing.vip.feature2': 'Bi-weekly delivery',
    'pricing.vip.feature3': 'Premium health tracking & vet consultation',
    'pricing.vip.feature4': 'Monthly premium treats & toys',
    'pricing.vip.feature5': 'Priority customer service',
    
    // Testimonials
    'testimonials.title': 'Why Cat Parents Love Us',
    'testimonials.subtitle': 'Hear from our happy customers and their feline friends.',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Everything you need to know about our subscription service.',
    'faq.q1': 'How does the subscription work?',
    'faq.a1': 'When you subscribe, we create a customized food plan based on your cat\'s profile. You choose a plan (Basic, Premium, or VIP), and we deliver fresh food to your doorstep monthly. You can modify, pause, or cancel your subscription anytime from your dashboard.',
    'faq.q2': 'Can I change my subscription plan?',
    'faq.a2': 'Yes, you can upgrade, downgrade, or modify your subscription plan anytime through your account dashboard. Changes will be applied to your next billing cycle.',
    'faq.q3': 'What payment methods do you accept?',
    'faq.a3': 'We accept all major credit cards, Mada, Apple Pay, and bank transfers. All payments are processed securely through our payment gateway.',
    'faq.q4': 'Is the food suitable for cats with dietary restrictions?',
    'faq.a4': 'Yes, we offer specialized formulas for cats with common dietary restrictions, including grain-free, limited ingredient, and sensitive digestion options. You can specify your cat\'s dietary needs during the profile creation process.',
    'faq.q5': 'What areas do you deliver to?',
    'faq.a5': 'We currently deliver to major cities in Saudi Arabia, including Riyadh, Jeddah, and Dammam. We\'re constantly expanding our delivery network. Enter your location during checkout to check if delivery is available in your area.',
    
    // WhatsApp Support
    'whatsapp.tooltip': 'Contact via WhatsApp',
    
    // Footer
    'footer.description': 'Premium pet food subscription service for your beloved cats. Personalized nutrition delivered to your door.',
    'footer.company': 'Company',
    'footer.aboutUs': 'About Us',
    'footer.careers': 'Careers',
    'footer.contact': 'Contact',
    'footer.legal': 'Legal',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.termsOfService': 'Terms of Service',
    'footer.copyright': '© 2023 Moraqqat. All rights reserved.',
    
    // Auth modals
    'auth.signup.title': 'Create Your Account',
    'auth.login.title': 'Sign In to Your Account',
    'auth.email': 'Email address',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm password',
    'auth.continue': 'Continue',
    'auth.haveAccount': 'Already have an account?',
    'auth.signin': 'Sign in',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.signup': 'Sign up',
    'auth.rememberMe': 'Remember me',
    'auth.forgotPassword': 'Forgot password?',
    
    // Pet profile
    'pet.title': 'Cat\'s Name',
    'pet.breed': 'Breed',
    'pet.selectBreed': 'Select breed',
    'pet.age': 'Age (years)',
    'pet.weight': 'Weight (kg)',
    'pet.gender': 'Gender',
    'pet.selectGender': 'Select gender',
    'pet.male': 'Male',
    'pet.female': 'Female',
    'pet.dietaryPreferences': 'Dietary Preferences',
    'pet.grainFree': 'Grain-free diet',
    'pet.hypoallergenic': 'Hypoallergenic',
    'pet.sensitiveDigestion': 'Sensitive digestion',
    
    // Subscription
    'sub.selectedPlan': 'Selected Plan',
    'sub.addons': 'Add-ons (Optional)',
    'sub.addon.litter.title': 'Premium Cat Litter',
    'sub.addon.litter.description': 'High-quality, odor-controlling litter',
    'sub.addon.toys.title': 'Monthly Toy Pack',
    'sub.addon.toys.description': 'Interactive toys for mental stimulation',
    'sub.addon.treats.title': 'Gourmet Treats Box',
    'sub.addon.treats.description': 'Healthy, tasty treats',
    'sub.total': 'Total (Monthly)',
    'sub.complete': 'Complete Subscription',
    'sub.back': 'Back to Pet Profile',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome',
    'dashboard.subscription': 'Your Subscription',
    'dashboard.petProfile': 'Pet Profile',
    'dashboard.logout': 'Logout'
  },
  ar: {
    // Header
    'header.howItWorks': 'كيف تعمل',
    'header.pricing': 'الأسعار',
    'header.faq': 'الأسئلة الشائعة',
    'header.login': 'تسجيل الدخول',
    'header.signup': 'إنشاء حساب',
    
    // Hero section
    'hero.tagline': 'اشتراك طعام حيوانات أليفة متميز',
    'hero.title1': 'تغذية مخصصة',
    'hero.title2': 'لقطتك المحبوبة',
    'hero.description': 'طعام حيوانات أليفة فاخر ومخصص يتم توصيله إلى باب منزلك شهريًا. مصمم خصيصًا لاحتياجات قطتك وتفضيلاتها ومتطلبات صحتها.',
    'hero.emailPlaceholder': 'أدخل بريدك الإلكتروني',
    'hero.joinWaitlist': 'انضم إلى قائمة الانتظار',
    'hero.privacy': 'نحن نحترم خصوصيتك. لا بريد مزعج، أبدًا.',
    
    // How it works section
    'howItWorks.title': 'كيف يعمل مرقط',
    'howItWorks.subtitle': 'خطوات بسيطة للحصول على تغذية مخصصة لحيوانك الأليف.',
    'howItWorks.step1.title': 'إنشاء ملف تعريف قطتك',
    'howItWorks.step1.description': 'أخبرنا عن عمر قطتك ووزنها وسلالتها وتفضيلاتها الغذائية أو القيود المفروضة عليها.',
    'howItWorks.step2.title': 'اختر اشتراكك',
    'howItWorks.step2.description': 'اختر من بين خطط أساسية أو متميزة أو كبار الشخصيات. أضف عناصر خاصة مثل الألعاب أو الوجبات الخفيفة.',
    'howItWorks.step3.title': 'استلام التوصيلات الشهرية',
    'howItWorks.step3.description': 'احصل على طعام طازج بكميات مثالية يتم توصيله إلى باب منزلك كل شهر. قم بالتعديل أو الإلغاء في أي وقت.',
    
    // Pricing section
    'pricing.title': 'خطط الاشتراك',
    'pricing.subtitle': 'اختر الخطة المثالية لصديقك من القطط.',
    'pricing.basic.title': 'الخطة الأساسية',
    'pricing.basic.description': 'أساسيات لنظام غذائي متوازن.',
    'pricing.basic.price': '210',
    'pricing.basic.select': 'اختر الأساسية',
    'pricing.premium.title': 'الخطة المتميزة',
    'pricing.premium.description': 'تغذية متقدمة للصحة المثلى.',
    'pricing.premium.price': '280',
    'pricing.premium.select': 'اختر المتميزة',
    'pricing.vip.title': 'خطة كبار الشخصيات',
    'pricing.vip.description': 'رفاهية مطلقة للحيوانات الأليفة المدللة.',
    'pricing.vip.price': '350',
    'pricing.vip.select': 'اختر كبار الشخصيات',
    'pricing.included': 'المشمول:',
    'pricing.currency': 'ريال / شهر',
    
    // Basic plan features
    'pricing.basic.feature1': 'طعام جاف قياسي',
    'pricing.basic.feature2': 'توصيل شهري',
    'pricing.basic.feature3': 'تتبع صحي أساسي',
    
    // Premium plan features
    'pricing.premium.feature1': 'مزيج من الطعام الجاف والرطب المتميز',
    'pricing.premium.feature2': 'توصيل شهري',
    'pricing.premium.feature3': 'تتبع صحي مفصل',
    'pricing.premium.feature4': 'وجبات خفيفة شهرية',
    
    // VIP plan features
    'pricing.vip.feature1': 'طعام رطب فاخر وطعام جاف متميز',
    'pricing.vip.feature2': 'توصيل نصف شهري',
    'pricing.vip.feature3': 'تتبع صحي متميز واستشارة بيطرية',
    'pricing.vip.feature4': 'وجبات خفيفة وألعاب متميزة شهرية',
    'pricing.vip.feature5': 'خدمة عملاء ذات أولوية',
    
    // Testimonials
    'testimonials.title': 'لماذا يحبنا آباء القطط',
    'testimonials.subtitle': 'اسمع من عملائنا السعداء وأصدقائهم من القطط.',
    
    // FAQ
    'faq.title': 'الأسئلة الشائعة',
    'faq.subtitle': 'كل ما تحتاج لمعرفته حول خدمة الاشتراك لدينا.',
    'faq.q1': 'كيف يعمل الاشتراك؟',
    'faq.a1': 'عندما تشترك، نقوم بإنشاء خطة غذائية مخصصة بناءً على ملف تعريف قطتك. تختار خطة (أساسية أو متميزة أو كبار الشخصيات)، ونقوم بتوصيل الطعام الطازج إلى باب منزلك شهريًا. يمكنك تعديل أو إيقاف أو إلغاء اشتراكك في أي وقت من لوحة التحكم الخاصة بك.',
    'faq.q2': 'هل يمكنني تغيير خطة الاشتراك الخاصة بي؟',
    'faq.a2': 'نعم، يمكنك الترقية أو التخفيض أو تعديل خطة الاشتراك الخاصة بك في أي وقت من خلال لوحة تحكم حسابك. سيتم تطبيق التغييرات على دورة الفوترة التالية.',
    'faq.q3': 'ما هي طرق الدفع التي تقبلونها؟',
    'faq.a3': 'نقبل جميع بطاقات الائتمان الرئيسية ومدى وآبل باي والتحويلات المصرفية. تتم معالجة جميع المدفوعات بأمان من خلال بوابة الدفع لدينا.',
    'faq.q4': 'هل الطعام مناسب للقطط ذات القيود الغذائية؟',
    'faq.a4': 'نعم، نقدم تركيبات متخصصة للقطط ذات القيود الغذائية الشائعة، بما في ذلك خيارات خالية من الحبوب ومكونات محدودة وهضم حساس. يمكنك تحديد احتياجات قطتك الغذائية أثناء عملية إنشاء الملف الشخصي.',
    'faq.q5': 'ما هي المناطق التي توصلون إليها؟',
    'faq.a5': 'نقوم حاليًا بالتوصيل إلى المدن الرئيسية في المملكة العربية السعودية، بما في ذلك الرياض وجدة والدمام. نحن نوسع شبكة التوصيل لدينا باستمرار. أدخل موقعك أثناء الدفع للتحقق مما إذا كان التوصيل متاحًا في منطقتك.',
    
    // WhatsApp Support
    'whatsapp.tooltip': 'تواصل عبر واتساب',
    
    // Footer
    'footer.description': 'خدمة اشتراك الطعام المتميز للحيوانات الأليفة لقططك المحبوبة. تغذية مخصصة يتم توصيلها إلى باب منزلك.',
    'footer.company': 'الشركة',
    'footer.aboutUs': 'عن الشركة',
    'footer.careers': 'وظائف',
    'footer.contact': 'اتصل بنا',
    'footer.legal': 'قانوني',
    'footer.privacyPolicy': 'سياسة الخصوصية',
    'footer.termsOfService': 'شروط الخدمة',
    'footer.copyright': '© 2023 مرقط. جميع الحقوق محفوظة.',
    
    // Auth modals
    'auth.signup.title': 'إنشاء حسابك',
    'auth.login.title': 'تسجيل الدخول إلى حسابك',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.confirmPassword': 'تأكيد كلمة المرور',
    'auth.continue': 'متابعة',
    'auth.haveAccount': 'هل لديك حساب بالفعل؟',
    'auth.signin': 'تسجيل الدخول',
    'auth.noAccount': 'ليس لديك حساب؟',
    'auth.signup': 'التسجيل',
    'auth.rememberMe': 'تذكرني',
    'auth.forgotPassword': 'نسيت كلمة المرور؟',
    
    // Pet profile
    'pet.title': 'اسم القط',
    'pet.breed': 'السلالة',
    'pet.selectBreed': 'اختر السلالة',
    'pet.age': 'العمر (سنوات)',
    'pet.weight': 'الوزن (كجم)',
    'pet.gender': 'الجنس',
    'pet.selectGender': 'اختر الجنس',
    'pet.male': 'ذكر',
    'pet.female': 'أنثى',
    'pet.dietaryPreferences': 'التفضيلات الغذائية',
    'pet.grainFree': 'نظام غذائي خالي من الحبوب',
    'pet.hypoallergenic': 'غير مسبب للحساسية',
    'pet.sensitiveDigestion': 'هضم حساس',
    
    // Subscription
    'sub.selectedPlan': 'الخطة المختارة',
    'sub.addons': 'الإضافات (اختياري)',
    'sub.addon.litter.title': 'فضلات قطط متميزة',
    'sub.addon.litter.description': 'فضلات عالية الجودة للتحكم في الرائحة',
    'sub.addon.toys.title': 'مجموعة ألعاب شهرية',
    'sub.addon.toys.description': 'ألعاب تفاعلية للتحفيز العقلي',
    'sub.addon.treats.title': 'صندوق وجبات خفيفة فاخرة',
    'sub.addon.treats.description': 'وجبات خفيفة صحية ولذيذة',
    'sub.total': 'المجموع (شهريًا)',
    'sub.complete': 'إكمال الاشتراك',
    'sub.back': 'العودة إلى ملف تعريف الحيوان الأليف',
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.welcome': 'مرحبا',
    'dashboard.subscription': 'اشتراكك',
    'dashboard.petProfile': 'ملف تعريف الحيوان الأليف',
    'dashboard.logout': 'تسجيل الخروج'
  }
};

export type Language = 'en' | 'ar';

export function getTranslation(key: string, language: Language): string {
  return translations[language][key] || key;
}

export default { getTranslation };
