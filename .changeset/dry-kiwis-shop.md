---
'@leafygreen-ui/input-option': patch
'@leafygreen-ui/ordered-list': patch
'@leafygreen-ui/form-field': patch
'@leafygreen-ui/combobox': patch
'@leafygreen-ui/select': patch
---

[LG-4727](https://jira.mongodb.org/browse/LG-4727): The `description` props in these packages were previously wrapped in a `<p>`. However, in cases where a `ReactNode` was passed to the `description` prop, it would lead to a browser error. According to the HTML spec, `<p>` cannot contain block-level elements: https://www.w3.org/TR/html401/struct/text.html#h-9.3.1

The latest version of `@leafygreen-ui/typography` will typecheck `description` to ensure the proper element is used.
- If a `description` of type `string` or `number` is used, it will continue to be wrapped in a `<p>`
- All other types of `description` will be wrapped in a `<div>`
