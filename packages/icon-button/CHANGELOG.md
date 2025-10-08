# @leafygreen-ui/icon-button

## 17.1.0

### Minor Changes

- d027d4c: Mark default export as deprecated and add named export if missing. See [named-exports codemod documentation](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#named-exports) for migration assistance.

### Patch Changes

- Updated dependencies [88e25a1]
- Updated dependencies [d027d4c]
  - @leafygreen-ui/lib@15.6.1
  - @leafygreen-ui/icon@14.6.0

## 17.0.6

### Patch Changes

- aeb3b3f: Uncomments type check to ensure that component requires either aria-label or aria-labelledby properties
- cee1e79: Interfaces now extend built-in `React.ComponentType` rather than custom `HTMLElementProps` for compatability with React 19
- Updated dependencies [1a5c69f]
- Updated dependencies [3471b94]
- Updated dependencies [6f30c55]
- Updated dependencies [cee1e79]
- Updated dependencies [6f30c55]
- Updated dependencies [6f30c55]
  - @leafygreen-ui/icon@14.5.1
  - @leafygreen-ui/lib@15.4.0
  - @leafygreen-ui/emotion@5.0.3
  - @leafygreen-ui/a11y@3.0.5
  - @leafygreen-ui/polymorphic@3.1.0

## 17.0.5

### Patch Changes

- dc3299b: Adds "exports" field to all packages
  Enables TS downleveling to TS 4.9
- Updated dependencies [a9eb172]
- Updated dependencies [5ef631a]
- Updated dependencies [dc3299b]
  - @leafygreen-ui/lib@15.3.0
  - @leafygreen-ui/icon@14.5.0
  - @leafygreen-ui/a11y@3.0.4
  - @leafygreen-ui/emotion@5.0.2
  - @leafygreen-ui/leafygreen-provider@5.0.4
  - @leafygreen-ui/palette@5.0.2
  - @leafygreen-ui/polymorphic@3.0.4
  - @leafygreen-ui/tokens@3.2.4

## 17.0.4

### Patch Changes

- 172c228: Removes `*.spec.ts` files from tsconfig `exclude` pattern, ensuring that tests are type-checked at build time.
  Also adds missing TS "references" for packages that are imported into test files
- Updated dependencies [172c228]
  - @leafygreen-ui/a11y@3.0.3
  - @leafygreen-ui/emotion@5.0.1
  - @leafygreen-ui/icon@14.4.1
  - @leafygreen-ui/leafygreen-provider@5.0.3
  - @leafygreen-ui/lib@15.2.1
  - @leafygreen-ui/palette@5.0.1
  - @leafygreen-ui/tokens@3.2.3

## 17.0.3

### Patch Changes

- Updated dependencies [b67497a]
  - @leafygreen-ui/lib@15.2.0
  - @leafygreen-ui/a11y@3.0.2
  - @leafygreen-ui/icon@14.1.0
  - @leafygreen-ui/leafygreen-provider@5.0.2
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/polymorphic@3.0.3
  - @leafygreen-ui/tokens@3.1.2

## 17.0.2

### Patch Changes

- Updated dependencies [164b15f]
- Updated dependencies [518ce41]
- Updated dependencies [3bef1e7]
- Updated dependencies [1eafbb5]
  - @leafygreen-ui/lib@15.1.0
  - @leafygreen-ui/icon@14.1.0
  - @leafygreen-ui/a11y@3.0.1
  - @leafygreen-ui/leafygreen-provider@5.0.1
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/polymorphic@3.0.2
  - @leafygreen-ui/tokens@3.1.1

## 17.0.1

### Patch Changes

- caaaeeb: Updates CSS selectors for Storybook testing
- Updated dependencies [4bd4da3]
- Updated dependencies [9de60ce]
  - @leafygreen-ui/tokens@3.1.0
  - @leafygreen-ui/polymorphic@3.0.1

## 17.0.0

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
  - @leafygreen-ui/polymorphic@3.0.0
  - @leafygreen-ui/emotion@5.0.0
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/tokens@3.0.0
  - @leafygreen-ui/a11y@3.0.0
  - @leafygreen-ui/icon@14.0.0
  - @leafygreen-ui/lib@15.0.0

## 16.0.12

### Patch Changes

- Updated dependencies [eca6e3fdc]
  - @leafygreen-ui/icon@13.4.0

## 16.0.11

### Patch Changes

- Updated dependencies [1dbfb7064]
  - @leafygreen-ui/icon@13.3.0
  - @leafygreen-ui/a11y@2.0.7
  - @leafygreen-ui/leafygreen-provider@4.0.7
  - @leafygreen-ui/emotion@4.1.1

## 16.0.10

### Patch Changes

- 936364416: Fix live example stories for www.mongodb.design

## 16.0.9

### Patch Changes

- Updated dependencies [f2ed4b037]
- Updated dependencies [2ab660926]
- Updated dependencies [fd1696643]
- Updated dependencies [e874aeaf9]
  - @leafygreen-ui/emotion@4.1.1
  - @leafygreen-ui/icon@13.2.2
  - @leafygreen-ui/polymorphic@2.0.9
  - @leafygreen-ui/a11y@2.0.6
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.12.2

## 16.0.8

### Patch Changes

- Updated dependencies [30b13adec]
- Updated dependencies [78a36d6bb]
  - @leafygreen-ui/lib@14.2.0
  - @leafygreen-ui/emotion@4.1.0
  - @leafygreen-ui/a11y@2.0.5
  - @leafygreen-ui/leafygreen-provider@4.0.6
  - @leafygreen-ui/icon@13.2.1
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/polymorphic@2.0.8
  - @leafygreen-ui/tokens@2.12.1

## 16.0.7

### Patch Changes

- b75c9b896: Reorganizes files internally. No externally-facing changes
- Updated dependencies [16dda633f]
  - @leafygreen-ui/leafygreen-provider@4.0.5

## 16.0.6

### Patch Changes

- Updated dependencies [4b362e136]
  - @leafygreen-ui/tokens@2.12.0

## 16.0.5

### Patch Changes

- Updated dependencies [0e4c5099b]
- Updated dependencies [a2fd85b23]
  - @leafygreen-ui/lib@14.1.0
  - @leafygreen-ui/icon@13.2.0
  - @leafygreen-ui/a11y@2.0.4
  - @leafygreen-ui/leafygreen-provider@4.0.4
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/polymorphic@2.0.7
  - @leafygreen-ui/tokens@2.11.5

## 16.0.4

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
  - @leafygreen-ui/a11y@2.0.3
  - @leafygreen-ui/emotion@4.0.10
  - @leafygreen-ui/icon@13.1.3
  - @leafygreen-ui/leafygreen-provider@4.0.3
  - @leafygreen-ui/lib@14.0.3
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/polymorphic@2.0.6
  - @leafygreen-ui/tokens@2.11.4

## 16.0.3

### Patch Changes

- 859e5b45f: [LG-2723](https://jira.mongodb.org/browse/LG-2723): Replace `@leafygreen-ui/box` with `@leafygreen-ui/polymorphic` and refactor `IconButton` internals.
  - Exports `IconButtonProps` type

## 16.0.2

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @leafygreen-ui/a11y@2.0.2
  - @leafygreen-ui/box@4.0.2
  - @leafygreen-ui/emotion@4.0.9
  - @leafygreen-ui/icon@13.1.2
  - @leafygreen-ui/leafygreen-provider@4.0.2
  - @leafygreen-ui/lib@14.0.2
  - @leafygreen-ui/palette@4.1.3
  - @leafygreen-ui/tokens@2.11.3

## 16.0.1

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [53c67fba6]
  - @leafygreen-ui/leafygreen-provider@4.0.1
  - @leafygreen-ui/palette@4.1.2
  - @leafygreen-ui/tokens@2.11.2
  - @leafygreen-ui/a11y@2.0.1
  - @leafygreen-ui/icon@13.1.1
  - @leafygreen-ui/box@4.0.1
  - @leafygreen-ui/lib@14.0.1

## 16.0.0

### Major Changes

- 274d7e1a7: Removes prop-types from LeafyGreen UI

### Patch Changes

- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/leafygreen-provider@4.0.0
  - @leafygreen-ui/a11y@2.0.0
  - @leafygreen-ui/icon@13.0.0
  - @leafygreen-ui/box@4.0.0
  - @leafygreen-ui/lib@14.0.0
  - @leafygreen-ui/tokens@2.11.1

## 15.0.23

### Patch Changes

- e7bc12814: Adds more thorough test coverage for disabled inputs

## 15.0.22

### Patch Changes

- a94306ab3: Changes hover state of IconButton components

## 15.0.21

### Patch Changes

- 15185af0: Imports Storybook utilities from `@lg-tools/storybook-utils` (previously imported from `@leafygreen-ui/lib`)
- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [66df9ab8]
  - @leafygreen-ui/leafygreen-provider@3.1.12
  - @leafygreen-ui/icon@12.0.1
  - @leafygreen-ui/box@3.1.9
  - @leafygreen-ui/lib@13.3.0
  - @leafygreen-ui/a11y@1.4.13
  - @leafygreen-ui/emotion@4.0.8
  - @leafygreen-ui/palette@4.0.9
  - @leafygreen-ui/tokens@2.5.2

## 15.0.20

### Patch Changes

- Updated dependencies [74057388]
  - @leafygreen-ui/icon@12.0.0

## 15.0.19

### Patch Changes

- 784e9d8a: Updates color in light mode back to `gray.dark1`
- Updated dependencies [dd4f3da8]
  - @leafygreen-ui/lib@13.0.0
  - @leafygreen-ui/a11y@1.4.11
  - @leafygreen-ui/leafygreen-provider@3.1.10

## 15.0.18

### Patch Changes

- Updated dependencies [3a9b274d]
  - @leafygreen-ui/lib@12.0.0
  - @leafygreen-ui/a11y@1.4.10
  - @leafygreen-ui/leafygreen-provider@3.1.9

## 15.0.17

### Patch Changes

- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
  - @leafygreen-ui/icon@11.22.2
  - @leafygreen-ui/lib@11.0.0
  - @leafygreen-ui/box@3.1.8
  - @leafygreen-ui/a11y@1.4.8
  - @leafygreen-ui/leafygreen-provider@3.1.7

## 15.0.16

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/a11y@1.4.7
  - @leafygreen-ui/box@3.1.7
  - @leafygreen-ui/emotion@4.0.7
  - @leafygreen-ui/icon@11.22.1
  - @leafygreen-ui/leafygreen-provider@3.1.6
  - @leafygreen-ui/lib@10.4.3
  - @leafygreen-ui/palette@4.0.7
  - @leafygreen-ui/tokens@2.1.4

## 15.0.15

### Patch Changes

- c15ee2ac: Fixes missing documentation file
- Updated dependencies [f73807cf]
- Updated dependencies [31c09354]
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/icon@11.22.0
  - @leafygreen-ui/a11y@1.4.6
  - @leafygreen-ui/box@3.1.6
  - @leafygreen-ui/emotion@4.0.6
  - @leafygreen-ui/leafygreen-provider@3.1.5
  - @leafygreen-ui/lib@10.4.2
  - @leafygreen-ui/palette@4.0.6
  - @leafygreen-ui/tokens@2.1.3

## 15.0.14

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/leafygreen-provider@3.1.4
  - @leafygreen-ui/emotion@4.0.5
  - @leafygreen-ui/palette@4.0.5
  - @leafygreen-ui/tokens@2.1.2
  - @leafygreen-ui/a11y@1.4.5
  - @leafygreen-ui/icon@11.20.1
  - @leafygreen-ui/box@3.1.5
  - @leafygreen-ui/lib@10.4.1

## 15.0.13

### Patch Changes

- 547d828e: Change darkMode fill color from gray dark1 to gray dark2

## 15.0.12

### Patch Changes

- 76161cf0: Updates stories for Chromatic testing
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [95f5107a]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
  - @leafygreen-ui/lib@10.4.0
  - @leafygreen-ui/icon@11.17.0
  - @leafygreen-ui/tokens@2.1.1

## 15.0.11

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x
- Updated dependencies [d2ce54e2f]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
  - @leafygreen-ui/box@3.1.4
  - @leafygreen-ui/icon@11.16.1
  - @leafygreen-ui/leafygreen-provider@3.1.3
  - @leafygreen-ui/lib@10.3.4

## 15.0.10

### Patch Changes

- ce0fcb3f6: Excludes `children` from story controls
- Updated dependencies [55d33e435]
- Updated dependencies [111b680c5]
- Updated dependencies [55d33e435]
- Updated dependencies [cf00160ec]
- Updated dependencies [111b680c5]
- Updated dependencies [77320a6b8]
  - @leafygreen-ui/lib@10.3.3
  - @leafygreen-ui/palette@4.0.4
  - @leafygreen-ui/box@3.1.3
  - @leafygreen-ui/tokens@2.0.3

## 15.0.9

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/a11y@1.4.2
  - @leafygreen-ui/box@3.1.2
  - @leafygreen-ui/emotion@4.0.4
  - @leafygreen-ui/icon@11.13.1
  - @leafygreen-ui/leafygreen-provider@3.1.2
  - @leafygreen-ui/lib@10.3.2
  - @leafygreen-ui/palette@4.0.3
  - @leafygreen-ui/tokens@2.0.2

## 15.0.8

### Patch Changes

- 89ede28ec: Exports `BaseIconButtonProps` type
- Updated dependencies [c2c5601f4]
  - @leafygreen-ui/icon@11.12.7
  - @leafygreen-ui/lib@10.3.1
  - @leafygreen-ui/palette@4.0.1

## 15.0.7

### Patch Changes

- Updated dependencies [5b036515e]
- Updated dependencies [26e341a0b]
- Updated dependencies [997121cc3]
  - @leafygreen-ui/palette@4.0.0
  - @leafygreen-ui/lib@10.2.2
  - @leafygreen-ui/icon@11.12.5
  - @leafygreen-ui/tokens@2.0.1

## 15.0.6

### Patch Changes

- bf2fedf6d: Version bumps lib
- Updated dependencies [51c544e2e]
- Updated dependencies [bf2fedf6d]
  - @leafygreen-ui/a11y@1.4.0
  - @leafygreen-ui/leafygreen-provider@3.1.1

## 15.0.5

### Patch Changes

- c1c259036: Exporting types

## 15.0.4

### Patch Changes

- c82ed35d5: Removes `useUsingKeyboardContext` from component, in favor of `&:focus-visible`
- Updated dependencies [050f1f8a9]
- Updated dependencies [741cdd408]
- Updated dependencies [b24b21462]
  - @leafygreen-ui/icon@11.12.4
  - @leafygreen-ui/tokens@2.0.0
  - @leafygreen-ui/palette@3.4.7

## 15.0.3

### Patch Changes

- 75f26afbc: Allows users to override default `tabIndex` value being set on component
- Updated dependencies [95bd93ef9]
- Updated dependencies [3bb4b7506]
  - @leafygreen-ui/icon@11.12.3

## 15.0.2

### Patch Changes

- b7f7a4c95: Updates package dependencies & devDependencies, and ensures each package is appropriately listed. Ensures `tsconfig` has no circular dependencies
- Updated dependencies [b7f7a4c95]
  - @leafygreen-ui/icon@11.12.2
  - @leafygreen-ui/palette@3.4.5
  - @leafygreen-ui/tokens@1.4.1

## 15.0.1

### Patch Changes

- ae5421cf6: Updates components to use internal transition tokens
- Updated dependencies [ae5421cf6]
  - @leafygreen-ui/tokens@1.4.0

## 15.0.0

### Patch Changes

- Updated dependencies [b9b09a86]
  - @leafygreen-ui/leafygreen-provider@3.1.0

## 14.0.1

### Patch Changes

- 2195359a: Updates some packges to use a caret instead of an exact version
- Updated dependencies [f2d63a60]
  - @leafygreen-ui/lib@10.0.0
  - @leafygreen-ui/a11y@1.3.4
  - @leafygreen-ui/leafygreen-provider@3.0.1

## 14.0.0

### Patch Changes

- Updated dependencies [e399f1b9]
- Updated dependencies [e399f1b9]
  - @leafygreen-ui/leafygreen-provider@3.0.0

## 13.2.1

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.
- Updated dependencies [24683433]
  - @leafygreen-ui/a11y@1.3.3
  - @leafygreen-ui/box@3.1.1
  - @leafygreen-ui/emotion@4.0.3
  - @leafygreen-ui/leafygreen-provider@2.3.5
  - @leafygreen-ui/lib@9.5.1
  - @leafygreen-ui/palette@3.4.4
  - @leafygreen-ui/tokens@1.3.4

## 13.2.0

### Minor Changes

- 3690df49: Updates TypeScript annotations, type structures and export format of some components

### Patch Changes

- 3690df49: Updates Storybook configs
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [58a5a05e]
  - @leafygreen-ui/box@3.1.0
  - @leafygreen-ui/lib@9.5.0
  - @leafygreen-ui/a11y@1.3.2
  - @leafygreen-ui/emotion@4.0.2
  - @leafygreen-ui/leafygreen-provider@2.3.4
  - @leafygreen-ui/palette@3.4.3
  - @leafygreen-ui/tokens@1.3.3

## 13.1.1

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/a11y@1.3.1
  - @leafygreen-ui/box@3.0.8
  - @leafygreen-ui/emotion@4.0.1
  - @leafygreen-ui/leafygreen-provider@2.3.3
  - @leafygreen-ui/lib@9.4.2
  - @leafygreen-ui/palette@3.4.2
  - @leafygreen-ui/tokens@1.3.2

## 13.1.0

### Minor Changes

- 65c86281: Consuming darkMode from the LeafyGreenProvider if the darkMode prop is not set

### Patch Changes

- Updated dependencies [bac1e809]
  - @leafygreen-ui/a11y@1.3.0

## 13.0.0

### Patch Changes

- Updated dependencies [85d46871]
- Updated dependencies [99e20bb9]
  - @leafygreen-ui/lib@9.4.0
  - @leafygreen-ui/leafygreen-provider@2.3.0

## 12.0.0

### Major Changes

- f0a357e2: Updates IconButton for dark mode brand refresh

## 11.0.2

### Patch Changes

- 96d1ff9c: Updates to propTypes, TSDocs, and Storybook controls
- Updated dependencies [6a89bc29]
- Updated dependencies [fd2f6de0]
- Updated dependencies [96d1ff9c]
- Updated dependencies [422dbfcd]
- Updated dependencies [9ff90d4b]
  - @leafygreen-ui/palette@3.4.0
  - @leafygreen-ui/box@3.0.7
  - @leafygreen-ui/lib@9.3.0

## 11.0.1

### Patch Changes

- bc2558c5: Adding named exports for select components and types

## 11.0.0

### Major Changes

- e13d2487: Moving leafygreen-provider to peerDependencies.
- Updated dependencies [5f28fce1]
  - @leafygreen-ui/leafygreen-provider@2.2.0

## 10.0.0

### Major Changes

- ab1fd9e: Updates Icon Button in line with the visual brand refresh

## 9.1.7

### Patch Changes

- 9d0bcd4: - Ensures IconButton is focusable when disabled
  - Fixes styling priority of a disabled and active IconButton

## 9.1.6

### Patch Changes

- Updated dependencies [f6e5655a]
- Updated dependencies [f6e5655a]
- Updated dependencies [b8f03aa1]
  - @leafygreen-ui/emotion@4.0.0
  - @leafygreen-ui/palette@3.2.2
  - @leafygreen-ui/lib@9.0.0
  - @leafygreen-ui/a11y@1.2.2
  - @leafygreen-ui/box@3.0.6

## 9.1.5

### Patch Changes

- e1af3278: Updates the focus state of component to meet accessible contrast ratios.
- Updated dependencies [047c1930]
  - @leafygreen-ui/lib@8.0.0
  - @leafygreen-ui/a11y@1.2.1
  - @leafygreen-ui/box@3.0.5

## 9.1.4

### Patch Changes

- 1503e83a: Transitions color in IconButton component

## 9.1.3

### Patch Changes

- 90321b36: Imports validateProps functions from `@leafygreen-ui/a11y` package.
- Updated dependencies [90321b36]
- Updated dependencies [ab581f34]
- Updated dependencies [90321b36]
  - @leafygreen-ui/a11y@1.2.0
  - @leafygreen-ui/palette@3.2.1
  - @leafygreen-ui/lib@7.0.0
  - @leafygreen-ui/box@3.0.4

## 9.1.2

### Patch Changes

- 99ea9436: Adds styles to the `IconButton` components's active state.

## 9.1.1

### Patch Changes

- 2daf1808: Reads `isGlyph` function from icon package, rather than defining it locally

## 9.1.0

### Minor Changes

- 627333c2: `Size` is now a named export from the package

### Patch Changes

- Updated dependencies [ee7923d3]
  - @leafygreen-ui/lib@6.1.2

## 9.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
  - @leafygreen-ui/box@3.0.1
  - @leafygreen-ui/emotion@3.0.1
  - @leafygreen-ui/lib@6.0.1
  - @leafygreen-ui/palette@3.0.1

## 9.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/box@3.0.0
  - @leafygreen-ui/emotion@3.0.0
  - @leafygreen-ui/icon@7.0.0
  - @leafygreen-ui/lib@6.0.0
  - @leafygreen-ui/palette@3.0.0

## 8.0.2

### Patch Changes

- Updated dependencies [65d5ed4d]
  - @leafygreen-ui/icon@6.7.0

## 8.0.1

### Patch Changes

- Updated dependencies [001a277f]
  - @leafygreen-ui/icon@6.6.1

## 8.0.0

### Major Changes

- a84219f1: Deprecates `variant` in favor of new `darkMode` prop, which determines if the component should be rendered in `darkMode`

## 7.0.6

### Patch Changes

- Updated dependencies [6883ccd0]
  - @leafygreen-ui/icon@6.6.0

## 7.0.5

### Patch Changes

- Updated dependencies [e49d66b]
  - @leafygreen-ui/icon@6.5.0

## 7.0.4

### Patch Changes

- Updated dependencies [43d47db]
  - @leafygreen-ui/icon@6.4.2

## 7.0.3

### Patch Changes

- Updated dependencies [b80379a]
  - @leafygreen-ui/icon@6.4.1

## 7.0.2

### Patch Changes

- Updated dependencies [699a65c]
  - @leafygreen-ui/icon@6.4.0

## 7.0.1

### Patch Changes

- 463a338: Adds `flex-shrink` property to IconButton

## 7.0.0

### Major Changes

- ab4c074: Removed redundant aria-label from the icon that is already on the button

## 6.1.4

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/emotion@2.0.2
  - @leafygreen-ui/icon@6.3.2
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/palette@2.0.2

## 6.1.3

### Patch Changes

- Updated dependencies [6aadc0b]
- Updated dependencies [5ee2098]
  - @leafygreen-ui/lib@5.1.0
  - @leafygreen-ui/icon@6.3.1

## 6.1.2

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [d2136a0]
- Updated dependencies [a571361]
  - @leafygreen-ui/lib@5.0.0
  - @leafygreen-ui/icon@6.3.0

## 6.1.1

### Patch Changes

- Updated dependencies [4873650]
  - @leafygreen-ui/icon@6.2.0

## 6.1.0

### Minor Changes

- 27f8ea1: Adds `aria-label` to LeafyGreen icons and glyphs

### Patch Changes

- Updated dependencies [083eec3]
- Updated dependencies [27f8ea1]
  - @leafygreen-ui/lib@4.5.1
  - @leafygreen-ui/icon@6.1.2

## 6.0.1

### Patch Changes

- Updated dependencies [eba8391]
  - @leafygreen-ui/icon@6.1.1

## 6.0.0

### Major Changes

- 1d86d56: Uses new `isGlyph` property from Glyph component to determine if IconButton child is a Glyph

### Patch Changes

- Updated dependencies [1d86d56]
  - @leafygreen-ui/icon@6.1.0

## 5.0.5

### Patch Changes

- Updated dependencies [e83e4ed]
  - @leafygreen-ui/icon@6.0.1

## 5.0.4

### Patch Changes

- Updated dependencies [6fc022e]
  - @leafygreen-ui/icon@6.0.0

## 5.0.3

### Patch Changes

- Updated dependencies [2fc4ef9]
- Updated dependencies [e857861]
- Updated dependencies [cf6167e]
  - @leafygreen-ui/icon@5.2.0

## 5.0.2

### Patch Changes

- 2a03117: Upgrades @testing-library/react to v10 and revises test suites to conform with new standards
- Updated dependencies [c812eb3]
  - @leafygreen-ui/icon@5.1.0

## 5.0.1

### Patch Changes

- Updated dependencies [75c0693]
  - @leafygreen-ui/icon@5.0.3
  - @leafygreen-ui/palette@2.0.1

## 5.0.0

### Major Changes

- 5aafd72: IconButton now accepts `aria-label` instead of `ariaLabel`
  When an Icon is a child of IconButton, the Icon's title will be unset unless explicitly set on Icon, and its size will be inherited from IconButton unless its explicitly set.
  Previously, IconButton required that `ariaLabel` exists as a prop to IconButton. Now IconButton is more flexible, and requires that one of `aria-label` or `aria-labelledby` are set.

### Patch Changes

- Updated dependencies [5aafd72]
- Updated dependencies [5aafd72]
  - @leafygreen-ui/icon@5.0.2
  - @leafygreen-ui/lib@4.4.1

## 4.1.6

### Patch Changes

- Updated dependencies [365412e]
  - @leafygreen-ui/icon@5.0.1

## 4.1.5

### Patch Changes

- Updated dependencies [4c268a5]
  - @leafygreen-ui/icon@5.0.0

## 4.1.4

### Patch Changes

- Updated dependencies [e1568c6]
  - @leafygreen-ui/icon@4.3.0

## 4.1.3

### Patch Changes

- Updated dependencies [a2948f6]
  - @leafygreen-ui/icon@4.2.0

## 4.1.2

### Patch Changes

- Updated dependencies [71327dd]
  - @leafygreen-ui/icon@4.1.0

## 4.1.1

### Patch Changes

- 347bcf6:

  - Adds default background-color for cross-browser compatability
  - Removes ability of IconButton components to be focusbale when disabled

- Updated dependencies [704e25c]
  - @leafygreen-ui/lib@4.3.1

## 4.1.0

### Minor Changes

- 0bfe2ad: Adds `active` prop to IconButton component

## 4.0.0

### Major Changes

- fabc1c9: Wraps component with `React.forwardRef` to provide direct access to the underlying element

### Minor Changes

- 0a75bd6: Adds optional `size` prop to IconButton component to be compatible with `default`, `large` and `xlarge` size variants of Icon component

### Patch Changes

- Updated dependencies [0a75bd6]
- Updated dependencies [fabc1c9]
  - @leafygreen-ui/icon@4.0.0
  - @leafygreen-ui/lib@4.2.0

## 3.0.1

### Patch Changes

- Updated dependencies [11b2217]
- Updated dependencies [bd3bcd9]
- Updated dependencies [8fd107a]
  - @leafygreen-ui/lib@4.1.0
  - @leafygreen-ui/emotion@2.0.1
  - @leafygreen-ui/icon@3.0.1

## 3.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/emotion@2.0.0
  - @leafygreen-ui/icon@3.0.0
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/palette@2.0.0

## 2.0.1

### Patch Changes

- e19a757: Fix Typescript bugs with `onClick` handling

## 2.0.0

### Major Changes

- 337cab4: Enforce use of `ariaLabel` prop, which is passed to `aria-label` attribute and ensures accessibility

## 1.0.0

### Major Changes

- 6b42e6d: Initial implementation of IconButton component

### Patch Changes

- Updated dependencies [319844d]
  - @leafygreen-ui/palette@1.1.1
