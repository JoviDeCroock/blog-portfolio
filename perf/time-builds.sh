#!/bin/bash
# Times a cold production build of both sites, three runs each.
set -euo pipefail

time_build() {
  local label="$1" dir="$2"
  shift 2
  local best=999999
  for _ in 1 2 3; do
    rm -rf "$dir/dist"
    local start end ms
    start=$(date +%s%N)
    (cd "$dir" && "$@" >/dev/null 2>&1)
    end=$(date +%s%N)
    ms=$(((end - start) / 1000000))
    [ "$ms" -lt "$best" ] && best=$ms
  done
  echo "$label: ${best}ms (best of 3)"
}

time_build "baseline " perf/baseline-src node_modules/.bin/vite build --outDir dist
time_build "pracht   " . pnpm build
