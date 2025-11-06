# Chat Window

## Installation

### PNPM

```shell
pnpm add @lg-chat/chat-window
```

### Yarn

```shell
yarn add @lg-chat/chat-window
```

### NPM

```shell
npm install @lg-chat/chat-window
```

## Example

### Compact

```tsx
import { ChatWindow } from '@lg-chat/chat-window';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { Message } from '@lg-chat/message';
import { MessageFeed } from '@lg-chat/message-feed';

const CompactExample = props => {
  const userName = 'Sean Park';
  const [messages, setMessages] = useState<Array<any>>(baseMessages);

  const handleMessageSend = (messageBody: string) => {
    const newMessage = {
      messageBody,
      userName,
    };
    setMessages(messages => [...messages, newMessage]);
  };

  return (
    <LeafyGreenChatProvider variant={Variant.Compact}>
      <ChatWindow title="LG Chat Demo" badgeText="Beta" {...props}>
        <MessageFeed>
          {messages.map(messageFields => (
            <Message key={messageFields.id} {...messageFields} />
          ))}
        </MessageFeed>
        <InputBar onMessageSend={handleMessageSend} />
      </ChatWindow>
    </LeafyGreenChatProvider>
  );
};
```

### Spacious

```tsx
import { ChatWindow } from '@lg-chat/chat-window';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { Message } from '@lg-chat/message';
import { MessageFeed } from '@lg-chat/message-feed';

const SpaciousExample = props => {
  const userName = 'Sean Park';
  const [messages, setMessages] = useState<Array<any>>(baseMessages);

  const handleMessageSend = (messageBody: string) => {
    const newMessage = {
      messageBody,
      userName,
    };
    setMessages(messages => [...messages, newMessage]);
  };

  return (
    <LeafyGreenChatProvider variant={Variant.Spacious}>
      <ChatWindow title="LG Chat Demo" badgeText="Beta" {...props}>
        <MessageFeed>
          {messages.map(messageFields => (
            <Message key={messageFields.id} {...messageFields} />
          ))}
        </MessageFeed>
        <InputBar onMessageSend={handleMessageSend} />
      </ChatWindow>
    </LeafyGreenChatProvider>
  );
};
```

## Properties

| Prop       | Type                      | Description                                            | Default |
| ---------- | ------------------------- | ------------------------------------------------------ | ------- |
| `darkMode` | `boolean`                 | Determines if the component should render in dark mode | `false` |
| `...`      | `HTMLElementProps<'div'>` | Props spread on root element                           |         |
