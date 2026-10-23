---
'@leafygreen-ui/lib': patch
'@leafygreen-ui/polymorphic': patch
'@leafygreen-ui/table': patch
---

Fix public component call signatures and intrinsic DOM prop extraction for React 19 JSX while retaining required forwarded-ref render arguments. Resolve validation types through `prop-types` and replace global JSX namespace references with portable React types. Component runtime behavior and styles are unchanged.
