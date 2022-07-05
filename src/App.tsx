import { h } from 'preact'
import { setup } from 'goober'
import { createGlobalStyles } from 'goober/global'
import { Router, Route, lazy, ErrorBoundary } from 'preact-iso'
import Layout from './components/Layout'

const NotFound = lazy(() => import('./pages/404'))
const Blog = lazy(() => import('./pages/Blog'))
const Home = lazy(() => import('./pages/Home'))

// Posts
const VDom = lazy(() => import('./pages/posts/vdom-compilers/index.mdx'))
const Inputs = lazy(() => import('./pages/posts/controlled-inputs/index.mdx'))
const Suspense = lazy(() => import('./pages/posts/suspense-data-ssr/index.mdx'))
const State = lazy(() => import('./pages/posts/state-outside-vdom/index.mdx'))
const Hydration = lazy(() => import('./pages/posts/hydration/index.mdx'))

const GlobalStyles = createGlobalStyles`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  blockquote {
    display: flex;
    text-align: center;
    border-left: 1px solid grey;
    margin-left: 24px;
    padding-left: 12px;
  }

  html, body {
    font-kerning: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: 'Inter', sans-serif, system-ui;
    line-height: 1.5;
  }

  pre, code {
    font-family: 'Fira Code', monospace;
  }

  h1 {
    font-weight: 500;
    font-size: 3rem;
    margin-bottom: 0.5em;
    line-height: 1;
  }

  h2 {
    font-weight: 500;
    font-size: 2.5rem;
    margin-bottom: 0.5em;
  }

  p, a, li {
    font-size: 1rem;
  }
`

setup(h)

export function App() {
  return (
    <>
      <GlobalStyles />
      <Layout>
        <ErrorBoundary>
          <div>
            <Router>
              <Route component={Home} path="/" />
              <Route component={Blog} path="/blog" />
              <Route component={VDom} path="/blog/vdom-compilers" />
              <Route component={Inputs} path="/blog/controlled-inputs" />
              <Route component={Suspense} path="/blog/suspense-data-ssr" />
              <Route component={State} path="/blog/state-in-vdom" />
              <Route component={Hydration} path="/blog/hydration-and-preact" />
              <Route component={NotFound} default />
            </Router>
          </div>
        </ErrorBoundary>
      </Layout>
    </>
  )
}
