---
'@leafygreen-ui/pagination': patch
---

[LG-6235](https://jira.mongodb.org/browse/LG-6235): render `0` instead of `many` when `numTotalItems` is `0`. Zero results is a valid state (e.g. a filtered table with no matches), so the summary now reads `0 - 0 of 0 items` and the navigation count reads `0 of 0`. An unknown total (`numTotalItems` is `undefined`) still renders `many`.
