---
'@leafygreen-ui/popover': major
'@leafygreen-ui/tooltip': minor
---

Added Justify.Fit to tooltip/popover, and Align.CenterHorizontal and Align.CenterVertical to popover

For direct consumers of <Popover>, the function-as-a-child pattern now passes `align` and `justify` params,
and the `justification` param/enum has been removed. This should be the only breaking change in this release.
