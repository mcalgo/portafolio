/**
 * DataAdapter
 * Adaptador para convertir los datos existentes a las nuevas entidades de dominio
 */

import { Project } from '../domain/entities/Project';
import { Skill } from '../domain/entities/Skill';
import { featuredProjects } from '../data/personal-info';
import { skillsData } from '../data/skills-data';

export class DataAdapter {
  /**
   * Convierte los datos de proyectos existentes a entidades Project
   */
  static convertProjectsToEntities(): Project[] {
    return featuredProjects.map(projectData => 
      Project.create(
        projectData.id,
        projectData.title,
        projectData.description,
        projectData.technologies,
        projectData.status,
        projectData.category,
        {
          githubUrl: projectData.githubUrl,
          featured: projectData.featured,
          createdAt: new Date(projectData.createdAt)
        }
      )
    );
  }

  /**
   * Convierte los datos de habilidades existentes a entidades Skill
   */
  static convertSkillsToEntities(): Skill[] {
    if (!skillsData || !Array.isArray(skillsData)) {
      console.log('DataAdapter: No skillsData found, using default skills');
      return this.getDefaultSkills();
    }

    console.log('DataAdapter: Converting', skillsData.length, 'skills to entities');
    
    return skillsData.map(skillData => {      
      return Skill.create(
        skillData.name,
        skillData.level,
        this.mapSkillCategory(skillData.category || 'tools'),
        skillData.experience || 2, // Usar experience del skillData
        {
          icon: skillData.icon,
          featured: skillData.level >= 75
        }
      );
    });
  }

  /**
   * Mapea categorías de habilidades a las nuevas categorías del dominio
   */
  private static mapSkillCategory(oldCategory: string): string {
    const categoryMap: Record<string, string> = {
      'Backend & APIs': 'backend',
      'Frontend & Mobile': 'frontend',
      'Bases de Datos': 'database',
      'Herramientas & DevOps': 'tools',
      'backend': 'backend',
      'frontend': 'frontend',
      'mobile': 'mobile',
      'database': 'database',
      'devops': 'devops',
      'tools': 'tools',
      'framework': 'framework',
      'language': 'language'
    };

    return categoryMap[oldCategory] || 'tools';
  }

  /**
   * Proporciona habilidades por defecto si no existen datos
   */
  private static getDefaultSkills(): Skill[] {
    const defaultSkillsData = [
      // Backend & APIs
      { name: 'C#', level: 95, category: 'backend', experience: 7, icon: '🔷' },
      { name: '.NET Core', level: 90, category: 'backend', experience: 6, icon: '⚡' },
      { name: 'ASP.NET', level: 95, category: 'backend', experience: 7, icon: '🌐' },
      { name: 'Python', level: 90, category: 'backend', experience: 3, icon: '🐍' },
      { name: 'FastAPI', level: 75, category: 'backend', experience: 2, icon: '⚡' },
      { name: 'Flask', level: 80, category: 'backend', experience: 3, icon: '🔥' },
      { name: 'Orionis Framework', level: 95, category: 'backend', experience: 1, icon: '🏗️' },
      { name: 'Background Workers', level: 90, category: 'backend', experience: 6, icon: '⚡' },
      { name: 'Python Daemons', level: 85, category: 'backend', experience: 2, icon: '�' },
      
      // Frontend & Mobile
      { name: 'TypeScript', level: 70, category: 'frontend', experience: 4, icon: '💙' },
      { name: 'JavaScript', level: 70, category: 'frontend', experience: 4, icon: '💛' },
      { name: 'Angular', level: 65, category: 'frontend', experience: 4, icon: '🅰️' },
      { name: 'Xamarin', level: 80, category: 'frontend', experience: 3, icon: '📱' },
      { name: '.NET MAUI', level: 60, category: 'frontend', experience: 1, icon: '📲' },
      { name: 'Flutter', level: 55, category: 'frontend', experience: 1, icon: '📱' },
      
      // Bases de Datos
      { name: 'SQL', level: 95, category: 'database', experience: 7, icon: '💾' },
      { name: 'PL/SQL', level: 95, category: 'database', experience: 7, icon: '📝' },
      { name: 'Oracle DB', level: 85, category: 'database', experience: 4, icon: '🔴' },
      { name: 'Oracle APEX', level: 80, category: 'database', experience: 3, icon: '🏛️' },
      { name: 'Data Lakes', level: 65, category: 'database', experience: 1, icon: '🏞️' },
      
      // Herramientas & DevOps
      { name: 'RAP', level: 70, category: 'tools', experience: 1, icon: '🔧' },
      { name: 'OCR', level: 65, category: 'tools', experience: 1, icon: '�️' }
    ];

    return defaultSkillsData.map(skillData => 
      Skill.create(
        skillData.name,
        skillData.level,
        skillData.category,
        skillData.experience,
        {
          icon: skillData.icon,
          featured: skillData.level >= 75
        }
      )
    );
  }

  /**
   * Valida si los datos existentes son válidos
   */
  static validateExistingData(): {
    projectsValid: boolean;
    skillsValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    let projectsValid = true;
    let skillsValid = true;

    // Validar proyectos
    try {
      if (!featuredProjects || !Array.isArray(featuredProjects)) {
        projectsValid = false;
        errors.push('Projects data is not an array or is undefined');
      } else {
        featuredProjects.forEach((project, index) => {
          if (!project.id || !project.title || !project.description) {
            errors.push(`Project at index ${index} is missing required fields`);
            projectsValid = false;
          }
        });
      }
    } catch (error) {
      projectsValid = false;
      errors.push(`Error validating projects: ${error}`);
    }

    // Validar habilidades
    try {
      if (typeof skillsData === 'undefined') {
        skillsValid = false;
        errors.push('Skills data is undefined, will use default data');
      }
    } catch (error) {
      skillsValid = false;
      errors.push(`Error validating skills: ${error}`);
    }

    return {
      projectsValid,
      skillsValid,
      errors
    };
  }
}
