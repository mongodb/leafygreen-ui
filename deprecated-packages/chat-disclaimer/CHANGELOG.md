# @lg-chat/chat-disclaimer

## 5.0.1

### Patch Changes

- cee1e79: Interfaces now extend built-in `React.ComponentType` rather than custom `HTMLElementProps` for compatability with React 19
- Updated dependencies [3471b94]
- Updated dependencies [6f30c55]
- Updated dependencies [cee1e79]
- Updated dependencies [6f30c55]
  - @leafygreen-ui/lib@15.4.0
  - @leafygreen-ui/typography@22.1.3
  - @leafygreen-ui/emotion@5.0.3

## 5.0.0

### Major Changes

- a3dee88: Remove deprecated and unused `DisclaimerModal`

### Patch Changes

- dc3299b: Adds "exports" field to all packages
  Enables TS downleveling to TS 4.9
- Updated dependencies [a9eb172]
- Updated dependencies [dc3299b]
  - @leafygreen-ui/lib@15.3.0
  - @leafygreen-ui/emotion@5.0.2
  - @leafygreen-ui/leafygreen-provider@5.0.4
  - @leafygreen-ui/marketing-modal@8.0.2
  - @leafygreen-ui/tokens@3.2.4
  - @leafygreen-ui/typography@22.1.2

## 4.0.8

### Patch Changes

- 172c228: Removes `*.spec.ts` files from tsconfig `exclude` pattern, ensuring that tests are type-checked at build time.
  Also adds missing TS "references" for packages that are imported into test files
- Updated dependencies [172c228]
  - @leafygreen-ui/emotion@5.0.1
  - @leafygreen-ui/leafygreen-provider@5.0.3
  - @leafygreen-ui/lib@15.2.1
  - @leafygreen-ui/marketing-modal@8.0.1
  - @leafygreen-ui/tokens@3.2.3
  - @leafygreen-ui/typography@22.1.1

## 4.0.7

### Patch Changes

