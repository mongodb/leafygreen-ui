---
'@lg-chat/message-rating': major
---

- Removed `@lg-chat/leafygreen-chat-provider` peer dependency requirement.
- Removed deprecated `lgMessageRatingStyles` export.
- All chat components have been simplified by removing variant-specific conditional logic.
  - Removed `description` prop.
  - Removed `RadioButton` component and related exports (`lgRadioButtonStyles`, `RadioButtonProps` type).
