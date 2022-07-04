import renderToString from 'preact-render-to-string'
import prepass from 'preact-ssr-prepass'
import { LocationProvider } from 'preact-iso'
import { extractCss } from 'goober'
import { toStatic } from 'hoofd/preact'
import { App } from './App'

// @ts-ignore
global.location = {
  origin: 'http://localhost:3000'
}

export async function render(url) {
  let jsx = (
    // @ts-ignore
    <LocationProvider url={url}>
      <App />
    </LocationProvider>
  )
  await prepass(jsx)
  const html = renderToString(jsx)
  return {
    body: html,
    meta: toStatic(),
    css: extractCss()
  }
}
