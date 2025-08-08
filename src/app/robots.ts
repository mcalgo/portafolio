import { MetadataRoute } from 'next'

// Configuración para export estático
export const dynamic = 'force-static'
export const revalidate = false
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: 'https://mcalgo.github.io/sitemap.xml',
    host: 'https://mcalgo.github.io',
  }
}
