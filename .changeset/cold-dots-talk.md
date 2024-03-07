---
'@leafygreen-ui/form-field': patch
---

- Adds `data-lgid` to `label`, `description`, and `Error`.
- Removes `role="presentation"` from `Checkmark` and `Warning` icons and replaces it with `aria-hidden`. The `aria-label` attribute is omitted when using `role="presentation"` and we reley on `aria-label` to query the DOM for those icons.