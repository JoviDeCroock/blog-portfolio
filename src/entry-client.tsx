import { render } from "preact"
import { LocationProvider } from "preact-iso"
import { App } from "./App"

const element = document.getElementById('main')
let jsx = (
  <LocationProvider>
    <App />
  </LocationProvider>
)
if (element) render(jsx, element)
