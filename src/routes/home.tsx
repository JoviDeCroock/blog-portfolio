import { useRef } from 'preact/hooks'

import { seo } from '../lib/seo'
import styles from './home.module.css'

export function head() {
  return seo({
    title: 'Portfolio',
    description: 'About my career up to now and my skills.',
    url: '/',
  })
}

const OSSBox = (props: { name: string; description: string; link: string }) => {
  const box = useRef<HTMLLIElement>(null)

  const onMouseMove = (evt: MouseEvent) => {
    const b = box.current
    if (!b) return

    const rect = b.getBoundingClientRect()
    b.style.setProperty(
      '--mouse-x',
      `${(evt.clientX - rect.left) / rect.width}`
    )
    b.style.setProperty(
      '--mouse-y',
      `${(evt.clientY - rect.top) / rect.height}`
    )
  }

  return (
    <li class={styles.box} ref={box} onMouseMove={onMouseMove}>
      <div class={styles.boxInner}>
        <div>
          <h3 class={styles.boxTitle}>{props.name}</h3>
          <p class={styles.boxDescription}>{props.description}</p>
        </div>
        <a rel="nofollow noopener noreferrer" target="_blank" href={props.link}>
          {props.link}
        </a>
      </div>
    </li>
  )
}

export default function Home() {
  return (
    <>
      <div class={styles.hero}>
        <p>
          Hey, I am Jovi De Croock, a software engineer and technology
          enthusiast from Belgium. A <b>React</b>, <b>GraphQL</b>, and{' '}
          <b>TypeScript</b> specialist, currently Staff Software Engineer at
          Shopify, previously worked at Stellate, Formidable and Codifly.
          Founder of{' '}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://resynapse.dev"
          >
            Resynapse
          </a>
          .
        </p>
        <p>
          I love working in the open, collaborating, being a force multiplier
          with others and finding elegant solutions to complex problems. I'm
          passionate about open-source and maintain several projects, core team
          of <b>Preact</b>, <b>urql</b>, and <b>GQL.tada</b>.
        </p>
      </div>
      <div class={styles.block}>
        <h2>Work experience</h2>
        <ul class={styles.quoteList}>
          <li class={styles.quoteListItem}>
            <a
              class={styles.boldLink}
              rel="nofollow"
              target="_blank"
              href="https://shopify.com/"
            >
              Shopify
            </a>{' '}
            Staff Software Engineer (2024-Now)
          </li>
          <li class={styles.quoteListItem}>
            <a
              class={styles.boldLink}
              rel="nofollow"
              target="_blank"
              href="https://stellate.co/"
            >
              Stellate (acq. by Shopify)
            </a>{' '}
            Staff Software Engineer - Director of R&D (2021-2024)
          </li>
          <li class={styles.quoteListItem}>
            <a
              class={styles.boldLink}
              rel="nofollow"
              target="_blank"
              href="https://formidable.com/"
            >
              Formidable
            </a>{' '}
            Senior software engineer - Tech lead (2019-2021)
          </li>
          <li class={styles.quoteListItem}>
            <a
              class={styles.boldLink}
              rel="nofollow"
              target="_blank"
              href="https://codifly.be"
            >
              Codifly
            </a>{' '}
            Web and Mobile engineer (2017-2019)
          </li>
        </ul>
        <div class={styles.block}>
          <h2>Open source work</h2>
          <ul class={styles.grid}>
            <OSSBox
              name="Preact"
              description="A fast and tiny alternative to React with a modern API."
              link="https://preactjs.com"
            />
            <OSSBox
              name="Signals"
              description="A reactive signals primitive for Preact and React."
              link="https://github.com/preactjs/signals"
            />
            <OSSBox
              name="urql"
              description="The highly customizable and versatile GraphQL client for React, Svelte, Solid, Vue, or plain JavaScript, with which you add on features like normalized caching as you grow."
              link="https://urql.dev"
            />
            <OSSBox
              name="GQL.tada"
              description="The magical GraphQL parser written in TS types, this tool automatically types your GraphQL Documents without codegen."
              link="https://gql-tada.0no.co/"
            />
            <OSSBox
              name="Prefresh"
              description="React Fast Refresh for PreactJS."
              link="https://github.com/preactjs/prefresh"
            />
            <OSSBox
              name="GraphQLSP"
              description="A TypeScript LSP Plugin to support authoring GraphQL documents."
              link="https://github.com/0no-co/graphqlsp"
            />
          </ul>
        </div>
      </div>
      <div class={styles.block}>
        <h2>Achievements</h2>
        <ul class={styles.quoteList}>
          <li class={styles.quoteListItem}>
            <a
              class={styles.boldLink}
              rel="nofollow"
              target="_blank"
              href="https://stellate.co"
            >
              Partial Query Caching GraphQL at Stellate
            </a>
          </li>
          <li class={styles.quoteListItem}>
            <a
              class={styles.boldLink}
              rel="nofollow"
              target="_blank"
              href="https://us.puma.com"
            >
              The modernisation of the tech-stack of Puma.com
            </a>
          </li>
          <li class={styles.quoteListItem}>
            <a
              class={styles.boldLink}
              rel="nofollow"
              target="_blank"
              href="https://github.com/FredKSchott/esm-hmr"
            >
              Collaboration on the ESM HMR Spec
            </a>
          </li>
          <li class={styles.quoteListItem}>
            <a
              class={styles.boldLink}
              rel="nofollow"
              target="_blank"
              href="https://opensource.googleblog.com/2020/01/announcing-2019-second-cycle-google.html"
            >
              The Google Open Source Peer Bonus 2019 Cycle 2
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
