# @leafygreen-ui/typography

## 22.1.3

### Patch Changes

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
  - @leafygreen-ui/polymorphic@3.1.0

## 22.1.2

### Patch Changes

- dc3299b: Adds "exports" field to all packages
  Enables TS downleveling to TS 4.9
- Updated dependencies [a9eb172]
- Updated dependencies [5ef631a]
- Updated dependencies [dc3299b]
  - @leafygreen-ui/lib@15.3.0
  - @leafygreen-ui/icon@14.5.0
  - @leafygreen-ui/emotion@5.0.2
  - @leafygreen-ui/leafygreen-provider@5.0.4
  - @leafygreen-ui/palette@5.0.2
  - @leafygreen-ui/polymorphic@3.0.4
  - @leafygreen-ui/tokens@3.2.4

## 22.1.1

### Patch Changes

- 172c228: Removes `*.spec.ts` files from tsconfig `exclude` pattern, ensuring that tests are type-checked at build time.
  Also adds missing TS "references" for packages that are imported into test files
- Updated dependencies [172c228]
  - @leafygreen-ui/emotion@5.0.1
  - @leafygreen-ui/icon@14.4.1
  - @leafygreen-ui/leafygreen-provider@5.0.3
  - @leafygreen-ui/lib@15.2.1
  - @leafygreen-ui/palette@5.0.1
  - @leafygreen-ui/tokens@3.2.3

## 22.1.0

### Minor Changes

- 56c0d3b: - Updates usages of `bold` weight token to `semiBold`.

  - Updates the `weight` prop of `Body` to accurately reflect weight tokens by adding `semiBold` option.

  Note: This should have no visual impact since the font-face being used was already semi-bold/600px. It just updates the token used to better align with the font-face and Figma component.

### Patch Changes

- Updated dependencies [56c0d3b]
  - @leafygreen-ui/tokens@3.2.0

## 22.0.1

### Patch Changes

- Updated dependencies [b67497a]
  - @leafygreen-ui/lib@15.2.0
  - @leafygreen-ui/icon@14.1.0
  - @leafygreen-ui/leafygreen-provider@5.0.2
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/polymorphic@3.0.3
  - @leafygreen-ui/tokens@3.1.2

## 22.0.0

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
- Updated dependencies [1eafbb5]
  - @leafygreen-ui/lib@15.1.0
  - @leafygreen-ui/icon@14.1.0
  - @leafygreen-ui/leafygreen-provider@5.0.1
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/polymorphic@3.0.2
  - @leafygreen-ui/tokens@3.1.1

## 21.0.1

### Patch Changes

- Updated dependencies [4bd4da3]
- Updated dependencies [9de60ce]
  - @leafygreen-ui/tokens@3.1.0
  - @leafygreen-ui/polymorphic@3.0.1

## 21.0.0

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
  - @leafygreen-ui/icon@14.0.0
  - @leafygreen-ui/lib@15.0.0

## 20.1.9

### Patch Changes

- Updated dependencies [eca6e3fdc]
  - @leafygreen-ui/icon@13.4.0

## 20.1.8

### Patch Changes

- Updated dependencies [1dbfb7064]
  - @leafygreen-ui/icon@13.3.0
  - @leafygreen-ui/leafygreen-provider@4.0.7
  - @leafygreen-ui/emotion@4.1.1

## 20.1.7

### Patch Changes

- Updated dependencies [f2ed4b037]
- Updated dependencies [2ab660926]
- Updated dependencies [fd1696643]
- Updated dependencies [e874aeaf9]
  - @leafygreen-ui/emotion@4.1.1
  - @leafygreen-ui/icon@13.2.2
  - @leafygreen-ui/polymorphic@2.0.9
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.12.2

## 20.1.6

### Patch Changes

- Updated dependencies [30b13adec]
- Updated dependencies [78a36d6bb]
  - @leafygreen-ui/lib@14.2.0
  - @leafygreen-ui/emotion@4.1.0
  - @leafygreen-ui/leafygreen-provider@4.0.6
  - @leafygreen-ui/icon@13.2.1
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/polymorphic@2.0.8
  - @leafygreen-ui/tokens@2.12.1

