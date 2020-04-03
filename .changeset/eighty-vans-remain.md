---
'@leafygreen-ui/icon-button': major
'@leafygreen-ui/code': patch
'@leafygreen-ui/icon': patch
'@leafygreen-ui/lib': patch
'@leafygreen-ui/menu': patch
'@leafygreen-ui/mongo-nav': patch
---

IconButton now accepts `aria-label` instead of `ariaLabel`
When an Icon is a child of IconButton, the Icon's title will be unset unless explicitly set on Icon, and its size will be inherited from IconButton unless its explicitly set.
Previously, IconButton required that `ariaLabel` exists as a prop to IconButton. Now IconButton is more flexible, and requires that one of `aria-label` or 	`aria-labelledby` are set.
