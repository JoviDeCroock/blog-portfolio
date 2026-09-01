#!/bin/bash
# Rebuilds the pre-migration site from its commit into perf/baseline-src, so the
# old and new builds can be benchmarked with the same tooling and dependencies.
set -euo pipefail

REF="${1:-645e5c2}"
DEST="perf/baseline-src"

rm -rf "$DEST"
mkdir -p "$DEST"
git archive "$REF" | tar -x -C "$DEST"

# Reuse the installed dependencies rather than resolving a second tree.
ln -s "$PWD/node_modules" "$DEST/node_modules"

cd "$DEST"
node_modules/.bin/vite build --outDir dist
echo "baseline built at $DEST/dist"
