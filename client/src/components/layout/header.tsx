import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
// Logo is stored in the public directory

export default function Header() {
  const { t, language, setLanguage, rtl } = useLanguage();
  const { user, logoutMutation } = useAuth();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="sticky top-0 z-50 shadow-sm" style={{ backgroundColor: 'var(--color-bg-main)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Language and support */}
        <div className="flex justify-end border-b border-gray-100 py-1 px-4 text-sm">
          <button 
            onClick={toggleLanguage}
            className="flex items-center text-sm text-[#045b46] hover:text-[#ffb7b8] transition mr-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            {t("language.toggle")}
          </button>
          <a href="https://wa.me/966000000000" className="flex items-center text-sm text-[#045b46] hover:text-[#f86c2f] transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t("need.help")}
          </a>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img src="/moracat-logo.png" alt="Moracat" className="h-16 w-auto" />
            </Link>
          </div>

          {/* Nav buttons - only show on homepage */}
          {location === "/" && (
            <nav className="hidden md:flex space-x-8">
              <a href="#how-it-works" className="font-medium text-[#045b46] hover:text-[#f86c2f] transition">{t("nav.how.it.works")}</a>
              <a href="#pricing" className="font-medium text-[#045b46] hover:text-[#f86c2f] transition">{t("nav.pricing")}</a>
              <a href="#about" className="font-medium text-[#045b46] hover:text-[#f86c2f] transition">{t("nav.about")}</a>
            </nav>
          )}

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" className="hidden md:block">Dashboard</Button>
                </Link>
                <Button 
                  variant="default" 
                  className="brand-button"
                  onClick={handleLogout}
                >
                  {logoutMutation.isPending ? "Logging out..." : "Logout"}
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth">
                  <Button variant="ghost" className="hidden md:block">{t("login")}</Button>
                </Link>
                <Link href="/auth">
                  <Button className="brand-button">{t("join.waitlist")}</Button>
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden text-neutral-dark"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu (hidden by default) */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 py-3 space-y-3 border-t border-gray-100">
            {location === "/" && (
              <>
                <a href="#how-it-works" className="block font-medium text-[#045b46] hover:text-[#f86c2f]">{t("nav.how.it.works")}</a>
                <a href="#pricing" className="block font-medium text-[#045b46] hover:text-[#f86c2f]">{t("nav.pricing")}</a>
                <a href="#about" className="block font-medium text-[#045b46] hover:text-[#f86c2f]">{t("nav.about")}</a>
              </>
            )}

            {user ? (
              <>
                <Link href="/dashboard" className="block font-medium text-[#045b46] hover:text-[#f86c2f]">Dashboard</Link>
                <Link href="/pet-profile" className="block font-medium text-[#045b46] hover:text-[#f86c2f]">Pet Profile</Link>
                <Link href="/subscription" className="block font-medium text-[#045b46] hover:text-[#f86c2f]">Subscription</Link>
                {user.isAdmin && (
                  <Link href="/admin" className="block font-medium text-[#045b46] hover:text-[#f86c2f]">Admin</Link>
                )}
                <Separator />
                <a href="#" className="block font-medium text-[#045b46] hover:text-[#f86c2f]" onClick={handleLogout}>
                  {t("dashboard.logout")}
                </a>
              </>
            ) : (
              <Link href="/auth" className="block font-medium text-[#045b46] hover:text-[#f86c2f]">{t("login")}</Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}