"use client";

import { motion } from "framer-motion";
import { User, Code, Zap, Target } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const aboutCards = [
  {
    icon: User,
    titleKey: "about.cards.backend.title",
    descriptionKey: "about.cards.backend.description"
  },
  {
    icon: Code,
    titleKey: "about.cards.opensource.title", 
    descriptionKey: "about.cards.opensource.description"
  },
  {
    icon: Zap,
    titleKey: "about.cards.performance.title",
    descriptionKey: "about.cards.performance.description"
  },
  {
    icon: Target,
    titleKey: "about.cards.innovation.title",
    descriptionKey: "about.cards.innovation.description"
  }
];

const languages = [
  { name: "C#", percentage: 40, color: "#512BD4", offset: 0 },
  { name: "Python", percentage: 40, color: "#3776AB", offset: -87.96 },
  { name: "TypeScript", percentage: 20, color: "#3178C6", offset: -175.92 }
];

export default function AboutSection() {
  const { t } = useLanguage();
  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null);
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('about.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {aboutCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t(card.titleKey)}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t(card.descriptionKey)}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-background p-8 rounded-lg shadow-sm border border-border"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t('about.story.title')}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t('about.story.paragraph1')}
              </p>
              <p className="text-muted-foreground mb-6">
                {t('about.story.paragraph2')}
              </p>
              <div className="flex flex-wrap gap-2">
                {["C#", "Python", "PHP", "TypeScript", "JavaScript", "PS1", "Dart"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-center pb-40">
              <div className="relative w-80 h-80">
                {/* Título descriptivo */}
                <div className="text-center mb-6">
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {t('about.languages.title')}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t('about.languages.subtitle')}
                  </p>
                </div>
                
                {/* Gráfico circular animado con lenguajes actuales */}
                <svg 
                  className="w-full h-full transform -rotate-90" 
                  viewBox="0 0 100 100"
                  onMouseLeave={() => setHoveredLanguage(null)}
                >
                  {/* Círculo de fondo */}
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    className="text-muted/20"
                  />
                  
                  {/* Círculos de los lenguajes */}
                  {languages.map((lang, index) => {
                    const strokeDasharray = `${lang.percentage * 2.1991} 219.91`;
                    const isHovered = hoveredLanguage === lang.name;
                    const isAnyHovered = hoveredLanguage !== null;
                    
                    return (
                      <motion.circle
                        key={lang.name}
                        cx="50"
                        cy="50"
                        r="35"
                        fill="none"
                        stroke={lang.color}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={strokeDasharray}
                        initial={{ strokeDashoffset: 219.91 }}
                        whileInView={{ strokeDashoffset: lang.offset }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.2 + index * 0.4 }}
                        className={`drop-shadow-lg cursor-pointer transition-all duration-300 ${
                          isAnyHovered && !isHovered ? 'opacity-30' : 'opacity-100'
                        }`}
                        animate={{
                          strokeWidth: isHovered ? 12 : 8,
                          filter: isHovered 
                            ? `drop-shadow(0 0 12px ${lang.color}80)` 
                            : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
                        }}
                        whileHover={{
                          strokeWidth: 12,
                          filter: `drop-shadow(0 0 12px ${lang.color}80)`
                        }}
                        onMouseEnter={() => setHoveredLanguage(lang.name)}
                      />
                    );
                  })}
                </svg>
                
                {/* Centro del círculo con información */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center bg-background/90 backdrop-blur-sm rounded-full w-28 h-28 flex flex-col items-center justify-center shadow-lg border border-border/50">
                    <motion.div
                      key={hoveredLanguage || 'default'}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {hoveredLanguage ? (
                        <>
                          <div className="text-2xl font-bold mb-1" style={{ color: languages.find(l => l.name === hoveredLanguage)?.color }}>
                            {languages.find(l => l.name === hoveredLanguage)?.percentage}%
                          </div>
                          <div className="text-xs text-muted-foreground font-medium leading-tight">
                            {hoveredLanguage}
                          </div>
                        </>
                      ) : (
                        <>
                          <Code size={24} className="text-primary mb-1" />
                          <div className="text-xs text-muted-foreground font-medium">
                            Pasa el mouse
                          </div>
                        </>
                      )}
                    </motion.div>
                  </div>
                </div>
                
                {/* Leyenda interactiva - Reposicionada */}
                <div className="absolute -bottom-28 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-sm rounded-lg border border-border/50 p-4 shadow-lg">
                  <div className="flex gap-6">
                    {languages.map((lang) => {
                      const isHovered = hoveredLanguage === lang.name;
                      const isAnyHovered = hoveredLanguage !== null;
                      
                      return (
                        <motion.div
                          key={lang.name}
                          className={`flex items-center gap-2 cursor-pointer transition-all duration-300 px-2 py-1 rounded-md ${
                            isHovered ? 'bg-primary/10' : ''
                          } ${isAnyHovered && !isHovered ? 'opacity-40' : 'opacity-100'}`}
                          onMouseEnter={() => setHoveredLanguage(lang.name)}
                          onMouseLeave={() => setHoveredLanguage(null)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.div
                            className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: lang.color }}
                            animate={{
                              scale: isHovered ? 1.3 : 1,
                              boxShadow: isHovered 
                                ? `0 0 16px ${lang.color}60, 0 0 0 2px white` 
                                : '0 1px 3px rgba(0, 0, 0, 0.1), 0 0 0 2px white'
                            }}
                          />
                          <div className="flex flex-col">
                            <span className={`text-sm font-medium transition-colors duration-300 ${
                              isHovered ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {lang.name}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
