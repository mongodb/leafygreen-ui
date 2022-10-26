# @leafygreen-ui/text-area

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
