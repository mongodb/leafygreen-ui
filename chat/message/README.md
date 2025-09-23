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

### Basic Usage

#### Compact

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

#### Spacious

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

### Compound Components

The `Message` component uses a compound component pattern, allowing you to compose different parts of a message using subcomponents like `Message.Actions`, `Message.Links`, `Message.Promotion`, and `Message.VerifiedBanner`.

**Note 1:** All compound components only render in the `compact` variant.  
**Note 2:** The layout and order of compound components are enforced by the `Message` component itself. Even if you change the order of subcomponents in your JSX, they will be rendered in the correct, intended order within the message bubble. This ensures consistent UI and accessibility regardless of how you compose your message children.

#### Message.Actions

```tsx
import React from 'react';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { Message } from '@lg-chat/message';
import { MessageRatingValue } from '@lg-chat/message-rating';

const MessageWithActions = () => {
  const handleCopy = () => console.log('Message copied');
  const handleRetry = () => console.log('Message retried');

  const handleRatingChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    options: { rating: MessageRatingValue },
  ) => {
    console.log('Rating changed:', options.rating);
  };

  const handleSubmitFeedback = async (
    e: React.FormEvent<HTMLFormElement>,
    options: { rating: MessageRatingValue; feedback?: string },
  ) => {
    console.log('Feedback submitted:', options);
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

### Message.Links

```tsx
import React from 'react';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { Message } from '@lg-chat/message';

const MessageWithLinks = () => {
  const links = [
    {
      href: 'https://mongodb.design',
      children: 'LeafyGreen UI',
      variant: 'Website',
    },
    {
      href: 'https://mongodb.github.io/leafygreen-ui/?path=/docs/overview-introduction--docs',
      children: 'LeafyGreen UI Docs',
      variant: 'Docs',
    },
    {
      href: 'https://learn.mongodb.com/',
      children: 'MongoDB University',
      variant: 'Learn',
    },
  ];

  const handleLinkClick = () => console.log('Link clicked');

  return (
    <LeafyGreenChatProvider variant={Variant.Compact}>
      <Message isSender={false} messageBody="Test message">
        <Message.Links
          links={links}
          onLinkClick={handleLinkClick}
          headingText="Related Resources"
        />
      </Message>
    </LeafyGreenChatProvider>
  );
};
```

### Message.Promotion

```tsx
import React from 'react';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { Message } from '@lg-chat/message';

const MessageWithPromotion = () => {
  const handlePromotionClick = () => console.log('Promotion clicked');

  return (
    <LeafyGreenChatProvider variant={Variant.Compact}>
      <Message isSender={false} messageBody="Test message">
        <Message.Promotion
          promotionText="Go learn more about this skill!"
          promotionUrl="https://learn.mongodb.com/skills"
          onPromotionClick={handlePromotionClick}
        />
      </Message>
    </LeafyGreenChatProvider>
  );
};
```

### Message.VerifiedBanner

```tsx
import React from 'react';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { Message } from '@lg-chat/message';

const MessageWithVerifiedBanner = () => {
  return (
    <LeafyGreenChatProvider variant={Variant.Compact}>
      <Message isSender={false} messageBody="Test message">
        <Message.VerifiedBanner
          verifier="MongoDB Staff"
          verifiedAt={new Date('2024-03-24T16:20:00Z')}
          learnMoreUrl="https://mongodb.com/docs"
        />
      </Message>
    </LeafyGreenChatProvider>
  );
};
```

### Complete Example with All Subcomponents

```tsx
import React from 'react';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { Message } from '@lg-chat/message';
import { MessageRatingValue } from '@lg-chat/message-rating';

