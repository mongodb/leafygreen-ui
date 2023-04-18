import React, { useState } from 'react';
import { ComponentStory } from '@storybook/react';

import { BaseFontSize } from '@leafygreen-ui/tokens';

import TextInput, { SizeVariant, State, TextInputProps } from '.';

export const StoryTextInput: React.FC<TextInputProps> = props => (
  <TextInput {...props} />
);

export default {
  title: 'Components/TextInput',
  component: StoryTextInput,
  args: {
    label: 'Label',
    description: 'This is a description for the input',
  },
  argTypes: {
    darkMode: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    optional: {
      control: 'boolean',
    },
    id: {
      control: 'text',
    },
    errorMessage: {
      control: 'text',
    },
    state: {
      control: 'select',
      options: Object.values(State),
    },
    sizeVariant: {
      control: 'select',
      options: Object.values(SizeVariant),
    },
    baseFontSize: {
      control: 'radio',
      options: Object.values(BaseFontSize),
    },
  },
  parameters: {
    controls: {
      exclude: [
        'ref',
        'value',
        'className',
        'onBlur',
        'onChange',
        'handleValidation',
        'aria-labelledby',
      ],
    },
  },
  excludeStories: ['StoryTextInput'],
};

const Template: ComponentStory<typeof StoryTextInput> = ({
  ...args
}: TextInputProps) => <TextInput {...args} />;

export const Basic = Template.bind({});

const emailRegex =
  // eslint-disable-next-line no-control-regex
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const WithValidation = (args: TextInputProps) => {
  const [state, setState] = useState<'none' | 'valid' | 'error'>('none');

  const handleValidation = (value: string) => {
    if (value.match(emailRegex)) {
      setState('valid');
    } else {
      setState('error');
    }
  };

  return (
    <Template
      placeholder="lauren@ipsum.com"
      state={state}
      type="email"
      errorMessage="Invalid email"
      handleValidation={handleValidation}
      {...args}
    />
  );
};
