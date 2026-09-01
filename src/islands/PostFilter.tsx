import { useState } from 'preact/hooks'
import type { IslandProps } from '@pracht/core'

import styles from './post-filter.module.css'

export type FilterPost = {
  title: string
  description: string
  path: string
  tags: string[]
  external?: boolean
  createdAt?: string
}

type Props = {
  posts: FilterPost[]
  tagColors: Record<string, string>
} & IslandProps

/**
 * The tag filter and the post list it drives. Island props are serialized into
 * the HTML, so the post registry travels as data rather than as a route chunk.
 */
export default function PostFilter({ posts, tagColors }: Props) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const tags = posts
    .flatMap((post) => post.tags)
    .filter((tag, index, self) => self.indexOf(tag) === index)

  const filtered = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts

  return (
    <>
      <h2>Filter by tag</h2>
      <div class={styles.tagFilters}>
        {tags.map((tag) => (
          <button
            key={`filter-${tag}`}
            class={
              selectedTag === tag
                ? `${styles.filterTag} ${styles.filterTagSelected}`
                : styles.filterTag
            }
            style={{ background: tagColors[tag] }}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
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
          {filtered.map((post) => (
            <li class={styles.postCard} key={post.path}>
              {post.createdAt && (
                <span class={styles.postDate}>{post.createdAt}</span>
              )}
              <a
                class={styles.titleLink}
                href={post.path}
                target={post.external ? '_blank' : undefined}
                rel={post.external ? 'noopener noreferrer' : undefined}
              >
                {post.title}
              </a>
              <p class={styles.postDescription}>{post.description}</p>
              <div class={styles.tags}>
                {post.tags.map((tag) => (
                  <span
                    class={styles.tag}
                    style={{ background: tagColors[tag] }}
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>

        {selectedTag && filtered.length === 0 && (
          <p>No posts found with the selected tag.</p>
        )}
      </div>
    </>
  )
}
