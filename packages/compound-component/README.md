# Compound Component

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/compound-component.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/compound-component/live-example/)

Utility functions for creating compound components in React. This package provides factory functions to create components with attached sub-components, following the compound component pattern.

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/compound-component
```

### Yarn

```shell
yarn add @leafygreen-ui/compound-component
```

### NPM

```shell
npm install @leafygreen-ui/compound-component
```

## Usage

### Basic Compound Component

Use `CompoundComponent` to create a parent component with attached sub-components:

```tsx
import {
  CompoundComponent,
  CompoundSubComponent,
} from '@leafygreen-ui/compound-component';

// Create a sub-component
const MySubComponent = CompoundSubComponent(
  ({ children }) => <div className="sub-component">{children}</div>,
  {
    displayName: 'MySubComponent',
    key: 'isMySubComponent',
  },
);

// Create the main compound component
const MyComponent = CompoundComponent(
  ({ children }) => <div className="main-component">{children}</div>,
  {
    displayName: 'MyComponent',
    SubComponent: MySubComponent,
  },
);

// Usage
function App() {
  return (
    <MyComponent>
      Main content
      <MyComponent.SubComponent>Sub content</MyComponent.SubComponent>
    </MyComponent>
  );
}
```

### Multiple Sub-Components

You can attach multiple sub-components to a compound component:

```tsx
const Header = CompoundSubComponent(
  ({ children }) => <header>{children}</header>,
  {
    displayName: 'Header',
    key: 'isHeader',
  },
);

const Body = CompoundSubComponent(({ children }) => <main>{children}</main>, {
  displayName: 'Body',
  key: 'isBody',
});

const Footer = CompoundSubComponent(
  ({ children }) => <footer>{children}</footer>,
  {
    displayName: 'Footer',
    key: 'isFooter',
  },
);

const Card = CompoundComponent(
  ({ children }) => <div className="card">{children}</div>,
  {
    displayName: 'Card',
    Header,
    Body,
    Footer,
  },
);

// Usage
function App() {
  return (
    <Card>
      <Card.Header>Card Title</Card.Header>
      <Card.Body>Card content goes here</Card.Body>
      <Card.Footer>Card actions</Card.Footer>
    </Card>
  );
}
```

### With TypeScript Props

Both factories support typed props:

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

interface IconProps {
  name: string;
  size?: number;
}

const Icon = CompoundSubComponent<'isIcon', IconProps>(
  ({ name, size = 16 }) => (
    <span className={`icon-${name}`} style={{ fontSize: size }} />
  ),
  {
    displayName: 'Icon',
    key: 'isIcon',
  },
);

const Button = CompoundComponent<ButtonProps>(
  ({ variant = 'primary', onClick, children }) => (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  ),
  {
    displayName: 'Button',
    Icon,
  },
);

// Usage with props
function App() {
  return (
    <Button variant="secondary" onClick={() => console.log('clicked')}>
      <Button.Icon name="star" size={20} />
      Click me
    </Button>
  );
}
```

## API

### `CompoundComponent<Props, Properties>(componentRenderFn, properties)`

Creates a compound component with attached sub-components.

**Parameters:**

- `componentRenderFn`: The React component render function
- `properties`: Object containing `displayName` and any sub-components to attach

**Returns:** A React component with the sub-components attached as static properties

### `CompoundSubComponent<Key, Props>(componentRenderFn, properties)`

Creates a sub-component with a static key property for identification.

**Parameters:**

- `componentRenderFn`: The React component render function
- `properties`: Object containing `displayName` and `key`

**Returns:** A React component with the specified key property set to `true`

### Key Property

Sub-components created with `CompoundSubComponent` have a static property (specified by the `key` parameter) set to `true`. This can be used for component identification:

```tsx
const MySubComponent = CompoundSubComponent(() => <div />, {
  displayName: 'MySubComponent',
  key: 'isMySubComponent',
});

console.log(MySubComponent.isMySubComponent); // true
```

Note: The `key` property itself is not exposed on the component to avoid conflicts with React's built-in `key` prop.
