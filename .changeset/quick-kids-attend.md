---
'@leafygreen-ui/drawer': minor
---

## What's New

- Adds `resizable` prop to `DrawerLayout` to support resizable drawers in embedded mode. When `resizable` is true, the drawer can be resized by dragging its edge. _**Note**_ that this feature only works with `DisplayMode.Embedded`.

  ```tsx
  import React, { useState } from 'react';
  import Button from '@leafygreen-ui/button';
  import { DisplayMode, Drawer, DrawerLayout } from '@leafygreen-ui/drawer';
  function ExampleComponent() {
    const [open, setOpen] = useState(false);

    return (
      <DrawerLayout
        displayMode={DisplayMode.Embedded}
        isDrawerOpen={open}
        drawer={<Drawer title="Drawer Title">Drawer content</Drawer>}
        onClose={() => setOpen(false)}
        resizable={true} // Enable resizable drawer in embedded mode
      >
        <main>
          <Button onClick={() => setOpen(prevOpen => !prevOpen)}>
            Open Drawer
          </Button>
        </main>
      </DrawerLayout>
    );
  }
  ```

- Adds `drawer` prop to `DrawerLayout`. This prop is recommended when rendering a `Drawer` without a `Toolbar`. This allows for a more consistent API when using `DrawerLayout` with or without a `Toolbar`. Previously, to render a `Drawer` without a `Toolbar`, you would pass the `Drawer` as a child of `DrawerLayout`.

  **Example of old usage**:
  ```tsx
  import React, { useState } from 'react';

  import Button from '@leafygreen-ui/button';
  import { DisplayMode, Drawer, DrawerLayout } from '@leafygreen-ui/drawer';

  function ExampleComponent() {
    const [open, setOpen] = useState(false);

    return (
      <DrawerLayout displayMode={DisplayMode.Overlay} isDrawerOpen={open}>
        <main>
          <Button onClick={() => setOpen(prevOpen => !prevOpen)}>
            Open Drawer
          </Button>
        </main>
        <Drawer
          displayMode={DisplayMode.Overlay}
          onClose={() => setOpen(false)}
          open={open}
          title="Drawer Title"
        >
          Drawer content goes here
        </Drawer>
      </DrawerLayout>
    );
  }
  ```

  **Example of new usage**:
  ```tsx
  import React, { useState } from 'react';

  import Button from '@leafygreen-ui/button';
  import { DisplayMode, Drawer, DrawerLayout } from '@leafygreen-ui/drawer';

  function ExampleComponent() {
    const [open, setOpen] = useState(false);

    return (
      <DrawerLayout
        displayMode={DisplayMode.Overlay}
        isDrawerOpen={open}
        drawer={<Drawer title="Drawer Title">Drawer content</Drawer>}
        onClose={() => setOpen(false)}
      >
        <main>
          <Button onClick={() => setOpen(prevOpen => !prevOpen)}>
            Open Drawer
          </Button>
        </main>
      </DrawerLayout>
    );
  }
  ```
  With this new change, you can also pass `DrawerLayout` the following props and avoid passing them to `Drawer`:
  - `onClose`: Callback function that is called when the drawer is closed.
  - `displayMode`: The display mode of the drawer.
  - `isDrawerOpen`: Boolean that determines whether the drawer is open or closed.
  - `resizable`: Boolean that determines whether the drawer can be resized (only applicable in `DisplayMode.Embedded`). 


  _**note**:_ You can still pass the `Drawer` as a child of `DrawerLayout`, but using the `drawer` prop is recommended.