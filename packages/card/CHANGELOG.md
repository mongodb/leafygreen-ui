# @leafygreen-ui/card

## 10.0.7

### Patch Changes

- 15185af0: Imports Storybook utilities from `@lg-tools/storybook-utils` (previously imported from `@leafygreen-ui/lib`)
- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [66df9ab8]
  - @leafygreen-ui/leafygreen-provider@3.1.12
  - @leafygreen-ui/box@3.1.9
  - @leafygreen-ui/lib@13.3.0
  - @leafygreen-ui/emotion@4.0.8
  - @leafygreen-ui/palette@4.0.9
  - @leafygreen-ui/tokens@2.5.2

## 10.0.6

### Patch Changes

- Updated dependencies [dd4f3da8]
  - @leafygreen-ui/lib@13.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.10

## 10.0.5

### Patch Changes

- Updated dependencies [3a9b274d]
  - @leafygreen-ui/lib@12.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.9

## 10.0.4

### Patch Changes

- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
  - @leafygreen-ui/lib@11.0.0
  - @leafygreen-ui/box@3.1.8
  - @leafygreen-ui/leafygreen-provider@3.1.7

## 10.0.3

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/box@3.1.7
  - @leafygreen-ui/emotion@4.0.7
  - @leafygreen-ui/leafygreen-provider@3.1.6
  - @leafygreen-ui/lib@10.4.3
  - @leafygreen-ui/palette@4.0.7
  - @leafygreen-ui/tokens@2.1.4

## 10.0.2

### Patch Changes

- c15ee2ac: Fixes missing documentation file
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/box@3.1.6
  - @leafygreen-ui/emotion@4.0.6
  - @leafygreen-ui/leafygreen-provider@3.1.5
  - @leafygreen-ui/lib@10.4.2
  - @leafygreen-ui/palette@4.0.6
  - @leafygreen-ui/tokens@2.1.3

## 10.0.1

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/leafygreen-provider@3.1.4
  - @leafygreen-ui/emotion@4.0.5
  - @leafygreen-ui/palette@4.0.5
  - @leafygreen-ui/tokens@2.1.2
  - @leafygreen-ui/box@3.1.5
  - @leafygreen-ui/lib@10.4.1

## 10.0.0

### Major Changes

- 84c700b9: Wraps component in `React.forwardRef`

## 9.0.9

### Patch Changes

- 76161cf0: Updates stories for Chromatic testing
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
  - @leafygreen-ui/lib@10.4.0
  - @leafygreen-ui/tokens@2.1.1

## 9.0.8

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x
- Updated dependencies [d2ce54e2f]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
  - @leafygreen-ui/box@3.1.4
  - @leafygreen-ui/leafygreen-provider@3.1.3
  - @leafygreen-ui/lib@10.3.4

## 9.0.7

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/box@3.1.2
  - @leafygreen-ui/emotion@4.0.4
  - @leafygreen-ui/leafygreen-provider@3.1.2
  - @leafygreen-ui/lib@10.3.2
  - @leafygreen-ui/palette@4.0.3
  - @leafygreen-ui/tokens@2.0.2

## 9.0.6

### Patch Changes

- e30e21598: Fixes propTypes in Card component, such that contentStyle is accurate
- Updated dependencies [5b036515e]
- Updated dependencies [26e341a0b]
  - @leafygreen-ui/palette@4.0.0
  - @leafygreen-ui/lib@10.2.2
  - @leafygreen-ui/tokens@2.0.1

## 9.0.5

### Patch Changes

- bf2fedf6d: Version bumps lib
- Updated dependencies [bf2fedf6d]
  - @leafygreen-ui/leafygreen-provider@3.1.1

## 9.0.4

### Patch Changes

- Updated dependencies [741cdd408]
- Updated dependencies [b24b21462]
  - @leafygreen-ui/tokens@2.0.0
  - @leafygreen-ui/palette@3.4.7

## 9.0.3

### Patch Changes

- 737691760: Reorganizes files internally to match new Design Systems style guide

## 9.0.2

### Patch Changes

- 38181cc1d: Update to consume darkMode from `useDarkMode`. Some components were setting `darkMode = false` as a default which would override the default value provided by the `LeafyGreenProvider`.

## 9.0.1

### Patch Changes

- ed0e425e5: Adds `polished` as an explicit dependency
- ae5421cf6: Updates components to use internal transition tokens
- Updated dependencies [ae5421cf6]
  - @leafygreen-ui/tokens@1.4.0

## 9.0.0

### Patch Changes

- Updated dependencies [b9b09a86]
  - @leafygreen-ui/leafygreen-provider@3.1.0

## 8.0.1

### Patch Changes

- Updated dependencies [f2d63a60]
  - @leafygreen-ui/lib@10.0.0
  - @leafygreen-ui/leafygreen-provider@3.0.1

## 8.0.0

