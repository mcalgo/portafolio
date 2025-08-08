/**
 * ProjectRepository Interface
 * Define el contrato para acceder a los datos de proyectos
 */

import { Project } from '../entities/Project';

export interface ProjectRepository {
  // Métodos de consulta
  findAll(): Promise<Project[]>;
  findById(id: string): Promise<Project | null>;
  findFeatured(): Promise<Project[]>;
  findByCategory(category: string): Promise<Project[]>;
  findByStatus(status: string): Promise<Project[]>;
  findByTechnology(technology: string): Promise<Project[]>;

  // Métodos de comando
  save(project: Project): Promise<void>;
  update(project: Project): Promise<void>;
  delete(id: string): Promise<void>;

  // Métodos de agregación
  count(): Promise<number>;
  countByStatus(status: string): Promise<number>;
  countByCategory(category: string): Promise<number>;
}
