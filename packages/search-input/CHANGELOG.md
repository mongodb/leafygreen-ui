# @leafygreen-ui/search-input

## 2.0.10

### Patch Changes

- e8ef95e6: Updates disabled styles

## 2.0.9

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/leafygreen-provider@3.1.4
  - @leafygreen-ui/input-option@1.0.6
  - @leafygreen-ui/icon-button@15.0.14
  - @leafygreen-ui/polymorphic@1.3.3
  - @leafygreen-ui/typography@16.5.2
  - @leafygreen-ui/emotion@4.0.5
  - @leafygreen-ui/palette@4.0.5
  - @leafygreen-ui/popover@11.0.13
  - @leafygreen-ui/tokens@2.1.2
  - @leafygreen-ui/hooks@7.7.6
  - @leafygreen-ui/a11y@1.4.5
  - @leafygreen-ui/icon@11.20.1
  - @leafygreen-ui/lib@10.4.1

## 2.0.8

### Patch Changes

- 76161cf0: Updates stories for Chromatic testing
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [735342e9]
- Updated dependencies [95f5107a]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
  - @leafygreen-ui/lib@10.4.0
  - @leafygreen-ui/hooks@7.7.5
  - @leafygreen-ui/icon@11.17.0
  - @leafygreen-ui/popover@11.0.12
  - @leafygreen-ui/icon-button@15.0.12
  - @leafygreen-ui/input-option@1.0.5
  - @leafygreen-ui/tokens@2.1.1
  - @leafygreen-ui/typography@16.5.1

## 2.0.7

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x
- Updated dependencies [d2ce54e2f]
- Updated dependencies [75099c60b]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
  - @leafygreen-ui/hooks@7.7.4
  - @leafygreen-ui/icon@11.16.1
  - @leafygreen-ui/icon-button@15.0.11
  - @leafygreen-ui/input-option@1.0.4
  - @leafygreen-ui/leafygreen-provider@3.1.3
  - @leafygreen-ui/lib@10.3.4
  - @leafygreen-ui/polymorphic@1.3.2
  - @leafygreen-ui/popover@11.0.10
  - @leafygreen-ui/typography@16.5.0

## 2.0.6

### Patch Changes

- f3b3b2fa5: Allow onKeyDown prop to propagate to the user
- Updated dependencies [6a3f03fd2]
  - @leafygreen-ui/typography@16.4.1

## 2.0.5

### Patch Changes

- 5a9a67a35: Fixes a bug where SearchInputs without a menu would require two clicks outside the element to be un-focused
- Updated dependencies [dff6c306e]
  - @leafygreen-ui/icon@11.16.0

## 2.0.4

### Patch Changes

- 0f7a92d39: Updates README.md and adds `@internal` tag inside `SearchResultsMenu` components so it's props are not shown on .design.
- 73cbbd02c: Uses fontWeight token from `@leafygreen-ui/tokens`
- Updated dependencies [73cbbd02c]
- Updated dependencies [32b3d3146]
- Updated dependencies [8ece56980]
- Updated dependencies [83fc5b31b]
- Updated dependencies [9bcf8b925]
- Updated dependencies [8ece56980]
- Updated dependencies [32b3d3146]
- Updated dependencies [73cbbd02c]
  - @leafygreen-ui/tokens@2.1.0
  - @leafygreen-ui/a11y@1.4.3
  - @leafygreen-ui/popover@11.0.9
  - @leafygreen-ui/icon@11.14.0
  - @leafygreen-ui/typography@16.4.0
  - @leafygreen-ui/hooks@7.7.2

## 2.0.3

### Patch Changes

- 55d33e435: Update to BaseFontSize prop control for .design live example
- Updated dependencies [55d33e435]
- Updated dependencies [77320a6b8]
- Updated dependencies [07db42330]
- Updated dependencies [55d33e435]
- Updated dependencies [cf00160ec]
- Updated dependencies [ce0fcb3f6]
- Updated dependencies [111b680c5]
- Updated dependencies [77320a6b8]
  - @leafygreen-ui/input-option@1.0.3
  - @leafygreen-ui/lib@10.3.3
  - @leafygreen-ui/palette@4.0.4
  - @leafygreen-ui/typography@16.3.0
  - @leafygreen-ui/icon-button@15.0.10
  - @leafygreen-ui/popover@11.0.8
  - @leafygreen-ui/tokens@2.0.3

