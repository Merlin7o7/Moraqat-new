import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage } from '@/hooks/use-language';
import { useAuth } from '@/hooks/use-auth';
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
import { Input } from '@/components/ui/input';
import { useLocation } from 'wouter';
import PetProfileForm from './PetProfileForm';
import SubscriptionForm from './SubscriptionForm';

interface SignupFormProps {
  onSuccess?: () => void;
}

const signupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const SignupForm = ({ onSuccess }: SignupFormProps) => {
  const { t } = useLanguage();
  const { registerMutation } = useAuth();
  const { currentStep, setCurrentStep } = useSubscription();
  const [, setLocation] = useLocation();
  
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: z.infer<typeof signupSchema>) => {
    registerMutation.mutate(
      {
        username: values.username,
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          setCurrentStep(2);
        },
      }
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium leading-6 text-[#1A2421]">
          {currentStep === 1 
            ? t('auth.signup.title')
            : currentStep === 2 
              ? 'Create Pet Profile'
              : 'Choose Subscription'}
        </h3>
      </div>
      
      {currentStep === 1 && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full border border-[#E5E5E3] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-[#4A7C59]"
                      disabled={registerMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.email')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      className="w-full border border-[#E5E5E3] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-[#4A7C59]"
                      disabled={registerMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.password')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      className="w-full border border-[#E5E5E3] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-[#4A7C59]"
                      disabled={registerMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.confirmPassword')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      className="w-full border border-[#E5E5E3] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-[#4A7C59]"
                      disabled={registerMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4A7C59] hover:bg-[#3B6347] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A7C59]"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? 'Creating Account...' : t('auth.continue')}
            </Button>
          </form>
        </Form>
      )}
      
      {currentStep === 2 && (
        <PetProfileForm 
          onBack={() => setCurrentStep(1)}
          onSuccess={() => setCurrentStep(3)}
        />
      )}
      
      {currentStep === 3 && (
        <SubscriptionForm 
          onBack={() => setCurrentStep(2)}
          onSuccess={() => {
            if (onSuccess) {
              onSuccess();
            }
            setCurrentStep(1);
            setLocation('/dashboard');
          }}
        />
      )}
      
      {currentStep === 1 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-[#52524E]">
            <span>{t('auth.haveAccount')}</span>{' '}
            <Button 
              variant="link" 
              className="font-medium text-[#4A7C59] hover:text-[#3B6347] focus:outline-none p-0"
              onClick={() => {
                // Switch to login form
                if (onSuccess) onSuccess();
              }}
            >
              {t('auth.signin')}
            </Button>
          </p>
        </div>
      )}
    </div>
  );
};

export default SignupForm;
