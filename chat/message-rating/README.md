# Message Rating

## Installation

### PNPM

```shell
pnpm add @g-chat/message-rating
```

### Yarn

```shell
yarn add @lg-chat/message-rating
```

### NPM

```shell
npm install @lg-chat/message-rating
```

## Example

### Compact

```tsx
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import {
  MessageRating,
  type MessageRatingProps,
  MessageRatingValue,
} from '@lg-chat/message-rating';

const CompactExample = () => {
  const [value, setValue] = useState<MessageRatingProps['value']>(
    MessageRatingValue.Unselected,
  );

  const handleRatingChange: ChangeEventHandler<HTMLInputElement> = e => {
    setValue(e.target.value as MessageRatingProps['value']);
  };

  return (
    <LeafyGreenChatProvider variant={Variant.Compact}>
      <MessageRating value={value} onChange={handleRatingChange} />
    </LeafyGreenChatProvider>
  );
};
```

### Spacious

```tsx
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import {
  MessageRating,
  type MessageRatingProps,
  MessageRatingValue,
} from '@lg-chat/message-rating';

const SpaciousExample = () => {
  const [value, setValue] = useState<MessageRatingProps['value']>(
    MessageRatingValue.Unselected,
  );

  const handleRatingChange: ChangeEventHandler<HTMLInputElement> = e => {
    setValue(e.target.value as MessageRatingProps['value']);
  };

  return (
    <LeafyGreenChatProvider variant={Variant.Spacious}>
      <MessageRating
        description="Custom description"
        value={value}
        onChange={handleRatingChange}
      />
    </LeafyGreenChatProvider>
  );
};
```

## Properties

| Prop             | Type                                         | Description                                                                    | Default                   |
| ---------------- | -------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------- |
| `darkMode`       | `boolean`                                    | Determines if the component is rendered in dark mode                           | `false`                   |
| `description`    | `string`                                     | Custom description text                                                        | `'How was the response?'` |
| `hideThumbsDown` | `boolean`                                    | Hides the thumbs down button                                                   | `false`                   |
| `hideThumbsUp`   | `boolean`                                    | Hides the thumbs up button                                                     | `false`                   |
| `onChange`       | `React.ChangeEventHandler<HTMLInputElement>` | Event handler called when the value of the underlying radio inputs are changed |                           |
| `value`          | `'liked', 'disliked'`                        | Determines the currently selected value of the radio buttons                   |                           |
| `...`            | `HTMLElementProps<'div'>`                    | Props spread on root element                                                   |                           |
