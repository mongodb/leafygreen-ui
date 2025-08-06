# Resizable

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/resizable.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/resizable/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/resizable
```

### Yarn

```shell
yarn add @leafygreen-ui/resizable
```

### NPM

```shell
npm install @leafygreen-ui/resizable
```

## Overview

`Resizable` is an internal hook that provides resizable functionality to an element. It allows you to specify the position of the resizer and provides props to attach to the resizable element. The hook supports both mouse and keyboard interactions for resizing elements.

## Usage

```tsx
import { useResizable, Position } from '@leafygreen-ui/resizable';

const MyComponent = () => {
  const { getResizerProps, size, resizableRef } = useResizable({
    enabled: true,
    initialSize: 300,
    minSize: 200,
    maxSize: 600,
    position: Position.Right,
    onResize: newSize => {
      console.log('New size:', newSize);
    },
  });

  return (
    <div ref={resizableRef} style={{ width: size, height: '100%' }}>
      {/* Your content here */}
      <div {...getResizerProps()} />
    </div>
  );
};
```

## Props

### `useResizable`

| Prop          | Type                                           | Description                                                            | Default |
| ------------- | ---------------------------------------------- | ---------------------------------------------------------------------- | ------- |
| `enabled`     | `boolean`                                      | Whether the resizable feature is enabled                               | `true`  |
| `initialSize` | `number`                                       | The initial size of the resizable element                              | -       |
| `minSize`     | `number`                                       | The minimum size the resizable element can be resized to               | -       |
| `maxSize`     | `number`                                       | The maximum size the resizable element can be resized to               | -       |
| `onResize`    | `(size: number) => void`                       | Callback function that is called when the resizable element is resized | -       |
| `position`    | `'left'` \| `'right'` \| `'top'` \| `'bottom'` | The position of the resizer handle                                     | -       |

## Return Values

The `useResizable` hook returns an object with the following properties:

| Name              | Type                                           | Description                                                       |
| ----------------- | ---------------------------------------------- | ----------------------------------------------------------------- |
| `size`            | `number`                                       | The current size of the resizable element                         |
| `setSize`         | `React.Dispatch<React.SetStateAction<number>>` | Function to programmatically set the size of the element          |
| `isResizing`      | `boolean`                                      | Indicates whether the element is currently being resized          |
| `getResizerProps` | `() => ResizerProps \| undefined`              | Function that returns props to be spread onto the resizer element |
| `resizableRef`    | `React.RefObject<HTMLElement>`                 | Ref object to be attached to the resizable element                |

## Position

The `Position` enum defines where the resizer handle should be placed:

```tsx
import { Position } from '@leafygreen-ui/resizable';

// Available positions
Position.Left; // Resizable element is on the left
Position.Right; // Resizable element is on the right
Position.Top; // Resizable element is on the top
Position.Bottom; // Resizable element is on the bottom
```

## Examples

### Horizontal Resizing (Left/Right)

```tsx
import { useResizable, Position } from '@leafygreen-ui/resizable';

const HorizontalResizablePanel = () => {
  const { getResizerProps, size, resizableRef } = useResizable({
    initialSize: 300,
    minSize: 200,
    maxSize: 600,
    position: // Position.Right or Position.Left
  });

  return (
    <div ref={resizableRef} style={{ width: size }}>
      <div>Resizable Panel Content</div>
      <div
        {...getResizerProps()}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
        }}
      />
    </div>
  );
};
```

### Vertical Resizing (Top/Bottom)

```tsx
import { useResizable, Position } from '@leafygreen-ui/resizable';

const VerticalResizablePanel = () => {
  const { getResizerProps, size, resizableRef } = useResizable({
    initialSize: 200,
    minSize: 100,
    maxSize: 500,
    position: // Position.Bottom or Position.Top
  });

  return (
    <div ref={resizableRef} style={{ height: size }}>
      <div>Resizable Panel Content</div>
      <div
        {...getResizerProps()}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
      />
    </div>
  );
};
```

## Accessibility

The resizer element receives the appropriate ARIA attributes for keyboard navigation:

- `tabIndex={0}` for keyboard focus
- Arrow keys can be used to resize once focused
- ARIA attributes for screen readers indicating resizable functionality

## Keyboard Support

When the resizer is focused, the following keyboard interactions are supported:

| Key          | Action                                                                            |
| ------------ | --------------------------------------------------------------------------------- |
| `ArrowLeft`  | <br> `Position.Right`: Increase the size <br> `Position.Left`: Decrease the size  |
| `ArrowRight` | <br> `Position.Right`: Decrease the size <br> `Position.Left`: Increases the size |
| `ArrowUp`    | <br> `Position.Top`: Decrease the size <br> `Position.Bottom`: Increases the size |
| `ArrowDown`  | <br> `Position.Top`: Increases the size <br> `Position.Bottom`: Decrease the size |
