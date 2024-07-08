import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { MessageRating, MessageRatingProps } from '.';

export default {
  title: 'Chat/MessageRating',
  component: MessageRating,
  args: {
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      // eslint-disable-next-line no-console
      console.log(e);
    },
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    description: { control: 'text' },
    value: {
      control: 'radio',
      options: ['liked', 'disliked', 'undefined'],
    },
  },
};

const Template: StoryFn<typeof MessageRating> = props => (
  <MessageRating {...props} />
);

export const Basic: StoryFn<typeof MessageRating> = Template.bind({});

export const Controlled: StoryFn<typeof MessageRating> = ({
  // eslint-disable-next-line react/prop-types
  value: valueProp,
  ...rest
}) => {
  const [value, setValue] = useState<MessageRatingProps['value']>(valueProp);
  useEffect(() => {
    setValue(value);
  }, [valueProp]);
  const handleRatingChange: ChangeEventHandler<HTMLInputElement> = e => {
    setValue(e.target.value as MessageRatingProps['value']);
  };

  return (
    <MessageRating {...rest} value={value} onChange={handleRatingChange} />
  );
};
Controlled.argTypes = {
  value: { control: 'none' },
};
