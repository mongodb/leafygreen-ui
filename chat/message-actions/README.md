# Message Actions

![npm (scoped)](https://img.shields.io/npm/v/@lg-chat/message-actions.svg)

## Installation

### PNPM

```shell
pnpm add @lg-chat/message-actions
```

### Yarn

```shell
yarn add @lg-chat/message-actions
```

### NPM

```shell
npm install @lg-chat/message-actions
```

## Examples

```tsx
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { MessageActions } from '@lg-chat/message-actions';

const Example = () => {
  const handleCopy = () => {
    // Handle copy action
    console.log('Message copied');
  };

  const handleRetry = () => {
    // Handle retry action
    console.log('Message retried');
  };

  const handleSubmitFeedback = (
    e: FormEvent<HTMLFormElement>,
    options: { rating: MessageRatingValue; feedback?: string },
  ) => {
    // Handle feedback submission
    console.log('Feedback submitted:', options);
  };

  return (
    <LeafyGreenChatProvider variant={Variant.Compact}>
      <MessageActions
        onClickCopy={handleCopy}
        onClickRetry={handleRetry}
        onSubmitFeedback={handleSubmitFeedback}
      />
    </LeafyGreenChatProvider>
  );
};
```

## Properties

| Prop                            | Type                                                                                                  | Description                                                                                                                                                                                                     | Default                       |
| ------------------------------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `onClickCopy` _(optional)_      | `MouseEventHandler<HTMLButtonElement>`                                                                | Callback fired when the copy button is clicked. If not provided, the copy button will not be rendered                                                                                                           |                               |
| `onClickRetry` _(optional)_     | `MouseEventHandler<HTMLButtonElement>`                                                                | Callback fired when the retry button is clicked. If not provided, the retry button will not be rendered                                                                                                         |                               |
| `onCloseFeedback` _(optional)_  | `InlineMessageFeedbackProps['onClose']`                                                               | Callback fired when the feedback form is closed by clicking the close button                                                                                                                                    |                               |
| `onSubmitFeedback` _(optional)_ | `(e: FormEvent<HTMLFormElement>, options: { rating: MessageRatingValue; feedback?: string }) => void` | Callback when the user submits the feedback form. Receives the original form event, plus an options object with rating and feedback. If not provided, the rating buttons and feedback form will not be rendered |                               |
| `submitButtonText` _(optional)_ | `InlineMessageFeedbackProps['submitButtonText']`                                                      | Optional text for the feedback form's submit button                                                                                                                                                             | `'Submit'`                    |
| `submittedMessage` _(optional)_ | `InlineMessageFeedbackProps['submittedMessage']`                                                      | Optional success message to display after feedback is submitted. Can be a string or a ReactNode.                                                                                                                | `'Thanks for your feedback!'` |

## Behavior

The `MessageActions` component provides a comprehensive set of actions for chat messages. All action props are **optional** - the component will only render the buttons and functionality for the props you provide:

- **Copy Button**: Renders when `onClickCopy` is provided
- **Retry Button**: Renders when `onClickRetry` is provided
- **Rating System**: Renders when `onSubmitFeedback` is provided
- **Feedback Form**: Shows when a rating is selected and `onSubmitFeedback` is provided

### Rendering Behavior

- If **no optional props** are provided, the component renders `null`
- If **only some optional props** are provided, only those corresponding buttons/functionality are rendered
- The component only renders in the `compact` variant of the `LeafyGreenChatProvider`. In the `spacious` variant, the component returns `null`

### Feedback Flow

1. User clicks thumbs up or thumbs down (only visible when `onSubmitFeedback` is provided)
2. Feedback form appears with a textarea for additional comments
3. User can optionally provide feedback text
4. User clicks submit to send feedback
5. Form shows success message and calls `onSubmitFeedback` with rating and feedback

### State Management

The component manages its own internal state for:

- Selected rating (liked/disliked/unselected)
- Feedback text input
- Submission state

All state is reset when the feedback form is closed or when a new rating is selected.
