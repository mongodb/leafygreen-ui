# @lg-chat/input-bar

## 7.0.1

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [53c67fba6]
  - @leafygreen-ui/leafygreen-provider@4.0.1
  - @leafygreen-ui/input-option@3.0.1
  - @leafygreen-ui/search-input@5.0.1
  - @leafygreen-ui/polymorphic@2.0.4
  - @leafygreen-ui/typography@20.0.1
  - @leafygreen-ui/palette@4.1.2
  - @leafygreen-ui/popover@13.0.1
  - @leafygreen-ui/button@22.0.1
  - @leafygreen-ui/tokens@2.11.2
  - @leafygreen-ui/badge@9.0.1
  - @leafygreen-ui/hooks@8.3.3
  - @leafygreen-ui/icon@13.1.1
  - @leafygreen-ui/lib@14.0.1

## 7.0.0

### Patch Changes

- Updated dependencies [a3d63cb95]
- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/input-option@3.0.0
  - @leafygreen-ui/search-input@5.0.0
  - @lg-chat/leafygreen-chat-provider@3.0.0
  - @leafygreen-ui/leafygreen-provider@4.0.0
  - @leafygreen-ui/typography@20.0.0
  - @leafygreen-ui/popover@13.0.0
  - @leafygreen-ui/button@22.0.0
  - @leafygreen-ui/badge@9.0.0
  - @leafygreen-ui/icon@13.0.0
  - @leafygreen-ui/lib@14.0.0
  - @leafygreen-ui/hooks@8.3.2
  - @leafygreen-ui/polymorphic@2.0.3
  - @leafygreen-ui/tokens@2.11.1

## 6.0.0

### Major Changes

- 04bb887c0: [LG-4121](https://jira.mongodb.org/browse/LG-4121): `InputBar` renders results menu in top layer using popover API. As a result, the following props are deprecated and removed:
  - `portalClassName`
  - `portalContainer`
  - `portalRef`
  - `scrollContainer`
  - `usePortal`

### Patch Changes

- Updated dependencies [04bb887c0]

  - @leafygreen-ui/hooks@8.3.0
  - @leafygreen-ui/leafygreen-provider@3.2.0
  - @leafygreen-ui/popover@12.0.0
  - @leafygreen-ui/search-input@4.0.0

- Updated dependencies [117a463f8]
  - @leafygreen-ui/lib@13.8.1

## 5.1.0

### Minor Changes

- 79f0e7696: Add `shouldRenderHotkeyIndicator` prop to InputBar component which determines if hotkey indicator is rendered

## 5.0.0

### Major Changes

- cfa830701: Updates `SuggestedPrompt`.
  - Removes custom option styles in favor of consistent option styles from `InputOptionContent`

### Patch Changes

- Updated dependencies [cfa830701]
- Updated dependencies [cfa830701]
- Updated dependencies [cfa830701]
- Updated dependencies [cfa830701]
- Updated dependencies [db2d1d12c]
- Updated dependencies [cfa830701]
  - @leafygreen-ui/input-option@2.0.0
  - @leafygreen-ui/lib@13.6.1
  - @leafygreen-ui/search-input@3.1.2
  - @leafygreen-ui/typography@19.2.1

## 4.0.4

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
  - @leafygreen-ui/search-input@3.1.1

## 4.0.3

### Patch Changes

- Updated dependencies [dfd6972c]
- Updated dependencies [1ec45a7e]
  - @leafygreen-ui/typography@19.0.0
  - @leafygreen-ui/button@21.2.0
  - @leafygreen-ui/input-option@1.1.3
  - @leafygreen-ui/search-input@3.0.1

## 4.0.2

### Patch Changes

- Updated dependencies [9402ba0e]
- Updated dependencies [9b71e34d]
- Updated dependencies [c3906f78]
- Updated dependencies [c3906f78]
- Updated dependencies [f630c718]
- Updated dependencies [070736c4]
  - @leafygreen-ui/icon@12.1.0
  - @leafygreen-ui/typography@18.4.0
  - @leafygreen-ui/lib@13.4.0
  - @leafygreen-ui/search-input@3.0.0
  - @leafygreen-ui/palette@4.0.10

## 4.0.1

### Patch Changes

- 9079c0ae: Upgrades internal lg components
- Updated dependencies [74057388]
  - @leafygreen-ui/icon@12.0.0
  - @leafygreen-ui/search-input@2.1.5
  - @leafygreen-ui/typography@18.2.3

## 4.0.0

### Major Changes

- 36070800: First public release of `@lg-chat` components

### Patch Changes

- Updated dependencies [36070800]
  - @lg-chat/leafygreen-chat-provider@2.0.0

## 3.2.6

### Patch Changes

- InputBar should now correctly dispatch change events for ctrl+enter and shift+enter

## 3.2.1

### Patch Changes

- 45113f5: Release with new build

## 3.2.0

### Minor Changes

- 5c72047: InputBar now correctly applies the dropdownFooterSlot prop
- 4ba0d3e: InputBar now initializes correctly based on the value passed to `textareaProps`

### Patch Changes

- 802c4c8: Bump version of LG `"@leafygreen-ui/search-input"` to `v2.1.2`. This version includes an updated dark mode dropdown border color of `gray.dark2`.

## 3.1.3

### Patch Changes

- Publishing with fresh builds

## 3.1.2

### Patch Changes

- Publishing with new builds

## 3.1.1

### Patch Changes

- InputBar now leverages new updates to SearchResultMenu that allow it to consume props for its Popover and a custom footer slot

## 3.1.0

### Minor Changes

- b13b4c8: InputBar now exposes props to be passed to the Popover used inside the dropdown

### Patch Changes

- 85d15b8: InputBar now leverages new updates to SearchResultMenu that allow it to consume props for its Popover and a custom footer slot

## 3.0.1

### Patch Changes

- Empty patch bump to include missing builds
- Updated dependencies
  - @lg-chat/leafygreen-chat-provider@1.0.2

## 3.0.0

### Major Changes

- 656354f: InputBar now supports suggested prompts with dropdown interaction

### Minor Changes

- 48748dd: InputBar now supports a `dropdownFooterSlot` prop to render content under suggested prompts

### Patch Changes

- f21765f: Phase 2 minor style changes are now applied

## 2.0.1

### Patch Changes

- 1369d9f: Empty patch version to trigger new Artifactory publish
- Updated dependencies [1369d9f]
  - @lg-chat/leafygreen-chat-provider@1.0.1

## 2.0.0

### Minor Changes

- Responsiveness behavior with LeafyGreenChatProvider

### Patch Changes

- 799eb22: Adjusts component dependencies
- Updated dependencies
  - @lg-chat/leafygreen-chat-provider@1.0.0

## 1.0.0

### Major Changes

- 9cfaea7: MVP Release of all LG Chat packages

## 0.9.1

### Patch Changes

- a1c597c: Testing initial publish of LG Chat library
