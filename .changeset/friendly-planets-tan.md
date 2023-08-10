---
'@leafygreen-ui/tooltip': patch
---

Wraps some state updates inside the [flushSync](https://react.dev/reference/react-dom/flushSync) function to prevent batch updates in React 18. This addresses an issue where the tooltip would occasionally appear without a transition, particularly when hovering.