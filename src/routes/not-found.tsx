import { seo } from '../lib/seo'

export function head() {
  return seo({ title: 'Not found', description: 'Not found' })
}

export default function NotFound() {
  return (
    <>
      <h1>Not Found</h1>
      <p>
        Ah you were sniffing around to see if I had hidden any easter eggs, did
        you now?
      </p>
    </>
  )
}
