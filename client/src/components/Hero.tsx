import { useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Hero = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    // Add the email to the waitlist
    toast({
      title: "Success!",
      description: "You've been added to our waitlist.",
    });
    
    // Reset form
    setEmail('');
  };

  return (
    <section className="relative px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-20 lg:pb-28 bg-[#f9fafb] bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2720%27%20height%3D%2720%27%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cg%20fill%3D%27%234a7c59%27%20fill-opacity%3D%270.05%27%20fill-rule%3D%27evenodd%27%3E%3Ccircle%20cx%3D%273%27%20cy%3D%273%27%20r%3D%271.5%27%2F%3E%3Ccircle%20cx%3D%273%27%20cy%3D%2717%27%20r%3D%271.5%27%2F%3E%3Ccircle%20cx%3D%2717%27%20cy%3D%273%27%20r%3D%271.5%27%2F%3E%3Ccircle%20cx%3D%2717%27%20cy%3D%2717%27%20r%3D%271.5%27%2F%3E%3Ccircle%20cx%3D%2710%27%20cy%3D%2710%27%20r%3D%272.5%27%2F%3E%3Ccircle%20cx%3D%276%27%20cy%3D%276%27%20r%3D%271%27%2F%3E%3Ccircle%20cx%3D%276%27%20cy%3D%2714%27%20r%3D%271%27%2F%3E%3Ccircle%20cx%3D%2714%27%20cy%3D%276%27%20r%3D%271%27%2F%3E%3Ccircle%20cx%3D%2714%27%20cy%3D%2714%27%20r%3D%271%27%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className={`sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 ${language === 'ar' ? 'lg:text-right' : 'lg:text-left'}`}>
            <h1>
              <span className="block text-sm font-semibold uppercase tracking-wide text-primary">
                {t('hero.tagline')}
              </span>
              <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl">
                <span className="block">{t('hero.title1')}</span>
                <span className="block brand-gradient-text">{t('hero.title2')}</span>
              </span>
            </h1>
            <p className="mt-3 text-base text-[#52524E] sm:mt-5 sm:text-xl lg:text-lg">
              {t('hero.description')}
            </p>
            <div className={`mt-8 sm:max-w-lg sm:mx-auto sm:text-center ${language === 'ar' ? 'lg:text-right lg:mx-0' : 'lg:text-left lg:mx-0'}`}>
              <form onSubmit={handleSubmit} className="mt-3 sm:flex">
                <div className="min-w-0 flex-1">
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('hero.emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-4 py-3 rounded-md border border-[#E5E5E3] shadow-sm text-base placeholder-[#A3A3A1] focus:outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-[#4A7C59]"
                  />
                </div>
                <div className={`mt-3 sm:mt-0 ${language === 'ar' ? 'sm:mr-3 sm:ml-0' : 'sm:ml-3'}`}>
                  <Button 
                    type="submit" 
                    className="block w-full py-3 px-4 rounded-md shadow bg-[#4A7C59] text-white font-medium hover:bg-[#3B6347] focus:outline-none focus:ring-2 focus:ring-[#4A7C59] focus:ring-offset-2"
                  >
                    {t('hero.joinWaitlist')}
                  </Button>
                </div>
              </form>
              <p className="mt-3 text-sm text-[#A3A3A1]">
                {t('hero.privacy')}
              </p>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto rounded-lg shadow-lg overflow-hidden">
              <img
                className="object-cover w-full h-64 sm:h-72 md:h-96 lg:w-full lg:h-full"
                src="https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80"
                alt="Happy cat with premium cat food"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
