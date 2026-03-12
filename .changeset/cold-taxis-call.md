---
'@leafygreen-ui/combobox': patch
---

[LG-5326](https://jira.mongodb.org/browse/LG-5326): Fixes a regression where filtering combobox options by typing did not update the highlighted option. Previously, pressing Enter after filtering would select the first option in the unfiltered list instead of the first matching option.
