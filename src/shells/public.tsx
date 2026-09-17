import {
  Link,
  useLocation,
  type HeadMetadata,
  type ShellProps,
} from '@pracht/core'

import '../styles/global.css'
import '../styles/code-theme.css'
import styles from './public.module.css'
import { interMedium, interRegular } from '../fonts'

const NAV = [
  { route: 'home', href: '/', label: 'Home' },
  { route: 'blog', href: '/blog', label: 'Blog' },
  { route: 'blueprint', href: '/blueprint', label: 'Blueprint' },
] as const

const isActive = (pathname: string, href: string) =>
  href === '/blog' ? pathname.startsWith('/blog') : pathname === href

const Header = () => {
  const { pathname } = useLocation()

  return (
    <header class={styles.header}>
      <div class={styles.floating}>
        <img class={styles.avatar} src="/me.jpg" alt="Jovi De Croock" />
        <div>
          <h3 class={styles.floatingTitle}>Jovi De Croock</h3>
          <p class={styles.floatingUnderline}>Software Engineer</p>
        </div>
      </div>
      <nav class={styles.nav}>
        {NAV.map((item) => (
          <Link
            key={item.route}
            route={item.route}
            class={
              isActive(pathname, item.href)
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}

const Footer = () => (
  <footer class={styles.footer}>
    <a
      class={styles.footerLink}
      rel="nofollow"
      target="_blank"
      href="https://bsky.app/profile/jovidecroock.com"
    >
      BlueSky
    </a>
    -
    <a
      class={styles.footerLink}
      rel="nofollow"
      target="_blank"
      href="https://x.com/jovidec"
    >
      Twitter
    </a>
    -
    <a
      class={styles.footerLink}
      rel="nofollow"
      target="_blank"
      href="https://www.github.com/jovidecroock"
    >
      Github
    </a>
    -
    <a class={styles.footerLink} href="mailto:decroockjovi@gmail.com">
      Contact
    </a>
    -
    <Link class={styles.footerLink} route="blog">
      Blog
    </Link>
  </footer>
)

export function Shell({ children }: ShellProps) {
  return (
    <div class={styles.wrapper}>
      <Header />
      <main class={styles.main}>{children}</main>
      <Footer />
    </div>
  )
}

/**
 * Site-wide document metadata. Routes contribute their own `head()`; `title`
 * is overridden per route while `meta` and `link` arrays are concatenated.
 */
export function head(): HeadMetadata {
  return {
    lang: 'en',
    fonts: [interRegular, interMedium],
    link: [
      { rel: 'icon', href: '/favicon.ico' },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: "Jovi De Croock's Blog RSS Feed",
        href: '/rss.xml',
      },
      {
        rel: 'sitemap',
        type: 'application/xml',
        title: 'Sitemap',
        href: '/sitemap.xml',
      },
    ],
  }
}
