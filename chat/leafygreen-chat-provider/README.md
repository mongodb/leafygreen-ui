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

`LeafyGreenChatProvider` currently handles all responsiveness behavior in LG Chat components. `LeafyGreenChatProvider` will measure the width of its first child (i.e. your chat window component) and all LG Chat components will consume this width to change rendering behavior.

## Examples

### LeafyGreenChatProvider

```tsx
import { LeafyGreenChatProvider } from '@lg-chat/leafygreen-chat-provider';

function App() {
  return (
    <LeafyGreenChatProvider>{/* chat components */}</LeafyGreenChatProvider>
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

### With Spacious Variant (Deprecated)

```tsx
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';

function App() {
  return (
    <LeafyGreenChatProvider
      variant={Variant.Spacious}
      assistantName="MongoDB Assistant"
    >
      {/* chat components */}
    </LeafyGreenChatProvider>
  );
}
```

## Properties

| Prop                         | Type        | Description                                                                                                                                                                                                                                                  | Default               |
| ---------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| `assistantName` _(optional)_ | `string`    | The name of the AI assistant that will be displayed when AI sends messages to users                                                                                                                                                                          | `'MongoDB Assistant'` |
| `children`                   | `ReactNode` | The chat components to be wrapped by the provider                                                                                                                                                                                                            |                       |
| `variant` _(optional)_       | `Variant`   | **_(Deprecated)_** Determines the visual variant of chat components. The spacious variant will be removed by EOY 2025. All new feature work will be done with the compact variant. The spacious variant will only receive critical, high-priority bug fixes. | `'compact'`           |

**⚠️ Deprecation Notice:** The spacious variant will be removed by EOY 2025. All new feature work will be done with the compact variant. The spacious variant will only receive critical, high-priority bug fixes.
