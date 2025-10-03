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
import React from 'react';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { Message } from '@lg-chat/message';
import { MessageActions } from '@lg-chat/message-actions';
import { MessageRatingValue } from '@lg-chat/message-rating';

const Example = () => {
  const handleCopy = () => {
    // Handle copy action
    console.log('Message copied');
  };

  const handleRetry = () => {
    // Handle retry action
    console.log('Message retried');
  };

  const handleRatingChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    options: { rating: MessageRatingValue },
  ) => {
    // Handle rating change
    console.log('Rating changed:', options.rating);
  };

  const handleSubmitFeedback = (
    e: React.FormEvent<HTMLFormElement>,
    options: { rating: MessageRatingValue; feedback?: string },
  ) => {
    try {
      // Simulate API call
      await submitFeedbackToAPI(options);
    } catch (error) {
      // The component will automatically show error state
      // and display the errorMessage prop
      throw error;
    }
  };

  return (
    <LeafyGreenChatProvider variant={Variant.Compact}>
      <Message messageBody="Test message">
        <MessageActions
          onClickCopy={handleCopy}
          onClickRetry={handleRetry}
          onRatingChange={handleRatingChange}
          onSubmitFeedback={handleSubmitFeedback}
        />
      </Message>
    </LeafyGreenChatProvider>
  );
};
```

## Properties

| Prop                            | Type                                                                                                  | Description                                                                                                                                                                                        | Default                       |
| ------------------------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `errorMessage` _(optional)_     | `ReactNode`                                                                                           | Optional error message to display when feedback submission fails.                                                                                                                                  | `'Oops, please try again.'`   |
| `onClickCopy` _(optional)_      | `MouseEventHandler<HTMLButtonElement>`                                                                | Callback fired when the copy button is clicked.                                                                                                                                                    |                               |
| `onClickRetry` _(optional)_     | `MouseEventHandler<HTMLButtonElement>`                                                                | Callback fired when the retry button is clicked. If not provided, the retry button will not be rendered                                                                                            |                               |
| `onCloseFeedback` _(optional)_  | `MouseEventHandler<HTMLButtonElement>`                                                                | Callback fired when the feedback form is closed by clicking the close button                                                                                                                       |                               |
| `onRatingChange` _(optional)_   | `(e: ChangeEvent<HTMLInputElement>, options: { rating: MessageRatingValue }) => void`                 | Callback fired when the user clicks the like or dislike button. Receives the original change event and an options object with the rating. If not provided, the rating buttons will not be rendered |                               |
| `onSubmitFeedback` _(optional)_ | `(e: FormEvent<HTMLFormElement>, options: { rating: MessageRatingValue; feedback?: string }) => void` | Callback when the user submits the feedback form. Receives the original form event, plus an options object with rating and feedback. If not provided, the feedback form will not be rendered       |                               |
| `submitButtonText` _(optional)_ | `string`                                                                                              | Optional text for the feedback form's submit button                                                                                                                                                | `'Submit'`                    |
| `submittedMessage` _(optional)_ | `ReactNode`                                                                                           | Optional success message to display after feedback is submitted.                                                                                                                                   | `'Thanks for your feedback!'` |

## Behavior

The `MessageActions` component provides a comprehensive set of actions for chat messages.

### Rendering Behavior

- The component only renders in the `compact` variant of the `LeafyGreenChatProvider`. In the `spacious` variant, the component returns `null`
- If only some optional props are provided, only those corresponding buttons/functionality are rendered:
  - Copy Button: Always renders
  - Retry Button: Renders when `onClickRetry` is provided
  - Rating Buttons: Render when `onRatingChange` is provided
  - Feedback Form: Shows when a rating is selected and `onSubmitFeedback` is provided

### Context Integration

The component relies on `MessageContext` to access the message body for copy functionality.

### Rating and Feedback Flow

1. Rating Only: User clicks thumbs up or thumbs down (only visible when `onRatingChange` is provided)

   - Calls `onRatingChange` with the selected rating
   - No feedback form appears

2. Rating + Feedback: User clicks thumbs up or thumbs down, then feedback form appears
   - Calls `onRatingChange` with the selected rating
   - Feedback form appears with a textarea for additional comments
   - User can optionally provide feedback text
   - User clicks submit to send feedback
   - Form shows success message and calls `onSubmitFeedback` with rating and feedback

### State Management

The component manages its own internal state for:

- Message rating: `'unselected'` | `'disliked'` | `'liked'`
- Feedback text input
- Form state: `'unset'` | `'submitting'` | `'submitted'` | `'error'`

Form state is reset when the feedback form is closed or when a new rating is selected.
