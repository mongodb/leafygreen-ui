---
'@leafygreen-ui/menu': major
---

- Updates the `FocusableMenuItem` component for new menu descendants pattern. By wrapping an input component in `FocusableMenuItem`, it will be registered as a menu item descendant, and will be focusable using standard menu arrow key interactions.
  - Note: the single child of `FocusableMenuItem` must itself be focusable. Wrapping a focusable element (e.g. `input` in a `div`) will not enable the menu descendant functionality.
