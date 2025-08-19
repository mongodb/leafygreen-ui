---
'@lg-tools/codemods': patch
---

Fix codemods package path resolution issue that prevented discovery of available codemods when built to UMD/ESM output directories.
Codemods can now be properly listed and executed via `pnpm lg codemod --list` and `pnpm lg codemod <name>`.
