# @lg-charts/series-provider

## 1.0.3

### Patch Changes

- 172c228: Removes `*.spec.ts` files from tsconfig `exclude` pattern, ensuring that tests are type-checked at build time.
  Also adds missing TS "references" for packages that are imported into test files
- Updated dependencies [172c228]
  - @leafygreen-ui/leafygreen-provider@5.0.3
  - @leafygreen-ui/lib@15.2.1
  - @lg-charts/colors@1.0.3

## 1.0.2

### Patch Changes

- Updated dependencies [b67497a]
  - @leafygreen-ui/lib@15.2.0
  - @lg-charts/colors@1.0.2
  - @leafygreen-ui/leafygreen-provider@5.0.2

## 1.0.1

### Patch Changes

- Updated dependencies [164b15f]
- Updated dependencies [518ce41]
- Updated dependencies [3bef1e7]
  - @leafygreen-ui/lib@15.1.0
  - @lg-charts/colors@1.0.1
  - @leafygreen-ui/leafygreen-provider@5.0.1

## 1.0.0

### Minor Changes

- 21371bddd: [LG-5091](https://jira.mongodb.org/browse/LG-5091): add `customColors` prop to `SeriesProvider` to enable customizing chart component colors
- 0757cfbfc: Updates Typescript build to TS5.8

### Patch Changes

- 0757cfbfc: Adds `@lg-tools/build` as a dev dependency
- 0757cfbfc: Adds missing `@lg-tools/` devDependencies.
  Updates `build`, `tsc` & `docs` scripts to use `lg-build *` cli
- 0757cfbfc: Updates `types` entry point to `./dist/types`.
  Removes redundant `compilerOptions` from TSConfig
- 0757cfbfc: Updates `main` entry point in package.json to `./dist/umd`
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [21371bddd]
- Updated dependencies [0757cfbfc]
  - @leafygreen-ui/leafygreen-provider@5.0.0
  - @lg-charts/colors@1.0.0
  - @leafygreen-ui/lib@15.0.0

## 0.2.2

### Patch Changes

- @leafygreen-ui/leafygreen-provider@4.0.7

## 0.2.1

### Patch Changes

- @leafygreen-ui/leafygreen-provider@4.0.6

## 0.2.0

### Minor Changes

- 206278b0f: Updates `SeriesContext`

  - Removes `checkedState`
  - Adds `getSeriesIndex`

  Add and export `SeriesName` type
