import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Heart, Sun, Moon, Menu, X, Gift, Activity } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

export default function Header({ darkMode, toggleTheme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Scroll kontrolü
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { href: '/', label: 'Burç Uyumları', icon: Heart },
    { href: '/erkek-hediyeleri', label: 'Erkek Hediyeleri', icon: Gift },
    { href: '/kadin-hediyeleri', label: 'Kadın Hediyeleri', icon: Gift },
    { href: '/aktiviteler', label: '100 Aktivite', icon: Activity },
  ];

  const isActive = (href: string) => router.pathname === href;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? darkMode 
          ? 'bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/80 shadow-xl' 
          : 'bg-white/95 backdrop-blur-xl border-b border-gray-200/80 shadow-xl'
        : darkMode 
          ? 'bg-gray-900/80 backdrop-blur-md border-b border-gray-800/50' 
          : 'bg-white/80 backdrop-blur-md border-b border-gray-200/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-14 md:h-16' : 'h-16 md:h-20'
        }`}>
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Heart className={`transition-all duration-300 group-hover:scale-110 ${
                isScrolled ? 'w-7 h-7' : 'w-8 h-8'
              } ${darkMode ? 'text-pink-400' : 'text-pink-500'}`} />
              <div className="absolute inset-0 bg-pink-500 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
            <span className={`font-black tracking-tight transition-all duration-300 ${
              isScrolled ? 'text-xl' : 'text-2xl'
            } ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <span className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Ruh Eşim
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
                    isScrolled ? 'text-sm' : 'text-base'
                  } ${
                    isActive(item.href)
                      ? darkMode
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-gray-900'
                      : darkMode
                        ? 'text-gray-300 hover:text-white hover:bg-white/10'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`transition-all duration-300 ${isScrolled ? 'w-3 h-3' : 'w-4 h-4'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                darkMode 
                  ? 'bg-white/10 text-yellow-400 hover:bg-white/20' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {darkMode ? (
                <Sun className={`transition-all duration-300 ${isScrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
              ) : (
                <Moon className={`transition-all duration-300 ${isScrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-xl transition-all duration-300 ${
                darkMode 
                  ? 'bg-white/10 text-white hover:bg-white/20' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {mobileMenuOpen ? (
                <X className={`transition-all duration-300 ${isScrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
              ) : (
                <Menu className={`transition-all duration-300 ${isScrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}>
          <nav className="flex flex-col gap-2 pt-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? darkMode
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-gray-900'
                      : darkMode
                        ? 'text-gray-300 hover:text-white hover:bg-white/10'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Scroll Shadow */}
      {isScrolled && (
        <div className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300 ${
          darkMode 
            ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' 
            : 'bg-gradient-to-r from-transparent via-gray-300/50 to-transparent'
        }`} />
      )}
    </header>
  );
}