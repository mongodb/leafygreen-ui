---
'@leafygreen-ui/tooltip': patch
---

[UXE-855](https://jira.mongodb.org/browse/UXE-855): Fixes `Tooltip` content being announced twice by screen readers. `trigger` must now resolve to a DOM element — a plain host element, or a component that forwards its ref to one via `React.forwardRef` — a dev warning logs if it can't.
