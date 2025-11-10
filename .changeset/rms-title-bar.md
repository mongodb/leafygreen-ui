---
'@lg-chat/title-bar': major
---

- Removed `@lg-chat/leafygreen-chat-provider` peer dependency requirement.
- All chat components have been simplified by removing variant-specific conditional logic.
  - Removed `align`, `iconSlot`, and `onClose` props.
  - Removed `Align` enum export.
