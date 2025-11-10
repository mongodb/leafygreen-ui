---
'@lg-chat/chat-window': major
---

- Removed `@lg-chat/leafygreen-chat-provider` peer dependency requirement.
- All chat components have been simplified by removing variant-specific conditional logic.
  - Removed `onClose` and `iconSlot` props from `ChatWindowProps`. These props were only used in the spacious variant.
