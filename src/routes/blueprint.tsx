import { seo } from '../lib/seo'
import styles from './blueprint.module.css'

export function head() {
  return seo({
    title: 'Blueprint - Engineering Philosophy',
    description:
      'My core engineering principles and philosophy that guide my approach to software development and team collaboration.',
    url: '/blueprint',
  })
}

const PRINCIPLES = [
  {
    title: 'Challenge the status quo',
    path: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    description:
      'Established solutions have their own trade-offs, we need to evaluate whether they fit in our frame.',
  },
  {
    title: 'Simple, not crude',
    path: 'M13 10V3L4 14h7v7l9-11h-7z',
    description:
      'Elegant abstractions beat bolted-on solutions. Dare to duplicate before you abstract.',
  },
  {
    title: 'Say the thing',
    path: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    description:
      "I value direct feedback, the only way to grow is to know what we're lacking in.",
  },
  {
    title: 'Iterate rapidly',
    path: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    description:
      'We need to learn and we need to learn continuously, this can only be done through data and prototyping.',
  },
  {
    title: 'Force multiply',
    path: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    description: 'Enabling others is more valuable than any individual task.',
  },
  {
    title: 'Default to action',
    path: 'M13 9l3 3-3 3m-4-6L6 12l3 3',
    description:
      'We need to move the needle, actioning is my reaction to most conversations.',
  },
]

export default function Blueprint() {
  return (
    <>
      <div class={styles.hero}>
        <h1>Blueprint</h1>
        <div class={styles.introText}>
          <p>
            These principles form the foundation of my engineering philosophy.
            They guide how I approach problems, collaborate with teams, and
            build sustainable solutions.
          </p>
          <p>
            Each principle has been refined through years of experience across
            different teams, projects, and challenges in the software
            engineering landscape.
          </p>
        </div>
      </div>

      <div class={styles.grid}>
        {PRINCIPLES.map((principle) => (
          <div class={styles.card} key={principle.title}>
            <h3 class={styles.cardTitle}>
              <svg viewBox="0 0 24 24">
                <path d={principle.path} />
              </svg>
              {principle.title}
            </h3>
            <p class={styles.cardDescription}>{principle.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}
