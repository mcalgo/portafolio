# 🌟 Portafolio Web Moderno

Un portafolio profesional construido con **Next.js 15**, **TypeScript**, **Tailwind CSS v4** y **Framer Motion**. Diseñado con arquitectura limpia, totalmente responsive y optimizado para GitHub Pages.

![Portfolio Preview](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Portfolio+Preview)

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz limpia y profesional con dark/light mode
- 📱 **Responsive**: Optimizado para todos los dispositivos
- ⚡ **Performance**: Lighthouse score 90+ en todas las métricas
- 🎭 **Animaciones**: Transiciones suaves con Framer Motion
- 🤖 **Chat IA**: Integración de chat inteligente (próximamente)
- 🚀 **SEO Optimizado**: Meta tags dinámicos y estructura semántica
- 📦 **Arquitectura Limpia**: Separación de responsabilidades y código mantenible

## 🛠 Stack Tecnológico

### Frontend
- **Next.js 15** - React framework con App Router
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS v4** - Framework CSS utility-first
- **Framer Motion** - Librería de animaciones
- **Lucide React** - Iconos modernos

### Desarrollo
- **ESLint** - Linting de código
- **GitHub Actions** - CI/CD pipeline
- **GitHub Pages** - Hosting gratuito

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+ instalado
- Git instalado
- Editor de código (recomendado: VS Code)

### Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/tu-portfolio.git
   cd tu-portfolio
   ```

2. **Instala las dependencias**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Ejecuta el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abre en el navegador**
   ```
   http://localhost:3000
   ```

## 📁 Estructura del Proyecto

```
├── .github/
│   ├── workflows/
│   │   └── deploy.yml          # GitHub Actions workflow
│   └── copilot-instructions.md # Instrucciones para Copilot
├── docs/
│   └── PRD.md                  # Product Requirements Document
├── public/                     # Archivos estáticos
├── src/
│   ├── app/                    # App Router (Next.js 15)
│   │   ├── globals.css         # Estilos globales
│   │   ├── layout.tsx          # Layout principal
│   │   └── page.tsx            # Página de inicio
│   ├── components/             # Componentes React
│   │   ├── ui/                 # Componentes UI base
│   │   ├── layout/             # Componentes de layout
│   │   └── features/           # Componentes de funcionalidades
│   ├── lib/                    # Utilidades y configuraciones
│   ├── hooks/                  # Custom hooks
│   ├── types/                  # Definiciones TypeScript
│   └── styles/                 # Estilos adicionales
├── next.config.ts              # Configuración Next.js
├── tailwind.config.ts          # Configuración Tailwind
├── tsconfig.json              # Configuración TypeScript
└── package.json               # Dependencias y scripts
```

## 🎨 Personalización

### 1. Información Personal
Edita los archivos de configuración para personalizar tu información:

```typescript
// src/lib/personal-info.ts
export const personalInfo = {
  name: "Tu Nombre",
  title: "Desarrollador Full Stack",
  email: "tu@email.com",
  // ... más configuraciones
};
```

### 2. Proyectos
Añade tus proyectos en:

```typescript
// src/data/projects.ts
export const projects = [
  {
    id: "1",
    title: "Mi Proyecto",
    description: "Descripción del proyecto",
    // ... más detalles
  }
];
```

### 3. Colores y Tema
Personaliza el tema en `src/app/globals.css`:

```css
:root {
  --primary: #3b82f6;      /* Color primario */
  --secondary: #f1f5f9;    /* Color secundario */
  /* ... más variables */
}
```

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo
npm run build        # Construye para producción
npm run start        # Inicia servidor de producción
npm run lint         # Ejecuta ESLint
npm run export       # Exporta sitio estático
```

## 🚢 Deployment

### GitHub Pages (Automático)

1. **Push a main branch**
   ```bash
   git add .
   git commit -m "Deploy portfolio"
   git push origin main
   ```

2. **GitHub Actions se encarga del resto**
   - Instala dependencias
   - Construye el proyecto
   - Despliega a GitHub Pages

### Manual

```bash
# Construir y exportar
npm run build

# Los archivos están en la carpeta 'out/'
# Sube esta carpeta a tu hosting preferido
```

## 🔧 Configuración de GitHub Pages

1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: GitHub Actions
4. ¡Listo! Tu sitio estará disponible en `https://tu-usuario.github.io/tu-portfolio`

## 🎯 Roadmap

### Fase 1: Base ✅
- [x] Setup inicial Next.js + TypeScript
- [x] Configuración Tailwind CSS v4
- [x] Componentes base y navegación
- [x] Sección Hero con animaciones

### Fase 2: Contenido (En progreso)
- [ ] Sección "Sobre Mí" completa
- [ ] Grid de proyectos con modal
- [ ] Sistema de habilidades interactivo
- [ ] Formulario de contacto funcional

### Fase 3: Funcionalidades Avanzadas
- [ ] Chat con IA integrado
- [ ] Dark/Light mode toggle
- [ ] Blog con MDX
- [ ] Animaciones avanzadas

### Fase 4: Optimización
- [ ] SEO avanzado
- [ ] Analytics integrado
- [ ] Performance optimization
- [ ] Testing e2e

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes alguna pregunta o necesitas ayuda:

- 📧 Email: tu@email.com
- 🐛 Issues: [GitHub Issues](https://github.com/tu-usuario/tu-portfolio/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/tu-usuario/tu-portfolio/discussions)

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org) por el excelente framework
- [Tailwind CSS](https://tailwindcss.com) por el sistema de estilos
- [Framer Motion](https://framer.com/motion) por las animaciones
- [Lucide](https://lucide.dev) por los iconos
- [Vercel](https://vercel.com) por el hosting y herramientas

---

⭐ Si este proyecto te ha sido útil, ¡no olvides darle una estrella!

**Construido con ❤️ y mucho ☕**
