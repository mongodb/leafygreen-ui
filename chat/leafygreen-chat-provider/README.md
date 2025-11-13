# LeafyGreen Chat Provider

## Installation

### PNPM

```shell
pnpm add @lg-chat/leafygreen-chat-provider
```

### Yarn

```shell
yarn add @lg-chat/leafygreen-chat-provider
```

### NPM

```shell
npm install @lg-chat/leafygreen-chat-provider
```

## Overview

`LeafyGreenChatProvider` provides context to LG Chat components, including the assistant name that will be displayed in messages.

## Examples

### LeafyGreenChatProvider

```tsx
import { LeafyGreenChatProvider } from '@lg-chat/leafygreen-chat-provider';

function App() {
  return (
    <LeafyGreenChatProvider assistantName="MongoDB Assistant">
      {/* chat components */}
    </LeafyGreenChatProvider>
  );
}
```

### With Custom Assistant Name

```tsx
import { LeafyGreenChatProvider } from '@lg-chat/leafygreen-chat-provider';

function App() {
  return (
    <LeafyGreenChatProvider assistantName="MongoDB Assistant">
      {/* chat components */}
    </LeafyGreenChatProvider>
  );
}
```

## Properties

| Prop                         | Type        | Description                                                                         | Default               |
| ---------------------------- | ----------- | ----------------------------------------------------------------------------------- | --------------------- |
| `assistantName` _(optional)_ | `string`    | The name of the AI assistant that will be displayed when AI sends messages to users | `'MongoDB Assistant'` |
| `children`                   | `ReactNode` | The chat components to be wrapped by the provider                                   |                       |
