# Chat Window

## Installation

### Yarn

```shell
yarn add @lg-chat/chat-window
```

### NPM

```shell
npm install @lg-chat/chat-window
```

## Example

```
const Example = (props) => {
  const userName = "Sean Park";
  const [messages, setMessages] = useState<Array<any>>(baseMessages);

  const handleMessageSend = (messageBody: string) => {
    const newMessage = {
      messageBody,
      userName,
    };
    setMessages((messages) => [...messages, newMessage]);
  };

  return (
    <LeafyGreenChatProvider>
      <ChatWindow {...props}>
        <TitleBar title="LG Chat Demo" badgeText="Beta" />
        <MessageFeed>
          {messages.map((messageFields) => (
            <MyMessage key={messageFields.id} {...messageFields} />
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
