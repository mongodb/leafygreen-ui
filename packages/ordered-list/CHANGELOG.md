# @leafygreen-ui/ordered-list

## 3.0.3

### Patch Changes

- Updated dependencies [b67497a]
  - @leafygreen-ui/lib@15.2.0
  - @leafygreen-ui/descendants@3.0.2
  - @leafygreen-ui/leafygreen-provider@5.0.2
  - @leafygreen-ui/tokens@3.1.2
  - @leafygreen-ui/typography@22.0.1

## 3.0.2

### Patch Changes

- Updated dependencies [164b15f]
- Updated dependencies [518ce41]
- Updated dependencies [f685e51]
- Updated dependencies [3bef1e7]
- Updated dependencies [164b15f]
  - @leafygreen-ui/lib@15.1.0
  - @leafygreen-ui/descendants@3.0.1
  - @leafygreen-ui/typography@22.0.0
  - @leafygreen-ui/leafygreen-provider@5.0.1
  - @leafygreen-ui/tokens@3.1.1

## 3.0.1

### Patch Changes

- Updated dependencies [4bd4da3]
  - @leafygreen-ui/tokens@3.1.0
  - @leafygreen-ui/typography@21.0.1
  - @leafygreen-ui/descendants@3.0.0

## 3.0.0

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
  - @leafygreen-ui/leafygreen-provider@5.0.0
  - @leafygreen-ui/descendants@3.0.0
  - @leafygreen-ui/typography@21.0.0
  - @leafygreen-ui/emotion@5.0.0
  - @leafygreen-ui/tokens@3.0.0
  - @leafygreen-ui/lib@15.0.0

## 2.0.13

### Patch Changes

- @leafygreen-ui/typography@20.1.9

## 2.0.12

### Patch Changes

- @leafygreen-ui/descendants@2.1.5
- @leafygreen-ui/leafygreen-provider@4.0.7
- @leafygreen-ui/emotion@4.1.1
- @leafygreen-ui/typography@20.1.8

## 2.0.11

### Patch Changes

- Updated dependencies [f2ed4b037]
  - @leafygreen-ui/emotion@4.1.1
  - @leafygreen-ui/descendants@2.1.4
  - @leafygreen-ui/tokens@2.12.2
  - @leafygreen-ui/typography@20.1.7

## 2.0.10

### Patch Changes

- Updated dependencies [30b13adec]
- Updated dependencies [78a36d6bb]
  - @leafygreen-ui/lib@14.2.0
  - @leafygreen-ui/emotion@4.1.0
  - @leafygreen-ui/descendants@2.1.4
  - @leafygreen-ui/leafygreen-provider@4.0.6
  - @leafygreen-ui/tokens@2.12.1
  - @leafygreen-ui/typography@20.1.6

## 2.0.9

### Patch Changes

- Updated dependencies [16dda633f]
  - @leafygreen-ui/leafygreen-provider@4.0.5
  - @leafygreen-ui/descendants@2.1.3
  - @leafygreen-ui/typography@20.1.5

## 2.0.8

### Patch Changes

- Updated dependencies [4b362e136]
  - @leafygreen-ui/tokens@2.12.0
  - @leafygreen-ui/typography@20.1.4
  - @leafygreen-ui/descendants@2.1.2

## 2.0.7

### Patch Changes

- Updated dependencies [0e4c5099b]
  - @leafygreen-ui/lib@14.1.0
  - @leafygreen-ui/descendants@2.1.2
  - @leafygreen-ui/leafygreen-provider@4.0.4
  - @leafygreen-ui/tokens@2.11.5
  - @leafygreen-ui/typography@20.1.3

## 2.0.6

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
  - @leafygreen-ui/descendants@2.1.1
  - @leafygreen-ui/emotion@4.0.10
  - @leafygreen-ui/leafygreen-provider@4.0.3
  - @leafygreen-ui/lib@14.0.3
  - @leafygreen-ui/tokens@2.11.4
  - @leafygreen-ui/typography@20.1.2

## 2.0.5

### Patch Changes

- Updated dependencies [4d932fe13]
  - @leafygreen-ui/typography@20.1.1
  - @leafygreen-ui/descendants@2.1.0

## 2.0.4

### Patch Changes

- eb108e93b: [LG-4727](https://jira.mongodb.org/browse/LG-4727): The `description` props in these packages were previously wrapped in a `<p>`. However, in cases where a `ReactNode` was passed to the `description` prop, it would lead to a browser error. According to the HTML spec, `<p>` cannot contain block-level elements: https://www.w3.org/TR/html401/struct/text.html#h-9.3.1

  The latest version of `@leafygreen-ui/typography` will typecheck `description` to ensure the proper element is used.

  - If a `description` of type `string` or `number` is used, it will continue to be wrapped in a `<p>`
  - All other types of `description` will be wrapped in a `<div>`

- Updated dependencies [eb108e93b]
  - @leafygreen-ui/typography@20.1.0

## 2.0.3

### Patch Changes

- Updated dependencies [674d06888]
  - @leafygreen-ui/descendants@2.1.0

## 2.0.2

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @leafygreen-ui/descendants@2.0.2
  - @leafygreen-ui/emotion@4.0.9
  - @leafygreen-ui/leafygreen-provider@4.0.2
  - @leafygreen-ui/lib@14.0.2
  - @leafygreen-ui/tokens@2.11.3
  - @leafygreen-ui/typography@20.0.2

## 2.0.1

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [53c67fba6]
  - @leafygreen-ui/leafygreen-provider@4.0.1
  - @leafygreen-ui/descendants@2.0.1
  - @leafygreen-ui/typography@20.0.1
  - @leafygreen-ui/tokens@2.11.2
  - @leafygreen-ui/lib@14.0.1

## 2.0.0

### Major Changes

- 274d7e1a7: Removes prop-types from LeafyGreen UI

### Patch Changes

- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/leafygreen-provider@4.0.0
  - @leafygreen-ui/typography@20.0.0
  - @leafygreen-ui/lib@14.0.0
  - @leafygreen-ui/descendants@2.0.0
  - @leafygreen-ui/tokens@2.11.1

## 1.0.0

### Major Changes

- 617cb67dc: Releases OrderedList and OrderedListItem components
