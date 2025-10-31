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

`@lg-chat/chat-layout` provides a CSS Grid-based layout system for building full-screen chat interfaces with a side nav that can be collapsed or pinned.

This package exports:

- `ChatLayout`: The grid container and context provider
- `ChatMain`: The primary content area of the chat interface, automatically positioned within the grid layout.
- `ChatSideNav`: A compound component representing the side navigation, exposing subcomponents such as `ChatSideNav.Header`, `ChatSideNav.Content`, and `ChatSideNav.SideNavItem` for flexible composition.
- `useChatLayoutContext`: Hook for accessing layout state

## Examples

### Basic

```tsx
import { useState } from 'react';
import { ChatLayout, ChatMain, ChatSideNav } from '@lg-chat/chat-layout';

function MyChatApp() {
  const [activeChatId, setActiveChatId] = useState('1');

  const chatItems = [
    { id: '1', name: 'MongoDB Atlas Setup', href: '/chat/1' },
    { id: '2', name: 'Database Query Help', href: '/chat/2' },
    { id: '3', name: 'Schema Design Discussion', href: '/chat/3' },
  ];

  const handleNewChat = () => {
    console.log('Start new chat');
  };

  return (
    <ChatLayout>
      <ChatSideNav>
        <ChatSideNav.Header onClickNewChat={handleNewChat} />
        <ChatSideNav.Content>
          {chatItems.map(({ href, id, item, name }) => (
            <ChatSideNav.SideNavItem
              key={id}
              href={href}
              active={id === activeChatId}
              onClick={e => {
                e.preventDefault();
                setActiveChatId(id);
              }}
            >
              {name}
            </ChatSideNav.SideNavItem>
          ))}
        </ChatSideNav.Content>
      </ChatSideNav>
      <ChatMain>{/* Main chat content here */}</ChatMain>
    </ChatLayout>
  );
}
```

### With Initial State and Toggle Pinned Callback

```tsx
import { ChatLayout, ChatMain, ChatSideNav } from '@lg-chat/chat-layout';

function MyChatApp() {
  const handleTogglePinned = (isPinned: boolean) => {
    console.log('Side nav is now:', isPinned ? 'pinned' : 'collapsed');
  };

  return (
    <ChatLayout initialIsPinned={false} onTogglePinned={handleTogglePinned}>
      <ChatSideNav>{/* Side nav subcomponents */}</ChatSideNav>
      <ChatMain>{/* Main chat content */}</ChatMain>
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

### ChatMain

| Prop       | Type        | Description                | Default |
| ---------- | ----------- | -------------------------- | ------- |
| `children` | `ReactNode` | The main content to render | -       |

All other props are passed through to the underlying `<div>` element.

**Note:** `ChatMain` must be used as a direct child of `ChatLayout` to work correctly within the grid system.

### ChatSideNav

| Prop                     | Type                      | Description                                                    | Default |
| ------------------------ | ------------------------- | -------------------------------------------------------------- | ------- |
| `children`               | `ReactNode`               | Should include `ChatSideNav.Header` and `ChatSideNav.Content`. | -       |
| `className` _(optional)_ | `string`                  | Root class name                                                | -       |
| `...`                    | `HTMLElementProps<'nav'>` | Props spread on the root `<nav>` element                       | -       |

### ChatSideNav.Header

| Prop                          | Type                                   | Description                                 | Default |
| ----------------------------- | -------------------------------------- | ------------------------------------------- | ------- |
| `onClickNewChat` _(optional)_ | `MouseEventHandler<HTMLButtonElement>` | Fired when the "New Chat" button is clicked | -       |
| `className` _(optional)_      | `string`                               | Header class name                           | -       |
| `...`                         | `HTMLElementProps<'div'>`              | Props spread on the header container        | -       |

### ChatSideNav.Content

| Prop                     | Type                      | Description                           | Default |
| ------------------------ | ------------------------- | ------------------------------------- | ------- |
| `className` _(optional)_ | `string`                  | Content class name                    | -       |
| `...`                    | `HTMLElementProps<'div'>` | Props spread on the content container | -       |

### ChatSideNav.SideNavItem

| Prop                     | Type                | Description                                                                                                                                                                                                                 | Default |
| ------------------------ | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `active` _(optional)_    | `boolean`           | Whether or not the component should be rendered in an active state. When active, applies active styling and sets `aria-current="page"`                                                                                      | `false` |
| `as` _(optional)_        | `React.ElementType` | When provided, the component will be rendered as the component or html tag indicated by this prop. Other additional props will be spread on the element. For example, `Link` or `a` tags can be supplied. Defaults to `'a'` | -       |
| `children`               | `ReactNode`         | Content that will be rendered inside the root-level element (typically the chat name)                                                                                                                                       | -       |
| `className` _(optional)_ | `string`            | Class name that will be applied to the root-level element                                                                                                                                                                   | -       |
| `href` _(optional)_      | `string`            | The URL that the hyperlink points to. When provided, the component will be rendered as an anchor element                                                                                                                    | -       |
| `onClick` _(optional)_   | `MouseEventHandler` | The event handler function for the 'onclick' event. Receives the associated `event` object as the first argument                                                                                                            | -       |

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
