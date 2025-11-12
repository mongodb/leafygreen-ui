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

```tsx
import { ChatWindow } from '@lg-chat/chat-window';
import { LeafyGreenChatProvider } from '@lg-chat/leafygreen-chat-provider';
import { Message } from '@lg-chat/message';
import { MessageFeed } from '@lg-chat/message-feed';
import { InputBar } from '@lg-chat/input-bar';

const Example = props => {
  const [messages, setMessages] = useState<Array<any>>(baseMessages);

  const handleMessageSend = (messageBody: string) => {
    const newMessage = {
      messageBody,
    };
    setMessages(messages => [...messages, newMessage]);
  };

  return (
    <LeafyGreenChatProvider>
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
