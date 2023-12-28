import { render, hydrate } from 'preact'
import { LocationProvider } from 'preact-iso'
import { App } from './App'

const element = document.getElementById('main')
let jsx = (
  // @ts-expect-error
  <LocationProvider>
    <App />
  </LocationProvider>
)
if (element && element.hasChildNodes()) {
  hydrate(jsx, element)
} else if (element) {
  // Dev
  render(jsx, element)
}
