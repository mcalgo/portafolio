/**
 * useCVGeneration - Hook para generar CVs del lado del cliente
 * Maneja generación de PDFs con almacenamiento temporal
 */

import { useState } from 'react';
import { ClientPDFGenerator, CVData, CVOptions } from '@/lib/ClientPDFGenerator';
import { tempStorage } from '@/lib/TempStorageManager';

export interface CVGenerationOptions {
  format: 'modern' | 'classic' | 'minimal';
  includeProjects: boolean;
  includeSkills: boolean;
  includeExperience: boolean;
  language: 'es' | 'en';
  theme: 'light' | 'dark';
}

export interface CVGenerationResult {
  success: boolean;
  tempId?: string;
  downloadUrl?: string;
  filename?: string;
  error?: string;
  metadata: {
    generatedAt: Date;
    format: string;
    skillsCount: number;
    projectsCount: number;
    experienceCount: number;
    fileSize: string;
  };
}

export interface CVGenerationState {
  isGenerating: boolean;
  progress: number;
  status: 'idle' | 'preparing' | 'generating' | 'storing' | 'ready' | 'downloading' | 'error';
  result: CVGenerationResult | null;
  error: string | null;
}

export function useCVGeneration() {
  const [state, setState] = useState<CVGenerationState>({
    isGenerating: false,
    progress: 0,
    status: 'idle',
    result: null,
    error: null
  });

  const generateCV = async (options: CVGenerationOptions): Promise<boolean> => {
    try {
      setState(prev => ({
        ...prev,
        isGenerating: true,
        progress: 0,
        status: 'preparing',
        error: null
      }));

      console.log('🚀 Iniciando generación de CV del lado del cliente');

      // Simular progreso de preparación
      setState(prev => ({ ...prev, progress: 20, status: 'preparing' }));

      // Preparar datos del CV
      const cvData = prepareCVData(options);

      setState(prev => ({ ...prev, progress: 40, status: 'generating' }));

      // Generar PDF del lado del cliente
      const pdfGenerator = new ClientPDFGenerator();
      const cvOptions: CVOptions = {
        format: options.format,
        language: options.language,
        theme: options.theme
      };

      const pdfBlob = await pdfGenerator.generateCV(cvData, cvOptions);

      setState(prev => ({
        ...prev,
        progress: 80,
        status: 'storing'
      }));

      // Almacenar temporalmente
      const filename = generateFilename(options);
      const tempId = tempStorage.store(pdfBlob, filename);

      // Crear URL de descarga
      const downloadUrl = tempStorage.createDownloadUrl(tempId);

      if (!downloadUrl) {
        throw new Error('No se pudo crear URL de descarga');
      }

      const result: CVGenerationResult = {
        success: true,
        tempId,
        downloadUrl,
        filename,
        metadata: {
          generatedAt: new Date(),
          format: options.format,
          skillsCount: cvData.skills.length,
          projectsCount: cvData.projects.length,
          experienceCount: cvData.experience.length,
          fileSize: formatFileSize(pdfBlob.size)
        }
      };

      setState(prev => ({
        ...prev,
        progress: 100,
        status: 'ready',
        isGenerating: false,
        result
      }));

      console.log('✅ CV generado exitosamente del lado del cliente');
      return true;

    } catch (error) {
      console.error('❌ Error generando CV:', error);
      
      setState(prev => ({
        ...prev,
        isGenerating: false,
        progress: 0,
        status: 'error',
        error: error instanceof Error ? error.message : 'Error desconocido'
      }));

      return false;
    }
  };

  const downloadCV = async (): Promise<boolean> => {
    if (!state.result?.tempId) {
      console.error('❌ No hay CV disponible para descargar');
      return false;
    }

    try {
      setState(prev => ({ ...prev, status: 'downloading' }));
      
      console.log('🔄 Intentando descargar CV con ID:', state.result.tempId);
      
      // Usar el storage temporal para forzar descarga de forma síncrona
      const success = tempStorage.forceDownload(state.result.tempId);
      
      if (success) {
        console.log('✅ Descarga iniciada exitosamente');
        setState(prev => ({ ...prev, status: 'ready' }));
        return true;
      } else {
        console.error('❌ TempStorage.forceDownload retornó false');
        throw new Error('No se pudo iniciar la descarga - Archivo no encontrado en storage');
      }

    } catch (error) {
      console.error('❌ Error descargando CV:', error);
      setState(prev => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'Error en descarga'
      }));
      return false;
    }
  };

  const resetState = () => {
    setState({
      isGenerating: false,
      progress: 0,
      status: 'idle',
      result: null,
      error: null
    });
  };

  const getStorageStats = () => {
    return tempStorage.getStats();
  };

  const clearTempStorage = () => {
    tempStorage.clearAll();
    resetState();
  };

  return {
    ...state,
    generateCV,
    downloadCV,
    resetState,
    getStorageStats,
    clearTempStorage
  };
}

