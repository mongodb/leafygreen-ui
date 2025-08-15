---
'@leafygreen-ui/table': patch
---

Fixes the issue where `Table` rows would not re-render when the cell renderer changes in an existing column. [LG-5429](https://jira.mongodb.org/browse/LG-5429)
With this fix, whenever the cell renderer changes in an existing column, all rows will re-render.