## 20.1.5

### Patch Changes

- Updated dependencies [16dda633f]
  - @leafygreen-ui/leafygreen-provider@4.0.5

## 20.1.4

### Patch Changes

- Updated dependencies [4b362e136]
  - @leafygreen-ui/tokens@2.12.0

## 20.1.3

### Patch Changes

- Updated dependencies [0e4c5099b]
- Updated dependencies [a2fd85b23]
  - @leafygreen-ui/lib@14.1.0
  - @leafygreen-ui/icon@13.2.0
  - @leafygreen-ui/leafygreen-provider@4.0.4
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/polymorphic@2.0.7
  - @leafygreen-ui/tokens@2.11.5

## 20.1.2

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
  - @leafygreen-ui/emotion@4.0.10
  - @leafygreen-ui/icon@13.1.3
  - @leafygreen-ui/leafygreen-provider@4.0.3
  - @leafygreen-ui/lib@14.0.3
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/polymorphic@2.0.6
  - @leafygreen-ui/tokens@2.11.4

## 20.1.1

### Patch Changes

- 4d932fe13: Change name of LiveExample to properly render on .design

## 20.1.0

### Minor Changes

- eb108e93b: [LG-4727](https://jira.mongodb.org/browse/LG-4727): `Description` component is now polymorphic and defaults to using a `<p>`. `children` will be typechecked and a `<p>` will be used if `children` is of type `string` or `number`. Otherwise, a `<div>` will be used.

## 20.0.2

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @leafygreen-ui/emotion@4.0.9
  - @leafygreen-ui/icon@13.1.2
  - @leafygreen-ui/leafygreen-provider@4.0.2
  - @leafygreen-ui/lib@14.0.2
  - @leafygreen-ui/palette@4.1.3
  - @leafygreen-ui/polymorphic@2.0.5
  - @leafygreen-ui/tokens@2.11.3

## 20.0.1

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [53c67fba6]
  - @leafygreen-ui/leafygreen-provider@4.0.1
  - @leafygreen-ui/polymorphic@2.0.4
  - @leafygreen-ui/palette@4.1.2
  - @leafygreen-ui/tokens@2.11.2
  - @leafygreen-ui/icon@13.1.1
  - @leafygreen-ui/lib@14.0.1

## 20.0.0

### Major Changes

- 274d7e1a7: Removes prop-types from LeafyGreen UI

### Patch Changes

- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/leafygreen-provider@4.0.0
  - @leafygreen-ui/icon@13.0.0
  - @leafygreen-ui/lib@14.0.0
  - @leafygreen-ui/polymorphic@2.0.3
  - @leafygreen-ui/tokens@2.11.1

## 19.3.0

### Minor Changes

- 94b4e7fa1: Exports `linkStyles` and `linkModeStyles`.

### Patch Changes

- Updated dependencies [2f05b61ab]
- Updated dependencies [eb80fd3cb]
  - @leafygreen-ui/icon@12.6.0

## 19.2.1

### Patch Changes

- db2d1d12c: Updates the background color of InlineCode component in dark mode from transparent to `gray.dark4`
- Updated dependencies [cfa830701]
  - @leafygreen-ui/lib@13.6.1

## 19.2.0

### Minor Changes

- 4fb369df7: Links only display focus state on `focus-visible` not default `focus`

### Patch Changes

- 7a901b954: - Uses updated `useInferredPolymorphicProps` and `hasAnchorProps` from `polymorphic`
- Updated dependencies [7a901b954]
- Updated dependencies [7a901b954]
- Updated dependencies [342ab81b0]
- Updated dependencies [29d50edaa]
  - @leafygreen-ui/polymorphic@2.0.0
  - @leafygreen-ui/lib@13.6.0
  - @leafygreen-ui/icon@12.5.4
  - @leafygreen-ui/tokens@2.9.0

## 19.1.2

### Patch Changes

- 5d44c6b16: Updates `line-height` of H1 component from 62 to 64px to align better with our grid
- Updated dependencies [df0d6faee]
  - @leafygreen-ui/icon@12.5.2

## 19.1.1

### Patch Changes

- 0864a420: Cleans up style definitions
- Updated dependencies [3364b542]
- Updated dependencies [0864a420]
- Updated dependencies [eeea253c]
  - @leafygreen-ui/tokens@2.7.0
  - @leafygreen-ui/icon@12.2.0

## 19.1.0

### Minor Changes

- c406ab85: [LG-2930](https://jira.mongodb.org/browse/LG-2930)

  - Updates typography components to use tokens where possible

### Patch Changes

- Updated dependencies [c406ab85]
  - @leafygreen-ui/tokens@2.6.0

## 19.0.0

### Major Changes

- dfd6972c: - Fixes the `Link` component so that:
  - links are inline with the text preceding it
  - The Arrow Icon is inline with the last line of text. Previously it rendered in a column next to the text because of `display: inline-flex`
  - Adds generated stories for each `Typography` component

## 18.4.0

### Minor Changes

- c3906f78: - Exports the constant, `LGIDS_TYPOGRAPHY`, which stores `data-lgid` values.
  - Extends `LgIdProps` on `CommonTypographyProps`.
  - Adds the `data-lgid` attribute to `Label` and `Description`

### Patch Changes

- 9b71e34d: Removes `button` default browsers styles when `as="button"` [LG-3665](https://jira.mongodb.org/browse/LG-3665)
- Updated dependencies [9402ba0e]
- Updated dependencies [c3906f78]
- Updated dependencies [070736c4]
  - @leafygreen-ui/icon@12.1.0
  - @leafygreen-ui/lib@13.4.0
  - @leafygreen-ui/palette@4.0.10

## 18.3.0

### Minor Changes

- 7a0ff1be: [LG-4126](https://jira.mongodb.org/browse/LG-4126)

  Styling changes are made to ensure consistent implementation of `disabled` state styles.

### Patch Changes

- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [66df9ab8]
  - @leafygreen-ui/leafygreen-provider@3.1.12
  - @leafygreen-ui/icon@12.0.1
  - @leafygreen-ui/lib@13.3.0
  - @leafygreen-ui/emotion@4.0.8
  - @leafygreen-ui/palette@4.0.9
  - @leafygreen-ui/polymorphic@1.3.7
  - @leafygreen-ui/tokens@2.5.2

## 18.2.3

### Patch Changes

- Updated dependencies [74057388]
  - @leafygreen-ui/icon@12.0.0

## 18.2.2

### Patch Changes

- 58f4a4c5: Updates how link underlines are styled, such that the text-decoration wraps when links break on new lines
- Updated dependencies [5ee54143]
- Updated dependencies [e487fb24]
  - @leafygreen-ui/tokens@2.5.1
  - @leafygreen-ui/icon@11.29.1

## 18.2.1

### Patch Changes

- 11d12cc4: Updates dependency `@leafygreen-ui/tokens@2.3.0`
- Updated dependencies [c2854e9b]
  - @leafygreen-ui/tokens@2.4.0

## 18.2.0

### Minor Changes

- 58e86c60: - Adds `BackLink` component. This component renders a persistent back arrow and is intended for internal linking only.
  - Correctly responds to `baseFontSize` prop.

## 18.1.0

### Minor Changes

- ffd11f24: Allows `Link` component to accept a ref

### Patch Changes

- Updated dependencies [9b7a8236]
- Updated dependencies [7f38e78a]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
  - @leafygreen-ui/icon@11.27.1
  - @leafygreen-ui/leafygreen-provider@3.1.11
  - @leafygreen-ui/lib@13.2.0

## 18.0.1

### Patch Changes

- e3f4d9ce: Improves documentation of Label component
- Updated dependencies [c41752d2]
- Updated dependencies [89332190]
  - @leafygreen-ui/icon@11.25.0

## 18.0.0

### Major Changes

- 90053e16: Allows `Link` component to accept a ref

### Patch Changes

- Updated dependencies [dd4f3da8]
  - @leafygreen-ui/lib@13.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.10

## 17.0.2

### Patch Changes

- 324d9730: Updates H1 and H2 components in dark mode. Previously, their default color was `'green.light1'` in dark mode, and now the default is `'gray.light2'`

## 17.0.1

### Patch Changes

- Updated dependencies [3a9b274d]
  - @leafygreen-ui/lib@12.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.9

## 17.0.0

### Major Changes

- a5770c15: Link now inherits font size and line height from the parent's CSS
- c89d17a4: Updates `Error` component to read from TypographyProvider to set font size

## 16.5.5

### Patch Changes

- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
  - @leafygreen-ui/icon@11.22.2
  - @leafygreen-ui/lib@11.0.0
  - @leafygreen-ui/polymorphic@1.3.6
  - @leafygreen-ui/leafygreen-provider@3.1.7

## 16.5.4

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/emotion@4.0.7
  - @leafygreen-ui/icon@11.22.1
  - @leafygreen-ui/leafygreen-provider@3.1.6
  - @leafygreen-ui/lib@10.4.3
  - @leafygreen-ui/palette@4.0.7
  - @leafygreen-ui/polymorphic@1.3.5
  - @leafygreen-ui/tokens@2.1.4

## 16.5.3

### Patch Changes

- c15ee2ac: Fixes missing documentation file
- Updated dependencies [f73807cf]
- Updated dependencies [31c09354]
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/icon@11.22.0
  - @leafygreen-ui/emotion@4.0.6
  - @leafygreen-ui/leafygreen-provider@3.1.5
  - @leafygreen-ui/lib@10.4.2
  - @leafygreen-ui/palette@4.0.6
  - @leafygreen-ui/polymorphic@1.3.4
  - @leafygreen-ui/tokens@2.1.3

## 16.5.2

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/leafygreen-provider@3.1.4
  - @leafygreen-ui/polymorphic@1.3.3
  - @leafygreen-ui/emotion@4.0.5
  - @leafygreen-ui/palette@4.0.5
  - @leafygreen-ui/tokens@2.1.2
  - @leafygreen-ui/icon@11.20.1
  - @leafygreen-ui/lib@10.4.1

## 16.5.1

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

## 16.5.0

### Minor Changes

- 75099c60b: types `LinkProps` and `InlineCodeProps` accept a generic

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x
- Updated dependencies [d2ce54e2f]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
  - @leafygreen-ui/icon@11.16.1
  - @leafygreen-ui/leafygreen-provider@3.1.3
  - @leafygreen-ui/lib@10.3.4
  - @leafygreen-ui/polymorphic@1.3.2

## 16.4.1

### Patch Changes

- 6a3f03fd2: Exported typography interfaces now extend PolymorphicProps

## 16.4.0

### Minor Changes

- 9bcf8b925: Exports `OverlineProps` and `SubtitleProps`

### Patch Changes

- 73cbbd02c: Uses fontWeight token from `@leafygreen-ui/tokens`
- Updated dependencies [73cbbd02c]
- Updated dependencies [83fc5b31b]
- Updated dependencies [8ece56980]
  - @leafygreen-ui/tokens@2.1.0
  - @leafygreen-ui/icon@11.14.0

## 16.3.0

### Minor Changes

- 07db42330: Exports typography component types

### Patch Changes

- 55d33e435: Update to BaseFontSize prop control for .design live example
- cf00160ec: Updates TSDocs
- Updated dependencies [55d33e435]
- Updated dependencies [55d33e435]
- Updated dependencies [cf00160ec]
- Updated dependencies [111b680c5]
- Updated dependencies [77320a6b8]
  - @leafygreen-ui/lib@10.3.3
  - @leafygreen-ui/palette@4.0.4
  - @leafygreen-ui/tokens@2.0.3

## 16.2.1

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/emotion@4.0.4
  - @leafygreen-ui/icon@11.13.1
  - @leafygreen-ui/leafygreen-provider@3.1.2
  - @leafygreen-ui/lib@10.3.2
  - @leafygreen-ui/palette@4.0.3
  - @leafygreen-ui/polymorphic@1.3.1
  - @leafygreen-ui/tokens@2.0.2

## 16.2.0

### Minor Changes

- ece595acd: InlineCode component now supports "as" prop
- 9858ab8c5: Overwrites default text-decoration property on Link component

### Patch Changes

- Updated dependencies [3ef365fd3]
- Updated dependencies [c2c5601f4]
  - @leafygreen-ui/polymorphic@1.3.0
  - @leafygreen-ui/icon@11.12.7
  - @leafygreen-ui/lib@10.3.1
  - @leafygreen-ui/palette@4.0.1

## 16.1.0

### Minor Changes

- eb0cc4498: No longer filters out props that are passed to Link component

### Patch Changes

- Updated dependencies [5b036515e]
- Updated dependencies [b9841decc]
- Updated dependencies [26e341a0b]
- Updated dependencies [997121cc3]
  - @leafygreen-ui/palette@4.0.0
  - @leafygreen-ui/polymorphic@1.2.0
  - @leafygreen-ui/lib@10.2.2
  - @leafygreen-ui/icon@11.12.5
  - @leafygreen-ui/tokens@2.0.1

## 16.0.1

### Patch Changes

- bf2fedf6d: Version bumps lib
- b7a29ea38: Removes "as" prop from HTML in H1 and H2 components.
- Updated dependencies [bf2fedf6d]
  - @leafygreen-ui/leafygreen-provider@3.1.1

## 16.0.0

### Major Changes

- 866144167: Uses `Polymorphic` instead of Box to support `as` prop. Adds support for `as` prop to `Label` component.

### Patch Changes

- c82ed35d5: Removes `useUsingKeyboardContext` from component, in favor of `&:focus-visible`
- Updated dependencies [050f1f8a9]
- Updated dependencies [741cdd408]
- Updated dependencies [9f06c9495]
- Updated dependencies [b24b21462]
  - @leafygreen-ui/icon@11.12.4
  - @leafygreen-ui/tokens@2.0.0
  - @leafygreen-ui/polymorphic@1.1.0
  - @leafygreen-ui/palette@3.4.7

## 15.3.0

### Minor Changes

- 53d77f55d: Introduces Error component to Typography package

## 15.2.1

### Patch Changes

- d8c589d35: Updates Storybook example DOM structure (removes 'invalid nesting' error) & uses provider for darkMode on Typography story
- Updated dependencies [703db871f]
  - @leafygreen-ui/palette@3.4.6

## 15.2.0

### Minor Changes

- a0d6638c4: Allows consuming applications to override baseFontSize as inherited from LeafyGreen Provider

### Patch Changes

- Updated dependencies [95bd93ef9]
- Updated dependencies [3bb4b7506]
  - @leafygreen-ui/icon@11.12.3

## 15.1.1

### Patch Changes

- b7f7a4c95: Updates package dependencies & devDependencies, and ensures each package is appropriately listed. Ensures `tsconfig` has no circular dependencies
- Updated dependencies [b7f7a4c95]
  - @leafygreen-ui/icon@11.12.2
  - @leafygreen-ui/palette@3.4.5
  - @leafygreen-ui/tokens@1.4.1

## 15.1.0

### Minor Changes

- 6a266b813: Adds internal `StaticWidthText` component to prevent layout shift on font-weight change

### Patch Changes

- ba97d1ef7: Refactors component to follow new directory file structure
- ae5421cf6: Updates components to use internal transition tokens
- Updated dependencies [ae5421cf6]
- Updated dependencies [4b4c2d27d]
- Updated dependencies [1a335d0b2]
  - @leafygreen-ui/tokens@1.4.0
  - @leafygreen-ui/icon@11.12.1

## 15.0.0

### Minor Changes

- 07b3c797: Enables passing a ref to `InlineCode`

### Patch Changes

- 07b3c797: Sets `InlineCode` default display property to `inline`
- Updated dependencies [b9b09a86]
  - @leafygreen-ui/leafygreen-provider@3.1.0

## 14.0.1

### Patch Changes

- Updated dependencies [209f77ed]
- Updated dependencies [f2d63a60]
  - @leafygreen-ui/icon@11.12.0
  - @leafygreen-ui/lib@10.0.0
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
  - @leafygreen-ui/box@3.1.1
  - @leafygreen-ui/emotion@4.0.3
  - @leafygreen-ui/icon@11.11.1
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
- Updated dependencies [3690df49]
- Updated dependencies [58a5a05e]
  - @leafygreen-ui/box@3.1.0
  - @leafygreen-ui/icon@11.11.0
  - @leafygreen-ui/lib@9.5.0
  - @leafygreen-ui/emotion@4.0.2
  - @leafygreen-ui/leafygreen-provider@2.3.4
  - @leafygreen-ui/palette@3.4.3
  - @leafygreen-ui/tokens@1.3.3

## 13.1.2

### Patch Changes

- e39d8469: Export `anchorClassName`
- 8d7534e9: Adds `tsdoc.json` to published package files
- Updated dependencies [7caa1c3e]
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/icon@11.10.2
  - @leafygreen-ui/box@3.0.8
  - @leafygreen-ui/leafygreen-provider@2.3.3
  - @leafygreen-ui/lib@9.4.2
  - @leafygreen-ui/palette@3.4.2
  - @leafygreen-ui/tokens@1.3.2

## 13.1.1

### Patch Changes

- 5aba12f1: Export and combine `Label` and `Description` styles.

## 13.1.0

### Minor Changes

- 65c86281: Consuming darkMode from the LeafyGreenProvider if the darkMode prop is not set

## 13.0.1

### Patch Changes

- 13a4adcc: Style updates to the `Disclaimer` component

## 13.0.0

### Patch Changes

- Updated dependencies [85d46871]
- Updated dependencies [99e20bb9]
  - @leafygreen-ui/lib@9.4.0
  - @leafygreen-ui/leafygreen-provider@2.3.0

## 12.0.0

### Major Changes

- f0a357e2: Updates `Body`, `Disclaimer`, `H1`, `H2`, `H3`, `InlineCode`, `InlineKeyCode`, `Link`, `Overline`, and `Subtitle` for dark mode refresh.

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
  - @leafygreen-ui/tokens@1.3.1
  - @leafygreen-ui/lib@9.3.0

## 11.0.1

### Patch Changes

- 909209c4: Fixes `useUpdatedBaseFontSize` override prop to accept the deprecated value `14`

## 11.0.0

### Major Changes

- Updated dependencies [500d6c60]
  - @leafygreen-ui/leafygreen-provider@2.2.0

### Patch Changes

- Updated dependencies [5f28fce1]
- Updated dependencies [c48e943e]
- Updated dependencies [500d6c60]
  - @leafygreen-ui/tokens@1.3.0
  - @leafygreen-ui/icon@11.9.0

## 10.0.0

### Major Changes

- ba4aab15: Updates `Label` and `Description` for Dark Mode Refresh

  Exports a temporary `useUpdatedBaseFontSize` hook to convert the values returned from `useBaseFontSize` to the new `tokens`

### Minor Changes

- f3aad7e2: Adds an optional `override` parameter to `useUpdatedBaseFontSize`. If the containing component accepts a `baseFontSize` prop, use this parameter to respect that prop

### Patch Changes

- 679b6239: Updating h3 font-weight from 500 to 600
- Updated dependencies [233ac580]
- Updated dependencies [ba4aab15]
- Updated dependencies [2cf1bc4a]
  - @leafygreen-ui/tokens@1.2.0
  - @leafygreen-ui/lib@9.2.1

## 9.1.1

### Patch Changes

- 614be76: Reduces outline width for InlineCode focus state
- Updated dependencies [614be76]
  - @leafygreen-ui/tokens@1.1.0

## 9.1.0

### Minor Changes

- 1067fe9: Body typography component now uses the Box component, allowing the use of the `as` prop

## 9.0.0

### Major Changes

- 8457f92: - Adds "Euclid Circular A" and "MongoDB Value Serif" to `tokens.fontFamilies`
  - Updates Light mode typography according to visual brand refresh

### Patch Changes

- Updated dependencies [8457f92]
  - @leafygreen-ui/tokens@1.0.0
- Updated dependencies [cb54eef]
  - @leafygreen-ui/palette@3.3.1

## 8.1.0

### Minor Changes

- da40935b: Updates appearance of the InlineCode component, and adds dark mode support.

## 8.0.4

### Patch Changes

- Updated dependencies [f6e5655a]
- Updated dependencies [03388ff2]
- Updated dependencies [b8f03aa1]
  - @leafygreen-ui/palette@3.2.2
  - @leafygreen-ui/icon@11.3.0
  - @leafygreen-ui/lib@9.0.0
  - @leafygreen-ui/box@3.0.6
  - @leafygreen-ui/leafygreen-provider@2.1.3
  - @leafygreen-ui/tokens@0.5.3

## 8.0.3

### Patch Changes

- d82eb152: Fixes Link component to support relative links. Links with `href` strings not beginning with `http://` or `https://` will behave the same as a native anchor tag

## 8.0.2

### Patch Changes

- Updated dependencies [047c1930]
  - @leafygreen-ui/lib@8.0.0
  - @leafygreen-ui/box@3.0.5
  - @leafygreen-ui/icon@11.1.1
  - @leafygreen-ui/leafygreen-provider@2.1.2
  - @leafygreen-ui/tokens@0.5.2

## 8.0.1

### Patch Changes

- Updated dependencies [faeb0ce0]
  - @leafygreen-ui/icon@11.0.0

## 8.0.0

### Patch Changes

- Updated dependencies [857a680a]
  - @leafygreen-ui/leafygreen-provider@2.1.0

## 7.6.0

### Minor Changes

- 02417199: Updates line-height for H3 component from 28px to 32px.

### Patch Changes

- Updated dependencies [ab581f34]
- Updated dependencies [90321b36]
  - @leafygreen-ui/palette@3.2.1
  - @leafygreen-ui/lib@7.0.0
  - @leafygreen-ui/box@3.0.4
  - @leafygreen-ui/icon@10.2.1
  - @leafygreen-ui/leafygreen-provider@2.0.3
  - @leafygreen-ui/tokens@0.5.1

## 7.5.0

### Minor Changes

- ec27f36e: - Improves accessibility of link component when rendering an icon.
  - Renders arrow at 12px instead of 10px to account for the reduced height of the glyph.

### Patch Changes

- Updated dependencies [ec27f36e]
  - @leafygreen-ui/icon@10.0.0

## 7.4.0

### Minor Changes

- 1a42c662: Adds value to `rel` prop in Link component when href is external

### Patch Changes

- Updated dependencies [1ed17f68]
  - @leafygreen-ui/box@3.0.3

## 7.3.2

### Patch Changes

- f805b772: Support updated glyph
- Updated dependencies [f805b772]
  - @leafygreen-ui/icon@9.0.0

## 7.3.1

### Patch Changes

- Updated dependencies [ba56b1cc]
  - @leafygreen-ui/icon@8.0.0

## 7.3.0

### Minor Changes

- fc18e572: `H1`, `H2`, `H3` and `Subtitle` components now accept an `as` prop, such that we can keep styles consistent via `Component`, but the actual heading level that should be rendered can change based on context. This was done to support making MongoDB an accessible platform, as headings should only decrease by one level (i.e. from `<h1>` to `<h2>`) but the styles don't always need to appear as such.

## 7.2.0

### Minor Changes

- 8b0ea602: - `Label` component now supports a `disabled` prop

## 7.1.1

### Patch Changes

- ee7923d3: Changes how we extend the types of HTMLElements, and standardizes how we document this across readmes
- Updated dependencies [ee7923d3]
- Updated dependencies [7b71da8f]
  - @leafygreen-ui/lib@6.1.2
  - @leafygreen-ui/icon@7.0.2

## 7.1.0

### Minor Changes

- fe861d52: Adds `Label` and `Description` components
- aab4e65b: Rest props are now forwarded for InlineDefinition components when not rendered as a link

### Patch Changes

- 374430ea: Updates string color value to reference the same color from uiColors palette
- Updated dependencies [c9a0d89f]
- Updated dependencies [9ee1d5fc]
  - @leafygreen-ui/palette@3.1.0
  - @leafygreen-ui/lib@6.1.1
  - @leafygreen-ui/leafygreen-provider@2.0.2

## 7.0.0

### Major Changes

- ac0f3ff1: Visual updates to focus and hover states of <InlineCode /> component. The HTML structure has been returned to that of `v4.*` (the previous change in `v5` was not reflected in the README). Styles provided through `className` prop may need to be updated to accordingly.

### Patch Changes

- Updated dependencies [90996818]
  - @leafygreen-ui/box@3.0.2

## 6.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
- Updated dependencies [059ef833]
  - @leafygreen-ui/box@3.0.1
  - @leafygreen-ui/icon@7.0.1
  - @leafygreen-ui/leafygreen-provider@2.0.1
  - @leafygreen-ui/lib@6.0.1
  - @leafygreen-ui/palette@3.0.1
  - @leafygreen-ui/tokens@0.5.0

## 6.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/box@3.0.0
  - @leafygreen-ui/icon@7.0.0
  - @leafygreen-ui/leafygreen-provider@2.0.0
  - @leafygreen-ui/lib@6.0.0
  - @leafygreen-ui/palette@3.0.0
  - @leafygreen-ui/tokens@0.4.0

## 5.0.0

### Major Changes

- 001a277f: `Body` component now renders as a `div` instead of `p` element.

### Minor Changes

- d0dac1a0: Updates InlineCode component to match design spec. InlineCode components may now also be links.

### Patch Changes

- Updated dependencies [001a277f]
  - @leafygreen-ui/icon@6.6.1

## 4.3.0

### Minor Changes

- eda10121: Adds `H3` and `InlineKeyCode` components
  Updates color of typography elements from `uiColors.gray.dark2` to `uiColors.gray.dark3`

### Patch Changes

- 3fed752e: Fixes styles for Link component
- Updated dependencies [6883ccd0]
- Updated dependencies [d5d40791]
  - @leafygreen-ui/icon@6.6.0
  - @leafygreen-ui/box@2.1.5

## 4.2.2

### Patch Changes

- f792966: Uses Tokens package to define `font-family` for InlineCode component
- Updated dependencies [f792966]
  - @leafygreen-ui/tokens@0.3.0

## 4.2.1

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/box@2.1.3
  - @leafygreen-ui/icon@6.3.2
  - @leafygreen-ui/leafygreen-provider@1.1.4
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/palette@2.0.2

## 4.2.0

### Minor Changes

- 458f0c3: Ensures that `rest` props are spread to every component in Typography package

### Patch Changes

- @leafygreen-ui/leafygreen-provider@1.1.3

## 4.1.1

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [d2136a0]
- Updated dependencies [a571361]
  - @leafygreen-ui/lib@5.0.0
  - @leafygreen-ui/icon@6.3.0
  - @leafygreen-ui/box@2.1.2
  - @leafygreen-ui/leafygreen-provider@1.1.2

## 4.1.0

### Minor Changes

- 4873650: Adds `Link` component to typography package

### Patch Changes

- Updated dependencies [e8f5376]
- Updated dependencies [4873650]
  - @leafygreen-ui/box@2.1.1
  - @leafygreen-ui/icon@6.2.0

## 4.0.0

### Major Changes

- 1d24966: Makes `@leafygreen-ui/leafygreen-provider` a peer dependency to ensure that components use hooks from the same version of the provider as what's installed.

## 3.0.0

### Major Changes

- eba8391: Renames `component` prop to `as`

### Patch Changes

- Updated dependencies [eba8391]
  - @leafygreen-ui/box@2.0.0

## 2.0.0

### Major Changes

- 6d1de4a: Removes `display:inline-block` from Body and Small components.

## 1.0.1

### Patch Changes

- 365412e: Adds lib as a dependency rather than a devDep

## 1.0.0

### Major Changes

- 94ed125: Initial implementation of Typography component

### Patch Changes

- Updated dependencies [94ed125]
  - @leafygreen-ui/leafygreen-provider@1.1.0
