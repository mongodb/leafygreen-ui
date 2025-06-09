---
'@leafygreen-ui/drawer': major
---

# What's New

## `DrawerLayout`
- [Adds new component](https://jira.mongodb.org/browse/LG-5026), `DrawerLayout`, that supports `Drawer` + `Toolbar` integration:
  - Provides a flexible layout for displaying content in a `Drawer` with `Toolbar` functionality.
  - Specify `toolbarData` prop to render the Toolbar component. `DrawerLayout` will automatically render the `Toolbar` and `Drawer` components in the correct layout. If the `toolbarData` prop is not provided, the `DrawerLayout` will not render the `Toolbar` or `Drawer` components.
  - Supports both `overlay` and `embedded` display modes.
  - `DrawerLayout` height is contained with the parent container.
  - For availble props, [refer to the README](https://github.com/mongodb/leafygreen-ui/blob/main/packages/drawer/README.md#drawerlayout).
  - To learn more about the `Toolbar` component, refer to the [Toolbar README](https://github.com/mongodb/leafygreen-ui/tree/main/packages/toolbar/README.md)


  **Usage**

    ``` tsx
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