---
'@leafygreen-ui/password-input': major
---

[LG-4135](https://jira.mongodb.org/browse/LG-4135)

1. Updated styling:
  - updated spacing for `'small'` and `'large'` size variants
  - added `'xsmall'` variant
  - updated placeholder text color
  - removed validation icon from inside the input

2. Added `errorMessage` and `successMessage` props
  - `errorMessage` will render a default of `'This input needs your attention'` and can be customized
  - `errorMessage` will only render when `state` is `warning` or `error`
  - `successMessage` will render a default of `'Success'` and can be customized
  - `successMessage` will only render when `state` is `valid`
  - both will only render if `aria-describedby` is undefined and `stateNotifications` is not an array
