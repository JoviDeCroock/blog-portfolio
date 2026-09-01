#!/bin/bash
# Rough look at which router features are present in the built client chunk.
set -euo pipefail
F=$(ls dist/client/assets/client-*.js)
echo "file: $F ($(wc -c < "$F" | tr -d ' ') bytes)"
for s in prefetch speculationrules startViewTransition EventSource \
         capabilit island devtool overlay FormData scrollRestoration \
         revalidat webmcp x-pracht popstate IntersectionObserver \
         requestIdleCallback; do
  printf "  %-22s %s\n" "$s" "$(grep -o -i "$s" "$F" | wc -l | tr -d ' ')"
done
