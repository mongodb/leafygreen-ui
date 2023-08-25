---
'@leafygreen-ui/hooks': minor
---

- Extends `useControlledValue` to accept any type.
- Adds `updateValue` function in return value. This method triggers a synthetic event to update the value of a controlled or uncontrolled component.
- Adds `initialValue` argument. Used for setting the initial value for uncontrolled components. Without this we may encounter a React error for switching between controlled/uncontrolled inputs
- The value of `isControlled` is now immutable after the first render
