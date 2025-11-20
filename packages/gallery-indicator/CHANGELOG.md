# @leafygreen-ui/gallery-indicator

## 3.1.2

### Patch Changes

- 9cf3b18: Updates provider peer dependency version string to correctly use `pnpm` `workspace` syntax

## 3.1.1

### Patch Changes

- Updated dependencies [92693df]
  - @leafygreen-ui/tokens@4.0.0
  - @leafygreen-ui/emotion@5.1.0

## 3.1.0

### Minor Changes

- 772c55d: Add variant allowing user to pick between default and BaseGreen

### Patch Changes

- c8559f3: Widens the range of `@leafygreen-ui/leafygreen-provider` peer dependency to `>=3.2.0`
- Updated dependencies [f3a8bdc]
  - @leafygreen-ui/emotion@5.0.4

## 3.0.4

### Patch Changes

- cee1e79: Interfaces now extend built-in `React.ComponentType` rather than custom `HTMLElementProps` for compatability with React 19
- Updated dependencies [3471b94]
- Updated dependencies [6f30c55]
- Updated dependencies [cee1e79]
- Updated dependencies [6f30c55]
  - @leafygreen-ui/lib@15.4.0
  - @leafygreen-ui/emotion@5.0.3

## 3.0.3

### Patch Changes

- dc3299b: Adds "exports" field to all packages
  Enables TS downleveling to TS 4.9
- Updated dependencies [a9eb172]
- Updated dependencies [dc3299b]
  - @leafygreen-ui/lib@15.3.0
  - @leafygreen-ui/emotion@5.0.2
  - @leafygreen-ui/leafygreen-provider@5.0.4
  - @leafygreen-ui/palette@5.0.2
  - @leafygreen-ui/tokens@3.2.4
  - @lg-tools/test-harnesses@0.3.4

## 3.0.2

### Patch Changes

- 172c228: Removes `*.spec.ts` files from tsconfig `exclude` pattern, ensuring that tests are type-checked at build time.
  Also adds missing TS "references" for packages that are imported into test files
- Updated dependencies [172c228]
  - @leafygreen-ui/emotion@5.0.1
  - @leafygreen-ui/leafygreen-provider@5.0.3
  - @leafygreen-ui/lib@15.2.1
  - @leafygreen-ui/palette@5.0.1
  - @leafygreen-ui/tokens@3.2.3
  - @lg-tools/test-harnesses@0.3.3

## 3.0.1

### Patch Changes

- Updated dependencies [b67497a]
  - @leafygreen-ui/lib@15.2.0
  - @leafygreen-ui/leafygreen-provider@5.0.2
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/tokens@3.1.2

## 3.0.0

### Major Changes

- 164b15f: Updates `data-lgid` and `data-testid` to use scope based test IDs. These test IDs are generated using the helper utility `getLgIds`. For more information [check out the section in the styleguide about getLgIds](https://github.com/mongodb/leafygreen-ui/blob/main/STYLEGUIDE.md#getlgids).

  Removes public exports for:

  - `LGIDs`
  - `LGIDS_CHECKBOX`
  - `LGIDS_FORM_FIELD`
  - `LGIDS_SELECT`
  - `LGIDS_TYPOGRAPHY`

### Patch Changes

- Updated dependencies [164b15f]
- Updated dependencies [518ce41]
- Updated dependencies [3bef1e7]
- Updated dependencies [da277d5]
  - @leafygreen-ui/lib@15.1.0
  - @lg-tools/test-harnesses@0.3.2
  - @leafygreen-ui/leafygreen-provider@5.0.1
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/tokens@3.1.1

## 2.0.1

### Patch Changes

- Updated dependencies [caaaeeb]
- Updated dependencies [4bd4da3]
  - @lg-tools/test-harnesses@0.3.1
  - @leafygreen-ui/tokens@3.1.0

## 2.0.0

### Major Changes

- 0757cfbfc: Adds code splitting for test utilities

  - Adds `/testing` entry point
  - Removes `getTestUtils` from main bundle entry point

  When using the component, testing utilities won't be included into your final bundle

  ```tsx
  // App.tsx
  import { Component } from `@leafygreen-ui/<package>`
  ```

  Testing utilities (and their dependencies) will only be imported if you import them explicitly

  ```tsx
  import { getTestUtils } from `@leafygreen-ui/<package>/testing`
  ```

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
  - @lg-tools/test-harnesses@0.3.0
  - @leafygreen-ui/emotion@5.0.0
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/tokens@3.0.0
  - @leafygreen-ui/lib@15.0.0

## 1.0.8

### Patch Changes

- @leafygreen-ui/leafygreen-provider@4.0.7
- @leafygreen-ui/emotion@4.1.1

## 1.0.7

### Patch Changes

- Updated dependencies [f2ed4b037]
  - @leafygreen-ui/emotion@4.1.1
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.12.2

## 1.0.6

### Patch Changes

- Updated dependencies [30b13adec]
- Updated dependencies [78a36d6bb]
  - @leafygreen-ui/lib@14.2.0
  - @leafygreen-ui/emotion@4.1.0
  - @leafygreen-ui/leafygreen-provider@4.0.6
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.12.1

## 1.0.5

### Patch Changes

- Updated dependencies [16dda633f]
  - @leafygreen-ui/leafygreen-provider@4.0.5

## 1.0.4

### Patch Changes

- Updated dependencies [4b362e136]
  - @leafygreen-ui/tokens@2.12.0

## 1.0.3

### Patch Changes

- Updated dependencies [0e4c5099b]
  - @leafygreen-ui/lib@14.1.0
  - @leafygreen-ui/leafygreen-provider@4.0.4
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.11.5

## 1.0.2

### Patch Changes

- 6c3869289: Updates storybook argType to render properly on .design

## 1.0.1

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
- Updated dependencies [3111a76f3]
  - @leafygreen-ui/emotion@4.0.10
  - @leafygreen-ui/leafygreen-provider@4.0.3
  - @leafygreen-ui/lib@14.0.3
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.11.4
  - @lg-tools/test-harnesses@0.2.0

## 1.0.0

### Major Changes

- 81d2a3ae3: - First major release of `GalleryIndicator`.
  - Exports `getTestUtils`, a util to reliably interact with LG `GalleryIndicator` in a product test suite. For more details, check out the [README](https://github.com/mongodb/leafygreen-ui/tree/main/packages/gallery-indicator#test-harnesses)
  - Exports the constant, `LGIDs` which stores `data-lgid` values.
