# Message Rating

## Installation

### PNPM

```shell
pnpm add @lg-chat/message-rating
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

```tsx
import { useState, ChangeEvent } from 'react';
import {
  MessageRating,
  type MessageRatingProps,
  MessageRatingValue,
} from '@lg-chat/message-rating';

const Example = () => {
  const [value, setValue] = useState<MessageRatingProps['value']>(
    MessageRatingValue.Unselected,
  );

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as MessageRatingProps['value']);
  };

  return <MessageRating value={value} onChange={handleRatingChange} />;
};
```

## Properties

| Prop             | Type                                         | Description                                                                    | Default |
| ---------------- | -------------------------------------------- | ------------------------------------------------------------------------------ | ------- |
| `darkMode`       | `boolean`                                    | Determines if the component is rendered in dark mode                           | `false` |
| `hideThumbsDown` | `boolean`                                    | Hides the thumbs down button                                                   | `false` |
| `hideThumbsUp`   | `boolean`                                    | Hides the thumbs up button                                                     | `false` |
| `onChange`       | `React.ChangeEventHandler<HTMLInputElement>` | Event handler called when the value of the underlying radio inputs are changed |         |
| `value`          | `'liked' \| 'disliked' \| 'unselected'`      | Determines the currently selected value of the radio buttons                   |         |
| `...`            | `HTMLElementProps<'div'>`                    | Props spread on root element                                                   |         |
