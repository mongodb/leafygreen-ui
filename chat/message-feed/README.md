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

### Compound Components

The `MessageFeed` component uses a compound component pattern. `MessageFeed.InitialMessage` is the initial message component, which also uses a compound pattern for its subcomponents: `MessageFeed.InitialMessage.MessagePrompts`, `MessageFeed.InitialMessage.MessagePromptsItem`, `MessageFeed.InitialMessage.ResourceList`, and `MessageFeed.InitialMessage.ResourceListItem`.

`MessageFeed.InitialMessage` does not need to be conditionally rendered. It only displays when there are no other children. As soon as other children are rendered, `MessageFeed.InitialMessage` animates off the page and only the children remain.

Additionally, `MessageFeed.InitialMessage` only renders its subcomponents. All other children will be ignored.

#### MessageFeed.InitialMessage.MessagePrompts and MessageFeed.InitialMessage.MessagePromptsItem

**Note:** `MessageFeed.InitialMessage.MessagePrompts` is a wrapper around [MessagePrompts](https://github.com/mongodb/leafygreen-ui/tree/main/chat/message-prompts#readme) from `@lg-chat/message-prompts` and accepts the same props except for `enableHideOnSelect`

```tsx
import React from `react`
import { Message } from `@lg-chat/message`;
import { MessageFeed } from `@lg-chat/message-feed`;

const [messages, setMessages] = useState([]);

...

return (
  <MessageFeed>
    <MessageFeed.InitialMessage>
      <MessageFeed.InitialMessage.MessagePrompts
        onClickRefresh={() => {}}
        label="Suggested Prompts"
      >
        <MessageFeed.InitialMessage.MessagePromptsItem onClick={() => {}}>
          What is MongoDB?
        </MessageFeed.InitialMessage.MessagePromptsItem>
        <MessageFeed.InitialMessage.MessagePromptsItem onClick={() => {}}>
          How do I query MongoDB?
        </MessageFeed.InitialMessage.MessagePromptsItem>
        <MessageFeed.InitialMessage.MessagePromptsItem onClick={() => {}}>
          What is MongoDB&apos;s astrology sign?
        </MessageFeed.InitialMessage.MessagePromptsItem>
      </MessageFeed.InitialMessage.MessagePrompts>
    </MessageFeed.InitialMessage>
    {message.map((message) => <Message>...</Message>)}
  </MessageFeed>
);
```

#### MessageFeed.InitialMessage.ResourceList and MessageFeed.InitialMessage.ResourceListItem

```tsx
import React from `react`
import { Message } from `@lg-chat/message`;
import { MessageFeed } from `@lg-chat/message-feed`;

const [messages, setMessages] = useState([]);

...

return (
  <MessageFeed>
    <MessageFeed.InitialMessage>
      <MessageFeed.InitialMessage.ResourceList>
        <MessageFeed.InitialMessage.ResourceListItem glyph="QuestionMarkWithCircle">
          Ask me technical questions
        </MessageFeed.InitialMessage.ResourceListItem>
        <MessageFeed.InitialMessage.ResourceListItem glyph="Bulb">
          Learn best practices
        </MessageFeed.InitialMessage.ResourceListItem>
        <MessageFeed.InitialMessage.ResourceListItem glyph="InfoWithCircle">
          Note: I won’t have access to any of your data unless you provide
          it
        </MessageFeed.InitialMessage.ResourceListItem>
      </MessageFeed.InitialMessage.ResourceList>
    </MessageFeed.InitialMessage>
    {message.map((message) => <Message>...</Message>)}
  </MessageFeed>
);
```

## Properties

### MessageFeed

| Prop       | Type                      | Description                                            | Default |
| ---------- | ------------------------- | ------------------------------------------------------ | ------- |
| `darkMode` | `boolean`                 | Determines if the component should render in dark mode | `false` |
| `...`      | `HTMLElementProps<'div'>` | Props spread on root element                           |         |

### MessageFeed.InitialMessage

`MessageFeed.InitialMessage` is a wrapper around [Message](https://github.com/mongodb/leafygreen-ui/tree/main/chat/message#readme) from `@lg-chat/message` and accepts the same props except for `messageBody`, `isSender`, `sourceType`, and `markdownProps`.

### MessageFeed.InitialMessage.MessagePrompts

`MessageFeed.InitialMessage.MessagePrompts` is a wrapper around [MessagePrompts](https://github.com/mongodb/leafygreen-ui/blob/main/chat/message-prompts/README.md#messageprompts-properties) from `@lg-chat/message-prompts` and accepts the same props except for `enableHideOnSelect`.

### MessageFeed.InitialMessage.MessagePromptsItem

`MessageFeed.InitialMessage.MessagePromptsItem` is a wrapper around [MessagePrompt](https://github.com/mongodb/leafygreen-ui/blob/main/chat/message-prompts/README.md#messageprompt-properties) from `@lg-chat/message-prompts` and accepts the same props.

### MessageFeed.InitialMessage.ResourceList

| Prop       | Type                     | Description                                            | Default |
| ---------- | ------------------------ | ------------------------------------------------------ | ------- |
| `darkMode` | `boolean`                | Determines if the component should render in dark mode | `false` |
| `...`      | `HTMLElementProps<'ul'>` | Props spread on root element                           |         |

### MessageFeed.InitialMessage.ResourceListItem

| Prop       | Type                     | Description                                               | Default |
| ---------- | ------------------------ | --------------------------------------------------------- | ------- |
| `glyph`    | `GlyphName`              | The LeafyGreen icon glyph name to render in the list item |         |
| `children` | `React.ReactNode`        | The text that will appear in the list item                |         |
| `...`      | `HTMLElementProps<'li'>` | Props spread on root element                              |         |
