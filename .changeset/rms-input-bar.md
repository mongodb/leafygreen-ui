---
'@lg-chat/input-bar': major
---

[LG-5575](https://jira.mongodb.org/browse/LG-5575)

- Added compatibility with `@lg-chat/leafygreen-chat-provider@6.0.0`. We recommend new projects use `@lg-chat/leafygreen-chat-provider` v6; support for v5 will be removed in a future major version.
- Removed deprecated `lgInputBarStyles` export.
- All chat components have been simplified by removing variant-specific conditional logic.
  - Removed props: `badgeText`, `shouldRenderGradient`, and `shouldRenderHotKeyIndicator`
- Added min-width of 150px to `textarea` element to ensure proper height calculation.
- Updated `react-textarea-autosize` from `^8.3.2` to `^8.5.9`.
