# @lg-chat/leafygreen-chat-provider

## 5.0.2

### Patch Changes

- dc3299b: Adds "exports" field to all packages
  Enables TS downleveling to TS 4.9

## 5.0.1

### Patch Changes

- 172c228: Resolves TS scoping errors by moving `test` utilities into `src`.
- 172c228: Removes `*.spec.ts` files from tsconfig `exclude` pattern, ensuring that tests are type-checked at build time.
  Also adds missing TS "references" for packages that are imported into test files

## 5.0.0

### Major Changes

- d72b413: [LG-5436](https://jira.mongodb.org/browse/LG-5436): make `compact` variant the default and mark `spacious` variant deprecated in `LeafyGreenChatContext`
  [LG-5441](https://jira.mongodb.org/browse/LG-5441): add `assistantName` prop to `LeafyGreenChatContext` and refactor `Message` to use value from context

## 4.1.0

### Minor Changes

- 82d0ad2: [LG-5360](https://jira.mongodb.org/browse/LG-5360): add `variant` prop to `LeafyGreenChatProvider` which can be used to determine the visual variant of chat components
  - `compact`: A dense, smaller variant ideal for use in constrained spaces within product UIs like a drawer or side panel.
  - `spacious`: A larger, more expressive variant with bigger fonts and more white space, designed for marketing pages or standalone popovers.

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
