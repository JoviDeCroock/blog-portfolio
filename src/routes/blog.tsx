import PostFilter from '../islands/PostFilter'
import { posts, tagBgs } from '../data/posts'
import { seo } from '../lib/seo'
import styles from './blog.module.css'

export function head() {
  return seo({
    title: 'Blog',
    description: 'Posts about my work and thoughts.',
    url: '/blog',
  })
}

export default function Blog() {
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

      <PostFilter posts={posts} tagColors={tagBgs} />
    </>
  )
}
