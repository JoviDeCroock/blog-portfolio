import { render } from 'preact'
import { LocationProvider, hydrate } from 'preact-iso'
import { App } from './App'

<<<<<<< HEAD
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
=======
if (typeof window !== 'undefined') {
  const element = document.getElementById('main')
  let jsx = (
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
}


export async function prerender() {
  const { prerender: ssr } = await import('preact-iso')
  const { extractCss } = await import('goober')
  const { toStatic } = await import('hoofd/preact')

	const { html, links } = await ssr(<LocationProvider><App /></LocationProvider>);
  const styles = extractCss();
  const head = toStatic();

  const headElements = [...head.metas.map(meta => ({
    type: 'meta',
    props: meta
  })), ...head.links.map(link => ({ type: 'link', props: link })), ...head.scripts.map(script => ({ type: 'script', props: script }))]
	return {
		html,
		links,
		renderTarget: "#main",
		head: {
			lang: head.lang,
			title: head.title,
			elements: new Set([
        {
          type: 'style',
          props: {
            id: "_goober",
            children: styles
          }
        },
        ...headElements
			]),
		},
	};
>>>>>>> 3cc0701 (try prerender plugin)
}
