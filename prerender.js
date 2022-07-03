import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'url'
import { extractCss } from 'goober'

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
    const appHtml = await render(url, context)
    const styleTag = `<style id="_goober">${extractCss()}</style>`;
    console.log(styleTag)
    const html = template.replace(`<div id="main"></div>`, `<div id="main">${appHtml}</div>`)

    const filePath = `dist/static${url === '/' ? '/index' : url}.html`
    fs.writeFileSync(toAbsolute(filePath), html)
    console.log('pre-rendered:', filePath)
  }
})()
