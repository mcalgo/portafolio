/**
 * ProjectStatus y ProjectCategory Value Objects
 * Representan el estado y categoría de un proyecto
 */

export class ProjectStatus {
  private static readonly VALID_STATUSES = ['completed', 'in-progress', 'planned', 'archived'] as const;
  
  private constructor(private readonly _value: typeof ProjectStatus.VALID_STATUSES[number]) {}

  static fromString(status: string): ProjectStatus {
    const normalizedStatus = status.toLowerCase();
    if (!ProjectStatus.VALID_STATUSES.includes(normalizedStatus as typeof ProjectStatus.VALID_STATUSES[number])) {
      throw new Error(`Invalid project status: ${status}. Valid statuses are: ${ProjectStatus.VALID_STATUSES.join(', ')}`);
    }
    return new ProjectStatus(normalizedStatus as typeof ProjectStatus.VALID_STATUSES[number]);
  }

  static completed(): ProjectStatus {
    return new ProjectStatus('completed');
  }

  static inProgress(): ProjectStatus {
    return new ProjectStatus('in-progress');
  }

  static planned(): ProjectStatus {
    return new ProjectStatus('planned');
  }

  static archived(): ProjectStatus {
    return new ProjectStatus('archived');
  }

  get value(): string {
    return this._value;
  }

  isCompleted(): boolean {
    return this._value === 'completed';
  }

  isInProgress(): boolean {
    return this._value === 'in-progress';
  }

  isPlanned(): boolean {
    return this._value === 'planned';
  }

  isArchived(): boolean {
    return this._value === 'archived';
  }

  equals(other: ProjectStatus): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }

  // Método para obtener el color del estado
  getColor(): string {
    switch (this._value) {
      case 'completed':
        return '#10B981'; // green-500
      case 'in-progress':
        return '#F59E0B'; // yellow-500
      case 'planned':
        return '#6B7280'; // gray-500
      case 'archived':
        return '#EF4444'; // red-500
      default:
        return '#6B7280';
    }
  }
}

export class ProjectCategory {
  private static readonly VALID_CATEGORIES = ['backend', 'frontend', 'mobile', 'fullstack', 'library', 'tool', 'framework'] as const;
  
  private constructor(private readonly _value: typeof ProjectCategory.VALID_CATEGORIES[number]) {}

  static fromString(category: string): ProjectCategory {
    const normalizedCategory = category.toLowerCase();
    if (!ProjectCategory.VALID_CATEGORIES.includes(normalizedCategory as typeof ProjectCategory.VALID_CATEGORIES[number])) {
      throw new Error(`Invalid project category: ${category}. Valid categories are: ${ProjectCategory.VALID_CATEGORIES.join(', ')}`);
    }
    return new ProjectCategory(normalizedCategory as typeof ProjectCategory.VALID_CATEGORIES[number]);
  }

  static backend(): ProjectCategory {
    return new ProjectCategory('backend');
  }

  static frontend(): ProjectCategory {
    return new ProjectCategory('frontend');
  }

  static mobile(): ProjectCategory {
    return new ProjectCategory('mobile');
  }

  static fullstack(): ProjectCategory {
    return new ProjectCategory('fullstack');
  }

  static library(): ProjectCategory {
    return new ProjectCategory('library');
  }

  static tool(): ProjectCategory {
    return new ProjectCategory('tool');
  }

  static framework(): ProjectCategory {
    return new ProjectCategory('framework');
  }

  get value(): string {
    return this._value;
  }

  equals(other: ProjectCategory): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }

  // Método para obtener el icono asociado
  getIcon(): string {
    switch (this._value) {
      case 'backend':
        return '⚙️';
      case 'frontend':
        return '🎨';
      case 'mobile':
        return '📱';
      case 'fullstack':
        return '🌐';
      case 'library':
        return '📚';
      case 'tool':
        return '🔧';
      case 'framework':
        return '🏗️';
      default:
        return '💻';
    }
  }
}
