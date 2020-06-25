# @leafygreen-ui/tooltip

## 3.3.0

### Minor Changes

- 12bc8c3: Tooltip allows setting a portalClassName prop

### Patch Changes

- Updated dependencies [06fbf05]
  - @leafygreen-ui/popover@5.1.0

## 3.2.2

### Patch Changes

- 2a03117: Upgrades @testing-library/react to v10 and revises test suites to conform with new standards
- Updated dependencies [2a03117]
  - @leafygreen-ui/popover@5.0.1

## 3.2.1

### Patch Changes

- Updated dependencies [2176b77]
  - @leafygreen-ui/popover@5.0.0

## 3.2.0

### Minor Changes

- bc47b13: Added Justify.Fit to tooltip/popover, and Align.CenterHorizontal and Align.CenterVertical to popover

  For direct consumers of <Popover>, the function-as-a-child pattern now passes `align` and `justify` params,
  and the `justification` param/enum has been removed. This should be the only breaking change in this release.

### Patch Changes

- Updated dependencies [bc47b13]
- Updated dependencies [1b298cc]
  - @leafygreen-ui/popover@4.0.0
  - @leafygreen-ui/hooks@2.1.0

## 3.1.0

### Minor Changes

- ab1a1c1: Exposes `usePortal` prop

## 3.0.2

### Patch Changes

- ac5c473: Adds lodash as dependency
- Updated dependencies [ac5c473]
  - @leafygreen-ui/hooks@2.0.1

## 3.0.1

### Patch Changes

- fabc1c9: Conditionally enables `useEscapeKey` hook, to ensure that escapeKey events are not unintentionally blocked from propagating
- Updated dependencies [fabc1c9]
- Updated dependencies [232cf52]
  - @leafygreen-ui/lib@4.2.0
  - @leafygreen-ui/popover@3.0.2

## 3.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/hooks@2.0.0
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/palette@2.0.0
  - @leafygreen-ui/popover@3.0.0

## 2.0.2

### Patch Changes

- 13e3eab: Enables `trigger` prop to accept nested components
- Updated dependencies [319844d]
  - @leafygreen-ui/palette@1.1.1

## 2.0.1

### Patch Changes

- 50853ca: Upgrades dependencies

## 2.0.0

### Major Changes

- f6b6b7a: No longer renders Children of Poopover to the DOM when the Popover is closed

### Patch Changes

- 319fb82: Updates PropTypes based on eslint updates
- Updated dependencies [9c45cb4]
- Updated dependencies [f6b6b7a]
  - @leafygreen-ui/lib@3.1.0
  - @leafygreen-ui/popover@2.0.0

## 1.0.0

### Major Changes

- 12fb220: Initial implementation of Tooltip component

- Updated dependencies [12fb220]:
  - @leafygreen-ui/popover@1.2.0
