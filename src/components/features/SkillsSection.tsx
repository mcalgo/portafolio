"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { skillsData, SkillData } from "@/data/skills-data";

const categories = [
  { id: "all", key: "skills.category.all", icon: "🚀" },
  { id: "backend", key: "skills.category.backend", icon: "⚙️" },
  { id: "frontend", key: "skills.category.frontend", icon: "📱" },
  { id: "database", key: "skills.category.database", icon: "🗄️" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const sectionRef = useRef(null);
  const { t } = useLanguage();
  
  // Usar directamente los datos de skills
  const skills = skillsData;

  console.log('SkillsSection: Skills count:', skills?.length || 0);
  console.log('SkillsSection: First 3 skills:', skills?.slice(0, 3)?.map(skill => ({ 
    name: skill.name, 
    experience: skill.experience 
  })) || []);

  // Filtrar skills 
  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  // Función para obtener la descripción de cada habilidad usando traducciones
  const getSkillDescription = (skillName: string) => {
    const key = `skills.desc.${skillName.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    const translation = t(key);
    // Si la traducción no existe, devolver una descripción genérica
    return translation !== key ? translation : t('skills.desc.default');
  };

  // Componente individual para cada habilidad que maneja su propia animación
  const SkillCard = ({ skill }: { skill: SkillData }) => {
    const cardRef = useRef(null);
    const isCardInView = useInView(cardRef, { once: true, amount: 0.5 });

    return (
      <motion.div
        ref={cardRef}
        variants={itemVariants}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="text-3xl font-mono">{skill.icon || '💼'}</div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">
              {skill.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {getSkillDescription(skill.name)}
            </p>
          </div>
        </div>

        {/* Skill Level Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Competencia</span>
            <span className="text-sm font-medium text-foreground">{skill.level}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={isCardInView ? { width: `${skill.level}%` } : { width: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className={`h-2 rounded-full bg-gradient-to-r from-primary to-primary/80`}
            />
          </div>
        </div>

        {/* Indicador de experiencia */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {skill.experience || 2} {t('skills.experience.years')}
          </span>
          {(skill.level >= 85) && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              {t('skills.expert.label')}
            </span>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="py-20 bg-background" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t('skills.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:scale-105"
              )}
            >
              <span>{category.icon}</span>
              {t(category.key)}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory} // Key para forzar re-render cuando cambia categoria
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </motion.div>

        {/* Specialization Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              🚀 {t('skills.specialization')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-background/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">{t('skills.integration')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('skills.integration.desc')}
                </p>
              </div>
              <div className="bg-background/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">{t('skills.apis')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('skills.apis.desc')}
                </p>
              </div>
              <div className="bg-background/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">{t('skills.framework')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('skills.framework.desc')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
