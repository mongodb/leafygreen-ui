# @lg-chat/title-bar

## 5.0.0

### Major Changes

- 3dfa899: [LG-5575](https://jira.mongodb.org/browse/LG-5575)

  - Added compatibility with `@lg-chat/leafygreen-chat-provider@6.0.0`. We recommend new projects use `@lg-chat/leafygreen-chat-provider` v6; support for v5 will be removed in a future major version.
  - All chat components have been simplified by removing variant-specific conditional logic.
    - Removed `align`, `iconSlot`, and `onClose` props.
    - Removed `Align` enum export.

### Patch Changes

- 9cf3b18: Updates provider peer dependency version string to correctly use `pnpm` `workspace` syntax
- Updated dependencies [9cf3b18]
- Updated dependencies [3dfa899]
  - @leafygreen-ui/typography@22.2.2
  - @leafygreen-ui/badge@10.2.3
  - @lg-chat/leafygreen-chat-provider@6.0.0

## 4.2.0

### Minor Changes

- af60a2d: [LG-5664](https://jira.mongodb.org/browse/LG-5664): add compact variant of `TitleBar`

### Patch Changes

- Updated dependencies [2463aa4]
  - @leafygreen-ui/icon@14.7.0

## 4.1.0

### Minor Changes

- 92693df: Updated major version to Shadow tokens. `shadow` object and its key/values have been changed. Other packages utilizing the shadow values have had a minor update to accommodate the changes.

### Patch Changes

- Updated dependencies [92693df]
- Updated dependencies [c6b4d3f]
- Updated dependencies [888a37d]
  - @leafygreen-ui/tokens@4.0.0
  - @leafygreen-ui/emotion@5.1.0
  - @leafygreen-ui/icon@14.6.1
  - @leafygreen-ui/typography@22.2.0
  - @lg-chat/avatar@8.0.1
  - @leafygreen-ui/badge@10.2.2
  - @leafygreen-ui/icon-button@17.1.2

## 4.0.9

### Patch Changes

- c8559f3: Widens the range of `@leafygreen-ui/leafygreen-provider` peer dependency to `>=3.2.0`
- Updated dependencies [f3a8bdc]
- Updated dependencies [c8559f3]
  - @leafygreen-ui/emotion@5.0.4
  - @leafygreen-ui/icon-button@17.1.1
  - @leafygreen-ui/typography@22.1.4
  - @leafygreen-ui/badge@10.2.1
  - @lg-chat/avatar@8.0.0

## 4.0.8

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
  - @leafygreen-ui/lib@15.4.0
  - @leafygreen-ui/typography@22.1.3
  - @leafygreen-ui/emotion@5.0.3
  - @leafygreen-ui/badge@10.1.3

## 4.0.7

### Patch Changes

- dc3299b: Adds "exports" field to all packages
  Enables TS downleveling to TS 4.9
- Updated dependencies [a9eb172]
- Updated dependencies [5ef631a]
- Updated dependencies [dc3299b]
  - @leafygreen-ui/lib@15.3.0
  - @leafygreen-ui/icon@14.5.0
  - @lg-chat/avatar@7.0.2
  - @leafygreen-ui/badge@10.1.2
  - @leafygreen-ui/emotion@5.0.2
  - @leafygreen-ui/icon-button@17.0.5
  - @leafygreen-ui/leafygreen-provider@5.0.4
  - @leafygreen-ui/palette@5.0.2
  - @leafygreen-ui/tokens@3.2.4
  - @leafygreen-ui/typography@22.1.2

## 4.0.6

### Patch Changes

- 172c228: Removes `*.spec.ts` files from tsconfig `exclude` pattern, ensuring that tests are type-checked at build time.
  Also adds missing TS "references" for packages that are imported into test files
- Updated dependencies [172c228]
  - @leafygreen-ui/badge@10.1.1
  - @leafygreen-ui/emotion@5.0.1
  - @leafygreen-ui/icon@14.4.1
  - @leafygreen-ui/icon-button@17.0.4
  - @leafygreen-ui/leafygreen-provider@5.0.3
  - @leafygreen-ui/lib@15.2.1
  - @leafygreen-ui/palette@5.0.1
  - @leafygreen-ui/tokens@3.2.3
  - @leafygreen-ui/typography@22.1.1
  - @lg-chat/avatar@7.0.1

## 4.0.5

### Patch Changes

- @lg-chat/avatar@7.0.0

## 4.0.4

### Patch Changes

- @lg-chat/avatar@6.0.0

## 4.0.3

### Patch Changes

- Updated dependencies [b67497a]
  - @leafygreen-ui/lib@15.2.0
  - @lg-chat/avatar@5.0.3
  - @leafygreen-ui/badge@10.0.3
  - @leafygreen-ui/icon@14.1.0
  - @leafygreen-ui/icon-button@17.0.3
  - @leafygreen-ui/leafygreen-provider@5.0.2
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/tokens@3.1.2
  - @leafygreen-ui/typography@22.0.1

## 4.0.2

### Patch Changes

- Updated dependencies [164b15f]
- Updated dependencies [518ce41]
- Updated dependencies [3bef1e7]
- Updated dependencies [164b15f]
- Updated dependencies [1eafbb5]
  - @leafygreen-ui/lib@15.1.0
  - @leafygreen-ui/typography@22.0.0
  - @leafygreen-ui/icon@14.1.0
  - @lg-chat/avatar@5.0.2
  - @leafygreen-ui/badge@10.0.2
  - @leafygreen-ui/icon-button@17.0.2
  - @leafygreen-ui/leafygreen-provider@5.0.1
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/tokens@3.1.1

## 4.0.1

### Patch Changes

- Updated dependencies [4bd4da3]
- Updated dependencies [caaaeeb]
  - @leafygreen-ui/tokens@3.1.0
  - @leafygreen-ui/icon-button@17.0.1
  - @lg-chat/avatar@5.0.1
  - @leafygreen-ui/badge@10.0.1
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
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
  - @leafygreen-ui/leafygreen-provider@5.0.0
  - @leafygreen-ui/icon-button@17.0.0
  - @leafygreen-ui/typography@21.0.0
  - @leafygreen-ui/emotion@5.0.0
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/tokens@3.0.0
  - @leafygreen-ui/badge@10.0.0
  - @leafygreen-ui/icon@14.0.0
  - @leafygreen-ui/lib@15.0.0
  - @lg-chat/avatar@5.0.0

## 3.0.15

### Patch Changes

- Updated dependencies [eca6e3fdc]
  - @leafygreen-ui/icon@13.4.0
  - @leafygreen-ui/icon-button@16.0.12
  - @leafygreen-ui/typography@20.1.9
  - @lg-chat/avatar@4.0.11

## 3.0.14

### Patch Changes

- Updated dependencies [f9fa0fe83]
  - @leafygreen-ui/badge@9.0.10
  - @leafygreen-ui/emotion@4.1.1

## 3.0.13

### Patch Changes

- Updated dependencies [1dbfb7064]
  - @leafygreen-ui/icon@13.3.0
  - @leafygreen-ui/leafygreen-provider@4.0.7
  - @leafygreen-ui/emotion@4.1.1
  - @leafygreen-ui/icon-button@16.0.11
  - @leafygreen-ui/typography@20.1.8
  - @lg-chat/avatar@4.0.10
  - @leafygreen-ui/badge@9.0.9

## 3.0.12

### Patch Changes

- Updated dependencies [936364416]
  - @leafygreen-ui/icon-button@16.0.10

## 3.0.11

### Patch Changes

- Updated dependencies [f2ed4b037]
- Updated dependencies [2ab660926]
- Updated dependencies [fd1696643]
  - @leafygreen-ui/emotion@4.1.1
  - @leafygreen-ui/icon@13.2.2
  - @lg-chat/avatar@4.0.9
  - @leafygreen-ui/badge@9.0.8
  - @leafygreen-ui/icon-button@16.0.9
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.12.2
  - @leafygreen-ui/typography@20.1.7

## 3.0.10

### Patch Changes

- Updated dependencies [30b13adec]
- Updated dependencies [78a36d6bb]
  - @leafygreen-ui/lib@14.2.0
  - @leafygreen-ui/emotion@4.1.0
  - @leafygreen-ui/leafygreen-provider@4.0.6
  - @lg-chat/avatar@4.0.8
  - @leafygreen-ui/badge@9.0.7
  - @leafygreen-ui/icon@13.2.1
  - @leafygreen-ui/icon-button@16.0.8
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.12.1
  - @leafygreen-ui/typography@20.1.6

## 3.0.9

### Patch Changes

- Updated dependencies [b75c9b896]
- Updated dependencies [16dda633f]
  - @leafygreen-ui/icon-button@16.0.7
  - @leafygreen-ui/leafygreen-provider@4.0.5
  - @lg-chat/avatar@4.0.7
  - @leafygreen-ui/badge@9.0.6
  - @leafygreen-ui/typography@20.1.5

## 3.0.8

### Patch Changes

- Updated dependencies [4b362e136]
  - @leafygreen-ui/tokens@2.12.0
  - @lg-chat/avatar@4.0.6
  - @leafygreen-ui/badge@9.0.5
  - @leafygreen-ui/icon-button@16.0.6
  - @leafygreen-ui/typography@20.1.4

## 3.0.7

### Patch Changes

- Updated dependencies [0e4c5099b]
- Updated dependencies [a2fd85b23]
  - @leafygreen-ui/lib@14.1.0
  - @leafygreen-ui/icon@13.2.0
  - @lg-chat/avatar@4.0.5
  - @leafygreen-ui/badge@9.0.4
  - @leafygreen-ui/icon-button@16.0.5
  - @leafygreen-ui/leafygreen-provider@4.0.4
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.11.5
  - @leafygreen-ui/typography@20.1.3

## 3.0.6

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
  - @lg-chat/avatar@4.0.4
  - @leafygreen-ui/badge@9.0.3
  - @leafygreen-ui/emotion@4.0.10
  - @leafygreen-ui/icon@13.1.3
  - @leafygreen-ui/icon-button@16.0.4
  - @leafygreen-ui/leafygreen-provider@4.0.3
  - @leafygreen-ui/lib@14.0.3
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.11.4
  - @leafygreen-ui/typography@20.1.2

## 3.0.5

### Patch Changes

- Updated dependencies [22d576394]
  - @lg-chat/avatar@4.0.3

## 3.0.4

### Patch Changes

- Updated dependencies [4d932fe13]
- Updated dependencies [859e5b45f]
  - @leafygreen-ui/typography@20.1.1
  - @leafygreen-ui/icon-button@16.0.3

## 3.0.3

### Patch Changes

- Updated dependencies [eb108e93b]
  - @leafygreen-ui/typography@20.1.0

## 3.0.2

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @lg-chat/avatar@4.0.2
  - @leafygreen-ui/badge@9.0.2
  - @leafygreen-ui/emotion@4.0.9
  - @leafygreen-ui/icon@13.1.2
  - @leafygreen-ui/icon-button@16.0.2
  - @leafygreen-ui/leafygreen-provider@4.0.2
  - @leafygreen-ui/lib@14.0.2
  - @leafygreen-ui/palette@4.1.3
  - @leafygreen-ui/tokens@2.11.3
  - @leafygreen-ui/typography@20.0.2

## 3.0.1

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [53c67fba6]
  - @leafygreen-ui/leafygreen-provider@4.0.1
  - @leafygreen-ui/icon-button@16.0.1
  - @leafygreen-ui/typography@20.0.1
  - @leafygreen-ui/palette@4.1.2
  - @leafygreen-ui/tokens@2.11.2
  - @leafygreen-ui/badge@9.0.1
  - @leafygreen-ui/icon@13.1.1
  - @leafygreen-ui/lib@14.0.1
  - @lg-chat/avatar@4.0.1

## 3.0.0

### Patch Changes

- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/leafygreen-provider@4.0.0
  - @leafygreen-ui/icon-button@16.0.0
  - @leafygreen-ui/typography@20.0.0
  - @leafygreen-ui/badge@9.0.0
  - @leafygreen-ui/icon@13.0.0
  - @leafygreen-ui/lib@14.0.0
  - @lg-chat/avatar@4.0.0
  - @leafygreen-ui/tokens@2.11.1

## 2.0.4

### Patch Changes

- 371e14b38: Fixes broken import of `ChatAvatarVariant`

## 2.0.3

### Patch Changes

- ae44834e: Removes `color` prop from Avatar
- Updated dependencies [ae44834e]
- Updated dependencies [ae44834e]
- Updated dependencies [ae44834e]
  - @leafygreen-ui/icon@12.4.0
  - @lg-chat/avatar@3.1.0

## 2.0.2

### Patch Changes

- Updated dependencies [dfd6972c]
  - @leafygreen-ui/typography@19.0.0

## 2.0.1

### Patch Changes

- 9079c0ae: Upgrades internal lg components
- Updated dependencies [9079c0ae]
- Updated dependencies [74057388]
  - @lg-chat/avatar@3.0.1
  - @leafygreen-ui/icon@12.0.0
  - @leafygreen-ui/icon-button@15.0.20
  - @leafygreen-ui/typography@18.2.3

## 2.0.0

### Major Changes

- 36070800: First public release of `@lg-chat` components

### Patch Changes

- Updated dependencies [36070800]
  - @lg-chat/avatar@3.0.0

## 1.1.4

### Patch Changes

- Empty patch bump to include missing builds
- Updated dependencies
  - @lg-chat/avatar@2.0.3

## 1.1.3

### Patch Changes

- f21765f: Phase 2 minor style changes are now applied
- Updated dependencies [f21765f]
  - @lg-chat/avatar@2.0.2

## 1.1.2

### Patch Changes

- 1369d9f: Empty patch version to trigger new Artifactory publish
- Updated dependencies [1369d9f]
  - @lg-chat/avatar@2.0.1

## 1.1.1

### Patch Changes

- 65464c2: First major release of FixedChatWindow component

## 1.1.0

### Minor Changes

- Responsiveness behavior with LeafyGreenChatProvider

### Patch Changes

- 799eb22: Adjusts component dependencies
- Updated dependencies
  - @lg-chat/avatar@2.0.0

## 1.0.0

### Major Changes

- 9cfaea7: MVP Release of all LG Chat packages

### Patch Changes

- Updated dependencies [9cfaea7]
  - @lg-chat/avatar@1.0.0

## 0.9.1

### Patch Changes

- a1c597c: Testing initial publish of LG Chat library
- Updated dependencies [a1c597c]
  - @lg-chat/avatar@0.9.1
