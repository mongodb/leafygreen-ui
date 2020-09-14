---
'@leafygreen-ui/tabs': patch
---

Fixes bug where conditionally rendered Tab elements caused the component to try and read the width of a reference to a non-exisistant element.
