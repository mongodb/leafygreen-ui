# Message Feed

## Installation

### Yarn

```shell
yarn add @lg-chat/message-feed
```

### NPM

```shell
npm install @lg-chat/message-feed
```

## Example

```ts
import { MessageFeed } from '@lg-chat/message-feed';

return (
  <MessageFeed darkMode={darkMode} {...rest}>
    {messages.map(
      ({ id, isMongo, messageBody, userName, messageRatingProps }) => (
        <Message
          key={id}
          sourceType="markdown"
          darkMode={darkMode}
          avatar={
            <Avatar
              variant={isMongo ? 'mongo' : 'user'}
              darkMode={darkMode}
              name={userName}
            />
          }
          isSender={!!userName}
          messageRatingProps={messageRatingProps}
        >
          {messageBody}
        </Message>
      ),
    )}
  </MessageFeed>
);
```

## Properties

| Prop       | Type                      | Description                                            | Default |
| ---------- | ------------------------- | ------------------------------------------------------ | ------- |
| `darkMode` | `boolean`                 | Determines if the component should render in dark mode | `false` |
| `...`      | `HTMLElementProps<'div'>` | Props spread on root element                           |         |
