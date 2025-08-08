"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const socialLinks = [
  { 
    name: "GitHub", 
    href: "https://github.com/mcalgo", 
    icon: Github,
    color: "hover:text-gray-900 dark:hover:text-white"
  },
  { 
    name: "LinkedIn", 
    href: "https://www.linkedin.com/in/juan-sebastian-arevalo-gomez-631469160/", 
    icon: Linkedin,
    color: "hover:text-blue-600"
  },
  { 
    name: "Email", 
    href: "mailto:tu-email@ejemplo.com", 
    icon: Mail,
    color: "hover:text-primary"
  },
];

export default function Footer() {
  const { language, setLanguage, t } = useLanguage();
  
  // Función para obtener el año actual dinámicamente
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  const quickLinks = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.projects', href: '#projects' },
    { key: 'nav.skills', href: '#skills' },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información Personal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-foreground">
              Sebastián Arévalo
            </h3>
            <p className="text-muted-foreground text-sm">
              {t('footer.description')}
            </p>
          </motion.div>

          {/* Enlaces Rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-foreground">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((item, index) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Redes Sociales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-foreground">
              {t('footer.connect')}
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`text-muted-foreground transition-colors p-2 rounded-lg hover:bg-secondary ${link.color}`}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
            
            {/* Language Selector */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe size={16} />
                <span>{language === 'es' ? 'Idioma' : 'Language'}:</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setLanguage('es')}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                    language === 'es' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
                  }`}
                >
                  {t('language.spanish')}
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                    language === 'en' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
                  }`}
                >
                  {t('language.english')}
                </button>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground">
              {t('footer.opportunities')}
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright con año dinámico */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center space-x-2 text-sm text-muted-foreground"
            >
              <span>© {getCurrentYear()} Sebastián Arévalo.</span>
              <span>{t('footer.rights')}</span>
            </motion.div>

            {/* Hecho con amor */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center space-x-2 text-sm text-muted-foreground"
            >
              <span>{t('footer.madeWith')}</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatType: "reverse" 
                }}
              >
                <Heart size={16} className="text-red-500 fill-current" />
              </motion.div>
              <span>y</span>
              <span className="font-mono text-primary">Next.js + TypeScript</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
