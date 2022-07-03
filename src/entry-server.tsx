import renderToString from 'preact-render-to-string'
import { LocationProvider } from 'preact-iso'
import { App } from './App'

// @ts-ignore
global.location = {
  origin: 'http://localhost:3000'
}

export function render(url) {
  return renderToString(
    // @ts-ignore
    <LocationProvider url={url}>
      <App />
    </LocationProvider>
  )
}
