---
'@lg-chat/fixed-chat-window': minor
---

Add fixed height of 640px to `FixedChatWindow` popover element. The latest version of `MessageFeed` no longer has a fixed height which requires setting a fixed height in `FixedChatWindow` to prevent the popover element from growing to the full height of its parent container.

However, please note that this is a maintenance change, and this package will be deprecated shortly. It is recommended to migrate to `@lg-chat/chat-window`.
