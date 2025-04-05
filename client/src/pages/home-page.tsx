import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import PricingPlans from '@/components/PricingPlans';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import WhatsAppSupport from '@/components/WhatsAppSupport';
import Footer from '@/components/Footer';
import { useLanguage } from '@/hooks/use-language';

const HomePage = () => {
  const { language } = useLanguage();

  // Update document title and language attribute
  useEffect(() => {
    document.title = language === 'en' ? 'Moraqqat - Premium Pet Food Subscription' : 'مرقط - اشتراك طعام حيوانات أليفة متميز';
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <div className={language === 'ar' ? 'font-arabic' : 'font-body'}>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <PricingPlans />
        <Testimonials />
        <FAQ />
        <WhatsAppSupport />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
