/**
 * PortfolioService - Servicio de dominio
 * Contiene lógica de negocio que involucra múltiples entidades
 */

import { Project } from '../entities/Project';
import { Skill } from '../entities/Skill';
import { ProjectRepository } from '../repositories/ProjectRepository';
import { SkillRepository } from '../repositories/SkillRepository';

export class PortfolioService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly skillRepository: SkillRepository
  ) {}

  /**
   * Obtiene un resumen completo del portfolio
   */
  async getPortfolioSummary(): Promise<{
    totalProjects: number;
    completedProjects: number;
    featuredProjects: Project[];
    topSkills: Skill[];
    totalExperience: number;
    averageSkillLevel: number;
  }> {
    const [
      totalProjects,
      completedProjects,
      featuredProjects,
      topSkills,
      totalExperience,
      averageSkillLevel
    ] = await Promise.all([
      this.projectRepository.count(),
      this.projectRepository.countByStatus('completed'),
      this.projectRepository.findFeatured(),
      this.getTopSkills(),
      this.skillRepository.getTotalExperience(),
      this.skillRepository.getAverageLevel()
    ]);

    return {
      totalProjects,
      completedProjects,
      featuredProjects,
      topSkills,
      totalExperience,
      averageSkillLevel
    };
  }

  /**
   * Obtiene las mejores habilidades (nivel >= 75%)
   */
  async getTopSkills(limit: number = 5): Promise<Skill[]> {
    const skills = await this.skillRepository.findByLevel(75);
    return skills
      .sort((a, b) => b.level - a.level)
      .slice(0, limit);
  }

  /**
   * Sugiere proyectos relacionados basados en tecnologías comunes
   */
  async getRelatedProjects(project: Project): Promise<Project[]> {
    const relatedProjects: Project[] = [];
    
    // Buscar proyectos que compartan tecnologías
    for (const technology of project.technologies) {
      const projectsWithTech = await this.projectRepository.findByTechnology(technology);
      relatedProjects.push(
        ...projectsWithTech.filter(p => 
          p.id !== project.id && 
          !relatedProjects.some(rp => rp.id === p.id)
        )
      );
    }

    // Ordenar por número de tecnologías compartidas
    return relatedProjects
      .map(p => ({
        project: p,
        sharedTechs: p.technologies.filter(tech => project.technologies.includes(tech)).length
      }))
      .sort((a, b) => b.sharedTechs - a.sharedTechs)
      .slice(0, 3)
      .map(item => item.project);
  }

  /**
   * Calcula el progreso general del desarrollador
   */
  async getDeveloperProgress(): Promise<{
    overallProgress: number;
    skillDistribution: Record<string, number>;
    recommendedFocus: string[];
  }> {
    const skills = await this.skillRepository.findAll();
    
    if (skills.length === 0) {
      return {
        overallProgress: 0,
        skillDistribution: {},
        recommendedFocus: []
      };
    }

    // Calcular progreso general
    const totalLevel = skills.reduce((sum, skill) => sum + skill.level, 0);
    const overallProgress = totalLevel / skills.length;

    // Distribución por categorías
    const skillDistribution: Record<string, number> = {};
    for (const skill of skills) {
      const category = skill.category;
      if (!skillDistribution[category]) {
        skillDistribution[category] = 0;
      }
      skillDistribution[category] += skill.level;
    }

    // Normalizar distribución
    Object.keys(skillDistribution).forEach(category => {
      const categorySkills = skills.filter(s => s.category === category);
      skillDistribution[category] = skillDistribution[category] / categorySkills.length;
    });

    // Recomendar áreas de enfoque (categorías con menor nivel promedio)
    const recommendedFocus = Object.entries(skillDistribution)
      .sort(([,a], [,b]) => a - b)
      .slice(0, 2)
      .map(([category]) => category);

    return {
      overallProgress,
      skillDistribution,
      recommendedFocus
    };
  }

  /**
   * Valida si un proyecto puede ser marcado como featured
   */
  validateFeaturedProject(project: Project): { isValid: boolean; reason?: string } {
    if (!project.isCompleted()) {
      return {
        isValid: false,
        reason: 'Solo proyectos completados pueden ser destacados'
      };
    }

    if (project.technologies.length < 2) {
      return {
        isValid: false,
        reason: 'Los proyectos destacados deben usar al menos 2 tecnologías'
      };
    }

    return { isValid: true };
  }

  /**
   * Sugiere tecnologías para aprender basado en proyectos y habilidades actuales
   */
  async suggestTechnologiesToLearn(): Promise<string[]> {
    const [projects, skills] = await Promise.all([
      this.projectRepository.findAll(),
      this.skillRepository.findAll()
    ]);

    // Obtener todas las tecnologías usadas en proyectos
    const projectTechnologies = new Set<string>();
    projects.forEach(project => {
      project.technologies.forEach(tech => projectTechnologies.add(tech));
    });

    // Obtener tecnologías en las que ya tiene habilidades
    const knownTechnologies = new Set(skills.map(skill => skill.name));

    // Tecnologías complementarias sugeridas
    const suggestions = new Map<string, string[]>([
      ['C#', ['Azure', 'Docker', 'Kubernetes', 'Redis']],
      ['Python', ['Django', 'Pandas', 'NumPy', 'TensorFlow']],
      ['TypeScript', ['React', 'Vue.js', 'Svelte', 'Deno']],
      ['JavaScript', ['Node.js', 'Express.js', 'MongoDB', 'GraphQL']],
      ['Flutter', ['Firebase', 'Dart', 'SQLite', 'Provider']],
      ['React', ['Next.js', 'Redux', 'React Query', 'Chakra UI']]
    ]);

    const recommendedTechs = new Set<string>();

    // Sugerir tecnologías complementarias
    knownTechnologies.forEach(tech => {
      const complements = suggestions.get(tech) || [];
      complements.forEach(complement => {
        if (!knownTechnologies.has(complement)) {
          recommendedTechs.add(complement);
        }
      });
    });

    return Array.from(recommendedTechs).slice(0, 5);
  }
}
