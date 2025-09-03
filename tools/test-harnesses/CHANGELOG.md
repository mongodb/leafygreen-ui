# @lg-tools/test-harnesses

## 0.3.3

### Patch Changes

- 172c228: Removes `*.spec.ts` files from tsconfig `exclude` pattern, ensuring that tests are type-checked at build time.
  Also adds missing TS "references" for packages that are imported into test files

## 0.3.2

### Patch Changes

- da277d5: Export `RenderAsyncTestReturnType` type
  https://jira.mongodb.org/browse/LG-5290

## 0.3.1

### Patch Changes

- caaaeeb: Exports `RenderAsyncTestReturnType` type.

## 0.3.0

### Minor Changes

- 0757cfbfc: Updates Typescript build to TS5.8

### Patch Changes

- 0757cfbfc: Adds `@lg-tools/build` as a dev dependency
- 0757cfbfc: Adds missing `@lg-tools/` devDependencies.
  Updates `build`, `tsc` & `docs` scripts to use `lg-build *` cli
- 0757cfbfc: Updates `types` entry point to `./dist/types`.
  Removes redundant `compilerOptions` from TSConfig
- 0757cfbfc: Updates `main` entry point in package.json to `./dist/umd`

## 0.2.0

### Minor Changes

- 3111a76f3: Export `queryByLgId` util in addition to the already exported `findByLgId` and `getByLgId` utils

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))

## 0.1.4

### Patch Changes

- e1955dd36: Fixes broken patch build

## 0.1.3

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`

## 0.1.2

### Patch Changes

- 8adadc89: Fixes a bug that prevented packages from rendering in a server-side environment

## 0.1.1

### Patch Changes

- c3906f78: - Exports types for `FormElements` and `FormUtils`.
  - Exports util `queryBySelector`.
  - Exports async test helper `renderAsyncTest`.
  - Adds `DropdownElements` type.

## 0.1.0

### Minor Changes

- ab762558: Minor pre-release of `Test Harnesses`. This package provides several fundamental queries that are used by all component specific test harnesses.
