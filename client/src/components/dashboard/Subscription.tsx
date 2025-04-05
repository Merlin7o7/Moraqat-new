import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useLanguage } from '@/hooks/use-language';
import { 
  Subscription as SubscriptionType,
  Pet
} from '@shared/schema';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Loader2, Plus } from 'lucide-react';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import SubscriptionForm from '../auth/SubscriptionForm';
import { Badge } from '@/components/ui/badge';

interface SubscriptionProps {
  subscriptions: SubscriptionType[];
  pets: Pet[];
  isLoading: boolean;
  error: Error | null;
}

const Subscription = ({ subscriptions, pets, isLoading, error }: SubscriptionProps) => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  const cancelSubscriptionMutation = useMutation({
    mutationFn: async (subscriptionId: number) => {
      const res = await apiRequest('PATCH', `/api/subscriptions/${subscriptionId}`, {
        status: 'cancelled'
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/subscriptions'] });
      toast({
        title: 'Success!',
        description: 'Subscription cancelled successfully.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `Failed to cancel subscription: ${error.message}`,
        variant: 'destructive',
      });
    },
  });
  
  const pauseSubscriptionMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number, status: 'paused' | 'active' }) => {
      const res = await apiRequest('PATCH', `/api/subscriptions/${id}`, {
        status
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/subscriptions'] });
      toast({
        title: 'Success!',
        description: 'Subscription status updated successfully.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `Failed to update subscription: ${error.message}`,
        variant: 'destructive',
      });
    },
  });
  
  const getPlanName = (plan: string): string => {
    switch (plan) {
      case 'basic': return t('pricing.basic.title');
      case 'premium': return t('pricing.premium.title');
      case 'vip': return t('pricing.vip.title');
      default: return plan;
    }
  };
  
  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <Badge className="bg-green-500">{language === 'en' ? 'Active' : 'نشط'}</Badge>;
    } else if (status === 'paused') {
      return <Badge className="bg-yellow-500">{language === 'en' ? 'Paused' : 'متوقف مؤقتاً'}</Badge>;
    } else if (status === 'cancelled') {
      return <Badge className="bg-red-500">{language === 'en' ? 'Cancelled' : 'ملغى'}</Badge>;
    }
    return <Badge>{status}</Badge>;
  };
  
  const getPetName = (petId: number): string => {
    const pet = pets.find(p => p.id === petId);
    return pet ? pet.name : `Pet #${petId}`;
  };
  
  const formatAddons = (addons: string[]) => {
    if (!addons || addons.length === 0) {
      return language === 'en' ? 'No add-ons' : 'لا توجد إضافات';
    }
    
    return addons.map(addon => {
      switch (addon) {
        case 'litter': return t('sub.addon.litter.title');
        case 'toys': return t('sub.addon.toys.title');
        case 'treats': return t('sub.addon.treats.title');
        default: return addon;
      }
    }).join(', ');
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-lg text-red-500 mb-4">
          {language === 'en' 
            ? 'Error loading subscriptions' 
            : 'خطأ في تحميل الاشتراكات'}
        </p>
        <p className="text-[#52524E]">{error.message}</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1A2421]">
          {language === 'en' ? 'Your Subscriptions' : 'اشتراكاتك'}
        </h2>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {language === 'en' ? 'New Subscription' : 'اشتراك جديد'}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {language === 'en' ? 'Create New Subscription' : 'إنشاء اشتراك جديد'}
              </DialogTitle>
              <DialogDescription>
                {language === 'en' 
                  ? 'Choose a subscription plan and customize it for your pet.' 
                  : 'اختر خطة اشتراك وخصصها لحيوانك الأليف.'}
              </DialogDescription>
            </DialogHeader>
            <SubscriptionForm
              onBack={() => setShowAddDialog(false)}
              onSuccess={() => setShowAddDialog(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      {subscriptions.length === 0 ? (
        <div className="text-center p-8 bg-[#FAFAF9] rounded-lg border border-[#E5E5E3]">
          <p className="text-lg text-[#52524E] mb-4">
            {language === 'en' 
              ? 'You don\'t have any active subscriptions yet.' 
              : 'ليس لديك أي اشتراكات نشطة حتى الآن.'}
          </p>
          <Button 
            onClick={() => setShowAddDialog(true)}
            variant="outline"
          >
            <Plus className="mr-2 h-4 w-4" />
            {language === 'en' ? 'Create Your First Subscription' : 'إنشاء اشتراكك الأول'}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subscriptions.map((subscription) => (
            <Card key={subscription.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{getPlanName(subscription.plan)}</CardTitle>
                    <CardDescription>
                      {language === 'en' ? 'For ' : 'لـ '} 
                      {getPetName(subscription.petId)}
                    </CardDescription>
                  </div>
                  {getStatusBadge(subscription.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#52524E]">
                      {language === 'en' ? 'Price:' : 'السعر:'}
                    </span>
                    <span className="font-semibold">
                      {subscription.price} {language === 'en' ? 'SAR / month' : 'ريال / شهر'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#52524E]">
                      {language === 'en' ? 'Add-ons:' : 'الإضافات:'}
                    </span>
                    <span>{formatAddons(subscription.addons as string[])}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#52524E]">
                      {language === 'en' ? 'Created:' : 'تاريخ الإنشاء:'}
                    </span>
                    <span>
                      {new Date(subscription.createdAt).toLocaleDateString(
                        language === 'en' ? 'en-US' : 'ar-SA'
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                {subscription.status === 'active' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => pauseSubscriptionMutation.mutate({ 
                      id: subscription.id, 
                      status: 'paused' 
                    })}
                    disabled={pauseSubscriptionMutation.isPending}
                  >
                    {pauseSubscriptionMutation.isPending 
                      ? (language === 'en' ? 'Processing...' : 'جاري المعالجة...') 
                      : (language === 'en' ? 'Pause' : 'إيقاف مؤقت')}
                  </Button>
                )}
                
                {subscription.status === 'paused' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => pauseSubscriptionMutation.mutate({ 
                      id: subscription.id, 
                      status: 'active' 
                    })}
                    disabled={pauseSubscriptionMutation.isPending}
                  >
                    {pauseSubscriptionMutation.isPending 
                      ? (language === 'en' ? 'Processing...' : 'جاري المعالجة...') 
                      : (language === 'en' ? 'Resume' : 'استئناف')}
                  </Button>
                )}
                
                {subscription.status !== 'cancelled' && (
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => cancelSubscriptionMutation.mutate(subscription.id)}
                    disabled={cancelSubscriptionMutation.isPending}
                  >
                    {cancelSubscriptionMutation.isPending 
                      ? (language === 'en' ? 'Cancelling...' : 'جاري الإلغاء...') 
                      : (language === 'en' ? 'Cancel' : 'إلغاء')}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subscription;
