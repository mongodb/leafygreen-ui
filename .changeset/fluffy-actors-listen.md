---
'@leafygreen-ui/text-input': major
---

[LG-4145](https://jira.mongodb.org/browse/LG-4145)

`aria-label` and `aria-labelledby` props are passed to the input.

#### aria-labelledby
`aria-labelledby` prop can only set the `aria-labelledby` attribute on the input if `label` prop is undefined. Otherwise, the generated label component id will be used for the `aria-labelledby` attribute

| 👎 Does not use `aria-labelledby` prop | 👍 Does use custom `aria-labelledby` prop |
| - | - |
| `<TextInput label="Label" aria-labelledby="custom-label-id" />` | `<TextInput aria-labelledby="custom-label-id" />` |

#### aria-label
`aria-label` prop can only set the `aria-label` attribute on the input if both `label` prop and `aria-labelledby` prop are undefined
| 👎 Does not use `aria-label` prop | 👎 Does not use `aria-label` prop | 👍 Does use `aria-label` prop |
| - | - | - |
| `<TextInput label="Label" aria-label="Custom label" />` | `<TextInput aria-label="Custom label" aria-labelledby="other-custom-label-id" />` | `<TextInput aria-label="Custom label" />` |

[LG-4143](https://jira.mongodb.org/browse/LG-4143)

1. `FormField` styling changes apply to `TextInput`. [See style changes here](https://github.com/mongodb/leafygreen-ui/blob/main/packages/form-field/CHANGELOG.md#102)

2. A default `errorMessage` of `'This input needs your attention'` will render below text input when state is invalid.

3. A default `successMessage` of `'Success'` will render when state is valid. `successMessage` prop accepts a custom string.

4. Disabled `TextInput` component no longer renders the `disabled` attribute and instead relies on `aria-disabled`.

The last change is made to ensure that disabled components are still focusable to users using keyboard navigation.

For more on `aria-disabled` see the [documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled)

#### Migration guide

Functionally, migration should be seamless, however there may be unit/integration/e2e tests that relied on this behavior.

##### Jest/RTL

Generally, only this repo should need to test that these components have a specific attribute. We recommend updating unit tests to check that some event was or was not called.

However, there are cases where this may still need to be tested. In these cases, replace any `expect(textInput).toBeDisabled()` with an explicit check for `expect(textInput).toHaveAttribute("aria-disabled", "true")`.

##### Cypress

Similar to unit tests, you should generally test functionality and not implementation details. However, to test this in Cypress replace any `cy.get(textInput).should('be.disabled');` checks with `cy.get(textInput).invoke('attr', 'aria-disabled').should('eq', 'true');`

