"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Code2, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePortfolio } from "@/presentation/hooks/usePortfolio";

export default function ProjectsSection() {
  const { t } = useLanguage();
  const { featuredProjects } = usePortfolio();
  
  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-background border border-border rounded-lg p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {t(`projects.items.${project.id}.title`) || project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {t(`projects.items.${project.id}.description`) || project.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {project.status === 'completed' && (
                    <div className="w-2 h-2 bg-green-500 rounded-full" title="Completado"></div>
                  )}
                  {project.status === 'in-progress' && (
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" title="En progreso"></div>
                  )}
                  {project.featured && (
                    <div title="Proyecto destacado">
                      <Star className="w-4 h-4 text-yellow-500" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Code2 className="w-4 h-4" />
                    <span>{project.category}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs">{project.status}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-muted rounded-md transition-colors"
                      title="Ver en GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-muted rounded-md transition-colors"
                      title="Ver demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/mcalgo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-lg hover:shadow-xl"
            onClick={(e) => {
              // Debug log
              console.log('GitHub button clicked');
              // Verificar que el enlace funcione
              if (!e.defaultPrevented) {
                window.open('https://github.com/mcalgo', '_blank', 'noopener,noreferrer');
              }
            }}
          >
            <Github className="w-5 h-5 mr-2" />
            {t('projects.github.button')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
