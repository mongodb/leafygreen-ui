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

### With `Toolbar` (Recommended)

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

const App = () => {
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

### Without Toolbar

The `Drawer` component is manually rendered as a child of `<DrawerLayout>` and the consumer controls the `open` state.

```tsx
import React, { useState } from 'react';

import Button from '@leafygreen-ui/button';
import { DisplayMode, Drawer, DrawerLayout } from '@leafygreen-ui/drawer';

function App() {
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
        content
      </Drawer>
    </DrawerLayout>
  );
}
```

## DrawerLayout

`DrawerLayout` is a flexible layout wrapper that shift the page content appropriately when a `Drawer` opens. It can be used in both `overlay` and `embedded` modes, with or without a toolbar.

### With `Toolbar`

To use with a `Toolbar`, pass the `toolbarData` prop to render the `Toolbar` items and the `Drawer` content. Each object in the array defines a `Toolbar` item. If a `Toolbar` item is intended to perform an action other than opening a `Drawer` (for example, opening a modal), leave the `content` and `title` fields empty.

The `Drawer` and `Toolbar` component will be rendered automatically based on the `toolbarData` provided.

### `useDrawerToolbarContext()`

To control the `Drawer` state, use the `useDrawerToolbarContext` hook from within `<DrawerLayout>`. This hook provides the `openDrawer()` and `closeDrawer()` functions to open and close the drawer programmatically. The hook takes no arguments and returns the following functions:

| Name        | Signature              | Description                                                                                        |
| ----------- | ---------------------- | -------------------------------------------------------------------------------------------------- |
| openDrawer  | `(id: string) => void` | Opens the `Drawer` associated with the `Toolbar` item that has the matching `id` in `toolbarData`. |
| closeDrawer | `() => void`           | Closes the Drawer.                                                                                 |

### Rendering

```tsx
import React, { useState } from 'react';

import Button from '@leafygreen-ui/button';
import {
  DrawerLayout,
  DrawerLayoutProps,
  useDrawerToolbarContext,
} from '@leafygreen-ui/drawer';

// Data passed to <DrawerLayout /> to render the toolbar items and drawer content
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
        displayMode="embedded"
        onClose={() => {}}
      >
        <Main />
      </DrawerToolbarLayout>
    </div>
  );
};
```

### Without `Toolbar`

#### Single `Drawer` instance

To render a `Drawer` without a `Toolbar`, pass the `isDrawerOpen` prop to `<DrawerLayout>`. The `Drawer` component should be rendered manually as a child of the `DrawerLayout` and the `open` state should be managed by the consumer.

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

#### Multiple overlay `Drawer` instances

When rendering multiple overlay `Drawer` instances, it is recommended to wrap the `Drawer`'s in a `<DrawerStackProvider>`. The `DrawerStackProvider` will manage the stacking of multiple `Drawer` instances by providing the correct z-index.

```tsx
import React, { useState } from 'react';

import Button from '@leafygreen-ui/button';
import { DisplayMode, Drawer, DrawerLayout, DrawerStackProvider } from '@leafygreen-ui/drawer';


const MultipleDrawersComponent = () => {
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);
  const [openC, setOpenC] = useState(false);

  return (
    <DrawerLayout
      displayMode={DisplayMode.Overlay}
      isDrawerOpen={openA || openB || openC}
      className={css`
        height: 500px;
      `}
    >
      <DrawerStackProvider>
        <div
          className={css`
            display: flex;
            flex-direction: column;
            gap: ${spacing[400]}px;
          `}
        >
          <Button onClick={() => setOpenA(prevOpen => !prevOpen)}>
            Toggle Drawer A
          </Button>
          <Button onClick={() => setOpenB(prevOpen => !prevOpen)}>
            Toggle Drawer B
          </Button>
        </div>
        <div>
          <Drawer
            open={openA}
            onClose={() => setOpenA(false)}
            title="Drawer A"
          >
            Drawer content
          </Drawer>
          <Drawer
            open={openB}
            onClose={() => setOpenB(false)}
            title="Drawer B"
          >
            <Button onClick={() => setOpenC(prevOpen => !prevOpen)}>
              Toggle Drawer C
            </Button>
            Drawer content
          </Drawer>
          <Drawer
            open={openC}
            onClose={() => setOpenC(false)}
            title="Drawer C"
          >
            Drawer content
          </Drawer>
        </div>
      </DrawerStackProvider>
    </DrawerLayout>
```

## Props

### DrawerLayout

| Prop                        | Type                                         | Description                                                                                                                                                                                                                                                                                                                                                                            | Default     |
| --------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `children`                  | `React.ReactNode`                            | The content that should live to the left of the `Drawer`. If there is a `Toolbar`, the content will shift to accommodate the `Toolbar`. In addition, if the `DisplayMode` is `embedded`, the content will also be shifted to accommodate the opening of the `Drawer`.                                                                                                                  |             |
| `displayMode` _(optional)_  | `'embedded'` \| `'overlay'`                  | Options to control how the drawer element is displayed <br> \* `'embedded'` will display a drawer as a `<div>` element that takes up the full parent container height and on the same elevation as container page content. <br> \* `'overlay'` will display a drawer as a `<dialog>` element that takes up the full parent container height and elevated above container page content. | `'overlay'` |
| `onClose` _(optional)_      | `React.MouseEventHandler<HTMLButtonElement>` | Event handler called on close button click. If provided, a close button will be rendered in the `Drawer` header. This is _only necessary_ if rendering the `Drawer` with `Toolbar`.                                                                                                                                                                                                    |             |
| `toolbarData` _(optional)_  | `Array<LayoutData>`                          | The array of data that will be used to render the toolbar items and the drawer content. This is **REQUIRED** to render the `Drawer` with `Toolbar`. Without this prop, the `Drawer` and `Toolbar` will not render and you must manually pass the `Drawer` as a child. See below for `LayoutData` props.                                                                                |             |
| `isDrawerOpen` _(optional)_ | `Boolean`                                    | This is _only needed_ if using the `Drawer` without a `Toolbar`. This will shift the layout to the right by the width of the `Drawer` if the `Drawer` is open and the `displayMode` is `embedded`.                                                                                                                                                                                     |             |

### LayoutData

| Prop                 | Type   | Default | Description                                                                                         |
| -------------------- | ------ | ------- | --------------------------------------------------------------------------------------------------- |
| id                   | string |         | The required id of the layout. This is used to open the `Drawer` with `openDrawer(id)`.             |
| title _(optional)_   | string |         | The title of the `Drawer`. This is not required if the `Toolbar` item should not open a `Drawer`.   |
| content _(optional)_ | string |         | The content of the `Drawer`. This is not required if the `Toolbar` item should not open a `Drawer`. |

\+ Extends the following from LG [Toolbar props](https://github.com/mongodb/leafygreen-ui/tree/main/packages/toolbar/README.md#toolbariconbutton): `glyph`, `label`, and `onClick`.

### Drawer

| Prop                       | Type                                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Default     |
| -------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `children`                 | `React.ReactNode`                            | Children that will be rendered inside the `Drawer`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |             |
| `displayMode` _(optional)_ | `'embedded'` \| `'overlay'`                  | Options to control how the drawer element is displayed <br> \* `'embedded'` will display a drawer as a `<div>` element that takes up the full parent container height and on the same elevation as container page content. It is recommended to wrap an embedded drawer within the `DrawerLayout` container<br> \* `'overlay'` will display a drawer as a `<dialog>` element that takes up the full parent container height and elevated above container page content. It is recommended to wrap an overlay drawer within the `DrawerLayout` container | `'overlay'` |
| `onClose` _(optional)_     | `React.MouseEventHandler<HTMLButtonElement>` | Event handler called on close button click. If provided, a close button will be rendered in the `Drawer` header                                                                                                                                                                                                                                                                                                                                                                                                                                        |             |
| `open` _(optional)_        | `boolean`                                    | Determines if the `Drawer` is open or closed                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `false`     |
| `title`                    | `React.ReactNode`                            | Title of the `Drawer`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |             |

### Height Considerations

If rendering `DrawerLayout` inside another element, make sure that element has an explicit height. Otherwise, the layout may not size itself correctly.

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

#### Drawer with Toolbar

```tsx
import { render } from '@testing-library/react';
import {DrawerLayout, DrawerLayoutProps, getTestUtils } from '@leafygreen-ui/drawer';

...

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

test('Drawer', () => {
  render(
    <DrawerLayout toolbarData={DRAWER_TOOLBAR_DATA} displayMode="embedded">
      <Main />
    </DrawerLayout>,
  );

  const { getToolbarTestUtils } = getTestUtils();

  const { getDrawer, getToolbarIconButtonByLabel } = getToolbarTestUtils();
    const codeButton = getToolbarIconButtonByLabel('Code')?.getElement();
    const dashboardButton =
      getToolbarIconButtonByLabel('Code')?.getElement();

    await userEvent.click(codeButton);
    expect(getDrawer().textContent).toContain('Code Title');
});

```

### Test Utils

```tsx
const {
  findDrawer,
  getCloseButtonUtils,
  getDrawer,
  isOpen,
  queryDrawer,
  getToolbarTestUtils,
} = getTestUtils();
```

| Util                  | Description                                                                                                                                               | Returns                                                                                                                    |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `findDrawer`          | Returns a promise that resolves to the drawer element. The promise is rejected if no elements match or if more than one match is found.                   | `Promise<HTMLDialogElement>` \| `Promise<HTMLDivElement>`                                                                  |
| `getCloseButtonUtils` | Returns the button test utils for the close button                                                                                                        | [Button test utils return type](https://github.com/mongodb/leafygreen-ui/blob/main/packages/button/README.md#test-utils)   |
| `getDrawer`           | Returns the drawer element and throws if no elements match or if more than one match is found.                                                            | `HTMLDivElement`                                                                                                           |
| `isOpen`              | Checks the `aria-hidden` attribute and that the drawer element is visible based on CSS properties for `display`, `opacity`, `transform`, and `visibility` | `boolean`                                                                                                                  |
| `queryDrawer`         | Returns the drawer element or `null` if no elements match and throws if more than one match is found.                                                     | `HTMLDivElement`                                                                                                           |
| `getToolbarTestUtils` | Returns the Toolbar test utils for the Toolbar                                                                                                            | [Toolbar test utils return type](https://github.com/mongodb/leafygreen-ui/blob/main/packages/toolbar/README.md#test-utils) |
