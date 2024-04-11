# @leafygreen-ui/text-area

## 8.2.1

### Patch Changes

- 8adadc89: Fixes a bug that prevented packages from rendering in a server-side environment
- Updated dependencies [8adadc89]
  - @lg-tools/test-harnesses@0.1.2

## 8.2.0

### Minor Changes

- c3906f78: - Extends `DarkModeProps` from `@leafygreen-ui/lib`
  - Exports `getTestUtils`, a util to reliably interact with `LG TextArea` in a product test suite. For more details, check out the [README](https://github.com/mongodb/leafygreen-ui/tree/main/packages/text-area#test-harnesses) [LG-4035](https://jira.mongodb.org/browse/LG-4035)
  - Adds `aria-invalid` attribute on the `textarea`. This will be true if `state === error`.
  - Exports the constant, `LGIDS_TEXT_AREA`, which stores `data-lgid` values.

### Patch Changes

- Updated dependencies [9402ba0e]
- Updated dependencies [9b71e34d]
- Updated dependencies [c3906f78]
- Updated dependencies [c3906f78]
- Updated dependencies [c3906f78]
- Updated dependencies [070736c4]
  - @leafygreen-ui/icon@12.1.0
  - @leafygreen-ui/typography@18.4.0
  - @leafygreen-ui/lib@13.4.0
  - @lg-tools/test-harnesses@0.1.1
  - @leafygreen-ui/palette@4.0.10

## 8.1.3

### Patch Changes

- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [7a0ff1be]
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [66df9ab8]
  - @leafygreen-ui/typography@18.3.0
  - @leafygreen-ui/leafygreen-provider@3.1.12
  - @leafygreen-ui/icon@12.0.1
  - @leafygreen-ui/lib@13.3.0
  - @leafygreen-ui/emotion@4.0.8
  - @leafygreen-ui/hooks@8.1.3
  - @leafygreen-ui/palette@4.0.9
  - @leafygreen-ui/tokens@2.5.2

## 8.1.2

### Patch Changes

- Updated dependencies [74057388]
  - @leafygreen-ui/icon@12.0.0
  - @leafygreen-ui/typography@18.2.3

## 8.1.1

### Patch Changes

- 54a1bfb8: Allow defaultValue to be used in TextArea

## 8.1.0

### Minor Changes

- 36a8ded2: `description` prop can now be a `React.ReactNode` rather than a `string`

### Patch Changes

- Updated dependencies [c2854e9b]
- Updated dependencies [11d12cc4]
  - @leafygreen-ui/tokens@2.4.0
  - @leafygreen-ui/typography@18.2.1

## 8.0.21

### Patch Changes

- 305e3cdf: aria-labelledby is now correctly passed to the textarea
- Updated dependencies [75b8d963]
  - @leafygreen-ui/icon@11.27.0

## 8.0.20

### Patch Changes

- Updated dependencies [dd4f3da8]
- Updated dependencies [90053e16]
  - @leafygreen-ui/lib@13.0.0
  - @leafygreen-ui/typography@18.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.10

## 8.0.19

### Patch Changes

- Updated dependencies [3a9b274d]
  - @leafygreen-ui/lib@12.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.9
  - @leafygreen-ui/typography@17.0.1

## 8.0.18

### Patch Changes

- Updated dependencies [a5770c15]
- Updated dependencies [c89d17a4]
  - @leafygreen-ui/typography@17.0.0

## 8.0.17

### Patch Changes

- Updated dependencies [3fe03b50]
- Updated dependencies [fd907503]
- Updated dependencies [c9f0055a]
- Updated dependencies [56459cde]
  - @leafygreen-ui/tokens@2.2.0
  - @leafygreen-ui/hooks@8.0.0
  - @leafygreen-ui/icon@11.23.0
  - @leafygreen-ui/leafygreen-provider@3.1.8

## 8.0.16

### Patch Changes

- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
  - @leafygreen-ui/icon@11.22.2
  - @leafygreen-ui/lib@11.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.7
  - @leafygreen-ui/typography@16.5.5

## 8.0.15

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/emotion@4.0.7
  - @leafygreen-ui/hooks@7.7.8
  - @leafygreen-ui/icon@11.22.1
  - @leafygreen-ui/leafygreen-provider@3.1.6
  - @leafygreen-ui/lib@10.4.3
  - @leafygreen-ui/palette@4.0.7
  - @leafygreen-ui/tokens@2.1.4
  - @leafygreen-ui/typography@16.5.4

## 8.0.14

### Patch Changes

- c15ee2ac: Fixes missing documentation file
- Updated dependencies [f73807cf]
- Updated dependencies [31c09354]
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/icon@11.22.0
  - @leafygreen-ui/emotion@4.0.6
  - @leafygreen-ui/hooks@7.7.7
  - @leafygreen-ui/leafygreen-provider@3.1.5
  - @leafygreen-ui/lib@10.4.2
  - @leafygreen-ui/palette@4.0.6
  - @leafygreen-ui/tokens@2.1.3
  - @leafygreen-ui/typography@16.5.3

## 8.0.13

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/leafygreen-provider@3.1.4
  - @leafygreen-ui/typography@16.5.2
  - @leafygreen-ui/emotion@4.0.5
  - @leafygreen-ui/palette@4.0.5
  - @leafygreen-ui/tokens@2.1.2
  - @leafygreen-ui/hooks@7.7.6
  - @leafygreen-ui/icon@11.20.1
  - @leafygreen-ui/lib@10.4.1

## 8.0.12

### Patch Changes

- 76161cf0: Updates stories for Chromatic testing
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [735342e9]
- Updated dependencies [95f5107a]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
  - @leafygreen-ui/lib@10.4.0
  - @leafygreen-ui/hooks@7.7.5
  - @leafygreen-ui/icon@11.17.0
  - @leafygreen-ui/tokens@2.1.1
  - @leafygreen-ui/typography@16.5.1

## 8.0.11

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x
- d2ce54e2f: Exports primary component props
- Updated dependencies [d2ce54e2f]
- Updated dependencies [75099c60b]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
  - @leafygreen-ui/hooks@7.7.4
  - @leafygreen-ui/icon@11.16.1
  - @leafygreen-ui/leafygreen-provider@3.1.3
  - @leafygreen-ui/lib@10.3.4
  - @leafygreen-ui/typography@16.5.0

## 8.0.10

### Patch Changes

- a3a52e131: Bumps to use new `useIdAllocator` hook
- Updated dependencies [614f7617d]
- Updated dependencies [a3a52e131]
- Updated dependencies [614f7617d]
  - @leafygreen-ui/icon@11.15.0
  - @leafygreen-ui/hooks@7.7.3

## 8.0.9

### Patch Changes

- 32b3d3146: Bumps to use new `useIdAllocator` hook
- 73cbbd02c: Uses fontWeight token from `@leafygreen-ui/tokens`
- Updated dependencies [73cbbd02c]
- Updated dependencies [83fc5b31b]
- Updated dependencies [9bcf8b925]
- Updated dependencies [8ece56980]
- Updated dependencies [32b3d3146]
- Updated dependencies [73cbbd02c]
  - @leafygreen-ui/tokens@2.1.0
  - @leafygreen-ui/icon@11.14.0
  - @leafygreen-ui/typography@16.4.0
  - @leafygreen-ui/hooks@7.7.2

## 8.0.8

### Patch Changes

- 55d33e435: Update to BaseFontSize prop control for .design live example
- Updated dependencies [55d33e435]
- Updated dependencies [07db42330]
- Updated dependencies [55d33e435]
- Updated dependencies [cf00160ec]
- Updated dependencies [111b680c5]
- Updated dependencies [77320a6b8]
  - @leafygreen-ui/lib@10.3.3
  - @leafygreen-ui/palette@4.0.4
  - @leafygreen-ui/typography@16.3.0
  - @leafygreen-ui/tokens@2.0.3

## 8.0.7

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/emotion@4.0.4
  - @leafygreen-ui/hooks@7.7.1
  - @leafygreen-ui/icon@11.13.1
  - @leafygreen-ui/leafygreen-provider@3.1.2
  - @leafygreen-ui/lib@10.3.2
  - @leafygreen-ui/palette@4.0.3
  - @leafygreen-ui/tokens@2.0.2
  - @leafygreen-ui/typography@16.2.1

## 8.0.6

### Patch Changes

- Updated dependencies [5b036515e]
- Updated dependencies [26e341a0b]
- Updated dependencies [997121cc3]
- Updated dependencies [eb0cc4498]
  - @leafygreen-ui/palette@4.0.0
  - @leafygreen-ui/lib@10.2.2
  - @leafygreen-ui/icon@11.12.5
  - @leafygreen-ui/typography@16.1.0
  - @leafygreen-ui/tokens@2.0.1

## 8.0.5

### Patch Changes

- 509f1b1d9: Label, Description, and Error respect baseFontSize prop
- fc7a1cadd: Storybook: Updates `Basic` story
- Updated dependencies [ffb99f417]
- Updated dependencies [bf2fedf6d]
- Updated dependencies [b7a29ea38]
  - @leafygreen-ui/hooks@7.5.0
  - @leafygreen-ui/leafygreen-provider@3.1.1
  - @leafygreen-ui/typography@16.0.1

## 8.0.4

### Patch Changes

- Updated dependencies [050f1f8a9]
- Updated dependencies [741cdd408]
- Updated dependencies [866144167]
- Updated dependencies [c82ed35d5]
- Updated dependencies [b24b21462]
  - @leafygreen-ui/icon@11.12.4
  - @leafygreen-ui/tokens@2.0.0
  - @leafygreen-ui/typography@16.0.0
  - @leafygreen-ui/palette@3.4.7

## 8.0.3

### Patch Changes

- 53d77f55d: Uses Error component from Typography package to handle formatting `errorMessage` prop
- Updated dependencies [405636249]
- Updated dependencies [53d77f55d]
  - @leafygreen-ui/hooks@7.4.0
  - @leafygreen-ui/typography@15.3.0

## 8.0.2

### Patch Changes

- a79ee7f5d: Remove `optional` from prop documentation, as the prop is not supported by the component
- Updated dependencies [d8c589d35]
- Updated dependencies [703db871f]
  - @leafygreen-ui/typography@15.2.1
  - @leafygreen-ui/palette@3.4.6

## 8.0.1

### Patch Changes

- a1d093f30: Resolves aria type issues
- ae5421cf6: Updates components to use internal transition tokens
- Updated dependencies [ae5421cf6]
- Updated dependencies [4b4c2d27d]
- Updated dependencies [6a266b813]
- Updated dependencies [1a335d0b2]
- Updated dependencies [ba97d1ef7]
- Updated dependencies [ae5421cf6]
  - @leafygreen-ui/tokens@1.4.0
  - @leafygreen-ui/icon@11.12.1
  - @leafygreen-ui/typography@15.1.0

## 8.0.0

### Patch Changes

- Updated dependencies [07b3c797]
- Updated dependencies [07b3c797]
- Updated dependencies [b9b09a86]
  - @leafygreen-ui/typography@15.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.0

## 7.0.1

### Patch Changes

- Updated dependencies [209f77ed]
- Updated dependencies [f2d63a60]
  - @leafygreen-ui/icon@11.12.0
  - @leafygreen-ui/lib@10.0.0
  - @leafygreen-ui/leafygreen-provider@3.0.1
  - @leafygreen-ui/typography@14.0.1

## 7.0.0

### Patch Changes

- Updated dependencies [e399f1b9]
- Updated dependencies [e399f1b9]
  - @leafygreen-ui/leafygreen-provider@3.0.0
  - @leafygreen-ui/typography@14.0.0

## 6.2.1

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.
- Updated dependencies [24683433]
  - @leafygreen-ui/emotion@4.0.3
  - @leafygreen-ui/hooks@7.3.3
  - @leafygreen-ui/icon@11.11.1
  - @leafygreen-ui/leafygreen-provider@2.3.5
  - @leafygreen-ui/lib@9.5.1
  - @leafygreen-ui/palette@3.4.4
  - @leafygreen-ui/tokens@1.3.4
  - @leafygreen-ui/typography@13.2.1

## 6.2.0

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
  - @leafygreen-ui/icon@11.11.0
  - @leafygreen-ui/typography@13.2.0
  - @leafygreen-ui/lib@9.5.0
  - @leafygreen-ui/emotion@4.0.2
  - @leafygreen-ui/hooks@7.3.2
  - @leafygreen-ui/leafygreen-provider@2.3.4
  - @leafygreen-ui/palette@3.4.3
  - @leafygreen-ui/tokens@1.3.3

## 6.1.2

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files
- Updated dependencies [e39d8469]
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/typography@13.1.2
  - @leafygreen-ui/emotion@4.0.1
  - @leafygreen-ui/hooks@7.3.1
  - @leafygreen-ui/interaction-ring@4.0.1
  - @leafygreen-ui/lib@9.4.2
  - @leafygreen-ui/palette@3.4.2
  - @leafygreen-ui/tokens@1.3.2

## 6.1.1

### Patch Changes

- 3dbc73ba: Update darkMode background-color to match figma designs

## 6.1.0

### Minor Changes

- 65c86281: Consuming darkMode from the LeafyGreenProvider if the darkMode prop is not set

### Patch Changes

- Updated dependencies [65c86281]
  - @leafygreen-ui/typography@13.1.0

## 6.0.2

### Patch Changes

- f4cacd36: Remove z-index from textarea
- Updated dependencies [13a4adcc]
  - @leafygreen-ui/typography@13.0.1

## 6.0.1

### Patch Changes

- Updated dependencies [85d46871]
- Updated dependencies [99e20bb9]
  - @leafygreen-ui/lib@9.4.0
  - @leafygreen-ui/interaction-ring@4.0.0
  - @leafygreen-ui/typography@13.0.0

## 6.0.0

### Major Changes

- f0a357e2: Updates `TextArea` for dark mode refresh. Remove `InteractionRing`.

### Patch Changes

- Updated dependencies [f0a357e2]
  - @leafygreen-ui/typography@12.0.0

## 5.1.1

### Patch Changes

- 96d1ff9c: Updates to propTypes, TSDocs, and Storybook controls
- Updated dependencies [6a89bc29]
- Updated dependencies [fd2f6de0]
- Updated dependencies [6792bc44]
- Updated dependencies [96d1ff9c]
- Updated dependencies [422dbfcd]
- Updated dependencies [9ff90d4b]
  - @leafygreen-ui/palette@3.4.0
  - @leafygreen-ui/hooks@7.3.0
  - @leafygreen-ui/tokens@1.3.1
  - @leafygreen-ui/typography@11.0.2
  - @leafygreen-ui/lib@9.3.0

## 5.1.0

### Minor Changes

- 671c110e: Updates TextArea font-size and line-height based on global baseFontSize setting in LeafygreenProvider.
  Adds an override `baseFontSize` prop to TextArea.
  Note: override prop will not affect `Label` or `Description` font sizes. (https://jira.mongodb.org/browse/PD-2018)

  Updates Dependency:

  - @leafygree-ui/typography@10.0.0

### Patch Changes

- Updated dependencies [909209c4]
  - @leafygreen-ui/typography@11.0.1

## 5.0.2

### Patch Changes

- Updated dependencies [e13d2487]
- Updated dependencies [c48e943e]
  - @leafygreen-ui/interaction-ring@3.0.0
  - @leafygreen-ui/tokens@1.3.0
  - @leafygreen-ui/typography@11.0.0

## 5.0.1

### Patch Changes

- Updated dependencies [233ac580]
- Updated dependencies [ba4aab15]
- Updated dependencies [ba4aab15]
- Updated dependencies [2cf1bc4a]
- Updated dependencies [679b6239]
- Updated dependencies [f3aad7e2]
  - @leafygreen-ui/tokens@1.2.0
  - @leafygreen-ui/typography@9.1.1
  - @leafygreen-ui/lib@9.2.1

## 5.0.0

### Major Changes

- 8457f92: Updates Text Area to match new visual brand refresh

### Patch Changes

- Updated dependencies [8457f92]
  - @leafygreen-ui/tokens@1.0.0
  - @leafygreen-ui/typography@9.0.0
  - @leafygreen-ui/interaction-ring@2.0.0
- Updated dependencies [cb54eef]
  - @leafygreen-ui/palette@3.3.1

## 4.1.1

### Patch Changes

- 548ca2c: Restores the ability to pass onBlur handlers while using the useValidation hook.

## 4.1.0

### Minor Changes

- d661688: Adds validation callback for TextArea and TextInput

### Patch Changes

- Updated dependencies [d661688]
- Updated dependencies [d661688]
  - @leafygreen-ui/lib@9.1.0
  - @leafygreen-ui/hooks@7.1.0

## 4.0.3

### Patch Changes

- fe542c15: Fixes a bug in TextInput & TextArea where the focus ring was not visible when using the mouse. Also adds functionality to InteractioRing to ignore keyboard context and use the default focus behavior.
- Updated dependencies [f6e5655a]
- Updated dependencies [f6e5655a]
- Updated dependencies [fe542c15]
- Updated dependencies [b8f03aa1]
  - @leafygreen-ui/emotion@4.0.0
  - @leafygreen-ui/palette@3.2.2
  - @leafygreen-ui/interaction-ring@1.1.0
  - @leafygreen-ui/lib@9.0.0
  - @leafygreen-ui/tokens@0.5.3
  - @leafygreen-ui/typography@8.0.4

## 4.0.2

### Patch Changes

- Updated dependencies [047c1930]
- Updated dependencies [047c1930]
  - @leafygreen-ui/lib@8.0.0
  - @leafygreen-ui/hooks@7.0.0
  - @leafygreen-ui/interaction-ring@1.0.4
  - @leafygreen-ui/tokens@0.5.2
  - @leafygreen-ui/typography@8.0.2

## 4.0.1

### Patch Changes

- @leafygreen-ui/typography@8.0.0

## 4.0.0

### Major Changes

- dbb07e8b: Textarea component now accepts forwarded refs

## 3.0.4

### Patch Changes

- 90321b36: Imports validateProps functions from `@leafygreen-ui/a11y` package.
- Updated dependencies [02417199]
- Updated dependencies [ab581f34]
- Updated dependencies [90321b36]
  - @leafygreen-ui/typography@7.6.0
  - @leafygreen-ui/palette@3.2.1
  - @leafygreen-ui/lib@7.0.0
  - @leafygreen-ui/interaction-ring@1.0.2
  - @leafygreen-ui/tokens@0.5.1

## 3.0.3

### Patch Changes

- d6829357: Removes outline from focus state, in favor of allowing our InteractionRing component to handle displaying focus.
  - @leafygreen-ui/typography@7.3.1

## 3.0.2

### Patch Changes

- 358a072e: Fixes visual regression where the border of inputs do not appear until text is entered
- Updated dependencies [fc18e572]
  - @leafygreen-ui/typography@7.3.0

## 3.0.1

### Patch Changes

- ee766843: Fixes bug where aria-labelledby prop was not appropriately applied to textarea element

## 3.0.0

### Major Changes

- 8b0ea602: Form-compatible components now display more visually consistent hover and focus states

### Patch Changes

- Updated dependencies [8b0ea602]
- Updated dependencies [8b0ea602]
  - @leafygreen-ui/interaction-ring@1.0.0
  - @leafygreen-ui/typography@7.2.0

## 2.0.0

### Major Changes

- 69354cdd: className prop is now spread on container `div` rather than `textarea` element

### Minor Changes

- 627333c2: `State` is now a named export from the package

### Patch Changes

- ee7923d3: Changes how we extend the types of HTMLElements, and standardizes how we document this across readmes
- Updated dependencies [ee7923d3]
  - @leafygreen-ui/lib@6.1.2

## 1.0.1

### Patch Changes

- 374430ea: Updates string color value to reference the same color from uiColors palette
- 9ee1d5fc: Updates `@leafygreen-ui/lib` dependency to the most recent major version
- Updated dependencies [c9a0d89f]
- Updated dependencies [9ee1d5fc]
  - @leafygreen-ui/palette@3.1.0
  - @leafygreen-ui/lib@6.1.1

## 1.0.0

### Major Changes

- 4ee17735: Initial release of TextArea component
