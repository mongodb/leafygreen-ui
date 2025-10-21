---
'@leafygreen-ui/icon': patch
---

Updates build process to avoid race conditions in `rollup` plugins that intermittently caused `@emotion/server/create-instance` to be marked as a direct dependency of icon
