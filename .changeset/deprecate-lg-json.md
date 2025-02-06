---
'@lg-tools/meta': minor
---

`@lg-tools/meta` now looks for a `"lg"` property on the root `package.json` (instead of a custom `lg.json`).
This property helps internal LeafyGreen tools know what package scopes are associated with what directories (similar to `workspaces`).
