/**
 * GetSkillsByCategoryUseCase
 * Caso de uso para obtener habilidades por categoría
 */

import { Skill } from '../../domain/entities/Skill';
import { SkillRepository } from '../../domain/repositories/SkillRepository';

export interface GetSkillsByCategoryRequest {
  category?: string;
  sortBy?: 'level' | 'experience' | 'name';
  sortOrder?: 'asc' | 'desc';
  minLevel?: number;
}

export class GetSkillsByCategoryUseCase {
  constructor(private readonly skillRepository: SkillRepository) {}

  async execute(request: GetSkillsByCategoryRequest = {}): Promise<Skill[]> {
    try {
      let skills: Skill[];

      // Obtener habilidades por categoría
      if (request.category && request.category !== 'all') {
        console.log('GetSkillsByCategoryUseCase: Getting skills for category:', request.category);
        skills = await this.skillRepository.findByCategory(request.category);
      } else {
        console.log('GetSkillsByCategoryUseCase: Getting all skills');
        skills = await this.skillRepository.findAll();
      }
      
      console.log('GetSkillsByCategoryUseCase: Found skills:', skills.length);
      console.log('GetSkillsByCategoryUseCase: Skills preview:', skills.map(s => ({ name: s.name, experience: s.experience })));

      // Filtrar por nivel mínimo si se especifica
      if (request.minLevel !== undefined) {
        skills = skills.filter(skill => skill.level >= request.minLevel!);
      }

      // Ordenar los resultados
      const sortBy = request.sortBy || 'level';
      const sortOrder = request.sortOrder || 'desc';

      skills.sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
          case 'level':
            comparison = a.level - b.level;
            break;
          case 'experience':
            comparison = a.experience - b.experience;
            break;
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
        }

        return sortOrder === 'asc' ? comparison : -comparison;
      });

      return skills;
    } catch (error) {
      throw new Error(`Failed to get skills by category: ${error}`);
    }
  }
}
