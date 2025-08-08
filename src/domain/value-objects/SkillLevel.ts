/**
 * SkillLevel Value Object
 * Representa el nivel de competencia en una habilidad
 */

export class SkillLevel {
  private constructor(private readonly _percentage: number) {
    this.validate(_percentage);
  }

  static fromPercentage(percentage: number): SkillLevel {
    return new SkillLevel(percentage);
  }

  static beginner(): SkillLevel {
    return new SkillLevel(25);
  }

  static intermediate(): SkillLevel {
    return new SkillLevel(50);
  }

  static advanced(): SkillLevel {
    return new SkillLevel(75);
  }

  static expert(): SkillLevel {
    return new SkillLevel(90);
  }

  get percentage(): number {
    return this._percentage;
  }

  get description(): string {
    if (this._percentage >= 90) return 'Experto';
    if (this._percentage >= 75) return 'Avanzado';
    if (this._percentage >= 50) return 'Intermedio';
    if (this._percentage >= 25) return 'Principiante';
    return 'Básico';
  }

  get englishDescription(): string {
    if (this._percentage >= 90) return 'Expert';
    if (this._percentage >= 75) return 'Advanced';
    if (this._percentage >= 50) return 'Intermediate';
    if (this._percentage >= 25) return 'Beginner';
    return 'Basic';
  }

  private validate(percentage: number): void {
    if (percentage < 0 || percentage > 100) {
      throw new Error('Skill level percentage must be between 0 and 100');
    }
  }

  isExpert(): boolean {
    return this._percentage >= 90;
  }

  isAdvanced(): boolean {
    return this._percentage >= 75 && this._percentage < 90;
  }

  isIntermediate(): boolean {
    return this._percentage >= 50 && this._percentage < 75;
  }

  isBeginner(): boolean {
    return this._percentage >= 25 && this._percentage < 50;
  }

  isBasic(): boolean {
    return this._percentage < 25;
  }

  equals(other: SkillLevel): boolean {
    return this._percentage === other._percentage;
  }

  toString(): string {
    return `${this._percentage}%`;
  }

  // Método para obtener el color basado en el nivel
  getColor(): string {
    if (this._percentage >= 90) return '#10B981'; // green-500 - Experto
    if (this._percentage >= 75) return '#3B82F6'; // blue-500 - Avanzado
    if (this._percentage >= 50) return '#F59E0B'; // yellow-500 - Intermedio
    if (this._percentage >= 25) return '#F97316'; // orange-500 - Principiante
    return '#6B7280'; // gray-500 - Básico
  }

  // Método para obtener el número de estrellas (1-5)
  getStars(): number {
    if (this._percentage >= 90) return 5;
    if (this._percentage >= 75) return 4;
    if (this._percentage >= 50) return 3;
    if (this._percentage >= 25) return 2;
    return 1;
  }
}
