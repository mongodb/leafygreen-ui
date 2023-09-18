---
'@leafygreen-ui/hooks': major
---

- Extends `useControlledValue` to accept any type.
  - Adds `initialValue` argument. Used for setting the initial value for uncontrolled components. Without this we may encounter a React error for switching between controlled/uncontrolled inputs
  - Changes signature of `onChange` argument to be a simple setter function (`(value: T) => void`)
  - Changes return object to include only `isControlled`, `value` and an `updateValue` setter function
