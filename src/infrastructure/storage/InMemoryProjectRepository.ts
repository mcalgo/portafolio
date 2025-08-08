/**
 * InMemoryProjectRepository
 * Implementación en memoria del repositorio de proyectos
 * Para uso en desarrollo y testing
 */

import { Project } from '../../domain/entities/Project';
import { ProjectRepository } from '../../domain/repositories/ProjectRepository';

export class InMemoryProjectRepository implements ProjectRepository {
  private projects: Project[] = [];

  constructor(initialProjects: Project[] = []) {
    this.projects = [...initialProjects];
  }

  async findAll(): Promise<Project[]> {
    return [...this.projects];
  }

  async findById(id: string): Promise<Project | null> {
    const project = this.projects.find(p => p.id === id);
    return project || null;
  }

  async findFeatured(): Promise<Project[]> {
    return this.projects.filter(p => p.featured);
  }

  async findByCategory(category: string): Promise<Project[]> {
    return this.projects.filter(p => p.category === category);
  }

  async findByStatus(status: string): Promise<Project[]> {
    return this.projects.filter(p => p.status === status);
  }

  async findByTechnology(technology: string): Promise<Project[]> {
    return this.projects.filter(p => 
      p.technologies.some(tech => 
        tech.toLowerCase().includes(technology.toLowerCase())
      )
    );
  }

  async save(project: Project): Promise<void> {
    const existingIndex = this.projects.findIndex(p => p.id === project.id);
    if (existingIndex >= 0) {
      throw new Error(`Project with id ${project.id} already exists`);
    }
    this.projects.push(project);
  }

  async update(project: Project): Promise<void> {
    const existingIndex = this.projects.findIndex(p => p.id === project.id);
    if (existingIndex < 0) {
      throw new Error(`Project with id ${project.id} not found`);
    }
    this.projects[existingIndex] = project;
  }

  async delete(id: string): Promise<void> {
    const existingIndex = this.projects.findIndex(p => p.id === id);
    if (existingIndex < 0) {
      throw new Error(`Project with id ${id} not found`);
    }
    this.projects.splice(existingIndex, 1);
  }

  async count(): Promise<number> {
    return this.projects.length;
  }

  async countByStatus(status: string): Promise<number> {
    return this.projects.filter(p => p.status === status).length;
  }

  async countByCategory(category: string): Promise<number> {
    return this.projects.filter(p => p.category === category).length;
  }

  // Métodos auxiliares para testing
  clear(): void {
    this.projects = [];
  }

  addProjects(projects: Project[]): void {
    this.projects.push(...projects);
  }
}
