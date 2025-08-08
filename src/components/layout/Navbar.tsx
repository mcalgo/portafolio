"use client";

import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, Mail, Sun, Moon, Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const navigation = [
  { key: "nav.home", href: "#home" },
  { key: "nav.about", href: "#about" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.skills", href: "#skills" },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/mcalgo", icon: Github },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/juan-sebastian-arevalo-gomez-631469160/", icon: Linkedin },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { resolvedTheme, toggleTheme, mounted } = useTheme();
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (e: MouseEvent) => {
      // Solo cerrar si el click no es en el botón de idioma o en el dropdown
      const target = e.target as HTMLElement;
      if (!target.closest('[data-language-selector]')) {
        setIsLanguageOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex-shrink-0"
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="text-xl font-bold text-foreground hover:text-primary transition-colors"
            >
              {"<SA />"}
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.key}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors relative group"
                >
                  {t(item.key)}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Social Links & Controls - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-primary transition-colors p-2 hover:scale-110 transform duration-200"
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
            
            {/* Language Selector */}
            <div className="relative" data-language-selector>
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsLanguageOpen(!isLanguageOpen);
                }}
                className="text-muted-foreground hover:text-primary transition-colors p-2 hover:scale-110 transform duration-200 flex items-center gap-1"
                aria-label={t('language.selector')}
                data-language-selector
              >
                <Globe size={18} />
                <span className="text-xs font-medium uppercase">
                  {language}
                </span>
                <ChevronDown 
                  size={14} 
                  className={`transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`} 
                />
              </motion.button>
              
              {/* Language Dropdown */}
              <AnimatePresence>
                {isLanguageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 bg-background/95 backdrop-blur-md border-2 border-primary/50 rounded-lg shadow-xl py-2 z-50"
                    onClick={(e) => e.stopPropagation()}
                    data-language-selector
                  >
                    <button
                      onClick={() => {
                        setLanguage('es');
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center gap-2 ${
                        language === 'es' 
                          ? 'bg-primary/10 text-primary' 
                          : 'text-foreground hover:bg-secondary'
                      }`}
                    >
                      <span className="text-base">🇪🇸</span>
                      {t('language.spanish')}
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('en');
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center gap-2 ${
                        language === 'en' 
                          ? 'bg-primary/10 text-primary' 
                          : 'text-foreground hover:bg-secondary'
                      }`}
                    >
                      <span className="text-base">🇺🇸</span>
                      {t('language.english')}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            {mounted && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-primary transition-colors p-2 hover:scale-110 transform duration-200"
                aria-label={`${t('theme.toggle')} ${resolvedTheme === 'light' ? t('theme.dark') : t('theme.light')}`}
              >
                {resolvedTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </motion.button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary focus:outline-none focus:text-primary transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="text-foreground hover:text-primary block px-3 py-2 text-base font-medium transition-colors"
                >
                  {t(item.key)}
                </a>
              ))}
              
              {/* Mobile Language & Theme Controls */}
              <div className="border-t border-border pt-4 mt-4">
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm font-medium text-foreground">
                    {language === 'es' ? 'Idioma' : 'Language'}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setLanguage('es')}
                      className={`px-2 py-1 text-xs rounded-md transition-colors flex items-center gap-1 ${
                        language === 'es' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
                      }`}
                    >
                      <span>🇪🇸</span>
                      ES
                    </button>
                    <button
                      onClick={() => setLanguage('en')}
                      className={`px-2 py-1 text-xs rounded-md transition-colors flex items-center gap-1 ${
                        language === 'en' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
                      }`}
                    >
                      <span>🇺🇸</span>
                      EN
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm font-medium text-foreground">
                    {language === 'es' ? 'Tema' : 'Theme'}
                  </span>
                  {mounted && (
                    <button
                      onClick={toggleTheme}
                      className="text-muted-foreground hover:text-primary transition-colors p-2"
                      aria-label={`${t('theme.toggle')} ${resolvedTheme === 'light' ? t('theme.dark') : t('theme.light')}`}
                    >
                      {resolvedTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                  )}
                </div>
              </div>
              
              {/* Mobile Social Links */}
              <div className="flex items-center justify-center space-x-4 px-3 py-4 border-t border-border">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
