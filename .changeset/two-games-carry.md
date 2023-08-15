---
'@leafygreen-ui/number-input': patch
---

Adds the `setOpen()` state update inside the [flushSync](https://react.dev/reference/react-dom/flushSync) callback to prevent batch updates in React 18. This addresses an issue where the unit tooltip would occasionally appear without a transition, particularly when hovering. This should have no impact on behavior in React 17.

Updates `README` code snippet.
