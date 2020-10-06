# @leafygreen-ui/icon-button

## 8.0.2

### Patch Changes

- Updated dependencies [65d5ed4d]
  - @leafygreen-ui/icon@6.7.0

## 8.0.1

### Patch Changes

- Updated dependencies [001a277f]
  - @leafygreen-ui/icon@6.6.1

## 8.0.0

### Major Changes

- a84219f1: Deprecates `variant` in favor of new `darkMode` prop, which determines if the component should be rendered in `darkMode`

## 7.0.6

### Patch Changes

- Updated dependencies [6883ccd0]
  - @leafygreen-ui/icon@6.6.0

## 7.0.5

### Patch Changes

- Updated dependencies [e49d66b]
  - @leafygreen-ui/icon@6.5.0

## 7.0.4

### Patch Changes

- Updated dependencies [43d47db]
  - @leafygreen-ui/icon@6.4.2

## 7.0.3

### Patch Changes

- Updated dependencies [b80379a]
  - @leafygreen-ui/icon@6.4.1

## 7.0.2

### Patch Changes

- Updated dependencies [699a65c]
  - @leafygreen-ui/icon@6.4.0

## 7.0.1

### Patch Changes

- 463a338: Adds `flex-shrink` property to IconButton

## 7.0.0

### Major Changes

- ab4c074: Removed redundant aria-label from the icon that is already on the button

## 6.1.4

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/emotion@2.0.2
  - @leafygreen-ui/icon@6.3.2
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/palette@2.0.2

## 6.1.3

### Patch Changes

- Updated dependencies [6aadc0b]
- Updated dependencies [5ee2098]
  - @leafygreen-ui/lib@5.1.0
  - @leafygreen-ui/icon@6.3.1

## 6.1.2

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [d2136a0]
- Updated dependencies [a571361]
  - @leafygreen-ui/lib@5.0.0
  - @leafygreen-ui/icon@6.3.0

## 6.1.1

### Patch Changes

- Updated dependencies [4873650]
  - @leafygreen-ui/icon@6.2.0

## 6.1.0

### Minor Changes

- 27f8ea1: Adds `aria-label` to LeafyGreen icons and glyphs

### Patch Changes

- Updated dependencies [083eec3]
- Updated dependencies [27f8ea1]
  - @leafygreen-ui/lib@4.5.1
  - @leafygreen-ui/icon@6.1.2

## 6.0.1

### Patch Changes

- Updated dependencies [eba8391]
  - @leafygreen-ui/icon@6.1.1

## 6.0.0

### Major Changes

- 1d86d56: Uses new `isGlyph` property from Glyph component to determine if IconButton child is a Glyph

### Patch Changes

- Updated dependencies [1d86d56]
  - @leafygreen-ui/icon@6.1.0

## 5.0.5

### Patch Changes

- Updated dependencies [e83e4ed]
  - @leafygreen-ui/icon@6.0.1

## 5.0.4

### Patch Changes

- Updated dependencies [6fc022e]
  - @leafygreen-ui/icon@6.0.0

## 5.0.3

### Patch Changes

- Updated dependencies [2fc4ef9]
- Updated dependencies [e857861]
- Updated dependencies [cf6167e]
  - @leafygreen-ui/icon@5.2.0

## 5.0.2

### Patch Changes

- 2a03117: Upgrades @testing-library/react to v10 and revises test suites to conform with new standards
- Updated dependencies [c812eb3]
  - @leafygreen-ui/icon@5.1.0

## 5.0.1

### Patch Changes

- Updated dependencies [75c0693]
  - @leafygreen-ui/icon@5.0.3
  - @leafygreen-ui/palette@2.0.1

## 5.0.0

### Major Changes

- 5aafd72: IconButton now accepts `aria-label` instead of `ariaLabel`
  When an Icon is a child of IconButton, the Icon's title will be unset unless explicitly set on Icon, and its size will be inherited from IconButton unless its explicitly set.
  Previously, IconButton required that `ariaLabel` exists as a prop to IconButton. Now IconButton is more flexible, and requires that one of `aria-label` or `aria-labelledby` are set.

### Patch Changes

- Updated dependencies [5aafd72]
- Updated dependencies [5aafd72]
  - @leafygreen-ui/icon@5.0.2
  - @leafygreen-ui/lib@4.4.1

## 4.1.6

### Patch Changes

- Updated dependencies [365412e]
  - @leafygreen-ui/icon@5.0.1

## 4.1.5

### Patch Changes

- Updated dependencies [4c268a5]
  - @leafygreen-ui/icon@5.0.0

## 4.1.4

### Patch Changes

- Updated dependencies [e1568c6]
  - @leafygreen-ui/icon@4.3.0

## 4.1.3

### Patch Changes

- Updated dependencies [a2948f6]
  - @leafygreen-ui/icon@4.2.0

## 4.1.2

### Patch Changes

- Updated dependencies [71327dd]
  - @leafygreen-ui/icon@4.1.0

## 4.1.1

### Patch Changes

- 347bcf6:

  - Adds default background-color for cross-browser compatability
  - Removes ability of IconButton components to be focusbale when disabled

- Updated dependencies [704e25c]
  - @leafygreen-ui/lib@4.3.1

## 4.1.0

### Minor Changes

- 0bfe2ad: Adds `active` prop to IconButton component

## 4.0.0

### Major Changes

- fabc1c9: Wraps component with `React.forwardRef` to provide direct access to the underlying element

### Minor Changes

- 0a75bd6: Adds optional `size` prop to IconButton component to be compatible with `default`, `large` and `xlarge` size variants of Icon component

### Patch Changes

- Updated dependencies [0a75bd6]
- Updated dependencies [fabc1c9]
  - @leafygreen-ui/icon@4.0.0
  - @leafygreen-ui/lib@4.2.0

## 3.0.1

### Patch Changes

- Updated dependencies [11b2217]
- Updated dependencies [bd3bcd9]
- Updated dependencies [8fd107a]
  - @leafygreen-ui/lib@4.1.0
  - @leafygreen-ui/emotion@2.0.1
  - @leafygreen-ui/icon@3.0.1

## 3.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/emotion@2.0.0
  - @leafygreen-ui/icon@3.0.0
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/palette@2.0.0

## 2.0.1

### Patch Changes

- e19a757: Fix Typescript bugs with `onClick` handling

## 2.0.0

### Major Changes

- 337cab4: Enforce use of `ariaLabel` prop, which is passed to `aria-label` attribute and ensures accessibility

## 1.0.0

### Major Changes

- 6b42e6d: Initial implementation of IconButton component

### Patch Changes

- Updated dependencies [319844d]
  - @leafygreen-ui/palette@1.1.1
