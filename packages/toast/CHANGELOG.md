# @leafygreen-ui/toast

## 1.0.1

### Patch Changes

- Updated dependencies [233ac580]
- Updated dependencies [ba4aab15]
- Updated dependencies [ba4aab15]
- Updated dependencies [2cf1bc4a]
- Updated dependencies [679b6239]
- Updated dependencies [f3aad7e2]
  - @leafygreen-ui/tokens@1.2.0
  - @leafygreen-ui/typography@9.1.1
  - @leafygreen-ui/lib@9.2.1

## 1.0.0

### Major Changes

- 8457f92: Updates toast styles in line with visual brand refresh

### Patch Changes

- Updated dependencies [8457f92]
  - @leafygreen-ui/tokens@1.0.0
  - @leafygreen-ui/typography@9.0.0
- Updated dependencies [cb54eef]
  - @leafygreen-ui/palette@3.3.1

## 0.4.10

### Patch Changes

- Updated dependencies [f6e5655a]
- Updated dependencies [03388ff2]
- Updated dependencies [b8f03aa1]
  - @leafygreen-ui/palette@3.2.2
  - @leafygreen-ui/icon@11.3.0
  - @leafygreen-ui/lib@9.0.0
  - @leafygreen-ui/portal@4.0.0
  - @leafygreen-ui/icon-button@9.1.6
  - @leafygreen-ui/tokens@0.5.3
  - @leafygreen-ui/typography@8.0.4

## 0.4.9

### Patch Changes

- e1af3278: Updates dismiss button color.
- Updated dependencies [e1af3278]
- Updated dependencies [047c1930]
  - @leafygreen-ui/icon-button@9.1.5
  - @leafygreen-ui/lib@8.0.0
  - @leafygreen-ui/icon@11.1.1
  - @leafygreen-ui/portal@3.1.3
  - @leafygreen-ui/tokens@0.5.2
  - @leafygreen-ui/typography@8.0.2

## 0.4.8

### Patch Changes

- Updated dependencies [faeb0ce0]
  - @leafygreen-ui/icon@11.0.0
  - @leafygreen-ui/typography@8.0.1

## 0.4.7

### Patch Changes

- Updated dependencies [857a680a]
  - @leafygreen-ui/portal@3.1.2
  - @leafygreen-ui/typography@8.0.0

## 0.4.6

### Patch Changes

- e7ac7831: Updates icon color in `success` variant so that it meets 3:1 contrast requirements.

## 0.4.5

### Patch Changes

- Updated dependencies [02417199]
- Updated dependencies [90321b36]
- Updated dependencies [ab581f34]
- Updated dependencies [90321b36]
  - @leafygreen-ui/typography@7.6.0
  - @leafygreen-ui/icon-button@9.1.3
  - @leafygreen-ui/palette@3.2.1
  - @leafygreen-ui/lib@7.0.0
  - @leafygreen-ui/icon@10.2.1
  - @leafygreen-ui/portal@3.1.1
  - @leafygreen-ui/tokens@0.5.1

## 0.4.4

### Patch Changes

- Updated dependencies [ec27f36e]
- Updated dependencies [99ea9436]
- Updated dependencies [ec27f36e]
  - @leafygreen-ui/typography@7.5.0
  - @leafygreen-ui/icon-button@9.1.2
  - @leafygreen-ui/icon@10.0.0

## 0.4.3

### Patch Changes

- 1ed17f68: Updates lodash to 4.17.21, as there's a vulnerability in 4.17.20 that's been resolved in 4.17.21
- Updated dependencies [1a42c662]
  - @leafygreen-ui/typography@7.4.0

## 0.4.2

### Patch Changes

- Updated dependencies [f805b772]
- Updated dependencies [f805b772]
  - @leafygreen-ui/icon@9.0.0
  - @leafygreen-ui/typography@7.3.2

## 0.4.1

### Patch Changes

- b0cbb63a: Fixes issue preventing bundlers from bundling the toast package as a dependency
- Updated dependencies [ba56b1cc]
  - @leafygreen-ui/icon@8.0.0
  - @leafygreen-ui/typography@7.3.1

## 0.4.0

### Minor Changes

- b010bdfe: This change improves screenreader compatibility by adding additonal aria attributes to the Toast component. This is being released as a breaking version since previously the root element of the Toast element would only be in the DOM when the toast is open, but now the element will always be in the DOM.

## 0.3.0

### Minor Changes

- 7e7dc210: Added new Toast variants

## 0.2.2

### Patch Changes

- Updated dependencies [ac0f3ff1]
  - @leafygreen-ui/typography@7.0.0

## 0.2.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
- Updated dependencies [059ef833]
  - @leafygreen-ui/icon@7.0.1
  - @leafygreen-ui/icon-button@9.0.1
  - @leafygreen-ui/lib@6.0.1
  - @leafygreen-ui/palette@3.0.1
  - @leafygreen-ui/portal@3.0.1
  - @leafygreen-ui/tokens@0.5.0
  - @leafygreen-ui/typography@6.0.1

## 0.2.0

### Minor Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/icon-button@9.0.0
  - @leafygreen-ui/icon@7.0.0
  - @leafygreen-ui/lib@6.0.0
  - @leafygreen-ui/palette@3.0.0
  - @leafygreen-ui/portal@3.0.0
  - @leafygreen-ui/typography@6.0.0
  - @leafygreen-ui/tokens@0.4.0

## 0.1.5

### Patch Changes

- Updated dependencies [001a277f]
- Updated dependencies [d0dac1a0]
- Updated dependencies [001a277f]
  - @leafygreen-ui/typography@5.0.0
  - @leafygreen-ui/icon@6.6.1
  - @leafygreen-ui/icon-button@8.0.1

## 0.1.4

### Patch Changes

- 35119b8d: Export Toast variant enum

## 0.1.3

### Patch Changes

- Updated dependencies [a84219f1]
  - @leafygreen-ui/icon-button@8.0.0

## 0.1.2

### Patch Changes

- 2016e52e: Fixes distributed bundle definition

## 0.1.1

### Patch Changes

- d5d40791: Pin lodash version to latest to include fix for [prototype pollution attack vulnerability.](https://hackerone.com/reports/712065)
- Updated dependencies [6883ccd0]
- Updated dependencies [3fed752e]
- Updated dependencies [eda10121]
  - @leafygreen-ui/icon@6.6.0
  - @leafygreen-ui/typography@4.3.0
  - @leafygreen-ui/icon-button@7.0.6

## 0.1.0

### Minor Changes

- 043c59b: Adds Beta version of the new Toast component.

### Patch Changes

- Updated dependencies [f792966]
- Updated dependencies [f792966]
  - @leafygreen-ui/tokens@0.3.0
  - @leafygreen-ui/typography@4.2.2
