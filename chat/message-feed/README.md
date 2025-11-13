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

```tsx
import { MessageFeed } from '@lg-chat/message-feed';
import { Message } from '@lg-chat/message';

return (
  <MessageFeed darkMode={darkMode} {...rest}>
    {messages.map(({ id, messageBody, userName }) => (
      <Message key={id} isSender={!!userName} messageBody={messageBody} />
    ))}
  </MessageFeed>
);
```

## Properties

| Prop       | Type                      | Description                                            | Default |
| ---------- | ------------------------- | ------------------------------------------------------ | ------- |
| `darkMode` | `boolean`                 | Determines if the component should render in dark mode | `false` |
| `...`      | `HTMLElementProps<'div'>` | Props spread on root element                           |         |
