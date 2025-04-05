import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useLanguage } from '@/hooks/use-language';
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface PetProfileFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

const petProfileSchema = z.object({
  name: z.string().min(1, 'Pet name is required'),
  breed: z.string().min(1, 'Breed is required'),
  age: z.coerce.number().min(0, 'Age must be a positive number'),
  weight: z.coerce.number().min(0, 'Weight must be a positive number'),
  gender: z.string().min(1, 'Gender is required'),
  dietaryPreferences: z.object({
    grainFree: z.boolean().default(false),
    hypoallergenic: z.boolean().default(false),
    sensitiveDigestion: z.boolean().default(false),
  }),
});

type PetProfileFormValues = z.infer<typeof petProfileSchema>;

const PetProfileForm = ({ onBack, onSuccess }: PetProfileFormProps) => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  
  const form = useForm<PetProfileFormValues>({
    resolver: zodResolver(petProfileSchema),
    defaultValues: {
      name: '',
      breed: '',
      age: 0,
      weight: 0,
      gender: '',
      dietaryPreferences: {
        grainFree: false,
        hypoallergenic: false,
        sensitiveDigestion: false,
      },
    },
  });
  
  const createPetMutation = useMutation({
    mutationFn: async (petData: PetProfileFormValues) => {
      const res = await apiRequest('POST', '/api/pets', petData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/pets'] });
      toast({
        title: 'Success!',
        description: 'Pet profile created successfully.',
      });
      onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `Failed to create pet profile: ${error.message}`,
        variant: 'destructive',
      });
    },
  });
  
  const onSubmit = (values: PetProfileFormValues) => {
    createPetMutation.mutate(values);
  };
  
  // Cat breeds options
  const breedOptions = [
    { value: 'persian', label: language === 'en' ? 'Persian' : 'فارسي' },
    { value: 'siamese', label: language === 'en' ? 'Siamese' : 'سيامي' },
    { value: 'ragdoll', label: language === 'en' ? 'Ragdoll' : 'راغدول' },
    { value: 'domestic', label: language === 'en' ? 'Domestic Shorthair' : 'محلي قصير الشعر' },
    { value: 'bengal', label: language === 'en' ? 'Bengal' : 'بنغالي' },
    { value: 'sphynx', label: language === 'en' ? 'Sphynx' : 'سفينكس' },
    { value: 'mainecoon', label: language === 'en' ? 'Maine Coon' : 'مين كون' },
    { value: 'other', label: language === 'en' ? 'Other' : 'أخرى' },
  ];
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Pet Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('pet.title')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full border border-[#E5E5E3] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-[#4A7C59]"
                  disabled={createPetMutation.isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Breed */}
          <FormField
            control={form.control}
            name="breed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('pet.breed')}</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  disabled={createPetMutation.isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('pet.selectBreed')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {breedOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Age */}
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('pet.age')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    min="0"
                    step="0.1"
                    className="w-full border border-[#E5E5E3] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-[#4A7C59]"
                    disabled={createPetMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Weight */}
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('pet.weight')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    min="0"
                    step="0.1"
                    className="w-full border border-[#E5E5E3] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-[#4A7C59]"
                    disabled={createPetMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('pet.gender')}</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  disabled={createPetMutation.isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('pet.selectGender')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">{t('pet.male')}</SelectItem>
                    <SelectItem value="female">{t('pet.female')}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {/* Dietary Preferences */}
        <div>
          <FormLabel>{t('pet.dietaryPreferences')}</FormLabel>
          <div className="mt-2 space-y-2">
            <FormField
              control={form.control}
              name="dietaryPreferences.grainFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={createPetMutation.isPending}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t('pet.grainFree')}
                  </FormLabel>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dietaryPreferences.hypoallergenic"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={createPetMutation.isPending}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t('pet.hypoallergenic')}
                  </FormLabel>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dietaryPreferences.sensitiveDigestion"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={createPetMutation.isPending}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {t('pet.sensitiveDigestion')}
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={createPetMutation.isPending}
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={createPetMutation.isPending}
          >
            {createPetMutation.isPending ? 'Creating Profile...' : t('auth.continue')}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PetProfileForm;
