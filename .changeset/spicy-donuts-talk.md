---
'@leafygreen-ui/text-input': minor
---

- Updates TS types: now Any one of `label`, `aria-label` and `aria-labelledby` is sufficient for all text input types

- Fixes a regression when `type="search"`. Providing `aria-label` is sufficient for accessibility
