#!/bin/bash
# One-off: lift the post registry out of the Blog *component* module into a
# plain data module, so build-time consumers (RSS, sitemap, the route manifest)
# can import it without dragging JSX through the Vite config bundle.
set -euo pipefail

SRC=src/pages/Blog.tsx
OUT=src/data/posts.ts
mkdir -p src/data

{
  echo "// Post registry. Kept free of JSX so build-time consumers (RSS, sitemap,"
  echo "// the route manifest) can import it from the Vite config without pulling"
  echo "// a component graph in."
  echo
  # documentProps imports (lines 6-38), repointed one directory deeper.
  sed -n '6,38p' "$SRC" | sed "s#from './posts/#from '../pages/posts/#"
  echo
  # Post interface + posts array (lines 40-92).
  sed -n '40,92p' "$SRC"
  echo
  # tagBgs map (lines 243-262), exported.
  sed -n '243,262p' "$SRC" | sed '1s/^const /export const /'
} > "$OUT"

echo "wrote $OUT ($(grep -c '' "$OUT") lines)"
