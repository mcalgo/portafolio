/**
 * SkillRepository Interface
 * Define el contrato para acceder a los datos de habilidades
 */

import { Skill } from '../entities/Skill';

export interface SkillRepository {
  // Métodos de consulta
  findAll(): Promise<Skill[]>;
  findByCategory(category: string): Promise<Skill[]>;
  findFeatured(): Promise<Skill[]>;
  findByLevel(minLevel: number): Promise<Skill[]>;
  findByExperience(minYears: number): Promise<Skill[]>;

  // Métodos de comando
  save(skill: Skill): Promise<void>;
  update(skill: Skill): Promise<void>;
  delete(skillName: string): Promise<void>;

  // Métodos de agregación
  count(): Promise<number>;
  countByCategory(category: string): Promise<number>;
  getAverageLevel(): Promise<number>;
  getTotalExperience(): Promise<number>;
}
