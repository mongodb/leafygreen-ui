---
'@leafygreen-ui/icon': patch
'@leafygreen-ui/portal': patch
---

Fixes an issue where some built type definition files had a triple-slash reference directive pointing to a package that might not exist in a consuming application.
