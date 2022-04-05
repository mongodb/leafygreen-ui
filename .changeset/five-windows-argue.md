---
'@leafygreen-ui/menu': patch
---

Removes an undocumented change where both `href` and `description` would be rendered if provided to `MenuItem`. Now only `description` will be rendered.
