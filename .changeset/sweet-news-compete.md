---
'@leafygreen-ui/button': major
---

[LG-2719](https://jira.mongodb.org/browse/LG-2719): Replace `@leafygreen-ui/box` with `@leafygreen-ui/polymorphic` and refactor `Button` internals.
- This is a major change because previously, `Button` instances intended to be rendered as an `<a>` that were also `disabled` were forcibly being rendered as a `<button>` to avoid incorrectly passing the `disabled` attribute to an `<a>`. From [v20.0.0](https://github.com/mongodb/leafygreen-ui/blob/main/packages/button/CHANGELOG.md#2000), the `Button` component switched to using the `aria-disabled` attribute instead of the `disabled` attribute which removed the need to forcibly render disabled `Button` instances as a `<button>`. Instead, they will now render as an `<a>`.
- Exports `BaseButtonProps` type
