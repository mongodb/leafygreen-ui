---
'@lg-chat/message-feed': major
---

Removed fixed default height of 500px from `MessageFeed` component. Now, `MessageFeed` will grow to the bounds of its parent container.

Note: this should be upgraded with the following packages to avoid UI regressions:
  - `@lg-chat/leafygreen-chat-provider@5.1.0`
  - `@lg-chat/chat-window@5.0.0`
