// preact.d.ts
import JSX = preact.JSX;

declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}
