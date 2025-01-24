# @lg-charts/core

## 0.12.0

### Minor Changes

- 540017283: Adds a loading state to the `Chart` component

### Patch Changes

- 86cb59d22: - Fixes series emphasis on line hover by de-emphasizing other lines.
  - Cleans up mark base component types internally so position type can be determined by type prop.

## 0.11.1

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @leafygreen-ui/emotion@4.0.9
  - @leafygreen-ui/hooks@8.3.4
  - @leafygreen-ui/icon@13.1.2
  - @leafygreen-ui/icon-button@16.0.2
  - @leafygreen-ui/leafygreen-provider@4.0.2
  - @leafygreen-ui/lib@14.0.2
  - @leafygreen-ui/palette@4.1.3
  - @leafygreen-ui/tokens@2.11.3
  - @leafygreen-ui/typography@20.0.2

## 0.11.0

### Minor Changes

- c2bca684a: Cleans up exported types
  - Adds: `ChartCardProps`, `GridProps`, `HeaderProps`, `LineProps`, `ThresholdLineProps`, `SortDirection`, `SortKey`, `SortOrder`, `TooltipProps`, `XAxisType`, `YAxisType`
  - Removes: `ChartOptions`, `SeriesOption`

### Patch Changes

- a1cb248b6: Reverts absolute dimensions to allow for proper resizing

## 0.10.2

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [53c67fba6]
  - @leafygreen-ui/leafygreen-provider@4.0.1
  - @leafygreen-ui/icon-button@16.0.1
  - @leafygreen-ui/typography@20.0.1
  - @leafygreen-ui/palette@4.1.2
  - @leafygreen-ui/tokens@2.11.2
  - @leafygreen-ui/hooks@8.3.3
  - @leafygreen-ui/icon@13.1.1
  - @leafygreen-ui/lib@14.0.1

## 0.10.1

### Patch Changes

- 86ac72bf3: Fixes duplicate tooltip bug in remounted chart groups
- 99484f720: Fixes bug that prevented chart resizing after initial render
- 8d924f633: Ensure canvas is sized to container with correct pixel ratio

## 0.10.0

### Minor Changes

- 287e1ed46: - Adds `EventMarkerPoint`, `EventMarkerLine`, and `ThresholdLine` components
  - Removes animation delay from tooltip to make tooltip more snappy.

### Patch Changes

- Updated dependencies [3dee4332a]
  - @leafygreen-ui/icon@13.1.0

## 0.9.0

### Minor Changes

- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/leafygreen-provider@4.0.0
  - @leafygreen-ui/icon-button@16.0.0
  - @leafygreen-ui/typography@20.0.0
  - @leafygreen-ui/icon@13.0.0
  - @leafygreen-ui/lib@14.0.0
  - @leafygreen-ui/hooks@8.3.2
  - @leafygreen-ui/tokens@2.11.1

## 0.8.3

### Patch Changes

- 54fb23497: - Adds treeshaking of echarts to minimize bundle size.
  - Improves echart initialization logic to better handle race conditions.

## 0.8.2

### Patch Changes

- 6e37cfa6e: Fixes CommonJS imports

## 0.8.1

### Patch Changes

- a151a3534: Prevents large tooltips from being cutoff my `ChartCard`

## 0.8.0

### Minor Changes

- 9f02d734f: Adds ability to enable zoom selection per axis individually.

## 0.7.0

### Minor Changes

- 878cab966: Adds synchronizing of Tooltips across charts

### Patch Changes

- Updated dependencies [ba855c702]
  - @leafygreen-ui/lib@13.8.2

## 0.6.2

### Minor Changes

- 2393c0c13: Adds zooming functionality to `Chart`

### Patch Changes

- Updated dependencies [04bb887c0]

  - @leafygreen-ui/combobox@10.0.0
  - @leafygreen-ui/hooks@8.3.1

- Updated dependencies [117a463f8]
  - @leafygreen-ui/lib@13.8.1

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
