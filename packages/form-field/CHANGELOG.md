# @leafygreen-ui/form-field

## 1.2.3

### Patch Changes

- 3273045c: Correctly sets the `readOnly` prop in the `useFormFieldProps` hook. Previously, `readOnly` was only added to an input if `disabled` was true. Now, passing the `readOnly` prop adds it to the resulting input.
- Updated dependencies [ae44834e]
  - @leafygreen-ui/icon@12.4.0

## 1.2.2

### Patch Changes

- c86227a6: Updates Storybook argTypes for mongodb.design

## 1.2.1

### Patch Changes

- 0864a420: Cleans up style definitions
- Updated dependencies [3364b542]
- Updated dependencies [0864a420]
- Updated dependencies [0864a420]
- Updated dependencies [eeea253c]
  - @leafygreen-ui/tokens@2.7.0
  - @leafygreen-ui/typography@19.1.1
  - @leafygreen-ui/icon@12.2.0

## 1.2.0

### Minor Changes

- c406ab85: [LG-2930](https://jira.mongodb.org/browse/LG-2930)

  - Adds and exports `FormFieldFeedback` component
  - Adds and exports `DEFAULT_MESSAGES` constant
  - Updates `FormField` and `FormFieldInputContainer` components to use tokens where possible
  - Refactors `FormField` to use `FormFieldFeedback`

### Patch Changes

- Updated dependencies [c406ab85]
- Updated dependencies [c406ab85]
  - @leafygreen-ui/typography@19.1.0
  - @leafygreen-ui/tokens@2.6.0

## 1.1.1

### Patch Changes

- Updated dependencies [dfd6972c]
  - @leafygreen-ui/typography@19.0.0

## 1.1.0

### Minor Changes

- 27ad3121: [LG-4143](https://jira.mongodb.org/browse/LG-4143)

  Optional `successMessage` prop is rendered below input container when state is valid.

  The following changes are made to `inputProps` spread on the input component contained by `FormFieldInputContainer`:

  - `aria-label` prop is only passed to the input component with an `aria-label` attribute if `label` prop and `aria-labelledby` prop are undefined. If either is defined, `aria-label` attribute on the input component will be undefined as per best practices from [aria-label MDN docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)
    `aria-label` prop can only set the `aria-label` attribute on the input if both `label` prop and `aria-labelledby` prop are undefined

    | 👎 Does not use `aria-label` prop                       | 👎 Does not use `aria-label` prop                                                 | 👍 Does use `aria-label` prop             |
    | ------------------------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------- |
    | `<TextInput label="Label" aria-label="Custom label" />` | `<TextInput aria-label="Custom label" aria-labelledby="other-custom-label-id" />` | `<TextInput aria-label="Custom label" />` |

  - `disabled` prop is passed to the input component with `aria-disabled` attribute
  - `aria-invalid` attribute will always be set on the input component if the parent form field is in an error state. A custom `aria-invalid` prop can be used to customize this logic

  The following styling changes are made:

  - updated left and right spacing of input container for `xsmall`, `small`, and `large` size variants
  - updated light mode placeholder text color
  - moved success and error icon from inside the input to underneath the input, alongside the state feedback message
  - refactored disabled styles although there should be no visual changes associated with this refactor

### Patch Changes

- c3906f78: - Adds `data-lgid` to `Error` and `optional`.
  - Removes `role="presentation"` from `Checkmark` and `Warning` icons and replaces it with `aria-hidden`. The `title` attribute is omitted when using `role="presentation"` and we rely on `title` to query the DOM for those icons.
  - Exports the constant, `LGIDS_FORM_FIELD`, which stores `data-lgid` values.
- Updated dependencies [9402ba0e]
- Updated dependencies [9b71e34d]
- Updated dependencies [c3906f78]
- Updated dependencies [c3906f78]
- Updated dependencies [070736c4]
  - @leafygreen-ui/icon@12.1.0
  - @leafygreen-ui/typography@18.4.0
  - @leafygreen-ui/lib@13.4.0
  - @leafygreen-ui/palette@4.0.10

## 1.0.1

### Patch Changes

- 15185af0: Imports Storybook utilities from `@lg-tools/storybook-utils` (previously imported from `@leafygreen-ui/lib`)
- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [7a0ff1be]
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [66df9ab8]
  - @leafygreen-ui/typography@18.3.0
  - @leafygreen-ui/leafygreen-provider@3.1.12
  - @leafygreen-ui/icon@12.0.1
  - @leafygreen-ui/lib@13.3.0
  - @leafygreen-ui/emotion@4.0.8
  - @leafygreen-ui/hooks@8.1.3
  - @leafygreen-ui/palette@4.0.9
  - @leafygreen-ui/tokens@2.5.2

## 1.0.0

### Major Changes

- 223666eb: Conditionally renders div wrapping `errorMessage` and label/description content, so that styles appear as-expected.

### Patch Changes

- Updated dependencies [74057388]
  - @leafygreen-ui/icon@12.0.0
  - @leafygreen-ui/typography@18.2.3

## 0.3.2

### Patch Changes

- 5249bd3d: Changes the gap between icons from 8px to 4px for all sizes.

## 0.3.1

### Patch Changes

- 54eb3ce8: Replaces with updated tokens
- Updated dependencies [2bceccb1]
- Updated dependencies [2645cd50]
  - @leafygreen-ui/hooks@8.1.1
  - @leafygreen-ui/lib@13.2.1
  - @leafygreen-ui/tokens@2.3.0

## 0.3.0

### Minor Changes

- ffd11f24: Adds `data-testid` to Label, Description & Error elements

### Patch Changes

- ffd11f24: Updates disabled icon colors
- Updated dependencies [9b7a8236]
- Updated dependencies [7f38e78a]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
  - @leafygreen-ui/icon@11.27.1
  - @leafygreen-ui/leafygreen-provider@3.1.11
  - @leafygreen-ui/hooks@8.1.0
  - @leafygreen-ui/lib@13.2.0
  - @leafygreen-ui/typography@18.1.0

## 0.2.0

### Minor Changes

- d16fb891: Initial beta release of FormField

### Patch Changes

- Updated dependencies [dd4f3da8]
- Updated dependencies [90053e16]
  - @leafygreen-ui/lib@13.0.0
  - @leafygreen-ui/typography@18.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.10
