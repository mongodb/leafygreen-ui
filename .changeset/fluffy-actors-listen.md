---
'@leafygreen-ui/text-input': major
---

[LG-4145](https://jira.mongodb.org/browse/LG-4145)

`aria-label` and `aria-labelledby` props are passed to the input.
- a custom `aria-labelledby` attribute will only be set on the input if `label` prop is undefined. Otherwise, the generated label component id will be used for the `aria-labelledby` attribute
- `aria-label` attribute will only be set on the input if both `label` prop and `aria-labelledby` prop are undefined

[LG-4143](https://jira.mongodb.org/browse/LG-4143)

Disabled `TextInput` component no longer renders the `disabled` attribute and instead relies on `aria-disabled`.

The second change is made to ensure that disabled components are still focusable to users using keyboard navigation.

For more on `aria-disabled` see the [documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled)

#### Migration guide

Functionally, migration should be seamless, however there may be unit/integration/e2e tests that relied on this behavior.

##### Jest/RTL

Generally, only this repo should need to test that these components have a specific attribute. We recommend updating unit tests to check that some event was or was not called.

However, there are cases where this may still need to be tested. In these cases, replace any `expect(textInput).toBeDisabled()` with an explicit check for `expect(textInput).toHaveAttribute("aria-disabled", "true")`.

##### Cypress

Similar to unit tests, you should generally test functionality and not implementation details. However, to test this in Cypress replace any `cy.get(textInput).should('be.disabled');` checks with `cy.get(textInput).invoke('attr', 'aria-disabled').should('eq', 'true');`

