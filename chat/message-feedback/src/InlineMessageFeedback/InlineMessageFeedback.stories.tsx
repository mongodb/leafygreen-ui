import React, { ChangeEvent, useState } from 'react';
import {
  MessageRating,
  MessageRatingProps,
  MessageRatingValue,
} from '@lg-chat/message-rating';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

import { InlineMessageFeedback } from '.';

export default {
  title: 'Chat/MessageFeedback/InlineMessageFeedback',
  component: InlineMessageFeedback,
  args: {
    label: 'What did you think?',
    onClose: undefined,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};

const Template: StoryFn<typeof InlineMessageFeedback> = props => (
  <InlineMessageFeedback {...props} />
);

export const Basic = Template.bind({});

export const BasicControlled = Template.bind({});
BasicControlled.args = {
  textareaProps: {
    value: 'test',
  },
};

export const SubmittedState = Template.bind({});
SubmittedState.args = {
  isSubmitted: true,
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
          onSubmit={handleSubmit}
          isSubmitted={isDisplayingSubmitted}
        />
      )}
    </div>
  );
};
