// Información personal de Sebastián Arévalo
import { PersonalInfo, Project, Skill, Experience } from "@/types";
import { DataObfuscator } from "@/lib/obfuscator";

// Datos sensibles ofuscados (solo en producción)
const PROTECTED_EMAIL = process.env.NODE_ENV === 'production' 
  ? 'bW9jLmxpYW1nQHplbW9nLm9sYXZlcmEubnNhdHNlYnNfNTIwMl9vaWxhdHJvcA==' 
  : 'jarevalo.gomez@gmail.com';

const PROTECTED_GITHUB = process.env.NODE_ENV === 'production'
  ? 'b2djbS9odWJpdGcvLzpzcHR0aF81MjAyX29pbGF0cm9w'
  : 'https://github.com/mcalgo';

const PROTECTED_LINKEDIN = process.env.NODE_ENV === 'production'
  ? 'MDYxLTk2NDExL3plbW9nLW9sYXZlcmEtbnNhdHNlYnMtbnVhai9uaS5uaWRla25pbC53d3cvLzpzcHR0aF81MjAyX29pbGF0cm9w'
  : 'https://www.linkedin.com/in/juan-sebastian-arevalo-gomez-631469160/';

export const personalInfo: PersonalInfo = {
  name: "Sebastián Arévalo",
  title: "Full Stack Developer & Software Architect",
  description: "Desarrollador Full Stack especializado en crear soluciones completas y escalables. Apasionado por las tecnologías modernas y contribuir a proyectos innovadores.",
  email: PROTECTED_EMAIL,
  location: "Colombia",
  avatarUrl: "https://avatars.githubusercontent.com/u/37521274?v=4",
  resumeUrl: "/cv/CV_Sebastian_Arevalo.pdf",
  socialLinks: [
    {
      id: "github",
      name: "GitHub",
      url: PROTECTED_GITHUB,
      icon: "Github"
    },
    {
      id: "linkedin", 
      name: "LinkedIn",
      url: PROTECTED_LINKEDIN,
      icon: "Linkedin"
    }
  ]
};

// Proyectos destacados basados en tu GitHub
export const featuredProjects: Project[] = [
  {
    id: "orionis",
    title: "Orionis Framework",
    description: "Framework propio en Python para desarrollo rápido de aplicaciones empresariales",
    image: "/images/projects/orionis.jpg",
    technologies: ["Python", "Framework", "Web"],
    githubUrl: "https://github.com/mcalgo/orionis",
    featured: true,
    category: "backend",
    status: "completed",
    createdAt: "2024-05-01"
  },
  {
    id: "spellnumber",
    title: "SpellNumber Laravel",
    description: "Librería para convertir números a palabras en Laravel usando PHP INTL",
    image: "/images/projects/spellnumber.jpg",
    technologies: ["PHP", "Laravel", "INTL"],
    githubUrl: "https://github.com/mcalgo/SpellNumber",
    featured: true,
    category: "backend",
    status: "completed",
    createdAt: "2024-02-01"
  },
  {
    id: "skeleton",
    title: "Flaskavel Skeleton",
    description: "Framework skeleton para aplicaciones Python con arquitectura robusta",
    image: "/images/projects/skeleton.jpg",
    technologies: ["Python", "Flask", "Framework"],
    githubUrl: "https://github.com/mcalgo/skeleton",
    featured: true,
    category: "backend",
    status: "completed",
    createdAt: "2024-01-01"
  }
];

// Habilidades técnicas basadas en tu experiencia profesional
export const skills: Skill[] = [
  // Backend & APIs
  {
    id: "csharp",
    name: "C#",
    level: 90,
    category: "backend",
    icon: "💙"
  },
  {
    id: "dotnet-core",
    name: ".NET Core",
    level: 88,
    category: "backend",
    icon: "🔷"
  },
  {
    id: "aspnet",
    name: "ASP.NET",
    level: 85,
    category: "frontend",
    icon: "🌐"
  },
  {
    id: "python",
    name: "Python",
    level: 90,
    category: "backend",
    icon: "🐍"
  },
  {
    id: "fastapi",
    name: "FastAPI",
    level: 85,
    category: "backend",
    icon: "⚡"
  },
  {
    id: "flask",
    name: "Flask",
    level: 80,
    category: "backend",
    icon: "🌶️"
  },
  {
    id: "orionis",
    name: "Orionis Framework",
    level: 95,
    category: "backend",
    icon: "🚀"
  },
  {
    id: "rap",
    name: "RAP",
    level: 85,
    category: "backend",
    icon: "🔄"
  },
  {
    id: "ocr",
    name: "OCR",
    level: 80,
    category: "backend",
    icon: "🖼️"
  },
  {
    id: "workers",
    name: "Background Workers",
    level: 88,
    category: "backend",
    icon: "⚙️"
  },
  {
    id: "demons",
    name: "Python Daemons",
    level: 85,
    category: "backend",
    icon: "👹"
  },
  {
    id: "migrations",
    name: "Data Migration",
    level: 90,
    category: "backend",
    icon: "📦"
  },
  
  // Mobile Development
  {
    id: "xamarin",
    name: "Xamarin",
    level: 75,
    category: "frontend",
    icon: "📱"
  },
  {
    id: "maui",
    name: ".NET MAUI",
    level: 70,
    category: "frontend",
    icon: "📲"
  },
  {
    id: "flutter",
    name: "Flutter",
    level: 70,
    category: "frontend",
    icon: "🦋"
  },
  
  // Database & Data Management
  {
    id: "sql",
    name: "SQL",
    level: 92,
    category: "database",
    icon: "🗄️"
  },
  {
    id: "plsql",
    name: "PL/SQL",
    level: 88,
    category: "database",
    icon: "📊"
  },
  {
    id: "oracle",
    name: "Oracle DB",
    level: 85,
    category: "database",
    icon: "🏛️"
  },
  {
    id: "oracle-apex",
    name: "Oracle APEX",
    level: 80,
    category: "database",
    icon: "⚡"
  },
  {
    id: "datalakes",
    name: "Data Lakes",
    level: 75,
    category: "database",
    icon: "🌊"
  },
  
  // Frontend
  {
    id: "typescript",
    name: "TypeScript",
    level: 80,
    category: "frontend",
    icon: "📘"
  },
  {
    id: "javascript",
    name: "JavaScript",
    level: 85,
    category: "frontend",
    icon: "💛"
  },
  {
    id: "angular",
    name: "Angular",
    level: 75,
    category: "frontend",
    icon: "🅰️"
  }
];

// Experiencia laboral basada en tu perfil profesional
export const experience: Experience[] = [
  {
    id: "senior-backend",
    company: "CCL",
    position: "Senior Backend Developer",
    startDate: "2023-01-01",
    description: "Especialista en desarrollo backend y arquitectura de sistemas de alta tenencia con enfoque en integración y migración de datos.",
    technologies: ["C#", ".NET Core", "Python", "FastAPI", "Flask", "Oracle", "SQL Server"],
    achievements: [
      "Desarrollo de proyectos de integración de alta tenencia con RAP y OCR",
      "Creación de APIs robustas en múltiples frameworks (.NET Core, FastAPI, Flask)",
      "Implementación de workers y servicios en segundo plano",
      "Desarrollo de daemons en Python para automatización",
      "Gestión de Data Lakes y migraciones complejas entre sistemas",
      "Desarrollo avanzado en Oracle con PL/SQL y APEX",
      "Creación del framework Orionis en Python",
      "Desarrollo móvil con Xamarin, MAUI y Flutter"
    ]
  }
];
