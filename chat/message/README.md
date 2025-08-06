# Message

## Installation

### PNPM

```shell
pnpm add @lg-chat/message
```

### Yarn

```shell
yarn add @lg-chat/message
```

### NPM

```shell
npm install @lg-chat/message
```

## Example

### Compact

```tsx
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { Message } from '@lg-chat/message';

return (
  <LeafyGreenChatProvider variant={Variant.Compact}>
    <Message messageBody="Question" />
    <Message isSender={false} messageBody="Answer" />
  </LeafyGreenChatProvider>
);
```

### Spacious

```tsx
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { Message } from '@lg-chat/message';
import { Avatar } from '@leafygreen-ui/avatar';

return (
  <LeafyGreenChatProvider variant={Variant.Spacious}>
    <Message avatar={<Avatar />} messageBody="Question" />
    <Message avatar={<Avatar />} isSender={false} messageBody="Answer" />
  </LeafyGreenChatProvider>
);
```

## Properties

| Prop                              | Type                                                                                                | Description                                                                       | Default                                                                                                                   |
| --------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `align`                           | `'left', 'right'`                                                                                   | Determines whether the message is aligned to the left or right                    | if `isSender === true`, the message is aligned to the right, and otherwise to the left. This prop overrides that behavior |
| `avatar`                          | `ReactElement`                                                                                      | Avatar element                                                                    |                                                                                                                           |
| `componentOverrides` (deprecated) | `Record<MarkdownComponent, ComponentType>`                                                          | Uses value to override key'ed markdown elements in terms of how they are rendered |                                                                                                                           |
| `isSender`                        | `boolean`                                                                                           | Indicates if the message is from the current user                                 | `true`                                                                                                                    |
| `links`                           | `{ url: string; text: string; imageUrl?: string; variant: string; }[]`                              | A list of links to show in a section at the end of the message.                   |                                                                                                                           |
| `linksHeading`                    | `string`                                                                                            | The heading text to display for the links section.                                | "Related Resources"                                                                                                       |
| `markdownProps`                   | [`LGMarkdownProps`](https://github.com/mongodb/leafygreen-ui/tree/main/chat/lg-markdown#properties) | Props passed to the internal ReactMarkdown instance                               |                                                                                                                           |
| `messageBody`                     | `string`                                                                                            | Message body text passed to LGMarkdown                                            |                                                                                                                           |
| `onLinkClick`                     | `({ children: string; imageUrl?: string }) => void`                                                 | A callback function that is called when the link is clicked.                      |                                                                                                                           |
| `sourceType`                      | `'markdown' \| 'text'`                                                                              | Determines the rendering method of the message                                    |                                                                                                                           |
| `verified`                        | `{ verifier?: string; verifiedAt?: Date; learnMoreUrl?: string; }`                                  | Sets if an answer is "verified" and controls the content of the message banner.   |                                                                                                                           |
| `...`                             | `HTMLElementProps<'div'>`                                                                           | Props spread on the root element                                                  |                                                                                                                           |

### Message Links

The message component includes the following built-in `variant` values for the `links` prop:

- `"Blog"`
- `"Book"`
- `"Code"`
- `"Docs"`
- `"Learn"`
- `"Video"`
- `"Website"`

These map to pre-defined badge glyphs, labels, and colors for specific use
cases. If no variant serves your use case, you can create a custom link by
omitting the `variant` prop and defining the `badgeGlyph`, `badgeLabel`, and
optionally `badgeVariant` props.
