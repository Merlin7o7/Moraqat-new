import { useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

const FAQ = () => {
  const { t } = useLanguage();
  
  const faqs = [
    {
      question: t('faq.q1'),
      answer: t('faq.a1'),
    },
    {
      question: t('faq.q2'),
      answer: t('faq.a2'),
    },
    {
      question: t('faq.q3'),
      answer: t('faq.a3'),
    },
    {
      question: t('faq.q4'),
      answer: t('faq.a4'),
    },
    {
      question: t('faq.q5'),
      answer: t('faq.a5'),
    },
  ];

  return (
    <section id="faq" className="py-8 sm:py-16 bg-[#FAFAF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#1A2421] sm:text-4xl font-heading">
            {t('faq.title')}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-[#52524E]">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-3 text-left rounded-lg focus:outline-none hover:bg-[#FAFAF9] text-[#1A2421] font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 text-[#52524E]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
