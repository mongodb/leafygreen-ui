---
'@lg-chat/input-bar': minor
---

[LG-5600](https://jira.mongodb.org/browse/LG-5600)
Fix send button disabled logic: the send button now remains enabled during loading state (even with empty message body) to allow users to stop the request. The `disabled` and `disableSend` props still take precedence.

Add `onClickStopButton` prop to handle stop actions during loading state. When triggered, the previous message body is restored to the input field (similar to error state behavior).
