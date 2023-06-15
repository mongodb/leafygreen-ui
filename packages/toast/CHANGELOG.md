# @leafygreen-ui/toast

## 6.1.9

### Patch Changes

- 76161cf0: Updates devDependencies
- 76161cf0: Updates stories for Chromatic testing
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [735342e9]
- Updated dependencies [95f5107a]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
  - @leafygreen-ui/lib@10.4.0
  - @leafygreen-ui/hooks@7.7.5
  - @leafygreen-ui/icon@11.17.0
  - @leafygreen-ui/icon-button@15.0.12
  - @leafygreen-ui/portal@4.1.4
  - @leafygreen-ui/tokens@2.1.1
  - @leafygreen-ui/typography@16.5.1

## 6.1.8

### Patch Changes

- bd2668895: - Removes controlled toast when it is unmounted.
  - Removed notification bar when there are 0 notifications.

## 6.1.7

### Patch Changes

- 63b2deb0b: Upgrade button to v20.1.1

## 6.1.6

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x
- Updated dependencies [d2ce54e2f]
- Updated dependencies [75099c60b]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
  - @leafygreen-ui/hooks@7.7.4
  - @leafygreen-ui/icon@11.16.1
  - @leafygreen-ui/icon-button@15.0.11
  - @leafygreen-ui/leafygreen-provider@3.1.3
  - @leafygreen-ui/lib@10.3.4
  - @leafygreen-ui/portal@4.1.3
  - @leafygreen-ui/typography@16.5.0

## 6.1.5

### Patch Changes

- 9ad8abf5f: Memoizes functions and stack inside of useReducer
- Updated dependencies [6a3f03fd2]
  - @leafygreen-ui/typography@16.4.1

## 6.1.4

### Patch Changes

- a3a52e131: Bumps to use new `useIdAllocator` hook
- Updated dependencies [614f7617d]
- Updated dependencies [a3a52e131]
- Updated dependencies [614f7617d]
  - @leafygreen-ui/icon@11.15.0
  - @leafygreen-ui/hooks@7.7.3

## 6.1.3

### Patch Changes

- 32b3d3146: Bumps to use new `useIdAllocator` hook
- 0a418549c: Removes internal components and utilities from TSDoc
- 73cbbd02c: Uses fontWeight token from `@leafygreen-ui/tokens`
- Updated dependencies [73cbbd02c]
- Updated dependencies [83fc5b31b]
- Updated dependencies [9bcf8b925]
- Updated dependencies [8ece56980]
- Updated dependencies [32b3d3146]
- Updated dependencies [73cbbd02c]
  - @leafygreen-ui/tokens@2.1.0
  - @leafygreen-ui/icon@11.14.0
  - @leafygreen-ui/typography@16.4.0
  - @leafygreen-ui/hooks@7.7.2

## 6.1.2

### Patch Changes

- cf00160ec: Updates TSDocs
- 3bd3e0c45: Update Storybook for Live Example on .design
- Updated dependencies [55d33e435]
- Updated dependencies [07db42330]
- Updated dependencies [55d33e435]
- Updated dependencies [cf00160ec]
- Updated dependencies [ce0fcb3f6]
- Updated dependencies [111b680c5]
- Updated dependencies [77320a6b8]
  - @leafygreen-ui/lib@10.3.3
  - @leafygreen-ui/palette@4.0.4
  - @leafygreen-ui/typography@16.3.0
  - @leafygreen-ui/portal@4.1.2
  - @leafygreen-ui/icon-button@15.0.10
  - @leafygreen-ui/tokens@2.0.3

## 6.1.1

### Patch Changes

- 8c0c2bdf9: Adds `position: relative;` to toast portal container
- 30ab9cfaf: - Fixes a bug where the toast stack would not expand on hover
  - Fixes a bug where toasts with no description would be improperly placed when expanded
  - Fixes a bug where collapsing a previously expanded stack could prevent interaction with the rest of the page
- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/emotion@4.0.4
  - @leafygreen-ui/hooks@7.7.1
  - @leafygreen-ui/icon@11.13.1
  - @leafygreen-ui/icon-button@15.0.9
  - @leafygreen-ui/leafygreen-provider@3.1.2
  - @leafygreen-ui/lib@10.3.2
  - @leafygreen-ui/palette@4.0.3
  - @leafygreen-ui/portal@4.1.1
  - @leafygreen-ui/tokens@2.0.2
  - @leafygreen-ui/typography@16.2.1

## 6.1.0

### Minor Changes

- 56930ad78: - Adds `portalClassName` prop to `ToastProvider`
  - Adds a console warning if `useToast` is called outside of a `ToastProvider`
  - Refactors a `setImmediate` to `setTimeout`
  - Enhances `useToast` test suite

### Patch Changes

- Updated dependencies [dc8ceed9b]
- Updated dependencies [09775f0ac]
  - @leafygreen-ui/icon@11.13.0
  - @leafygreen-ui/palette@4.0.2

## 6.0.0

### Major Changes

- d351c02bc: Adds multi-toast support for Toasts. The recommended pattern for creating toasts is using the methods exported by the `useToast` hook. Rendering Toasts in JSX is still supported, however these must be manually opened and controlled in the consuming application.

### Patch Changes

- c2c5601f4: Adds missing dependencies. Removes unused dependencies
- Updated dependencies [ece595acd]
- Updated dependencies [9858ab8c5]
- Updated dependencies [89ede28ec]
- Updated dependencies [d351c02bc]
- Updated dependencies [c2c5601f4]
  - @leafygreen-ui/typography@16.2.0
  - @leafygreen-ui/icon-button@15.0.8
  - @leafygreen-ui/hooks@7.7.0
  - @leafygreen-ui/icon@11.12.7
  - @leafygreen-ui/lib@10.3.1
  - @leafygreen-ui/palette@4.0.1

## 5.0.1

### Patch Changes

- Updated dependencies [5b036515e]
- Updated dependencies [26e341a0b]
- Updated dependencies [52dcb3316]
- Updated dependencies [997121cc3]
- Updated dependencies [eb0cc4498]
  - @leafygreen-ui/palette@4.0.0
  - @leafygreen-ui/lib@10.2.2
  - @leafygreen-ui/portal@4.1.0
  - @leafygreen-ui/icon@11.12.5
  - @leafygreen-ui/typography@16.1.0
  - @leafygreen-ui/icon-button@15.0.7
  - @leafygreen-ui/tokens@2.0.1

## 5.0.0

### Major Changes

- dd2c42ceb: Updates Toast design to align with Toast v3 in Figma

### Patch Changes

- Updated dependencies [2e8a572db]
- Updated dependencies [4ccc353e7]
- Updated dependencies [4ccc353e7]
  - @leafygreen-ui/lib@10.2.1

## 4.0.4

### Patch Changes

- 64eee134d: TSDoc: Updates some exported TSDoc interfaces. Storybook: Updates story files.
- Updated dependencies [64eee134d]
  - @leafygreen-ui/lib@10.1.0

## 4.0.3

### Patch Changes

- Updated dependencies [050f1f8a9]
- Updated dependencies [741cdd408]
- Updated dependencies [866144167]
- Updated dependencies [c82ed35d5]
- Updated dependencies [b24b21462]
  - @leafygreen-ui/icon@11.12.4
  - @leafygreen-ui/tokens@2.0.0
  - @leafygreen-ui/typography@16.0.0
  - @leafygreen-ui/icon-button@15.0.4
  - @leafygreen-ui/palette@3.4.7
  - @leafygreen-ui/portal@4.0.9

## 4.0.2

### Patch Changes

- 2cb1e6116: Adds toggle button to Toast story
- Updated dependencies [53d77f55d]
  - @leafygreen-ui/typography@15.3.0

