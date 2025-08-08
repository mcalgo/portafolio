import Script from 'next/script';

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sebastián Arévalo",
    "jobTitle": "Full Stack Developer",
    "description": "Desarrollador Full Stack especializado en C#, Python, .NET Core con más de 7 años de experiencia en desarrollo de aplicaciones empresariales y APIs escalables.",
    "url": "https://mcalgo.github.io",
    "sameAs": [
      "https://github.com/mcalgo",
      "https://www.linkedin.com/in/juan-sebastian-arevalo-gomez-631469160/"
    ],
    "image": "https://avatars.githubusercontent.com/u/37521274?v=4",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Colombia"
    },
    "knowsAbout": [
      "C# Programming",
      "Python Development", 
      ".NET Core",
      "ASP.NET",
      "SQL Databases",
      "Oracle Database",
      "PL/SQL",
      "REST APIs",
      "Microservices Architecture",
      "Angular",
      "TypeScript",
      "JavaScript",
      "FastAPI",
      "Flask",
      "Xamarin",
      ".NET MAUI",
      "Software Architecture",
      "System Integration",
      "Open Source Development"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Full Stack Development",
        "description": "7+ años de experiencia profesional en desarrollo full stack"
      }
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance Developer"
    },
    "alumniOf": {
      "@type": "Organization", 
      "name": "Desarrollador Independiente"
    }
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Sebastián Arévalo Portfolio",
    "url": "https://mcalgo.github.io",
    "description": "Portfolio profesional de Sebastián Arévalo, desarrollador Full Stack especializado en tecnologías modernas",
    "author": {
      "@type": "Person",
      "name": "Sebastián Arévalo"
    },
    "inLanguage": "es-ES",
    "copyrightYear": 2024,
    "genre": "Portfolio",
    "keywords": "desarrollador full stack, C#, Python, .NET, portfolio, software developer colombia"
  };

  const portfolioData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Portfolio Sebastián Arévalo", 
    "description": "Portfolio profesional showcasing expertise in full stack development, C#, Python, and modern web technologies",
    "author": {
      "@type": "Person",
      "name": "Sebastián Arévalo"
    },
    "dateCreated": "2024",
    "inLanguage": ["es-ES", "en-US"],
    "audience": {
      "@type": "Audience",
      "audienceType": "Employers, Clients, Developers"
    }
  };

  return (
    <>
      <Script
        id="structured-data-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Script
        id="structured-data-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData),
        }}
      />
      <Script
        id="structured-data-portfolio"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioData),
        }}
      />
    </>
  );
}
