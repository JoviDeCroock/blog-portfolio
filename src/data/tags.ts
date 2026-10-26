// Tag colors, shared by the blog filter and the OG image generator. Kept
// dependency-free so scripts can import it directly with Node.

export const tagBgs: Record<string, string> = {
  performance: '#0284c7', // sky blue
  graphql: '#e10098', // GraphQL pink (brand)
  engineering: '#16a34a', // green (was near-black, now legible)
  'front-end': '#7c3aed', // violet
  vdom: '#0d9488', // teal (was harsh lime)
  state: '#db2777', // pink
  suspense: '#dc2626', // red
  thinking: '#d97706', // amber
  external: '#4f46e5', // indigo
  'server-side-rendering': '#0891b2', // cyan
  'open-source': '#ea580c', // orange
  rest: '#059669', // emerald
  trpc: '#7e22ce', // purple
  llm: '#be185d', // rose
  signals: '#c2410c', // burnt orange
  web: '#1d4ed8', // blue
  security: '#334155',
  personal: '#a21caf', // fuchsia
} as const
