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
    Sub: MySubComponent,
  },
);

// Usage
function App() {
  return (
    <MyComponent>
      Main content
      <MyComponent.Sub>Sub content</MyComponent.Sub>
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

### Finding Sub-Components in Parent Components

Use `findChild` and `findChildren` utilities to locate specific sub-components within a parent component's children:

```tsx
import {
  CompoundComponent,
  CompoundSubComponent,
  findChild,
  findChildren,
} from '@leafygreen-ui/compound-component';

// Define property constants for type safety and consistency
const CardProperties = {
  Header: 'isHeader',
  Body: 'isBody',
  Footer: 'isFooter',
} as const;

// Create sub-components with identifying properties
const Header = CompoundSubComponent(
  ({ children }) => <header>{children}</header>,
  {
    displayName: 'Header',
    key: CardProperties.Header,
  },
);

const Body = CompoundSubComponent(({ children }) => <main>{children}</main>, {
  displayName: 'Body',
  key: CardProperties.Body,
});

const Footer = CompoundSubComponent(
  ({ children }) => <footer>{children}</footer>,
  {
    displayName: 'Footer',
    key: CardProperties.Footer,
  },
);

// Parent component that uses findChild/findChildren
const Card = CompoundComponent(
  ({ children }) => {
    // Find specific sub-components using property constants
    const header = findChild(children, CardProperties.Header);
    const body = findChild(children, CardProperties.Body);
    const footer = findChild(children, CardProperties.Footer);

    // Find all instances of a sub-component type
    const allBodies = findChildren(children, CardProperties.Body);

    return (
      <div className="card">
        {header && <div className="card-header">{header}</div>}
        {body && <div className="card-body">{body}</div>}
        {footer && <div className="card-footer">{footer}</div>}
        {allBodies.length > 1 && (
          <div className="warning">Multiple body sections found!</div>
        )}
      </div>
    );
  },
  {
    displayName: 'Card',
    Header,
    Body,
    Footer,
  },
);

// Usage - parent can control layout and add wrapper elements
function App() {
  return (
    <Card>
      <Card.Header>Card Title</Card.Header>
      <Card.Body>Main content here</Card.Body>
      <Card.Footer>
        <button>Action</button>
      </Card.Footer>
    </Card>
  );
}
```

### Advanced Usage with Conditional Rendering

```tsx
// Define property constants for the Modal component
const ModalProperties = {
  Header: 'isModalHeader',
  Body: 'isModalBody',
  Footer: 'isModalFooter',
} as const;

const ModalHeader = CompoundSubComponent(
  ({ children }) => <div>{children}</div>,
  {
    displayName: 'ModalHeader',
    key: ModalProperties.Header,
  },
);

const ModalBody = CompoundSubComponent(
  ({ children }) => <div>{children}</div>,
  {
    displayName: 'ModalBody',
    key: ModalProperties.Body,
  },
);

const ModalFooter = CompoundSubComponent(
  ({ children }) => <div>{children}</div>,
  {
    displayName: 'ModalFooter',
    key: ModalProperties.Footer,
  },
);

const Modal = CompoundComponent(
  ({ children }) => {
    // Use property constants instead of string literals
    const header = findChild(children, ModalProperties.Header);
    const body = findChild(children, ModalProperties.Body);
    const footer = findChild(children, ModalProperties.Footer);

    return (
      <div className="modal">
        {/* Only render header section if header component exists */}
        {header && (
          <div className="modal-header">
            {header}
            <button className="close-btn">×</button>
          </div>
        )}

        {/* Body is required */}
        <div className="modal-body">
          {body || <div>No content provided</div>}
        </div>

        {/* Footer is optional */}
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    );
  },
  {
    displayName: 'Modal',
    Header: ModalHeader,
    Body: ModalBody,
    Footer: ModalFooter,
  },
);
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

### `findChild(children, staticProperty)`

Finds the first child component with a matching static property.

**Parameters:**

- `children`: Any React children (ReactNode)
- `staticProperty`: The static property name to check for (string)

**Returns:** The first matching ReactElement or `undefined` if not found

**Search Depth:** Only searches direct children and children inside a single React Fragment level.

### `findChildren(children, staticProperty)`

Finds all child components with a matching static property.

**Parameters:**

- `children`: Any React children (ReactNode)
- `staticProperty`: The static property name to check for (string)

**Returns:** Array of matching ReactElements (empty array if none found)

**Search Depth:** Only searches direct children and children inside a single React Fragment level.

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
