---
'@leafygreen-ui/drawer': major
---

#### Drawer
- Adds `Drawer` component
  - Specify `displayMode` prop with options `embedded` and `overlay` to control how the drawer is displayed.
    - `embedded` will display a drawer that takes up the full parent container height and on the same elevation as main page content. It is recommended to wrap an embedded drawer within the `EmbeddedDrawerLayout` container.
    - `overlay` will display a drawer that takes up the full viewport height and elevated above main page content.
  - Specify `onClose` event handler to conditionally render a close button in drawer header.
- Adds `DrawerStackContext` to manage stacking order for multiple drawer instances.
- Adds `EmbeddedDrawerLayout` to handle container styling for `embedded` drawer instance.
- Adds `DrawerTabs` component with fixed `size`, alignment, and scrolling behavior to be used when implementing a `Tabs` instance as a direct child of a `Drawer` instance.

#### Test Harnesses
- Adds `getTestUtils`, a util to reliably interact with LG `Drawer` component instances in a product test suite. For more details, check out the [README](https://github.com/mongodb/leafygreen-ui/tree/main/packages/drawer#test-harnesses).
- Adds `getLgIds`, a util to instantiate an object of `data-lgid` values for a given LG `Drawer` component instance.
