import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from 'react';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import { MessageRating, type MessageRatingProps, MessageRatingValue } from '.';

const meta: StoryMetaType<typeof MessageRating> = {
  title: 'Composition/Chat/MessageRating',
  component: MessageRating,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        hideThumbsDown: [false, true],
        hideThumbsUp: [false, true],
        value: Object.values(MessageRatingValue),
      },
      decorator: StoryFn => (
        <LeafyGreenChatProvider variant={Variant.Compact}>
          <StoryFn />
        </LeafyGreenChatProvider>
      ),
      excludeCombinations: [
        {
          hideThumbsDown: true,
          hideThumbsUp: true,
        },
        {
          hideThumbsDown: true,
          value: MessageRatingValue.Disliked,
        },
        {
          hideThumbsDown: true,
          value: MessageRatingValue.Unselected,
        },
        {
          hideThumbsUp: true,
          value: MessageRatingValue.Liked,
        },
        {
          hideThumbsUp: true,
          value: MessageRatingValue.Unselected,
        },
      ],
    },
  },
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
      options: Object.values(MessageRatingValue),
    },
    variant: {
      control: 'radio',
      options: Object.values(Variant),
    },
  },
};
export default meta;

type MessageRatingStoryProps = MessageRatingProps & {
  variant?: Variant;
};

const Template: StoryFn<MessageRatingStoryProps> = ({ variant, ...props }) => (
  <LeafyGreenChatProvider variant={variant}>
    <MessageRating {...props} />
  </LeafyGreenChatProvider>
);

export const LiveExample: StoryObj<MessageRatingStoryProps> = {
  render: Template,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Controlled: StoryFn<typeof MessageRating> = ({
  value: valueProp,
  ...rest
}) => {
  const [value, setValue] = useState<MessageRatingProps['value']>(valueProp);
  useEffect(() => {
    setValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export const Generated: StoryObj<MessageRatingStoryProps> = {
  render: Template,
  args: {
    variant: Variant.Compact,
  },
};
