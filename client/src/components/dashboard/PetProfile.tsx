import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useLanguage } from '@/hooks/use-language';
import { 
  Pet,
  insertPetSchema
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
import { Loader2, Plus } from 'lucide-react';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface PetProfileProps {
  pets: Pet[];
  isLoading: boolean;
  error: Error | null;
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

const PetProfile = ({ pets, isLoading, error }: PetProfileProps) => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [showAddPetDialog, setShowAddPetDialog] = useState(false);
  
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
      setShowAddPetDialog(false);
      form.reset();
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
  
  // Gender display helper
  const getGenderDisplay = (gender: string) => {
    if (gender === 'male') return language === 'en' ? 'Male' : 'ذكر';
    if (gender === 'female') return language === 'en' ? 'Female' : 'أنثى';
    return gender;
  };
  
  // Breed display helper
  const getBreedDisplay = (breed: string) => {
    const breedOption = breedOptions.find(option => option.value === breed);
    return breedOption ? breedOption.label : breed;
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
            ? 'Error loading pet profiles' 
            : 'خطأ في تحميل ملفات تعريف الحيوانات الأليفة'}
        </p>
        <p className="text-[#52524E]">{error.message}</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1A2421]">
          {language === 'en' ? 'Your Pets' : 'حيواناتك الأليفة'}
        </h2>
        <Dialog open={showAddPetDialog} onOpenChange={setShowAddPetDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Add Pet' : 'إضافة حيوان أليف'}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {language === 'en' ? 'Add a New Pet' : 'إضافة حيوان أليف جديد'}
              </DialogTitle>
              <DialogDescription>
                {language === 'en' 
                  ? 'Fill out the details of your pet to create a profile.' 
                  : 'املأ تفاصيل حيوانك الأليف لإنشاء ملف تعريف.'}
              </DialogDescription>
            </DialogHeader>
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
                          className="w-full"
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            className="w-full"
                            disabled={createPetMutation.isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
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
                            className="w-full"
                            disabled={createPetMutation.isPending}
                          />
                        </FormControl>
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
                
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={createPetMutation.isPending}
                  >
                    {createPetMutation.isPending 
                      ? (language === 'en' ? 'Creating...' : 'جاري الإنشاء...') 
                      : (language === 'en' ? 'Add Pet' : 'إضافة')}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      {pets.length === 0 ? (
        <div className="text-center p-8 bg-[#FAFAF9] rounded-lg border border-[#E5E5E3]">
          <p className="text-lg text-[#52524E] mb-4">
            {language === 'en' 
              ? 'You haven\'t added any pets yet.' 
              : 'لم تقم بإضافة أي حيوانات أليفة حتى الآن.'}
          </p>
          <Button 
            onClick={() => setShowAddPetDialog(true)}
            variant="outline"
          >
            <Plus className="mr-2 h-4 w-4" />
            {language === 'en' ? 'Add Your First Pet' : 'أضف حيوانك الأليف الأول'}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pets.map((pet) => (
            <Card key={pet.id}>
              <CardHeader>
                <CardTitle>{pet.name}</CardTitle>
                <CardDescription>
                  {getBreedDisplay(pet.breed)} • {getGenderDisplay(pet.gender)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#52524E]">{t('pet.age')}:</span>
                    <span>{pet.age} {language === 'en' ? 'years' : 'سنوات'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#52524E]">{t('pet.weight')}:</span>
                    <span>{pet.weight} {language === 'en' ? 'kg' : 'كجم'}</span>
                  </div>
                  
                  {pet.dietaryPreferences && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">{t('pet.dietaryPreferences')}:</h4>
                      <ul className="space-y-1 text-sm">
                        {pet.dietaryPreferences.grainFree && (
                          <li className="flex items-center">
                            <svg className="h-4 w-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {t('pet.grainFree')}
                          </li>
                        )}
                        {pet.dietaryPreferences.hypoallergenic && (
                          <li className="flex items-center">
                            <svg className="h-4 w-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {t('pet.hypoallergenic')}
                          </li>
                        )}
                        {pet.dietaryPreferences.sensitiveDigestion && (
                          <li className="flex items-center">
                            <svg className="h-4 w-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {t('pet.sensitiveDigestion')}
                          </li>
                        )}
                        {!pet.dietaryPreferences.grainFree && 
                         !pet.dietaryPreferences.hypoallergenic && 
                         !pet.dietaryPreferences.sensitiveDigestion && (
                          <li className="text-[#A3A3A1]">
                            {language === 'en' ? 'No special dietary needs' : 'لا توجد احتياجات غذائية خاصة'}
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" size="sm">
                  {language === 'en' ? 'Edit' : 'تعديل'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetProfile;
