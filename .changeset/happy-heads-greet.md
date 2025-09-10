---
'@leafygreen-ui/icon': minor
---

### New Features 
- Adds "exports" field  to package json
- Adds direct icon import pattern (e.g. `import CloudIcon from "@leafygreen-ui/icon/Cloud"`)
- Ensures backwards compatibility using "dist/*" imports

### Tooling
- Isolates build script from component TS project
- Updates individual icon build script to use the Rollup API directly
- Removes `postbuild` script. It's now redundant with the `"./dist/*"` exports field