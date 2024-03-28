# Message

## Installation

### Yarn

```shell
yarn add @lg-chat/message
```

### NPM

```shell
npm install @lg-chat/message
```

## Example

```ts
import { Message } from '@lg-chat/message';

return (
  <Message avatar={Avatar} darkMode={darkMode}>
    # Heading 1
  </Message>
);
```

**Output HTML**

```html
<div>
  <div class="leafygreen-ui-14v23mv">
    <div class="">
      <div class="leafygreen-ui-wirl5q">
        <h1 class="leafygreen-ui-yk169t">Heading 1</h1>
      </div>
    </div>
  </div>
</div>
```

## Properties

| Prop                 | Type                                                               | Description                                                                       | Default                                                                                                                   |
| -------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `align`              | `'left', 'right'`                                                  | Determines whether the message is aligned to the left or right                    | if `isSender === true`, the message is aligned to the right, and otherwise to the left. This prop overrides that behavior |
| `avatar`             | `ReactElement`                                                     | Avatar element                                                                    |                                                                                                                           |
| `componentOverrides` | `Record<MarkdownComponent, ComponentType>`                         | Uses value to override key'ed markdown elements in terms of how they are rendered |                                                                                                                           |
| `children`           | `string`                                                           | Rendered children; only string children are supported                             |                                                                                                                           |
| `isSender`           | `boolean`                                                          | Indicates if the message is from the current user                                 | `true`                                                                                                                    |
| `markdownProps`      | `LGMarkdownProps`                                                  | Props passed to the internal ReactMarkdown instance                               |                                                                                                                           |
| `messageRatingProps` | `MessageRatingProps`                                               | Props to MessageRating component                                                  |                                                                                                                           |
| `sourceType`         | `'markdown', 'text'`                                               | Determines the rendering method of the message                                    |                                                                                                                           |
| `messageBody`        | `string`                                                           | Message body text passed to LGMarkdown                                            |                                                                                                                           |
| `verified`           | `{ verifier?: string; verifiedAt?: Date; learnMoreUrl?: string; }` | Sets if an answer is "verified" and controls the content of the message banner.   |                                                                                                                           |
| `...`                | `HTMLElementProps<'div'>`                                          | Props spread on the root element                                                  |                                                                                                                           |
