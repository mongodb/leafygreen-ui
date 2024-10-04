---
'@lg-tools/codemods': minor
---

[LG-4525](https://jira.mongodb.org/browse/LG-4525) Add `consolidate-popover-usePortal-renderMode-props` codemod which can be used to refactor `Popover` components. It will:
1. Add an explicit `usePortal={true}` prop if not specified
2. Consolidates `usePortal` prop into `renderMode` prop
