# @leafygreen-ui/popover

## 7.2.3

### Patch Changes

- ef84b5fd: Fix positioning when reference element is aligned to the right edge of the container and also fixes the width of justify fit element inside a scrollContainer
- Updated dependencies [2cf1bc4a]
  - @leafygreen-ui/lib@9.2.1

## 7.2.2

### Patch Changes

- Updated dependencies [b8f03aa1]
  - @leafygreen-ui/lib@9.0.0
  - @leafygreen-ui/portal@4.0.0
  - @leafygreen-ui/leafygreen-provider@2.1.3

## 7.2.1

### Patch Changes

- Updated dependencies [047c1930]
- Updated dependencies [047c1930]
  - @leafygreen-ui/lib@8.0.0
  - @leafygreen-ui/hooks@7.0.0
  - @leafygreen-ui/leafygreen-provider@2.1.2
  - @leafygreen-ui/portal@3.1.3

## 7.2.0

### Minor Changes

- 857a680a: Adds support for positioning popover elements relative to elements within a scroll container other than the window.
  Adds support for setting z-index on popover elements with the `zIndex` prop.

### Patch Changes

- Updated dependencies [857a680a]
- Updated dependencies [857a680a]
  - @leafygreen-ui/portal@3.1.2
  - @leafygreen-ui/leafygreen-provider@2.1.0

## 7.1.4

### Patch Changes

- Updated dependencies [90321b36]
  - @leafygreen-ui/lib@7.0.0
  - @leafygreen-ui/portal@3.1.1

## 7.1.3

### Patch Changes

- 1ed17f68: Updates lodash to 4.17.21, as there's a vulnerability in 4.17.20 that's been resolved in 4.17.21
- Updated dependencies [1ed17f68]
  - @leafygreen-ui/hooks@6.0.1

## 7.1.2

### Patch Changes

- dca5605b: Fixes bug where the border of the popover could be clipped

## 7.1.1

### Patch Changes

- a6360ea1: Fixes issue where Popover used without a portal did not animate from the correct direction when appearing

## 7.1.0

### Minor Changes

- c18f16e6: Improves compatibility with React v17

### Patch Changes

- Updated dependencies [c18f16e6]
- Updated dependencies [9ee1d5fc]
  - @leafygreen-ui/hooks@6.0.0
  - @leafygreen-ui/lib@6.1.1

## 7.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
  - @leafygreen-ui/hooks@5.0.1
  - @leafygreen-ui/lib@6.0.1
  - @leafygreen-ui/portal@3.0.1

## 7.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/hooks@5.0.0
  - @leafygreen-ui/lib@6.0.0
  - @leafygreen-ui/palette@3.0.0
  - @leafygreen-ui/portal@3.0.0

## 6.0.0

### Major Changes

- 6e210765: Fixes issue where under certain implementations of Popover, an infinite loop would occur. This fix is potentially breaking due to a change in the DOM.

## 5.2.3

### Patch Changes

- d5d40791: Pin lodash version to latest to include fix for [prototype pollution attack vulnerability.](https://hackerone.com/reports/712065)
- Updated dependencies [d5d40791]
  - @leafygreen-ui/hooks@4.2.1

## 5.2.2

### Patch Changes

- 8c867bb: Reduces server side effect warnings
- Updated dependencies [e599707]
- Updated dependencies [8c867bb]
  - @leafygreen-ui/hooks@4.2.0

## 5.2.1

### Patch Changes

- 290c9fc: Fixes rendering bug

## 5.2.0

### Minor Changes

- 4a27db7: Popover now accepts an onClick prop

### Patch Changes

- Updated dependencies [2c09c48]
- Updated dependencies [add8745]
  - @leafygreen-ui/hooks@4.1.0

## 5.1.4

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/hooks@4.0.1
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/palette@2.0.2
  - @leafygreen-ui/portal@2.2.1

## 5.1.3

### Patch Changes

- Updated dependencies [fa55b3d]
- Updated dependencies [95b4949]
  - @leafygreen-ui/hooks@4.0.0
  - @leafygreen-ui/portal@2.2.0

## 5.1.2

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [a571361]
- Updated dependencies [d739511]
  - @leafygreen-ui/lib@5.0.0
  - @leafygreen-ui/hooks@3.0.0
  - @leafygreen-ui/portal@2.1.3

## 5.1.1

### Patch Changes

- 083eec3: Restore TS <3.8 compatibility that was broken from using the `import type` syntax.
- 083eec3: Remove usage of `Element` in Node target builds that was preventing rendering the component in SSR contexts.
- Updated dependencies [083eec3]
  - @leafygreen-ui/portal@2.1.2
  - @leafygreen-ui/lib@4.5.1

## 5.1.0

### Minor Changes

- 06fbf05: Popover allows setting a `portalClassName` prop

## 5.0.2

### Patch Changes

- 05779a1: Upgrades `react-transition-group` to 4.4.1 which removes all React `StrictMode` warnings, making these components `StrictMode` safe.

## 5.0.1

### Patch Changes

- 2a03117: Upgrades @testing-library/react to v10 and revises test suites to conform with new standards

## 5.0.0

### Major Changes

- 2176b77: Refactors Popover to only use element positions relative to the viewport for calculating viewport collisions, and use element positions relative to the document for calculating the element positioning itself.

## 4.0.1

### Patch Changes

- 75c0693: Upgrades workspace dependencies
- Updated dependencies [75c0693]
  - @leafygreen-ui/palette@2.0.1

## 4.0.0

### Major Changes

- bc47b13: Added Justify.Fit to tooltip/popover, and Align.CenterHorizontal and Align.CenterVertical to popover

  For direct consumers of <Popover>, the function-as-a-child pattern now passes `align` and `justify` params,
  and the `justification` param/enum has been removed. This should be the only breaking change in this release.

### Patch Changes

- Updated dependencies [1b298cc]
  - @leafygreen-ui/hooks@2.1.0

## 3.0.2

### Patch Changes

- 232cf52: `React-transition-group` now dependency instead of peer dependency
- Updated dependencies [fabc1c9]
  - @leafygreen-ui/lib@4.2.0

## 3.0.1

### Patch Changes

- 69792b8: Make `react-transition-group` an external dependency of the build
- Updated dependencies [11b2217]
  - @leafygreen-ui/lib@4.1.0

## 3.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/hooks@2.0.0
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/portal@2.0.0
  - @leafygreen-ui/theme@2.0.0

## 2.0.0

### Major Changes

- f6b6b7a: Children of Popover are no longer rendered to the DOM when the Popover is closed

### Patch Changes

- Updated dependencies [9c45cb4]
- Updated dependencies [319fb82]
  - @leafygreen-ui/lib@3.1.0
  - @leafygreen-ui/portal@1.1.8

## 1.2.0

### Minor Changes

- 12fb220: Accepts children as a function, with signature `({alignment, justification, referenceElementPosition }) => {}` or `React.Element`

- Updated dependencies [563dc2e]:
  - @leafygreen-ui/portal@1.1.7
