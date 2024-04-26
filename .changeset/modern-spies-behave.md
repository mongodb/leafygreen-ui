---
'@leafygreen-ui/select': major
---

[LG-4138](https://jira.mongodb.org/browse/LG-4138)

1. Updated styling:
  - updated spacing for `'xsmall'`, `'small'`, and `'large'` size variants
  - updated placeholder text color
  - removed validation icon from inside the input

2. Added default `errorMessage` of `'This input needs your attention'`

3. Added `valid` state variant and `successMessage` prop
  - `successMessage` will render a default of `'Success'` and can be customized
  - `successMessage` will only render when `state=valid`
