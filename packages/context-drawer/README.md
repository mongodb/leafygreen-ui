# Context Drawer

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/context-drawer.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/context-drawer/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/context-drawer
```

### Yarn

```shell
yarn add @leafygreen-ui/context-drawer
```

### NPM

```shell
npm install @leafygreen-ui/context-drawer
```

## Description

The Context Drawer is a container component that can be used to vertically expand and collapse content. It is intended to be used in situations where there is a need to reveal additional information or functionality in-context, without navigating the user to a new page or view.

## Example

```tsx
import {
  ContextDrawer,
  ContextDrawerButton,
} from '@leafygreen-ui/context-drawer';

<ContextDrawer
  reference={
    <div
      className={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <h2>Reference Element</h2>
      <p>This is the element that the drawer is positioned relative to.</p>
    </div>
  }
  trigger={({ isOpen }) => <ContextDrawerButton isOpen={isOpen} />}
  content={
    <div>
      <p>This is the content of the drawer.</p>
    </div>
  }
/>;
```

## Properties

### ContextDrawer

| Prop             | Type                                                             | Description                                                                                                                             | Default |
| ---------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `content`        | `ReactElement`                                                   | The content to be displayed within the drawer.                                                                                          |         |
| `defaultOpen`    | `boolean`                                                        | The default open state of the drawer when it is uncontrolled.                                                                           | `false` |
| `expandedHeight` | `number \| string`                                               | The maximum height of the content area when expanded. Can be a number (in pixels) or a string (e.g., '50%').                            | `160`   |
| `isOpen`         | `boolean`                                                        | The open state of the drawer. Providing this prop will switch the component to controlled mode.                                         |         |
| `onOpenChange`   | `ChangeEventHandler<boolean>`                                    | Event handler called when the open state of the drawer changes.                                                                         |         |
| `reference`      | `ReactElement`                                                   | The element that the drawer is positioned relative to.                                                                                  |         |
| `trigger`        | `ReactElement` or `(props: { isOpen: boolean }) => ReactElement` | The element that triggers the opening and closing of the drawer. Can be a React element or a function that receives the `isOpen` state. |         |

## Test Harnesses

### `getTestUtils`

`getTestUtils()` is a util that allows consumers to reliably interact with LG `ContextDrawer` in a product test suite. If the `ContextDrawer` instance cannot be found, an error will be thrown.

### Usage

```tsx
import { getTestUtils } from '@leafygreen-ui/context-drawer/testing';

const utils = getTestUtils(lgId?: `lg-${string}`); // lgId refers to the custom `data-lgid` attribute passed to a `ContextDrawer` instance. It defaults to `lg-context_drawer` if undefined.
```

#### Single `ContextDrawer`

```tsx
import { getTestUtils, renderContextDrawer } from '@leafygreen-ui/context-drawer/testing';

...

test('single context drawer', () => {
  renderContextDrawer();
  const { getContextDrawer } = getTestUtils();

  expect(getContextDrawer()).toBeInTheDocument();
});
```

#### Multiple `ContextDrawer` components

When testing multiple `ContextDrawer` components it is recommended to add the custom `data-lgid` attribute to each `ContextDrawer`.

```tsx
import { getTestUtils, renderMultipleContextDrawers } from '@leafygreen-ui/context-drawer/testing';
import userEvent from '@testing-library/user-event';

...

test('multiple context drawers', () => {
  renderMultipleContextDrawers();
  const utilsOne = getTestUtils('lg-context_drawer-1');
  const utilsTwo = getTestUtils('lg-context_drawer-2');

  const toggleButtonTwo = utilsTwo.getToggleButtonUtils().getButton();

  userEvent.click(toggleButtonTwo);

  // First ContextDrawer
  expect(utilsOne.getContextDrawer()).toBeInTheDocument();
  expect(utilsOne.isOpen()).toBeFalsy();

  // Second ContextDrawer
  expect(utilsTwo.getContextDrawer()).toBeInTheDocument();
  expect(utilsTwo.isOpen()).toBeTruthy();
});
```

### Test Utils

```tsx
const {
  findContextDrawer,
  getContextDrawer,
  getToggleButtonUtils,
  isOpen,
  queryContextDrawer,
} = getTestUtils();
```

| Util                   | Description                                                                | Returns                                                                                                                              |
| ---------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `findContextDrawer`    | Returns a promise that resolves to the component's context drawer element. | `Promise<HTMLDivElement>`                                                                                                            |
| `getContextDrawer`     | Returns the component's context drawer element.                            | `HTMLDivElement`                                                                                                                     |
| `getToggleButtonUtils` | Returns test utils for the component's toggle button element.              | [GetTestUtilsReturnType<HTMLButtonElement>](https://github.com/mongodb/leafygreen-ui/blob/main/packages/button/README.md#test-utils) |
| `isOpen`               | Returns a boolean indicating whether the context drawer is open.           | `boolean`                                                                                                                            |
| `queryContextDrawer`   | Returns the component's context drawer element or null if not found.       | `HTMLDivElement \| null`                                                                                                             |
