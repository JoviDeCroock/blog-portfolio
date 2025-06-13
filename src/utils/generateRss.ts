import { XMLBuilder } from 'fast-xml-parser';
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
  const rssData = {
    "?xml": {
      "@_version": "1.0",
      "@_encoding": "UTF-8"
    },
    rss: {
      "@_version": "2.0",
      "@_xmlns:atom": "http://www.w3.org/2005/Atom",
      channel: {
        title: siteConfig.title,
        description: siteConfig.description,
        link: siteConfig.siteUrl,
        language: siteConfig.language,
        managingEditor: siteConfig.managingEditor,
        webMaster: siteConfig.webMaster,
        lastBuildDate: new Date().toUTCString(),
        generator: "Custom RSS Generator",
        "atom:link": {
          "@_href": `${siteConfig.siteUrl}/rss.xml`,
          "@_rel": "self",
          "@_type": "application/rss+xml"
        },
        item: blogPosts.map(post => ({
          title: post.title,
          description: post.description,
          link: `${siteConfig.siteUrl}${post.path}`,
          guid: {
            "#text": `${siteConfig.siteUrl}${post.path}`,
            "@_isPermaLink": "true"
          },
          pubDate: new Date(post.createdAt).toUTCString(),
          category: post.tags,
          ...(post.image && {
            enclosure: {
              "@_url": post.image,
              "@_type": "image/jpeg",
              "@_length": "0"
            }
          })
        }))
      }
    }
  };

  const builder = new XMLBuilder({
    attributeNamePrefix: "@_",
    textNodeName: "#text",
    ignoreAttributes: false,
    format: true,
    indentBy: "  ",
    suppressEmptyNode: true
  });

  return builder.build(rssData);
}
