import { h } from 'preact'
import { setup } from 'goober'
import { LocationProvider, Router, hydrate } from 'preact-iso'
import Home from './pages/Home'
import NotFound from './pages/404'

setup(h)

export function App() {
  return (
    <LocationProvider>
      <div className="app">
        <Router>
          <Home path="/" />
          <NotFound default />
        </Router>
      </div>
    </LocationProvider>
  )
}

hydrate(<App />)

export async function prerender(data) {
  const { toStatic } = await import('hoofd/preact')
  const { prerender as ssr } = await import('preact-iso')
  const { extractCss } = await import('goober')

  const res = await ssr(<App {...data} />)

  const head = toStatic()
  const elements = new Set([
    ...head.links.map(props => ({ type: 'link', props })),
    ...head.metas.map(props => ({ type: 'meta', props })),
    `<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "e032b43ad8dd4e7797f9dc4d2afbce64"}'></script>`,
    `<style id="_goober">${extractCss()}</style>`,
  ])

  return {
    ...res,
    head: {
      title: head.title,
      lang: head.lang,
      elements,
    },
  }
}

// @ts-ignore
if (module.hot) module.hot.accept(u => hydrate(<u.module.App />))
