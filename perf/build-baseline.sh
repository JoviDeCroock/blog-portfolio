#!/bin/bash
# Rebuilds the pre-migration site from its commit into perf/baseline-src, so the
# old and new builds can be benchmarked with the same tooling and dependencies.
set -euo pipefail

# The baseline is the last commit before the pracht conversion. Resolved by
# subject rather than by SHA so a rebase of this branch does not silently point
# the script at a commit that no longer exists.
BASELINE_SUBJECT='Extract post registry into a JSX-free data module'
REF="${1:-}"
if [ -z "$REF" ]; then
  REF=$(git log -1 --format='%H' --fixed-strings --grep="$BASELINE_SUBJECT")
fi
if [ -z "$REF" ]; then
  echo "could not find the baseline commit (\"$BASELINE_SUBJECT\");" \
       "pass one explicitly: $0 <ref>" >&2
  exit 1
fi
echo "baseline ref: $(git log --oneline -1 "$REF")"

DEST="perf/baseline-src"

rm -rf "$DEST"
mkdir -p "$DEST"
git archive "$REF" | tar -x -C "$DEST"

# Reuse the installed dependencies rather than resolving a second tree.
ln -s "$PWD/node_modules" "$DEST/node_modules"

cd "$DEST"
node_modules/.bin/vite build --outDir dist
echo "baseline built at $DEST/dist"
