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
import { Drawer } from '@leafygreen-ui/drawer';
import Button from '@leafygreen-ui/button';

function ExampleComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(prevOpen => !prevOpen)}>
        Open Drawer
      </Button>
      <Drawer open={open} setOpen={setOpen} title="Drawer Title">
        Drawer Content goes here.
      </Drawer>
    </>
  );
}
```

## Properties

| Prop                    | Type        | Description                                        | Default |
| ----------------------- | ----------- | -------------------------------------------------- | ------- |
| `children` _(optional)_ | `ReactNode` | Children that will be rendered inside the `Drawer` |         |
| `open`                  | `boolean`   | Determines if the `Drawer` is open or closed       | `false` |
| `setOpen`               | `function`  | Callback to change the open state of the `Drawer`  |         |
| `title`                 | `ReactNode` | Title of the `Drawer`                              |         |

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
  render(<Drawer title="Drawer Title">Drawer content goes here.</Drawer>);
  const { getDrawer } = getTestUtils();

  expect(getDrawer()).toBeInTheDocument();
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
const { getDrawer, isOpen } = getTestUtils();
```

| Util        | Description                          | Returns          |
| ----------- | ------------------------------------ | ---------------- |
| `getDrawer` | Returns the drawer node              | `HTMLDivElement` |
| `isOpen`    | Returns whether the drawer is hidden | `boolean`        |
