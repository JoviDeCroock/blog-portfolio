// Generates OG images (1200x630) for blog posts from their documentProps.ts.
//
// Usage:
//   node scripts/generate-og.mjs <slug> [<slug> ...]   generate for specific posts
//   node scripts/generate-og.mjs --all                 generate for posts missing an image
//   node scripts/generate-og.mjs --all --force         regenerate every post image
//
// The output filename is derived from documentProps.image and written to public/.

import { readdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import sharp from 'sharp'

const require = createRequire(import.meta.url)
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const postsDir = path.join(root, 'src', 'pages', 'posts')
const publicDir = path.join(root, 'public')

const WIDTH = 1200
const HEIGHT = 630
const BACKGROUND = '#4287F5'

const interDir = path.dirname(require.resolve('@fontsource/inter/package.json'))
const font = (weight) =>
  readFile(path.join(interDir, 'files', `inter-latin-${weight}-normal.woff`))

const fonts = [
  { name: 'Inter', weight: 400, style: 'normal', data: await font(400) },
  { name: 'Inter', weight: 600, style: 'normal', data: await font(600) },
]

const avatar = `data:image/jpeg;base64,${(
  await readFile(path.join(publicDir, 'me.jpg'))
).toString('base64')}`

const h = (type, style, children) => ({ type, props: { style, children } })

const template = ({ title, description }) =>
  h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: BACKGROUND,
      color: 'white',
      fontFamily: 'Inter',
      padding: '40px 24px 10px',
    },
    [
      h('div', { display: 'flex', flexDirection: 'column' }, [
        h('div', { fontSize: 64, fontWeight: 600, lineHeight: 1.2 }, title),
        h(
          'div',
          {
            fontSize: 34,
            fontWeight: 400,
            lineHeight: 1.4,
            marginTop: 40,
            maxWidth: 1100,
          },
          description
        ),
      ]),
      h('div', { display: 'flex', alignItems: 'flex-end' }, [
        {
          type: 'img',
          props: {
            src: avatar,
            width: 180,
            height: 180,
            style: { borderRadius: '50%', objectFit: 'cover' },
          },
        },
        h(
          'div',
          { fontSize: 30, fontWeight: 400, marginLeft: 24, marginBottom: 16 },
          'Jovi De Croock - @JoviDeC'
        ),
      ]),
    ]
  )

async function generate(slug, { force }) {
  const propsPath = path.join(postsDir, slug, 'documentProps.ts')
  if (!existsSync(propsPath)) {
    console.error(`✗ ${slug}: no documentProps.ts found`)
    return false
  }

  const { documentProps } = await import(pathToFileURL(propsPath))
  const { title, description, image } = documentProps
  if (!image) {
    console.error(`✗ ${slug}: documentProps.image is not set`)
    return false
  }

  const filename = path.basename(new URL(image).pathname)
  const outPath = path.join(publicDir, filename)
  if (existsSync(outPath) && !force) {
    console.log(
      `- ${slug}: ${filename} already exists (use --force to regenerate)`
    )
    return true
  }

  const svg = await satori(template({ title, description }), {
    width: WIDTH,
    height: HEIGHT,
    fonts,
  })
  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: WIDTH },
  })
    .render()
    .asPng()

  const buffer = /\.jpe?g$/.test(filename)
    ? await sharp(png)
        .flatten({ background: BACKGROUND })
        .jpeg({ quality: 90 })
        .toBuffer()
    : png

  await writeFile(outPath, buffer)
  console.log(`✓ ${slug}: wrote public/${filename}`)
  return true
}

const args = process.argv.slice(2)
const force = args.includes('--force')
const all = args.includes('--all')
const slugs = args.filter((arg) => !arg.startsWith('--'))

if (all) {
  const entries = await readdir(postsDir, { withFileTypes: true })
  slugs.push(...entries.filter((e) => e.isDirectory()).map((e) => e.name))
} else if (slugs.length === 0) {
  console.error(
    'Usage: node scripts/generate-og.mjs <slug> [--force] | --all [--force]'
  )
  process.exit(1)
}

let ok = true
for (const slug of slugs) {
  // Explicitly named slugs are always regenerated; --all only fills in missing images.
  ok = (await generate(slug, { force: force || !all })) && ok
}
process.exit(ok ? 0 : 1)
