import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PetProfileForm from "@/components/pet-profile-form";
import { useQuery } from "@tanstack/react-query";
import { Pet } from "@shared/schema";

export default function PetProfilePage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  
  // Fetch any existing pets for the user
  const { data: pets = [] } = useQuery<Pet[]>({
    queryKey: ["/api/pets"],
    enabled: !!user,
  });
  
  // If the user already has pets, redirect to the subscription page
  useEffect(() => {
    if (pets.length > 0) {
      setLocation("/subscription");
    }
  }, [pets, setLocation]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="font-heading font-bold text-3xl mb-2">{t("pet.profile.title")}</h1>
            <p className="text-gray-600">{t("pet.profile.subtitle")}</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <PetProfileForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
