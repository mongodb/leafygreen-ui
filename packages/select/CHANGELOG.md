# @leafygreen-ui/select

## 5.0.3

### Patch Changes

- fad2b287: Fixes a bug where occasionally the max menu height would be set to 0 if a ref was left unset

## 5.0.2

### Patch Changes

- 96d1ff9c: Updates to propTypes, TSDocs, and Storybook controls
- 6792bc44: Refactors Combobox and Select to use the new `useAvailableSpace` hook to calculate the max menu height
- Updated dependencies [6a89bc29]
- Updated dependencies [fd2f6de0]
- Updated dependencies [6792bc44]
- Updated dependencies [96d1ff9c]
- Updated dependencies [422dbfcd]
- Updated dependencies [9ff90d4b]
- Updated dependencies [8d12b918]
- Updated dependencies [86a7f3c3]
  - @leafygreen-ui/palette@3.4.0
  - @leafygreen-ui/button@15.0.2
  - @leafygreen-ui/hooks@7.3.0
  - @leafygreen-ui/tokens@1.3.1
  - @leafygreen-ui/typography@11.0.2
  - @leafygreen-ui/lib@9.3.0

## 5.0.1

### Patch Changes

- efa9e8f4: Exporting / renaming props for Storybook
- 2670e4db: Expects `glyph` prop to be of type `LGGlyph.Element`
- Updated dependencies [646c00f7]
- Updated dependencies [2670e4db]
  - @leafygreen-ui/button@15.0.1
  - @leafygreen-ui/icon@11.10.0

## 5.0.0

### Major Changes

- Updated dependencies [500d6c60]
  - @leafygreen-ui/leafygreen-provider@2.2.0

### Patch Changes

- Updated dependencies [e13d2487]
- Updated dependencies [3a14d852]
- Updated dependencies [5f28fce1]
- Updated dependencies [c48e943e]
- Updated dependencies [500d6c60]
  - @leafygreen-ui/popover@8.0.0
  - @leafygreen-ui/interaction-ring@3.0.0
  - @leafygreen-ui/button@15.0.0
  - @leafygreen-ui/leafygreen-provider@2.2.0
  - @leafygreen-ui/tokens@1.3.0
  - @leafygreen-ui/icon@11.9.0
  - @leafygreen-ui/typography@11.0.0

## 4.0.2

### Patch Changes

- Updated dependencies [f3aad7e2]
- Updated dependencies [233ac580]
- Updated dependencies [ba4aab15]
- Updated dependencies [ba4aab15]
- Updated dependencies [2cf1bc4a]
- Updated dependencies [679b6239]
- Updated dependencies [ef84b5fd]
- Updated dependencies [f3aad7e2]
- Updated dependencies [c1f9c4d4]
  - @leafygreen-ui/button@13.0.1
  - @leafygreen-ui/tokens@1.2.0
  - @leafygreen-ui/lib@9.2.1
  - @leafygreen-ui/popover@7.2.3

## 4.0.1

### Patch Changes

- Updated dependencies [614be76]
- Updated dependencies [614be76]
  - @leafygreen-ui/typography@9.1.1
  - @leafygreen-ui/tokens@1.1.0

## 4.0.0

### Major Changes

- 8457f92: Updates select in line with Visual Brand refresh

### Patch Changes

- Updated dependencies [8457f92]
  - @leafygreen-ui/tokens@1.0.0
  - @leafygreen-ui/typography@9.0.0
  - @leafygreen-ui/interaction-ring@2.0.0
  - @leafygreen-ui/button@13.0.0
- Updated dependencies [cb54eef]
  - @leafygreen-ui/palette@3.3.1

## 3.1.0

### Minor Changes

- 70f3c2c: Added error state to select component

### Patch Changes

- Updated dependencies [70f3c2c]
  - @leafygreen-ui/hooks@7.1.1

## 3.0.8

### Patch Changes

- 9d0bcd4: - Resolves an issue where a Select component would break keyboard navigation with `Tab` in a form
  - Prevents page from scrolling when using arrow keys to navigate a Select menu

## 3.0.7

### Patch Changes

- cec710ad: Upgrades Polished to v4.1
- Updated dependencies [d4a46e27]
- Updated dependencies [cec710ad]
  - @leafygreen-ui/icon@11.6.0
  - @leafygreen-ui/lib@9.0.1

## 3.0.6

### Patch Changes

- cd4f9a27: Fixes a bug where the Select menu would not appear in the correct position in the case where there is limited space below the trigger button. Also enforces a max-height of 274px on the Select menu

## 3.0.5

### Patch Changes

