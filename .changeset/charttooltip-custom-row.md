---
'@lg-charts/core': minor
---

`ChartTooltip` now accepts an optional `customRow` prop to render an additional row (e.g. a total count) at the bottom of the tooltip's series list. The callback receives the hovered series' names and values and returns `{ name, value }` content (or `null` to hide the row). The custom row is not affected by `sort` and does not appear in the `Legend`. Also exports the `CustomRowInfo` and `CustomRowSeriesInfo` types.
