# UI Resource Renderer

![npm (scoped)](https://img.shields.io/npm/v/@lg-mcp/ui-resource-renderer.svg)

## Installation

### PNPM

```shell
pnpm add @lg-mcp/ui-resource-renderer
```

### Yarn

```shell
yarn add @lg-mcp/ui-resource-renderer
```

### NPM

```shell
npm install @lg-mcp/ui-resource-renderer
```

## Overview

`@lg-mcp/ui-resource-renderer` provides a React component for rendering MCP (Model Context Protocol) UI resources. This component wraps `@mcp-ui/client`'s `UIResourceRenderer` with LeafyGreen-specific defaults, including automatic iframe resizing.

## Components

### UIResourceRenderer

Renders an MCP UI resource within an iframe.

#### Example

```tsx
import { UIResourceRenderer } from '@lg-mcp/ui-resource-renderer';

function MyComponent() {
  const resource = {
    uri: 'https://example.com/ui-resource',
    mimeType: 'text/html',
    // ... other resource properties
  };

  return (
    <UIResourceRenderer
      resource={resource}
      iframeRenderData={{
        darkMode: false,
        databases: ['db1', 'db2'],
      }}
      onActionResult={result => {
        console.log('Action result:', result);
      }}
    />
  );
}
```

#### Properties

| Prop               | Type                               | Description                                                                                                  | Default     |
| ------------------ | ---------------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------- |
| `resource`         | `UIResource`                       | The MCP UI resource to render. Required.                                                                     | -           |
| `iframeRenderData` | `Record<string, unknown>`          | Data to pass to the iframe via renderData. Use this for any data needed in the iframe, including `darkMode`. | `undefined` |
| `onActionResult`   | `(result: UIActionResult) => void` | Callback invoked when the embedded UI performs an action.                                                    | -           |
| `htmlProps`        | `object`                           | Additional props to pass to the underlying HTML iframe element.                                              | `{}`        |

#### Types

##### UIResourceRendererProps

The props interface for `UIResourceRenderer`. Extends the base `UIResourceRenderer` props from `@mcp-ui/client` with LeafyGreen-specific defaults.

##### UIActionResult

The result type returned when the embedded UI performs an action. Re-exported from `@mcp-ui/client`.

#### Utilities

##### isUIResource

A utility function to check if a value is a valid UI resource. Re-exported from `@mcp-ui/client`.

```tsx
import { isUIResource } from '@lg-mcp/ui-resource-renderer';

if (isUIResource(someValue)) {
  // someValue is a valid UI resource
}
```
