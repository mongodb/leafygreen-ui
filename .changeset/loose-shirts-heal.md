---
'@leafygreen-ui/table': major
---

Patch table header interaction test to scroll in Chromatic snapshots. Introduces breaking change in testing utils: `getLgIds` now returns `headerRow` and `headerCell`. Deprecates the original `header` lgId, which is now `headerCell`.