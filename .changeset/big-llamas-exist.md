---
'@leafygreen-ui/tabs': patch
---

Previously, if multiple `<Tabs />` were rendered, only the first on the page would be navigable via keyboard. Now, the currently focused `<Tabs />` will be navigable via keyboard, regardless of location on page.
