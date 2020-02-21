# @leafygreen-ui/side-nav

## 1.1.0

### Minor Changes

- 6eb9d26: This introduces the following updaters:
  - Lib is updated internally with shared test helpers
  - Side Nav is updated to match design standards, and to export width and side padding so that users can reference both in integrating the side nav without hardcoding these values and to future-proof design changes
  - Mongo Nav is updated with a disabled state for the Org Nav, used for pages where there is no concept of a current project or orgqnization. Additionally, Mongo Nav exports the different nav heights for the above reason

### Patch Changes

- Updated dependencies [6eb9d26]
  - @leafygreen-ui/lib@4.3.0

## 1.0.4

### Patch Changes

- 3a7bd19: Modified styles to avoid conflicts with pre-existing focus states of anchors

## 1.0.3

### Patch Changes

- d766d73: Adjust spacing in SideNav
- Updated dependencies [786ccf1]
- Updated dependencies [690888a]
  - @leafygreen-ui/menu@6.0.0

## 1.0.2

### Patch Changes

- Updated dependencies [fabc1c9]
- Updated dependencies [fabc1c9]
  - @leafygreen-ui/menu@5.1.0
  - @leafygreen-ui/lib@4.2.0

## 1.0.1

### Patch Changes

- 0eb010c: Improved handling of Aria roles in menu items, and increased label contrast for accessibility

## 1.0.0

### Major Changes

- 11b2217: Introduces the SideNav component. Adds enumerated aria-current values to lib for general use.

### Patch Changes

- Updated dependencies [11b2217]
- Updated dependencies [bd3bcd9]
  - @leafygreen-ui/lib@4.1.0
  - @leafygreen-ui/emotion@2.0.1
