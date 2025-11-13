---
'@lg-chat/chat-window': major
---

[LG-5575](https://jira.mongodb.org/browse/LG-5575)

- Added compatibility with `@lg-chat/leafygreen-chat-provider@6.0.0`. We recommend new projects use `@lg-chat/leafygreen-chat-provider` v6; support for v5 will be removed in a future major version.
- All chat components have been simplified by removing variant-specific conditional logic.
  - Removed `onClose` and `iconSlot` props from `ChatWindowProps`. These props were only used in the spacious variant.
