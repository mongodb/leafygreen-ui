---
'@leafygreen-ui/hooks': minor
---

- Updates 3rd argument in `useBackdropClick` to accept an options object. Retains (but deprecates) boolean-only functionality.
  - Adds `options.allowPropagation` to allow or disallow the click event to bubble up to other elements.
