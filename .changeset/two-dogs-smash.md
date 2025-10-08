---
'@leafygreen-ui/modal': patch
---

[LG-5601](https://jira.mongodb.org/browse/LG-5601) Fix regression where `Modal` children remained mounted when closed. Restores v19 behavior where children are conditionally rendered based on the `open` prop.
