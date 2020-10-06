# @leafygreen-ui/toggle

## 5.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/lib@6.0.0
  - @leafygreen-ui/palette@3.0.0

## 4.1.1

### Patch Changes

- 6e210765: The tooltip's notch now appears at more appropriate positions for smaller trigger elements.

## 4.1.0

### Minor Changes

- 24af55cc: Addresses issue where Toggle caused scrollbars to appear in certain environments. This should no longer happen by default; however, if the focus state still causes the scrollbars to appear, this version adds an export, `interactionRingSize`, which is a value that can be applied to the margin of the container wrapping Toggle, and in turn prevent the focus state from overflowing.

## 4.0.0

### Major Changes

- b863e502: Refactors Toggle from class-based to functional component, and deprecates `variant` in favor of new `darkMode` prop to control whether or not the component appears in dark mode

## 3.0.4

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/palette@2.0.2

## 3.0.3

### Patch Changes

- 6aadc0b: Make id generation deterministic using IdAllocator.create class. This improves the SSR compatibility of these components.
- Updated dependencies [6aadc0b]
  - @leafygreen-ui/lib@5.1.0

## 3.0.2

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [a571361]
  - @leafygreen-ui/lib@5.0.0

## 3.0.1

### Patch Changes

- 2a03117: Upgrades @testing-library/react to v10 and revises test suites to conform with new standards

## 3.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/palette@2.0.0

## 2.1.8

### Patch Changes

- 0868af7: Updates Toggle to new utilize new palette

## 2.1.7

### Patch Changes

- 4de039a: Further accessibility updates to make component compliant with a11y standards
