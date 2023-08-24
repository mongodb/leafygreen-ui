---
'@leafygreen-ui/hooks': minor
---

- Extends `useControlledValue` to accept any type.
- Adds `updateValue` function in return value. This method triggers a synthetic event to update the value of a controlled or uncontrolled component.
- The value of `isControlled` is now immutable after the first render
