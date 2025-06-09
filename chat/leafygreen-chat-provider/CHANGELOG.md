# @lg-chat/leafygreen-chat-provider

## 4.0.0

### Major Changes

- 0757cfbfc: Updates Typescript build to TS5.8

### Patch Changes

- 0757cfbfc: Adds `@lg-tools/build` as a dev dependency
- 0757cfbfc: Adds missing `@lg-tools/` devDependencies.
  Updates `build`, `tsc` & `docs` scripts to use `lg-build *` cli
- 0757cfbfc: Updates `types` entry point to `./dist/types`.
  Removes redundant `compilerOptions` from TSConfig
- 0757cfbfc: Updates `main` entry point in package.json to `./dist/umd`

## 3.0.2

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))

## 3.0.1

### Patch Changes

- e1955dd36: Fixes broken patch build

## 3.0.0

### Major Changes

- 274d7e1a7: Removes prop-types from LeafyGreen UI

## 2.0.0

### Major Changes

- 36070800: First public release of `@lg-chat` components

## 1.0.2

### Patch Changes

- Empty patch bump to include missing builds

## 1.0.1

### Patch Changes

- 1369d9f: Empty patch version to trigger new Artifactory publish

## 1.0.0

### Major Changes

- Responsiveness behavior with LeafyGreenChatProvider
