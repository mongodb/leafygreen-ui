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

| Prop       | Type              | Description                                        | Default |
| ---------- | ----------------- | -------------------------------------------------- | ------- |
| `children` | `React.ReactNode` | Children that will be rendered inside the `Drawer` |         |
| `open`     | `boolean`         | Determines if the `Drawer` is open or closed       | `false` |
| `setOpen`  | `function`        | Callback to change the open state of the `Drawer`  |         |
| `title`    | `string`          | Title of the `Drawer`                              |         |
