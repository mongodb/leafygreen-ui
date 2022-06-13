---
'@leafygreen-ui/popover': patch
---

Adds back transition to popover open. Uses `getComputedStyle` to get content width instead of `getBoundingClientRect` and `offsetWidth`.
