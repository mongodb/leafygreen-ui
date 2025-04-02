---
'@leafygreen-ui/icon': patch
---

- Updates `prebuild` script
  - updates to ESM module
  - runs `ESLint` and `Prettier` on generated `glyphs/icon.ts` file
  - replaces `meow` with `commander`
  - adds `verbose` logging flag
  - removes unused `[inputFiles]` argument
  - uses `prebuild.ts` script contents to generate svgr checksum
