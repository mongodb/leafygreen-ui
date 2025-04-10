---
'@lg-tools/storybook-utils': patch
---

Exports `getDirectoriesGlob`. Returns a glob pattern to match all directories in the package.json "lg" config

Exports `findStories`. Finds all story files to include based on the provided include/exclude glob patterns. By default, includes all `*.stories.tsx` files in the src directory of each package and excludes all `node_modules` directories.
