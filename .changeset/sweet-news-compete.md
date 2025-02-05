---
'@leafygreen-ui/button': major
---

[LG-2719](https://jira.mongodb.org/browse/LG-2719): Replace `@leafygreen-ui/box` with `@leafygreen-ui/polymorphic` and refactor `Button` internals. This is a major change because previously, `Button` instances intended to be rendered as an `<a>` that were also `disabled` were forcibly being rendered as a `<button>`. They will now render as an `<a>`.
