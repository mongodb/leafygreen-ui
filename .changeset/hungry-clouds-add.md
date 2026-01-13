---
'@lg-chat/message': patch
---

[LG-5857](https://jira.mongodb.org/browse/LG-5857): truncate `Chip` instances in `Message.ToolCard` if label exceeds 25 characters. Also, pass through `formatTooltip` prop for `Chip` instances to allow formatting tooltip content.
