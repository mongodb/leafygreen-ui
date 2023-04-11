---
'@leafygreen-ui/popover': patch
---

Renders a `span` instead of a `div` inside `Popover` to prevent `validateDOMNesting` warnings. Warnings will still show up if `usePortal` is `false`.
