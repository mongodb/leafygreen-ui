# @leafygreen-ui/button

## 10.0.2

### Patch Changes

- 1ed17f68: Updates lodash to 4.17.21, as there's a vulnerability in 4.17.20 that's been resolved in 4.17.21
- Updated dependencies [1ed17f68]
  - @leafygreen-ui/box@3.0.3

## 10.0.1

### Patch Changes

- 572ced14: Internal change that makes Button integrate better with components like Tooltip and Popover.
- 6e26200a: Small correction to border radius of the interaction ring for hover and focused states
- 78c60261: Fix regression where XSmall size button text was not all uppercased

## 10.0.0

### Major Changes

- 8b0ea602: Form-compatible components now display more visually consistent hover and focus states

### Minor Changes

- 8b0ea602: Added a `forceState` prop `Button` which can force enable or disable certain visual states

### Patch Changes

- Updated dependencies [8b0ea602]
  - @leafygreen-ui/interaction-ring@1.0.0

## 9.0.0

### Major Changes

- 10bdc295: Adjusts `large` Button height from 45px to 48px

### Patch Changes

- Updated dependencies [c9a0d89f]
- Updated dependencies [9ee1d5fc]
  - @leafygreen-ui/palette@3.1.0
  - @leafygreen-ui/lib@6.1.1
  - @leafygreen-ui/leafygreen-provider@2.0.2

## 8.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
  - @leafygreen-ui/box@3.0.1
  - @leafygreen-ui/leafygreen-provider@2.0.1
  - @leafygreen-ui/lib@6.0.1
  - @leafygreen-ui/palette@3.0.1

## 8.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/box@3.0.0
  - @leafygreen-ui/icon@7.0.0
  - @leafygreen-ui/leafygreen-provider@2.0.0
  - @leafygreen-ui/lib@6.0.0
  - @leafygreen-ui/palette@3.0.0

## 7.0.1

### Patch Changes

- 47846c77: Fixes unintentional exclusion of `ref` from TypeScript typing of props for `Button`, `SubMenu`, and `MenuItem` components.

## 7.0.0

### Major Changes

- 6883ccd0: Moves `overflow` css rule to support the component's usage as a trigger for the Tooltip component

### Patch Changes

- d5d40791: Pin lodash version to latest to include fix for [prototype pollution attack vulnerability.](https://hackerone.com/reports/712065)
- Updated dependencies [6883ccd0]
- Updated dependencies [d5d40791]
  - @leafygreen-ui/icon@6.6.0
  - @leafygreen-ui/box@2.1.5

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
