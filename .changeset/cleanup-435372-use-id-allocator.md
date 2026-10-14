---
'@leafygreen-ui/hooks': patch
---

Fixes `useIdAllocator` returning `undefined` on first render under React 18, which produced duplicate ids (e.g. `radio-box-undefined`). It now uses React's `useId` when available for a stable id synchronously on every render, with the previous behavior kept as a fallback for React < 18. [CLOUDP-435372]
