---
'@leafygreen-ui/radio-box-group': major
'@leafygreen-ui/radio-group': major
'@leafygreen-ui/checkbox': major
---

[LG-4126](https://jira.mongodb.org/browse/LG-4126)

Disabled `Checkbox`, `RadioBox`, and `Radio` components no longer render the `disabled` attribute, but rely on `aria-disabled` instead.

This change is made to ensure that disabled components are still focusable to users using keyboard navigation.

For more on `aria-disabled` see the [documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled)

Additionally, styling changes are made to ensure consistent implementation of `disabled` state styles.

#### Migration guide

Functionally, migration should be seamless, however there may be unit/integration/e2e tests that relied on this behavior.

##### Jest/RTL

Generally, only this repo should need to test that these components have a specific attribute. We recommend updating unit tests to check that some event was or was not called.

However, there are cases where this may still need to be tested. In these cases, replace any `expect(checkbox).toBeDisabled()` with an explicit check for `expect(checkbox).toHaveAttribute("aria-disabled", "true")`.

##### Cypress

Similar to unit tests, you should generally test functionality and not implementation details. However, to test this in Cypress replace any `cy.get(checkbox).should('be.disabled');` checks with `cy.get(checkbox).invoke('attr', 'aria-disabled').should('eq', 'true');`
