import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/features/HeroSection";
import AboutSection from "@/components/features/AboutSection";
import ProjectsSection from "@/components/features/ProjectsSection";
import SkillsSection from "@/components/features/SkillsSection";

// Metadata específica para la página de inicio
export const metadata: Metadata = {
  title: "Sebastián Arévalo - Full Stack Developer | C# Python .NET Expert",
  description: "🚀 Sebastián Arévalo - Desarrollador Full Stack con 7+ años de experiencia en C#, Python, .NET Core, SQL. Especialista en APIs escalables, integración de sistemas y desarrollo de aplicaciones empresariales. ¡Descubre mi portfolio y proyectos open-source!",
  openGraph: {
    title: "Sebastián Arévalo - Full Stack Developer | Portfolio Profesional",
    description: "Desarrollador Full Stack con experiencia en C#, Python, .NET Core. APIs escalables, arquitectura de software y proyectos innovadores. ¡Explora mi trabajo!",
    images: [
      {
        url: "https://mcalgo.github.io/images/og-home.png",
        width: 1200,
        height: 630,
        alt: "Sebastián Arévalo - Full Stack Developer Portfolio Homepage"
      }
    ]
  },
  keywords: [
    "sebastián arévalo portfolio", "full stack developer colombia", "c# python developer",
    ".net core expert", "desarrollador apis", "arquitecto software", "portfolio profesional",
    "juan sebastian arevalo", "mcalgo github", "senior developer colombia"
  ]
};

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Skip to main content for accessibility and SEO */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md"
      >
        Saltar al contenido principal
      </a>
      
      <Navbar />
      
      {/* Main content with semantic structure */}
      <div id="main-content">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
      </div>
      
      <Footer />
    </main>
  );
}
