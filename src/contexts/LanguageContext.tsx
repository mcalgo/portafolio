"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traducciones
const translations = {
  es: {
    // Navbar
    'nav.home': 'Inicio',
    'nav.about': 'Sobre Mí',
    'nav.projects': 'Proyectos',
    'nav.skills': 'Habilidades',
    
    // Hero Section
    'hero.greeting': 'Hola, soy',
    'hero.role': 'Desarrollador Full Stack',
    'hero.description': 'Especializado en C# y Python, creando soluciones robustas y escalables para empresas modernas.',
    'hero.cta.projects': 'Ver Proyectos',
    'hero.cta.contact': 'Contactar',
    
    // About Section
    'about.title': 'Sobre Mí',
    'about.subtitle': 'Desarrollador Full Stack & Arquitecto de Software especializado en soluciones completas',
    'about.description': 'Con experiencia en desarrollo frontend, backend y arquitectura de sistemas, me especializo en crear soluciones completas y escalables. Mi enfoque está en la calidad del código y la experiencia de usuario.',
    'about.experience': 'Años de Experiencia',
    'about.cards.backend.title': 'Full Stack Developer',
    'about.cards.backend.description': 'Especializado en desarrollo completo con tecnologías modernas como React, Node.js, C# y Python.',
    'about.cards.opensource.title': 'Open Source',
    'about.cards.opensource.description': 'Contribuidor activo a proyectos open-source, creando soluciones que facilitan la vida de otros desarrolladores.',
    'about.cards.performance.title': 'High Performance',
    'about.cards.performance.description': 'Apasionado por desarrollar soluciones de alto rendimiento y experiencias de usuario fluidas.',
    'about.cards.innovation.title': 'Innovación',
    'about.cards.innovation.description': 'Creador de aplicaciones y herramientas que mejoran la productividad y experiencia de desarrollo.',
    'about.story.title': 'Mi Historia',
    'about.story.paragraph1': 'Soy un desarrollador Full Stack apasionado con especialización en tecnologías modernas. Me encanta crear soluciones completas que cubran desde el frontend hasta el backend.',
    'about.story.paragraph2': 'Actualmente trabajo con React, Next.js, TypeScript, C#, Python y bases de datos. Mi enfoque está en crear aplicaciones escalables y contribuir a proyectos innovadores.',
    'about.languages.title': 'Lenguajes en Uso Actualmente',
    'about.languages.subtitle': 'Distribución de tiempo de desarrollo en mis proyectos recientes',
    'about.projects': 'Proyectos Completados',
    'about.technologies': 'Tecnologías Dominadas',
    
    // Projects Section
    'projects.title': 'Proyectos Destacados',
    'projects.subtitle': 'Una selección de mis proyectos open-source y contribuciones a la comunidad',
    'projects.view': 'Ver Proyecto',
    'projects.code': 'Ver Código',
    'projects.github.button': 'Ver todos mis proyectos en GitHub',
    
    // Individual Projects
    'projects.items.orionis.title': 'Orionis Framework',
    'projects.items.orionis.description': 'Framework propio en Python para desarrollo rápido de aplicaciones empresariales',
    'projects.items.spellnumber.title': 'SpellNumber Laravel',
    'projects.items.spellnumber.description': 'Librería para convertir números a palabras en Laravel usando PHP INTL',
    'projects.items.skeleton.title': 'Flaskavel Skeleton',
    'projects.items.skeleton.description': 'Framework skeleton para aplicaciones Python con arquitectura robusta y escalable',
    
    // Skills Section
    'skills.title': 'Habilidades Técnicas',
    'skills.subtitle': 'Especialista en desarrollo backend con experiencia en integración de sistemas, APIs de alto rendimiento y arquitectura de datos empresarial.',
    'skills.category.all': 'Todas',
    'skills.category.backend': 'Backend & APIs',
    'skills.category.frontend': 'Frontend & Mobile',
    'skills.category.database': 'Bases de Datos',
    'skills.experience.years': 'años de experiencia',
    'skills.expert.label': 'Experto',
    'skills.competence': 'Competencia',
    'skills.specialization': 'Especialización Principal',
    'skills.integration': 'Integración de Sistemas',
    'skills.integration.desc': 'Proyectos de alta tenencia con RAP y ORC, migración entre sistemas complejos',
    'skills.apis': 'Desarrollo de APIs',
    'skills.apis.desc': 'APIs robustas en .NET Core, FastAPI y Flask con alto rendimiento',
    'skills.framework': 'Framework Orionis',
    'skills.framework.desc': 'Framework propio en Python para desarrollo rápido de aplicaciones',
    
    // Skills Descriptions
    'skills.desc.default': 'Experiencia profesional en esta tecnología',
    'skills.desc.c': 'Desarrollo de aplicaciones empresariales y servicios backend robustos',
    'skills.desc.netcore': 'APIs modernas y aplicaciones cross-platform de alto rendimiento',
    'skills.desc.aspnet': 'Aplicaciones web escalables y servicios RESTful',
    'skills.desc.python': 'Automatización, análisis de datos y desarrollo de sistemas complejos',
    'skills.desc.fastapi': 'APIs de alta velocidad con documentación automática',
    'skills.desc.flask': 'Microservicios ligeros y aplicaciones web flexibles',
    'skills.desc.orionisframework': 'Framework propio para desarrollo rápido de aplicaciones Python',
    'skills.desc.xamarin': 'Aplicaciones móviles nativas multiplataforma',
    'skills.desc.netmaui': 'Apps modernas para múltiples plataformas con .NET',
    'skills.desc.flutter': 'Interfaces móviles hermosas y de alto rendimiento',
    'skills.desc.sql': 'Diseño y optimización de bases de datos relacionales',
    'skills.desc.plsql': 'Procedimientos almacenados y lógica compleja en Oracle',
    'skills.desc.oracledb': 'Administración y desarrollo en entornos empresariales',
    'skills.desc.oracleapex': 'Desarrollo rápido de aplicaciones web empresariales',
    'skills.desc.datalakes': 'Arquitectura y gestión de grandes volúmenes de datos',
    'skills.desc.rap': 'Integración de sistemas de alta tenencia',
    'skills.desc.orc': 'Optimización de recursos y configuración',
    'skills.desc.backgroundworkers': 'Servicios en segundo plano y procesamiento asíncrono',
    'skills.desc.pythondaemons': 'Servicios automatizados y monitoreo de sistemas',
    'skills.desc.datamigration': 'Transferencia segura de datos entre sistemas complejos',
    'skills.desc.typescript': 'JavaScript tipado para aplicaciones escalables',
    'skills.desc.javascript': 'Desarrollo frontend interactivo y dinámico',
    'skills.desc.angular': 'Aplicaciones web robustas y componentes reutilizables',
    
    // Footer
    'footer.description': 'Desarrollador Full Stack especializado en tecnologías modernas. Creador de soluciones completas y arquitectura de aplicaciones escalables.',
    'footer.quickLinks': 'Enlaces Rápidos',
    'footer.connect': 'Conecta Conmigo',
    'footer.opportunities': 'Siempre abierto a nuevas oportunidades y colaboraciones',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.madeWith': 'Hecho con',

    // CV Generation
    'cv.download': 'Descargar CV',
    'cv.generating': 'Generando CV...',
    'cv.generated': 'CV Generado ✓',
    'cv.error': 'Error al generar',
    'cv.modal.title': 'Generar CV Personalizado',
    'cv.modal.format': 'Formato del CV',
    'cv.modal.language': 'Idioma',
    'cv.modal.generating': 'Generando tu CV personalizado...',
    'cv.modal.success': '¡CV generado exitosamente!',
    'cv.modal.error': 'Error al generar CV',
    'cv.modal.close': 'Cerrar',
    
    // Theme
    'theme.toggle': 'Cambiar tema',
    'theme.light': 'claro',
    'theme.dark': 'oscuro',
    
    // Language
    'language.spanish': 'Español',
    'language.english': 'English',
    'language.selector': 'Selector de idioma',
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    
    // Hero Section
    'hero.greeting': 'Hi, I\'m',
    'hero.role': 'Full Stack Developer',
    'hero.description': 'Specialized in C# and Python, creating robust and scalable solutions for modern enterprises.',
    'hero.cta.projects': 'View Projects',
    'hero.cta.contact': 'Contact',
    
    // About Section
    'about.title': 'About Me',
    'about.subtitle': 'Full Stack Developer & Software Architect specialized in complete solutions',
    'about.description': 'With experience in frontend, backend development and systems architecture, I specialize in creating complete and scalable solutions. My focus is on code quality and user experience.',
    'about.experience': 'Years of Experience',
    'about.cards.backend.title': 'Full Stack Developer',
    'about.cards.backend.description': 'Specialized in complete development with modern technologies like React, Node.js, C# and Python.',
    'about.cards.opensource.title': 'Open Source',
    'about.cards.opensource.description': 'Active contributor to open-source projects, creating solutions that make other developers\' lives easier.',
    'about.cards.performance.title': 'High Performance',
    'about.cards.performance.description': 'Passionate about developing high-performance solutions and smooth user experiences.',
    'about.cards.innovation.title': 'Innovation',
    'about.cards.innovation.description': 'Creator of applications and tools that improve development productivity and experience.',
    'about.story.title': 'My Story',
    'about.story.paragraph1': 'I\'m a passionate Full Stack developer with specialization in modern technologies. I love creating complete solutions that cover from frontend to backend.',
    'about.story.paragraph2': 'Currently I work with React, Next.js, TypeScript, C#, Python and databases. My focus is on creating scalable applications and contributing to innovative projects.',
    'about.languages.title': 'Currently Used Languages',
    'about.languages.subtitle': 'Development time distribution in my recent projects',
    'about.projects': 'Completed Projects',
    'about.technologies': 'Technologies Mastered',
    
    // Projects Section
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'A selection of my open-source projects and community contributions',
    'projects.view': 'View Project',
    'projects.code': 'View Code',
    'projects.github.button': 'View all my projects on GitHub',
    
    // Individual Projects
    'projects.items.orionis.title': 'Orionis Framework',
    'projects.items.orionis.description': 'Own Python framework for rapid enterprise application development',
    'projects.items.spellnumber.title': 'SpellNumber Laravel',
    'projects.items.spellnumber.description': 'Library to convert numbers to words in Laravel using PHP INTL',
    'projects.items.skeleton.title': 'Flaskavel Skeleton',
    'projects.items.skeleton.description': 'Framework skeleton for Python applications with robust and scalable architecture',
    
    // Skills Section
    'skills.title': 'Technical Skills',
    'skills.subtitle': 'Backend development specialist with experience in systems integration, high-performance APIs, and enterprise data architecture.',
    'skills.category.all': 'All',
    'skills.category.backend': 'Backend & APIs',
    'skills.category.frontend': 'Frontend & Mobile',
    'skills.category.database': 'Databases',
    'skills.experience.years': 'years of experience',
    'skills.expert.label': 'Expert',
    'skills.competence': 'Competence',
    'skills.specialization': 'Main Specialization',
    'skills.integration': 'Systems Integration',
    'skills.integration.desc': 'High tenancy projects with RAP and ORC, complex inter-system migration',
    'skills.apis': 'API Development',
    'skills.apis.desc': 'Robust APIs in .NET Core, FastAPI and Flask with high performance',
    'skills.framework': 'Orionis Framework',
    'skills.framework.desc': 'Own Python framework for rapid application development',
    
    // Skills Descriptions
    'skills.desc.default': 'Professional experience with this technology',
    'skills.desc.c': 'Enterprise application development and robust backend services',
    'skills.desc.netcore': 'Modern APIs and high-performance cross-platform applications',
    'skills.desc.aspnet': 'Scalable web applications and RESTful services',
    'skills.desc.python': 'Automation, data analysis and complex systems development',
    'skills.desc.fastapi': 'High-speed APIs with automatic documentation',
    'skills.desc.flask': 'Lightweight microservices and flexible web applications',
    'skills.desc.orionisframework': 'Own framework for rapid Python application development',
    'skills.desc.xamarin': 'Cross-platform native mobile applications',
    'skills.desc.netmaui': 'Modern multi-platform apps with .NET',
    'skills.desc.flutter': 'Beautiful and high-performance mobile interfaces',
    'skills.desc.sql': 'Relational database design and optimization',
    'skills.desc.plsql': 'Stored procedures and complex logic in Oracle',
    'skills.desc.oracledb': 'Administration and development in enterprise environments',
    'skills.desc.oracleapex': 'Rapid enterprise web application development',
    'skills.desc.datalakes': 'Architecture and management of large data volumes',
    'skills.desc.rap': 'High tenancy systems integration',
    'skills.desc.orc': 'Resource optimization and configuration',
    'skills.desc.backgroundworkers': 'Background services and asynchronous processing',
    'skills.desc.pythondaemons': 'Automated services and system monitoring',
    'skills.desc.datamigration': 'Secure data transfer between complex systems',
    'skills.desc.typescript': 'Typed JavaScript for scalable applications',
    'skills.desc.javascript': 'Interactive and dynamic frontend development',
    'skills.desc.angular': 'Robust web applications and reusable components',
    
    // Footer
    'footer.description': 'Full Stack Developer specialized in modern technologies. Creator of complete solutions and scalable application architecture.',
    'footer.quickLinks': 'Quick Links',
    'footer.connect': 'Connect With Me',
    'footer.opportunities': 'Always open to new opportunities and collaborations',
    'footer.rights': 'All rights reserved.',
    'footer.madeWith': 'Made with',

    // CV Generation
    'cv.download': 'Download CV',
    'cv.generating': 'Generating CV...',
    'cv.generated': 'CV Generated ✓',
    'cv.error': 'Generation Error',
    'cv.modal.title': 'Generate Custom CV',
    'cv.modal.format': 'CV Format',
    'cv.modal.language': 'Language',
    'cv.modal.generating': 'Generating your personalized CV...',
    'cv.modal.success': 'CV generated successfully!',
    'cv.modal.error': 'Error generating CV',
    'cv.modal.close': 'Close',
    
    // Theme
    'theme.toggle': 'Toggle theme',
    'theme.light': 'light',
    'theme.dark': 'dark',
    
    // Language
    'language.spanish': 'Español',
    'language.english': 'English',
    'language.selector': 'Language selector',
  }
} as const;

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es'); // Español por defecto
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log('🔧 LanguageProvider: Iniciando...');
    setMounted(true);
    
    // Detectar idioma del navegador o usar español por defecto
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    console.log('💾 Idioma guardado:', savedLanguage);
    
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      console.log('✅ Usando idioma guardado:', savedLanguage);
      setLanguage(savedLanguage);
    } else {
      // Siempre usar español como predeterminado
      console.log('🇪🇸 Estableciendo español como predeterminado');
      setLanguage('es');
      localStorage.setItem('preferred-language', 'es');
    }
  }, []);

  const handleLanguageChange = useCallback((newLanguage: Language) => {
    console.log(`🌍 Cambiando idioma de ${language} a ${newLanguage}`);
    setLanguage(newLanguage);
    localStorage.setItem('preferred-language', newLanguage);
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage: handleLanguageChange,
    t: (key: string) => {
      const currentTranslations = translations[language];
      const translation = (currentTranslations as Record<string, string>)[key] || key;
      console.log(`🔤 Traduciendo "${key}" (${language}):`, translation);
      return translation;
    },
    mounted
  }), [language, handleLanguageChange, mounted]);

  // Mostrar el estado del contexto
  useEffect(() => {
    console.log('📊 Estado del contexto:', { language, mounted });
  }, [language, mounted]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
