---
'@leafygreen-ui/form-field': minor
---

[LG-4143](https://jira.mongodb.org/browse/LG-4143)

Optional `successMessage` prop is rendered below input container when state is valid.

The following changes are made to `inputProps` spread on the input component contained by `FormFieldInputContainer`:
- `aria-label` prop is only passed to the input component with an `aria-label` attribute if `label` prop and `aria-labelledby` prop are undefined. If either is defined, `aria-label` attribute on the input component will be undefined as per best practices from [aria-label MDN docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)
`aria-label` prop can only set the `aria-label` attribute on the input if both `label` prop and `aria-labelledby` prop are undefined

    | 👎 Does not use `aria-label` prop | 👎 Does not use `aria-label` prop | 👍 Does use `aria-label` prop |
    | - | - | - |
    | `<TextInput label="Label" aria-label="Custom label" />` | `<TextInput aria-label="Custom label" aria-labelledby="other-custom-label-id" />` | `<TextInput aria-label="Custom label" />` |
- `disabled` prop is passed to the input component with `aria-disabled` attribute
- `aria-invalid` attribute will always be set on the input component if the parent form field is in an error state. A custom `aria-invalid` prop can be used to customize this logic

The following styling changes are made:
- updated left and right spacing of input container for `xsmall`, `small`, and `large` size variants
- updated light mode placeholder text color
- moved success and error icon from inside the input to underneath the input, alongside the state feedback message
- refactored disabled styles although there should be no visual changes associated with this refactor
