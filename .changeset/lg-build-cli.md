---
'@lg-tools/build': patch
---

Adds `lg-build` cli command.
Usage:
```bash
# Build the production bundle
lg-build bundle

# Build types
lg-build tsc

# Builds docs
lg-build docs

# Build & downlevel types
lg-build tsc --downlevel

# Build, downlevel & update package.json types references
lg-build tsc --downlevel --update
```
