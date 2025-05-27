# Drawer

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/drawer.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/drawer/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/drawer
```

### Yarn

```shell
yarn add @leafygreen-ui/drawer
```

### NPM

```shell
npm install @leafygreen-ui/drawer
```

## Example

### Single Overlay Drawer without Toolbar

#### Without `OverlayDrawerLayout`

```tsx
import React, { useState } from 'react';

import Button from '@leafygreen-ui/button';
import {
  DisplayMode,
  Drawer,
  DrawerStackProvider,
} from '@leafygreen-ui/drawer';

function ExampleComponent() {
  const [open, setOpen] = useState(false);

  return (
    <DrawerStackProvider>
      <Button onClick={() => setOpen(prevOpen => !prevOpen)}>
        Open Drawer
      </Button>
      <Drawer
        displayMode={DisplayMode.Overlay}
        onClose={() => setOpen(false)}
        open={open}
        title="Drawer Title"
      >
        content
      </Drawer>
    </DrawerStackProvider>
  );
}
```

or

#### With `OverlayDrawerLayout`

```tsx
function ExampleComponent() {
  const [open, setOpen] = useState(false);

  return (
    <DrawerStackProvider>
      <OverlayDrawerLayout>
        <Button onClick={() => setOpen(prevOpen => !prevOpen)}>
          Open Drawer
        </Button>
        <Drawer
          displayMode={DisplayMode.Overlay}
          onClose={() => setOpen(false)}
          open={open}
          title="Drawer Title"
        >
          content
        </Drawer>
      </OverlayDrawerLayout>
    </DrawerStackProvider>
  );
}
```

### Multiple Overlay Drawers without Toolbar

```tsx
import React, { useState } from 'react';

import Button from '@leafygreen-ui/button';
import {
  DisplayMode,
  Drawer,
  DrawerStackProvider,
} from '@leafygreen-ui/drawer';

function ExampleComponent() {
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);

  return (
    <DrawerStackProvider>
      <Button onClick={() => setOpenA(prevOpen => !prevOpen)}>
        Open Drawer A
      </Button>
      <Button onClick={() => setOpenB(prevOpen => !prevOpen)}>
        Open Drawer B
      </Button>
      <Drawer
        displayMode={DisplayMode.Overlay}
        onClose={() => setOpenA(false)}
        open={openA}
        title="Drawer Title A"
      >
        Drawer Content A
      </Drawer>
      <Drawer
        displayMode={DisplayMode.Overlay}
        onClose={() => setOpenB(false)}
        open={openA}
        title="Drawer Title B"
      >
        Drawer Content B
      </Drawer>
    </DrawerStackProvider>
  );
}
```

### Overlay Drawer with Toolbar

// TODO: in separate PR

### Embedded Drawer without Toolbar

```tsx
import React, { useState } from 'react';

import Button from '@leafygreen-ui/button';
import {
  DisplayMode,
  Drawer,
  DrawerStackProvider,
  EmbeddedDrawerLayout,
} from '@leafygreen-ui/drawer';

