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

import {
  FormState,
  InlineMessageFeedback,
  type InlineMessageFeedbackProps,
} from '.';

const meta: StoryMetaType<typeof InlineMessageFeedback> = {
  title: 'Composition/Chat/MessageFeedback/InlineMessageFeedback',
  component: InlineMessageFeedback,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        state: Object.values(FormState),
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
      excludeCombinations: [
        {
          onClose: undefined,
          state: FormState.Submitted,
        },
        {
          textareaProps: {
            value: '',
          },
          state: FormState.Error,
        },
        {
          textareaProps: {
            value: '',
          },
          state: FormState.Submitting,
        },
        {
          textareaProps: {
            value: '',
          },
          state: FormState.Submitted,
        },
      ],
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
    state: FormState.Submitted,
  },
};

export const WithMessageRating: StoryFn<typeof MessageRating> = args => {
  const [rating, setRating] = useState<MessageRatingProps['value']>();
  const [feedbackFormState, setFeedbackFormState] = useState<FormState>(
    FormState.Unset,
  );

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (feedbackFormState !== FormState.Submitted)
      setRating(e.target.value as MessageRatingValue);
  };

  const handleCancel = () => {
    setRating('unselected');
    setFeedbackFormState(FormState.Unset);
  };

  const handleSubmit = () => {
    setFeedbackFormState(FormState.Submitting);
    // Simulate async submission
    setTimeout(() => {
      setFeedbackFormState(FormState.Submitted);
      // Reset after 3 seconds
      setTimeout(() => {
        setFeedbackFormState(FormState.Unset);
      }, 3000);
    }, 1000);
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
        hideThumbsUp={feedbackFormState === FormState.Submitted}
      />
      {rating === 'disliked' && (
        <InlineMessageFeedback
          label="What do you think?"
          onCancel={handleCancel}
          onClose={handleCancel}
          onSubmit={handleSubmit}
          state={feedbackFormState}
        />
      )}
    </div>
  );
};

export const Generated: StoryObj<InlineMessageFeedbackStoryProps> = {
  render: Template,
  args: {
    variant: Variant.Compact,
  },
};
