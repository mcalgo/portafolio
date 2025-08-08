/**
 * GetPortfolioSummaryUseCase
 * Caso de uso para obtener un resumen completo del portfolio
 */

import { PortfolioService } from '../../domain/services/PortfolioService';

export interface PortfolioSummaryResponse {
  totalProjects: number;
  completedProjects: number;
  featuredProjects: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string[];
    status: string;
    category: string;
    githubUrl?: string;
    liveUrl?: string;
  }>;
  topSkills: Array<{
    name: string;
    level: number;
    levelDescription: string;
    category: string;
    experience: number;
    color: string;
  }>;
  totalExperience: number;
  averageSkillLevel: number;
  overallProgress: number;
  skillDistribution: Record<string, number>;
  recommendedFocus: string[];
  suggestedTechnologies: string[];
}

export class GetPortfolioSummaryUseCase {
  constructor(private readonly portfolioService: PortfolioService) {}

  async execute(): Promise<PortfolioSummaryResponse> {
    try {
      const [summary, progress, suggestedTechs] = await Promise.all([
        this.portfolioService.getPortfolioSummary(),
        this.portfolioService.getDeveloperProgress(),
        this.portfolioService.suggestTechnologiesToLearn()
      ]);

      return {
        totalProjects: summary.totalProjects,
        completedProjects: summary.completedProjects,
        featuredProjects: summary.featuredProjects.map(project => ({
          id: project.id,
          title: project.title,
          description: project.description,
          technologies: project.technologies,
          status: project.status,
          category: project.category,
          githubUrl: project.githubUrl,
          liveUrl: project.liveUrl
        })),
        topSkills: summary.topSkills.map(skill => ({
          name: skill.name,
          level: skill.level,
          levelDescription: skill.levelDescription,
          category: skill.category,
          experience: skill.experience,
          color: skill.color
        })),
        totalExperience: summary.totalExperience,
        averageSkillLevel: summary.averageSkillLevel,
        overallProgress: progress.overallProgress,
        skillDistribution: progress.skillDistribution,
        recommendedFocus: progress.recommendedFocus,
        suggestedTechnologies: suggestedTechs
      };
    } catch (error) {
      throw new Error(`Failed to get portfolio summary: ${error}`);
    }
  }
}
