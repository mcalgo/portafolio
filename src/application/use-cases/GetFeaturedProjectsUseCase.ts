/**
 * GetFeaturedProjectsUseCase
 * Caso de uso para obtener proyectos destacados
 */

import { Project } from '../../domain/entities/Project';
import { ProjectRepository } from '../../domain/repositories/ProjectRepository';

export class GetFeaturedProjectsUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(): Promise<Project[]> {
    try {
      const featuredProjects = await this.projectRepository.findFeatured();
      
      // Ordenar por fecha de creación (más recientes primero)
      return featuredProjects.sort((a, b) => 
        b.createdAt.getTime() - a.createdAt.getTime()
      );
    } catch (error) {
      throw new Error(`Failed to get featured projects: ${error}`);
    }
  }
}
