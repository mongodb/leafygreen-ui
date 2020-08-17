# @leafygreen-ui/text-input

## 3.0.4

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/icon@6.3.2
  - @leafygreen-ui/leafygreen-provider@1.1.4
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/palette@2.0.2

## 3.0.3

### Patch Changes

- 6aadc0b: Make id generation deterministic using IdAllocator.create class. This improves the SSR compatibility of these components.
- Updated dependencies [6aadc0b]
- Updated dependencies [5ee2098]
  - @leafygreen-ui/lib@5.1.0
  - @leafygreen-ui/icon@6.3.1

## 3.0.2

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [d2136a0]
- Updated dependencies [a571361]
  - @leafygreen-ui/lib@5.0.0
  - @leafygreen-ui/icon@6.3.0
  - @leafygreen-ui/leafygreen-provider@1.1.2

## 3.0.1

### Patch Changes

- 5496ff4: Fix bug in input HTML such that aria-labelledby is correctly-cased

## 3.0.0

### Major Changes

- 89318bd: Conditionally renders label tag, such that when no `label` prop is supplied the tag is not on the DOM. If no `label` is provided `aria-labelledby` prop must be supplied.

## 2.0.0

### Major Changes

- 1d24966: Makes `@leafygreen-ui/leafygreen-provider` a peer dependency to ensure that components use hooks from the same version of the provider as what's installed.

## 1.1.2

### Patch Changes

- 1d86d56: Imports Glyphs directly, rather than importing the entire Icon package, when Glyph components are used
- Updated dependencies [1d86d56]
  - @leafygreen-ui/icon@6.1.0

## 1.1.1

### Patch Changes

- Updated dependencies [6fc022e]
  - @leafygreen-ui/icon@6.0.0

## 1.1.0

### Minor Changes

- 2c956d1: Allows consumer to set `type` attribute on input component

### Patch Changes

- Updated dependencies [2fc4ef9]
- Updated dependencies [e857861]
- Updated dependencies [cf6167e]
  - @leafygreen-ui/icon@5.2.0

## 1.0.4

### Patch Changes

- 2a03117: Upgrades @testing-library/react to v10 and revises test suites to conform with new standards
- Updated dependencies [2a03117]
- Updated dependencies [c812eb3]
  - @leafygreen-ui/leafygreen-provider@1.1.1
  - @leafygreen-ui/icon@5.1.0

## 1.0.3

### Patch Changes

- 1b298cc: Fix TextInput TypeScript interface.

## 1.0.2

### Patch Changes

- Updated dependencies [4c268a5]
- Updated dependencies [94ed125]
  - @leafygreen-ui/icon@5.0.0
  - @leafygreen-ui/leafygreen-provider@1.1.0

## 1.0.1

### Patch Changes

- 62455d4: Switches devDependencies to dependencies in package.json

## 1.0.0

### Major Changes

- 5f08f87: Initial release of TextInput component

### Patch Changes

- Updated dependencies [704e25c]
  - @leafygreen-ui/lib@4.3.1
