---
'@lg-chat/message-rating': major
---

[LG-5575](https://jira.mongodb.org/browse/LG-5575)

- Removed deprecated `lgMessageRatingStyles` export.
- All chat components have been simplified by removing variant-specific conditional logic.
  - Removed `description` prop.
  - Removed `RadioButton` component and related exports (`lgRadioButtonStyles`, `RadioButtonProps` type).
