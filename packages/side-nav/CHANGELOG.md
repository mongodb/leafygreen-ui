# @leafygreen-ui/side-nav

## 5.0.0

### Major Changes

- ee7923d3: Performs some internal code refactoring with improved typing.

### Patch Changes

- ee7923d3: Changes how we extend the types of HTMLElements, and standardizes how we document this across readmes
- Updated dependencies [ee7923d3]
- Updated dependencies [ee7923d3]
  - @leafygreen-ui/menu@9.1.1
  - @leafygreen-ui/lib@6.1.2

## 4.0.3

### Patch Changes

- Updated dependencies [c18f16e6]
- Updated dependencies [c9a0d89f]
- Updated dependencies [9ee1d5fc]
  - @leafygreen-ui/menu@9.1.0
  - @leafygreen-ui/palette@3.1.0
  - @leafygreen-ui/lib@6.1.1
  - @leafygreen-ui/leafygreen-provider@2.0.2

## 4.0.2

### Patch Changes

- Updated dependencies [f7b3d668]
  - @leafygreen-ui/menu@9.0.2

## 4.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
  - @leafygreen-ui/emotion@3.0.1
  - @leafygreen-ui/leafygreen-provider@2.0.1
  - @leafygreen-ui/lib@6.0.1
  - @leafygreen-ui/menu@9.0.1
  - @leafygreen-ui/palette@3.0.1

## 4.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/emotion@3.0.0
  - @leafygreen-ui/leafygreen-provider@2.0.0
  - @leafygreen-ui/lib@6.0.0
  - @leafygreen-ui/menu@9.0.0
  - @leafygreen-ui/palette@3.0.0

## 3.2.0

### Minor Changes

- f8b285a7: Adds `initialCollapsed` prop

### Patch Changes

- Updated dependencies [a18b4e1b]
  - @leafygreen-ui/menu@8.0.0

## 3.1.0

### Minor Changes

- dd0b6d5f: Adds `collapsible` prop to SideNavGroup

### Patch Changes

- @leafygreen-ui/menu@7.0.10

## 3.0.10

### Patch Changes

- Updated dependencies [47846c77]
  - @leafygreen-ui/menu@7.0.9

## 3.0.9

### Patch Changes

- e599707: Require lodash dependencies instead of inlining them.

## 3.0.8

### Patch Changes

- Updated dependencies [6b0d0a2]
  - @leafygreen-ui/menu@7.0.8

## 3.0.7

### Patch Changes

- @leafygreen-ui/menu@7.0.7

## 3.0.6

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/emotion@2.0.2
  - @leafygreen-ui/leafygreen-provider@1.1.4
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/menu@7.0.6
  - @leafygreen-ui/palette@2.0.2

## 3.0.5

### Patch Changes

- @leafygreen-ui/leafygreen-provider@1.1.3
- @leafygreen-ui/menu@7.0.5

## 3.0.4

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [a571361]
  - @leafygreen-ui/lib@5.0.0
  - @leafygreen-ui/leafygreen-provider@1.1.2
  - @leafygreen-ui/menu@7.0.4

## 3.0.3

### Patch Changes

- Updated dependencies [e8f5376]
  - @leafygreen-ui/menu@7.0.3

## 3.0.2

### Patch Changes

- Updated dependencies [083eec3]
- Updated dependencies [083eec3]
  - @leafygreen-ui/lib@4.5.1
  - @leafygreen-ui/menu@7.0.2

## 3.0.1

### Patch Changes

- Updated dependencies [0593116]
  - @leafygreen-ui/menu@7.0.1

## 3.0.0

### Major Changes

- 1d24966: Makes `@leafygreen-ui/leafygreen-provider` a peer dependency to ensure that components use hooks from the same version of the provider as what's installed.

### Patch Changes

- Updated dependencies [1d24966]
  - @leafygreen-ui/menu@7.0.0

## 2.0.14

### Patch Changes

- Updated dependencies [eba8391]
  - @leafygreen-ui/menu@6.0.14

## 2.0.13

### Patch Changes

- Updated dependencies [1d86d56]
  - @leafygreen-ui/menu@6.0.13

## 2.0.12

### Patch Changes

- @leafygreen-ui/menu@6.0.12

## 2.0.11

### Patch Changes

- Updated dependencies [05779a1]
  - @leafygreen-ui/menu@6.0.11

## 2.0.10

### Patch Changes

- Updated dependencies [a11b521]
  - @leafygreen-ui/menu@6.0.10

## 2.0.9

### Patch Changes

- Updated dependencies [2a03117]
  - @leafygreen-ui/leafygreen-provider@1.1.1
  - @leafygreen-ui/menu@6.0.9

## 2.0.8

### Patch Changes

- Updated dependencies [0391d01]
  - @leafygreen-ui/menu@6.0.8

## 2.0.7

### Patch Changes

- Updated dependencies [75c0693]
  - @leafygreen-ui/menu@6.0.7
  - @leafygreen-ui/palette@2.0.1

## 2.0.6

### Patch Changes

- Updated dependencies [5aafd72]
  - @leafygreen-ui/lib@4.4.1
  - @leafygreen-ui/menu@6.0.6

## 2.0.5

### Patch Changes

- Updated dependencies [64c03e7]
  - @leafygreen-ui/menu@6.0.5

## 2.0.4

### Patch Changes

- Updated dependencies [94ed125]
  - @leafygreen-ui/leafygreen-provider@1.1.0
  - @leafygreen-ui/menu@6.0.4

## 2.0.3

### Patch Changes

- Updated dependencies [dd342f5]
  - @leafygreen-ui/menu@6.0.3

## 2.0.2

### Patch Changes

- Updated dependencies [cda96b2]
  - @leafygreen-ui/menu@6.0.2

## 2.0.1

### Patch Changes

- 0c26f35: Fixes inconsistencies in active/hover highlight sizes

## 2.0.0

### Major Changes

- ed2e2f8:
  - Wrap SideNavItem components in `React.useRef`
  - Update `z-index` rules on hover styles for SideNavItem components

## 1.1.1

### Patch Changes

- Updated dependencies [704e25c]
- Updated dependencies [347bcf6]
  - @leafygreen-ui/lib@4.3.1
  - @leafygreen-ui/menu@6.0.1

## 1.1.0

### Minor Changes

- 6eb9d26:
  - Exports width and side padding so that users can reference both in integrating the component without hardcoding these values and to future-proof design changes
  - Design updates to match standards

### Patch Changes

- Updated dependencies [6eb9d26]
  - @leafygreen-ui/lib@4.3.0

## 1.0.4

### Patch Changes

- 3a7bd19: Modifies styles to avoid conflicts with pre-existing focus states of anchors

## 1.0.3

### Patch Changes

- d766d73: Adjusts spacing in SideNav
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

- 0eb010c: Improves handling of Aria roles in MenuItems, and increases label contrast for accessibility

## 1.0.0

### Major Changes

- 11b2217: Initial release of SideNav component

### Patch Changes

- Updated dependencies [11b2217]
- Updated dependencies [bd3bcd9]
  - @leafygreen-ui/lib@4.1.0
  - @leafygreen-ui/emotion@2.0.1
