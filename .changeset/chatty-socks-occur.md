---
'@leafygreen-ui/number-input': major
---

[LG-4134](https://jira.mongodb.org/browse/LG-4134)

1. Updated styling:
  - updated spacing for `'small'` and `'xsmall'` size variants
  - added `'large'` variant
  - updated placeholder text color
  - moved error icon from inside the input to underneath the input, alongside the error message

2. Added default `errorMessage` of `'This input needs your attention'`

3. Added `valid` state variant and `successMessage` prop
  - `successMessage` will render a default of `'Success'` and can be customized
  - `successMessage` will only render when `state=valid`
