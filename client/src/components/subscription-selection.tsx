import { useLanguage } from "@/hooks/use-language";
import { Pet, SubscriptionPlan } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

interface SubscriptionSelectionProps {
  pets: Pet[];
  plans: SubscriptionPlan[];
  selectedPet: Pet | null;
  selectedPlan: SubscriptionPlan | null;
  onSelectPet: (pet: Pet) => void;
  onSelectPlan: (plan: SubscriptionPlan) => void;
}

export default function SubscriptionSelection({
  pets,
  plans,
  selectedPet,
  selectedPlan,
  onSelectPet,
  onSelectPlan,
}: SubscriptionSelectionProps) {
  const { t, rtl } = useLanguage();
  
  return (
    <div className="space-y-10">
      {/* Pet Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Your Pet</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pets.map(pet => (
            <Card 
              key={pet.id}
              className={`cursor-pointer transition-colors ${selectedPet?.id === pet.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
              onClick={() => onSelectPet(pet)}
            >
              <CardContent className="p-4 flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-lg font-bold mr-3">
                  {pet.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium">{pet.name}</h4>
                  <p className="text-sm text-gray-600">{pet.breed}, {pet.age} years</p>
                </div>
                {selectedPet?.id === pet.id && (
                  <Check className="ml-auto text-primary h-5 w-5" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Plan Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Choose Your Subscription Plan</h3>
        
        <RadioGroup
          value={selectedPlan ? selectedPlan.id.toString() : undefined}
          onValueChange={(value) => {
            const plan = plans.find(p => p.id === parseInt(value));
            if (plan) onSelectPlan(plan);
          }}
        >
          <div className="grid grid-cols-1 gap-4">
            {plans.map(plan => (
              <div
                key={plan.id}
                className={`border rounded-xl overflow-hidden transition-colors cursor-pointer ${selectedPlan?.id === plan.id ? 'border-primary' : 'border-gray-200'}`}
                onClick={() => onSelectPlan(plan)}
              >
                <div className={`p-4 ${selectedPlan?.id === plan.id ? 'bg-primary/5' : 'bg-white hover:bg-gray-50'}`}>
                  <div className="flex items-center">
                    <RadioGroupItem 
                      value={plan.id.toString()} 
                      id={`plan-${plan.id}`}
                      className="mr-3"
                    />
                    <div>
                      <Label htmlFor={`plan-${plan.id}`} className="font-semibold text-lg">
                        {plan.name}
                      </Label>
                      <p className="text-gray-600 text-sm">{plan.description}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-xl font-bold">
                        {(plan.monthlyPrice / 100).toFixed(2)} <span className="text-sm font-normal">SAR/month</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pl-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start text-sm">
                          <Check className={`h-4 w-4 text-primary ${rtl ? 'ml-2' : 'mr-2'} mt-1 flex-shrink-0`} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
