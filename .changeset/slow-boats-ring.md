---
'@leafygreen-ui/descendants': minor
---

Adds `getDescendants` accessor function, returned from `useInitDescendants`. Use this method when referencing descendants from withing effects/callbacks where the `descendants` object may have updated, and could be stale.
