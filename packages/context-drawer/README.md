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
