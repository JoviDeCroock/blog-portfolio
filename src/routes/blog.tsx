import { Link } from '@pracht/core'
import { useState } from 'preact/hooks'

import { posts, postRouteId, tagBgs } from '../data/posts'
import { seo } from '../lib/seo'
import styles from './blog.module.css'

export function head() {
  return seo({
    title: 'Blog',
    description: 'Posts about my work and thoughts.',
    url: '/blog',
  })
}

const ALL_TAGS = posts
  .flatMap((post) => post.tags)
  .filter((tag, index, self) => self.indexOf(tag) === index)

export default function Blog() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredPosts = selectedTag
    ? posts.filter((post) =>
        post.tags.includes(selectedTag as keyof typeof tagBgs)
      )
    : posts

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag)
  }

  return (
    <>
      <div class={styles.heading}>
        <h1>Blog</h1>
        <a
          class={styles.rssLink}
          href="/rss.xml"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
          </svg>
          RSS
        </a>
      </div>
      <p>
        My thoughts in a semi-raw form, a lot of these posts contain what goes
        around in my mind throughout a day.
      </p>

      <h2>Filter by tag</h2>
      <div class={styles.tagFilters}>
        {ALL_TAGS.map((tag) => (
          <button
            key={`filter-${tag}`}
            class={
              selectedTag === tag
                ? `${styles.filterTag} ${styles.filterTagSelected}`
                : styles.filterTag
            }
            style={{ background: tagBgs[tag] }}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
        {selectedTag && (
          <button
            class={styles.clearFilter}
            onClick={() => setSelectedTag(null)}
          >
            Clear filter
          </button>
        )}
      </div>

      <div class={styles.block}>
        <ul class={styles.postGrid}>
          {filteredPosts.map((post) => (
            <li class={styles.postCard} key={post.path}>
              {post.createdAt && (
                <span class={styles.postDate}>{post.createdAt}</span>
              )}
              {post.external ? (
                <a
                  class={styles.titleLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={post.path}
                >
                  {post.title}
                </a>
              ) : (
                <Link class={styles.titleLink} route={postRouteId(post.path)}>
                  {post.title}
                </Link>
              )}
              <p class={styles.postDescription}>{post.description}</p>
              <div class={styles.tags}>
                {post.tags.map((tag) => (
                  <span
                    class={styles.tag}
                    style={{ background: tagBgs[tag] }}
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>

        {selectedTag && filteredPosts.length === 0 && (
          <p>No posts found with the selected tag.</p>
        )}
      </div>
    </>
  )
}
