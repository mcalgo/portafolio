import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import StructuredData from "@/components/seo/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Sebastián Arévalo - Desarrollador Full Stack | C# Python .NET Expert",
    template: "%s | Sebastián Arévalo - Full Stack Developer"
  },
  description: "Sebastián Arévalo - Desarrollador Full Stack con 7+ años de experiencia en C#, Python, .NET Core, SQL. Especialista en APIs escalables, integración de sistemas y desarrollo de aplicaciones empresariales. Portfolio profesional y proyectos open-source.",
  keywords: [
    // Tecnologías principales
    "Sebastián Arévalo", "desarrollador full stack", "full stack developer", "programador colombia",
    "C# developer", "Python developer", ".NET developer", "ASP.NET Core", 
    // Backend technologies
    "desarrollo backend", "APIs REST", "microservicios", "arquitectura software",
    "integración sistemas", "servicios web", "desarrollo aplicaciones empresariales",
    // Bases de datos
    "SQL developer", "Oracle developer", "PL/SQL", "Oracle APEX", "base de datos",
    // Frontend & Mobile
    "Angular developer", "TypeScript", "JavaScript", "Xamarin", ".NET MAUI", "Flutter",
    // Frameworks y herramientas
    "FastAPI", "Flask", "Background Workers", "Python Daemons", "RAP", "OCR",
    // Conceptos profesionales
    "open source", "github", "portfolio developer", "software engineer colombia",
    "senior developer", "tech lead", "consultor tecnológico"
  ],
  authors: [{ name: "Sebastián Arévalo", url: "https://mcalgo.github.io/portafolio" }],
  creator: "Sebastián Arévalo",
  publisher: "Sebastián Arévalo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://mcalgo.github.io/portafolio"),
  alternates: {
    canonical: "https://mcalgo.github.io/portafolio",
    languages: {
      "es-ES": "https://mcalgo.github.io/portafolio",
      "en-US": "https://mcalgo.github.io/portafolio/en"
    }
  },
  openGraph: {
    title: "Sebastián Arévalo - Full Stack Developer | C# Python .NET Expert",
    description: "Desarrollador Full Stack con 7+ años de experiencia. Especialista en C#, Python, .NET Core, APIs escalables y arquitectura de software. Portfolio profesional con proyectos open-source.",
    url: "https://mcalgo.github.io/portafolio",
    siteName: "Sebastián Arévalo - Portfolio",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "https://mcalgo.github.io/portafolio/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sebastián Arévalo - Full Stack Developer Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sebastián Arévalo - Full Stack Developer | C# Python Expert",
    description: "Desarrollador Full Stack con 7+ años de experiencia en C#, Python, .NET. Especialista en APIs escalables y arquitectura de software. ¡Explora mi portfolio!",
    images: ["https://mcalgo.github.io/portafolio/images/twitter-card.png"],
    creator: "@sebastián_dev"
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Technology",
  classification: "Portfolio, Software Development, Full Stack Developer",
  referrer: "origin-when-cross-origin",
  applicationName: "Sebastián Arévalo Portfolio",
  appLinks: {
    web: {
      url: "https://mcalgo.github.io/portafolio",
      should_fallback: true
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* Favicons */}
        <link rel="icon" href="/portafolio/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/portafolio/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/portafolio/apple-touch-icon.png" />
        <link rel="manifest" href="/portafolio/manifest.json" />
        
        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#0f172a" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="msapplication-config" content="/portafolio/browserconfig.xml" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="CO" />
        <meta name="geo.placename" content="Colombia" />
        <meta name="ICBM" content="4.7110, -74.0721" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
        
        {/* DNS Prefetch for better performance */}
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//linkedin.com" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <LanguageProvider>
          <ThemeProvider>
            <StructuredData />
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}