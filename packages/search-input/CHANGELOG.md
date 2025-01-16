# @leafygreen-ui/search-input

## 5.0.0

### Patch Changes

- a3d63cb95: Export prop types for components already wrapped in polymorphic types
- Updated dependencies [a3d63cb95]
- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/input-option@3.0.0
  - @leafygreen-ui/leafygreen-provider@4.0.0
  - @leafygreen-ui/icon-button@16.0.0
  - @leafygreen-ui/typography@20.0.0
  - @leafygreen-ui/popover@13.0.0
  - @leafygreen-ui/a11y@2.0.0
  - @leafygreen-ui/icon@13.0.0
  - @leafygreen-ui/lib@14.0.0
  - @leafygreen-ui/hooks@8.3.2
  - @leafygreen-ui/polymorphic@2.0.3
  - @leafygreen-ui/tokens@2.11.1

## 4.0.0

### Major Changes

- 04bb887c0: [LG-4121](https://jira.mongodb.org/browse/LG-4121): `SearchInput` renders results menu in the top layer using popover API. As a result, the following props are removed:

  - `portalClassName`
  - `portalContainer`
  - `portalRef`
  - `scrollContainer`
  - `usePortal`

  #### Migration guide

  Use [popover-v12 codemod](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#popover-v12) for migration assistance.

  ##### Old

  ```js
  <SearchInput popoverZIndex={9999} usePortal={false} />
  <SearchInput portalClassName="portal-class" usePortal />
  ```

  ##### New

  ```js
  <SearchInput />
  <SearchInput />
  ```

### Patch Changes

- Updated dependencies [04bb887c0]

  - @leafygreen-ui/hooks@8.3.0
  - @leafygreen-ui/leafygreen-provider@3.2.0
  - @leafygreen-ui/popover@12.0.0

- Updated dependencies [117a463f8]
  - @leafygreen-ui/lib@13.8.1

## 3.1.4

### Patch Changes

- 5f10976d5: - Updates `useAvailableSpace` hook which fixes a dropdown height bug. [LG-4601](https://jira.mongodb.org/browse/LG-4601).

## 3.1.3

### Patch Changes

_Note_: This version has no updates. Pleas use version `3.1.4`.

- Updates `useAvailableSpace` hook which fixes a dropdown height bug. [LG-4601](https://jira.mongodb.org/browse/LG-4601)

## 3.1.2

### Patch Changes

- cfa830701: Updates `SearchResults`.

  - Removes custom option styles in favor of consistent option styles from `InputOptionContent`

  Updates `SearchResultsMenu`

  - Updates the menu `background-color` to match the background from `InputOptionContent`.

- Updated dependencies [cfa830701]
- Updated dependencies [cfa830701]
- Updated dependencies [cfa830701]
- Updated dependencies [cfa830701]
- Updated dependencies [db2d1d12c]
- Updated dependencies [cfa830701]
  - @leafygreen-ui/input-option@2.0.0
  - @leafygreen-ui/lib@13.6.1
  - @leafygreen-ui/a11y@1.5.0
  - @leafygreen-ui/typography@19.2.1

## 3.1.1

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
  - @leafygreen-ui/input-option@1.1.4

## 3.1.0

### Minor Changes

- 02e1d77e: Exposes the following props in `SearchInput` component:

  - `usePortal`
  - `portalClassName`
  - `portalContainer`
  - `portalRef`
  - `scrollContainer`

  [LG-3988](https://jira.mongodb.org/browse/LG-3988)

### Patch Changes

- Updated dependencies [02e1d77e]
- Updated dependencies [7bc4fcde]
- Updated dependencies [7bc4fcde]
- Updated dependencies [961be3f9]
  - @leafygreen-ui/popover@11.4.0
  - @leafygreen-ui/lib@13.5.0
  - @leafygreen-ui/tokens@2.8.0
  - @leafygreen-ui/icon@12.5.0

## 3.0.1

### Patch Changes

- Updated dependencies [dfd6972c]
  - @leafygreen-ui/typography@19.0.0
  - @leafygreen-ui/input-option@1.1.3

## 3.0.0

### Major Changes

- f630c718: [LG-4152](https://jira.mongodb.org/browse/LG-4152)

  #### `aria-label` prop change

  `aria-label` prop can only set the `aria-label` attribute on the searchbox element if `aria-labelledby` prop is undefined
  | 👎 Does not use `aria-label` prop | 👍 Does use `aria-label` prop |
  | - | - |
  | `<SearchInput aria-label="Label" aria-labelledby="custom-label-id" />` | `<SearchInput aria-label="Label" />` |

  #### Styling changes

  The following styling changes are made:

  - added `xsmall` variant
  - updated spacing for `default`, `small`, and `large` size variants
  - updated dark mode placeholder text color

  #### `onKeyDown` bug fix

  Previously, if searchbox element had focus and was disabled, user could press keys which would trigger opening the menu element.

  Now, if searchbox element has focus and is disabled, user can press keys, and they will not trigger any `onKeyDown` logic.

### Patch Changes

- Updated dependencies [9402ba0e]
- Updated dependencies [9b71e34d]
- Updated dependencies [c3906f78]
- Updated dependencies [c3906f78]
- Updated dependencies [070736c4]
  - @leafygreen-ui/icon@12.1.0
  - @leafygreen-ui/typography@18.4.0
  - @leafygreen-ui/lib@13.4.0
  - @leafygreen-ui/palette@4.0.10

## 2.1.6

### Patch Changes

- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [7a0ff1be]
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [66df9ab8]
  - @leafygreen-ui/typography@18.3.0
  - @leafygreen-ui/leafygreen-provider@3.1.12
  - @leafygreen-ui/icon-button@15.0.21
  - @leafygreen-ui/popover@11.3.1
  - @leafygreen-ui/icon@12.0.1
  - @leafygreen-ui/lib@13.3.0
  - @leafygreen-ui/a11y@1.4.13
  - @leafygreen-ui/emotion@4.0.8
  - @leafygreen-ui/hooks@8.1.3
  - @leafygreen-ui/input-option@1.1.2
  - @leafygreen-ui/palette@4.0.9
  - @leafygreen-ui/polymorphic@1.3.7
  - @leafygreen-ui/tokens@2.5.2

## 2.1.5

### Patch Changes

- Updated dependencies [74057388]
  - @leafygreen-ui/icon@12.0.0
  - @leafygreen-ui/icon-button@15.0.20
  - @leafygreen-ui/typography@18.2.3

## 2.1.4

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

## 2.1.3

### Patch Changes

- 2bceccb1: Fixes `lodash` imports to use default exports of specific functions to reduce component's bundle size.
- Updated dependencies [2bceccb1]
- Updated dependencies [2645cd50]
  - @leafygreen-ui/hooks@8.1.1
  - @leafygreen-ui/lib@13.2.1
  - @leafygreen-ui/tokens@2.3.0

## 2.1.2

### Patch Changes

- 9a471879: - Updates dark mode dropdown border from `gray.dark3` to `gray.dark2`
- Updated dependencies [dd4f3da8]
- Updated dependencies [784e9d8a]
- Updated dependencies [90053e16]
  - @leafygreen-ui/lib@13.0.0
  - @leafygreen-ui/icon-button@15.0.19
  - @leafygreen-ui/typography@18.0.0
  - @leafygreen-ui/a11y@1.4.11
  - @leafygreen-ui/input-option@1.0.13
  - @leafygreen-ui/leafygreen-provider@3.1.10
  - @leafygreen-ui/popover@11.1.1

## 2.1.1

### Patch Changes

- d70768a7: Add a 1px `gray.light2` border to light mode dropdowns and a 1px `gray.dark3` border to dark mode dropdowns to match Figma specs.

## 2.1.0

### Minor Changes

- f6698369: SearchResultMenu now supports a footer slot prop for children rendered under the list of search results. Popover props are also now correctly passed to the Popover component.

### Patch Changes

- Updated dependencies [f8c77c5d]
- Updated dependencies [1c7c9608]
- Updated dependencies [827060f6]
  - @leafygreen-ui/popover@11.1.0
  - @leafygreen-ui/icon@11.24.0

## 2.0.17

### Patch Changes

- 3a9b274d: Handles keyboard event based on the event's `key` property rather than its `keyCode` property
- Updated dependencies [3a9b274d]
  - @leafygreen-ui/lib@12.0.0
  - @leafygreen-ui/a11y@1.4.10
  - @leafygreen-ui/icon-button@15.0.18
  - @leafygreen-ui/input-option@1.0.11
  - @leafygreen-ui/leafygreen-provider@3.1.9
  - @leafygreen-ui/popover@11.0.18
  - @leafygreen-ui/typography@17.0.1

## 2.0.16

### Patch Changes

- 1a0b9996: Export SearchResultsMenu component

## 2.0.15

### Patch Changes

- Updated dependencies [a5770c15]
- Updated dependencies [c89d17a4]
  - @leafygreen-ui/typography@17.0.0
  - @leafygreen-ui/input-option@1.0.10

## 2.0.14

### Patch Changes

- Updated dependencies [3fe03b50]
- Updated dependencies [fd907503]
- Updated dependencies [c9f0055a]
- Updated dependencies [56459cde]
  - @leafygreen-ui/tokens@2.2.0
  - @leafygreen-ui/hooks@8.0.0
  - @leafygreen-ui/icon@11.23.0
  - @leafygreen-ui/a11y@1.4.9
  - @leafygreen-ui/leafygreen-provider@3.1.8
  - @leafygreen-ui/popover@11.0.17

## 2.0.13

### Patch Changes

- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
  - @leafygreen-ui/icon@11.22.2
  - @leafygreen-ui/lib@11.0.0
  - @leafygreen-ui/polymorphic@1.3.6
  - @leafygreen-ui/popover@11.0.16
  - @leafygreen-ui/a11y@1.4.8
  - @leafygreen-ui/icon-button@15.0.17
  - @leafygreen-ui/input-option@1.0.9
  - @leafygreen-ui/leafygreen-provider@3.1.7
  - @leafygreen-ui/typography@16.5.5

## 2.0.12

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/a11y@1.4.7
  - @leafygreen-ui/emotion@4.0.7
  - @leafygreen-ui/hooks@7.7.8
  - @leafygreen-ui/icon@11.22.1
  - @leafygreen-ui/icon-button@15.0.16
  - @leafygreen-ui/input-option@1.0.8
  - @leafygreen-ui/leafygreen-provider@3.1.6
  - @leafygreen-ui/lib@10.4.3
  - @leafygreen-ui/palette@4.0.7
  - @leafygreen-ui/polymorphic@1.3.5
  - @leafygreen-ui/popover@11.0.15
  - @leafygreen-ui/tokens@2.1.4
  - @leafygreen-ui/typography@16.5.4

## 2.0.11

### Patch Changes

- c15ee2ac: Fixes missing documentation file
- Updated dependencies [f73807cf]
- Updated dependencies [31c09354]
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/icon@11.22.0
  - @leafygreen-ui/a11y@1.4.6
  - @leafygreen-ui/emotion@4.0.6
  - @leafygreen-ui/hooks@7.7.7
  - @leafygreen-ui/icon-button@15.0.15
  - @leafygreen-ui/input-option@1.0.7
  - @leafygreen-ui/leafygreen-provider@3.1.5
  - @leafygreen-ui/lib@10.4.2
  - @leafygreen-ui/palette@4.0.6
  - @leafygreen-ui/polymorphic@1.3.4
  - @leafygreen-ui/popover@11.0.14
  - @leafygreen-ui/tokens@2.1.3
  - @leafygreen-ui/typography@16.5.3

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
