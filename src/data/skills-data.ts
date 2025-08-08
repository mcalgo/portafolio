/**
 * Skills Data
 * Datos de habilidades técnicas organizados por categorías
 */

export interface SkillData {
  name: string;
  level: number;
  category: string;
  experience?: number;
  icon?: string;
}

export const skillsData: SkillData[] = [
  // Backend & APIs
  { name: 'C#', level: 95, category: 'backend', experience: 7, icon: '🔷' },
  { name: '.NET Core', level: 90, category: 'backend', experience: 6, icon: '⚡' },
  { name: 'ASP.NET', level: 95, category: 'backend', experience: 7, icon: '🌐' },
  { name: 'Python', level: 90, category: 'backend', experience: 3, icon: '🐍' },
  { name: 'FastAPI', level: 75, category: 'backend', experience: 2, icon: '⚡' },
  { name: 'Flask', level: 80, category: 'backend', experience: 3, icon: '🔥' },
  { name: 'Orionis Framework', level: 95, category: 'backend', experience: 1, icon: '🏗️' },
  { name: 'Background Workers', level: 90, category: 'backend', experience: 6, icon: '⚡' },
  { name: 'Python Daemons', level: 85, category: 'backend', experience: 2, icon: '🐍' },
  
  // Frontend & Mobile
  { name: 'TypeScript', level: 70, category: 'frontend', experience: 4, icon: '💙' },
  { name: 'JavaScript', level: 70, category: 'frontend', experience: 4, icon: '💛' },
  { name: 'Angular', level: 65, category: 'frontend', experience: 4, icon: '🅰️' },
  { name: 'Xamarin', level: 80, category: 'frontend', experience: 3, icon: '📱' },
  { name: '.NET MAUI', level: 60, category: 'frontend', experience: 1, icon: '📲' },
  { name: 'Flutter', level: 55, category: 'frontend', experience: 1, icon: '📱' },
  
  // Bases de Datos
  { name: 'SQL', level: 95, category: 'database', experience: 7, icon: '💾' },
  { name: 'PL/SQL', level: 95, category: 'database', experience: 7, icon: '📝' },
  { name: 'Oracle DB', level: 85, category: 'database', experience: 4, icon: '🔴' },
  { name: 'Oracle APEX', level: 80, category: 'database', experience: 3, icon: '🏛️' },
  { name: 'Data Lakes', level: 65, category: 'database', experience: 1, icon: '🏞️' },
  
  // Herramientas & DevOps
  { name: 'RAP', level: 70, category: 'tools', experience: 1, icon: '🔧' },
  { name: 'OCR', level: 65, category: 'tools', experience: 1, icon: '�️' },
];

// Categorías de habilidades
export const skillCategories = [
  { key: 'all', name: 'Todas', icon: '💼' },
  { key: 'backend', name: 'Backend & APIs', icon: '⚙️' },
  { key: 'frontend', name: 'Frontend & Mobile', icon: '🎨' },
  { key: 'database', name: 'Bases de Datos', icon: '🗄️' },
  { key: 'tools', name: 'Herramientas & DevOps', icon: '🔧' }
];

// Habilidades por nivel de especialización
export const specializationAreas = [
  {
    title: 'Integración de Sistemas',
    description: 'Proyectos de alta tenencia con RAP y ORC, migración entre sistemas complejos',
    skills: ['RAP', 'ORC', 'Data Migration', 'Background Workers'],
    icon: '🔗'
  },
  {
    title: 'Desarrollo de APIs',
    description: 'APIs robustas en .NET Core, FastAPI y Flask con alto rendimiento',
    skills: ['.NET Core', 'ASP.NET', 'FastAPI', 'Flask'],
    icon: '🌐'
  },
  {
    title: 'Framework Orionis',
    description: 'Framework propio en Python para desarrollo rápido de aplicaciones',
    skills: ['Python', 'Orionis Framework', 'Flask'],
    icon: '🏗️'
  }
];
