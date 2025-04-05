import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqAccordion() {
  const { t } = useLanguage();
  
  const faqItems = [
    {
      question: t("faq.q1"),
      answer: t("faq.a1"),
    },
    {
      question: t("faq.q2"),
      answer: t("faq.a2"),
    },
    {
      question: t("faq.q3"),
      answer: t("faq.a3"),
    },
    {
      question: t("faq.q4"),
      answer: t("faq.a4"),
    },
    {
      question: t("faq.q5"),
      answer: t("faq.a5"),
    },
  ];

  return (
    <Accordion type="single" collapsible className="space-y-6">
      {faqItems.map((item, index) => (
        <AccordionItem 
          key={index} 
          value={`item-${index}`}
          className="border border-gray-200 rounded-xl overflow-hidden px-0"
        >
          <AccordionTrigger className="p-6 text-left font-medium hover:bg-gray-50 text-gray-900">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 text-gray-600">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
