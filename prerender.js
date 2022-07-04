import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.cjs')
try {
  fs.mkdirSync(toAbsolute('dist/blog'))
} catch (e) {}

// determine routes to pre-render from src/pages
const routesToPrerender = fs
  .readdirSync(toAbsolute('src/pages'))
  .map((file) => {
    const name = file.replace(/\.tsx$/, '').toLowerCase()
    return name === 'home' ? `/` : `/${name}`
  })

const postsToPrerender = [
  '/blog/vdom-compilers',
  '/blog/controlled-inputs',
  '/blog/suspense-data-ssr',
  '/blog/state-in-vdom',
]

;(async () => {
  // pre-render each route...
  for (const url of [...routesToPrerender, ...postsToPrerender]) {
    const result = await render(url)

    let html = template.replace(`<div id="main"></div>`, `<div id="main">${result.body}</div>`)
    console.log(result.css)
    html = html.replace(`<!-- STYLE CONTENT -->`, `<style id="_goober">${result.css}</style>`)

    const filePath = `dist${url === '/' ? '/index' : url}.html`
    fs.writeFileSync(toAbsolute(filePath), html)
    console.log('pre-rendered:', filePath)
  }
})()
