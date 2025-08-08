/**
 * ClientPDFGenerator - Genera CVs profesionales del lado del cliente
 * Diseño moderno de 2 columnas con elementos visuales elegantes
 */

import jsPDF from 'jspdf';

export interface CVData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    location: string;
    github: string;
    linkedin: string;
    description: string;
    personalBrand: string;
  };
  skills: Array<{
    name: string;
    level: number;
    category: string;
    experience: number;
    isExpert: boolean;
    icon: string;
  }>;
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    status: string;
    githubUrl?: string;
    liveUrl?: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    period: string;
    description: string;
    achievements: string[];
    technologies: string[];
  }>;
}

export interface CVOptions {
  format: 'modern' | 'classic' | 'minimal';
  language: 'es' | 'en';
  theme: 'light' | 'dark';
}

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  muted: string;
}

export class ClientPDFGenerator {
  private doc: jsPDF;
  private currentY: number = 0;
  private pageHeight: number = 280;
  private margin: number = 20;
  private rightColumnX: number = 120; // Para layout de 2 columnas
  private leftColumnWidth: number = 90;
  private rightColumnWidth: number = 70;

  constructor() {
    this.doc = new jsPDF('p', 'mm', 'a4');
  }

  async generateCV(data: CVData, options: CVOptions): Promise<Blob> {
    console.log('🎨 Generando CV profesional moderno:', options);

    try {
      // Configurar documento
      this.setupDocument(options);

      // Crear layout moderno de 2 columnas
      await this.createModernLayout(data, options);

      // Convertir a Blob para storage temporal
      const pdfBlob = this.doc.output('blob');
      console.log('✅ CV profesional generado exitosamente');
      
      return pdfBlob;

    } catch (error) {
      console.error('❌ Error generando CV:', error);
      throw new Error(`Error al generar CV: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  }

  private setupDocument(options: CVOptions): void {
    // Configurar metadatos del PDF
    this.doc.setProperties({
      title: `CV - Sebastián Arévalo - Profesional`,
      subject: 'Curriculum Vitae - Full Stack Developer',
      author: 'Sebastián Arévalo',
      creator: 'Portfolio Dynamic CV Generator',
      keywords: 'CV, Backend, Developer, C#, Python, <SA/>'
    });
  }

  private async createModernLayout(data: CVData, options: CVOptions): Promise<void> {
    const colors = this.getThemeColors(options);
    
    // 1. Header con banda de color
    this.addModernHeader(data.personalInfo, options, colors);
    
    // 2. Columna izquierda (información personal y skills)
    this.currentY = 50;
    this.addPersonalInfo(data.personalInfo, options, colors);
    this.addSkillsCompact(data.skills, options, colors);
    
    // 3. Columna derecha (experiencia y proyectos)  
    this.currentY = 50;
    this.addExperienceModern(data.experience, options, colors);
    this.addProjectsModern(data.projects, options, colors);
    
    // 4. Footer elegante
    this.addModernFooter(options, colors);
  }

  private addModernHeader(personalInfo: CVData['personalInfo'], options: CVOptions, colors: ThemeColors): void {
    // Banda superior con color
    this.doc.setFillColor(colors.primary);
    this.doc.rect(0, 0, 210, 40, 'F');
    
    // Nombre principal en blanco
    this.doc.setFontSize(32);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(255, 255, 255);
    this.doc.text(personalInfo.name, this.margin, 20);
    
    // Marca personal <SA/> 
    this.doc.setFontSize(14);
    this.doc.setTextColor(colors.accent);
    this.doc.text(personalInfo.personalBrand, 160, 20);
    
    // Título profesional en blanco
    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setTextColor(255, 255, 255);
    this.doc.text(personalInfo.title, this.margin, 30);
    
    // Línea decorativa
    this.doc.setDrawColor(colors.accent);
    this.doc.setLineWidth(2);
    this.doc.line(this.margin, 35, 190, 35);
  }

  private addPersonalInfo(personalInfo: CVData['personalInfo'], options: CVOptions, colors: ThemeColors): void {
    // Título de sección con icono
    this.addSectionTitleLeft('👤 ' + (options.language === 'es' ? 'Información Personal' : 'Personal Info'), colors);
    
    const contactItems = [
      { icon: '📧', text: personalInfo.email },
      { icon: '📍', text: personalInfo.location },
      { icon: '🔗', text: personalInfo.github.replace('github.com/', '') },
      { icon: '💼', text: personalInfo.linkedin.replace('linkedin.com/in/', '') }
    ];
    
    this.doc.setFontSize(9);
    this.doc.setFont('helvetica', 'normal');
    
    contactItems.forEach(item => {
      this.doc.setTextColor(colors.accent);
      this.doc.text(item.icon, this.margin, this.currentY);
      this.doc.setTextColor(colors.text);
      this.doc.text(item.text, this.margin + 8, this.currentY);
      this.currentY += 5;
    });
    
    this.currentY += 5;
    
    // Resumen profesional
    this.addSectionTitleLeft('📝 ' + (options.language === 'es' ? 'Resumen' : 'Summary'), colors);
    
    this.doc.setFontSize(9);
    this.doc.setTextColor(colors.text);
    const summaryLines = this.doc.splitTextToSize(personalInfo.description, 85);
    this.doc.text(summaryLines, this.margin, this.currentY);
    this.currentY += summaryLines.length * 4 + 8;
  }

  private addSkillsCompact(skills: CVData['skills'], options: CVOptions, colors: ThemeColors): void {
    this.addSectionTitleLeft('⚡ ' + (options.language === 'es' ? 'Habilidades' : 'Skills'), colors);
    
    // Agrupar skills por categoría
    const skillsByCategory = this.groupSkillsByCategory(skills);
    
    Object.entries(skillsByCategory).forEach(([category, categorySkills]) => {
      // Título de categoría
      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'bold');
      this.doc.setTextColor(colors.secondary);
      this.doc.text(this.translateCategory(category, options.language), this.margin, this.currentY);
      this.currentY += 5;
      
      // Skills con barras de progreso
      categorySkills.slice(0, 4).forEach(skill => {
        this.doc.setFontSize(8);
        this.doc.setFont('helvetica', 'normal');
        this.doc.setTextColor(colors.text);
        this.doc.text(skill.name, this.margin + 2, this.currentY);
        
        // Barra de progreso
        const barWidth = 40;
        const barHeight = 2;
        const barX = this.margin + 2;
        const barY = this.currentY + 1;
        
        // Fondo de la barra
        this.doc.setFillColor(230, 230, 230);
        this.doc.rect(barX, barY, barWidth, barHeight, 'F');
        
        // Progreso de la barra
        const progressWidth = (barWidth * skill.level) / 100;
        this.doc.setFillColor(colors.primary);
        this.doc.rect(barX, barY, progressWidth, barHeight, 'F');
        
        // Porcentaje
        this.doc.setFontSize(7);
        this.doc.setTextColor(colors.muted);
        this.doc.text(`${skill.level}%`, barX + barWidth + 2, this.currentY);
        
        this.currentY += 6;
      });
      
      this.currentY += 3;
    });
  }

  private addExperienceModern(experience: CVData['experience'], options: CVOptions, colors: ThemeColors): void {
    this.addSectionTitleRight('💼 ' + (options.language === 'es' ? 'Experiencia' : 'Experience'), colors);
    
    experience.slice(0, 3).forEach(exp => {
      // Empresa y posición
      this.doc.setFontSize(11);
      this.doc.setFont('helvetica', 'bold');
      this.doc.setTextColor(colors.secondary);
      this.doc.text(exp.position, this.rightColumnX, this.currentY);
      this.currentY += 5;
      
      // Empresa y período
      this.doc.setFontSize(9);
      this.doc.setFont('helvetica', 'normal');
      this.doc.setTextColor(colors.primary);
      this.doc.text(`${exp.company} • ${exp.period}`, this.rightColumnX, this.currentY);
      this.currentY += 5;
      
      // Descripción breve
      this.doc.setFontSize(8);
      this.doc.setTextColor(colors.text);
      const descLines = this.doc.splitTextToSize(exp.description, 75);
      this.doc.text(descLines, this.rightColumnX, this.currentY);
      this.currentY += descLines.length * 3.5;
      
      // Logros principales (máximo 2)
      exp.achievements.slice(0, 2).forEach((achievement: string) => {
        this.doc.setFontSize(8);
        this.doc.setTextColor(colors.accent);
        this.doc.text('▸', this.rightColumnX, this.currentY);
        this.doc.setTextColor(colors.text);
        const achLines = this.doc.splitTextToSize(achievement, 70);
        this.doc.text(achLines, this.rightColumnX + 3, this.currentY);
        this.currentY += achLines.length * 3.5;
      });
      
      this.currentY += 5;
    });
  }

  private addProjectsModern(projects: CVData['projects'], options: CVOptions, colors: ThemeColors): void {
    this.addSectionTitleRight('🚀 ' + (options.language === 'es' ? 'Proyectos' : 'Projects'), colors);
    
    projects.slice(0, 4).forEach(project => {
      // Título del proyecto
      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'bold');
      this.doc.setTextColor(colors.secondary);
      this.doc.text(project.title, this.rightColumnX, this.currentY);
      this.currentY += 4;
      
      // Descripción
      this.doc.setFontSize(8);
      this.doc.setFont('helvetica', 'normal');
      this.doc.setTextColor(colors.text);
      const descLines = this.doc.splitTextToSize(project.description, 75);
      this.doc.text(descLines, this.rightColumnX, this.currentY);
      this.currentY += descLines.length * 3.5;
      
      // Tecnologías principales (máximo 4)
      const mainTechs = project.technologies.slice(0, 4);
      this.doc.setFontSize(7);
      this.doc.setTextColor(colors.primary);
      this.doc.text(`🛠️ ${mainTechs.join(' • ')}`, this.rightColumnX, this.currentY);
      this.currentY += 6;
    });
  }

  private addModernFooter(options: CVOptions, colors: ThemeColors): void {
    // Línea decorativa inferior
    this.doc.setDrawColor(colors.primary);
    this.doc.setLineWidth(1);
    this.doc.line(this.margin, 270, 190, 270);
    
    // Texto del footer
    this.doc.setFontSize(7);
    this.doc.setFont('helvetica', 'italic');
    this.doc.setTextColor(colors.muted);
    
    const footerText = options.language === 'es' 
      ? `CV generado dinámicamente • ${new Date().toLocaleDateString('es-ES')}`
      : `Dynamically generated CV • ${new Date().toLocaleDateString('en-US')}`;
    
    this.doc.text(footerText, this.margin, 275);
    
    // Marca personal en el footer
    this.doc.setTextColor(colors.accent);
    this.doc.text('<SA/>', 175, 275);
  }

  private addSectionTitleLeft(title: string, colors: ThemeColors): void {
    this.doc.setFontSize(11);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(colors.primary);
    this.doc.text(title, this.margin, this.currentY);
    this.currentY += 7;
    
    // Línea decorativa corta
    this.doc.setDrawColor(colors.accent);
    this.doc.setLineWidth(0.5);
    this.doc.line(this.margin, this.currentY - 2, this.margin + 80, this.currentY - 2);
    this.currentY += 2;
  }

  private addSectionTitleRight(title: string, colors: ThemeColors): void {
    this.doc.setFontSize(11);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(colors.primary);
    this.doc.text(title, this.rightColumnX, this.currentY);
    this.currentY += 7;
    
    // Línea decorativa corta
    this.doc.setDrawColor(colors.accent);
    this.doc.setLineWidth(0.5);
    this.doc.line(this.rightColumnX, this.currentY - 2, this.rightColumnX + 70, this.currentY - 2);
    this.currentY += 2;
  }

  private groupSkillsByCategory(skills: CVData['skills']): Record<string, CVData['skills']> {
    return skills.reduce((acc: Record<string, CVData['skills']>, skill) => {
      const category = skill.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {});
  }

  private translateCategory(category: string, language: string): string {
    const translations: Record<string, Record<string, string>> = {
      es: {
        backend: 'Backend & APIs',
        frontend: 'Frontend & UI',
        database: 'Bases de Datos',
        ocr: 'OCR & Visión Computacional'
      },
      en: {
        backend: 'Backend & APIs',
        frontend: 'Frontend & UI',
        database: 'Databases',
        ocr: 'OCR & Computer Vision'
      }
    };
    
    return translations[language]?.[category] || category;
  }

  private getThemeColors(_options: CVOptions): ThemeColors {
    // Paleta de colores profesional y moderna
    return {
      primary: '#2563EB',     // Blue-600 - Color principal elegante
      secondary: '#374151',   // Gray-700 - Texto secundario
      accent: '#EC4899',      // Pink-500 - Para acentos y marca personal
      text: '#111827',        // Gray-900 - Texto principal
      muted: '#6B7280'        // Gray-500 - Texto tenue
    };
  }
}
