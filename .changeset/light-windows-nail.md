---
'@leafygreen-ui/toast': minor
---

This change improves screenreader compatibility by adding additonal aria attributes to the Toast component. This is being released as a breaking version since previously the root element of the Toast element would only be in the DOM when the toast is open, but now the element will always be in the DOM.
