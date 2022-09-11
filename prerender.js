import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')
try {
  fs.mkdirSync(toAbsolute('dist/blog'))
} catch (e) {}

// determine routes to pre-render from src/pages
const routesToPrerender = fs
  .readdirSync(toAbsolute('src/pages'))
  .map((file) => {
    const name = file.replace(/\.tsx$/, '').toLowerCase()
    if (name === 'posts') return null;
    return name === 'home' ? '/' :`/${name}`
  }).filter(Boolean)

const postsToPrerender = [
  '/blog/vdom-compilers',
  '/blog/controlled-inputs',
  '/blog/suspense-data-ssr',
  '/blog/state-in-vdom',
  '/blog/hydration-and-preact',
  '/blog/browser-timings',
  '/blog/preact-use-id',
]

const generateHead = res => {
  return `<title>${res.title}</title>
${res.links.map(x => `    <link href="${x.href}" rel="${x.rel}"></link>`).join('\n')}
${res.metas.map(x => {
  const keyword = x.property ? 'property' : 'name';
  if (x.content) {
    return `    <meta ${keyword}="${x[keyword]}" content="${x.content}"></meta>`
  }
}).filter(Boolean).join('\n')}`
}

;(async () => {
  // pre-render each route...
  for (const url of [...routesToPrerender, ...postsToPrerender]) {
    const result = await render(url)

    let html = template.replace(`<div id="main"></div>`, `<div id="main">${result.body}</div>`)
    html = html.replace(`<!-- STYLE CONTENT -->`, `<style id="_goober">${result.css}</style>`)
    html = html.replace(`<!-- META CONTENT -->`, generateHead(result.meta))

    const filePath = `dist${url === '/' ? '/index' : url === '/blog' ? '/blog/index' : url}.html`
    fs.writeFileSync(toAbsolute(filePath), html)
    console.log('pre-rendered:', filePath)
  }
})()
