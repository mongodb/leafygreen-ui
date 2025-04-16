# Toolbar

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/toolbar.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/toolbar/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/toolbar
```

### Yarn

```shell
yarn add @leafygreen-ui/toolbar
```

### NPM

```shell
npm install @leafygreen-ui/toolbar
```

## Example

```js
import {Toolbar, ToolbarIconButton} from `@leafygreen-ui/toolbar`;

<Toolbar>
  <ToolbarIconButton active glyph="Code" label="Code" />
  <ToolbarIconButton glyph="Key" label="Key" />
  <ToolbarIconButton glyph="Plus" label="Plus" />
</Toolbar>
```

### Toolbar

#### Props

| Prop       | Type      | Description                                          | Default |
| ---------- | --------- | ---------------------------------------------------- | ------- |
| `darkMode` | `boolean` | Determines if the component will render in dark mode | `false` |

\+ other HTML `div` element props

### ToolbarIconButton

#### Props

| Prop       | Type                                | Description                                                                                                                                                                                         | Default |
| ---------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `active`   | `boolean`                           | Determines if the icon button is in an active state                                                                                                                                                 | `false` |
| `glyph`    | `Glyph`                             | Name of the icon glyph to display in the button. List of available glyphs can be found in the [Icon README](https://github.com/mongodb/leafygreen-ui/blob/main/packages/icon/README.md#properties). |         |
| `label`    | `string`                            | Text that appears in the tooltip on hover/focus                                                                                                                                                     |         |
| `onClick`  | `(event: React.MouseEvent) => void` | Callback fired when the button is clicked                                                                                                                                                           |         |
| `disabled` | `boolean`                           | Determines if the component will render in dark mode                                                                                                                                                | `false` |

\+ other HTML `button` element props

# Test Harnesses

## getTestUtils()

`getTestUtils()` is a util that allows consumers to reliably interact with LG `Toolbar` in a product test suite. If the `Toolbar` component cannot be found, an error will be thrown.

### Usage

```tsx
import { getTestUtils } from '@leafygreen-ui/gallery-indicator';

const utils = getTestUtils(lgId?: string); // lgId refers to the custom `data-lgid` attribute passed to `Toolbar`. It defaults to 'lg-toolbar' if left empty.
```

#### Single `Toolbar` component

```tsx
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toolbar, ToolbarIconButton, getTestUtils } from '@leafygreen-ui/toolbar';

...

test('Toolbar', () => {
  render(
    <Toolbar>
      <ToolbarIconButton active glyph="Code" label="Code" />
      <ToolbarIconButton glyph="Key" label="Key" />
      <ToolbarIconButton glyph="Plus" label="Plus" />
    </Toolbar>
  );

  const {
    findToolbar,
    getToolbar,
    queryToolbar,
    getAllToolbarIconButtons,
    getToolbarIconButtonByLabel,
    getActiveToolbarIconButton
  } = getTestUtils();

  expect(await findToolbar()).toBeInTheDocument();
  expect(getToolbar()).toBeInTheDocument();
  expect(queryToolbar()).toBeInTheDocument();
  expect(getAllToolbarIconButtons().length).toBe(3);
  expect(getToolbarIconButtonByLabel('Code')?.getElement()).toBeInTheDocument();
  expect(getActiveToolbarIconButton()).toHaveAttribute('aria-label','Code');
});
```

#### Multiple `Toolbar` components

When testing multiple `Toolbar` components, it is recommended to add the custom `data-lgid` attribute to each `Toolbar`.

```tsx
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toolbar, ToolbarIconButton, getTestUtils } from '@leafygreen-ui/toolbar';

...

test('Toolbar', () => {
  render(
    <>
      <Toolbar data-lgid='lg-toolbar-abc'>
        <ToolbarIconButton active glyph="Code" label="Code" />
        <ToolbarIconButton glyph="Key" label="Key" />
      </Toolbar>
      <Toolbar  data-lgid='lg-toolbar-xyz'>
        <ToolbarIconButton active glyph="Code" label="Code" />
        <ToolbarIconButton glyph="Key" label="Key" />
        <ToolbarIconButton glyph="Plus" label="Plus" />
      </Toolbar>
    </>
  );

  const testUtils1 = getTestUtils('lg-toolbar-abc');
  const testUtils2 = getTestUtils('lg-toolbar-xy');

  // First Toolbar
  expect(testUtils1.getAllToolbarIconButtons().length).toBe(2);

  // Second Toolbar
  expect(testUtils2.getAllToolbarIconButtons().length).toBe(3);
});
```

### Test Utils

```tsx
const {
  findToolbar,
  getToolbar,
  queryToolbar,
  getAllToolbarIconButtons,
  getToolbarIconButtonByLabel,
  getActiveToolbarIconButton,
} = getTestUtils();
```

| Util                            | Description                                                                                                                                                           | Returns                                             |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `findToolbar()`                 | Returns a promise that resolves to the element using the `data-lgid` data attribute. The promise is rejected if no elements match or if more than one match is found. | `() => Promise<HTMLButtonElement>`                  |
| `getToolbar()`                  | Returns the element using the `data-lgid` data attribute. Will throw if no elements match or if more than one match is found.                                         | `() => HTMLButtonElement`                           |
| `queryToolbar()`                | Returns the element using the `data-lgid` data attribute or `null` if no elements match. Will throw if more than one match is found.                                  | `() => HTMLButtonElement \| null`                   |
| `getAllToolbarIconButtons()`    | Returns an array of all `<ToolbarIconButtons    />`                                                                                                                   | `() => Array<HTMLButtonElement>`                    |
| `getToolbarIconButtonByLabel()` | Returns the `<ToolbarIconButton />` based on the label                                                                                                                | `(label: string) => ToolbarIconButtonUtils \| null` |
| `getActiveToolbarIconButton()`  | Returns the first active `<ToolbarIconButton />`                                                                                                                      | `() => HTMLButtonElement \| undefined`              |
