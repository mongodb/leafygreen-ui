---
'@lg-charts/core': minor
---

Adds `XAxis` and `YAxis` components, improves update logic, and improves Storybook.

- Adds `XAxis` component for adding an x-axis to a chart.
- Adds `YAxis` component for adding a y-axis to a chart.
- Improves chart options update logic
  - `lodash.merge` was being used originally, but this didn't work quite as expected. The goal is to merge partial options objects in without overwriting previously set options that are unrelated to the update. This was not how it worked, leading to bugs when updating the same base keys with different options. I.e. when adding splitLine configurations on xAxis in order to add grid lines, then adding more axis specific config in XAxis related to the actual axis, the splitLine would be totally overwritten.
- Improves @lg-charts/core Storybook, by adding better descriptions and organization.
