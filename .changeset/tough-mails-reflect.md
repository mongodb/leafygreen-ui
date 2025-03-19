---
'@lg-charts/core': minor
---

Makes various improvements to the `Tooltip` component
- Adds `seriesNameFormatter` prop to allow formatting of series names.
- Updates prop `valueFormatter` to `seriesValueFormatter`, which can now return a `ReactNode` in addition to a string.
- Makes multiple style improvements.
- Replaces `sortDirection` and `sortKey` props with `sort` prop that accepts a compare function to be used for custom sorting.