## 4.0.1

### Patch Changes

- ae5421cf6: Updates components to use internal transition tokens
- Updated dependencies [ae5421cf6]
- Updated dependencies [4b4c2d27d]
- Updated dependencies [6a266b813]
- Updated dependencies [1a335d0b2]
- Updated dependencies [ba97d1ef7]
- Updated dependencies [ae5421cf6]
  - @leafygreen-ui/tokens@1.4.0
  - @leafygreen-ui/icon@11.12.1
  - @leafygreen-ui/typography@15.1.0
  - @leafygreen-ui/icon-button@15.0.1

## 4.0.0

### Patch Changes

- Updated dependencies [07b3c797]
- Updated dependencies [07b3c797]
- Updated dependencies [b9b09a86]
  - @leafygreen-ui/typography@15.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.0
  - @leafygreen-ui/icon-button@15.0.0

## 3.0.1

### Patch Changes

- 2195359a: Updates some packges to use a caret instead of an exact version
- Updated dependencies [2195359a]
- Updated dependencies [209f77ed]
- Updated dependencies [f2d63a60]
  - @leafygreen-ui/icon-button@14.0.1
  - @leafygreen-ui/icon@11.12.0
  - @leafygreen-ui/lib@10.0.0
  - @leafygreen-ui/leafygreen-provider@3.0.1
  - @leafygreen-ui/portal@4.0.7
  - @leafygreen-ui/typography@14.0.1

## 3.0.0

### Patch Changes

- Updated dependencies [e399f1b9]
- Updated dependencies [e399f1b9]
  - @leafygreen-ui/leafygreen-provider@3.0.0
  - @leafygreen-ui/icon-button@14.0.0
  - @leafygreen-ui/typography@14.0.0

## 2.0.3

### Patch Changes

- 24921fd2: Fix dependency range in package.json

## 2.0.2

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.
- Updated dependencies [24683433]
  - @leafygreen-ui/emotion@4.0.3
  - @leafygreen-ui/icon@11.11.1
  - @leafygreen-ui/icon-button@13.2.1
  - @leafygreen-ui/leafygreen-provider@2.3.5
  - @leafygreen-ui/lib@9.5.1
  - @leafygreen-ui/palette@3.4.4
  - @leafygreen-ui/portal@4.0.6
  - @leafygreen-ui/tokens@1.3.4
  - @leafygreen-ui/typography@13.2.1

## 2.0.1

### Patch Changes

- 3690df49: Sets `variant` prop to be optional. Sets default `variant` to Note
- 3690df49: Updates Storybook configs
- 3690df49: Updates `tsdoc.json` file
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [58a5a05e]
  - @leafygreen-ui/icon@11.11.0
  - @leafygreen-ui/icon-button@13.2.0
  - @leafygreen-ui/typography@13.2.0
  - @leafygreen-ui/lib@9.5.0
  - @leafygreen-ui/emotion@4.0.2
  - @leafygreen-ui/leafygreen-provider@2.3.4
  - @leafygreen-ui/palette@3.4.3
  - @leafygreen-ui/portal@4.0.5
  - @leafygreen-ui/tokens@1.3.3

## 2.0.0

### Major Changes

- e39d8469: Updates `Toast` for dark mode brand refresh.

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files
- Updated dependencies [7caa1c3e]
- Updated dependencies [e39d8469]
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/icon@11.10.2
  - @leafygreen-ui/typography@13.1.2
  - @leafygreen-ui/emotion@4.0.1
  - @leafygreen-ui/icon-button@13.1.1
  - @leafygreen-ui/leafygreen-provider@2.3.3
  - @leafygreen-ui/lib@9.4.2
  - @leafygreen-ui/palette@3.4.2
  - @leafygreen-ui/portal@4.0.4
  - @leafygreen-ui/tokens@1.3.2

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
