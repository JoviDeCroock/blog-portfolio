import { posts, type Post } from '../pages/Blog';

// Extend the Post interface to include createdAt for RSS purposes
interface RSSPost extends Post {
  createdAt: string;
}

const siteConfig = {
  title: "Jovi De Croock's Blog",
  description: "Posts about web development, engineering, and thoughts.",
  siteUrl: "https://jovidecroock.com",
  language: "en-us",
  managingEditor: "jovi@jovidecroock.com (Jovi De Croock)",
  webMaster: "jovi@jovidecroock.com (Jovi De Croock)",
};

export function generateRSSFeed(): string {
  // Filter out external posts and sort by creation date (newest first)
  const blogPosts = posts
    .filter(post => !post.external && (post as any).createdAt) // Only include posts with createdAt
    .map(post => post as RSSPost)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Build RSS manually to avoid XML attribute issues
  const rssItems = blogPosts.map(post => {
    const enclosure = post.image ? 
      `    <enclosure url="${post.image}" type="image/jpeg" length="0" />` : '';
    
    const categories = post.tags.map(tag => `    <category>${tag}</category>`).join('\n');
    
    return `  <item>
    <title><![CDATA[${post.title}]]></title>
    <description><![CDATA[${post.description}]]></description>
    <link>${siteConfig.siteUrl}${post.path}</link>
    <guid isPermaLink="true">${siteConfig.siteUrl}${post.path}</guid>
    <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
${categories}
${enclosure}
  </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${siteConfig.title}]]></title>
    <description><![CDATA[${siteConfig.description}]]></description>
    <link>${siteConfig.siteUrl}</link>
    <language>${siteConfig.language}</language>
    <managingEditor>${siteConfig.managingEditor}</managingEditor>
    <webMaster>${siteConfig.webMaster}</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Custom RSS Generator</generator>
    <atom:link href="${siteConfig.siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${rssItems}
  </channel>
</rss>`;
}
