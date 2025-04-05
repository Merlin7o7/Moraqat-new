import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/hooks/use-language';
import { useSubscription } from '@/context/SubscriptionContext';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { AddOn, SubscriptionPlan } from '@shared/schema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface SubscriptionFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

const subscriptionSchema = z.object({
  petId: z.coerce.number().min(1, 'Pet selection is required'),
  plan: z.string().min(1, 'Plan is required'),
  addons: z.array(z.string()).optional().default([]),
});

type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;

const SubscriptionForm = ({ onBack, onSuccess }: SubscriptionFormProps) => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const { selectedPlan, addons, calculatePrice } = useSubscription();
  
  // Fetch user's pets for the dropdown
  const { data: pets, isLoading: petsLoading } = useQuery({
    queryKey: ['/api/pets'],
  });
  
  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      petId: 0,
      plan: selectedPlan,
      addons: addons,
    },
  });
  
  const createSubscriptionMutation = useMutation({
    mutationFn: async (subscriptionData: SubscriptionFormValues) => {
      const formattedData = {
        ...subscriptionData,
        price: calculatePrice(),
        status: 'active'
      };
      
      const res = await apiRequest('POST', '/api/subscriptions', formattedData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/subscriptions'] });
      toast({
        title: 'Success!',
        description: 'Subscription created successfully.',
      });
      onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `Failed to create subscription: ${error.message}`,
        variant: 'destructive',
      });
    },
  });
  
  const onSubmit = (values: SubscriptionFormValues) => {
    createSubscriptionMutation.mutate(values);
  };
  
  // Calculate prices for UI display
  const getPriceByPlan = (plan: SubscriptionPlan): number => {
    switch (plan) {
      case 'basic': return 210;
      case 'premium': return 280;
      case 'vip': return 350;
      default: return 0;
    }
  };
  
  const getPriceByAddon = (addon: AddOn): number => {
    switch (addon) {
      case 'litter': return 75;
      case 'toys': return 50;
      case 'treats': return 35;
      default: return 0;
    }
  };
  
  const getPlanName = (plan: SubscriptionPlan): string => {
    switch (plan) {
      case 'basic': return t('pricing.basic.title');
      case 'premium': return t('pricing.premium.title');
      case 'vip': return t('pricing.vip.title');
      default: return '';
    }
  };
  
  // If pets are loading, show loading state
  if (petsLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If no pets found, prompt user to create one first
  if (!pets || pets.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-lg text-[#52524E] mb-4">
          {language === 'en' 
            ? 'Please create a pet profile first before setting up a subscription.'
            : 'يرجى إنشاء ملف تعريف للحيوان الأليف أولاً قبل إعداد الاشتراك.'}
        </p>
        <Button onClick={onBack}>
          {language === 'en' ? 'Back to Pet Profile' : 'العودة إلى ملف تعريف الحيوان الأليف'}
        </Button>
      </div>
    );
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Pet Selection */}
        <FormField
          control={form.control}
          name="petId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Pet</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value.toString()}
                disabled={createSubscriptionMutation.isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a pet" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {pets.map(pet => (
                    <SelectItem key={pet.id} value={pet.id.toString()}>
                      {pet.name} ({pet.breed})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Selected Plan */}
        <div>
          <h4 className="text-base font-medium text-[#1A2421]">
            {t('sub.selectedPlan')}
          </h4>
          <div className="mt-2 p-3 bg-[#FAFAF9] rounded-md">
            <div className="flex justify-between items-center">
              <FormField
                control={form.control}
                name="plan"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={createSubscriptionMutation.isPending}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a plan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="basic">{t('pricing.basic.title')} - 210 {language === 'en' ? 'SAR' : 'ريال'}</SelectItem>
                        <SelectItem value="premium">{t('pricing.premium.title')} - 280 {language === 'en' ? 'SAR' : 'ريال'}</SelectItem>
                        <SelectItem value="vip">{t('pricing.vip.title')} - 350 {language === 'en' ? 'SAR' : 'ريال'}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        
        {/* Addons */}
        <div>
          <h4 className="text-base font-medium text-[#1A2421]">
            {t('sub.addons')}
          </h4>
          <div className="mt-2 space-y-2">
            <FormField
              control={form.control}
              name="addons"
              render={({ field }) => (
                <>
                  <div className="flex justify-between items-center p-3 border border-[#E5E5E3] rounded-md hover:bg-[#FAFAF9]">
                    <div className="flex items-start">
                      <Checkbox
                        checked={field.value?.includes('litter')}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...(field.value || []), 'litter']
                            : (field.value || []).filter(value => value !== 'litter');
                          field.onChange(newValue);
                        }}
                        disabled={createSubscriptionMutation.isPending}
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-[#1A2421]">
                          {t('sub.addon.litter.title')}
                        </div>
                        <p className="text-xs text-[#A3A3A1]">
                          {t('sub.addon.litter.description')}
                        </p>
                      </div>
                    </div>
                    <span className="text-[#4A7C59] font-medium">+75 {language === 'en' ? 'SAR' : 'ريال'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border border-[#E5E5E3] rounded-md hover:bg-[#FAFAF9]">
                    <div className="flex items-start">
                      <Checkbox
                        checked={field.value?.includes('toys')}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...(field.value || []), 'toys']
                            : (field.value || []).filter(value => value !== 'toys');
                          field.onChange(newValue);
                        }}
                        disabled={createSubscriptionMutation.isPending}
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-[#1A2421]">
                          {t('sub.addon.toys.title')}
                        </div>
                        <p className="text-xs text-[#A3A3A1]">
                          {t('sub.addon.toys.description')}
                        </p>
                      </div>
                    </div>
                    <span className="text-[#4A7C59] font-medium">+50 {language === 'en' ? 'SAR' : 'ريال'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border border-[#E5E5E3] rounded-md hover:bg-[#FAFAF9]">
                    <div className="flex items-start">
                      <Checkbox
                        checked={field.value?.includes('treats')}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...(field.value || []), 'treats']
                            : (field.value || []).filter(value => value !== 'treats');
                          field.onChange(newValue);
                        }}
                        disabled={createSubscriptionMutation.isPending}
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-[#1A2421]">
                          {t('sub.addon.treats.title')}
                        </div>
                        <p className="text-xs text-[#A3A3A1]">
                          {t('sub.addon.treats.description')}
                        </p>
                      </div>
                    </div>
                    <span className="text-[#4A7C59] font-medium">+35 {language === 'en' ? 'SAR' : 'ريال'}</span>
                  </div>
                </>
              )}
            />
          </div>
        </div>
        
        {/* Total Price */}
        <div className="pt-4 border-t border-[#E5E5E3]">
          <div className="flex justify-between items-center">
            <span className="font-medium text-[#1A2421]">
              {t('sub.total')}
            </span>
            <span className="text-xl font-bold text-[#4A7C59]">
              {calculatePrice()} {language === 'en' ? 'SAR' : 'ريال'}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={createSubscriptionMutation.isPending}
          >
            {t('sub.back')}
          </Button>
          <Button
            type="submit"
            disabled={createSubscriptionMutation.isPending}
          >
            {createSubscriptionMutation.isPending 
              ? 'Processing...' 
              : t('sub.complete')}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SubscriptionForm;
