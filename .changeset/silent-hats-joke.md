---
'@leafygreen-ui/copyable': major
---

This major change adds a wrapper div around the Copyable component, and a wrapperClassName prop to it, allowing passing in styles. This change was made to prevent accidentally passing in box model styles (e.g. gap) from a wrapping element. 
