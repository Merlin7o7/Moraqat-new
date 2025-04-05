import { useLanguage } from "@/hooks/use-language";
import { SubscriptionPlan } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingCardProps {
  plan: SubscriptionPlan;
  isPopular?: boolean;
  onClick: () => void;
}

export default function PricingCard({ plan, isPopular = false, onClick }: PricingCardProps) {
  const { t, rtl } = useLanguage();
  
  // Format plan name for translation key lookup
  const getPlanKey = () => {
    if (plan.name.includes("Basic")) return "basic";
    if (plan.name.includes("Premium")) return "premium";
    if (plan.name.includes("VIP")) return "vip";
    return "";
  };
  
  const planKey = getPlanKey();
  
  return (
    <div className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden ${isPopular ? 'transform scale-105 shadow-lg relative z-10' : ''}`}>
      {isPopular && (
        <div className="absolute top-0 inset-x-0 bg-primary text-white text-center py-2 font-medium text-sm">
          {t("pricing.premium.tag")}
        </div>
      )}
      <div className={`p-8 ${isPopular ? 'pt-12' : ''}`}>
        <h3 className="font-heading font-bold text-2xl mb-2">{t(`pricing.${planKey}.title`)}</h3>
        <p className="text-gray-600 mb-6">{t(`pricing.${planKey}.desc`)}</p>
        <div className="mb-6">
          <span className="font-heading font-bold text-4xl">{t(`pricing.${planKey}.price`)}</span>
          <span className="text-gray-500">{t("pricing.per.month")}</span>
        </div>
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className={`flex-shrink-0 ${rtl ? 'ml-2' : 'mr-2'}`}>
                <Check className="h-5 w-5 text-primary" />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-8 pb-8">
        <Button
          variant={isPopular ? "default" : "outline"}
          className={`w-full ${isPopular ? 'bg-primary hover:bg-primary-dark text-white' : 'border-2 border-primary hover:bg-primary hover:text-white text-primary'} font-medium rounded-lg py-3 transition duration-300`}
          onClick={onClick}
        >
          {t("pricing.select")} {planKey.charAt(0).toUpperCase() + planKey.slice(1)}
        </Button>
      </div>
    </div>
  );
}
