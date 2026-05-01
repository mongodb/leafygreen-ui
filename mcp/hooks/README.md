# Hooks

![npm (scoped)](https://img.shields.io/npm/v/@lg-mcp/hooks.svg)

## Installation

### PNPM

```shell
pnpm add @lg-mcp/hooks
```

### Yarn

```shell
yarn add @lg-mcp/hooks
```

### NPM

```shell
npm install @lg-mcp/hooks
```

## Overview

`@lg-mcp/hooks` provides React hooks for MCP (Model Context Protocol) integrations. These hooks are designed for iframe-based UI components that communicate with MCP clients.

## Hooks

### useRenderData

Receives render data from a parent window via `postMessage`. This hook is used by iframe-based UI components that receive data from an MCP client.

On mount, the hook sends a `ui-lifecycle-iframe-ready` message to the parent window and listens for `ui-lifecycle-iframe-render-data` messages containing the render data.

The hook also provides a computed `darkMode` value that uses the render data's `darkMode` field if available, falling back to the browser's `prefers-color-scheme` preference.

#### Example

```tsx
import { useRenderData } from '@lg-mcp/hooks';

interface DatabaseData {
  databases: Array<{ name: string; size: number }>;
}

function MyComponent() {
  const { data, darkMode, isLoading, error } = useRenderData<DatabaseData>();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ background: darkMode ? '#1a1a1a' : '#ffffff' }}>
      {data?.databases.length} databases found
    </div>
  );
}
```

#### Returns

| Property    | Type                           | Description                                                           |
| ----------- | ------------------------------ | --------------------------------------------------------------------- |
| `data`      | `(T & BaseRenderData) \| null` | The received render data, or `null` if not yet received.              |
| `isLoading` | `boolean`                      | `true` while waiting for data from the parent window.                 |
| `error`     | `string \| null`               | Error message if message validation failed.                           |
| `darkMode`  | `boolean`                      | Computed dark mode: render data value or browser preference fallback. |

---

### useHostCommunication

Sends UI actions to the parent window via `postMessage`. This hook is used by iframe-based UI components to communicate back to an MCP client.

#### Example

```tsx
import { useHostCommunication } from '@lg-mcp/hooks';

function MyComponent() {
  const { intent, notify, tool, prompt, link } = useHostCommunication();

  return (
    <div>
      <button onClick={() => intent('create-task', { title: 'Buy groceries' })}>
        Create Task
      </button>
      <button onClick={() => notify('Operation completed successfully')}>
        Show Notification
      </button>
      <button onClick={() => link('https://mongodb.com')}>Open Link</button>
    </div>
  );
}
```

#### Returns

| Property | Type       | Description                                     |
| -------- | ---------- | ----------------------------------------------- |
| `intent` | `function` | Sends an intent message for the host to act on. |
| `notify` | `function` | Notifies the host of something that happened.   |
| `prompt` | `function` | Asks the host to run a prompt.                  |
| `tool`   | `function` | Asks the host to execute a tool.                |
| `link`   | `function` | Asks the host to navigate to a URL.             |
