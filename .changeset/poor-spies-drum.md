---
'@leafygreen-ui/combobox': major
---

- Adds new size variants, `small` and `xsmall`.
- Removes truncation from chips when overflow is set to `scroll-x`. Chips do not need truncation since consumers can scroll horizontally to read the text.
- Sets a max height of 3 rows to the input when overflow is `expand-y`. An overflow shadow is added to indicate there is a scroll.
- Warning icon that appears when `state='error'` is now positioned to the left of the caret or clear icon. Previously it replaced the caret icon.
