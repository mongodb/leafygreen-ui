# @leafygreen-ui/checkbox

## 12.0.2

### Patch Changes

- 38181cc1d: Update to consume darkMode from `useDarkMode`. Some components were setting `darkMode = false` as a default which would override the default value provided by the `LeafyGreenProvider`.

## 12.0.1

### Patch Changes

- ae5421cf6: Updates components to use internal transition tokens
- Updated dependencies [ae5421cf6]
- Updated dependencies [6a266b813]
- Updated dependencies [ba97d1ef7]
- Updated dependencies [ae5421cf6]
  - @leafygreen-ui/tokens@1.4.0
  - @leafygreen-ui/typography@15.1.0

## 12.0.0

### Patch Changes

- Updated dependencies [07b3c797]
- Updated dependencies [07b3c797]
- Updated dependencies [b9b09a86]
  - @leafygreen-ui/typography@15.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.0

## 11.0.1

### Patch Changes

- Updated dependencies [f2d63a60]
  - @leafygreen-ui/lib@10.0.0
  - @leafygreen-ui/a11y@1.3.4
  - @leafygreen-ui/leafygreen-provider@3.0.1
  - @leafygreen-ui/typography@14.0.1

## 11.0.0

### Patch Changes

- Updated dependencies [e399f1b9]
- Updated dependencies [e399f1b9]
  - @leafygreen-ui/leafygreen-provider@3.0.0
  - @leafygreen-ui/typography@14.0.0

## 10.1.1

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.
- Updated dependencies [24683433]
  - @leafygreen-ui/a11y@1.3.3
  - @leafygreen-ui/emotion@4.0.3
  - @leafygreen-ui/hooks@7.3.3
  - @leafygreen-ui/leafygreen-provider@2.3.5
  - @leafygreen-ui/lib@9.5.1
  - @leafygreen-ui/tokens@1.3.4
  - @leafygreen-ui/typography@13.2.1

## 10.1.0

### Minor Changes

- 3690df49: Updates TypeScript annotations, type structures and export format of some components

### Patch Changes

- 3690df49: Updates Storybook configs
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [58a5a05e]
  - @leafygreen-ui/typography@13.2.0
  - @leafygreen-ui/lib@9.5.0
  - @leafygreen-ui/a11y@1.3.2
  - @leafygreen-ui/emotion@4.0.2
  - @leafygreen-ui/hooks@7.3.2
  - @leafygreen-ui/leafygreen-provider@2.3.4
  - @leafygreen-ui/tokens@1.3.3

## 10.0.4

### Patch Changes

- 6e1c365e: Add disabled cursor to label text when disabled

## 10.0.3

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files
- Updated dependencies [e39d8469]
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/typography@13.1.2
  - @leafygreen-ui/a11y@1.3.1
  - @leafygreen-ui/emotion@4.0.1
  - @leafygreen-ui/hooks@7.3.1
  - @leafygreen-ui/leafygreen-provider@2.3.3
  - @leafygreen-ui/lib@9.4.2
  - @leafygreen-ui/tokens@1.3.2

## 10.0.2

### Patch Changes

- 3b6cf88b: Update darkMode disabled text color to match figma designs

## 10.0.1

### Patch Changes

- 19a62173: Adding some missing dependencies,`@leafygreen-ui/a11y` and `@leafygreen-ui/emotion`

## 10.0.0

### Major Changes

- 9dafe83a: Updates Checkbox Dark Mode for brand refresh

### Minor Changes

- bac1e809: Restores `bold` prop. If left `undefined` this prop will default to `true` if a description is provided, otherwise defaults to `false`

### Patch Changes

- bac1e809: Improves ripple animation on checkbox click
- Updated dependencies [65c86281]
  - @leafygreen-ui/typography@13.1.0

## 9.0.0

### Patch Changes

- Updated dependencies [85d46871]
- Updated dependencies [99e20bb9]
  - @leafygreen-ui/lib@9.4.0
  - @leafygreen-ui/leafygreen-provider@2.3.0
  - @leafygreen-ui/typography@13.0.0

## 8.0.3

### Patch Changes

