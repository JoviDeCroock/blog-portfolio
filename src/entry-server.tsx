import renderToString from 'preact-render-to-string'
import { LocationProvider } from 'preact-iso'
import { extractCss } from 'goober'
import { App } from './App'

// @ts-ignore
global.location = {
  origin: 'http://localhost:3000'
}

export function render(url) {
  const html = renderToString(
    // @ts-ignore
    <LocationProvider url={url}>
      <App />
    </LocationProvider>
  )
  return {
    body: html,
    css: extractCss()
  }
}
