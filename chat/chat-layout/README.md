# Chat Layout

![npm (scoped)](https://img.shields.io/npm/v/@lg-chat/chat-layout.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/chat-layout/live-example/)

## Installation

### PNPM

```shell
pnpm add @lg-chat/chat-layout
```

### Yarn

```shell
yarn add @lg-chat/chat-layout
```

### NPM

```shell
npm install @lg-chat/chat-layout
```

## Overview

`@lg-chat/chat-layout` provides a CSS Grid-based layout system for building full-screen chat interfaces with a collapsible side nav.

## Examples

```tsx
import { ChatLayout } from '@lg-chat/chat-layout';

function MyChatApp() {
  const handleToggle = (isPinned: boolean) => {
    console.log('Side nav is now:', isPinned ? 'pinned' : 'collapsed');
  };

  return (
    <ChatLayout initialIsPinned={true} onTogglePinned={handleToggle}>
      {/* ChatSideNav and ChatMain components will go here */}
    </ChatLayout>
  );
}
```

## Properties

### ChatLayout

| Prop                           | Type                          | Description                                                                                   | Default |
| ------------------------------ | ----------------------------- | --------------------------------------------------------------------------------------------- | ------- |
| `children`                     | `ReactNode`                   | The content to render inside the grid layout (`ChatSideNav` and `ChatMain` components)        | -       |
| `className` _(optional)_       | `string`                      | Custom CSS class to apply to the grid container                                               | -       |
| `initialIsPinned` _(optional)_ | `boolean`                     | Initial state for whether the side nav is pinned (expanded)                                   | `true`  |
| `onTogglePinned` _(optional)_  | `(isPinned: boolean) => void` | Callback fired when the side nav is toggled. Receives the new `isPinned` state as an argument | -       |

All other props are passed through to the underlying `<div>` element.

## Context API

### useChatLayoutContext

Hook that returns the current chat layout context:

```tsx
const { isPinned, togglePin } = useChatLayoutContext();
```

**Returns:**

| Property    | Type         | Description                              |
| ----------- | ------------ | ---------------------------------------- |
| `isPinned`  | `boolean`    | Whether the side nav is currently pinned |
| `togglePin` | `() => void` | Function to toggle the pinned state      |

## Behavior

### State Management

- `ChatLayout` manages the `isPinned` state internally and provides it to all descendants via `ChatLayoutContext`
- When `togglePin` is called:
  1. The `isPinned` state updates
  2. Grid columns resize smoothly via CSS transition
  3. The `onTogglePinned` callback fires (if provided) with the new state value
- Descendant components can consume the context to:
  - Read the current `isPinned` state
  - Call `togglePin()` to toggle the sidebar