const Example = () => {
  const handleCopy = () => console.log('Message copied');
  const handleRetry = () => console.log('Message retried');

  const handleRatingChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    options: { rating: MessageRatingValue },
  ) => {
    console.log('Rating changed:', options.rating);
  };

  const handleSubmitFeedback = async (
    e: React.FormEvent<HTMLFormElement>,
    options: { rating: MessageRatingValue; feedback?: string },
  ) => {
    console.log('Feedback submitted:', options);
  };

  const links = [
    {
      href: 'https://mongodb.design',
      children: 'LeafyGreen UI',
      variant: 'Website',
    },
    {
      href: 'https://mongodb.com/docs',
      children: 'MongoDB Docs',
      variant: 'Docs',
    },
  ];

  const handleLinkClick = () => console.log('Link clicked');
  const handlePromotionClick = () => console.log('Promotion clicked');

  return (
    <LeafyGreenChatProvider variant={Variant.Compact}>
      <Message isSender={false} messageBody="Test message">
        <Message.Promotion
          promotionText="Go learn more about this skill!"
          promotionUrl="https://learn.mongodb.com/skills"
          onPromotionClick={handlePromotionClick}
        />
        <Message.Actions
          onClickCopy={handleCopy}
          onClickRetry={handleRetry}
          onRatingChange={handleRatingChange}
          onSubmitFeedback={handleSubmitFeedback}
        />
        <Message.VerifiedBanner
          verifier="MongoDB Staff"
          verifiedAt={new Date('2024-03-24T16:20:00Z')}
          learnMoreUrl="https://mongodb.com/docs"
        />
        <Message.Links links={links} onLinkClick={handleLinkClick} />
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
| `onPromotionClick`                | `() => void`                                                                                        | Callback function for when promotional content is clicked                         |                                                                                                                           |
| `promotion`                       | `string`                                                                                            | Text to render as promotional content on the message                              |                                                                                                                           |
| `promotionUrl`                    | `string`                                                                                            | URL for the promotion to link the "Learn more" to                                 |                                                                                                                           |
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

### Message.Links

| Prop                       | Type                             | Description                                                  | Default               |
| -------------------------- | -------------------------------- | ------------------------------------------------------------ | --------------------- |
| `headingText` _(optional)_ | `string`                         | The text to display as the heading of the links section.     | `'Related Resources'` |
| `links`                    | `Array<RichLinkProps>`           | An array of link data to render in the links section.        |                       |
| `onLinkClick` _(optional)_ | `({ children: string }) => void` | A callback function that is called when any link is clicked. |                       |
| `...`                      | `HTMLElementProps<'div'>`        | Props spread on the root element                             |                       |

### Message.Promotion

| Prop                            | Type                                | Description                                          | Default |
| ------------------------------- | ----------------------------------- | ---------------------------------------------------- | ------- |
| `promotionText`                 | `string`                            | Promotion text content.                              |         |
| `promotionUrl` _(optional)_     | `string`                            | Promotion URL for the "Learn More" link.             |         |
| `baseFontSize` _(optional)_     | `BaseFontSize`                      | Base font size.                                      |         |
| `onPromotionClick` _(optional)_ | `() => void`                        | Promotion onClick callback handler.                  |         |
| `markdownProps` _(optional)_    | `Omit<LGMarkdownProps, 'children'>` | Props passed to the internal ReactMarkdown instance. |         |
| `...`                           | `HTMLElementProps<'div'>`           | Props spread on the root element                     |         |

### Message.VerifiedBanner

| Prop                        | Type     | Description                                       | Default |
| --------------------------- | -------- | ------------------------------------------------- | ------- |
| `learnMoreUrl` _(optional)_ | `string` | URL to learn more about the verification.         |         |
| `verifiedAt` _(optional)_   | `Date`   | The time the message was last verified.           |         |
| `verifier` _(optional)_     | `string` | The name of the entity that verified the message. |         |

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

### Message.Links

The `MessageLinks` component provides an expandable/collapsible section for displaying related links.

#### Rendering Behavior

- If the `links` array is empty, the component returns `null` and does not render anything
- Links are displayed in an expandable section with a chevron toggle button
- The section starts collapsed by default and can be expanded to show all links
- The link objects provided to the `Message.Links` component's `links` prop can leverage the following `variant` values which map to pre-defined badge glyphs, labels, and colors.
  - `"Blog"`
  - `"Book"`
  - `"Code"`
  - `"Docs"`
  - `"Learn"`
  - `"Video"`
  - `"Website"`

#### State Management

The component manages its own internal state for:

- Expansion state: Controls whether the links section is expanded or collapsed

### Message.Promotion

The `MessagePromotion` component displays promotional content with an award icon and optional "Learn More" link.

#### Rendering Behavior

- If `promotionText` is empty or undefined, the component returns `null` and does not render anything
- If `promotionUrl` is provided, a "Learn More" link is displayed that opens in a new tab
- If `promotionUrl` is not provided or is an empty string, no "Learn More" link is rendered
- The component only renders in the `compact` variant when used as a compound component

#### Callback Behavior

- The `onPromotionClick` callback is triggered when clicking the "Learn More" link

### Message.VerifiedBanner

The `VerifiedBanner` component displays verification information for messages.

#### Rendering Behavior

- If no verification props (`verifier`, `verifiedAt`, `learnMoreUrl`) are provided, basic "Verified" text is displayed
- The banner automatically formats the verification date using `toLocaleDateString()`
- "Learn More" link is displayed when optional `learnMoreUrl` is provided
