/**
 * Technology Value Object
 * Representa una tecnología utilizada en proyectos
 */

export class Technology {
  private constructor(private readonly _name: string) {
    this.validate(_name);
  }

  static create(name: string): Technology {
    return new Technology(name);
  }

  get name(): string {
    return this._name;
  }

  private validate(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Technology name cannot be empty');
    }

    if (name.length > 30) {
      throw new Error('Technology name cannot be longer than 30 characters');
    }
  }

  equals(other: Technology): boolean {
    return this._name.toLowerCase() === other._name.toLowerCase();
  }

  toString(): string {
    return this._name;
  }

  // Método para obtener el color asociado a la tecnología
  getColor(): string {
    const colorMap: Record<string, string> = {
      'C#': '#512BD4',
      'Python': '#3776AB',
      'TypeScript': '#3178C6',
      'JavaScript': '#F7DF1E',
      'React': '#61DAFB',
      'Next.js': '#000000',
      'Node.js': '#339933',
      'Flask': '#000000',
      'FastAPI': '#009688',
      'Laravel': '#FF2D20',
      'PHP': '#777BB4',
      'SQL': '#336791',
      'Oracle': '#F80000',
      'Angular': '#DD0031',
      'Flutter': '#02569B',
      'Xamarin': '#3498DB'
    };

    return colorMap[this._name] || '#6B7280';
  }

  // Método para verificar si es una tecnología backend
  isBackend(): boolean {
    const backendTechs = ['C#', 'Python', 'Node.js', 'Flask', 'FastAPI', 'Laravel', 'PHP', '.NET Core', 'ASP.NET'];
    return backendTechs.includes(this._name);
  }

  // Método para verificar si es una tecnología frontend
  isFrontend(): boolean {
    const frontendTechs = ['TypeScript', 'JavaScript', 'React', 'Angular', 'Next.js', 'Vue.js'];
    return frontendTechs.includes(this._name);
  }

  // Método para verificar si es una tecnología móvil
  isMobile(): boolean {
    const mobileTechs = ['Flutter', 'Xamarin', '.NET MAUI', 'React Native'];
    return mobileTechs.includes(this._name);
  }
}
