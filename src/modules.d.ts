// Ambient declarations for the non-TypeScript modules the app imports.
//
// This file must stay free of top-level imports. A file with one becomes a
// module, and inside a module `declare module '*.mdx'` reads as a module
// augmentation, where wildcard specifiers are not allowed — which is why these
// live here rather than alongside the JSX types in preact.d.ts.

declare module '*.mdx' {
  const MDXComponent: (
    props: Record<string, unknown>
  ) => import('preact').JSX.Element
  export default MDXComponent
}

declare module '*.module.css' {
  const classes: Readonly<Record<string, string>>
  export default classes
}
