---
'@leafygreen-ui/code': patch
---

Replaces `postinstall` script with `prepare`. This ensures that the step is performed only pre-publish and not when the package is installed by consumers
