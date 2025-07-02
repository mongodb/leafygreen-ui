# @leafygreen-ui/drawer

## 4.0.1

### Patch Changes

- 164b15f: Use `LgIdString` type and remove setting `DEFAULT_LGID_ROOT`.
- Updated dependencies [164b15f]
- Updated dependencies [518ce41]
- Updated dependencies [3bef1e7]
- Updated dependencies [3bef1e7]
- Updated dependencies [164b15f]
- Updated dependencies [164b15f]
- Updated dependencies [1eafbb5]
- Updated dependencies [da277d5]
  - @leafygreen-ui/lib@15.1.0
  - @leafygreen-ui/hooks@9.1.0
  - @leafygreen-ui/button@24.0.2
  - @leafygreen-ui/typography@22.0.0
  - @leafygreen-ui/tabs@16.0.0
  - @leafygreen-ui/icon@14.1.0
  - @lg-tools/test-harnesses@0.3.2
  - @leafygreen-ui/icon-button@17.0.2
  - @leafygreen-ui/leafygreen-provider@5.0.1
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/polymorphic@3.0.2
  - @leafygreen-ui/tokens@3.1.1
  - @leafygreen-ui/toolbar@1.0.1

## 4.0.0

### Major Changes

- caaaeeb: # What's New

  ## `DrawerLayout`

  - [Adds new component](https://jira.mongodb.org/browse/LG-5026), `DrawerLayout`, that supports `Drawer` + `Toolbar` integration:

    - Provides a flexible layout for displaying content in a `Drawer` with `Toolbar` functionality.
    - Specify `toolbarData` prop to render the Toolbar component. `DrawerLayout` will automatically render the `Toolbar` and `Drawer` components in the correct layout. If the `toolbarData` prop is not provided, the `DrawerLayout` will not render the `Toolbar` or `Drawer` components.
    - Supports both `overlay` and `embedded` display modes.
    - `DrawerLayout` height is contained with the parent container.
    - For availble props, [refer to the README](https://github.com/mongodb/leafygreen-ui/blob/main/packages/drawer/README.md#drawerlayout).
    - To learn more about the `Toolbar` component, refer to the [Toolbar README](https://github.com/mongodb/leafygreen-ui/tree/main/packages/toolbar/README.md)

    **Usage**

    ```tsx
    import React, { useState } from 'react';
    import Button from '@leafygreen-ui/button';
    import {
      DrawerLayout,
      DrawerLayout,
      useDrawerToolbarContext,
      type DisplayMode,
    } from '@leafygreen-ui/drawer';

    const DRAWER_TOOLBAR_DATA: DrawerLayoutProps['toolbarData'] = [
      {
        id: 'Code',
        label: 'Code',
        content: <DrawerContent />,
        title: 'Code Title',
        glyph: 'Code',
        onClick: () => {
          console.log('Code clicked');
        },
      },
      {
        id: 'Dashboard',
        label: 'Dashboard',
        content: <DrawerContent />,
        title: 'Dashboard Title',
        glyph: 'Dashboard',
        onClick: () => {
          console.log('Dashboard clicked');
        },
      },
      {
        id: 'Plus',
        label: "Perform some action, doesn't open a drawer",
        glyph: 'Plus',
        onClick: () => {
          console.log('Plus clicked, does not update drawer');
        },
      },
    ];

    const Component = () => {
      const Main = () => {
        const { openDrawer, closeDrawer } = useDrawerToolbarContext();

        return (
          <main>
            <Button onClick={() => openDrawer('Code')}>Open Code Drawer</Button>
            <Content />
            <Button onClick={() => closeDrawer()}>Close Drawer</Button>
          </main>
        );
      };

      return (
        <div>
          <DrawerLayout
            toolbarData={DRAWER_TOOLBAR_DATA}
            displayMode={DisplayMode.Overlay}
          >
            <Main />
          </DrawerLayout>
        </div>
      );
    };
    ```

  # What's changed

  - Going forward a `Drawer` + `Toolbar` is the recommended usage. If you must use a `Drawer` without a `Toolbar`, it is encouraged to wrap the `Drawer` in the new `DrawerLayout` component. This will handle the layout shift that occurs when the `Drawer` is opened and closed, ensuring a consistent user experience.

    _Note_: An `overlay` `Drawer` no longer uses `position: fixed` to position itself. Instead, it uses `position: absolute` to ensure that the `Drawer` is positioned relative to its parent container.

    **Usage without `Toolbar`**

    ```tsx
    import React, { useState } from 'react';

    import Button from '@leafygreen-ui/button';
    import { DisplayMode, Drawer, DrawerLayout } from '@leafygreen-ui/drawer';

    function ExampleComponent() {
      const [open, setOpen] = useState(false);

      return (
        <DrawerLayout displayMode={DisplayMode.Embedded} isDrawerOpen={open}>
          <main>
            <Button onClick={() => setOpen(prevOpen => !prevOpen)}>
              Open Drawer
            </Button>
          </main>
          <Drawer
            displayMode={DisplayMode.Embedded}
            onClose={() => setOpen(false)}
            open={open}
            title="Drawer Title"
          >
            Drawer content
          </Drawer>
        </DrawerLayout>
      );
    }
    ```

  - Adds code splitting for test utilities

    - Adds `/testing` entry point
    - Removes `getTestUtils` from main bundle entry point

    When using the component, testing utilities won't be included into your final bundle

    ```tsx
    // App.tsx
    import { DrawerLayout } from `@leafygreen-ui/drawer`
    ```

    Testing utilities (and their dependencies) will only be imported if you import them explicitly

    ```tsx
    import { getTestUtils } from `@leafygreen-ui/drawer/testing`
    ```

  - Removes deprecated `DrawerTabs` package internally

### Patch Changes

- Updated dependencies [caaaeeb]
- Updated dependencies [caaaeeb]
- Updated dependencies [4bd4da3]
- Updated dependencies [9de60ce]
- Updated dependencies [caaaeeb]
  - @lg-tools/test-harnesses@0.3.1
  - @leafygreen-ui/toolbar@1.0.0
  - @leafygreen-ui/tokens@3.1.0
  - @leafygreen-ui/polymorphic@3.0.1
  - @leafygreen-ui/icon-button@17.0.1
  - @leafygreen-ui/button@24.0.1
  - @leafygreen-ui/tabs@15.0.1
  - @leafygreen-ui/typography@21.0.1

## 3.0.0

### Major Changes

- 0757cfbfc: Updates Typescript build to TS5.8

### Patch Changes

- 0757cfbfc: Adds `@lg-tools/build` as a dev dependency
- 0757cfbfc: Adds missing `@lg-tools/` devDependencies.
  Updates `build`, `tsc` & `docs` scripts to use `lg-build *` cli
- 0757cfbfc: Updates `types` entry point to `./dist/types`.
  Removes redundant `compilerOptions` from TSConfig
- 0757cfbfc: Updates `main` entry point in package.json to `./dist/umd`
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
  - @leafygreen-ui/leafygreen-provider@5.0.0
  - @leafygreen-ui/icon-button@17.0.0
  - @leafygreen-ui/polymorphic@3.0.0
  - @lg-tools/test-harnesses@0.3.0
  - @leafygreen-ui/typography@21.0.0
  - @leafygreen-ui/emotion@5.0.0
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/button@24.0.0
  - @leafygreen-ui/tokens@3.0.0
  - @leafygreen-ui/hooks@9.0.0
  - @leafygreen-ui/icon@14.0.0
  - @leafygreen-ui/tabs@15.0.0
  - @leafygreen-ui/lib@15.0.0

## 2.0.5

### Patch Changes

- Updated dependencies [eca6e3fdc]
  - @leafygreen-ui/icon@13.4.0
  - @leafygreen-ui/button@23.1.6
  - @leafygreen-ui/icon-button@16.0.12
  - @leafygreen-ui/tabs@14.2.5
  - @leafygreen-ui/typography@20.1.9

## 2.0.4

### Patch Changes

- Updated dependencies [21bcd4195]
- Updated dependencies [1dbfb7064]
  - @leafygreen-ui/hooks@8.4.1
  - @leafygreen-ui/icon@13.3.0
  - @leafygreen-ui/leafygreen-provider@4.0.7
  - @leafygreen-ui/tabs@14.2.4
  - @leafygreen-ui/emotion@4.1.1
  - @leafygreen-ui/button@23.1.6
  - @leafygreen-ui/icon-button@16.0.11
  - @leafygreen-ui/typography@20.1.8

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
