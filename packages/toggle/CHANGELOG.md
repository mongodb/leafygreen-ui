# @leafygreen-ui/toggle

## 8.0.6

### Patch Changes

- @leafygreen-ui/interaction-ring@5.0.0

## 8.0.5

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.
- Updated dependencies [24683433]
  - @leafygreen-ui/a11y@1.3.3
  - @leafygreen-ui/emotion@4.0.3
  - @leafygreen-ui/icon@11.11.1
  - @leafygreen-ui/interaction-ring@4.0.3
  - @leafygreen-ui/lib@9.5.1
  - @leafygreen-ui/palette@3.4.4

## 8.0.4

### Patch Changes

- 3690df49: Updates `tsdoc.json` file
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
  - @leafygreen-ui/icon@11.11.0
  - @leafygreen-ui/lib@9.5.0
  - @leafygreen-ui/a11y@1.3.2
  - @leafygreen-ui/emotion@4.0.2
  - @leafygreen-ui/interaction-ring@4.0.2
  - @leafygreen-ui/palette@3.4.3

## 8.0.3

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files
- Updated dependencies [7caa1c3e]
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/icon@11.10.2
  - @leafygreen-ui/a11y@1.3.1
  - @leafygreen-ui/interaction-ring@4.0.1
  - @leafygreen-ui/lib@9.4.2
  - @leafygreen-ui/palette@3.4.2

## 8.0.2

### Patch Changes

- Updated dependencies [85d46871]
- Updated dependencies [99e20bb9]
  - @leafygreen-ui/lib@9.4.0
  - @leafygreen-ui/interaction-ring@4.0.0

## 8.0.1

### Patch Changes

- Updated dependencies [e13d2487]
- Updated dependencies [500d6c60]
  - @leafygreen-ui/interaction-ring@3.0.0
  - @leafygreen-ui/icon@11.9.0

## 8.0.0

### Major Changes

- 532986a: Updates toggle styles in line with visual brand refresh.

### Patch Changes

- Updated dependencies [532986a]
  - @leafygreen-ui/interaction-ring@2.0.0

## 7.0.5

### Patch Changes

- 70f3c2c: Add type="button" to Toggle button element

## 7.0.4

### Patch Changes

- Updated dependencies [f6e5655a]
- Updated dependencies [fe542c15]
- Updated dependencies [b8f03aa1]
  - @leafygreen-ui/palette@3.2.2
  - @leafygreen-ui/interaction-ring@1.1.0
  - @leafygreen-ui/lib@9.0.0
  - @leafygreen-ui/a11y@1.2.2

## 7.0.3

### Patch Changes

- Updated dependencies [047c1930]
  - @leafygreen-ui/lib@8.0.0
  - @leafygreen-ui/a11y@1.2.1
  - @leafygreen-ui/interaction-ring@1.0.4

## 7.0.2

### Patch Changes

- 90321b36: Imports validateProps functions from `@leafygreen-ui/a11y` package.
- Updated dependencies [90321b36]
- Updated dependencies [ab581f34]
- Updated dependencies [90321b36]
  - @leafygreen-ui/a11y@1.2.0
  - @leafygreen-ui/palette@3.2.1
  - @leafygreen-ui/lib@7.0.0
  - @leafygreen-ui/interaction-ring@1.0.2

## 7.0.1

### Patch Changes

- d6829357: Fixes implementation of Toggle to call onChange with the proper checked value depending on whether or not the component is controlled.

## 7.0.0

### Major Changes

- 7df69248: Refactors the Toggle component to resolve bugs, improve maintainability, and improve accessibility for sighted and non-sighted users.

  - Refactors the internal DOM structure of the component to be as accessible as possible, and uses the appropriate role.
  - Restructures how the styles are structured in the component to improve maintainability.
  - Slightly increases contrast of the "ON" and "OFF" labels in the default size to meet WCAG AA contrast guidelines.
  - Hides the "ON" and "OFF" labels for screen readers so that only the current state of the Toggle is read.
  - Enforces use of `aria-label` and `aria-labelledby` so that Toggles always have screen reader accessible text associated with them.
  - Fixes a bug with the rendering of the focus state on Windows machines.
  - Uses the LeafyGreen Provider to conditionally show the focus state based on how the user is interacting with the page.

  Please read our [upgrade guide](https://github.com/mongodb/leafygreen-ui/blob/main/packages/toggle/UPGRADE.md) for more information on these changes.

### Patch Changes

- Updated dependencies [7df69248]
  - @leafygreen-ui/lib@6.2.0

## 6.0.0

### Major Changes

- 8b0ea602: Removed `interactionRingSize` prop. Previously the interaction ring could cause the toggle to overflow its container. Since the interaction ring is now based on box-shadows, this should no longer be necessary.
- 8b0ea602: Form-compatible components now display more visually consistent hover and focus states

### Patch Changes

- Updated dependencies [8b0ea602]
  - @leafygreen-ui/interaction-ring@1.0.0

## 5.0.2

### Patch Changes

- ee7923d3: Changes how we extend the types of HTMLElements, and standardizes how we document this across readmes
- Updated dependencies [ee7923d3]
  - @leafygreen-ui/lib@6.1.2

## 5.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
  - @leafygreen-ui/lib@6.0.1
  - @leafygreen-ui/palette@3.0.1

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
