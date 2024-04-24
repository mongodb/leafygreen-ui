---
'@leafygreen-ui/combobox': major
---

[LG-4133](https://jira.mongodb.org/browse/LG-4133)

1. Updated styling:
  - updated spacing for `'small'`, `'xsmall'`, and `'large'` size variants
  - updated placeholder text color
  - moved error icon from inside the input to underneath the input, alongside the error message

2. A default `errorMessage` of `'This input needs your attention'` will render below combobox when state is invalid.

3. Added a `valid` state with success icon and `successMessage` prop. A default `successMessage` of `'Success'` will render when state is valid. `successMessage` prop allows customization.

4. Disabled `Combobox` component no longer renders the `disabled` attribute and instead relies on `aria-disabled` and `readonly` attributes.

The last change is made to ensure that disabled components are still focusable to users using keyboard navigation.

For more on `aria-disabled` see the [documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled)

#### Migration guide

Functionally, migration should be seamless, however there may be unit/integration/e2e tests that relied on this behavior.

##### Jest/RTL

Generally, only this repo should need to test that these components have a specific attribute. We recommend updating unit tests to check that some event was or was not called.

However, there are cases where this may still need to be tested. You can replace any `expect(combobox).toBeDisabled()` with an explicit check for `expect(combobox).toHaveAttribute('aria-disabled', 'true')`.

##### Cypress

Similar to unit tests, you should generally test functionality and not implementation details. However, to test this in Cypress replace any `cy.get(combobox).should('be.disabled');` checks with `cy.get(combobox).invoke('attr', 'aria-disabled').should('eq', 'true');`
