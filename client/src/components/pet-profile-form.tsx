import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

// Zod schema for pet profile
const petProfileSchema = z.object({
  name: z.string().min(1, "Pet name is required"),
  breed: z.string().min(1, "Breed is required"),
  age: z.string().min(1, "Age is required").transform(val => parseInt(val, 10)),
  weight: z.string().min(1, "Weight is required").transform(val => parseInt(val, 10)),
  dietaryPreferences: z.string(),
  foodType: z.string(),
  imageUrl: z.string().optional(),
});

type PetProfileFormValues = z.infer<typeof petProfileSchema>;

export default function PetProfileForm() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  
  // Form initialization
  const form = useForm<PetProfileFormValues>({
    resolver: zodResolver(petProfileSchema),
    defaultValues: {
      name: "",
      breed: "",
      age: "",
      weight: "",
      dietaryPreferences: "regular",
      foodType: "dry",
      imageUrl: "",
    },
  });
  
  // Pet creation mutation
  const createPetMutation = useMutation({
    mutationFn: async (data: PetProfileFormValues) => {
      const petData = {
        ...data,
        userId: user?.id,
      };
      const res = await apiRequest("POST", "/api/pets", petData);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pets"] });
      setLocation("/subscription");
    },
  });
  
  const onSubmit = (data: PetProfileFormValues) => {
    createPetMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("pet.name")}</FormLabel>
              <FormControl>
                <Input placeholder="Whiskers" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="breed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("pet.breed")}</FormLabel>
              <FormControl>
                <Input placeholder="Persian" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("pet.age")}</FormLabel>
                <FormControl>
                  <Input type="number" min="0" placeholder="3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("pet.weight")}</FormLabel>
                <FormControl>
                  <Input type="number" min="0" placeholder="4" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="dietaryPreferences"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>{t("pet.dietary")}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="regular" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {t("pet.dietary.options.regular")}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="grain-free" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {t("pet.dietary.options.grain")}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="sensitive-stomach" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {t("pet.dietary.options.sensitive")}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="weight-management" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {t("pet.dietary.options.weight")}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="foodType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("pet.food.type")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select food type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="dry">{t("pet.food.type.options.dry")}</SelectItem>
                  <SelectItem value="wet">{t("pet.food.type.options.wet")}</SelectItem>
                  <SelectItem value="mixed">{t("pet.food.type.options.mixed")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary-dark py-6"
          disabled={createPetMutation.isPending}
        >
          {createPetMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Pet Profile...
            </>
          ) : (
            t("pet.continue")
          )}
        </Button>
      </form>
    </Form>
  );
}
