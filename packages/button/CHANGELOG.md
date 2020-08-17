# @leafygreen-ui/button

## 6.0.2

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/box@2.1.3
  - @leafygreen-ui/icon@6.3.2
  - @leafygreen-ui/leafygreen-provider@1.1.4
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/palette@2.0.2

## 6.0.1

### Patch Changes

- f6e84ec: Fix type signature to not have `children` be a required prop

## 6.0.0

### Major Changes

- a571361: Updates Button CSS padding and flex properties for the span that wraps children.

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [d2136a0]
- Updated dependencies [a571361]
  - @leafygreen-ui/lib@5.0.0
  - @leafygreen-ui/icon@6.3.0
  - @leafygreen-ui/box@2.1.2
  - @leafygreen-ui/leafygreen-provider@1.1.2

## 5.0.2

### Patch Changes

- e8f5376: Ensures that only props that are of type `string` are recognized as being passed to the `href` prop.
- Updated dependencies [e8f5376]
- Updated dependencies [4873650]
  - @leafygreen-ui/box@2.1.1
  - @leafygreen-ui/icon@6.2.0

## 5.0.1

### Patch Changes

- 0593116: Uses enhanced `ExtendableBox` type to set smarter default `as` component in `MenuItem` and `SubMenu`
- Updated dependencies [0593116]
  - @leafygreen-ui/box@2.1.0

## 5.0.0

### Major Changes

- 1d24966: Makes `@leafygreen-ui/leafygreen-provider` a peer dependency to ensure that components use hooks from the same version of the provider as what's installed.

## 4.2.5

### Patch Changes

- eba8391: Component now extends `Box` in order to enforce stronger typings
- Updated dependencies [eba8391]
- Updated dependencies [eba8391]
  - @leafygreen-ui/box@2.0.0
  - @leafygreen-ui/icon@6.1.1

## 4.2.4

### Patch Changes

- Updated dependencies [6fc022e]
  - @leafygreen-ui/icon@6.0.0

## 4.2.3

### Patch Changes

- 2a03117: Upgrades @testing-library/react to v10 and revises test suites to conform with new standards
- Updated dependencies [2a03117]
- Updated dependencies [c812eb3]
  - @leafygreen-ui/leafygreen-provider@1.1.1
  - @leafygreen-ui/icon@5.1.0

## 4.2.2

### Patch Changes

- 7d7e589: Sets text-align property to center

## 4.2.1

### Patch Changes

- 75c0693: Upgrades workspace dependencies
- Updated dependencies [75c0693]
  - @leafygreen-ui/icon@5.0.3
  - @leafygreen-ui/palette@2.0.1

## 4.2.0

### Minor Changes

- ebbac0e: Adds leafygreen-provider to Button component

### Patch Changes

- Updated dependencies [5aafd72]
- Updated dependencies [5aafd72]
  - @leafygreen-ui/icon@5.0.2
  - @leafygreen-ui/lib@4.4.1

## 4.1.1

### Patch Changes

- Updated dependencies [4c268a5]
  - @leafygreen-ui/icon@5.0.0

## 4.1.0

### Minor Changes

- b342448: Adds glyph prop to Button component

### Patch Changes

- ac5c473: Adds lodash as dependency

## 4.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/palette@2.0.0

## 3.0.2

### Patch Changes

- f42801b: Fixes bug such that on hover, color is explicitly set rather than inherited

## 3.0.1

### Patch Changes

- ff55bb5: Adds fallback CSS for focus and hover states

## 3.0.0

### Major Changes

- 9c45cb4: Wraps component with `React.forwardRef` to provide direct access to the underlying element

### Patch Changes

- Updated dependencies [9c45cb4]
  - @leafygreen-ui/lib@3.1.0

## 2.3.7

### Patch Changes

- eb49b56: Fixes an issue where the children of Button had a `z-index` that was being applied in a global stacking context
