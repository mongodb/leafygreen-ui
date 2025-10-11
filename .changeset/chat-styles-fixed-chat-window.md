---
'@lg-chat/fixed-chat-window': minor
---

Added fixed height of 640px to `FixedChatWindow` popover element. The latest version of `MessageFeed` no longer has a fixed height which requires setting a fixed height in `FixedChatWindow` to prevent the popover element from growing to the full height of its parent container.

However, please note that this is a maintenance change, and this package will be deprecated shortly. It is recommended to migrate to `@lg-chat/chat-window`.

Note: if using this package, it should be upgraded with the following packages to avoid UI regressions:
  - `@lg-chat/leafygreen-chat-provider@5.1.0`
  - `@lg-chat/message-feed@8.0.0`
