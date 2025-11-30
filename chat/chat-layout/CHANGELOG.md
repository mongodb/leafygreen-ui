# @lg-chat/chat-layout

## 0.2.0

### Minor Changes

- 4797af9: [LG-5712](https://jira.mongodb.org/browse/LG-5712): handle overflow in `ChatSideNav.SideNavItem` and add compact tooltip for truncated text

### Patch Changes

- 4797af9: Expand `ChatSideNav` when descendant element is focused
- cb31ce6: fix: remove unexpected @emotion imports from icon package dependency
- Updated dependencies [f7a63e2]
- Updated dependencies [43810b4]
- Updated dependencies [ec4fad8]
- Updated dependencies [cb31ce6]
  - @leafygreen-ui/tooltip@14.3.0
  - @leafygreen-ui/icon@14.7.1
  - @leafygreen-ui/tokens@4.1.0
  - @leafygreen-ui/avatar@3.1.6
  - @leafygreen-ui/typography@22.2.3

## 0.1.1

### Patch Changes

- 63d7b62: [LG-5665](https://jira.mongodb.org/browse/LG-5665): `AssistantAvatar` reads `darkMode` value from `LeafyGreenContext` and no longer requires explicitly passing `darkMode` prop.
- 9cf3b18: Updates provider peer dependency version string to correctly use `pnpm` `workspace` syntax
- Updated dependencies [63d7b62]
- Updated dependencies [9cf3b18]
- Updated dependencies [3dfa899]
  - @leafygreen-ui/avatar@3.1.5
  - @leafygreen-ui/typography@22.2.2
  - @leafygreen-ui/button@25.1.3
  - @lg-chat/leafygreen-chat-provider@6.0.0

## 0.1.0

### Minor Changes

- 8976ab2: Initial release with `ChatLayout`, `ChatMain`, and `ChatSideNav`
  - `ChatSideNav` is a compound component with the following subcomponents:
    - `ChatSideNav.Header`
    - `ChatSideNav.Content`
    - `ChatSideNav.SideNavItem`
