import { h } from 'preact'
import { setup } from 'goober'
import {
  LocationProvider,
  Router,
  ErrorBoundary,
  hydrate,
  prerender as ssr,
} from 'preact-iso'
import Home from './pages/Home'
import NotFound from './pages/404'
import { toStatic } from 'hoofd/preact'

setup(h)

export function App() {
  return (
    <LocationProvider>
      <div className="app">
        <ErrorBoundary>
          <Router>
            <Home path="/" />
            <NotFound default />
          </Router>
        </ErrorBoundary>
      </div>
    </LocationProvider>
  )
}

if (typeof window !== 'undefined') {
  hydrate(<App />, document.getElementById('root'))
}

export async function prerender(data) {
  const { default: ssr } = await import('preact-iso/prerender');
  const { extractCss } = await import('goober');

  const res = await ssr(<App {...data} />)
  res.html = `<style id="_goober"> ${extractCss()}</style>${res.html}`;

  const head = toStatic()
  const elements = new Set([
    ...head.links.map(props => ({ type: 'link', props })),
    ...head.metas.map(props => ({ type: 'meta', props })),
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
if (module.hot) module.hot.accept(u => hydrate(<u.module.App />, document.body))
