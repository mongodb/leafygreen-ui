# @lg-charts/chart-card

## 1.1.0

### Minor Changes

- e0c767c: Supports `React.ReactNode` as type for `title` prop

## 1.0.6

### Patch Changes

- cee1e79: Interfaces now extend built-in `React.ComponentType` rather than custom `HTMLElementProps` for compatability with React 19
- Updated dependencies [1a5c69f]
- Updated dependencies [aeb3b3f]
- Updated dependencies [3471b94]
- Updated dependencies [6f30c55]
- Updated dependencies [cee1e79]
- Updated dependencies [6f30c55]
  - @leafygreen-ui/icon@14.5.1
  - @leafygreen-ui/icon-button@17.0.6
  - @leafygreen-ui/hooks@9.1.4
  - @leafygreen-ui/lib@15.4.0
  - @leafygreen-ui/typography@22.1.3
  - @leafygreen-ui/emotion@5.0.3

## 1.0.5

### Patch Changes

- dc3299b: Adds "exports" field to all packages
  Enables TS downleveling to TS 4.9
- Updated dependencies [a9eb172]
- Updated dependencies [5ef631a]
- Updated dependencies [dc3299b]
  - @leafygreen-ui/lib@15.3.0
  - @leafygreen-ui/icon@14.5.0
  - @leafygreen-ui/emotion@5.0.2
  - @leafygreen-ui/hooks@9.1.3
  - @leafygreen-ui/icon-button@17.0.5
  - @leafygreen-ui/leafygreen-provider@5.0.4
  - @leafygreen-ui/tokens@3.2.4
  - @leafygreen-ui/typography@22.1.2

## 1.0.4

### Patch Changes

- e1bc444: Adjusts grid layout for proper header positioning where the `title` takes up just the space it needs, and `headerContent` takes up the remainder of the header space.
- 172c228: Removes `*.spec.ts` files from tsconfig `exclude` pattern, ensuring that tests are type-checked at build time.
  Also adds missing TS "references" for packages that are imported into test files
- Updated dependencies [172c228]
- Updated dependencies [172c228]
  - @leafygreen-ui/hooks@9.1.2
  - @leafygreen-ui/emotion@5.0.1
  - @leafygreen-ui/icon@14.4.1
  - @leafygreen-ui/icon-button@17.0.4
  - @leafygreen-ui/leafygreen-provider@5.0.3
  - @leafygreen-ui/lib@15.2.1
  - @leafygreen-ui/tokens@3.2.3
  - @leafygreen-ui/typography@22.1.1

## 1.0.3

### Patch Changes

- Updated dependencies [b67497a]
  - @leafygreen-ui/lib@15.2.0
  - @leafygreen-ui/hooks@9.1.1
  - @leafygreen-ui/icon@14.1.0
  - @leafygreen-ui/icon-button@17.0.3
  - @leafygreen-ui/leafygreen-provider@5.0.2
  - @leafygreen-ui/tokens@3.1.2
  - @leafygreen-ui/typography@22.0.1

## 1.0.2

### Patch Changes

- Updated dependencies [164b15f]
- Updated dependencies [518ce41]
- Updated dependencies [3bef1e7]
- Updated dependencies [3bef1e7]
- Updated dependencies [164b15f]
- Updated dependencies [1eafbb5]
  - @leafygreen-ui/lib@15.1.0
  - @leafygreen-ui/hooks@9.1.0
  - @leafygreen-ui/typography@22.0.0
  - @leafygreen-ui/icon@14.1.0
  - @leafygreen-ui/icon-button@17.0.2
  - @leafygreen-ui/leafygreen-provider@5.0.1
  - @leafygreen-ui/tokens@3.1.1

## 1.0.1

### Patch Changes

- Updated dependencies [4bd4da3]
- Updated dependencies [caaaeeb]
  - @leafygreen-ui/tokens@3.1.0
  - @leafygreen-ui/icon-button@17.0.1
  - @leafygreen-ui/typography@21.0.1

## 1.0.0

### Minor Changes

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
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
  - @leafygreen-ui/leafygreen-provider@5.0.0
  - @leafygreen-ui/icon-button@17.0.0
  - @leafygreen-ui/typography@21.0.0
  - @leafygreen-ui/emotion@5.0.0
  - @leafygreen-ui/tokens@3.0.0
  - @leafygreen-ui/hooks@9.0.0
  - @leafygreen-ui/icon@14.0.0
  - @leafygreen-ui/lib@15.0.0

## 0.2.5

### Patch Changes

- Updated dependencies [eca6e3fdc]
  - @leafygreen-ui/icon@13.4.0
  - @leafygreen-ui/icon-button@16.0.12
  - @leafygreen-ui/typography@20.1.9

## 0.2.4

### Patch Changes

- Updated dependencies [21bcd4195]
- Updated dependencies [1dbfb7064]
  - @leafygreen-ui/hooks@8.4.1
  - @leafygreen-ui/icon@13.3.0
  - @leafygreen-ui/leafygreen-provider@4.0.7
  - @leafygreen-ui/emotion@4.1.1
  - @leafygreen-ui/icon-button@16.0.11
  - @leafygreen-ui/typography@20.1.8

## 0.2.3

### Patch Changes

- Updated dependencies [936364416]
  - @leafygreen-ui/icon-button@16.0.10

## 0.2.2

### Patch Changes

- Updated dependencies [f2ed4b037]
- Updated dependencies [2ab660926]
- Updated dependencies [fd1696643]
  - @leafygreen-ui/emotion@4.1.1
  - @leafygreen-ui/icon@13.2.2
  - @leafygreen-ui/hooks@8.4.0
  - @leafygreen-ui/icon-button@16.0.9
  - @leafygreen-ui/tokens@2.12.2
  - @leafygreen-ui/typography@20.1.7

## 0.2.1

### Patch Changes

- Updated dependencies [30b13adec]
- Updated dependencies [30b13adec]
- Updated dependencies [78a36d6bb]
  - @leafygreen-ui/hooks@8.4.0
  - @leafygreen-ui/lib@14.2.0
  - @leafygreen-ui/emotion@4.1.0
  - @leafygreen-ui/leafygreen-provider@4.0.6
  - @leafygreen-ui/icon@13.2.1
  - @leafygreen-ui/icon-button@16.0.8
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.12.1
  - @leafygreen-ui/typography@20.1.6

## 0.2.0

### Minor Changes

- 7e3909a12: Fixes passing props to 2 separate DOM nodes in `ChartCard`
- 7e3909a12: Moves `ChartCard` component into separate package and updates downstream dependencies
