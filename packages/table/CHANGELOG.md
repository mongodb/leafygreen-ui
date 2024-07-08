# @leafygreen-ui/table

## 12.6.4

### Patch Changes

- Updated dependencies [4fb369df7]
- Updated dependencies [7a901b954]
- Updated dependencies [7a901b954]
- Updated dependencies [7a901b954]
- Updated dependencies [342ab81b0]
- Updated dependencies [29d50edaa]
  - @leafygreen-ui/typography@19.2.0
  - @leafygreen-ui/polymorphic@2.0.0
  - @leafygreen-ui/lib@13.6.0
  - @leafygreen-ui/icon@12.5.4
  - @leafygreen-ui/tokens@2.9.0

## 12.6.3

### Patch Changes

- 1ec45a7e: Updates internal test suite
- Updated dependencies [dfd6972c]
- Updated dependencies [1ec45a7e]
  - @leafygreen-ui/typography@19.0.0
  - @leafygreen-ui/checkbox@13.1.0

## 12.6.2

### Patch Changes

- 15185af0: Imports Storybook utilities from `@lg-tools/storybook-utils` (previously imported from `@leafygreen-ui/lib`)
- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [7a0ff1be]
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [66df9ab8]
- Updated dependencies [7a0ff1be]
  - @leafygreen-ui/typography@18.3.0
  - @leafygreen-ui/leafygreen-provider@3.1.12
  - @leafygreen-ui/icon-button@15.0.21
  - @leafygreen-ui/checkbox@13.0.0
  - @leafygreen-ui/icon@12.0.1
  - @leafygreen-ui/lib@13.3.0
  - @leafygreen-ui/emotion@4.0.8
  - @leafygreen-ui/hooks@8.1.3
  - @leafygreen-ui/palette@4.0.9
  - @leafygreen-ui/polymorphic@1.3.7
  - @leafygreen-ui/tokens@2.5.2

## 12.6.1

### Patch Changes

- Updated dependencies [74057388]
  - @leafygreen-ui/icon@12.0.0
  - @leafygreen-ui/icon-button@15.0.20
  - @leafygreen-ui/typography@18.2.3

## 12.6.0

### Minor Changes

- ea5f49d2: Exports all utilities from @tanstack/react-table for consumption

### Patch Changes

- e487fb24: Renames story files from `.story.tsx` to `.stories.tsx`
- Updated dependencies [58f4a4c5]
- Updated dependencies [5ee54143]
- Updated dependencies [e487fb24]
  - @leafygreen-ui/typography@18.2.2
  - @leafygreen-ui/tokens@2.5.1
  - @leafygreen-ui/checkbox@12.1.1
  - @leafygreen-ui/hooks@8.1.2
  - @leafygreen-ui/icon@11.29.1

## 12.5.0

### Minor Changes

