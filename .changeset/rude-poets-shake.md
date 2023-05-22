---
'@leafygreen-ui/menu': patch
---

Adds `id` prop and adds `aria-expanded` and `aria-haspopup` internally. Swaps the order of the `setFocus` check. Removes `MenuItem.displayName` and passes the displayName as an argument to `InferredPolymorphic` instead.
