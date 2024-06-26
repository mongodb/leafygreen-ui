---
'@leafygreen-ui/menu': minor
---

- Creates the `MenuDescendant` component, a replacement for `FocusableMenuItem`. By wrapping an input component in `MenuDescendant`, it will be registered as a menu item descendant, and will be focusable using standard menu arrow key interactions.
  - Note: the single child of `MenuDescendant` must itself be focusable. Wrapping a focusable element (e.g. `input` in a `div`) will not enable the menu descendant functionality.
- Marks `FocusableMenuItem` as deprecated - this will be removed in a future release