// Funciones helper
function prepareCVData(options: CVGenerationOptions): CVData {
  return {
    personalInfo: getPersonalInfo(options.language),
    skills: options.includeSkills ? getMockSkills() : [],
    projects: options.includeProjects ? getMockProjects() : [],
    experience: options.includeExperience ? getMockExperience() : []
  };
}

function generateFilename(options: CVGenerationOptions): string {
  const timestamp = new Date().toISOString().slice(0, 10);
  const formatSuffix = options.format;
  const langSuffix = options.language;
  return `sebastian-arevalo-cv-${formatSuffix}-${langSuffix}-${timestamp}.pdf`;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0KB';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + sizes[i];
}

function getPersonalInfo(language: 'es' | 'en') {
  return {
    name: 'Sebastián Arévalo',
    title: language === 'es' ? 'Desarrollador Full Stack & Arquitecto de Software' : 'Full Stack Developer & Software Architect',
    email: 'sebastian.arevalo@example.com',
    location: language === 'es' ? 'Colombia' : 'Colombia',
    github: 'github.com/sebastian-arevalo',
    linkedin: 'linkedin.com/in/sebastian-arevalo',
    personalBrand: '<SA/>',
    description: language === 'es' 
      ? 'Desarrollador Full Stack con sólida experiencia en backend, frontend y arquitectura de software. Especializado en crear soluciones escalables, desde APIs robustas hasta interfaces de usuario modernas. Experiencia en múltiples tecnologías y capacidad para liderar proyectos end-to-end.'
      : 'Full Stack Developer with strong experience in backend, frontend and software architecture. Specialized in creating scalable solutions, from robust APIs to modern user interfaces. Experience in multiple technologies and ability to lead end-to-end projects.'
  };
}

function getMockSkills() {
  return [
    // Backend & APIs
    { name: 'C#', level: 95, category: 'backend', experience: 5, isExpert: true, icon: '🔷' },
    { name: 'Python', level: 90, category: 'backend', experience: 4, isExpert: true, icon: '🐍' },
    { name: 'Node.js', level: 88, category: 'backend', experience: 3, isExpert: false, icon: '🟢' },
    { name: '.NET Core', level: 93, category: 'backend', experience: 5, isExpert: true, icon: '🔷' },
    { name: 'REST APIs', level: 96, category: 'backend', experience: 5, isExpert: true, icon: '🔗' },
    { name: 'Docker', level: 85, category: 'backend', experience: 3, isExpert: false, icon: '🐳' },
    { name: 'Azure', level: 82, category: 'backend', experience: 3, isExpert: false, icon: '☁️' },
    { name: 'Git', level: 92, category: 'backend', experience: 5, isExpert: true, icon: '📝' },
    { name: 'VS Code', level: 95, category: 'backend', experience: 5, isExpert: true, icon: '💙' },
    
    // Frontend & UI
    { name: 'React', level: 85, category: 'frontend', experience: 3, isExpert: false, icon: '⚛️' },
    { name: 'Next.js', level: 82, category: 'frontend', experience: 2, isExpert: false, icon: '▲' },
    { name: 'TypeScript', level: 88, category: 'frontend', experience: 3, isExpert: false, icon: '🔷' },
    { name: 'JavaScript', level: 90, category: 'frontend', experience: 4, isExpert: true, icon: '🟨' },
    { name: 'Tailwind CSS', level: 85, category: 'frontend', experience: 2, isExpert: false, icon: '🎨' },
    
    // Database
    { name: 'SQL Server', level: 88, category: 'database', experience: 5, isExpert: false, icon: '🗄️' },
    { name: 'PostgreSQL', level: 85, category: 'database', experience: 3, isExpert: false, icon: '🐘' },
    { name: 'MongoDB', level: 82, category: 'database', experience: 2, isExpert: false, icon: '🍃' },
    
    // OCR & Computer Vision
    { name: 'OCR', level: 78, category: 'ocr', experience: 2, isExpert: false, icon: '👁️' },
    { name: 'Computer Vision', level: 75, category: 'ocr', experience: 2, isExpert: false, icon: '🔍' }
  ];
}

