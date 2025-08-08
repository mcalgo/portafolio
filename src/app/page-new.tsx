import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/features/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      
      {/* Placeholder sections for future development */}
      <section id="about" className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Sobre Mí</h2>
          <p className="text-muted-foreground">Sección en desarrollo...</p>
        </div>
      </section>

      <section id="projects" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Proyectos</h2>
          <p className="text-muted-foreground">Sección en desarrollo...</p>
        </div>
      </section>

      <section id="skills" className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Habilidades</h2>
          <p className="text-muted-foreground">Sección en desarrollo...</p>
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Contacto</h2>
          <p className="text-muted-foreground">Sección en desarrollo...</p>
        </div>
      </section>
    </main>
  );
}
