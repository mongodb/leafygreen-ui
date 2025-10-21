# @leafygreen-ui/loading-indicator

## 5.0.0

### Major Changes

- 93ae067: [LG-4735](https://jira.mongodb.org/browse/LG-4735)

  The `Spinner` component has been re-written as a lightweight SVG-based spinning loading indicator component, to eliminate the use of Lottie player (a heavy run-time animation library).
  Importing `Spinner` component from the package root is not recommended, since this will also bundle the heavy `PageLoader` component, which still uses Lottie player.

  For simple loading spinners, prefer importing the spinner directly from `@leafygreen-ui/loading-indicator/spinner`

  Prop changes:

  - Replaces `displayOption` (and `sizeOverride`) prop with a single `size` prop. The size mapping has also been updated to reflect the Figma spec.

  ```
  Size.XSmall: 16px;
  Size.Small: 24px;
  Size.Default: 48px;
  Size.Large: 64px;
  ```

  Run the codemod to auto-update this prop change

  ```bash
  lg codemod loading-spinner-v5
  ```

  - Removes `baseFontSize` prop
  - Removes the explicit `description` prop.
    These props will be _removed_ by the codemod, but the description will only be converted to a comment, and must be updated manually.
    To add a description to the spinner, use the `Description` component from `@leafygreen-ui/typography` directly.

  ```tsx
  <div>
    <Spinner size="default" />
    <Description>Loading...</Description>
  </div>
  ```

### Patch Changes

- c8559f3: Widens the range of `@leafygreen-ui/leafygreen-provider` peer dependency to `>=3.2.0`
- Updated dependencies [f3a8bdc]
- Updated dependencies [c8559f3]
  - @leafygreen-ui/emotion@5.0.4
  - @leafygreen-ui/typography@22.1.4

## 4.0.6

### Patch Changes

- cee1e79: Interfaces now extend built-in `React.ComponentType` rather than custom `HTMLElementProps` for compatability with React 19
- Updated dependencies [3471b94]
- Updated dependencies [6f30c55]
- Updated dependencies [cee1e79]
- Updated dependencies [6f30c55]
  - @leafygreen-ui/lib@15.4.0
  - @leafygreen-ui/typography@22.1.3
  - @leafygreen-ui/emotion@5.0.3

## 4.0.5

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
  - @leafygreen-ui/typography@22.1.2

## 4.0.4

### Patch Changes

- 172c228: Removes `*.spec.ts` files from tsconfig `exclude` pattern, ensuring that tests are type-checked at build time.
  Also adds missing TS "references" for packages that are imported into test files
- Updated dependencies [172c228]
  - @leafygreen-ui/emotion@5.0.1
  - @leafygreen-ui/leafygreen-provider@5.0.3
  - @leafygreen-ui/lib@15.2.1
  - @leafygreen-ui/palette@5.0.1
  - @leafygreen-ui/tokens@3.2.3
  - @leafygreen-ui/typography@22.1.1

## 4.0.3

### Patch Changes

- Updated dependencies [b67497a]
  - @leafygreen-ui/lib@15.2.0
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
  - @leafygreen-ui/lib@15.1.0
  - @leafygreen-ui/typography@22.0.0
  - @leafygreen-ui/leafygreen-provider@5.0.1
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/tokens@3.1.1

## 4.0.1

### Patch Changes

- Updated dependencies [4bd4da3]
  - @leafygreen-ui/tokens@3.1.0
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
  - @leafygreen-ui/leafygreen-provider@5.0.0
  - @leafygreen-ui/typography@21.0.0
  - @leafygreen-ui/emotion@5.0.0
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/tokens@3.0.0
  - @leafygreen-ui/lib@15.0.0

## 3.0.12

### Patch Changes

- @leafygreen-ui/typography@20.1.9

## 3.0.11

### Patch Changes

- @leafygreen-ui/leafygreen-provider@4.0.7
- @leafygreen-ui/emotion@4.1.1
- @leafygreen-ui/typography@20.1.8

## 3.0.10

### Patch Changes

- Updated dependencies [f2ed4b037]
  - @leafygreen-ui/emotion@4.1.1
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.12.2
  - @leafygreen-ui/typography@20.1.7

## 3.0.9

### Patch Changes

- Updated dependencies [30b13adec]
- Updated dependencies [78a36d6bb]
  - @leafygreen-ui/lib@14.2.0
  - @leafygreen-ui/emotion@4.1.0
  - @leafygreen-ui/leafygreen-provider@4.0.6
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.12.1
  - @leafygreen-ui/typography@20.1.6

## 3.0.8

### Patch Changes

- Updated dependencies [16dda633f]
  - @leafygreen-ui/leafygreen-provider@4.0.5
  - @leafygreen-ui/typography@20.1.5

## 3.0.7

### Patch Changes

- Updated dependencies [4b362e136]
  - @leafygreen-ui/tokens@2.12.0
  - @leafygreen-ui/typography@20.1.4

## 3.0.6

### Patch Changes

- 635383bce: Updates story so that indicators wrap on smaller screens
- Updated dependencies [0e4c5099b]
  - @leafygreen-ui/lib@14.1.0
  - @leafygreen-ui/leafygreen-provider@4.0.4
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.11.5
  - @leafygreen-ui/typography@20.1.3

## 3.0.5

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
  - @leafygreen-ui/emotion@4.0.10
  - @leafygreen-ui/leafygreen-provider@4.0.3
  - @leafygreen-ui/lib@14.0.3
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.11.4
  - @leafygreen-ui/typography@20.1.2

## 3.0.4

### Patch Changes

- Updated dependencies [4d932fe13]
  - @leafygreen-ui/typography@20.1.1

## 3.0.3

### Patch Changes

- Updated dependencies [eb108e93b]
  - @leafygreen-ui/typography@20.1.0

## 3.0.2

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @leafygreen-ui/emotion@4.0.9
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
  - @leafygreen-ui/typography@20.0.1
  - @leafygreen-ui/palette@4.1.2
  - @leafygreen-ui/tokens@2.11.2
  - @leafygreen-ui/lib@14.0.1

## 3.0.0

### Major Changes

- 274d7e1a7: Removes prop-types from LeafyGreen UI

### Patch Changes

- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/leafygreen-provider@4.0.0
  - @leafygreen-ui/typography@20.0.0
  - @leafygreen-ui/lib@14.0.0
  - @leafygreen-ui/tokens@2.11.1

## 2.0.12

### Patch Changes

- Updated dependencies [dfd6972c]
  - @leafygreen-ui/typography@19.0.0

## 2.0.11

### Patch Changes

- 36166b41: - Horizontally centers loading indicator with description
  - Deletes duplicate `LoadingIndicators.styles.ts` file
- Updated dependencies [9b71e34d]
- Updated dependencies [c3906f78]
- Updated dependencies [c3906f78]
- Updated dependencies [070736c4]
  - @leafygreen-ui/typography@18.4.0
  - @leafygreen-ui/lib@13.4.0
  - @leafygreen-ui/palette@4.0.10

## 2.0.10

### Patch Changes

- 15185af0: Imports Storybook utilities from `@lg-tools/storybook-utils` (previously imported from `@leafygreen-ui/lib`)
- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [7a0ff1be]
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [66df9ab8]
  - @leafygreen-ui/typography@18.3.0
  - @leafygreen-ui/leafygreen-provider@3.1.12
  - @leafygreen-ui/lib@13.3.0
  - @leafygreen-ui/emotion@4.0.8
  - @leafygreen-ui/palette@4.0.9
  - @leafygreen-ui/tokens@2.5.2

## 2.0.9

### Patch Changes

- e487fb24: Renames story files from `.story.tsx` to `.stories.tsx`
- Updated dependencies [58f4a4c5]
- Updated dependencies [5ee54143]
- Updated dependencies [e487fb24]
  - @leafygreen-ui/typography@18.2.2
  - @leafygreen-ui/tokens@2.5.1

## 2.0.8

### Patch Changes

- 543102f4: - Resolves: [LG-3979](https://jira.mongodb.org/browse/LG-3979)
  - Updates `react-lottie-player@^1.5.6`
  - Adds `runExpressions: false` to Lottie config to prevent arbitrary code execution. (See https://github.com/airbnb/lottie-web/pull/2833)
- Updated dependencies [2bceccb1]
- Updated dependencies [2645cd50]
  - @leafygreen-ui/lib@13.2.1
  - @leafygreen-ui/tokens@2.3.0

## 2.0.7

### Patch Changes

- Updated dependencies [dd4f3da8]
- Updated dependencies [90053e16]
  - @leafygreen-ui/lib@13.0.0
  - @leafygreen-ui/typography@18.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.10

## 2.0.6

### Patch Changes

- Updated dependencies [3a9b274d]
  - @leafygreen-ui/lib@12.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.9
  - @leafygreen-ui/typography@17.0.1

## 2.0.5

### Patch Changes

- Updated dependencies [a5770c15]
- Updated dependencies [c89d17a4]
  - @leafygreen-ui/typography@17.0.0

## 2.0.4

### Patch Changes

- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
  - @leafygreen-ui/lib@11.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.7
  - @leafygreen-ui/typography@16.5.5

## 2.0.3

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/emotion@4.0.7
  - @leafygreen-ui/leafygreen-provider@3.1.6
  - @leafygreen-ui/lib@10.4.3
  - @leafygreen-ui/palette@4.0.7
  - @leafygreen-ui/tokens@2.1.4
  - @leafygreen-ui/typography@16.5.4

## 2.0.2

### Patch Changes

- c15ee2ac: Fixes missing documentation file
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/emotion@4.0.6
  - @leafygreen-ui/leafygreen-provider@3.1.5
  - @leafygreen-ui/lib@10.4.2
  - @leafygreen-ui/palette@4.0.6
  - @leafygreen-ui/tokens@2.1.3
  - @leafygreen-ui/typography@16.5.3

## 2.0.1

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/leafygreen-provider@3.1.4
  - @leafygreen-ui/typography@16.5.2
  - @leafygreen-ui/emotion@4.0.5
  - @leafygreen-ui/palette@4.0.5
  - @leafygreen-ui/tokens@2.1.2
  - @leafygreen-ui/lib@10.4.1

## 2.0.0

### Major Changes

- 61c60ab9: Changing Lottie dependency from @lottie-files/react-lottie-player to react-lottie-player

## 1.0.1

### Patch Changes

- 76161cf0: Minor fixes to stories
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
  - @leafygreen-ui/lib@10.4.0
  - @leafygreen-ui/tokens@2.1.1
  - @leafygreen-ui/typography@16.5.1

## 1.0.0

### Major Changes

- 5546f7cb9: First release of Spinner and BlobLoader components

### Patch Changes

- Updated dependencies [d2ce54e2f]
- Updated dependencies [75099c60b]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
  - @leafygreen-ui/leafygreen-provider@3.1.3
  - @leafygreen-ui/lib@10.3.4
  - @leafygreen-ui/typography@16.5.0
