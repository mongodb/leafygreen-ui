---
'@leafygreen-ui/form-field': patch
---

Correctly sets the `readOnly` prop in the `useFormFieldProps` hook. Previously, `readOnly` was only added to an input if `disabled` was true. Now, passing the `readOnly` prop adds it to the resulting input.
