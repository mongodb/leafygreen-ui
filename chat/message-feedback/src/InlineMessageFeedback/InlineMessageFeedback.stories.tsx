import React, { ChangeEvent, useState } from 'react';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import {
  MessageRating,
  MessageRatingProps,
  MessageRatingValue,
} from '@lg-chat/message-rating';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import { css, cx } from '@leafygreen-ui/emotion';

import { InlineMessageFeedback, type InlineMessageFeedbackProps } from '.';

const meta: StoryMetaType<typeof InlineMessageFeedback> = {
  title: 'Composition/Chat/MessageFeedback/InlineMessageFeedback',
  component: InlineMessageFeedback,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        // eslint-disable-next-line no-console
        onClose: [undefined, () => console.log('closed')],
        textareaProps: [
          {
            value: '',
          },
          {
            value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          },
        ],
      },
      decorator: StoryFn => (
        <LeafyGreenChatProvider variant={Variant.Compact}>
          <StoryFn />
        </LeafyGreenChatProvider>
      ),
    },
  },
  args: {
    label: 'What did you think?',
    onClose: undefined,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};
export default meta;

type InlineMessageFeedbackStoryProps = InlineMessageFeedbackProps & {
  variant?: Variant;
};

const Template: StoryFn<InlineMessageFeedbackStoryProps> = ({
  variant,
  ...props
}) => (
  <LeafyGreenChatProvider variant={variant}>
    <InlineMessageFeedback {...props} />
  </LeafyGreenChatProvider>
);

export const LiveExample: StoryObj<InlineMessageFeedbackStoryProps> = {
  render: Template,
};

export const Controlled: StoryObj<InlineMessageFeedbackStoryProps> = {
  render: Template,
  args: {
    textareaProps: {
      value: 'test',
    },
  },
  parameters: {
    controls: {
      exclude: ['onSubmit', 'onCancel'],
    },
  },
};

export const SubmittedState: StoryObj<InlineMessageFeedbackStoryProps> = {
  render: Template,
  args: {
    isSubmitted: true,
  },
};

export const WithMessageRating: StoryFn<typeof MessageRating> = args => {
  const [rating, setRating] = useState<MessageRatingProps['value']>();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isDisplayingSubmitted, setIsDisplayingSubmitted] =
    useState<boolean>(false);

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isSubmitted) setRating(e.target.value as MessageRatingValue);
  };

  const handleCancel = () => {
    setRating('unselected');
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setIsDisplayingSubmitted(true);
    const timeout = setTimeout(() => {
      setIsDisplayingSubmitted(false);
      clearTimeout(timeout);
    }, 3000);
  };

  return (
    <div
      className={cx(
        css`
          min-width: 400px;
          max-width: 100%;
        `,
        args.className,
      )}
    >
      <MessageRating
        {...args}
        value={rating}
        onChange={handleRatingChange}
        hideThumbsUp={isSubmitted}
      />
      {rating === 'disliked' && (!isSubmitted || isDisplayingSubmitted) && (
        <InlineMessageFeedback
          label="What do you think?"
          onCancel={handleCancel}
          onClose={handleCancel}
          onSubmit={handleSubmit}
          isSubmitted={isDisplayingSubmitted}
        />
      )}
    </div>
  );
};

export const Generated: StoryObj<InlineMessageFeedbackStoryProps> = {
  render: Template,
  args: {
    isSubmitted: false,
    variant: Variant.Compact,
  },
};
