# @leafygreen-ui/banner

## 3.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
  - @leafygreen-ui/emotion@3.0.1
  - @leafygreen-ui/icon@7.0.1
  - @leafygreen-ui/lib@6.0.1
  - @leafygreen-ui/palette@3.0.1

## 3.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/emotion@3.0.0
  - @leafygreen-ui/icon@7.0.0
  - @leafygreen-ui/lib@6.0.0
  - @leafygreen-ui/palette@3.0.0

## 2.0.4

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/emotion@2.0.2
  - @leafygreen-ui/icon@6.3.2
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/palette@2.0.2

## 2.0.3

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [d2136a0]
- Updated dependencies [a571361]
  - @leafygreen-ui/lib@5.0.0
  - @leafygreen-ui/icon@6.3.0

## 2.0.2

### Patch Changes

- 1d86d56: Imports Glyphs directly, rather than importing the entire Icon package, when Glyph components are used
- Updated dependencies [1d86d56]
  - @leafygreen-ui/icon@6.1.0

## 2.0.1

### Patch Changes

- Updated dependencies [6fc022e]
  - @leafygreen-ui/icon@6.0.0

## 2.0.0

### Major Changes

- 8a1f14b: Changes innerHTML of Banner component such that children are wrapped with `div` tags rather than `span` tags

## 1.0.1

### Patch Changes

- 0d92118: Make devDependencies just dependencies in package.json

## 1.0.0

### Major Changes

- 2977b0b: Initial release of Banner component
