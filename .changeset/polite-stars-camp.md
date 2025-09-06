---
'@lg-chat/message': minor
---

[LG-5437](https://jira.mongodb.org/browse/LG-5437): Enhanced Message component with compound components pattern. [Learn more about compound components here](https://github.com/mongodb/leafygreen-ui/blob/main/chat/message/README.md#compound-components)

- Migrated `MessageActions` from `@lg-chat/message-actions` into this package, now available as `Message.Actions`.
- Marked `MessageLinks` export as deprecated. Use `Message.Links` instead.
- Updated `Message.VerifiedBanner` to accept additional HTML props.