## 2.0.2

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/a11y@1.4.2
  - @leafygreen-ui/emotion@4.0.4
  - @leafygreen-ui/hooks@7.7.1
  - @leafygreen-ui/icon@11.13.1
  - @leafygreen-ui/icon-button@15.0.9
  - @leafygreen-ui/input-option@1.0.2
  - @leafygreen-ui/leafygreen-provider@3.1.2
  - @leafygreen-ui/lib@10.3.2
  - @leafygreen-ui/palette@4.0.3
  - @leafygreen-ui/polymorphic@1.3.1
  - @leafygreen-ui/popover@11.0.7
  - @leafygreen-ui/tokens@2.0.2
  - @leafygreen-ui/typography@16.2.1

## 2.0.1

### Patch Changes

- b9841decc: Improves prop types and polymorphic support
- Updated dependencies [5b036515e]
- Updated dependencies [b9841decc]
- Updated dependencies [26e341a0b]
- Updated dependencies [997121cc3]
- Updated dependencies [eb0cc4498]
  - @leafygreen-ui/palette@4.0.0
  - @leafygreen-ui/polymorphic@1.2.0
  - @leafygreen-ui/lib@10.2.2
  - @leafygreen-ui/icon@11.12.5
  - @leafygreen-ui/typography@16.1.0
  - @leafygreen-ui/icon-button@15.0.7
  - @leafygreen-ui/input-option@1.0.1
  - @leafygreen-ui/tokens@2.0.1

## 2.0.0

### Major Changes

- ec2a3d66d: Adds typehead functionality. Developers can now provide `SearchResult` elements as children to display a menu of results. `SearchInput` fires a `change` event when search text changes, and a form `submit` event when a result is clicked, and whenever the `enter` key is pressed (note: the default `submit` event behavior is prevented). `SearchResult` elements also fire a `click` event when clicked

### Patch Changes

- Updated dependencies [0541bd776]
- Updated dependencies [ec2a3d66d]
- Updated dependencies [ec2a3d66d]
- Updated dependencies [ec2a3d66d]
  - @leafygreen-ui/lib@10.2.0
  - @leafygreen-ui/hooks@7.6.0
  - @leafygreen-ui/input-option@1.0.0

## 1.0.4

### Patch Changes

- bf2fedf6d: Version bumps lib
- Updated dependencies [bf2fedf6d]
  - @leafygreen-ui/leafygreen-provider@3.1.1

## 1.0.3

### Patch Changes

- Updated dependencies [050f1f8a9]
- Updated dependencies [741cdd408]
- Updated dependencies [b24b21462]
  - @leafygreen-ui/icon@11.12.4
  - @leafygreen-ui/tokens@2.0.0
  - @leafygreen-ui/palette@3.4.7

## 1.0.2

### Patch Changes

- b7f7a4c95: Updates package dependencies & devDependencies, and ensures each package is appropriately listed. Ensures `tsconfig` has no circular dependencies
- Updated dependencies [b7f7a4c95]
  - @leafygreen-ui/icon@11.12.2
  - @leafygreen-ui/palette@3.4.5
  - @leafygreen-ui/tokens@1.4.1

## 1.0.1

### Patch Changes

- a1d093f30: Resolves aria type issues
- ae5421cf6: Updates components to use internal transition tokens
- Updated dependencies [ae5421cf6]
- Updated dependencies [4b4c2d27d]
- Updated dependencies [1a335d0b2]
  - @leafygreen-ui/tokens@1.4.0
  - @leafygreen-ui/icon@11.12.1

## 1.0.0

### Minor Changes

- 3cb2e1f7: First iteration of the SearchInput - currently without loading state and typeahead search behavior supported

### Patch Changes

- Updated dependencies [b9b09a86]
  - @leafygreen-ui/leafygreen-provider@3.1.0
