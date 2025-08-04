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

`Resizable` is an internal hook that provides resizable functionality to an element. It allows you to specify the position of the resizer and provides props to attach to the resizable element.

## Usage

```tsx
import { useResizable, Position } from '@leafygreen-ui/resizable';
const MyComponent = () => {
  const { resizableRef, getResizerProps } = useResizable({
    position: Position.Right,
  });

  return (
    <div ref={resizableRef}>
      {/* Your content here */}
      <div {...getResizerProps()} />
    </div>
  );
};
```

TODO: continue

```

```
