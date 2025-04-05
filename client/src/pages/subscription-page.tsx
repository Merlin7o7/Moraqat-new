import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import SubscriptionSelection from "@/components/subscription-selection";
import AddOnsSelection from "@/components/add-ons-selection";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Pet, SubscriptionPlan, AddOn, InsertSubscription } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function SubscriptionPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  const [activeTab, setActiveTab] = useState("subscription");
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  
  // Calculate total price
  const totalPrice = selectedPlan ? 
    selectedPlan.monthlyPrice + selectedAddOns.reduce((sum, addon) => sum + addon.price, 0) 
    : 0;
  
  // Fetch user's pets
  const { data: pets = [] } = useQuery<Pet[]>({
    queryKey: ["/api/pets"],
    enabled: !!user,
  });
  
  // Fetch subscription plans
  const { data: plans = [] } = useQuery<SubscriptionPlan[]>({
    queryKey: ["/api/subscription-plans"],
  });
  
  // Fetch add-ons
  const { data: addOns = [] } = useQuery<AddOn[]>({
    queryKey: ["/api/add-ons"],
  });
  
  const createSubscriptionMutation = useMutation({
    mutationFn: async (data: InsertSubscription) => {
      const res = await apiRequest("POST", "/api/subscriptions", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/subscriptions"] });
      toast({
        title: "Subscription created",
        description: "Your subscription has been successfully created!",
      });
      setLocation("/dashboard");
    },
    onError: (error: Error) => {
      toast({
        title: "Error creating subscription",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  const handleContinueToAddOns = () => {
    if (!selectedPlan || !selectedPet) {
      toast({
        title: "Selection required",
        description: "Please select a pet and subscription plan to continue.",
        variant: "destructive",
      });
      return;
    }
    setActiveTab("addons");
  };
  
  const handleCompleteSubscription = () => {
    if (!selectedPlan || !selectedPet) return;
    
    const subscription: InsertSubscription = {
      userId: user?.id || 0,
      petId: selectedPet.id,
      planId: selectedPlan.id,
      status: "active",
      startDate: new Date(),
      addOns: selectedAddOns.map(addon => ({ 
        id: addon.id, 
        name: addon.name, 
        price: addon.price 
      })),
      totalPrice,
    };
    
    createSubscriptionMutation.mutate(subscription);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="border-0 shadow-md overflow-hidden">
            <CardHeader className="bg-primary text-white">
              <CardTitle className="text-2xl">{t("how.step2.title")}</CardTitle>
              <CardDescription className="text-white text-opacity-90">
                {t("how.step2.desc")}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full rounded-none grid grid-cols-2">
                  <TabsTrigger value="subscription" className="rounded-none data-[state=active]:bg-primary/10">
                    Select Plan
                  </TabsTrigger>
                  <TabsTrigger 
                    value="addons" 
                    className="rounded-none data-[state=active]:bg-primary/10"
                    disabled={!selectedPlan || !selectedPet}
                  >
                    Choose Add-ons
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="subscription" className="p-6">
                  <SubscriptionSelection 
                    pets={pets} 
                    plans={plans} 
                    selectedPet={selectedPet}
                    selectedPlan={selectedPlan}
                    onSelectPet={setSelectedPet}
                    onSelectPlan={setSelectedPlan}
                  />
                  
                  <div className="mt-8 flex justify-end">
                    <Button 
                      onClick={handleContinueToAddOns}
                      className="bg-primary hover:bg-primary-dark"
                      disabled={!selectedPlan || !selectedPet}
                    >
                      Continue to Add-ons
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="addons" className="p-6">
                  <AddOnsSelection 
                    addOns={addOns}
                    selectedAddOns={selectedAddOns}
                    onSelectAddOns={setSelectedAddOns}
                  />
                  
                  {/* Subscription Summary */}
                  <div className="mt-10 p-6 bg-gray-50 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-4">Subscription Summary</h3>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between">
                        <span>Pet:</span>
                        <span className="font-medium">{selectedPet?.name}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Plan:</span>
                        <span className="font-medium">{selectedPlan?.name}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Base price:</span>
                        <span>{selectedPlan ? (selectedPlan.monthlyPrice / 100).toFixed(2) : 0} SAR/month</span>
                      </div>
                      
                      {selectedAddOns.length > 0 && (
                        <div className="border-t pt-2 mt-2">
                          <div className="font-medium mb-1">Add-ons:</div>
                          {selectedAddOns.map(addon => (
                            <div key={addon.id} className="flex justify-between text-sm">
                              <span>{addon.name}</span>
                              <span>{(addon.price / 100).toFixed(2)} SAR/month</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="border-t pt-2 mt-2 font-bold flex justify-between">
                        <span>Total monthly price:</span>
                        <span>{(totalPrice / 100).toFixed(2)} SAR</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="outline"
                        onClick={() => setActiveTab("subscription")}
                      >
                        Back to Plans
                      </Button>
                      
                      <Button 
                        className="bg-primary hover:bg-primary-dark"
                        onClick={handleCompleteSubscription}
                        disabled={createSubscriptionMutation.isPending}
                      >
                        {createSubscriptionMutation.isPending ? "Processing..." : "Complete Subscription"}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