### Patch Changes

- Updated dependencies [e399f1b9]
- Updated dependencies [e399f1b9]
  - @leafygreen-ui/leafygreen-provider@3.0.0

## 7.1.1

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.
- Updated dependencies [24683433]
  - @leafygreen-ui/box@3.1.1
  - @leafygreen-ui/emotion@4.0.3
  - @leafygreen-ui/leafygreen-provider@2.3.5
  - @leafygreen-ui/lib@9.5.1
  - @leafygreen-ui/palette@3.4.4
  - @leafygreen-ui/tokens@1.3.4

## 7.1.0

### Minor Changes

- 3690df49: Updates TypeScript annotations, type structures and export format of some components

### Patch Changes

- 3690df49: Exports `CardProps` from Card. Extends `CardProps` in ExpandableCard
- 3690df49: Updates Storybook configs
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [58a5a05e]
  - @leafygreen-ui/box@3.1.0
  - @leafygreen-ui/lib@9.5.0
  - @leafygreen-ui/emotion@4.0.2
  - @leafygreen-ui/leafygreen-provider@2.3.4
  - @leafygreen-ui/palette@3.4.3
  - @leafygreen-ui/tokens@1.3.3

## 7.0.1

### Patch Changes

- e39d8469: update darkMode `box-shadow`
- 8d7534e9: Adds `tsdoc.json` to published package files
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/box@3.0.8
  - @leafygreen-ui/leafygreen-provider@2.3.3
  - @leafygreen-ui/lib@9.4.2
  - @leafygreen-ui/palette@3.4.2
  - @leafygreen-ui/tokens@1.3.2

## 7.0.0

### Major Changes

- 5aba12f1: - Updates 'Card' for dark mode brand refresh.
  - Consumes darkMode from the `LeafyGreenProvider` if the `darkMode` prop is not set.

## 6.0.1

### Patch Changes

- fd2f6de0: Updates to TSDocs, PropTypes, and Storybook files
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

## 6.0.0

### Major Changes

- ab1fd9e: Updates Card component for Visual brand Refresh. This includes adding a default `24px` padding inside the card. Override this with `className`

### Patch Changes

- Updated dependencies [ab1fd9e]
  - @leafygreen-ui/tokens@1.0.0

## 5.1.4

### Patch Changes

- 70f3c2c: Update focus ring color and animation timing to match other leafygreen components

## 5.1.3

### Patch Changes

- Updated dependencies [f6e5655a]
- Updated dependencies [b8f03aa1]
  - @leafygreen-ui/palette@3.2.2
  - @leafygreen-ui/lib@9.0.0
  - @leafygreen-ui/box@3.0.6

## 5.1.2

### Patch Changes

- Updated dependencies [047c1930]
  - @leafygreen-ui/lib@8.0.0
  - @leafygreen-ui/box@3.0.5

## 5.1.1

### Patch Changes

- Updated dependencies [ab581f34]
- Updated dependencies [90321b36]
  - @leafygreen-ui/palette@3.2.1
  - @leafygreen-ui/lib@7.0.0
  - @leafygreen-ui/box@3.0.4

## 5.1.0

### Minor Changes

- 7ba9f4a8: Adds darkMode prop to component

## 5.0.2

### Patch Changes

- 374430ea: Updates string color value to reference the same color from uiColors palette
- Updated dependencies [c9a0d89f]
- Updated dependencies [9ee1d5fc]
  - @leafygreen-ui/palette@3.1.0
  - @leafygreen-ui/lib@6.1.1

## 5.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
  - @leafygreen-ui/box@3.0.1
  - @leafygreen-ui/lib@6.0.1
  - @leafygreen-ui/palette@3.0.1

## 5.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/box@3.0.0
  - @leafygreen-ui/lib@6.0.0
  - @leafygreen-ui/palette@3.0.0

## 4.1.0

### Minor Changes

- 1c00364: Shadow and border radius have been tweaked a bit. Hover style now only appears when the card is clickable. A focus state was added which is also only active when the card is clickable. A new prop was added which allows specifying that that the rendered component is clickable.

## 4.0.2

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/box@2.1.3
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/palette@2.0.2

## 4.0.1

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [a571361]
  - @leafygreen-ui/lib@5.0.0
  - @leafygreen-ui/box@2.1.2

## 4.0.0

### Major Changes

- eba8391: Renames `component` prop to `as`

### Patch Changes

- Updated dependencies [eba8391]
  - @leafygreen-ui/box@2.0.0

## 3.0.0

### Major Changes

- 208d881: Refactors Card component to be a styled wrapper for Box

### Patch Changes

- Updated dependencies [208d881]
  - @leafygreen-ui/box@1.1.0

## 2.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/palette@2.0.0

## 1.0.5

### Patch Changes

- eb49b56: Fixes a TypeScript issue with the typing of rest parameters in Card
