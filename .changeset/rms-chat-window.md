---
'@lg-chat/chat-window': major
---

[LG-5575](https://jira.mongodb.org/browse/LG-5575)

- All chat components have been simplified by removing variant-specific conditional logic.
  - Removed `onClose` and `iconSlot` props from `ChatWindowProps`. These props were only used in the spacious variant.
