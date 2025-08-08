/**
 * InMemorySkillRepository
 * Implementación en memoria del repositorio de habilidades
 * Para uso en desarrollo y testing
 */

import { Skill } from '../../domain/entities/Skill';
import { SkillRepository } from '../../domain/repositories/SkillRepository';

export class InMemorySkillRepository implements SkillRepository {
  private skills: Skill[] = [];

  constructor(initialSkills: Skill[] = []) {
    console.log('InMemorySkillRepository: Initialized with', initialSkills.length, 'skills');
    this.skills = [...initialSkills];
  }

  async findAll(): Promise<Skill[]> {
    console.log('InMemorySkillRepository: findAll returning', this.skills.length, 'skills');
    return [...this.skills];
  }

  async findByCategory(category: string): Promise<Skill[]> {
    return this.skills.filter(s => s.category === category);
  }

  async findFeatured(): Promise<Skill[]> {
    return this.skills.filter(s => s.featured);
  }

  async findByLevel(minLevel: number): Promise<Skill[]> {
    return this.skills.filter(s => s.level >= minLevel);
  }

  async findByExperience(minYears: number): Promise<Skill[]> {
    return this.skills.filter(s => s.experience >= minYears);
  }

  async save(skill: Skill): Promise<void> {
    const existingIndex = this.skills.findIndex(s => s.name === skill.name);
    if (existingIndex >= 0) {
      throw new Error(`Skill with name ${skill.name} already exists`);
    }
    this.skills.push(skill);
  }

  async update(skill: Skill): Promise<void> {
    const existingIndex = this.skills.findIndex(s => s.name === skill.name);
    if (existingIndex < 0) {
      throw new Error(`Skill with name ${skill.name} not found`);
    }
    this.skills[existingIndex] = skill;
  }

  async delete(skillName: string): Promise<void> {
    const existingIndex = this.skills.findIndex(s => s.name === skillName);
    if (existingIndex < 0) {
      throw new Error(`Skill with name ${skillName} not found`);
    }
    this.skills.splice(existingIndex, 1);
  }

  async count(): Promise<number> {
    return this.skills.length;
  }

  async countByCategory(category: string): Promise<number> {
    return this.skills.filter(s => s.category === category).length;
  }

  async getAverageLevel(): Promise<number> {
    if (this.skills.length === 0) return 0;
    const totalLevel = this.skills.reduce((sum, skill) => sum + skill.level, 0);
    return totalLevel / this.skills.length;
  }

  async getTotalExperience(): Promise<number> {
    return this.skills.reduce((sum, skill) => sum + skill.experience, 0);
  }

  // Métodos auxiliares para testing
  clear(): void {
    this.skills = [];
  }

  addSkills(skills: Skill[]): void {
    this.skills.push(...skills);
  }
}
