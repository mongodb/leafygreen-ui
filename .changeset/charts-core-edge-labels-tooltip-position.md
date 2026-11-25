---
'@lg-charts/core': minor
---

Adds an `alignEdgeLabels` prop to `XAxis`, which aligns the first and last axis labels inward to the chart edges and always shows them, so edge labels are not clipped or hidden. Adds optional `confine` and `position` props to `ChartTooltip`, passed through to the ECharts tooltip options, so consumers can let the tooltip overflow the chart and control its placement (for example, keeping it beside the cursor). Defaults are unchanged.
