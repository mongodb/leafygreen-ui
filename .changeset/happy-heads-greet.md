---
'@leafygreen-ui/icon': minor
---

- Adds "exports" field  to package json
- Ensures backwards compatibility using "dist/*" imports
- Isolates build script from component TS project
- Updates individual icon build script to use the Rollup API directly
- Removes `postbuild` script. It's now redundant with the "./dist/*" exports field