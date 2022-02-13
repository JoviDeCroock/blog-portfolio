import { h, render } from 'preact'
import { setup } from 'goober'
import { createGlobalStyles } from 'goober/global'
import { LocationProvider, Router } from 'preact-iso'
import Home from './pages/Home'
import Blog from './pages/Blog'
import posts from './pages/posts'
import NotFound from './pages/404'

const GlobalStyles = createGlobalStyles`
  *, *::before, *::after {
    box-sizing: border-box;
  }
`

setup(h)

export function App() {
  return (
    <LocationProvider>
      <div className="app">
        <GlobalStyles />
        <Router>
          <Home path="/" />
          <Blog path="/blog" />
          {posts.map((post) => (
            <post.Component path={post.path} />
          ))}
          <NotFound default />
        </Router>
      </div>
    </LocationProvider>
  )
}

const element = document.getElementById('main')
if (element) render(<App />, element)
