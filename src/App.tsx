import { h } from 'preact'
import { setup } from 'goober'
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
const Timings = lazy(() => import('./pages/posts/browser-timings/index.mdx'))
const UseId = lazy(() => import('./pages/posts/preact-use-id/index.mdx'))

setup(h)

export function App() {
  return (
    <>
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
              <Route component={Timings} path="/blog/browser-timings" />
              <Route component={UseId} path="/blog/preact-use-id" />
              <Route component={NotFound} default />
            </Router>
          </div>
        </ErrorBoundary>
      </Layout>
    </>
  )
}
