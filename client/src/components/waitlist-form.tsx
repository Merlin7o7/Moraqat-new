import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLanguage } from "@/hooks/use-language";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Loader2 } from "lucide-react";

// Zod schema
const waitlistSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  catInfo: z.string().optional(),
  newsletterOptIn: z.boolean().default(false),
});

type WaitlistFormValues = z.infer<typeof waitlistSchema>;

interface WaitlistFormProps {
  onSuccess: () => void;
}

export default function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const { t, rtl } = useLanguage();
  
  // Form initialization
  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      catInfo: "",
      newsletterOptIn: false,
    },
  });
  
  // Submit mutation
  const submitMutation = useMutation({
    mutationFn: async (data: WaitlistFormValues) => {
      const res = await apiRequest("POST", "/api/waitlist", data);
      return res.json();
    },
    onSuccess: () => {
      form.reset();
      onSuccess();
    },
  });
  
  const onSubmit = (data: WaitlistFormValues) => {
    submitMutation.mutate(data);
  };

  return (
    <div className={`md:flex ${rtl ? 'flex-row-reverse' : ''}`}>
      <div className="md:w-1/2 bg-primary p-8 md:p-12 text-white">
        <h2 className="font-heading font-bold text-3xl mb-6">{t("waitlist.title")}</h2>
        <p className="mb-6 opacity-90">
          {t("waitlist.desc")}
        </p>
        <ul className="space-y-4 mb-8">
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${rtl ? 'ml-3 mr-0' : 'mr-3 ml-0'} mt-0.5 text-secondary`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{t("waitlist.benefit1")}</span>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${rtl ? 'ml-3 mr-0' : 'mr-3 ml-0'} mt-0.5 text-secondary`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{t("waitlist.benefit2")}</span>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${rtl ? 'ml-3 mr-0' : 'mr-3 ml-0'} mt-0.5 text-secondary`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{t("waitlist.benefit3")}</span>
          </li>
        </ul>
        <div className="hidden md:block">
          <div className="rounded-xl h-48 w-full bg-[url('https://images.unsplash.com/photo-1570824104453-508955ab713e')] bg-cover bg-center"></div>
        </div>
      </div>
      
      <div className="md:w-1/2 p-8 md:p-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("waitlist.form.name")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>{t("waitlist.form.email")}</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("waitlist.form.phone")}</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="catInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("waitlist.form.cat")}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={t("waitlist.form.cat.placeholder")}
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="newsletterOptIn"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal text-sm text-gray-600">
                      {t("waitlist.form.newsletter")}
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            
            <Button 
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3"
              disabled={submitMutation.isPending}
            >
              {submitMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                t("waitlist.form.submit")
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
