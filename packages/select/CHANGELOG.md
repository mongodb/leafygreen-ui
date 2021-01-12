# @leafygreen-ui/select

## 1.1.0

### Minor Changes

- 102ebc1e: - Adds a `usePortal` prop
  - Explicitly defines `font-family` for text elements within component
  - Sets label and description display properties to `block`

### Patch Changes

- 9812c9c9: Fixes bug where when a non-centered `Option` is clicked, the component will scroll to center that element instead of being selected.
  Now, when an element is clicked, it becomes selected. When opening the dropdown later, the selected item should then be centered.
- Updated dependencies [2daf1808]
- Updated dependencies [a6360ea1]
  - @leafygreen-ui/icon@7.1.0
  - @leafygreen-ui/popover@7.1.1

## 1.0.0

### Major Changes

- 0963164a: Initial release of Select component
