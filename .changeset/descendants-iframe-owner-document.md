---
'@leafygreen-ui/descendants': patch
---

[UXE-495](https://jira.mongodb.org/browse/UXE-495): Fix descendant registration failing inside an iframe. Descendant components (e.g. `Tabs`) rendered in an iframe would all appear selected because the containment check compared against the top-level `document` instead of the element's own document. The check now uses `ref.current.ownerDocument`, so registration works across document boundaries.
