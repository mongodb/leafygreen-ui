---
'@leafygreen-ui/code': major
'@leafygreen-ui/syntax': major
---

- Adds the line highlighting feature! This feature is supported through the `highlightLines` prop.
- All code examples are now rendered as a table, making unhighlighted code render consistently with highlighted code.
- Fixes an issue where users might be unable to manually copy code within the code component.
- Deprecates the `multiline` prop in the Code component. Single line code examples are now detected automatically via the presence of line breaks in the string, and single line spacing is applied automatically.