function ExampleComponent() {
  const [open, setOpen] = useState(false);

  return (
    <DrawerStackProvider>
      <EmbeddedDrawerLayout isDrawerOpen={open}>
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
      </EmbeddedDrawerLayout>
    </DrawerStackProvider>
  );
}
```

### Embedded Drawer with Toolbar

// TODO: in separate PR

## Properties

### Drawer

| Prop                       | Type                                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Default     |
| -------------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `children` _(optional)_    | `React.ReactNode`                            | Children that will be rendered inside the `Drawer`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |             |
| `displayMode` _(optional)_ | `'embedded'` \| `'overlay'`                  | Options to control how the drawer + toolbar element is displayed <br> \* `'embedded'` will display a drawer as a `<div>` element that takes up the full parent container height and on the same elevation as main page content. It is recommended to wrap an embedded drawer within the `EmbeddedDrawerLayout` container <br> \* `'overlay'` will display a drawer as a `<dialog>` element. It is recommended to wrap an overlay drawer within the `OverlayDrawerLayout` container if you want the drawer to take up the full height of the parent container and is on the same elevation as main page content. | `'overlay'` |
| `onClose` _(optional)_     | `React.MouseEventHandler<HTMLButtonElement>` | Event handler called on close button click. If provided, a close button will be rendered in the `Drawer` header                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |             |
| `open` _(optional)_        | `boolean`                                    | Determines if the `Drawer` is open or closed                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `false`     |
| `title`                    | `React.ReactNode`                            | Title of the `Drawer`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |             |
| `darkMode`                 | `boolean`                                    | Whether the `Drawer` renders in darkMode                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |             |

### EmbeddedDrawerLayout

Use `EmbeddedDrawerLayout` when you need an embedded `Drawer` within a specific container.

| Prop           | Type      | Description                                           | Default |
| -------------- | --------- | ----------------------------------------------------- | ------- |
| `isDrawerOpen` | `boolean` | Determines if the `Drawer` instance is open or closed |         |
| `hasToolbar`   | `boolean` | Determines if the `Toolbar` is present in the layout  | `false` |

### OverlayDrawerLayout

Use `OverlayDrawerLayout` when you need an overlay `Drawer` that is positioned relative to a specific container rather than the entire app. The `OverlayDrawerLayout` adds `position: relative` to its container, ensuring the `Drawer` overlays only its parent element. If the `Drawer` should overlay the entire application, this layout is not necessary.

| Prop         | Type      | Description                                          | Default |
| ------------ | --------- | ---------------------------------------------------- | ------- |
| `hasToolbar` | `boolean` | Determines if the `Toolbar` is present in the layout | `false` |

## DrawerToolbarLayout

Use `DrawerToolbarLayout` when you want to combine a `Drawer` with a `Toolbar`. This component handles rendering both elements and manages their state together.

```tsx
// Dummy Data

const DRAWER_TOOLBAR_DATA: DrawerToolbarLayoutProps['data'] = [
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
```

```tsx
import React, { useState } from 'react';

import Button from '@leafygreen-ui/button';
import {
  DrawerToolbarLayout,
  useDrawerToolbarContext,
} from '@leafygreen-ui/drawer';

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
      <DrawerToolbarLayout data={DRAWER_TOOLBAR_DATA} displayMode="embedded">
        <Main />
      </DrawerToolbarLayout>
    </div>
  );
};
```

## DrawerToolbarLayout

| Prop        | Type                        | Default   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------- | --------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| darkMode    | boolean                     | `false`   | Whether `DrawerToolbarLayout` renders in `darkMode`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| displayMode | `'embedded'` \| `'overlay'` | `overlay` | Options to control how the drawer + toolbar element is displayed <br> \* `'embedded'` will display a drawer as a `<div>` element that takes up the full parent container height and on the same elevation as main page content. It is recommended to wrap an embedded drawer within the `EmbeddedDrawerLayout` container <br> \* `'overlay'` will display a drawer as a `<dialog>` element. It is recommended to wrap an overlay drawer within the `OverlayDrawerLayout` container if you want the drawer to take up the full height of the parent container and is on the same elevation as main page content. |
| data        | `Array<LayoutData>`         |           | The array of data that will be used to render the toolbar items and the drawer content. See below for `LayoutData` props                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

### LayoutData

| Prop    | Type   | Default | Description                                                                                   |
| ------- | ------ | ------- | --------------------------------------------------------------------------------------------- |
| id      | string |         | The required id of the layout. This is used to open the drawer with `openDrawer(id)`.         |
| title   | string |         | The title of the drawer. This is not required if the toolbar item should not open a drawer.   |
| content | string |         | The content of the drawer. This is not required if the toolbar item should not open a drawer. |

\+ Extends the following from LG [Toolbar props](https://github.com/mongodb/leafygreen-ui/tree/main/packages/toolbar/README.md#toolbariconbutton): `glyph`, `label`, and `onClick`

### useDrawerToolbarContext

`useDrawerToolbarContext` is a React hook that enables a consumer to interact with `DrawerToolbarLayout`. It may only be used inside of `DrawerToolbarLayout`. The hook takes no arguments and returns the following functions:

| Name        | Signature              |
| ----------- | ---------------------- |
| openDrawer  | `(id: DataId) => void` |
| closeDrawer | `() => void`           |

# Test Harnesses

## getTestUtils()

`getTestUtils()` is a util that allows consumers to reliably interact with LG `Drawer` in a product test suite. If the `Drawer` component cannot be found, an error will be thrown.

### Usage

```tsx
import { Drawer, getTestUtils } from '@leafygreen-ui/drawer';