- 1356d50d: Fix to center dark mode checkbox regardless of lineheight and fix to center indeterminate checkbox in light mode.
- fd2f6de0: Updates to TSDocs, PropTypes, and Storybook files
- 96d1ff9c: Updates to propTypes, TSDocs, and Storybook controls
- Updated dependencies [6792bc44]
- Updated dependencies [96d1ff9c]
- Updated dependencies [422dbfcd]
  - @leafygreen-ui/hooks@7.3.0
  - @leafygreen-ui/tokens@1.3.1
  - @leafygreen-ui/typography@11.0.2
  - @leafygreen-ui/lib@9.3.0

## 8.0.2

### Patch Changes

- e630a889: Add react-transition-group as a dependency
- 6c12e85a: Update the alignment of the label when there are multiple lines

## 8.0.1

### Patch Changes

- 1fb8ab18: Creates a new stacking context for the Checkbox component
- Updated dependencies [909209c4]
  - @leafygreen-ui/typography@11.0.1

## 8.0.0

### Major Changes

- e13d2487: Moving leafygreen-provider to peerDependencies.
- Updated dependencies [5f28fce1]
  - @leafygreen-ui/leafygreen-provider@2.2.0

### Patch Changes

- Updated dependencies [5f28fce1]
  - @leafygreen-ui/typography@11.0.0

## 7.0.1

### Patch Changes

- Updated dependencies [ba4aab15]
- Updated dependencies [2cf1bc4a]
- Updated dependencies [679b6239]
- Updated dependencies [f3aad7e2]
  - @leafygreen-ui/typography@9.1.1
  - @leafygreen-ui/lib@9.2.1

## 7.0.0

### Major Changes

- acd6919: Updates checkbox for visual brand refresh
  - Updates default `animate` value to `true`
  - Adds `description` prop
  - Adds support for `aria-label` and `aria-labelledby`
  - Currently disregarding `bold` prop, and the label will always be bold. This will be updated in a future update to the `Label` component

### Patch Changes

- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
  - @leafygreen-ui/lib@9.2.0

## 6.0.6

### Patch Changes

- Updated dependencies [b8f03aa1]
  - @leafygreen-ui/lib@9.0.0

## 6.0.5

### Patch Changes

- bed50770: Fixes broken Checkbox logic, where any value supplied to the `indeterminate` prop was overwritting `checked` prop

## 6.0.4

### Patch Changes

- Updated dependencies [047c1930]
- Updated dependencies [047c1930]
  - @leafygreen-ui/lib@8.0.0
  - @leafygreen-ui/hooks@7.0.0

## 6.0.3

### Patch Changes

- Updated dependencies [90321b36]
  - @leafygreen-ui/lib@7.0.0

## 6.0.2

### Patch Changes

- ee7923d3: Changes how we extend the types of HTMLElements, and standardizes how we document this across readmes
- Updated dependencies [ee7923d3]
  - @leafygreen-ui/lib@6.1.2

## 6.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
  - @leafygreen-ui/lib@6.0.1

## 6.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/lib@6.0.0
  - @leafygreen-ui/palette@3.0.0

## 5.0.0

### Major Changes

- 02ee0c05: Deprecates `variant` prop and adds `darkMode` prop to determine whether or not Checkbox appears in dark mode.

## 4.1.1

### Patch Changes

- 463a338: Fixes 'aria-checked' value when Checkbox is indeterminate such that the value is `mixed` rather than `false` per WAI-ARIA spec

## 4.1.0

### Minor Changes

- 7605c17: Add prop to disable animations

## 4.0.4

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/theme@2.0.1

## 4.0.3

### Patch Changes

- 6aadc0b: Make id generation deterministic using IdAllocator.create class. This improves the SSR compatibility of these components.
- Updated dependencies [6aadc0b]
  - @leafygreen-ui/lib@5.1.0

## 4.0.2

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [a571361]
  - @leafygreen-ui/lib@5.0.0

## 4.0.1

### Patch Changes

- 2a03117: Upgrades @testing-library/react to v10 and revises test suites to conform with new standards

## 4.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/theme@2.0.0

## 3.2.1

### Patch Changes

- 4de039a: Makes component compliant with a11y standards

## 3.2.0

### Minor Changes

- 8f568bf: Adds a disabled + checked state to checkbox.

### Patch Changes

- 55f904f: Positions input inside the boundary of parent label