- 744092c8: Exposes `virtualizerOptions` property in `useLeafyGreenTable` options. This is used to define options for `react-virtual`.
  As of now, we have `react-virtual@2.10.4` as out virtualizer dependency. Virtualizer options for this version can be found [on GitHub](https://github.com/TanStack/virtual/blob/v2/docs/src/pages/docs/api.md)
  Resolves [LG-3984](https://jira.mongodb.org/browse/LG-3984)

### Patch Changes

- 744092c8: Fixes a bug where nested row chevrons and selectable row checkboxes would be rendered above a sticky header.
  [Jira Ticket](https://jira.mongodb.org/browse/LG-4037)
- Updated dependencies [c2854e9b]
- Updated dependencies [11d12cc4]
  - @leafygreen-ui/tokens@2.4.0
  - @leafygreen-ui/typography@18.2.1

## 12.4.1

### Patch Changes

- 2bceccb1: Fixes `lodash` imports to use default exports of specific functions to reduce component's bundle size.
- Updated dependencies [2bceccb1]
- Updated dependencies [2645cd50]
  - @leafygreen-ui/hooks@8.1.1
  - @leafygreen-ui/lib@13.2.1
  - @leafygreen-ui/tokens@2.3.0

## 12.4.0

### Minor Changes

- bb8987d6: Adds `contentClassName` prop, applied to the inner `div` of the Cell
- bb8987d6: Adds `overflow` prop to `Cell` component. By default there is no change. When `overflow === 'truncate'`, the styling of the cell is updated (if necessary) to be aligned to the top, with an ellipsis after 2 lines of text.
- bb8987d6: Nested rows now support animations for content taller than 40px

## 12.3.0

### Minor Changes

- 91372fff: useLeafygreenTable now exposes an `scrollToIndex` method for virtualized tables.

## 12.2.0

### Minor Changes

- c080ec01: Table now exposes an optional second generic type for useLeafyGreenTable that controls the type of the value

### Patch Changes

- 9a35ec36: Fixes style bug where zebra row colors override selected row colors
- Updated dependencies [9b7a8236]
- Updated dependencies [7f38e78a]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
  - @leafygreen-ui/icon@11.27.1
  - @leafygreen-ui/leafygreen-provider@3.1.11
  - @leafygreen-ui/hooks@8.1.0
  - @leafygreen-ui/lib@13.2.0
  - @leafygreen-ui/typography@18.1.0

## 12.1.4

### Patch Changes

- 0e10308a: Cells are now compatible with styled components

## 12.1.3

### Patch Changes

- 86a10028: Updated README to reference TanStack's `react-table` component
- e516c359: useLeafyGreenTable now memoizes its column prop to improve performance
- Updated dependencies [e3f4d9ce]
- Updated dependencies [89f439e8]
- Updated dependencies [c41752d2]
- Updated dependencies [89332190]
  - @leafygreen-ui/typography@18.0.1
  - @leafygreen-ui/hooks@8.0.1
  - @leafygreen-ui/icon@11.25.0

## 12.1.2

### Patch Changes

- c05ac7f1: Moving stories for virtualized scrolling to allow .design to correctly locate the right LiveExample story
- Updated dependencies [dd4f3da8]
- Updated dependencies [784e9d8a]
- Updated dependencies [90053e16]
  - @leafygreen-ui/lib@13.0.0
  - @leafygreen-ui/icon-button@15.0.19
  - @leafygreen-ui/typography@18.0.0
  - @leafygreen-ui/checkbox@12.0.20
  - @leafygreen-ui/leafygreen-provider@3.1.10

## 12.1.1

### Patch Changes

- 11089c73: Checkboxes in Tables are now styled different for better contrast

## 12.1.0

### Minor Changes

- e3a4b391: useLeafyGreenTable now accepts an `allowSelectAll` prop to toggle a checkbox in the header row

### Patch Changes

- 853d6ec6: Addresses ignored TS issues in V11Adapter
- Updated dependencies [3a9b274d]
  - @leafygreen-ui/lib@12.0.0
  - @leafygreen-ui/checkbox@12.0.19
  - @leafygreen-ui/icon-button@15.0.18
  - @leafygreen-ui/leafygreen-provider@3.1.9
  - @leafygreen-ui/typography@17.0.1

## 12.0.10

### Patch Changes

- f8bfa386: Fixes bug in V11Adapter where not all props on rows and cells were not being passed to their rendered elements
- Updated dependencies [a5770c15]
- Updated dependencies [c89d17a4]
  - @leafygreen-ui/typography@17.0.0
  - @leafygreen-ui/checkbox@12.0.18

## 12.0.9

### Patch Changes

- Updated dependencies [3fe03b50]
- Updated dependencies [fd907503]
- Updated dependencies [c9f0055a]
- Updated dependencies [56459cde]
  - @leafygreen-ui/tokens@2.2.0
  - @leafygreen-ui/hooks@8.0.0
  - @leafygreen-ui/icon@11.23.0
  - @leafygreen-ui/checkbox@12.0.17
  - @leafygreen-ui/leafygreen-provider@3.1.8

## 12.0.8

### Patch Changes

- 4fcf2e94: Adds a `nodeRef` to <Transition> to get rid of StrictMode warnings
- 4fcf2e94: Updates types with `React.PropsWithChildren`
- 4fcf2e94: Bumps `react-transition-group` to `^4.4.5`.
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
  - @leafygreen-ui/icon@11.22.2
  - @leafygreen-ui/lib@11.0.0
  - @leafygreen-ui/checkbox@12.0.16
  - @leafygreen-ui/polymorphic@1.3.6
  - @leafygreen-ui/icon-button@15.0.17
  - @leafygreen-ui/leafygreen-provider@3.1.7
  - @leafygreen-ui/typography@16.5.5

## 12.0.7

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/checkbox@12.0.15
  - @leafygreen-ui/emotion@4.0.7
  - @leafygreen-ui/hooks@7.7.8
  - @leafygreen-ui/icon@11.22.1
  - @leafygreen-ui/icon-button@15.0.16
  - @leafygreen-ui/leafygreen-provider@3.1.6
  - @leafygreen-ui/lib@10.4.3
  - @leafygreen-ui/palette@4.0.7
  - @leafygreen-ui/polymorphic@1.3.5
  - @leafygreen-ui/tokens@2.1.4
  - @leafygreen-ui/typography@16.5.4

## 12.0.6

### Patch Changes

- c15ee2ac: Fixes missing documentation file
- Updated dependencies [f73807cf]
- Updated dependencies [31c09354]
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/icon@11.22.0
  - @leafygreen-ui/checkbox@12.0.14
  - @leafygreen-ui/emotion@4.0.6
  - @leafygreen-ui/hooks@7.7.7
  - @leafygreen-ui/icon-button@15.0.15
  - @leafygreen-ui/leafygreen-provider@3.1.5
  - @leafygreen-ui/lib@10.4.2
  - @leafygreen-ui/palette@4.0.6
  - @leafygreen-ui/polymorphic@1.3.4
  - @leafygreen-ui/tokens@2.1.3
  - @leafygreen-ui/typography@16.5.3

## 12.0.5

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/leafygreen-provider@3.1.4
  - @leafygreen-ui/icon-button@15.0.14
  - @leafygreen-ui/polymorphic@1.3.3
  - @leafygreen-ui/typography@16.5.2
  - @leafygreen-ui/checkbox@12.0.13
  - @leafygreen-ui/emotion@4.0.5
  - @leafygreen-ui/palette@4.0.5
  - @leafygreen-ui/tokens@2.1.2
  - @leafygreen-ui/hooks@7.7.6
  - @leafygreen-ui/icon@11.20.1
  - @leafygreen-ui/lib@10.4.1

## 12.0.4

### Patch Changes

- 76161cf0: Minor fixes to stories
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
  - @leafygreen-ui/checkbox@12.0.12
  - @leafygreen-ui/icon-button@15.0.12
  - @leafygreen-ui/tokens@2.1.1
  - @leafygreen-ui/typography@16.5.1

## 12.0.3

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x
- Updated dependencies [d2ce54e2f]
- Updated dependencies [75099c60b]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
  - @leafygreen-ui/checkbox@12.0.11
  - @leafygreen-ui/hooks@7.7.4
  - @leafygreen-ui/icon@11.16.1
  - @leafygreen-ui/icon-button@15.0.11
  - @leafygreen-ui/leafygreen-provider@3.1.3
  - @leafygreen-ui/lib@10.3.4
  - @leafygreen-ui/polymorphic@1.3.2
  - @leafygreen-ui/typography@16.5.0

## 12.0.2

### Patch Changes

- a3a52e131: Bumps to use new `useIdAllocator` hook
- Updated dependencies [614f7617d]
- Updated dependencies [a3a52e131]
- Updated dependencies [614f7617d]
- Updated dependencies [a3a52e131]
  - @leafygreen-ui/icon@11.15.0
  - @leafygreen-ui/hooks@7.7.3
  - @leafygreen-ui/checkbox@12.0.10

## 12.0.1

### Patch Changes

- 32b3d3146: Bumps to use new `useIdAllocator` hook
- Updated dependencies [73cbbd02c]
- Updated dependencies [32b3d3146]
- Updated dependencies [83fc5b31b]
- Updated dependencies [9bcf8b925]
- Updated dependencies [8ece56980]
- Updated dependencies [32b3d3146]
- Updated dependencies [73cbbd02c]
  - @leafygreen-ui/tokens@2.1.0
  - @leafygreen-ui/checkbox@12.0.9
  - @leafygreen-ui/icon@11.14.0
  - @leafygreen-ui/typography@16.4.0
  - @leafygreen-ui/hooks@7.7.2

## 12.0.0

### Major Changes

- 632f0a461: - API changes to ensure react-table exports are not required in usage
  - See [upgrade guide](https://github.com/mongodb/leafygreen-ui/blob/main/packages/table/UPGRADE.md) for details

### Patch Changes

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
  - @leafygreen-ui/icon-button@15.0.10
  - @leafygreen-ui/tokens@2.0.3

## 11.0.3

### Patch Changes

- 31d768e36: - Move `@tanstack/react-table` back to dependencies
  - Types Table component and fixes issues in generated code docs documentation
  - Removes `table-layout: fixed`
- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/checkbox@12.0.8
  - @leafygreen-ui/emotion@4.0.4
  - @leafygreen-ui/hooks@7.7.1
  - @leafygreen-ui/icon@11.13.1
  - @leafygreen-ui/icon-button@15.0.9
  - @leafygreen-ui/leafygreen-provider@3.1.2
  - @leafygreen-ui/lib@10.3.2
  - @leafygreen-ui/palette@4.0.3
  - @leafygreen-ui/polymorphic@1.3.1
  - @leafygreen-ui/tokens@2.0.2
  - @leafygreen-ui/typography@16.2.1

## 11.0.2

### Patch Changes

- ac1f22714: \[DEPRECATED\] `@tanstack/react-table` was moved back to dependencies in v11.0.3 to prevent a breaking change. ~~Types Table component and fixes issues in generated code docs documentation~~
- ~~Updated dependencies [dc8ceed9b]~~
- ~~Updated dependencies [09775f0ac]~~
  - ~~@leafygreen-ui/icon@11.13.0~~
  - ~~@leafygreen-ui/palette@4.0.2~~

## 11.0.1

### Patch Changes

- a11f4f836: \[DEPRECATED\] `@tanstack/react-table` was moved back to dependencies in v11.0.3 to prevent a breaking change. ~~Support Fragments in Table DOM tree; move @tanstack dependencies to peerDependencies~~

## 11.0.0

### Major Changes

- 89ede28ec: Rewrite of Table component, which includes support for new features: virtual scrolling, selectable rows, etc. See [upgrade guide](https://github.com/mongodb/leafygreen-ui/blob/main/packages/table/UPGRADE.md) for details

### Patch Changes

- c2c5601f4: Adds missing dependencies. Removes unused dependencies
- Updated dependencies [ece595acd]
- Updated dependencies [9858ab8c5]
- Updated dependencies [3ef365fd3]
- Updated dependencies [89ede28ec]
- Updated dependencies [d351c02bc]
- Updated dependencies [c2c5601f4]
  - @leafygreen-ui/typography@16.2.0
  - @leafygreen-ui/polymorphic@1.3.0
  - @leafygreen-ui/icon-button@15.0.8
  - @leafygreen-ui/hooks@7.7.0
  - @leafygreen-ui/icon@11.12.7
  - @leafygreen-ui/lib@10.3.1
  - @leafygreen-ui/palette@4.0.1

## 10.0.3

### Patch Changes

- Updated dependencies [5b036515e]
- Updated dependencies [26e341a0b]
- Updated dependencies [997121cc3]
- Updated dependencies [eb0cc4498]
  - @leafygreen-ui/palette@4.0.0
  - @leafygreen-ui/lib@10.2.2
  - @leafygreen-ui/icon@11.12.5
  - @leafygreen-ui/typography@16.1.0
  - @leafygreen-ui/icon-button@15.0.7
  - @leafygreen-ui/tokens@2.0.1

## 10.0.2

### Patch Changes

- bf2fedf6d: Version bumps lib
- Updated dependencies [ffb99f417]
- Updated dependencies [bf2fedf6d]
- Updated dependencies [b7a29ea38]
  - @leafygreen-ui/hooks@7.5.0
  - @leafygreen-ui/icon-button@15.0.6
  - @leafygreen-ui/leafygreen-provider@3.1.1
  - @leafygreen-ui/typography@16.0.1

## 10.0.1

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

## 10.0.0

### Major Changes

- 07331dad9: Updates `Table` for dark mode brand refresh.

### Patch Changes

- Updated dependencies [b7f7a4c95]
  - @leafygreen-ui/icon@11.12.2
  - @leafygreen-ui/icon-button@15.0.2
  - @leafygreen-ui/palette@3.4.5
  - @leafygreen-ui/tokens@1.4.1
  - @leafygreen-ui/typography@15.1.1

## 9.0.1

### Patch Changes

- ed0e425e5: Adds `polished` as an explicit dependency
- ae5421cf6: Updates components to use internal transition tokens
- Updated dependencies [ae5421cf6]
- Updated dependencies [4b4c2d27d]
- Updated dependencies [1a335d0b2]
- Updated dependencies [ae5421cf6]
  - @leafygreen-ui/tokens@1.4.0
  - @leafygreen-ui/icon@11.12.1
  - @leafygreen-ui/icon-button@15.0.1

## 9.0.0

### Patch Changes

- Updated dependencies [b9b09a86]
  - @leafygreen-ui/leafygreen-provider@3.1.0
  - @leafygreen-ui/icon-button@15.0.0

## 8.0.0

### Major Changes

- f2d63a60: Removes leafygreen data attributes (prefixed with `data-leafygreen-ui-`), and replaces them with deterministic classNames (prefixed with `lg-ui-`)

### Minor Changes

- 42024a44: Adds `index` property to `children` function callback

### Patch Changes

- 2195359a: Updates some packges to use a caret instead of an exact version
- Updated dependencies [2195359a]
- Updated dependencies [209f77ed]
- Updated dependencies [f2d63a60]
  - @leafygreen-ui/icon-button@14.0.1
  - @leafygreen-ui/icon@11.12.0
  - @leafygreen-ui/lib@10.0.0
  - @leafygreen-ui/leafygreen-provider@3.0.1

## 7.0.0

### Patch Changes

- Updated dependencies [e399f1b9]
- Updated dependencies [e399f1b9]
  - @leafygreen-ui/leafygreen-provider@3.0.0
  - @leafygreen-ui/icon-button@14.0.0

## 6.1.1

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.
- Updated dependencies [24683433]
  - @leafygreen-ui/emotion@4.0.3
  - @leafygreen-ui/hooks@7.3.3
  - @leafygreen-ui/icon@11.11.1
  - @leafygreen-ui/icon-button@13.2.1
  - @leafygreen-ui/leafygreen-provider@2.3.5
  - @leafygreen-ui/lib@9.5.1
  - @leafygreen-ui/palette@3.4.4
  - @leafygreen-ui/tokens@1.3.4

## 6.1.0

### Minor Changes

- 3690df49: Updates TypeScript annotations, type structures and export format of some components

### Patch Changes

- 3690df49: Updates Storybook configs
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [58a5a05e]
  - @leafygreen-ui/icon@11.11.0
  - @leafygreen-ui/icon-button@13.2.0
  - @leafygreen-ui/lib@9.5.0
  - @leafygreen-ui/emotion@4.0.2
  - @leafygreen-ui/hooks@7.3.2
  - @leafygreen-ui/leafygreen-provider@2.3.4
  - @leafygreen-ui/palette@3.4.3
  - @leafygreen-ui/tokens@1.3.3

## 6.0.1

### Patch Changes

- 38f3effb: Removes external package `use-ssr`

## 6.0.0

### Major Changes

- 885226db: Changing default alignment of cell content from baseline to top

### Patch Changes

- 809a098e: Improves handling of open/close transition for tall nested content
- 8d7534e9: Adds `tsdoc.json` to published package files
- Updated dependencies [7caa1c3e]
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/icon@11.10.2
  - @leafygreen-ui/emotion@4.0.1
  - @leafygreen-ui/hooks@7.3.1
  - @leafygreen-ui/icon-button@13.1.1
  - @leafygreen-ui/leafygreen-provider@2.3.3
  - @leafygreen-ui/lib@9.4.2
  - @leafygreen-ui/palette@3.4.2
  - @leafygreen-ui/tokens@1.3.2

## 5.0.3

### Patch Changes

- (Hot-fix): Removes external package `use-ssr`

## 5.0.2

### Patch Changes

- Updated dependencies [30e038a3]
  - @leafygreen-ui/palette@3.4.1

## 5.0.1

### Patch Changes

- 8892dd16: Remove checkbox dependency
- Updated dependencies [65c86281]
  - @leafygreen-ui/icon-button@13.1.0

## 5.0.0

### Patch Changes

- Updated dependencies [85d46871]
- Updated dependencies [99e20bb9]
  - @leafygreen-ui/lib@9.4.0
  - @leafygreen-ui/leafygreen-provider@2.3.0
  - @leafygreen-ui/checkbox@9.0.0
  - @leafygreen-ui/icon-button@13.0.0

## 4.1.1

### Patch Changes

- 96d1ff9c: Updates to propTypes, TSDocs, and Storybook controls
- Updated dependencies [1356d50d]
- Updated dependencies [6a89bc29]
- Updated dependencies [fd2f6de0]
- Updated dependencies [6792bc44]
- Updated dependencies [96d1ff9c]
- Updated dependencies [422dbfcd]
- Updated dependencies [9ff90d4b]
  - @leafygreen-ui/checkbox@8.0.3
  - @leafygreen-ui/palette@3.4.0
  - @leafygreen-ui/hooks@7.3.0
  - @leafygreen-ui/icon-button@11.0.2
  - @leafygreen-ui/tokens@1.3.1
  - @leafygreen-ui/lib@9.3.0

## 4.1.0

### Minor Changes

- 2f357a54: Updating isHeader styles in Cell component; adding isAltColor prop to Cell component

### Patch Changes

- 14614768: Removing not-allowed cursor from disabled rows
- Updated dependencies [1fb8ab18]
- Updated dependencies [bc2558c5]
  - @leafygreen-ui/checkbox@8.0.1
  - @leafygreen-ui/icon-button@11.0.1

## 4.0.0

### Major Changes

- Updated dependencies [500d6c60]
  - @leafygreen-ui/leafygreen-provider@2.2.0

### Patch Changes

- Updated dependencies [e13d2487]
- Updated dependencies [5f28fce1]
- Updated dependencies [c48e943e]
- Updated dependencies [500d6c60]
  - @leafygreen-ui/checkbox@8.0.0
  - @leafygreen-ui/icon-button@11.0.0
  - @leafygreen-ui/tokens@1.3.0
  - @leafygreen-ui/icon@11.9.0

## 3.0.2

### Patch Changes

- ae4704d7: Creates a new stacking context for the Table component

## 3.0.1

### Patch Changes

- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
  - @leafygreen-ui/lib@9.2.0
  - @leafygreen-ui/icon@11.8.0
  - @leafygreen-ui/checkbox@7.0.0
  - @leafygreen-ui/palette@3.3.2

## 3.0.0

### Major Changes

- 614be76: Updates Table styles according to visual brand refresh

### Patch Changes

- Updated dependencies [614be76]
  - @leafygreen-ui/tokens@1.1.0

## 2.0.7

### Patch Changes

- (Hot-fix): Removes external package `use-ssr`

## 2.0.6

### Patch Changes

- Updated dependencies [ded2831]
  - @leafygreen-ui/palette@3.3.0

## 2.0.5

### Patch Changes

- de89c3c7: Updates nested rows to fix animations and enable variable row height
- Updated dependencies [d4a46e27]
- Updated dependencies [cec710ad]
  - @leafygreen-ui/icon@11.6.0
  - @leafygreen-ui/lib@9.0.1

## 2.0.4

### Patch Changes

- Updated dependencies [f6e5655a]
- Updated dependencies [f6e5655a]
- Updated dependencies [03388ff2]
- Updated dependencies [b8f03aa1]
  - @leafygreen-ui/emotion@4.0.0
  - @leafygreen-ui/palette@3.2.2
  - @leafygreen-ui/icon@11.3.0
  - @leafygreen-ui/lib@9.0.0
  - @leafygreen-ui/icon-button@9.1.6
  - @leafygreen-ui/checkbox@6.0.6
  - @leafygreen-ui/leafygreen-provider@2.1.3

## 2.0.3

### Patch Changes

- Updated dependencies [e1af3278]
- Updated dependencies [047c1930]
- Updated dependencies [047c1930]
  - @leafygreen-ui/icon-button@9.1.5
  - @leafygreen-ui/lib@8.0.0
  - @leafygreen-ui/hooks@7.0.0
  - @leafygreen-ui/checkbox@6.0.4
  - @leafygreen-ui/icon@11.1.1
  - @leafygreen-ui/leafygreen-provider@2.1.2

## 2.0.2

### Patch Changes

- 931fde4c: darkMode missing from useMemo dep array in Row component

## 2.0.1

### Patch Changes

- Updated dependencies [faeb0ce0]
  - @leafygreen-ui/icon@11.0.0

## 2.0.0

### Patch Changes

- Updated dependencies [857a680a]
  - @leafygreen-ui/leafygreen-provider@2.1.0

## 1.5.1

### Patch Changes

- 8335c09d: Ensures that cells with a value of 0 render properly in the table

## 1.5.0

### Minor Changes

- de06ae10: Adds `baseFontSize` prop to Table component

## 1.4.0

### Minor Changes

- deeb6cca: Adds `darkMode` prop to Table component

## 1.3.9

### Patch Changes

- ab581f34: Re-released components that were erroneously released without `.d.ts` files
- Updated dependencies [90321b36]
- Updated dependencies [ab581f34]
- Updated dependencies [90321b36]
  - @leafygreen-ui/icon-button@9.1.3
  - @leafygreen-ui/palette@3.2.1
  - @leafygreen-ui/lib@7.0.0
  - @leafygreen-ui/checkbox@6.0.3
  - @leafygreen-ui/icon@10.2.1

## 1.3.8

### Patch Changes

- Updated dependencies [65032024]
  - @leafygreen-ui/palette@3.2.0

## 1.3.7

### Patch Changes

- Updated dependencies [99ea9436]
- Updated dependencies [ec27f36e]
  - @leafygreen-ui/icon-button@9.1.2
  - @leafygreen-ui/icon@10.0.0

## 1.3.6

### Patch Changes

- 1ed17f68: Updates lodash to 4.17.21, as there's a vulnerability in 4.17.20 that's been resolved in 4.17.21
- Updated dependencies [1ed17f68]
  - @leafygreen-ui/hooks@6.0.1

## 1.3.5

### Patch Changes

- b1bb95d8: Fixes issue where table body content wasn't being rendered server-side.
- Updated dependencies [c8aee7eb]
  - @leafygreen-ui/palette@3.1.1

## 1.3.4

### Patch Changes

- Updated dependencies [f805b772]
  - @leafygreen-ui/icon@9.0.0

## 1.3.3

### Patch Changes

- 7ba9f4a8: Increases shadow when Table is scrollable

## 1.3.2

### Patch Changes

- bf58e7d5: Improves default accessibility of Table component by adding the "scope" attribute to column header elements.
- Updated dependencies [ba56b1cc]
  - @leafygreen-ui/icon@8.0.0

## 1.3.1

### Patch Changes

- 8ac6e396: Updates some of the attributes of internal elements to provide better accessibility to screen readers.

## 1.3.0

### Minor Changes

- 3bf125b7: Adds isHeader prop to Cell component to allow for row headers.

## 1.2.1

### Patch Changes

- ee7923d3: Changes how we extend the types of HTMLElements, and standardizes how we document this across readmes
- Updated dependencies [ee7923d3]
- Updated dependencies [ee7923d3]
- Updated dependencies [627333c2]
- Updated dependencies [7b71da8f]
  - @leafygreen-ui/checkbox@6.0.2
  - @leafygreen-ui/lib@6.1.2
  - @leafygreen-ui/icon-button@9.1.0
  - @leafygreen-ui/icon@7.0.2

## 1.2.0

### Minor Changes

- c18f16e6: Improves compatibility with React v17

### Patch Changes

- Updated dependencies [c18f16e6]
- Updated dependencies [c9a0d89f]
- Updated dependencies [9ee1d5fc]
  - @leafygreen-ui/hooks@6.0.0
  - @leafygreen-ui/palette@3.1.0
  - @leafygreen-ui/lib@6.1.1

## 1.1.0

### Minor Changes

- cf2f9422: Updates cell styles in Table component

## 1.0.0

### Major Changes

- 2643d4e7: Updates styles to no longer truncate large column data by default
- 034d3893: Adds `box-shadow` to table when its contents overflow

### Patch Changes

- Updated dependencies [5cf0c95c]
  - @leafygreen-ui/lib@6.1.0

## 0.2.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
  - @leafygreen-ui/checkbox@6.0.1
  - @leafygreen-ui/emotion@3.0.1
  - @leafygreen-ui/icon@7.0.1
  - @leafygreen-ui/icon-button@9.0.1
  - @leafygreen-ui/lib@6.0.1
  - @leafygreen-ui/palette@3.0.1

## 0.2.0

### Minor Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/checkbox@6.0.0
  - @leafygreen-ui/emotion@3.0.0
  - @leafygreen-ui/icon-button@9.0.0
  - @leafygreen-ui/icon@7.0.0
  - @leafygreen-ui/lib@6.0.0
  - @leafygreen-ui/palette@3.0.0

## 0.1.5

### Patch Changes

- e5ba48e6: Improve table re-rendering performance when changing the sort order.
- Updated dependencies [02ee0c05]
  - @leafygreen-ui/checkbox@5.0.0

## 0.1.4

### Patch Changes

- Updated dependencies [a84219f1]
  - @leafygreen-ui/icon-button@8.0.0

## 0.1.3

### Patch Changes

- cdb4c82: Updates Table documentation to represent default usage of `columns` prop. Additionally, now allows `<HeaderRow />` to be passed to `columns` prop
- Updated dependencies [e49d66b]
  - @leafygreen-ui/icon@6.5.0
  - @leafygreen-ui/icon-button@7.0.5

## 0.1.2

### Patch Changes

- bb5fb9d: Type fixes for Table
- Updated dependencies [699a65c]
  - @leafygreen-ui/icon@6.4.0
  - @leafygreen-ui/icon-button@7.0.2

## 0.1.1

### Patch Changes

- 2cdc994: Bumps lib dependency to latest and fixes idAllocator to be namespaced with table rather than text-input

## 0.1.0

### Minor Changes

- 463a338: Initial Release of Table component

### Patch Changes

- Updated dependencies [463a338]
- Updated dependencies [463a338]
  - @leafygreen-ui/icon-button@7.0.1
  - @leafygreen-ui/checkbox@4.1.1
