import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { useLanguage } from '@/hooks/use-language';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PetProfile from '@/components/dashboard/PetProfile';
import Subscription from '@/components/dashboard/Subscription';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [, params] = useLocation();
  const [activeTab, setActiveTab] = useState<string>('profile');
  
  // Parse search parameters to check if we're coming from a new subscription flow
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('newSubscription') === 'true') {
      setActiveTab('subscription');
    }
  }, []);

  // Fetch user's pets
  const { 
    data: pets,
    isLoading: petsLoading,
    error: petsError
  } = useQuery({
    queryKey: ['/api/pets'],
    enabled: !!user,
  });

  // Fetch user's subscriptions
  const { 
    data: subscriptions,
    isLoading: subscriptionsLoading,
    error: subscriptionsError
  } = useQuery({
    queryKey: ['/api/subscriptions'],
    enabled: !!user,
  });

  // Update document title
  useEffect(() => {
    document.title = language === 'en' ? 'Dashboard - Moraqqat' : 'لوحة التحكم - مرقط';
  }, [language]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className={language === 'ar' ? 'font-arabic' : 'font-body'}>
      <Header />
      <main className="py-16 bg-[#FAFAF9] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#1A2421] font-heading">
              {t('dashboard.title')}
            </h1>
            <p className="mt-2 text-xl text-[#52524E]">
              {t('dashboard.welcome')}, {user.fullName || user.username}!
            </p>
          </div>

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="profile">{t('dashboard.petProfile')}</TabsTrigger>
              <TabsTrigger value="subscription">{t('dashboard.subscription')}</TabsTrigger>
            </TabsList>
            
            <Card>
              <CardContent className="pt-6">
                <TabsContent value="profile">
                  <PetProfile pets={pets || []} isLoading={petsLoading} error={petsError} />
                </TabsContent>
                
                <TabsContent value="subscription">
                  <Subscription 
                    subscriptions={subscriptions || []} 
                    pets={pets || []}
                    isLoading={subscriptionsLoading || petsLoading} 
                    error={subscriptionsError || petsError} 
                  />
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
