---
'@leafygreen-ui/form-field': patch
---

- Adds `data-lgid` to `Label`, `Description`, `Error`, and `optional`.
- Removes `role="presentation"` from `Checkmark` and `Warning` icons and replaces it with `aria-hidden`. The `aria-label` attribute is omitted when using `role="presentation"` and we rely on `aria-label` to query the DOM for those icons.