function getMockProjects() {
  return [
    {
      title: 'Portafolio Personal Moderno',
      description: 'Portafolio web desarrollado con Next.js 15, TypeScript y Tailwind CSS. Incluye generación dinámica de CV y animaciones fluidas.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      status: 'completed',
      githubUrl: 'https://github.com/sebastian-arevalo/portfolio',
      liveUrl: 'https://sebastian-arevalo.github.io'
    },
    {
      title: 'Sistema de Gestión Empresarial',
      description: 'API REST completa para gestión de recursos empresariales con arquitectura de microservicios y panel de administración.',
      technologies: ['C#', '.NET Core', 'React', 'SQL Server', 'Docker'],
      status: 'completed',
      githubUrl: 'https://github.com/sebastian-arevalo/erp-system',
      liveUrl: 'https://erp-demo.com'
    },
    {
      title: 'Plataforma de E-commerce Full Stack',
      description: 'Tienda online completa con backend Python, frontend React y integración de pagos. Incluye panel de administración.',
      technologies: ['Python', 'Flask', 'React', 'PostgreSQL', 'Stripe'],
      status: 'completed',
      githubUrl: 'https://github.com/sebastian-arevalo/ecommerce-platform'
    },
    {
      title: 'Chat en Tiempo Real',
      description: 'Aplicación de chat con WebSockets, autenticación JWT y notificaciones push. Frontend y backend completamente funcional.',
      technologies: ['Node.js', 'Socket.io', 'React', 'MongoDB', 'JWT'],
      status: 'completed',
      githubUrl: 'https://github.com/sebastian-arevalo/realtime-chat'
    },
    {
      title: 'Dashboard de Analytics',
      description: 'Panel de control con gráficos interactivos, filtros avanzados y exportación de reportes. Conectado a múltiples APIs.',
      technologies: ['React', 'Chart.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
      status: 'completed',
      githubUrl: 'https://github.com/sebastian-arevalo/analytics-dashboard'
    },
    {
      title: 'API de Gestión de Tareas',
      description: 'Sistema completo de gestión de tareas con autenticación, roles de usuario y notificaciones. Documentación con Swagger.',
      technologies: ['C#', '.NET Core', 'Entity Framework', 'JWT', 'Swagger'],
      status: 'completed',
      githubUrl: 'https://github.com/sebastian-arevalo/task-management-api'
    }
  ];
}

function getMockExperience() {
  return [
    {
      company: 'TechCorp Solutions',
      position: 'Full Stack Developer Senior',
      period: '2022 - Presente',
      description: 'Desarrollo end-to-end de aplicaciones web modernas. Liderazgo técnico en proyectos de migración y modernización de sistemas legacy.',
      achievements: [
        'Desarrolló 3 aplicaciones web completas (frontend + backend + base de datos)',
        'Implementó arquitectura de microservicios que redujo costos operativos en 30%',
        'Lideró migración de sistemas legacy a tecnologías modernas (React + .NET Core)',
        'Mentorizó equipo de 4 desarrolladores en metodologías ágiles y mejores prácticas'
      ],
      technologies: ['C#', '.NET Core', 'React', 'TypeScript', 'Azure', 'SQL Server', 'Docker']
    },
    {
      company: 'StartupInnovate',
      position: 'Desarrollador Full Stack',
      period: '2020 - 2022',
      description: 'Desarrollo completo de plataforma de e-commerce desde cero. Responsable de frontend, backend, base de datos y deployment.',
      achievements: [
        'Construyó plataforma completa que maneja 15,000+ usuarios activos',
        'Desarrolló panel de administración con React y dashboard de analytics',
        'Implementó integración con múltiples pasarelas de pago (Stripe, PayU)',
        'Optimizó performance de aplicación reduciendo tiempo de carga en 60%',
        'Configuró CI/CD automatizado con GitHub Actions y AWS'
      ],
      technologies: ['Python', 'Flask', 'React', 'JavaScript', 'PostgreSQL', 'Redis', 'AWS']
    },
    {
      company: 'FreelanceProjects',
      position: 'Desarrollador Full Stack Freelance',
      period: '2019 - 2020',
      description: 'Desarrollo de múltiples proyectos web para diferentes clientes. Desde landing pages hasta sistemas complejos de gestión.',
      achievements: [
        'Completó 12+ proyectos web exitosos para diferentes industrias',
        'Desarrolló sistemas de gestión para restaurantes, clínicas y tiendas',
        'Creó sitios web corporativos con CMS personalizado',
        'Mantuvo 95% de satisfacción del cliente con entregas a tiempo'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'WordPress', 'Bootstrap']
    }
  ];
}
