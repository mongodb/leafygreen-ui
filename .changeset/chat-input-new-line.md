---
'@lg-chat/input-bar': patch
---

[LG-5358](https://jira.mongodb.org/browse/LG-5358): fixes issue where `ctrl + enter` and `shift + enter` was unexpectedly adding new line to the end of the message body. Now, doing so will add the new line at the cursor position.
