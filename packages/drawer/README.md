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

### Overlay Drawer without a `Toolbar`

The `Drawer` component is manually rendered as a child of `<DrawerLayout>`

```tsx
import React, { useState } from 'react';

import Button from '@leafygreen-ui/button';
import { DisplayMode, Drawer, DrawerLayout } from '@leafygreen-ui/drawer';

function ExampleComponent() {
  const [open, setOpen] = useState(false);

  return (
    <DrawerLayout displayMode={DisplayMode.Overlay}>
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
        content
      </Drawer>
    </DrawerLayout>
  );
}
```

### Overlay Drawer with Toolbar

TODO: updated with hook in a separate PR

```tsx
import React, { useState } from 'react';

import Button from '@leafygreen-ui/button';
import {
  DisplayMode,
  Drawer,
  DrawerLayout,
  DrawerLayoutProps,
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

function ExampleComponent() {
  const [open, setOpen] = useState(false);

  return (
    <DrawerLayout
      displayMode={DisplayMode.Overlay}
      toolbarData={DRAWER_TOOLBAR_DATA}
      onClose={() => {}}
    >
      <main>content</main>
    </DrawerLayout>
  );
}
```

### Embedded Drawer without a `Toolbar`

The `Drawer` component is manually rendered as a child of `<DrawerLayout>`

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

### Embedded Drawer with Toolbar

TODO: updated with hook in a separate PR

```tsx
import React, { useState } from 'react';

import Button from '@leafygreen-ui/button';
import {
  DisplayMode,
  Drawer,
  DrawerLayout,
  DrawerLayoutProps,
} from '@leafygreen-ui/drawer';

const DRAWER_TOOLBAR_DATA: DrawerLayoutProps['data'] = [
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

function ExampleComponent() {
  const [open, setOpen] = useState(false);

  return (
    <DrawerLayout
      displayMode={DisplayMode.Embedded}
      toolbarData={DRAWER_TOOLBAR_DATA}
      onClose={() => {}}
    >
      <main>content</main>
    </DrawerLayout>
  );
}
```

## Properties

### Drawer

| Prop                       | Type                                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Default     |
| -------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `children`                 | `React.ReactNode`                            | Children that will be rendered inside the `Drawer`                                                                                                                                                                                                                                                                                                                                                                                                           |             |
| `displayMode` _(optional)_ | `'embedded'` \| `'overlay'`                  | Options to control how the drawer element is displayed <br> \* `'embedded'` will display a drawer as a `<div>` element that takes up the full parent container height and on the same elevation as main page content. It is recommended to wrap an embedded drawer within the `EmbeddedDrawerLayout` container <br> \* `'overlay'` will display a drawer as a `<dialog>` element that takes up the full viewport height and elevated above main page content | `'overlay'` |
| `onClose` _(optional)_     | `React.MouseEventHandler<HTMLButtonElement>` | Event handler called on close button click. If provided, a close button will be rendered in the `Drawer` header                                                                                                                                                                                                                                                                                                                                              |             |
| `open` _(optional)_        | `boolean`                                    | Determines if the `Drawer` is open or closed                                                                                                                                                                                                                                                                                                                                                                                                                 | `false`     |
| `title`                    | `React.ReactNode`                            | Title of the `Drawer`                                                                                                                                                                                                                                                                                                                                                                                                                                        |             |

### DrawerLayout

`DrawerLayout` is a layout wrapper that helps to shift the page content when a Drawer opens.

| Prop                        | Type                                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Default     |
| --------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `children`                  | `React.ReactNode`                            | Children that will be rendered inside the `Drawer`                                                                                                                                                                                                                                                                                                                                                                                                           |             |
| `displayMode` _(optional)_  | `'embedded'` \| `'overlay'`                  | Options to control how the drawer element is displayed <br> \* `'embedded'` will display a drawer as a `<div>` element that takes up the full parent container height and on the same elevation as main page content. It is recommended to wrap an embedded drawer within the `EmbeddedDrawerLayout` container <br> \* `'overlay'` will display a drawer as a `<dialog>` element that takes up the full viewport height and elevated above main page content | `'overlay'` |
| `onClose` _(optional)_      | `React.MouseEventHandler<HTMLButtonElement>` | Event handler called on close button click. If provided, a close button will be rendered in the `Drawer` header. This is _only necessary_ if rendering the `Drawer` with `Toolbar`.                                                                                                                                                                                                                                                                          |             |
| `toolbarData` _(optional)_  | `Array<LayoutData>`                          | The array of data that will be used to render the toolbar items and the drawer content. This is **REQUIRED** to render the `Drawer` with `Toolbar`. Without this prop, the `Drawer` and `Toolbar` will not render and you must manually pass the `Drawer` as a child. See below for `LayoutData` props.                                                                                                                                                      |             |
| `isDrawerOpen` _(optional)_ | `Boolean`                                    | This is _only needed_ if using the Drawer without a toolbar. Determines if the `Drawer` is open. This will shift the layout to the right by the width of the `Drawer` if `displayMode` is set to `embedded`.                                                                                                                                                                                                                                                 |             |

### LayoutData

<!-- TODO: added in separate PR -->

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
    <DrawerLayout displayMode={DisplayMode.Overlay}>
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
        content
      </Drawer>
    </DrawerLayout>
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
