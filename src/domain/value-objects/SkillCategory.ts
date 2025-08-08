/**
 * SkillCategory Value Object
 * Representa las categorías de habilidades técnicas
 */

export class SkillCategory {
  private static readonly VALID_CATEGORIES = [
    'backend',
    'frontend', 
    'mobile',
    'database',
    'devops',
    'tools',
    'framework',
    'language',
    'cloud',
    'testing'
  ] as const;
  
  private constructor(private readonly _value: typeof SkillCategory.VALID_CATEGORIES[number]) {}

  static fromString(category: string): SkillCategory {
    const normalizedCategory = category.toLowerCase();
    if (!SkillCategory.VALID_CATEGORIES.includes(normalizedCategory as typeof SkillCategory.VALID_CATEGORIES[number])) {
      throw new Error(`Invalid skill category: ${category}. Valid categories are: ${SkillCategory.VALID_CATEGORIES.join(', ')}`);
    }
    return new SkillCategory(normalizedCategory as typeof SkillCategory.VALID_CATEGORIES[number]);
  }

  static backend(): SkillCategory {
    return new SkillCategory('backend');
  }

  static frontend(): SkillCategory {
    return new SkillCategory('frontend');
  }

  static mobile(): SkillCategory {
    return new SkillCategory('mobile');
  }

  static database(): SkillCategory {
    return new SkillCategory('database');
  }

  static devops(): SkillCategory {
    return new SkillCategory('devops');
  }

  static tools(): SkillCategory {
    return new SkillCategory('tools');
  }

  static framework(): SkillCategory {
    return new SkillCategory('framework');
  }

  static language(): SkillCategory {
    return new SkillCategory('language');
  }

  static cloud(): SkillCategory {
    return new SkillCategory('cloud');
  }

  static testing(): SkillCategory {
    return new SkillCategory('testing');
  }

  get value(): string {
    return this._value;
  }

  equals(other: SkillCategory): boolean {
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
      case 'database':
        return '🗄️';
      case 'devops':
        return '🚀';
      case 'tools':
        return '🔧';
      case 'framework':
        return '🏗️';
      case 'language':
        return '💻';
      case 'cloud':
        return '☁️';
      case 'testing':
        return '🧪';
      default:
        return '💼';
    }
  }

  // Método para obtener el nombre localizado
  getDisplayName(language: 'es' | 'en' = 'es'): string {
    const names = {
      es: {
        backend: 'Backend & APIs',
        frontend: 'Frontend & Mobile',
        mobile: 'Desarrollo Móvil',
        database: 'Bases de Datos',
        devops: 'DevOps & CI/CD',
        tools: 'Herramientas',
        framework: 'Frameworks',
        language: 'Lenguajes',
        cloud: 'Cloud & Servicios',
        testing: 'Testing & QA'
      },
      en: {
        backend: 'Backend & APIs',
        frontend: 'Frontend & Mobile',
        mobile: 'Mobile Development',
        database: 'Databases',
        devops: 'DevOps & CI/CD',
        tools: 'Tools',
        framework: 'Frameworks',
        language: 'Languages',
        cloud: 'Cloud & Services',
        testing: 'Testing & QA'
      }
    };

    return names[language][this._value] || this._value;
  }

  // Métodos de consulta
  isBackend(): boolean {
    return this._value === 'backend';
  }

  isFrontend(): boolean {
    return this._value === 'frontend';
  }

  isMobile(): boolean {
    return this._value === 'mobile';
  }

  isDatabase(): boolean {
    return this._value === 'database';
  }

  isDevOps(): boolean {
    return this._value === 'devops';
  }

  // Método para obtener el color asociado
  getColor(): string {
    switch (this._value) {
      case 'backend':
        return '#10B981'; // green
      case 'frontend':
        return '#3B82F6'; // blue
      case 'mobile':
        return '#8B5CF6'; // violet
      case 'database':
        return '#F59E0B'; // yellow
      case 'devops':
        return '#EF4444'; // red
      case 'tools':
        return '#6B7280'; // gray
      case 'framework':
        return '#EC4899'; // pink
      case 'language':
        return '#14B8A6'; // teal
      case 'cloud':
        return '#06B6D4'; // cyan
      case 'testing':
        return '#84CC16'; // lime
      default:
        return '#6B7280';
    }
  }
}
