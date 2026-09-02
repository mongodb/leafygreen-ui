---
'@leafygreen-ui/tooltip': patch
---

[UXE-855](https://jira.mongodb.org/browse/UXE-855): Fixes `Tooltip` content being announced twice by screen readers. `trigger` must now be able to accept a ref (a DOM element, class component, or one wrapped in `React.forwardRef`) — a dev warning logs if it can't.