- Updated dependencies [f6e5655a]
- Updated dependencies [f6e5655a]
- Updated dependencies [03388ff2]
- Updated dependencies [b8f03aa1]
- Updated dependencies [24930836]
  - @leafygreen-ui/emotion@4.0.0
  - @leafygreen-ui/palette@3.2.2
  - @leafygreen-ui/icon@11.3.0
  - @leafygreen-ui/lib@9.0.0
  - @leafygreen-ui/button@12.0.4
  - @leafygreen-ui/leafygreen-provider@2.1.3
  - @leafygreen-ui/popover@7.2.2
  - @leafygreen-ui/tokens@0.5.3

## 3.0.4

### Patch Changes

- 60262a25: Removes reference to null element.
- Updated dependencies [b408e8a7]
  - @leafygreen-ui/icon@11.2.0

## 3.0.3

### Patch Changes

- e1af3278: Updates label color and font-size in Select component.
- Updated dependencies [047c1930]
- Updated dependencies [047c1930]
  - @leafygreen-ui/lib@8.0.0
  - @leafygreen-ui/hooks@7.0.0
  - @leafygreen-ui/button@12.0.3
  - @leafygreen-ui/icon@11.1.1
  - @leafygreen-ui/leafygreen-provider@2.1.2
  - @leafygreen-ui/popover@7.2.1
  - @leafygreen-ui/tokens@0.5.2

## 3.0.2

### Patch Changes

- 1ffbb84c: Fixes bug where a ref's clientHeight was being referenced prior to the ref being set.

## 3.0.1

### Patch Changes

- 650f6334: Updates semantic HTML to help define width properties in Button and Select components
- Updated dependencies [faeb0ce0]
- Updated dependencies [54daf9a4]
  - @leafygreen-ui/icon@11.0.0
  - @leafygreen-ui/button@12.0.1

## 3.0.0

### Minor Changes

- 857a680a: Adds support for positioning popover elements relative to elements within a scroll container other than the window.
  Adds support for setting z-index on popover elements with the `zIndex` prop.

### Patch Changes

- Updated dependencies [857a680a]
- Updated dependencies [857a680a]
  - @leafygreen-ui/leafygreen-provider@2.1.0
  - @leafygreen-ui/popover@7.2.0
  - @leafygreen-ui/button@12.0.0

## 2.1.0

### Minor Changes

- 559ceb15: Support a prop to disable the option to deselect

## 2.0.5

### Patch Changes

- 83fbfa53: Updates styles for a focused Option component to improve the contrast ratio.

## 2.0.4

### Patch Changes

- 90321b36: Imports validateProps functions from `@leafygreen-ui/a11y` package.
- ab581f34: Re-released components that were erroneously released without `.d.ts` files
- Updated dependencies [ab581f34]
- Updated dependencies [90321b36]
  - @leafygreen-ui/button@11.0.2
  - @leafygreen-ui/palette@3.2.1
  - @leafygreen-ui/lib@7.0.0
  - @leafygreen-ui/icon@10.2.1
  - @leafygreen-ui/leafygreen-provider@2.0.3
  - @leafygreen-ui/popover@7.1.4
  - @leafygreen-ui/tokens@0.5.1

## 2.0.3

### Patch Changes

- 65032024: Updates component to Button v11
- Updated dependencies [65032024]
- Updated dependencies [65032024]
  - @leafygreen-ui/palette@3.2.0
  - @leafygreen-ui/button@11.0.0

## 2.0.2

### Patch Changes

- 139694ea: Removes `role="combobox"` from Select dropdown

## 2.0.1

### Patch Changes

- Updated dependencies [ec27f36e]
  - @leafygreen-ui/icon@10.0.0

## 2.0.0

### Major Changes

- cc921a0e: Consuming applications can now set the width of the select dropdown by passing a value to width through the `className` prop.

## 1.1.4

### Patch Changes

- d85f65de: Adds accessible name to ARIA input field

## 1.1.3

### Patch Changes

- Updated dependencies [f805b772]
  - @leafygreen-ui/icon@9.0.0

## 1.1.2

### Patch Changes

- bf8b83e1: Sets aria `role="presentation"` on Caret in the component's menu button
- Updated dependencies [bf8b83e1]
- Updated dependencies [dca5605b]
  - @leafygreen-ui/icon@8.0.1
  - @leafygreen-ui/popover@7.1.2

## 1.1.1

### Patch Changes

- Updated dependencies [ba56b1cc]
  - @leafygreen-ui/icon@8.0.0

## 1.1.0

### Minor Changes

- 102ebc1e: - Adds a `usePortal` prop
  - Explicitly defines `font-family` for text elements within component
  - Sets label and description display properties to `block`

### Patch Changes

- 9812c9c9: Fixes bug where when a non-centered `Option` is clicked, the component will scroll to center that element instead of being selected.
  Now, when an element is clicked, it becomes selected. When opening the dropdown later, the selected item should then be centered.
- Updated dependencies [2daf1808]
- Updated dependencies [a6360ea1]
  - @leafygreen-ui/icon@7.1.0
  - @leafygreen-ui/popover@7.1.1

## 1.0.0

### Major Changes

- 0963164a: Initial release of Select component
