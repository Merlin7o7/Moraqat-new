import { useLanguage } from '@/hooks/use-language';
import { Link } from 'wouter';

const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-[#1A2421]">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center">
              <svg 
                className="h-10 w-10 text-white"
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50 0C22.4 0 0 22.4 0 50C0 77.6 22.4 100 50 100C77.6 100 100 77.6 100 50C100 22.4 77.6 0 50 0ZM30 75C25 75 20 70 20 65C20 60 25 55 30 55C35 55 40 60 40 65C40 70 35 75 30 75ZM37.5 42.5C32.5 42.5 27.5 37.5 27.5 32.5C27.5 27.5 32.5 22.5 37.5 22.5C42.5 22.5 47.5 27.5 47.5 32.5C47.5 37.5 42.5 42.5 37.5 42.5ZM70 75C65 75 60 70 60 65C60 60 65 55 70 55C75 55 80 60 80 65C80 70 75 75 70 75ZM70 45C65 45 60 40 60 35C60 30 65 25 70 25C75 25 80 30 80 35C80 40 75 45 70 45Z"
                  fill="currentColor"
                />
              </svg>
              <span className={`ml-2 text-xl font-heading font-bold text-white ${language === 'ar' ? 'mr-2 ml-0' : ''}`}>
                {language === 'en' ? 'Moraqqat' : 'مرقط'}
              </span>
            </div>
            <p className="mt-4 text-base text-[#E5E5E3]">
              {t('footer.description')}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#E5E5E3] tracking-wider uppercase">
              {t('footer.company')}
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-[#A3A3A1] hover:text-white">
                  {t('footer.aboutUs')}
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-[#A3A3A1] hover:text-white">
                  {t('footer.careers')}
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-[#A3A3A1] hover:text-white">
                  {t('footer.contact')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#E5E5E3] tracking-wider uppercase">
              {t('footer.legal')}
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-[#A3A3A1] hover:text-white">
                  {t('footer.privacyPolicy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-[#A3A3A1] hover:text-white">
                  {t('footer.termsOfService')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-[#52524E] pt-8">
          <p className="text-base text-[#A3A3A1] text-center">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
