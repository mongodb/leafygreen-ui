# @lg-charts/core

## 1.0.0

### Minor Changes

- 2393c0c13: Adds zooming functionality to `Chart`

### Patch Changes

- Updated dependencies [04bb887c0]
- Updated dependencies [04bb887c0]
- Updated dependencies [117a463f8]
- Updated dependencies [04bb887c0]
  - @leafygreen-ui/combobox@10.0.0
  - @leafygreen-ui/hooks@8.3.0
  - @leafygreen-ui/lib@13.8.1
  - @leafygreen-ui/leafygreen-provider@3.2.0
  - @leafygreen-ui/icon-button@16.0.0
  - @leafygreen-ui/typography@20.0.0

## 0.6.1

### Patch Changes

- Updated dependencies [fbd0a7310]
  - @leafygreen-ui/lib@13.8.0

## 0.6.0

### Minor Changes

- ba5126735: Adds both `Header` and `ChartCard` components.

### Patch Changes

- Updated dependencies [22d5b2d3d]
  - @leafygreen-ui/icon@12.8.0

## 0.5.0

### Minor Changes

- 7cb786c39: Adds `Tooltip` component

## 0.4.0

### Minor Changes

- 728fa7ae6: Replaces `unit` prop of `XAxis` and `YAxis` with `formatter` prop

### Patch Changes

- 50a7c49b2: - Fixes hiding chart elements when components are removed.
  - Fixes adding of duplicate series.

## 0.3.0

### Minor Changes

- df07b6bfc: Adds `XAxis` and `YAxis` components, improves update logic, and improves Storybook.

  - Adds `XAxis` component for adding an x-axis to a chart.
  - Adds `YAxis` component for adding a y-axis to a chart.
  - Improves chart options update logic
    - `lodash.merge` was being used originally, but this didn't work quite as expected. The goal is to merge partial options objects in without overwriting previously set options that are unrelated to the update. This was not how it worked, leading to bugs when updating the same base keys with different options. I.e. when adding splitLine configurations on xAxis in order to add grid lines, then adding more axis specific config in XAxis related to the actual axis, the splitLine would be totally overwritten.
  - Improves @lg-charts/core Storybook, by adding better descriptions and organization.

## 0.2.1

### Patch Changes

- 685e15323: Fixes bad import in Chart component

## 0.2.0

### Minor Changes

- 1be6f6788: Adds core chart components package

  - Adds `Chart` component for overarching chart configuration.
  - Adds `Line` component for adding individual series data to a chart.
  - Adds `Grid` component for configuring grid line on a chart.
