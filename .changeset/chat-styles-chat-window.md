---
'@lg-chat/chat-window': major
---

Updated height of outer container to ensure `ChatWindow` takes up the full vertical space of its parent container element. Also, added a hidden spacer element to ensure messages vertically flow from the bottom of the scroll container when child `MessageFeed` instance does not take up the full vertical space.

Note: this should be upgraded with the following packages to avoid UI regressions:
  - `@lg-chat/leafygreen-chat-provider@5.1.0`
  - `@lg-chat/message-feed@8.0.0`
