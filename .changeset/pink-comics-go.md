---
'@leafygreen-ui/select': patch
---

Fixes `Select` so that when an `aria-label` is added, VO announces both the value and the label when there is a value. Also adds `aria-current` attribute to help screen readers announce the current selection state.
