---
'@leafygreen-ui/confirmation-modal': minor
---

- Drops the `isRequired` from the `buttonText` prop type. As of [version 5.1.0](https://github.com/mongodb/leafygreen-ui/blob/main/packages/confirmation-modal/CHANGELOG.md#510), `buttonText` is a deprecated prop that is now optional.
- Fixes existing confirm button disabled state logic
  - Previously, when the modal was closed using the cancel or confirm button and reopened, the confirm button would always reset to a disabled state, disregarding `requiredInputText` prop value.
  - Now, the confirm button will reset to a disabled state only when `requiredInputText` is provided.
- Adds missing confirm button disabled state logic
  - Previously, when the modal was closed using the modal close button and reopened, the confirm button would never reset to a disabled state.
  - Now, the confirm button will reset to a disabled state when `requiredInputText` is provided.
