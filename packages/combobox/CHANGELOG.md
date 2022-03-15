# @leafygreen-ui/combobox

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
