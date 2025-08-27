---
'@leafygreen-ui/drawer': minor
---

[LG-5473](https://jira.mongodb.org/browse/LG-5473) Add `hasPadding` prop to `Drawer` to allow removing padding styles from container wrapping `children`. Also expose `hasPadding` prop in `toolbarData` objects.

Note: previously, padding styles could be removed by setting `scrollable` to `false`. This has been de-coupled from `scrollable`, and `hasPadding` and `scrollable` work independently. [Learn more here about padding and scroll behavior](https://github.com/mongodb/leafygreen-ui/blob/main/packages/drawer/README.md#padding-and-scroll-behavior)
