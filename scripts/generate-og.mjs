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
const postsDir = path.join(root, 'src', 'content', 'posts')
const publicDir = path.join(root, 'public')

const WIDTH = 1200
const HEIGHT = 630
const BACKGROUND = '#0b0b0c'
const ACCENT = '#eb29a9'
const TEXT = '#fcfcfd'
const MUTED = '#a1a1aa'
const MONO = 'JetBrains Mono'

const { tagBgs } = await import(
  pathToFileURL(path.join(root, 'src', 'data', 'tags.ts'))
)

const fontFile = (pkg, file) =>
  readFile(
    path.join(
      path.dirname(require.resolve(`${pkg}/package.json`)),
      'files',
      file
    )
  )

const fonts = [
  {
    name: 'Inter',
    weight: 400,
    style: 'normal',
    data: await fontFile('@fontsource/inter', 'inter-latin-400-normal.woff'),
  },
  {
    name: 'Inter',
    weight: 600,
    style: 'normal',
    data: await fontFile('@fontsource/inter', 'inter-latin-600-normal.woff'),
  },
  {
    name: MONO,
    weight: 400,
    style: 'normal',
    data: await fontFile(
      '@fontsource/jetbrains-mono',
      'jetbrains-mono-latin-400-normal.woff'
    ),
  },
]

const avatar = `data:image/jpeg;base64,${(
  await readFile(path.join(publicDir, 'me.jpg'))
).toString('base64')}`

const h = (type, style, children) => ({ type, props: { style, children } })

const formatDate = (date) =>
  Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date))

// Long titles step down so title and description always fit the card.
const titleSize = (title) =>
  title.length > 60 ? 56 : title.length > 36 ? 64 : 76

const tag = (name) =>
  h('div', { display: 'flex', alignItems: 'center' }, [
    h('div', {
      width: 12,
      height: 12,
      borderRadius: 3,
      marginRight: 10,
      backgroundColor: tagBgs[name] ?? MUTED,
    }),
    name,
  ])

const template = ({ title, description, createdAt, tags = [] }) =>
  h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: BACKGROUND,
      color: TEXT,
      fontFamily: 'Inter',
      padding: '64px 72px',
    },
    [
      h(
        'div',
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: MONO,
          fontSize: 22,
          color: MUTED,
        },
        [
          h('div', { display: 'flex', alignItems: 'center' }, [
            h('div', {
              width: 14,
              height: 14,
              borderRadius: 3,
              marginRight: 14,
              backgroundColor: ACCENT,
            }),
            'jovidecroock.com/blog',
          ]),
          createdAt ? formatDate(createdAt) : '',
        ]
      ),
      h('div', { display: 'flex', flexDirection: 'column' }, [
        h(
          'div',
          {
            fontSize: titleSize(title),
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: '-0.035em',
            maxWidth: 1040,
          },
          title
        ),
        h(
          'div',
          {
            display: 'block',
            fontSize: 30,
            lineHeight: 1.4,
            marginTop: 24,
            color: '#a6a7a7',
            maxWidth: 980,
            lineClamp: 2,
          },
          description
        ),
      ]),
      h(
        'div',
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 28,
          borderTop: '1px solid #26262b',
        },
        [
          h('div', { display: 'flex', alignItems: 'center' }, [
            {
              type: 'img',
              props: {
                src: avatar,
                width: 64,
                height: 64,
                style: { borderRadius: '50%', objectFit: 'cover' },
              },
            },
            h(
              'div',
              { display: 'flex', flexDirection: 'column', marginLeft: 18 },
              [
                h('div', { fontSize: 24, fontWeight: 600 }, 'Jovi De Croock'),
                h('div', { fontSize: 20, color: MUTED }, '@jovidecroock.com'),
              ]
            ),
          ]),
          h(
            'div',
            {
              display: 'flex',
              gap: 24,
              fontFamily: MONO,
              fontSize: 20,
              color: MUTED,
            },
            tags.slice(0, 3).map(tag)
          ),
        ]
      ),
    ]
  )

async function generate(slug, { force }) {
  const propsPath = path.join(postsDir, slug, 'documentProps.ts')
  if (!existsSync(propsPath)) {
    console.error(`✗ ${slug}: no documentProps.ts found`)
    return false
  }

  const { documentProps } = await import(pathToFileURL(propsPath))
  const { title, description, image, createdAt, tags } = documentProps
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

  const svg = await satori(template({ title, description, createdAt, tags }), {
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
