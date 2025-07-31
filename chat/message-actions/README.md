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

| Prop                            | Type                                                                                                  | Description                                                                                                                         | Default                       |
| ------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `onClickCopy`                   | `MouseEventHandler<HTMLButtonElement>`                                                                | Callback fired when the copy button is clicked                                                                                      |                               |
| `onClickRetry`                  | `MouseEventHandler<HTMLButtonElement>`                                                                | Callback fired when the retry button is clicked                                                                                     |                               |
| `onCloseFeedback` _(optional)_  | `InlineMessageFeedbackProps['onClose']`                                                               | Callback fired when the feedback form is closed by clicking the close button                                                        |                               |
| `onSubmitFeedback`              | `(e: FormEvent<HTMLFormElement>, options: { rating: MessageRatingValue; feedback?: string }) => void` | Callback when the user submits the feedback form. Receives the original form event, plus an options object with rating and comment. |                               |
| `submitButtonText` _(optional)_ | `InlineMessageFeedbackProps['submitButtonText']`                                                      | Optional text for the feedback form's submit button                                                                                 | `'Submit'`                    |
| `submittedMessage` _(optional)_ | `InlineMessageFeedbackProps['submittedMessage']`                                                      | Optional success message to display after feedback is submitted. Can be a string or a ReactNode.                                    | `'Thanks for your feedback!'` |

## Behavior

The `MessageActions` component provides a comprehensive set of actions for chat messages:

- **Copy Button**: Allows users to copy the message content
- **Retry Button**: Allows users to retry the message generation
- **Rating System**: Provides thumbs up/down rating functionality
- **Feedback Form**: When a rating is selected, shows an inline feedback form for additional comments

### Variant Support

The component only renders in the `compact` variant of the `LeafyGreenChatProvider`. In the `spacious` variant, the component returns `null`.

### Feedback Flow

1. User clicks thumbs up or thumbs down
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
