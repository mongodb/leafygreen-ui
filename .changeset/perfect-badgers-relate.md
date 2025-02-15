---
'@leafygreen-ui/drawer': major
---

#### Drawer
Stub for Drawer changeset

#### DrawerTabs
- Adds `DrawerTabs` component with fixed `size`, alignment, and scrolling behavior to be used when implementing a `Tabs` instance as a direct child of a `Drawer` instance. `Tabs` from `@leafygreen-ui/tabs` can be used as children of `DrawerTabs`

#### Test Harnesses
- Exports `getTestUtils`, a util to reliably interact with LG `Drawer` component instances in a product test suite. For more details, check out the [README](https://github.com/mongodb/leafygreen-ui/tree/main/packages/drawer#test-harnesses)
- Exports `getLgIds`, a util to instantiate an object of `data-lgid` values for a given LG `Drawer` component instance.
