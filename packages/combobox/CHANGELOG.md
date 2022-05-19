# @leafygreen-ui/combobox

## 1.1.0

### Minor Changes

- e9c39305: - Reduces `min-width` of combobox down to `24px`

### Patch Changes

- a526ac52: Adds `@leafygreen-ui/tokens` and `@leafygreen-ui/tooltip` to dependencies
- e9c39305: - Updates highlighting function to fix a bug where some text would be duplicated
  - Fixes left padding when `overflow="scroll-x"`
  - Clarifies wording for `initialValue` prop docs
- Updated dependencies [e630a889]
- Updated dependencies [2670e4db]
- Updated dependencies [6c12e85a]
  - @leafygreen-ui/checkbox@8.0.2
  - @leafygreen-ui/icon@11.10.0

## 1.0.3

### Patch Changes

- Updated dependencies [e13d2487]
- Updated dependencies [500d6c60]
  - @leafygreen-ui/checkbox@8.0.0
  - @leafygreen-ui/icon-button@11.0.0
  - @leafygreen-ui/popover@8.0.0
  - @leafygreen-ui/interaction-ring@3.0.0
  - @leafygreen-ui/icon@11.9.0
  - @leafygreen-ui/typography@11.0.0

## 1.0.2

### Patch Changes

- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
  - @leafygreen-ui/lib@9.2.0
  - @leafygreen-ui/icon@11.8.0
  - @leafygreen-ui/checkbox@7.0.0
  - @leafygreen-ui/palette@3.3.2

## 1.0.1

### Patch Changes

- e8f1a97: - Updates focus behavior, allowing users to re-open the menu with the mouse after making a selection
  - Adds a warning if `multiselect` and `value` props don't align
  - Fixes a bug where long display names would get truncated early
  - Fixes a bug where the space bar wouldn't type a space character
  - Fixes a bug where some characters could not be typed when a `value` prop was passed in
  - Updates hooks dependency to `^7.2.0`
- Updated dependencies [e8f1a97]
  - @leafygreen-ui/icon@11.7.0
  - @leafygreen-ui/icon-button@10.0.0

## 1.0.0

### Major Changes

- 548ca2c: - Release Combobox as v1
  - Adds standard popover props: `usePortal`, `popoverZIndex`, `popoverClassName`, `portalContainer`, and `scrollContainer`.
  - Fixes issue where clicking on elements within a Combobox option wouldn't select that option.
