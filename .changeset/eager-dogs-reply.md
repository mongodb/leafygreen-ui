---
'@leafygreen-ui/confirmation-modal': major
'@leafygreen-ui/modal': major
---

[LG-5735](https://jira.mongodb.org/browse/LG-5735):

#### Breaking Changes

- Modal `Footer` component now uses a different `flex-direction` which changes the layout of buttons in `ConfirmationModal` and any other component using a `Footer` instance

#### Non-breaking Changes

- Adds more robust initial focus behavior to `ConfirmationModal`
  - Focuses confirm button when `variant={Variant.Default}`
  - Focuses cancel button when `variant={Variant.Danger}`
  - Focuses text input when `requiredInputText` is provided
  - Otherwise, `initialFocus` prop can be used for alternative focusable element
