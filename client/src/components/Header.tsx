import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/hooks/use-language';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Menu, X } from 'lucide-react';
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignupForm';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, logoutMutation } = useAuth();
  const [location] = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <svg 
                className="h-10 w-10 text-primary"
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
              <span className={`ml-2 text-xl font-heading font-bold text-primary ${language === 'ar' ? 'mr-2 ml-0' : ''}`}>
                {language === 'en' ? 'Moraqqat' : 'مرقط'}
              </span>
            </Link>
            <nav className={`hidden sm:ml-6 sm:flex sm:space-x-8 ${language === 'ar' ? 'sm:space-x-reverse sm:mr-6 sm:ml-0' : ''}`}>
              <a href="#how-it-works" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-neutral-dark hover:text-primary border-b-2 border-transparent hover:border-primary">
                {t('header.howItWorks')}
              </a>
              <a href="#pricing" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-neutral-dark hover:text-primary border-b-2 border-transparent hover:border-primary">
                {t('header.pricing')}
              </a>
              <a href="#faq" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-neutral-dark hover:text-primary border-b-2 border-transparent hover:border-primary">
                {t('header.faq')}
              </a>
            </nav>
          </div>
          <div className="flex items-center">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} 
              className="p-2 rounded-full text-neutral-medium hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <span className="sr-only">Toggle Language</span>
              <span className="text-sm font-medium">
                {language === 'en' ? 'العربية' : 'English'}
              </span>
            </button>

            <div className="flex items-center sm:ml-6">
              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="outline" className="mx-2">
                      Dashboard
                    </Button>
                  </Link>
                  <Button onClick={handleLogout}>
                    {t('dashboard.logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="mx-2"
                      >
                        {t('header.login')}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <LoginForm onSuccess={() => setShowLoginModal(false)} />
                    </DialogContent>
                  </Dialog>

                  <Dialog open={showSignupModal} onOpenChange={setShowSignupModal}>
                    <DialogTrigger asChild>
                      <Button>
                        {t('header.signup')}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <SignupForm onSuccess={() => setShowSignupModal(false)} />
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>

            <div className="-mr-2 ml-2 flex items-center sm:hidden">
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)} 
                className="inline-flex items-center justify-center p-2 rounded-md text-neutral-dark hover:text-primary hover:bg-neutral-lightest focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              >
                <span className="sr-only">Open main menu</span>
                {showMobileMenu ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a 
              href="#how-it-works" 
              className="block pl-3 pr-4 py-4 border-l-4 border-transparent text-lg font-medium text-neutral-dark hover:bg-neutral-lightest hover:border-primary hover:text-primary active:bg-neutral-light"
              onClick={() => setShowMobileMenu(false)}
            >
              {t('header.howItWorks')}
            </a>
            <a 
              href="#pricing" 
              className="block pl-3 pr-4 py-4 border-l-4 border-transparent text-lg font-medium text-neutral-dark hover:bg-neutral-lightest hover:border-primary hover:text-primary active:bg-neutral-light"
              onClick={() => setShowMobileMenu(false)}
            >
              {t('header.pricing')}
            </a>
            <a 
              href="#faq" 
              className="block pl-3 pr-4 py-4 border-l-4 border-transparent text-lg font-medium text-neutral-dark hover:bg-neutral-lightest hover:border-primary hover:text-primary active:bg-neutral-light"
              onClick={() => setShowMobileMenu(false)}
            >
              {t('header.faq')}
            </a>

            <div className={`flex space-x-2 pl-3 pr-4 py-2 ${language === 'ar' ? 'space-x-reverse' : ''}`}>
              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button 
                      className="flex-1" 
                      variant="outline"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      handleLogout();
                      setShowMobileMenu(false);
                    }}
                  >
                    {t('dashboard.logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setShowLoginModal(true);
                      setShowMobileMenu(false);
                    }}
                  >
                    {t('header.login')}
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      setShowSignupModal(true);
                      setShowMobileMenu(false);
                    }}
                  >
                    {t('header.signup')}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;