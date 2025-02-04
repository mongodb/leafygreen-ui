---
'@leafygreen-ui/input-option': minor
'@leafygreen-ui/ordered-list': minor
'@leafygreen-ui/form-field': minor
'@leafygreen-ui/combobox': minor
'@leafygreen-ui/select': minor
---

[LG-4727](https://jira.mongodb.org/browse/LG-4727): The `description` props in these packages were previously wrapped in a `<p>`. However, there are cases where a `ReactNode` is passed to the `description` prop. According to the HTML spec, `<p>` cannot contain block-level elements: https://www.w3.org/TR/html401/struct/text.html#h-9.3.1
- If a `description` of type `string` is used, it will continue to be wrapped in a `<p>`
- All other types of `description` will be wrapped in a `<div>`
