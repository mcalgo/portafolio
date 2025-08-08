<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Instrucciones para GitHub Copilot - Portafolio Moderno

## Contexto del Proyecto
Este es un portafolio web moderno desarrollado con Next.js 15, TypeScript, y Tailwind CSS v4. El proyecto implementa una arquitectura limpia y escalable diseñada para mostrar habilidades profesionales de desarrollo.

## Arquitectura y Patrones
- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript con tipado estricto
- **Estilos**: Tailwind CSS v4 con sistema de design tokens
- **Arquitectura**: Clean Architecture con separación de responsabilidades
- **Patrones**: Component-based, Custom Hooks, Context API

## Estructura de Carpetas
```
src/
├── app/                 # App Router (Next.js 15)
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes UI base
│   ├── layout/         # Componentes de layout
│   └── features/       # Componentes específicos de funcionalidad
├── lib/                # Utilidades y configuraciones
├── hooks/              # Custom hooks
├── types/              # Definiciones de TypeScript
└── styles/             # Estilos globales y variables CSS
```

## Funcionalidades Clave
- **Chat con IA**: Integración de chat inteligente para interacción
- **Animaciones**: Framer Motion para transiciones suaves
- **Responsive Design**: Mobile-first con Tailwind CSS
- **SEO Optimizado**: Meta tags dinámicos y estructura semántica
- **Performance**: Optimizaciones de Next.js y lazy loading

## Convenciones de Código
- Usar arrow functions para componentes funcionales
- Implementar TypeScript interfaces para todas las props
- Seguir convenciones de naming camelCase para variables y PascalCase para componentes
- Utilizar CSS Modules o Tailwind classes para estilos
- Implementar error boundaries para manejo de errores
- Usar ESLint y Prettier para formateo consistente

## Deployment
- Configurado para GitHub Pages con exportación estática
- Optimizado para build estático compatible con hosting gratuito
- Variables de entorno para diferentes ambientes

## Documentación
- Cada componente debe incluir JSDoc comentarios
- README.md actualizado con instrucciones de desarrollo
- Changelog para tracking de versiones
