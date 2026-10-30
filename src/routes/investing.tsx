import { Link } from '@pracht/core'
import { seo } from '../lib/seo'
import styles from './investing.module.css'

export function head() {
  return seo({
    title: 'Angel Investing — Jovi De Croock',
    description:
      'Backing founders at pre-seed and seed, with a focus on AI, developer tools, infrastructure, and open source. Angel investing by Jovi De Croock.',
    url: '/investing',
    keywords: [
      'angel investing',
      'AI',
      'developer tools',
      'open source',
      'pre-seed',
      'seed',
    ],
  })
}

const FOCUS = [
  {
    title: 'AI',
    description:
      'AI products that solve real problems, and the tools and infrastructure that make them possible. I’m interested in what people can build when new capabilities become useful, reliable software.',
  },
  {
    title: 'Developer tools',
    description:
      'Tools that make the path from an idea to working software shorter. Better workflows, useful abstractions, and fewer things getting in the way.',
  },
  {
    title: 'Infrastructure',
    description:
      'The foundations behind fast, reliable software. APIs, data, and platforms that make difficult engineering problems easier to reason about.',
  },
  {
    title: 'Open source',
    description:
      'Products that earn trust by working in the open. I care about the relationship between a project, its contributors, and the business built around it.',
  },
]

const CONTACT =
  'mailto:jovi@resynapse.dev?subject=Angel%20investment%20%E2%80%94%20' +
  'introduction&body=Hi%20Jovi%2C%0A%0A' +
  'I%27m%20building%3A%20%0A' +
  'For%3A%20%0A' +
  'What%20we%27ve%20learned%20so%20far%3A%20%0A' +
  'Stage%20and%20round%3A%20%0A' +
  'Product%20or%20deck%3A%20%0A'

export default function Investing() {
  return (
    <article class={styles.page}>
      <header class={styles.hero}>
        <p class={styles.eyebrow}>Angel investing · Pre-seed & seed</p>
        <h1>
          Backing people who
          <br />
          <span class={styles.accent}>make building better.</span>
        </h1>
        <p class={styles.intro}>
          I’m Jovi, a software engineer and open-source maintainer. I invest in
          founders building AI products, tools, and infrastructure that help
          other people create. The kind of software I’d want to use, contribute
          to, and see succeed.
        </p>
        <a class={styles.primaryLink} href={CONTACT}>
          Tell me what you’re building <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section class={styles.section} aria-labelledby="focus-heading">
        <p class={styles.eyebrow}>Where I spend my time</p>
        <h2 id="focus-heading">Close to the craft.</h2>
        <p>
          My perspective comes from building software and maintaining projects
          like Preact, urql, and GQL.tada. These are the areas where I can bring
          useful context and ask better questions.
        </p>
        <ol class={styles.focusList}>
          {FOCUS.map((focus, index) => (
            <li key={focus.title} class={styles.focusItem}>
              <span class={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3>{focus.title}</h3>
                <p>{focus.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section class={styles.section} aria-labelledby="support-heading">
        <p class={styles.eyebrow}>Working together</p>
        <h2 id="support-heading">An engineer in your corner.</h2>
        <p>
          I like getting into the details. Beyond capital, these are the
          conversations I’m most useful in.
        </p>
        <div class={styles.supportGrid}>
          <div>
            <h3>Product & engineering</h3>
            <p>
              Talking through architecture, performance, API design, and the
              trade-offs that matter at your stage.
            </p>
          </div>
          <div>
            <h3>Developer experience</h3>
            <p>
              Trying the product, questioning the abstractions, and giving
              direct feedback on what it feels like to build with it.
            </p>
          </div>
          <div>
            <h3>Open-source perspective</h3>
            <p>
              Thinking through maintainer workflows, community, and how to build
              a product developers can trust.
            </p>
          </div>
          <div>
            <h3>A sounding board</h3>
            <p>
              Working through a hard decision together, with honest feedback and
              a bias towards finding the next useful step.
            </p>
          </div>
        </div>
        <Link route="blueprint" class={styles.textLink}>
          More on how I think <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section class={styles.section} aria-labelledby="investments-heading">
        <p class={styles.eyebrow}>Portfolio</p>
        <h2 id="investments-heading">People I’ve backed.</h2>
        <a class={styles.investment} href="https://guild.host/">
          <span class={styles.guildMark} aria-hidden="true">
            G
          </span>
          <span class={styles.investmentName}>
            Guild
            <span>guild.host</span>
          </span>
          <span class={styles.investmentLabel}>Angel investment</span>
          <span class={styles.investmentArrow} aria-hidden="true">
            ↗
          </span>
        </a>
      </section>

      <section class={styles.contact} aria-labelledby="contact-heading">
        <p class={styles.eyebrow}>Let’s talk</p>
        <h2 id="contact-heading">What are you building?</h2>
        <p>
          If you’re raising a pre-seed or seed round and think we’d work well
          together, I’d like to hear from you. A short introduction, a product
          link or deck, and what you’re figuring out is a good place to start.
        </p>
        <a class={styles.primaryLink} href={CONTACT}>
          Start a conversation <span aria-hidden="true">↗</span>
        </a>
        <a class={styles.email} href="mailto:jovi@resynapse.dev">
          jovi@resynapse.dev
        </a>
      </section>
    </article>
  )
}