- 2c06601: [LG-5453](https://jira.mongodb.org/browse/LG-5453)

  - Update `DisclaimerText` component with theming and styling improvements
  - Mark `DisclaimerModal` component deprecated. Use `@leafygreen-ui/marketing-modal` instead

## 4.0.6

### Patch Changes

- Updated dependencies [5994b73]
  - @leafygreen-ui/marketing-modal@8.0.0

## 4.0.5

### Patch Changes

- Updated dependencies [5dc2459]
  - @leafygreen-ui/marketing-modal@7.0.0

## 4.0.4

### Patch Changes

- @leafygreen-ui/marketing-modal@6.0.4

## 4.0.3

### Patch Changes

- Updated dependencies [b67497a]
  - @leafygreen-ui/lib@15.2.0
  - @leafygreen-ui/marketing-modal@6.0.3
  - @leafygreen-ui/tokens@3.1.2
  - @leafygreen-ui/typography@22.0.1

## 4.0.2

### Patch Changes

- Updated dependencies [164b15f]
- Updated dependencies [518ce41]
- Updated dependencies [3bef1e7]
- Updated dependencies [164b15f]
  - @leafygreen-ui/lib@15.1.0
  - @leafygreen-ui/typography@22.0.0
  - @leafygreen-ui/marketing-modal@6.0.2
  - @leafygreen-ui/tokens@3.1.1

## 4.0.1

### Patch Changes

- Updated dependencies [4bd4da3]
  - @leafygreen-ui/tokens@3.1.0
  - @leafygreen-ui/marketing-modal@6.0.1
  - @leafygreen-ui/typography@21.0.1

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
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
  - @leafygreen-ui/marketing-modal@6.0.0
  - @leafygreen-ui/typography@21.0.0
  - @leafygreen-ui/emotion@5.0.0
  - @leafygreen-ui/tokens@3.0.0
  - @leafygreen-ui/lib@15.0.0

## 3.0.18

### Patch Changes

- @leafygreen-ui/typography@20.1.9
- @leafygreen-ui/marketing-modal@5.0.15

## 3.0.17

### Patch Changes

- @leafygreen-ui/emotion@4.1.1
- @leafygreen-ui/typography@20.1.8
- @leafygreen-ui/marketing-modal@5.0.14

## 3.0.16

### Patch Changes

- @leafygreen-ui/marketing-modal@5.0.13

## 3.0.15

### Patch Changes

- Updated dependencies [f2ed4b037]
  - @leafygreen-ui/emotion@4.1.1
  - @leafygreen-ui/marketing-modal@5.0.12
  - @leafygreen-ui/tokens@2.12.2
  - @leafygreen-ui/typography@20.1.7

## 3.0.14

### Patch Changes

- Updated dependencies [30b13adec]
- Updated dependencies [78a36d6bb]
  - @leafygreen-ui/lib@14.2.0
  - @leafygreen-ui/emotion@4.1.0
  - @leafygreen-ui/marketing-modal@5.0.11
  - @leafygreen-ui/tokens@2.12.1
  - @leafygreen-ui/typography@20.1.6

## 3.0.13

### Patch Changes

- @leafygreen-ui/marketing-modal@5.0.10
- @leafygreen-ui/typography@20.1.5

## 3.0.12

### Patch Changes

- Updated dependencies [4b362e136]
  - @leafygreen-ui/tokens@2.12.0
  - @leafygreen-ui/marketing-modal@5.0.9
  - @leafygreen-ui/typography@20.1.4

## 3.0.11

### Patch Changes

- @leafygreen-ui/marketing-modal@5.0.8

## 3.0.10

### Patch Changes

- Updated dependencies [0e4c5099b]
  - @leafygreen-ui/lib@14.1.0
  - @leafygreen-ui/marketing-modal@5.0.7
  - @leafygreen-ui/tokens@2.11.5
  - @leafygreen-ui/typography@20.1.3

## 3.0.9

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
  - @leafygreen-ui/emotion@4.0.10
  - @leafygreen-ui/lib@14.0.3
  - @leafygreen-ui/marketing-modal@5.0.6
  - @leafygreen-ui/tokens@2.11.4
  - @leafygreen-ui/typography@20.1.2

## 3.0.8

### Patch Changes

- @leafygreen-ui/marketing-modal@5.0.5

## 3.0.7

### Patch Changes

- Updated dependencies [4d932fe13]
  - @leafygreen-ui/typography@20.1.1
  - @leafygreen-ui/marketing-modal@5.0.4

## 3.0.6

### Patch Changes

- Updated dependencies [eb108e93b]
  - @leafygreen-ui/typography@20.1.0
  - @leafygreen-ui/marketing-modal@5.0.3

## 3.0.5

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @leafygreen-ui/emotion@4.0.9
  - @leafygreen-ui/lib@14.0.2
  - @leafygreen-ui/marketing-modal@5.0.2
  - @leafygreen-ui/tokens@2.11.3
  - @leafygreen-ui/typography@20.0.2

## 3.0.4

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [53c67fba6]
  - @leafygreen-ui/marketing-modal@5.0.1
  - @leafygreen-ui/typography@20.0.1
  - @leafygreen-ui/tokens@2.11.2
  - @leafygreen-ui/lib@14.0.1

## 3.0.3

### Patch Changes

- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/marketing-modal@5.0.0
  - @leafygreen-ui/typography@20.0.0
  - @leafygreen-ui/lib@14.0.0
  - @leafygreen-ui/tokens@2.11.1

## 3.0.2

### Patch Changes

- Updated dependencies [dfd6972c]
  - @leafygreen-ui/typography@19.0.0
  - @leafygreen-ui/marketing-modal@4.2.3

## 3.0.1

### Patch Changes

- 9079c0ae: Upgrades internal lg components
  - @leafygreen-ui/typography@18.2.3

## 3.0.0

### Major Changes

- 36070800: First public release of `@lg-chat` components

## 2.0.2

### Patch Changes

- Publishing with fresh builds

## 2.0.1

### Patch Changes

- Publishing with new builds

## 2.0.0

### Major Changes

- 89ffc5b: DisclaimerText now utilizes the `children` prop properly. The DisclaimerText component also styles itself appropriately when rendered inside of a MessageFeed component.

## 1.0.1

### Patch Changes

- Empty patch bump to include missing builds

## 1.0.0

### Major Changes

- bb34763: First major release of DisclaimerText and DisclaimerModal components

### Patch Changes

- f21765f: Phase 2 minor style changes are now applied
