# @lg-chat/rich-links

## 4.0.2

### Patch Changes

- c8559f3: Widens the range of `@leafygreen-ui/leafygreen-provider` peer dependency to `>=3.2.0`
- Updated dependencies [f3a8bdc]
- Updated dependencies [c8559f3]
  - @leafygreen-ui/emotion@5.0.4
  - @leafygreen-ui/typography@22.1.4
  - @leafygreen-ui/card@13.1.2

## 4.0.1

### Patch Changes

- cee1e79: Interfaces now extend built-in `React.ComponentType` rather than custom `HTMLElementProps` for compatability with React 19
- 6f30c55: Updates `RichLinkProps` to extend `ComponentPropsWithoutRef<'a'>`
- Updated dependencies [1a5c69f]
- Updated dependencies [3471b94]
- Updated dependencies [6f30c55]
- Updated dependencies [cee1e79]
- Updated dependencies [6f30c55]
- Updated dependencies [6f30c55]
  - @leafygreen-ui/icon@14.5.1
  - @leafygreen-ui/lib@15.4.0
  - @leafygreen-ui/typography@22.1.3
  - @leafygreen-ui/emotion@5.0.3
  - @leafygreen-ui/polymorphic@3.1.0

## 4.0.0

### Major Changes

- a9eb172: [LG-5437](https://jira.mongodb.org/browse/LG-5437)

  #### Breaking Changes

  - Removed `imageUrl` prop from `RichLink` component
  - Updated `RichLink` to more compact styling

  #### Non-breaking Changes

  - Added `forwardRef` support to `RichLinksArea`
  - Enhanced accessibility with `title` attribute on RichLink cards

### Patch Changes

- dc3299b: Adds "exports" field to all packages
  Enables TS downleveling to TS 4.9
- Updated dependencies [a9eb172]
- Updated dependencies [5ef631a]
- Updated dependencies [dc3299b]
  - @leafygreen-ui/lib@15.3.0
  - @leafygreen-ui/icon@14.5.0
  - @leafygreen-ui/card@13.0.5
  - @leafygreen-ui/emotion@5.0.2
  - @leafygreen-ui/leafygreen-provider@5.0.4
  - @leafygreen-ui/palette@5.0.2
  - @leafygreen-ui/polymorphic@3.0.4
  - @leafygreen-ui/tokens@3.2.4
  - @leafygreen-ui/typography@22.1.2

## 3.1.2

### Patch Changes

- 172c228: Removes `*.spec.ts` files from tsconfig `exclude` pattern, ensuring that tests are type-checked at build time.
  Also adds missing TS "references" for packages that are imported into test files
- Updated dependencies [172c228]
  - @leafygreen-ui/card@13.0.4
  - @leafygreen-ui/emotion@5.0.1
  - @leafygreen-ui/icon@14.4.1
  - @leafygreen-ui/leafygreen-provider@5.0.3
  - @leafygreen-ui/lib@15.2.1
  - @leafygreen-ui/palette@5.0.1
  - @leafygreen-ui/tokens@3.2.3
  - @leafygreen-ui/typography@22.1.1

## 3.1.1

### Patch Changes

- Updated dependencies [b67497a]
  - @leafygreen-ui/lib@15.2.0
  - @leafygreen-ui/card@13.0.3
  - @leafygreen-ui/icon@14.1.0
  - @leafygreen-ui/leafygreen-provider@5.0.2
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/polymorphic@3.0.3
  - @leafygreen-ui/tokens@3.1.2
  - @leafygreen-ui/typography@22.0.1

## 3.1.0

### Minor Changes

- 12ff299: Add the onLinkClick prop to support callbacks whenever a rich link is clicked

### Patch Changes

- Updated dependencies [164b15f]
- Updated dependencies [518ce41]
- Updated dependencies [3bef1e7]
- Updated dependencies [164b15f]
- Updated dependencies [1eafbb5]
  - @leafygreen-ui/lib@15.1.0
  - @leafygreen-ui/typography@22.0.0
  - @leafygreen-ui/icon@14.1.0
  - @leafygreen-ui/card@13.0.2
  - @leafygreen-ui/leafygreen-provider@5.0.1
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/polymorphic@3.0.2
  - @leafygreen-ui/tokens@3.1.1

## 3.0.1

### Patch Changes

- Updated dependencies [4bd4da3]
- Updated dependencies [9de60ce]
  - @leafygreen-ui/tokens@3.1.0
  - @leafygreen-ui/polymorphic@3.0.1
  - @leafygreen-ui/card@13.0.1
  - @leafygreen-ui/typography@21.0.1

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
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
  - @leafygreen-ui/leafygreen-provider@5.0.0
  - @leafygreen-ui/polymorphic@3.0.0
  - @leafygreen-ui/typography@21.0.0
  - @leafygreen-ui/emotion@5.0.0
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/tokens@3.0.0
  - @leafygreen-ui/card@13.0.0
  - @leafygreen-ui/icon@14.0.0
  - @leafygreen-ui/lib@15.0.0

## 2.0.12

### Patch Changes

- Updated dependencies [eca6e3fdc]
  - @leafygreen-ui/icon@13.4.0
  - @leafygreen-ui/typography@20.1.9

## 2.0.11

### Patch Changes

- Updated dependencies [1dbfb7064]
  - @leafygreen-ui/icon@13.3.0
  - @leafygreen-ui/leafygreen-provider@4.0.7
  - @leafygreen-ui/emotion@4.1.1
  - @leafygreen-ui/typography@20.1.8
  - @leafygreen-ui/card@12.0.9

## 2.0.10

### Patch Changes

- Updated dependencies [f2ed4b037]
- Updated dependencies [2ab660926]
- Updated dependencies [fd1696643]
- Updated dependencies [e874aeaf9]
  - @leafygreen-ui/emotion@4.1.1
  - @leafygreen-ui/icon@13.2.2
  - @leafygreen-ui/polymorphic@2.0.9
  - @leafygreen-ui/card@12.0.8
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.12.2
  - @leafygreen-ui/typography@20.1.7

## 2.0.9

### Patch Changes

- Updated dependencies [30b13adec]
- Updated dependencies [78a36d6bb]
  - @leafygreen-ui/lib@14.2.0
  - @leafygreen-ui/emotion@4.1.0
  - @leafygreen-ui/leafygreen-provider@4.0.6
  - @leafygreen-ui/card@12.0.7
  - @leafygreen-ui/icon@13.2.1
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/polymorphic@2.0.8
  - @leafygreen-ui/tokens@2.12.1
  - @leafygreen-ui/typography@20.1.6

## 2.0.8

### Patch Changes

- Updated dependencies [16dda633f]
  - @leafygreen-ui/leafygreen-provider@4.0.5
  - @leafygreen-ui/card@12.0.6
  - @leafygreen-ui/typography@20.1.5

## 2.0.7

### Patch Changes

- Updated dependencies [4b362e136]
  - @leafygreen-ui/tokens@2.12.0
  - @leafygreen-ui/card@12.0.5
  - @leafygreen-ui/typography@20.1.4

## 2.0.6

### Patch Changes

- Updated dependencies [0e4c5099b]
- Updated dependencies [a2fd85b23]
  - @leafygreen-ui/lib@14.1.0
  - @leafygreen-ui/icon@13.2.0
  - @leafygreen-ui/card@12.0.4
  - @leafygreen-ui/leafygreen-provider@4.0.4
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/polymorphic@2.0.7
  - @leafygreen-ui/tokens@2.11.5
  - @leafygreen-ui/typography@20.1.3

## 2.0.5

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
  - @leafygreen-ui/card@12.0.3
  - @leafygreen-ui/emotion@4.0.10
  - @leafygreen-ui/icon@13.1.3
  - @leafygreen-ui/leafygreen-provider@4.0.3
  - @leafygreen-ui/lib@14.0.3
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/polymorphic@2.0.6
  - @leafygreen-ui/tokens@2.11.4
  - @leafygreen-ui/typography@20.1.2

## 2.0.4

### Patch Changes

- Updated dependencies [4d932fe13]
  - @leafygreen-ui/typography@20.1.1

## 2.0.3

### Patch Changes

- Updated dependencies [eb108e93b]
  - @leafygreen-ui/typography@20.1.0

## 2.0.2

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @leafygreen-ui/card@12.0.2
  - @leafygreen-ui/emotion@4.0.9
  - @leafygreen-ui/icon@13.1.2
  - @leafygreen-ui/leafygreen-provider@4.0.2
  - @leafygreen-ui/lib@14.0.2
  - @leafygreen-ui/palette@4.1.3
  - @leafygreen-ui/polymorphic@2.0.5
  - @leafygreen-ui/tokens@2.11.3
  - @leafygreen-ui/typography@20.0.2

## 2.0.1

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [53c67fba6]
  - @leafygreen-ui/leafygreen-provider@4.0.1
  - @leafygreen-ui/polymorphic@2.0.4
  - @leafygreen-ui/typography@20.0.1
  - @leafygreen-ui/palette@4.1.2
  - @leafygreen-ui/tokens@2.11.2
  - @leafygreen-ui/card@12.0.1
  - @leafygreen-ui/icon@13.1.1
  - @leafygreen-ui/lib@14.0.1

## 2.0.0

### Patch Changes

- Updated dependencies [a3d63cb95]
- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/card@12.0.0
  - @leafygreen-ui/leafygreen-provider@4.0.0
  - @leafygreen-ui/typography@20.0.0
  - @leafygreen-ui/icon@13.0.0
  - @leafygreen-ui/lib@14.0.0
  - @leafygreen-ui/polymorphic@2.0.3
  - @leafygreen-ui/tokens@2.11.1

## 1.2.0

### Minor Changes

- 82bcd310a: Adds a new "Article" rich link variant

### Patch Changes

- Updated dependencies [f91e1ce97]
  - @leafygreen-ui/tokens@2.11.0

## 1.1.1

### Patch Changes

- 6834540cb: Refactors internal rich link variant processing
- Updated dependencies [2f05b61ab]
- Updated dependencies [94b4e7fa1]
- Updated dependencies [eb80fd3cb]
  - @leafygreen-ui/icon@12.6.0
  - @leafygreen-ui/typography@19.3.0

## 1.1.0

### Minor Changes

- 667496f83: Updates types to support updated Card component

### Patch Changes

- Updated dependencies [667496f83]
- Updated dependencies [667496f83]
- Updated dependencies [d70758dcf]
  - @leafygreen-ui/card@11.0.0
  - @leafygreen-ui/polymorphic@2.0.2
  - @leafygreen-ui/palette@4.1.0

## 1.0.1

### Patch Changes

- 53ff5692: Fixes a malformed import & exports rich link variants

## 1.0.0

### Major Changes

- 691877cd: Initial release

### Patch Changes

- Updated dependencies [ae44834e]
  - @leafygreen-ui/icon@12.4.0
