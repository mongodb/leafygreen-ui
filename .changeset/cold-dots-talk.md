---
'@leafygreen-ui/form-field': patch
---

- Adds `data-lgid` to `Error` and `optional`.
- Removes `role="presentation"` from `Checkmark` and `Warning` icons and replaces it with `aria-hidden`. The `title` attribute is omitted when using `role="presentation"` and we rely on `title` to query the DOM for those icons.
