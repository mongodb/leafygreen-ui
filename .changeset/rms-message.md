---
'@lg-chat/message': major
---

[LG-5575](https://jira.mongodb.org/browse/LG-5575)

- Added compatibility with `@lg-chat/leafygreen-chat-provider@6.0.0`. We recommend new projects use `@lg-chat/leafygreen-chat-provider` v6; support for v5 will be removed in a future major version.
- Removed the following exports:
  - `lgMessageStyles`
  - `MessageContainer` component, `lgMessageContainerStyles`, and `MessageContainerProps` type
  - `MessageContent` component and `MessageContentProps` type
  - `MessageLinks` component
- All chat components have been simplified by removing variant-specific conditional logic.
  - Removed props: `align`, `avatar`, `baseFontSize`, `componentOverrides`, `links`, `linksHeading`, `onLinkClick`, and `verified`
