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

```tsx
import React, { useState } from 'react';

import Button from '@leafygreen-ui/button';
import { Drawer, DrawerTabs } from '@leafygreen-ui/drawer';
import { Tab } from '@leafygreen-ui/tabs';

function ExampleComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(prevOpen => !prevOpen)}>
        Open Drawer
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Drawer Title">
        <DrawerTabs>
          <Tab name="Tab 1">Tab 1 content</Tab>
          <Tab name="Tab 2">Tab 2 content</Tab>
          <Tab name="Tab 3">Tab 3 content</Tab>
        </DrawerTabs>
      </Drawer>
    </>
  );
}
```

## Properties

### Drawer

| Prop                    | Type                                         | Description                                                                                                     | Default |
| ----------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------- |
| `children` _(optional)_ | `React.ReactNode`                            | Children that will be rendered inside the `Drawer`                                                              |         |
| `onClose` _(optional)_  | `React.MouseEventHandler<HTMLButtonElement>` | Event handler called on close button click. If provided, a close button will be rendered in the `Drawer` header |         |
| `open` _(optional)_     | `boolean`                                    | Determines if the `Drawer` is open or closed                                                                    | `false` |
| `title`                 | `React.ReactNode`                            | Title of the `Drawer`                                                                                           |         |

### DrawerTabs

Refer to the [props table in @leafygreen-ui/tabs README.md](https://github.com/mongodb/leafygreen-ui/blob/main/packages/tabs/README.md#properties) for a full list of props that can be passed to `DrawerTabs` instances.

`size` prop is fixed to ensure proper UI within the `Drawer`.

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
import { Drawer, getTestUtils } from '@leafygreen-ui/drawer';

...

test('drawer', () => {
  render(
    <Drawer open={open} onClose={() => setOpen(false)} title="Drawer Title">
      Drawer content goes here.
    </Drawer>
  );
  const { getCloseButtonUtils, getDrawer } = getTestUtils();

  expect(getDrawer()).toBeInTheDocument();
  expect(getCloseButtonUtils().getButton()).toBeInTheDocument();
});
```

#### Multiple `Drawer` instances

When testing multiple `Drawer` instances it is recommended to add the custom `data-lgid` attribute to each `Drawer`.

```tsx
import { render } from '@testing-library/react';
import { Drawer, getTestUtils } from '@leafygreen-ui/drawer';

...

test('Drawer', () => {
  render(
    <>
      <Drawer data-lgid="drawer-1" open={true} title="Drawer Title">
        Drawer 1 content goes here.
      </Drawer>
      <Drawer data-lgid="drawer-2" open={false} title="Drawer Title">
        Drawer 2 content goes here.
      </Drawer>
    </>,
  );
  const utilsOne = getTestUtils('drawer-1'); // data-lgid
  const utilsTwo = getTestUtils('drawer-2'); // data-lgid
  // First Drawer
  expect(utilsOne.getDrawer()).toBeInTheDocument();
  expect(utilsOne.isOpen()).toBe(true);

  // Second Drawer
  expect(utilsTwo.getDrawer()).toBeInTheDocument();
  expect(utilsTwo.isOpen()).toBe(false);
});
```

### Test Utils

```tsx
const { getCloseButtonUtils, getDrawer, isOpen } = getTestUtils();
```

| Util                  | Description                                        | Returns                                                                                                                  |
| --------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `getCloseButtonUtils` | Returns the button test utils for the close button | [Button test utils return type](https://github.com/mongodb/leafygreen-ui/blob/main/packages/button/README.md#test-utils) |
| `getDrawer`           | Returns the drawer node                            | `HTMLDivElement`                                                                                                         |
| `isOpen`              | Returns whether the drawer is hidden               | `boolean`                                                                                                                |
