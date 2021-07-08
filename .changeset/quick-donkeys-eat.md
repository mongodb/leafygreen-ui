---
'@leafygreen-ui/tooltip': patch
---

Fixes a bug where the event object was not accessible in the scope of a Tooltip triger element's `onClick` handler. Also preemptively ensures the same issue does not occur within other handlers on a Tooltip trigger
