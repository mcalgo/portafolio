/**
 * Skill Entity - Representa una habilidad técnica en el dominio
 * Contiene la lógica de negocio relacionada con habilidades
 */

import { SkillLevel } from '../value-objects/SkillLevel';
import { SkillCategory } from '../value-objects/SkillCategory';
import { Technology } from '../value-objects/Technology';

export class Skill {
  private constructor(
    private readonly _technology: Technology,
    private _level: SkillLevel,
    private _category: SkillCategory,
    private _experience: number, // años de experiencia
    private _icon?: string,
    private _featured: boolean = false
  ) {}

  // Factory method para crear una nueva habilidad
  static create(
    technologyName: string,
    level: number,
    category: string,
    experience: number,
    options?: {
      icon?: string;
      featured?: boolean;
    }
  ): Skill {
    return new Skill(
      Technology.create(technologyName),
      SkillLevel.fromPercentage(level),
      SkillCategory.fromString(category),
      experience,
      options?.icon,
      options?.featured || false
    );
  }

  // Getters
  get name(): string {
    return this._technology.name;
  }

  get technology(): Technology {
    return this._technology;
  }

  get level(): number {
    return this._level.percentage;
  }

  get levelDescription(): string {
    return this._level.description;
  }

  get category(): string {
    return this._category.value;
  }

  get categoryIcon(): string {
    return this._category.getIcon();
  }

  get experience(): number {
    return this._experience;
  }

  get icon(): string | undefined {
    return this._icon;
  }

  get featured(): boolean {
    return this._featured;
  }

  get color(): string {
    return this._technology.getColor();
  }

  // Método para obtener ícono personalizado de Sebastián Arévalo
  getPersonalIcon(): string {
    return '<SA/>';
  }

  // Método para obtener ícono inteligente (personal + categoría)
  getSmartIcon(): string {
    // Si tiene ícono personalizado, lo usa
    if (this._icon) {
      return this._icon;
    }
    
    // Para habilidades destacadas o expertas, usa el ícono personal
    if (this._featured || this.isExpert()) {
      return this.getPersonalIcon();
    }
    
    // Sino, usa el ícono de la categoría
    return this._category.getIcon();
  }

  // Métodos de negocio
  markAsFeatured(): void {
    this._featured = true;
  }

  unmarkAsFeatured(): void {
    this._featured = false;
  }

  updateLevel(newLevel: number): void {
    this._level = SkillLevel.fromPercentage(newLevel);
  }

  addExperience(years: number): void {
    if (years < 0) {
      throw new Error('Experience cannot be negative');
    }
    this._experience += years;
  }

  changeCategory(newCategory: string): void {
    this._category = SkillCategory.fromString(newCategory);
  }

  // Métodos de consulta
  isExpert(): boolean {
    return this._level.isExpert();
  }

  isAdvanced(): boolean {
    return this._level.isAdvanced();
  }

  isIntermediate(): boolean {
    return this._level.isIntermediate();
  }

  isBeginner(): boolean {
    return this._level.isBeginner();
  }

  isBackendSkill(): boolean {
    return this._technology.isBackend() || this._category.isBackend();
  }

  isFrontendSkill(): boolean {
    return this._technology.isFrontend() || this._category.isFrontend();
  }

  isMobileSkill(): boolean {
    return this._technology.isMobile() || this._category.isMobile();
  }

  // Método para obtener el tiempo estimado para dominar esta habilidad
  getTimeToMastery(): string {
    const currentLevel = this._level.percentage;
    const remainingPercentage = 100 - currentLevel;
    const monthsToMastery = Math.ceil((remainingPercentage / 10) * 3); // Aproximación
    
    if (monthsToMastery <= 0) {
      return 'Ya dominada';
    }
    
    if (monthsToMastery < 12) {
      return `${monthsToMastery} meses`;
    }
    
    return `${Math.ceil(monthsToMastery / 12)} años`;
  }
}
