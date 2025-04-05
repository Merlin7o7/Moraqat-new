import { useLanguage } from "@/hooks/use-language";
import { AddOn } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface AddOnsSelectionProps {
  addOns: AddOn[];
  selectedAddOns: AddOn[];
  onSelectAddOns: (addOns: AddOn[]) => void;
}

export default function AddOnsSelection({
  addOns,
  selectedAddOns,
  onSelectAddOns,
}: AddOnsSelectionProps) {
  const { t, rtl } = useLanguage();
  
  const handleToggleAddOn = (addOn: AddOn) => {
    const isSelected = selectedAddOns.some(selected => selected.id === addOn.id);
    
    if (isSelected) {
      onSelectAddOns(selectedAddOns.filter(selected => selected.id !== addOn.id));
    } else {
      onSelectAddOns([...selectedAddOns, addOn]);
    }
  };
  
  const isSelected = (addOn: AddOn) => {
    return selectedAddOns.some(selected => selected.id === addOn.id);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">{t("addons.title")}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addOns.map(addOn => (
          <Card 
            key={addOn.id}
            className={`cursor-pointer transition-colors ${isSelected(addOn) ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
            onClick={() => handleToggleAddOn(addOn)}
          >
            <CardContent className="p-4">
              <div className="flex items-start">
                <Checkbox
                  id={`addon-${addOn.id}`}
                  checked={isSelected(addOn)}
                  onCheckedChange={() => handleToggleAddOn(addOn)}
                  className={`mt-1 ${rtl ? 'ml-3' : 'mr-3'}`}
                />
                <div>
                  <Label 
                    htmlFor={`addon-${addOn.id}`}
                    className="font-medium cursor-pointer"
                  >
                    {addOn.name}
                    <span className="text-sm font-normal text-gray-600 ml-2">
                      +{(addOn.price / 100).toFixed(2)} SAR/month
                    </span>
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    {addOn.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {addOns.length === 0 && (
        <div className="text-center p-8 bg-gray-50 rounded-lg border">
          <p className="text-gray-500">No add-ons available at this time.</p>
        </div>
      )}
    </div>
  );
}
