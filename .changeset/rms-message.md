---
'@lg-chat/message': major
---

[LG-5575](https://jira.mongodb.org/browse/LG-5575)

- Removed the following exports:
  - `lgMessageStyles`
  - `MessageContainer` component, `lgMessageContainerStyles`, and `MessageContainerProps` type
  - `MessageContent` component and `MessageContentProps` type
  - `MessageLinks` component
- All chat components have been simplified by removing variant-specific conditional logic.
  - Removed props: `align`, `avatar`, `baseFontSize`, `componentOverrides`, `links`, `linksHeading`, `onLinkClick`, and `verified`
