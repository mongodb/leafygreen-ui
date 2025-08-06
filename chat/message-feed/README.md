# Message Feed

## Installation

### PNPM

```shell
pnpm add @lg-chat/message-feed
```

### Yarn

```shell
yarn add @lg-chat/message-feed
```

### NPM

```shell
npm install @lg-chat/message-feed
```

## Example

### Compact

```tsx
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { MessageFeed } from '@lg-chat/message-feed';

return (
  <LeafyGreenChatProvider variant={Variant.Compact}>
    <MessageFeed darkMode={darkMode} {...rest}>
      {messages.map(({ id, messageBody, userName }) => (
        <Message key={id} isSender={!!userName} messageBody={messageBody} />
      ))}
    </MessageFeed>
  </LeafyGreenChatProvider>
);
```

### Spacious

```tsx
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { MessageFeed } from '@lg-chat/message-feed';

return (
  <LeafyGreenChatProvider variant={Variant.Spacious}>
    <MessageFeed darkMode={darkMode} {...rest}>
      {messages.map(({ id, messageBody, userName }) => (
        <Message
          key={id}
          avatar={
            <Avatar name={userName} variant={isMongo ? 'mongo' : 'user'} />
          }
          isSender={!!userName}
          messageBody={messageBody}
        />
      ))}
    </MessageFeed>
  </LeafyGreenChatProvider>
);
```

## Properties

| Prop       | Type                      | Description                                            | Default |
| ---------- | ------------------------- | ------------------------------------------------------ | ------- |
| `darkMode` | `boolean`                 | Determines if the component should render in dark mode | `false` |
| `...`      | `HTMLElementProps<'div'>` | Props spread on root element                           |         |
