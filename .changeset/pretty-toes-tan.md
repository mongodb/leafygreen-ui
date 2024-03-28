---
'@leafygreen-ui/text-area': major
---

[LG-4144](https://jira.mongodb.org/browse/LG-4144)

Disabled `TextArea` component no longer renders the `disabled` attribute and instead relies on `aria-disabled` and `readonly` attributes.

This change is made to ensure that disabled components are still focusable to users using keyboard navigation.

For more on `aria-disabled` see the [documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled)

#### Migration guide

Functionally, migration should be seamless, however there may be unit/integration/e2e tests that relied on this behavior.

##### Jest/RTL

Generally, only this repo should need to test that these components have a specific attribute. We recommend updating unit tests to check that some event was or was not called.

However, there are cases where this may still need to be tested. In these cases, replace any `expect(textArea).toBeDisabled()` with an explicit check for `expect(textArea).toHaveAttribute("aria-disabled", "true")`.

##### Cypress

Similar to unit tests, you should generally test functionality and not implementation details. However, to test this in Cypress replace any `cy.get(textArea).should('be.disabled');` checks with `cy.get(textArea).invoke('attr', 'aria-disabled').should('eq', 'true');`
