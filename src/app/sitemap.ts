import { MetadataRoute } from 'next'

// Configuración para export estático
export const dynamic = 'force-static'
export const revalidate = false
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://mcalgo.github.io',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://mcalgo.github.io#about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://mcalgo.github.io#projects',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://mcalgo.github.io#skills',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
