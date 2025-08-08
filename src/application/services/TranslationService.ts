/**
 * TranslationService
 * Servicio de aplicación para manejar las traducciones
 * Separa la lógica de traducción del contexto de React
 */

export type Language = 'es' | 'en';

export interface TranslationKeys {
  // Navigation
  'nav.home': string;
  'nav.about': string;
  'nav.projects': string;
  'nav.skills': string;
  
  // Hero Section
  'hero.greeting': string;
  'hero.role': string;
  'hero.description': string;
  'hero.cta.projects': string;
  'hero.cta.contact': string;
  
  // About Section
  'about.title': string;
  'about.subtitle': string;
  
  // Projects Section
  'projects.title': string;
  'projects.subtitle': string;
  
  // Skills Section
  'skills.title': string;
  'skills.subtitle': string;
  'skills.category.all': string;
  'skills.category.backend': string;
  'skills.category.frontend': string;
  'skills.category.database': string;
  'skills.experience.years': string;
  'skills.expert.label': string;
  
  // Language
  'language.spanish': string;
  'language.english': string;
  'language.selector': string;
  
  // Theme
  'theme.toggle': string;
  'theme.light': string;
  'theme.dark': string;
}

export class TranslationService {
  private translations: Record<Language, Partial<TranslationKeys>>;

  constructor() {
    this.translations = {
      es: {
        // Navigation
        'nav.home': 'Inicio',
        'nav.about': 'Sobre Mí',
        'nav.projects': 'Proyectos',
        'nav.skills': 'Habilidades',
        
        // Hero Section
        'hero.greeting': '👋 ¡Hola! Soy',
        'hero.role': 'Desarrollador Backend',
        'hero.description': 'Desarrollador backend especializado en C# con pasión por crear soluciones open-source. Contribuyo a proyectos que facilitan la vida de otros desarrolladores y disfruto resolviendo desafíos complejos.',
        'hero.cta.projects': 'Ver mis proyectos',
        'hero.cta.contact': 'Hablemos',
        
        // About Section
        'about.title': 'Sobre Mí',
        'about.subtitle': 'Backend Developer & Open Source Contributor especializado en C# y Python',
        
        // Projects Section
        'projects.title': 'Proyectos Destacados',
        'projects.subtitle': 'Una selección de mis proyectos open-source y contribuciones a la comunidad',
        
        // Skills Section
        'skills.title': 'Habilidades Técnicas',
        'skills.subtitle': 'Especialista en desarrollo backend con experiencia en integración de sistemas, APIs de alto rendimiento y arquitectura de datos empresarial.',
        'skills.category.all': 'Todas',
        'skills.category.backend': 'Backend & APIs',
        'skills.category.frontend': 'Frontend & Mobile',
        'skills.category.database': 'Bases de Datos',
        'skills.experience.years': 'años de experiencia',
        'skills.expert.label': 'Experto',
        
        // Language
        'language.spanish': 'Español',
        'language.english': 'English',
        'language.selector': 'Selector de idioma',
        
        // Theme
        'theme.toggle': 'Cambiar tema',
        'theme.light': 'claro',
        'theme.dark': 'oscuro',
      },
      en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.projects': 'Projects',
        'nav.skills': 'Skills',
        
        // Hero Section
        'hero.greeting': '👋 Hi! I\'m',
        'hero.role': 'Backend Developer',
        'hero.description': 'Backend developer specialized in C# with passion for creating open-source solutions. I contribute to projects that make other developers\' lives easier and enjoy solving complex challenges.',
        'hero.cta.projects': 'View my projects',
        'hero.cta.contact': 'Let\'s talk',
        
        // About Section
        'about.title': 'About Me',
        'about.subtitle': 'Backend Developer & Open Source Contributor specialized in C# and Python',
        
        // Projects Section
        'projects.title': 'Featured Projects',
        'projects.subtitle': 'A selection of my open-source projects and community contributions',
        
        // Skills Section
        'skills.title': 'Technical Skills',
        'skills.subtitle': 'Backend development specialist with experience in systems integration, high-performance APIs, and enterprise data architecture.',
        'skills.category.all': 'All',
        'skills.category.backend': 'Backend & APIs',
        'skills.category.frontend': 'Frontend & Mobile',
        'skills.category.database': 'Databases',
        'skills.experience.years': 'years of experience',
        'skills.expert.label': 'Expert',
        
        // Language
        'language.spanish': 'Español',
        'language.english': 'English',
        'language.selector': 'Language selector',
        
        // Theme
        'theme.toggle': 'Toggle theme',
        'theme.light': 'light',
        'theme.dark': 'dark',
      }
    };
  }

  translate(key: keyof TranslationKeys, language: Language): string {
    const translation = this.translations[language][key];
    return translation || key;
  }

  getAvailableLanguages(): Language[] {
    return Object.keys(this.translations) as Language[];
  }

  addTranslations(language: Language, translations: Partial<TranslationKeys>): void {
    this.translations[language] = {
      ...this.translations[language],
      ...translations
    };
  }

  // Método para obtener todas las traducciones de un idioma
  getAllTranslations(language: Language): Partial<TranslationKeys> {
    return { ...this.translations[language] };
  }

  // Método para detectar el idioma del navegador
  detectBrowserLanguage(): Language {
    if (typeof window === 'undefined') return 'es';
    
    const browserLanguage = navigator.language.toLowerCase();
    
    if (browserLanguage.startsWith('en')) return 'en';
    if (browserLanguage.startsWith('es')) return 'es';
    
    return 'es'; // Default to Spanish
  }
}
