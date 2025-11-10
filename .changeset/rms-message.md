---
'@lg-chat/message': major
---

- Removed the following exports:
  - `lgMessageStyles`
  - `MessageContainer` component, `lgMessageContainerStyles`, and `MessageContainerProps` type
  - `MessageContent` component and `MessageContentProps` type
  - `MessageLinks` component
- All chat components have been simplified by removing variant-specific conditional logic.
  - Removed props: `align`, `avatar`, `baseFontSize`, `componentOverrides`, `links`, `linksHeading`, `onLinkClick`, and `verified`
