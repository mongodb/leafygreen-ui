# @leafygreen-ui/select

## 11.3.2

### Patch Changes

- Updated dependencies [dfd6972c]
- Updated dependencies [1ec45a7e]
  - @leafygreen-ui/typography@19.0.0
  - @leafygreen-ui/button@21.2.0
  - @leafygreen-ui/input-option@1.1.3

## 11.3.1

### Patch Changes

- 8adadc89: Fixes a bug that prevented packages from rendering in a server-side environment
- Updated dependencies [8adadc89]
  - @lg-tools/test-harnesses@0.1.2

## 11.3.0

### Minor Changes

- c3906f78: - Exports `getTestUtils`, a util to reliably interact with `LG Select` in a product test suite. For more details, check out the [README](https://github.com/mongodb/leafygreen-ui/tree/main/packages/select#test-harnesses) [LG-4129](https://jira.mongodb.org/browse/LG-4129)
  - Exports the constant, `LGIDS_SELECT` which stores `data-lgid` values.
  - Removes `role="presentation"` from `WarningIcon`

### Patch Changes

- 8aec541d: Correct `description` propType
- Updated dependencies [9402ba0e]
- Updated dependencies [9b71e34d]
- Updated dependencies [c3906f78]
- Updated dependencies [c3906f78]
- Updated dependencies [c3906f78]
- Updated dependencies [070736c4]
  - @leafygreen-ui/icon@12.1.0
  - @leafygreen-ui/typography@18.4.0
  - @leafygreen-ui/lib@13.4.0
  - @lg-tools/test-harnesses@0.1.1
  - @leafygreen-ui/palette@4.0.10

## 11.2.3

### Patch Changes

- 15185af0: Imports Storybook utilities from `@lg-tools/storybook-utils` (previously imported from `@leafygreen-ui/lib`)
- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [7a0ff1be]
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [66df9ab8]
  - @leafygreen-ui/typography@18.3.0
  - @leafygreen-ui/button@21.1.0
  - @leafygreen-ui/leafygreen-provider@3.1.12
  - @leafygreen-ui/popover@11.3.1
  - @leafygreen-ui/icon@12.0.1
  - @leafygreen-ui/lib@13.3.0
  - @leafygreen-ui/emotion@4.0.8
  - @leafygreen-ui/hooks@8.1.3
  - @leafygreen-ui/input-option@1.1.2
  - @leafygreen-ui/palette@4.0.9
  - @leafygreen-ui/tokens@2.5.2

## 11.2.2

### Patch Changes

- Updated dependencies [74057388]
  - @leafygreen-ui/icon@12.0.0
  - @leafygreen-ui/typography@18.2.3

## 11.2.1

### Patch Changes

- e487fb24: Renames story files from `.story.tsx` to `.stories.tsx`
- Updated dependencies [8ad4fdbc]
- Updated dependencies [58f4a4c5]
- Updated dependencies [5ee54143]
- Updated dependencies [e487fb24]
  - @leafygreen-ui/popover@11.3.0
  - @leafygreen-ui/typography@18.2.2
  - @leafygreen-ui/tokens@2.5.1
  - @leafygreen-ui/input-option@1.1.1
  - @leafygreen-ui/hooks@8.1.2
  - @leafygreen-ui/icon@11.29.1

## 11.2.0

### Minor Changes

- 36a8ded2: `description` prop can now be a `React.ReactNode` rather than a `string`

### Patch Changes

- Updated dependencies [c2854e9b]
- Updated dependencies [11d12cc4]
  - @leafygreen-ui/tokens@2.4.0
  - @leafygreen-ui/typography@18.2.1

## 11.1.2

### Patch Changes

- ffd11f24: - Passes `onEnter*` and `onExit*` props to internal `Popover` component
  - Adds tests to test `onEnter*` and `onExit*` callbacks
  - Adds tests to test `PopoverContext`
- Updated dependencies [9b7a8236]
- Updated dependencies [7f38e78a]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
  - @leafygreen-ui/icon@11.27.1
  - @leafygreen-ui/leafygreen-provider@3.1.11
  - @leafygreen-ui/hooks@8.1.0
  - @leafygreen-ui/lib@13.2.0
  - @leafygreen-ui/input-option@1.1.0
  - @leafygreen-ui/popover@11.2.1
  - @leafygreen-ui/typography@18.1.0

## 11.1.1

### Patch Changes

- 969b0d45: Adds `stopPropagation` and `preventDefault` to prevent menus from reopening when using `usePortal = false` and selecting an option with `space`/`enter`.

## 11.1.0

### Minor Changes

- ace9cc03: Allows Select to accept a ref

### Patch Changes

- Updated dependencies [e3f4d9ce]
- Updated dependencies [89f439e8]
- Updated dependencies [c41752d2]
- Updated dependencies [f077faf1]
- Updated dependencies [89332190]
  - @leafygreen-ui/typography@18.0.1
  - @leafygreen-ui/hooks@8.0.1
  - @leafygreen-ui/icon@11.25.0
  - @leafygreen-ui/button@21.0.10

## 11.0.1

### Patch Changes

- 9a471879: - Updates disabled dark mode text color from `gray.dark2` to `gray.dark1`
  - Updates disabled dark mode caret from `gray.dark2` to `gray.dark1`
  - Updates dark mode dropdown border from `gray.dark3` to `gray.dark2`
- dd4f3da8: Adds tests for pressing space on a select option
- Updated dependencies [dd4f3da8]
- Updated dependencies [90053e16]
  - @leafygreen-ui/lib@13.0.0
  - @leafygreen-ui/typography@18.0.0
  - @leafygreen-ui/button@21.0.9
  - @leafygreen-ui/input-option@1.0.13
  - @leafygreen-ui/leafygreen-provider@3.1.10
  - @leafygreen-ui/popover@11.1.1

## 11.0.0

### Major Changes

- c5d95794: - Adds `description` prop to `Option`
  - Refactor `Option` to use internal `InputOption` component
  - Internally removes `theme` from `SelectContext` by opting to enclose `Select` within the `LeafygreenProvider` and consuming `theme` from there. This adjustment enables nested children to access the dark mode context provided by `LeafygreenProvider` as well.
  - Reorganizes internal file structure

### Patch Changes

- Updated dependencies [a4b3b704]
- Updated dependencies [c5d95794]
- Updated dependencies [324d9730]
  - @leafygreen-ui/button@21.0.8
  - @leafygreen-ui/input-option@1.0.12
  - @leafygreen-ui/typography@17.0.2

## 10.3.18

### Patch Changes

- d2c1ec53: Updates Button to remove `pointer-events: none` styles from it's inner container. This allows the Select component to work as intended when using `usePortal = false`.
- Updated dependencies [d2c1ec53]
  - @leafygreen-ui/button@21.0.7

## 10.3.17

### Patch Changes

- d70768a7: Add a 1px `gray.light2` border to light mode dropdowns and a 1px `gray.dark3` border to dark mode dropdowns to match Figma specs.

## 10.3.16

### Patch Changes

- 3a9b274d: Handles keyboard event based on the event's `key` property rather than its `keyCode` property
- Updated dependencies [3a9b274d]
  - @leafygreen-ui/lib@12.0.0
  - @leafygreen-ui/button@21.0.6
  - @leafygreen-ui/leafygreen-provider@3.1.9
  - @leafygreen-ui/popover@11.0.18
  - @leafygreen-ui/typography@17.0.1

## 10.3.15

### Patch Changes

- Updated dependencies [a5770c15]
- Updated dependencies [c89d17a4]
  - @leafygreen-ui/typography@17.0.0

## 10.3.14

### Patch Changes

- Updated dependencies [3fe03b50]
- Updated dependencies [fd907503]
- Updated dependencies [c9f0055a]
- Updated dependencies [56459cde]
  - @leafygreen-ui/tokens@2.2.0
  - @leafygreen-ui/hooks@8.0.0
  - @leafygreen-ui/icon@11.23.0
  - @leafygreen-ui/leafygreen-provider@3.1.8
  - @leafygreen-ui/popover@11.0.17

## 10.3.13

### Patch Changes

- 4fcf2e94: Bumps `@types/react-is` and `react-is` to latest major version
- 4fcf2e94: Adds new internal prop, `__INTERNAL__menuButtonSlotProps__`.
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
  - @leafygreen-ui/icon@11.22.2
  - @leafygreen-ui/lib@11.0.0
  - @leafygreen-ui/popover@11.0.16
  - @leafygreen-ui/button@21.0.5
  - @leafygreen-ui/leafygreen-provider@3.1.7
  - @leafygreen-ui/typography@16.5.5

## 10.3.12

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/button@21.0.3
  - @leafygreen-ui/emotion@4.0.7
  - @leafygreen-ui/hooks@7.7.8
  - @leafygreen-ui/icon@11.22.1
  - @leafygreen-ui/leafygreen-provider@3.1.6
  - @leafygreen-ui/lib@10.4.3
  - @leafygreen-ui/palette@4.0.7
  - @leafygreen-ui/popover@11.0.15
  - @leafygreen-ui/tokens@2.1.4
  - @leafygreen-ui/typography@16.5.4

## 10.3.11

### Patch Changes

- c15ee2ac: Fixes missing documentation file
- Updated dependencies [f73807cf]
- Updated dependencies [31c09354]
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/icon@11.22.0
  - @leafygreen-ui/button@21.0.2
  - @leafygreen-ui/emotion@4.0.6
  - @leafygreen-ui/hooks@7.7.7
  - @leafygreen-ui/leafygreen-provider@3.1.5
  - @leafygreen-ui/lib@10.4.2
  - @leafygreen-ui/palette@4.0.6
  - @leafygreen-ui/popover@11.0.14
  - @leafygreen-ui/tokens@2.1.3
  - @leafygreen-ui/typography@16.5.3

## 10.3.10

### Patch Changes

- e8ef95e6: Updates disabled styles
- Updated dependencies [e8ef95e6]
  - @leafygreen-ui/button@21.0.1

## 10.3.9

### Patch Changes

- Updated dependencies [cfba537d]
  - @leafygreen-ui/button@21.0.0

## 10.3.8

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/leafygreen-provider@3.1.4
  - @leafygreen-ui/typography@16.5.2
  - @leafygreen-ui/emotion@4.0.5
  - @leafygreen-ui/palette@4.0.5
  - @leafygreen-ui/popover@11.0.13
  - @leafygreen-ui/button@20.3.1
  - @leafygreen-ui/tokens@2.1.2
  - @leafygreen-ui/hooks@7.7.6
  - @leafygreen-ui/icon@11.20.1
  - @leafygreen-ui/lib@10.4.1

## 10.3.7

### Patch Changes

- 76161cf0: Updates stories for Chromatic testing
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [735342e9]
- Updated dependencies [95f5107a]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
  - @leafygreen-ui/lib@10.4.0
  - @leafygreen-ui/hooks@7.7.5
  - @leafygreen-ui/icon@11.17.0
  - @leafygreen-ui/button@20.2.1
  - @leafygreen-ui/popover@11.0.12
  - @leafygreen-ui/tokens@2.1.1
  - @leafygreen-ui/typography@16.5.1

## 10.3.6

### Patch Changes

- 63b2deb0b: Upgrade button to v20.1.1
- Updated dependencies [63b2deb0b]
  - @leafygreen-ui/popover@11.0.11

## 10.3.5

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x
- Updated dependencies [d2ce54e2f]
- Updated dependencies [75099c60b]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
- Updated dependencies [0cd471676]
- Updated dependencies [2dfc4d0ea]
  - @leafygreen-ui/button@20.1.0
  - @leafygreen-ui/hooks@7.7.4
  - @leafygreen-ui/icon@11.16.1
  - @leafygreen-ui/leafygreen-provider@3.1.3
  - @leafygreen-ui/lib@10.3.4
  - @leafygreen-ui/popover@11.0.10
  - @leafygreen-ui/typography@16.5.0

## 10.3.4

### Patch Changes

- a3a52e131: Bumps to use new `useIdAllocator` hook
- Updated dependencies [614f7617d]
- Updated dependencies [a3a52e131]
- Updated dependencies [614f7617d]
  - @leafygreen-ui/icon@11.15.0
  - @leafygreen-ui/hooks@7.7.3

## 10.3.3

### Patch Changes

- 32b3d3146: Bumps to use new `useIdAllocator` hook
- 73cbbd02c: Uses fontWeight token from `@leafygreen-ui/tokens`
- Updated dependencies [73cbbd02c]
- Updated dependencies [8ece56980]
- Updated dependencies [83fc5b31b]
- Updated dependencies [9bcf8b925]
- Updated dependencies [8ece56980]
- Updated dependencies [32b3d3146]
- Updated dependencies [73cbbd02c]
  - @leafygreen-ui/tokens@2.1.0
  - @leafygreen-ui/popover@11.0.9
  - @leafygreen-ui/icon@11.14.0
  - @leafygreen-ui/typography@16.4.0
  - @leafygreen-ui/hooks@7.7.2
  - @leafygreen-ui/button@20.0.6

## 10.3.2

### Patch Changes

- ce0fcb3f6: Excludes `children` from story controls
- 77320a6b8: Fix padding discrepancy between Combobox, Select, Text Input, and Number Input
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
  - @leafygreen-ui/button@20.0.5
  - @leafygreen-ui/popover@11.0.8
  - @leafygreen-ui/tokens@2.0.3

## 10.3.1

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/button@20.0.4
  - @leafygreen-ui/emotion@4.0.4
  - @leafygreen-ui/hooks@7.7.1
  - @leafygreen-ui/icon@11.13.1
  - @leafygreen-ui/leafygreen-provider@3.1.2
  - @leafygreen-ui/lib@10.3.2
  - @leafygreen-ui/palette@4.0.3
  - @leafygreen-ui/popover@11.0.7
  - @leafygreen-ui/tokens@2.0.2
  - @leafygreen-ui/typography@16.2.1

## 10.3.0

### Minor Changes

- fb47557dd: Adds prop `dropdownWidthBasis` which determines if the dropdown width should be the width of the menu trigger or as wide as the widest option.

### Patch Changes

- af2e2bb74: Adds padding to the right of caret icon to align with [Figma spec](https://www.figma.com/file/4h2VwjCuJUbeZ7hzD2J1rq/LeafyGreen-Design-System?node-id=5341%3A34211&t=fktwOeFRl5sC7Uj0-1)
- Updated dependencies [ece595acd]
- Updated dependencies [9858ab8c5]
- Updated dependencies [d351c02bc]
- Updated dependencies [c2c5601f4]
- Updated dependencies [fb47557dd]
  - @leafygreen-ui/typography@16.2.0
  - @leafygreen-ui/hooks@7.7.0
  - @leafygreen-ui/icon@11.12.7
  - @leafygreen-ui/lib@10.3.1
  - @leafygreen-ui/palette@4.0.1
  - @leafygreen-ui/button@20.0.3

## 10.2.3

### Patch Changes

- Updated dependencies [5b036515e]
- Updated dependencies [26e341a0b]
- Updated dependencies [997121cc3]
- Updated dependencies [eb0cc4498]
  - @leafygreen-ui/palette@4.0.0
  - @leafygreen-ui/lib@10.2.2
  - @leafygreen-ui/icon@11.12.5
  - @leafygreen-ui/typography@16.1.0
  - @leafygreen-ui/button@20.0.2
  - @leafygreen-ui/tokens@2.0.1

## 10.2.2

### Patch Changes

- fc85e3f7a: Fix README formatting
- Updated dependencies [82e320ed4]
- Updated dependencies [2e8a572db]
- Updated dependencies [4ccc353e7]
- Updated dependencies [4ccc353e7]
  - @leafygreen-ui/button@20.0.1
  - @leafygreen-ui/lib@10.2.1

## 10.2.1

### Patch Changes

- bf2fedf6d: Version bumps lib
- Updated dependencies [1cff328a3]
- Updated dependencies [ffb99f417]
- Updated dependencies [bf2fedf6d]
- Updated dependencies [b7a29ea38]
  - @leafygreen-ui/button@20.0.0
  - @leafygreen-ui/hooks@7.5.0
  - @leafygreen-ui/leafygreen-provider@3.1.1
  - @leafygreen-ui/typography@16.0.1

## 10.2.0

### Minor Changes

- a089bf899: Allows aria-label as acceptable aria label prop in Select

### Patch Changes

- c1c259036: Exporting types

## 10.1.1

### Patch Changes

- c82ed35d5: Removes `useUsingKeyboardContext` from component, in favor of `&:focus-visible`
- b24b21462: Storybook: Updates story files to be on par with existing mongodb.design examples
- Updated dependencies [050f1f8a9]
- Updated dependencies [741cdd408]
- Updated dependencies [866144167]
- Updated dependencies [c82ed35d5]
- Updated dependencies [b24b21462]
  - @leafygreen-ui/icon@11.12.4
  - @leafygreen-ui/tokens@2.0.0
  - @leafygreen-ui/typography@16.0.0
  - @leafygreen-ui/button@19.0.4
  - @leafygreen-ui/palette@3.4.7
  - @leafygreen-ui/popover@11.0.4

## 10.1.0

### Minor Changes

- 7ca2da507: Updates mobile styles query. We now trigger mobile styles on `max-width: 768px`, `hover: none` and either `pointer: coarse` or `pointer: none`

### Patch Changes

- 696adb1b6: Makes internal check for presence of glpyh within Option more explicit, and inline with how we perform similar checks in other components
- ae5421cf6: Updates components to use internal transition tokens
- Updated dependencies [ae5421cf6]
- Updated dependencies [ed0e425e5]
- Updated dependencies [4b4c2d27d]
- Updated dependencies [6a266b813]
- Updated dependencies [1a335d0b2]
- Updated dependencies [ba97d1ef7]
- Updated dependencies [ae5421cf6]
  - @leafygreen-ui/tokens@1.4.0
  - @leafygreen-ui/button@19.0.1
  - @leafygreen-ui/icon@11.12.1
  - @leafygreen-ui/typography@15.1.0
  - @leafygreen-ui/popover@11.0.1

## 10.0.0

### Patch Changes

- Updated dependencies [07b3c797]
- Updated dependencies [07b3c797]
- Updated dependencies [b9b09a86]
  - @leafygreen-ui/typography@15.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.0
  - @leafygreen-ui/button@19.0.0
  - @leafygreen-ui/popover@11.0.0

## 9.0.0

### Major Changes

- f2d63a60: Removes leafygreen data attributes (prefixed with `data-leafygreen-ui-`), and replaces them with deterministic classNames (prefixed with `lg-ui-`)

### Patch Changes

- Updated dependencies [209f77ed]
- Updated dependencies [f2d63a60]
  - @leafygreen-ui/icon@11.12.0
  - @leafygreen-ui/button@18.0.0
  - @leafygreen-ui/lib@10.0.0
  - @leafygreen-ui/leafygreen-provider@3.0.1
  - @leafygreen-ui/popover@10.0.1
  - @leafygreen-ui/typography@14.0.1

## 8.0.0

### Patch Changes

- f21e42a0: Updates propTypes to accept `node` as children
- Updated dependencies [0b6435fa]
- Updated dependencies [e399f1b9]
- Updated dependencies [e399f1b9]
  - @leafygreen-ui/button@17.0.0
  - @leafygreen-ui/leafygreen-provider@3.0.0
  - @leafygreen-ui/popover@10.0.0
  - @leafygreen-ui/typography@14.0.0

## 7.1.2

### Patch Changes

- 24921fd2: Fix dependency range in package.json

## 7.1.1

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.
- Updated dependencies [24683433]
  - @leafygreen-ui/button@16.1.1
  - @leafygreen-ui/emotion@4.0.3
  - @leafygreen-ui/hooks@7.3.3
  - @leafygreen-ui/icon@11.11.1
  - @leafygreen-ui/leafygreen-provider@2.3.5
  - @leafygreen-ui/lib@9.5.1
  - @leafygreen-ui/palette@3.4.4
  - @leafygreen-ui/popover@9.1.1
  - @leafygreen-ui/tokens@1.3.4
  - @leafygreen-ui/typography@13.2.1

## 7.1.0

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
  - @leafygreen-ui/button@16.1.0
  - @leafygreen-ui/icon@11.11.0
  - @leafygreen-ui/popover@9.1.0
  - @leafygreen-ui/typography@13.2.0
  - @leafygreen-ui/lib@9.5.0
  - @leafygreen-ui/emotion@4.0.2
  - @leafygreen-ui/hooks@7.3.2
  - @leafygreen-ui/leafygreen-provider@2.3.4
  - @leafygreen-ui/palette@3.4.3
  - @leafygreen-ui/tokens@1.3.3

## 7.0.2

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files
- Updated dependencies [7caa1c3e]
- Updated dependencies [1e708bd3]
- Updated dependencies [e39d8469]
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/icon@11.10.2
  - @leafygreen-ui/popover@9.0.1
  - @leafygreen-ui/typography@13.1.2
  - @leafygreen-ui/button@16.0.3
  - @leafygreen-ui/emotion@4.0.1
  - @leafygreen-ui/hooks@7.3.1
  - @leafygreen-ui/leafygreen-provider@2.3.3
  - @leafygreen-ui/lib@9.4.2
  - @leafygreen-ui/palette@3.4.2
  - @leafygreen-ui/tokens@1.3.2

## 7.0.1

### Patch Changes

- 7409c9db: Remove `isDeselection` from `InternalOption`
- Updated dependencies [22128084]
  - @leafygreen-ui/button@16.0.2

## 7.0.0

### Major Changes

- 5aba12f1: - Updates 'Select' for dark mode refresh.
  - Adds `baseFontSize` prop which determines the base font size if sizeVariant is set to default.
  - Consumes darkMode from the `LeafyGreenProvider` if the `darkMode` prop is not set.

### Patch Changes

- Updated dependencies [5aba12f1]
  - @leafygreen-ui/typography@13.1.1

## 6.1.0

### Minor Changes

- 828c895d: Passes through all valid `button`, `li` and `div` attriutes (including `data-*` attributes) to `Select`, `Option` and `OptionGroup` respectively

### Patch Changes

- b22cc41f: Fixes a bug where long values, when selected, would overflow outside the Select trigger.
- Updated dependencies [13a4adcc]
  - @leafygreen-ui/typography@13.0.1

## 6.0.0

### Patch Changes

- Updated dependencies [85d46871]
- Updated dependencies [99e20bb9]
  - @leafygreen-ui/lib@9.4.0
  - @leafygreen-ui/leafygreen-provider@2.3.0
  - @leafygreen-ui/button@16.0.0
  - @leafygreen-ui/interaction-ring@4.0.0
  - @leafygreen-ui/popover@9.0.0
  - @leafygreen-ui/typography@13.0.0

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
