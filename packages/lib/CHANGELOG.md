# @leafygreen-ui/lib

## 5.1.1

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/emotion@2.0.2

## 5.1.0

### Minor Changes

- 6aadc0b: Make id generation deterministic using IdAllocator.create class. This improves the SSR compatibility of these components.

## 5.0.0

### Major Changes

- 1aa26ee: Remove unnecessary testHelpers types

### Minor Changes

- a571361: Adds typeIs.array type guard method

### Patch Changes

- 2eba736: Remove testing library dependency

## 4.5.1

### Patch Changes

- 083eec3: Restore TS <3.8 compatibility that was broken from using the `import type` syntax.

## 4.5.0

### Minor Changes

- 1c797b3: Adds `OneOf` type helper

## 4.4.1

### Patch Changes

- 5aafd72: Adds Either utility type to lib

## 4.4.0

### Minor Changes

- da540d3: Adds RecursivePartial utility type to lib

## 4.3.1

### Patch Changes

- 704e25c: Adds missing testing library dependency

## 4.3.0

### Minor Changes

- 6eb9d26: Adds shared test helpers

## 4.2.0

### Minor Changes

- fabc1c9: `isComponentType` function now types the returned element more specifically, rather than just as `React.ReactElement`

## 4.1.0

### Minor Changes

- 11b2217: Adds enumerated `aria-current` values to lib for general use

### Patch Changes

- Updated dependencies [bd3bcd9]
  - @leafygreen-ui/emotion@2.0.1

## 4.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/emotion@2.0.0

## 3.2.0

### Minor Changes

- 2f9a300: Add `keyMap` to lib

## 3.1.0

### Minor Changes

- 9c45cb4: Add `isComponentType` function
