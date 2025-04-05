import { useLanguage } from '@/hooks/use-language';

const HowItWorks = () => {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="py-8 sm:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#1A2421] sm:text-4xl font-heading">
            {t('howItWorks.title')}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-[#52524E]">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        <div className="mt-16">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#4A7C59] text-white">
                <span className="text-xl font-bold">1</span>
              </div>
              <div className="ml-16">
                <h3 className="text-xl font-medium text-[#1A2421] font-heading">
                  {t('howItWorks.step1.title')}
                </h3>
                <p className="mt-2 text-base text-[#52524E]">
                  {t('howItWorks.step1.description')}
                </p>
              </div>
            </div>

            <div className="relative mt-10 lg:mt-0">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#4A7C59] text-white">
                <span className="text-xl font-bold">2</span>
              </div>
              <div className="ml-16">
                <h3 className="text-xl font-medium text-[#1A2421] font-heading">
                  {t('howItWorks.step2.title')}
                </h3>
                <p className="mt-2 text-base text-[#52524E]">
                  {t('howItWorks.step2.description')}
                </p>
              </div>
            </div>

            <div className="relative mt-10 lg:mt-0">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#4A7C59] text-white">
                <span className="text-xl font-bold">3</span>
              </div>
              <div className="ml-16">
                <h3 className="text-xl font-medium text-[#1A2421] font-heading">
                  {t('howItWorks.step3.title')}
                </h3>
                <p className="mt-2 text-base text-[#52524E]">
                  {t('howItWorks.step3.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
