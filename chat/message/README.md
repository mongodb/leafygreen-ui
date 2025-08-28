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

### Message.Actions

```tsx
import React from 'react';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { Message } from '@lg-chat/message';
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
        <Message.Actions
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

### Message

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

### Message.Actions

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

## Behavior

### Message.Actions

The `MessageActions` component provides a comprehensive set of actions for chat messages.

#### Rendering Behavior

- The component only renders in the `compact` variant of the `LeafyGreenChatProvider`. In the `spacious` variant, the component returns `null`
- If only some optional props are provided, only those corresponding buttons/functionality are rendered:
  - Copy Button: Always renders
  - Retry Button: Renders when `onClickRetry` is provided
  - Rating Buttons: Render when `onRatingChange` is provided
  - Feedback Form: Shows when a rating is selected and `onSubmitFeedback` is provided

#### Context Integration

The component relies on `MessageContext` to access the message body for copy functionality.

#### Rating and Feedback Flow

1. Rating Only: User clicks thumbs up or thumbs down (only visible when `onRatingChange` is provided)

   - Calls `onRatingChange` with the selected rating
   - No feedback form appears

2. Rating + Feedback: User clicks thumbs up or thumbs down, then feedback form appears
   - Calls `onRatingChange` with the selected rating
   - Feedback form appears with a textarea for additional comments
   - User can optionally provide feedback text
   - User clicks submit to send feedback
   - Form shows success message and calls `onSubmitFeedback` with rating and feedback

#### State Management

The component manages its own internal state for:

- Message rating: `'unselected'` | `'disliked'` | `'liked'`
- Feedback text input
- Form state: `'unset'` | `'submitting'` | `'submitted'` | `'error'`

Form state is reset when the feedback form is closed or when a new rating is selected.
