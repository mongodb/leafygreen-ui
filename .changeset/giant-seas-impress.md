---
'@leafygreen-ui/button': patch
'@leafygreen-ui/select': patch
---

Updates Button to remove `pointer-events: none` styles from it's inner container. This allows the Select component to work as intended when using `usePortal = false`.
