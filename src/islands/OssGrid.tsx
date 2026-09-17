import { useRef } from 'preact/hooks'
import type { IslandProps } from '@pracht/core'

import styles from './oss-grid.module.css'

export type OssProject = {
  name: string
  description: string
  link: string
}

const Card = (props: OssProject) => {
  const box = useRef<HTMLLIElement>(null)

  // The glow follows the cursor through two custom properties; the gradient
  // itself lives in CSS.
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

/**
 * The only interactive thing on the home page. As an island it is the only
 * component on that route that ships JavaScript.
 */
export default function OssGrid({
  projects,
}: { projects: OssProject[] } & IslandProps) {
  return (
    <ul class={styles.grid}>
      {projects.map((project) => (
        <Card key={project.name} {...project} />
      ))}
    </ul>
  )
}
