# Message Feedback

![npm (scoped)](https://img.shields.io/npm/v/@lg-chat/message-feedback.svg)

## Installation

### PNPM

```shell
pnpm add @lg-chat/message-feedback
```

### Yarn

```shell
yarn add @lg-chat/message-feedback
```

### NPM

```shell
npm install @lg-chat/message-feedback
```

## Examples

### Compact InlineMessageFeedback

```tsx
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { InlineMessageFeedback } from '@lg-chat/message-feedback';

return (
  <LeafyGreenChatProvider variant={Variant.Compact}>
    <InlineMessageFeedback />
  </LeafyGreenChatProvider>
);
```

### Spacious InlineMessageFeedback

```tsx
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { InlineMessageFeedback } from '@lg-chat/message-feedback';

return (
  <LeafyGreenChatProvider variant={Variant.Spacious}>
    <InlineMessageFeedback />
  </LeafyGreenChatProvider>
);
```

### PopoverMessageFeedback (deprecated)

```tsx
const triggerRef = useRef(null);
const [isActive, setIsActive] = useState<boolean>(false);

const closePopover = () => setIsActive(false);

const handleRatingChange: ChangeEventHandler<HTMLInputElement> = e => {
  const rating = e.target.value as MessageRatingValue;
  setIsActive(rating === 'disliked');
};

return (
  <>
    <MessageRating ref={triggerRef} onChange={handleRatingChange} />
    <PopoverMessageFeedback
      popoverProps={{
        ...popoverProps,
        active: isActive,
        refEl: triggerRef,
      }}
      onCancel={closePopover}
      onSubmit={closePopover}
    />
  </>
);
```

## Properties

### InlineMessageFeedback

| Prop                | Type                                                      | Description                                                                                                                                                                                                   | Default                                  |
| ------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `cancelButtonText`  | `string`                                                  | Text displayed inside the cancel Button                                                                                                                                                                       | `'Cancel'`                               |
| `onCancel`          | `MouseEventHandler<HTMLElement>`                          | Click event handler for the cancel Button                                                                                                                                                                     |                                          |
| `cancelButtonProps` | `ButtonProps`                                             | Override props for the cancel Button                                                                                                                                                                          |
| `submitButtonText`  | `string`                                                  | Text displayed inside the submit Button                                                                                                                                                                       |                                          |
| `submitButtonProps` | `ButtonProps`                                             | Override props for the submit Button                                                                                                                                                                          |                                          |
| `onSubmit`          | `FormEventHandler<HTMLFormElement>`                       | Event handler called when the form is submitted                                                                                                                                                               |
| `textareaProps`     | `TextAreaProps`                                           | Props passed directly to the Textarea                                                                                                                                                                         |
| `state`             | `'unset'` \| `'error'` \| `'submitting'` \| `'submitted'` | Current state of the feedback component                                                                                                                                                                       | `'unset'`                                |
| `submittedMessage`  | `string`                                                  | Message rendered in submitted state                                                                                                                                                                           | `'Submitted! Thanks for your feedback.'` |
| `label`             | `TextAreaProps['label']`                                  |                                                                                                                                                                                                               |
| `onClose`           | `string`                                                  | Event handler called on close button click. Close button will not be rendered when undefined. This is mainly for internal use as most instances of InlineMessageFeedback should be closed solely by onCancel. |                                          |

### PopoverMessageFeedback (deprecated)

| Prop            | Type     | Description            | Default |
| --------------- | -------- | ---------------------- | ------- |
| `popoverZIndex` | `number` | Z-index of the Popover |         |

PopoverMessageFeedback extends all InlineMessageFeedback props excluding `errorMessage`, `state`, and `submittedMessage`. To provide feedback to the end user after a successful submit, refer to our design guidelines for the appropriate design pattern.

PopoverMessageFeedback also extends all [Popover props](https://github.com/mongodb/leafygreen-ui/tree/main/packages/popover) excluding `children`.
