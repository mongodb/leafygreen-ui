---
'@lg-charts/core': major
---

Fixes existing `ChartTooltip` bug: when unhovering a grouped chart instance with synced tooltips, tooltips continued to render

#### Breaking Changes

- Replaced `groupId`/`enableGroupTooltipSync` props on `Chart` component with new `ChartGroupProvider` context provider
- `ChartGroupProvider` is a pure context provider without any rendered DOM elements (you must provide your own container)
- Renamed `enableGroupTooltipSync` prop to `enableTooltipSync`

#### Migration Guide

##### Grouped charts

```diff
- import { Chart, ChartTooltip, Line } from '@lg-charts/core';
+ import { Chart, ChartGroupProvider, ChartTooltip, Line } from '@lg-charts/core';

- <Chart groupId="group1" enableGroupTooltipSync>
-   <ChartTooltip />
-   <Line ... />
- </Chart>
- <Chart groupId="group1" enableGroupTooltipSync>
-   <ChartTooltip />
-   <Line ... />
- </Chart>

+ <ChartGroupProvider groupId="group1" enableTooltipSync>
+   <div className="my-charts-container">
+     <Chart>
+       <ChartTooltip />
+       <Line ... />
+     </Chart>
+     <Chart>
+       <ChartTooltip />
+       <Line ... />
+     </Chart>
+   </div>
+ </ChartGroupProvider>
```

##### Ungrouped charts

No changes required. `Chart` without a `ChartGroupProvider` container continues to work as before.
