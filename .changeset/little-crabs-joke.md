---
'@leafygreen-ui/text-area': minor
---

- Extends `DarkModeProps` from `@leafygreen-ui/lib`
- Exports `getLGTextAreaTestUtils`, a util to reliably interact with `LG TextArea` in a product test suite. For more details, check out the [README](https://github.com/mongodb/leafygreen-ui/tree/main/packages/text-area#test-harnesses) [LG-4035](https://jira.mongodb.org/browse/LG-4035)
- Adds `aria-invalid` attribute on the `textarea`. This will be true if `state === error`.
- Exports the constant, `LGIDS_TEXT_AREA`, which stores `data-lgid` values.