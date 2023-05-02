---
'@leafygreen-ui/modal': major
---

Removes the default `P` styles applied in darkMode that used to override the color of all `P` tags with `#C1C7C6`. Child element colors are now respected and if no colors are explicitly defined for them, they will inherit the color of their parent container. Also reorganizes internal file structure.