import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.cjs')

// determine routes to pre-render from src/pages
const routesToPrerender = fs
  .readdirSync(toAbsolute('src/pages'))
  .map((file) => {
    const name = file.replace(/\.tsx$/, '').toLowerCase()
    return name === 'home' ? `/` : `/${name}`
  })

// TODO: posts

;(async () => {
  // pre-render each route...
  for (const url of routesToPrerender) {
    const context = {}
    const result = await render(url, context)

    let html = template.replace(`<div id="main"></div>`, `<div id="main">${result.body}</div>`)
    html = html.replace(`<!-- STYLE CONTENT -->`, `<style id="_goober">${result.css}</style>`)

    const filePath = `dist/static${url === '/' ? '/index' : url}.html`
    fs.writeFileSync(toAbsolute(filePath), html)
    console.log('pre-rendered:', filePath)
  }
})()
