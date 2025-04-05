import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SubscriptionPlan, AddOn } from '@shared/schema';

interface SubscriptionContextType {
  selectedPlan: SubscriptionPlan;
  setSelectedPlan: (plan: SubscriptionPlan) => void;
  addons: AddOn[];
  toggleAddon: (addon: AddOn) => void;
  calculatePrice: () => number;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

// Pricing constants
const PLAN_PRICES = {
  basic: 210,
  premium: 280,
  vip: 350,
};

const ADDON_PRICES = {
  litter: 75,
  toys: 50,
  treats: 35,
};

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>('premium');
  const [addons, setAddons] = useState<AddOn[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const toggleAddon = (addon: AddOn) => {
    setAddons(prevAddons => {
      if (prevAddons.includes(addon)) {
        return prevAddons.filter(a => a !== addon);
      } else {
        return [...prevAddons, addon];
      }
    });
  };

  const calculatePrice = (): number => {
    const planPrice = PLAN_PRICES[selectedPlan];
    const addonPrice = addons.reduce((total, addon) => total + ADDON_PRICES[addon], 0);
    return planPrice + addonPrice;
  };

  return (
    <SubscriptionContext.Provider 
      value={{ 
        selectedPlan, 
        setSelectedPlan, 
        addons, 
        toggleAddon, 
        calculatePrice,
        currentStep,
        setCurrentStep
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
