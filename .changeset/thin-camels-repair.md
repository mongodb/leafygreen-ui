---
'@lg-chat/fixed-chat-window': patch
---

[LG-4759](https://jira.mongodb.org/browse/LG-4759): The `@leafygreen-ui/popover` dependency was inadvertently bumped to v12+ which led to a regression in the scroll to end on initial render. This change forward-fixes the regression by rendering the `FixedChatWindow` with `renderMode="portal"` instead of `renderMode="top-layer"`.
