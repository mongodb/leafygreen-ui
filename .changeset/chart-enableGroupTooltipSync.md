---
'@lg-charts/core': major
---

Add `enableGroupTooltipSync` prop to `Chart` component to turn on/off tooltip syncing for grouped charts.

Previously, all charts only synced axis pointers and did not sync tooltips. This was done to prevent longer tooltips from visually colliding with other long tooltips.

`enableGroupTooltipSync` defaults to `true` and will always sync tooltips. The prop can be explicitly set to `false` to achieve the previous behavior of only syncing axis pointers and not syncing tooltips.
