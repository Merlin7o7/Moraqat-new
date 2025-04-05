import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage } from '@/hooks/use-language';
import { useAuth } from '@/hooks/use-auth';
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
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';
import { useLocation } from 'wouter';

interface LoginFormProps {
  onSuccess?: () => void;
}

const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { t } = useLanguage();
  const { loginMutation } = useAuth();
  const [, setLocation] = useLocation();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(
      {
        username: values.username,
        password: values.password,
      },
      {
        onSuccess: () => {
          if (onSuccess) {
            onSuccess();
          }
          setLocation('/dashboard');
        },
      }
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium leading-6 text-[#1A2421]">
          {t('auth.login.title')}
        </h3>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.email')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full border border-[#E5E5E3] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-[#4A7C59]"
                    disabled={loginMutation.isPending}
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
                    disabled={loginMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="remember-me"
                      disabled={loginMutation.isPending}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel htmlFor="remember-me" className="text-sm font-normal">
                      {t('auth.rememberMe')}
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            
            <div className="text-sm">
              <a href="#" className="font-medium text-[#4A7C59] hover:text-[#3B6347]">
                {t('auth.forgotPassword')}
              </a>
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4A7C59] hover:bg-[#3B6347] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A7C59]"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Logging in...' : t('auth.signin')}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
