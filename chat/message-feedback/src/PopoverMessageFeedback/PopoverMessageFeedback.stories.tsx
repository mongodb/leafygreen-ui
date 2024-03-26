import React, { ChangeEventHandler, useRef, useState } from 'react';
import { MessageRating, MessageRatingValue } from '@lg-chat/message-rating';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { PopoverMessageFeedback } from '.';

export default {
  title: 'Chat/MessageFeedback/PopoverMessageFeedback',
  component: PopoverMessageFeedback,
  args: {
    label: 'Provide additional feedback here. How can we improve?',
  },
  argTypes: {
    active: {
      control: 'none',
    },
    darkMode: storybookArgTypes.darkMode,
  },
};

const Template: StoryFn<typeof PopoverMessageFeedback> = args => {
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
        {...args}
        active={isActive}
        refEl={triggerRef}
        onClose={closePopover}
        onCancel={closePopover}
        onSubmit={closePopover}
      />
    </>
  );
};

export const Basic = Template.bind({});

export const RightAligned = Template.bind({});
RightAligned.args = {
  align: 'right',
  justify: 'start',
};