const utils = getTestUtils(lgId?: string); // lgId refers to the custom `data-lgid` attribute passed to `Drawer`. It defaults to 'lg-drawer' if left empty.
```

#### Single `Drawer`

```tsx
import { render } from '@testing-library/react';
import { Drawer, DrawerStackProvider, getTestUtils } from '@leafygreen-ui/drawer';

...

test('drawer', () => {
  render(
    <DrawerStackProvider>
      <Drawer open={open} onClose={() => setOpen(false)} title="Drawer Title">
        Drawer content goes here.
      </Drawer>
    </DrawerStackProvider>
  );
  const { getCloseButtonUtils, getDrawer, isOpen } = getTestUtils();

  expect(getDrawer()).toBeInTheDocument();
  expect(getCloseButtonUtils().getButton()).toBeInTheDocument();
  expect(isOpen()).toBeTruthy();
});
```

#### Multiple `Drawer` instances

When testing multiple `Drawer` instances it is recommended to add the custom `data-lgid` attribute to each `Drawer`.

```tsx
import { render } from '@testing-library/react';
import { Drawer, DrawerStackProvider, getTestUtils } from '@leafygreen-ui/drawer';

...

test('Drawer', () => {
  render(
    <DrawerStackProvider>
      <Drawer data-lgid="lg-drawer-A" open={false} title="Drawer Title A">
        Drawer A content goes here.
      </Drawer>
      <Drawer data-lgid="lg-drawer-B" open={true} title="Drawer Title B">
        Drawer B content goes here.
      </Drawer>
    </DrawerStackProvider>,
  );

  const utilsA = getTestUtils('lg-drawer-A');
  const utilsB = getTestUtils('lg-drawer-B');

  // Drawer A
  expect(utilsA.getDrawer()).toBeInTheDocument();
  expect(utilsA.isOpen()).toBeFalsy();

  // Drawer B
  expect(utilsB.getDrawer()).toBeInTheDocument();
  expect(utilsB.isOpen()).toBeTruthy();
});
```

### Test Utils

```tsx
const { findDrawer, getCloseButtonUtils, getDrawer, isOpen, queryDrawer } =
  getTestUtils();
```

// TODO: toolbar utils in a separate PR
| Util | Description | Returns |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `findDrawer` | Returns a promise that resolves to the drawer element. The promise is rejected if no elements match or if more than one match is found. | `Promise<HTMLDialogElement>` \| `Promise<HTMLDivElement>` |
| `getCloseButtonUtils` | Returns the button test utils for the close button | [Button test utils return type](https://github.com/mongodb/leafygreen-ui/blob/main/packages/button/README.md#test-utils) |
| `getDrawer` | Returns the drawer element and throws if no elements match or if more than one match is found. | `HTMLDivElement` |
| `isOpen` | Checks the `aria-hidden` attribute and that the drawer element is visible based on CSS properties for `display`, `opacity`, `transform`, and `visibility` | `boolean` |
| `queryDrawer` | Returns the drawer element or `null` if no elements match and throws if more than one match is found. | `HTMLDivElement` |
