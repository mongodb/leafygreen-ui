# @leafygreen-ui/checkbox

## 8.0.0

### Major Changes

- e13d2487: Moving leafygreen-provider to peerDependencies.

### Patch Changes

- Updated dependencies [5f28fce1]
  - @leafygreen-ui/leafygreen-provider@2.2.0
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
