---
'@lg-charts/core': major
---

#### Breaking Changes

- Replaced `groupId`/`enableGroupTooltipSync` props on `Chart` component with new `ChartGroup` component. This fixes an existing `ChartTooltip` bug: when unhovering a grouped chart instance with synced tooltips, tooltips continued to render.

#### Migration Guide

##### Grouped charts

```diff
+ import { ChartGroup } from '@lg-charts/core';

- <Chart groupId="group1" enableGroupTooltipSync>
-   <ChartTooltip />
-   <Line ... />
- </Chart>
- <Chart groupId="group1" enableGroupTooltipSync>
-   <ChartTooltip />
-   <Line ... />
- </Chart>

+  // unstyled container, use className (recommended) or wrap existing container
+ <ChartGroup groupId="group1" enableTooltipSync>
+   <Chart>
+     <ChartTooltip />
+     <Line ... />
+   </Chart>
+   <Chart>
+     <ChartTooltip />
+     <Line ... />
+   </Chart>
+ </ChartGroup>
```

##### Ungrouped charts

No changes required. `Chart` without a `ChartGroup` container continues to work as before.
