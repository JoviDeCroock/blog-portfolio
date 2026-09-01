import styles from './dates.module.css'

const formatDate = (date: Date) =>
  Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(date)

export default function Dates(props: {
  createdAt: string
  updatedAt?: string
}) {
  return (
    <div class={styles.wrapper}>
      <span class={styles.annotation}>
        Written on{' '}
        <time datetime={props.createdAt}>
          {formatDate(new Date(props.createdAt))}
        </time>
      </span>
      {props.updatedAt && (
        <span class={styles.annotation}>
          Last updated on{' '}
          <time datetime={props.updatedAt}>
            {formatDate(new Date(props.updatedAt))}
          </time>
        </span>
      )}
    </div>
  )
}
