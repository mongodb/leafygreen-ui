---
'@lg-charts/core': minor
---

- ChartTooltip:
  - Added `axisPointer` prop supporting 'line', 'shadow', and 'none' options
  - Added `className` prop for custom styling
  - Bug Fix: renders correctly for values like 0 and empty strings by only checking for null or undefined, not all falsy values
- Bar: `hoverBehavior` prop now accepts 'dim-others' and 'none' options to control hover focus behavior
- XAxis/YAxis: Introduced a new `category` axis type for discrete/categorical datasets (such as for X axes in bar charts).
  - It uses a dedicated axis type definition and a `labels` prop for specifying category names.
  - Existing continuous axis types (`'log'`, `'time'`, `'value'`) remain unchanged, continuing to support `min`, `max`, and `formatter` for customization.