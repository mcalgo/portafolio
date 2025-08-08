// Tipos principales para el portafolio

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: 'frontend' | 'backend' | 'mobile' | 'fullstack' | 'library' | 'tool' | 'framework';
  status: 'completed' | 'in-progress' | 'planned';
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-100
  category: 'frontend' | 'backend' | 'database' | 'tools';
  icon?: string;
  experience?: number; // años de experiencia
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface Navigation {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  email: string;
  location: string;
  avatarUrl: string;
  resumeUrl?: string;
  socialLinks: SocialLink[];
}
