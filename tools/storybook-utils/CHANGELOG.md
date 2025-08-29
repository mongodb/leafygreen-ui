# @lg-tools/storybook-utils

## 0.3.1

### Patch Changes

- 172c228: Removes `*.spec.ts` files from tsconfig `exclude` pattern, ensuring that tests are type-checked at build time.
  Also adds missing TS "references" for packages that are imported into test files

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

## 0.2.3

### Patch Changes

- 485b4099c: Exports `findStories` from utils

## 0.2.2

### Patch Changes

- 963cda31d: Upgrade to Storybook 8.6

## 0.2.1

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))

## 0.2.0

### Minor Changes

- 5eb01750b: Upgrades to Storybook 8.5

## 0.1.3

### Patch Changes

- e1955dd36: Fixes broken patch build

## 0.1.2

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`

## 0.1.1

### Patch Changes

- dfd6972c: Adds `data-lgid` to `storybookExcludedControlParams` and `storybookExcludedArgTypes`.

## 0.1.0

### Minor Changes

- 15185af0: Initial pre-release of `@lg-tools/storybook-utils`
