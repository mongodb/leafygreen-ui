# @leafygreen-ui/drawer

## 2.0.3

### Patch Changes

- Updated dependencies [936364416]
  - @leafygreen-ui/icon-button@16.0.10
  - @leafygreen-ui/tabs@14.2.3

## 2.0.2

### Patch Changes

- Updated dependencies [f2ed4b037]
- Updated dependencies [2ab660926]
- Updated dependencies [fd1696643]
- Updated dependencies [e874aeaf9]
  - @leafygreen-ui/emotion@4.1.1
  - @leafygreen-ui/icon@13.2.2
  - @leafygreen-ui/polymorphic@2.0.9
  - @leafygreen-ui/button@23.1.5
  - @leafygreen-ui/hooks@8.4.0
  - @leafygreen-ui/icon-button@16.0.9
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tabs@14.2.3
  - @leafygreen-ui/tokens@2.12.2
  - @leafygreen-ui/typography@20.1.7

## 2.0.1

### Patch Changes

- Updated dependencies [30b13adec]
- Updated dependencies [30b13adec]
- Updated dependencies [78a36d6bb]
  - @leafygreen-ui/hooks@8.4.0
  - @leafygreen-ui/lib@14.2.0
  - @leafygreen-ui/emotion@4.1.0
  - @leafygreen-ui/leafygreen-provider@4.0.6
  - @leafygreen-ui/tabs@14.2.2
  - @leafygreen-ui/button@23.1.4
  - @leafygreen-ui/icon@13.2.1
  - @leafygreen-ui/icon-button@16.0.8
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/polymorphic@2.0.8
  - @leafygreen-ui/tokens@2.12.1
  - @leafygreen-ui/typography@20.1.6

## 2.0.0

### Major Changes

- afd111570: - `DrawerTabs` has been deprecated and is no longer available for use. Stay tuned for an updated way to leverage information architecture within a `Drawer` component.
  - Adds missing exports for `DrawerStackProvider` and `useDrawerStackContext`.
  - Fixes missing ref error in console by adding missing ref in `EmbeddedDrawerLayout`.

## 1.1.1

### Patch Changes

- Updated dependencies [b75c9b896]
- Updated dependencies [16dda633f]
  - @leafygreen-ui/icon-button@16.0.7
  - @leafygreen-ui/leafygreen-provider@4.0.5
  - @leafygreen-ui/tabs@14.2.1
  - @leafygreen-ui/button@23.1.3
  - @leafygreen-ui/typography@20.1.5

## 1.1.0

### Minor Changes

- 8e710ad9d: Update styles of `Drawer` and live example story

## 1.0.0

### Major Changes

- 4b362e136: #### Drawer

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

### Patch Changes

- Updated dependencies [4b362e136]
- Updated dependencies [4b362e136]
  - @leafygreen-ui/tokens@2.12.0
  - @leafygreen-ui/tabs@14.2.0
  - @leafygreen-ui/button@23.1.2
  - @leafygreen-ui/icon-button@16.0.6
  - @leafygreen-ui/typography@20.1.4
