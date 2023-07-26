# @leafygreen-ui/portal

## 4.1.5

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/hooks@7.7.6
  - @leafygreen-ui/lib@10.4.1

## 4.1.4

### Patch Changes

- 76161cf0: Updates stories for Chromatic testing
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [735342e9]
- Updated dependencies [76161cf0]
  - @leafygreen-ui/lib@10.4.0
  - @leafygreen-ui/hooks@7.7.5

## 4.1.3

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x
- d2ce54e2f: Exports primary component props
- Updated dependencies [d2ce54e2f]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
  - @leafygreen-ui/hooks@7.7.4
  - @leafygreen-ui/lib@10.3.4

## 4.1.2

### Patch Changes

- cf00160ec: Updates TSDocs
- ce0fcb3f6: Excludes `children` from story controls
- Updated dependencies [55d33e435]
- Updated dependencies [cf00160ec]
- Updated dependencies [111b680c5]
  - @leafygreen-ui/lib@10.3.3

## 4.1.1

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/hooks@7.7.1
  - @leafygreen-ui/lib@10.3.2

## 4.1.0

### Minor Changes

- 52dcb3316: Exports `usePortalContainer` hook

### Patch Changes

- Updated dependencies [26e341a0b]
  - @leafygreen-ui/lib@10.2.2

## 4.0.9

### Patch Changes

- b24b21462: Storybook: Updates story files to be on par with existing mongodb.design examples

## 4.0.8

### Patch Changes

- b7f7a4c95: Updates package dependencies & devDependencies, and ensures each package is appropriately listed. Ensures `tsconfig` has no circular dependencies

## 4.0.7

### Patch Changes

- Updated dependencies [f2d63a60]
  - @leafygreen-ui/lib@10.0.0

## 4.0.6

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.
- Updated dependencies [24683433]
  - @leafygreen-ui/hooks@7.3.3
  - @leafygreen-ui/lib@9.5.1

## 4.0.5

### Patch Changes

- 3690df49: Updates `tsdoc.json` file
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
  - @leafygreen-ui/lib@9.5.0
  - @leafygreen-ui/hooks@7.3.2

## 4.0.4

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/hooks@7.3.1
  - @leafygreen-ui/lib@9.4.2

## 4.0.3

### Patch Changes

- 96d1ff9c: Updates to propTypes, TSDocs, and Storybook controls
- Updated dependencies [6792bc44]
- Updated dependencies [422dbfcd]
  - @leafygreen-ui/hooks@7.3.0
  - @leafygreen-ui/lib@9.3.0

## 4.0.2

### Patch Changes

- 548ca2c: Replace useLayoutEffect with useIsomorphicLayoutEffect hook

## 4.0.1

### Patch Changes

- 8df11bf4: Use useLayoutEffect hook internally to fix tests broken by Portal showing async behavior

## 4.0.0

### Major Changes

- b8f03aa1: Bumps `react` peer dependency to v17

### Patch Changes

- Updated dependencies [b8f03aa1]
  - @leafygreen-ui/lib@9.0.0

## 3.1.3

### Patch Changes

- Updated dependencies [047c1930]
  - @leafygreen-ui/lib@8.0.0

## 3.1.2

### Patch Changes

- 857a680a: Reworks logic for creating a custom portal element to support future reuse of portal root generation.

## 3.1.1

### Patch Changes

- Updated dependencies [90321b36]
  - @leafygreen-ui/lib@7.0.0

## 3.1.0

### Minor Changes

- 627333c2: Portal can now accept a `null` value for the `container` prop

### Patch Changes

- Updated dependencies [ee7923d3]
  - @leafygreen-ui/lib@6.1.2

## 3.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
  - @leafygreen-ui/lib@6.0.1

## 3.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/lib@6.0.0

## 2.2.1

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/lib@5.1.1

## 2.2.0

### Minor Changes

- 95b4949: Make SSR compatible and support changing container prop

## 2.1.3

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [a571361]
  - @leafygreen-ui/lib@5.0.0

## 2.1.2

### Patch Changes

- 083eec3: Restore TS <3.8 compatibility that was broken from using the `import type` syntax.
- Updated dependencies [083eec3]
  - @leafygreen-ui/lib@4.5.1

## 2.1.1

### Patch Changes

- 01e6777: Fix extra DOM elements being created in development mode

## 2.1.0

### Minor Changes

- 1c797b3: Portal allows setting a className prop for the containing element

### Patch Changes

- Updated dependencies [1c797b3]
  - @leafygreen-ui/lib@4.5.0

## 2.0.1

### Patch Changes

- 5aafd72: Fixes an issue where some built type definition files had a triple-slash reference directive pointing to a package that might not exist in a consuming application.
- Updated dependencies [5aafd72]
  - @leafygreen-ui/lib@4.4.1

## 2.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/lib@4.0.0

## 1.1.8

### Patch Changes

- 319fb82: Updates PropTypes based on eslint updates
- Updated dependencies [9c45cb4]
  - @leafygreen-ui/lib@3.1.0

## 1.1.7

### Patch Changes

- 563dc2e: Dramatically reduces the package's bundle size by excluding `react-dom` from the bundle.
