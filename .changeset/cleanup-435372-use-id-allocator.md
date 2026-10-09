---
'@leafygreen-ui/hooks': patch
---

Fixes a bug where `useIdAllocator` returned `undefined` on the first render under React 18, producing duplicate ids like `radio-box-undefined`. `useIdAllocator` now uses React's built-in `useId` when available, generating a unique, stable id synchronously during render (and during SSR). The legacy deferred implementation is retained as a fallback for React < 18. Colons are stripped from React's ids (`:r0:` → `r0`) so they remain valid as CSS selectors. [CLOUDP-435372]
