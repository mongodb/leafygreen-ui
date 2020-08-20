---
'@leafygreen-ui/checkbox': patch
---

Fixes 'aria-checked' value when Checkbox is indeterminate such that the value is `mixed` rather than `false` per WAI-ARIA spec
