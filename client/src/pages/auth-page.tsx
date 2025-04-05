import { useEffect } from 'react';
import { useLocation, Redirect } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import { useLanguage } from '@/hooks/use-language';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AuthPage = () => {
  const { user, isLoading } = useAuth();
  const { t, language } = useLanguage();
  const [location] = useLocation();

  // Update document title
  useEffect(() => {
    document.title = language === 'en' ? 'Authentication - Moraqqat' : 'تسجيل الدخول - مرقط';
  }, [language]);

  // If user is already logged in, redirect to dashboard
  if (!isLoading && user) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className={language === 'ar' ? 'font-arabic' : 'font-body'}>
      <Header />
      <main className="py-16 bg-[#FAFAF9] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Auth forms */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login">{t('header.login')}</TabsTrigger>
                  <TabsTrigger value="signup">{t('header.signup')}</TabsTrigger>
                </TabsList>
                
                <Card>
                  <CardContent className="pt-6">
                    <TabsContent value="login">
                      <LoginForm />
                    </TabsContent>
                    
                    <TabsContent value="signup">
                      <SignupForm />
                    </TabsContent>
                  </CardContent>
                </Card>
              </Tabs>
            </div>
            
            {/* Hero section */}
            <div className="hidden lg:block">
              <div className="relative rounded-lg overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4A7C59]/80 to-[#8C5E58]/60 z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80" 
                  alt="Happy cat" 
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-8 text-center">
                  <h2 className="text-3xl font-extrabold text-white mb-4 font-heading">
                    {language === 'en' ? 'Premium Pet Nutrition' : 'تغذية حيوانات أليفة متميزة'}
                  </h2>
                  <p className="text-white text-lg mb-4">
                    {language === 'en' 
                      ? 'Join Moraqqat today and provide your beloved cat with the best nutrition tailored to their specific needs.'
                      : 'انضم إلى مرقط اليوم وقدم لقطتك المحبوبة أفضل تغذية مخصصة لاحتياجاتها الخاصة.'}
                  </p>
                  <ul className="text-white text-left space-y-2">
                    <li className="flex items-center">
                      <svg className="h-5 w-5 mr-2 text-[#F9A03F]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      {language === 'en' ? 'Personalized nutrition plans' : 'خطط غذائية مخصصة'}
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 mr-2 text-[#F9A03F]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      {language === 'en' ? 'Monthly deliveries' : 'توصيلات شهرية'}
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 mr-2 text-[#F9A03F]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      {language === 'en' ? 'Premium quality ingredients' : 'مكونات عالية الجودة'}
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 mr-2 text-[#F9A03F]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      {language === 'en' ? 'Flexible subscription options' : 'خيارات اشتراك مرنة'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
