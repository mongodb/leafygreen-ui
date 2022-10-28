# @leafygreen-ui/radio-group

## 8.1.2

### Patch Changes

- @leafygreen-ui/interaction-ring@5.0.0

## 8.1.1

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.
- Updated dependencies [24683433]
  - @leafygreen-ui/emotion@4.0.3
  - @leafygreen-ui/hooks@7.3.3
  - @leafygreen-ui/interaction-ring@4.0.3
  - @leafygreen-ui/lib@9.5.1
  - @leafygreen-ui/palette@3.4.4
  - @leafygreen-ui/tokens@1.3.4

## 8.1.0

### Minor Changes

- 3690df49: Updates TypeScript annotations, type structures and export format of some components

### Patch Changes

- 3690df49: Updates Storybook configs
- 3690df49: Spreads `...rest` on root element
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
  - @leafygreen-ui/lib@9.5.0
  - @leafygreen-ui/emotion@4.0.2
  - @leafygreen-ui/hooks@7.3.2
  - @leafygreen-ui/interaction-ring@4.0.2
  - @leafygreen-ui/palette@3.4.3
  - @leafygreen-ui/tokens@1.3.3

## 8.0.4

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/hooks@7.3.1
  - @leafygreen-ui/interaction-ring@4.0.1
  - @leafygreen-ui/lib@9.4.2
  - @leafygreen-ui/palette@3.4.2

## 8.0.3

### Patch Changes

- Updated dependencies [85d46871]
- Updated dependencies [99e20bb9]
  - @leafygreen-ui/lib@9.4.0
  - @leafygreen-ui/interaction-ring@4.0.0

## 8.0.2

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
  - @leafygreen-ui/lib@9.3.0

## 8.0.1

### Patch Changes

- Updated dependencies [e13d2487]
  - @leafygreen-ui/interaction-ring@3.0.0

## 8.0.0

### Major Changes

- 532986a: Updates radio group styles in line with visual brand refresh.

### Patch Changes

- Updated dependencies [532986a]
  - @leafygreen-ui/interaction-ring@2.0.0

## 7.0.6

### Patch Changes

- 6041b89b: Adds @leafygreen-ui/hooks to dependency list

## 7.0.5

### Patch Changes

- Updated dependencies [f6e5655a]
- Updated dependencies [fe542c15]
- Updated dependencies [b8f03aa1]
  - @leafygreen-ui/palette@3.2.2
  - @leafygreen-ui/interaction-ring@1.1.0
  - @leafygreen-ui/lib@9.0.0

## 7.0.4

### Patch Changes

- Updated dependencies [047c1930]
  - @leafygreen-ui/lib@8.0.0
  - @leafygreen-ui/interaction-ring@1.0.4

## 7.0.3

### Patch Changes

- 73b0ad00: Adds 'xsmall' size variant to valid array of PropType values for `size` prop

## 7.0.2

### Patch Changes

- Updated dependencies [ab581f34]
- Updated dependencies [90321b36]
  - @leafygreen-ui/palette@3.2.1
  - @leafygreen-ui/lib@7.0.0
  - @leafygreen-ui/interaction-ring@1.0.2

## 7.0.1

### Patch Changes

- 03acbf6e: Sets `cursor:pointer` on Radio labels that are not disabled

## 7.0.0

### Major Changes

- 8b0ea602: Form-compatible components now display more visually consistent hover and focus states

### Patch Changes

- Updated dependencies [8b0ea602]
  - @leafygreen-ui/interaction-ring@1.0.0

## 6.0.3

### Patch Changes

- ee7923d3: Changes how we extend the types of HTMLElements, and standardizes how we document this across readmes
- Updated dependencies [ee7923d3]
  - @leafygreen-ui/lib@6.1.2

## 6.0.2

### Patch Changes

- 374430ea: Updates string color value to reference the same color from uiColors palette
- Updated dependencies [c9a0d89f]
- Updated dependencies [9ee1d5fc]
  - @leafygreen-ui/palette@3.1.0
  - @leafygreen-ui/lib@6.1.1

## 6.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
  - @leafygreen-ui/lib@6.0.1
  - @leafygreen-ui/palette@3.0.1

## 6.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/lib@6.0.0
  - @leafygreen-ui/palette@3.0.0

## 5.1.0

### Minor Changes

- cb12b399: Adds `xsmall` size for Charts

## 5.0.0

### Major Changes

- 1f7e9132: Deprecates `variant` prop in favor of `darkMode` prop to control whether or not the component appears in dark mode

## 4.0.3

### Patch Changes

- 6b0d0a2: Made some props optional that were previously required

## 4.0.2

### Patch Changes

- add8745: Make id generation deterministic using IdAllocator.create class. This improves SSR compatibility.

## 4.0.1

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/palette@2.0.2

## 4.0.0

### Major Changes

- ea20761: Implements redesign for RadioGroup component, which includes changes to the DOM structure

### Patch Changes

- 6aadc0b: Make id generation deterministic using IdAllocator.create class. This improves the SSR compatibility of these components.
- Updated dependencies [6aadc0b]
  - @leafygreen-ui/lib@5.1.0

## 3.0.1

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [a571361]
  - @leafygreen-ui/lib@5.0.0

## 3.0.0

### Major Changes

- 823b057: Radio components no longer add className to both label and input element. Instead, the className is only applied to the label element.

## 2.0.1

### Patch Changes

- 2a03117: Upgrades @testing-library/react to v10 and revises test suites to conform with new standards

## 2.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/theme@2.0.0

## 1.3.4

### Patch Changes

- 7a4e32e: Updates label text adjacent to a disabled Checkbox, such that the cursor changes to 'not-allowed'
- ef114e6: Adds group role to RadioGroup container div and supplied aria-label to ensure component is accessible
