import { posts, type Post } from '../pages/Blog'

const siteConfig = {
  siteUrl: 'https://jovidecroock.com',
}

export function generateSitemap(): string {
  // Get current date in ISO format for lastmod
  const currentDate = new Date().toISOString()

  // Static pages that should be included in the sitemap
  const staticPages = [
    {
      url: '',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '1.0',
    },
    {
      url: '/blog',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8',
    },
    {
      url: '/blueprint',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6',
    },
  ]

  // Generate blog post entries
  const blogPosts = posts
    .filter((post) => !post.external) // Only include internal posts
    .map((post) => ({
      url: post.path,
      lastmod: post.createdAt
        ? new Date(post.createdAt).toISOString()
        : currentDate,
      changefreq: 'monthly',
      priority: '0.7',
    }))

  // Combine all pages
  const allPages = [...staticPages, ...blogPosts]

  // Generate sitemap XML
  const urlEntries = allPages
    .map(
      (page) => `  <url>
    <loc>${siteConfig.siteUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`
}
