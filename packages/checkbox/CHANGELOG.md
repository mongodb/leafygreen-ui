# @leafygreen-ui/checkbox

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
