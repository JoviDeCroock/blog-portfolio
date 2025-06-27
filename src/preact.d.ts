// preact.d.ts
/// <reference types="preact" />

import { JSX } from 'preact'

declare global {
  namespace JSX {
    interface IntrinsicElements extends preact.JSX.IntrinsicElements {}
  }
}

declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element
  export default MDXComponent
}
