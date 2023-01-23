import React from 'react';
import { ComponentStory } from '@storybook/react';

import {
  SizeVariant,
  ValidationProps,
} from './PasswordInput/PasswordInput.types';
import { PasswordInput } from '.';

export default {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  args: {
    label: 'label',
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
    placeholder: {
      control: 'text',
    },
    sizeVariant: {
      control: 'select',
      options: Object.values(SizeVariant),
    },
  },
  parameters: {
    controls: {
      exclude: ['value', 'className', 'onBlur', 'onChange', 'aria-labelledby'],
    },
  },
};

// const validations: Array<ValidationProps> = [
//   {
//     message: 'This is an error message',
//     state: 'valid',
//   },
//   {
//     message: 'This is another error message',
//     state: 'valid',
//   },
//   {
//     message: 'This is another error message',
//     state: 'error',
//   },
// ];

const validations: Array<ValidationProps> = [
  {
    message: 'This is an error message',
    state: 'valid',
  },
];

const Template: ComponentStory<typeof PasswordInput> = props => (
  <PasswordInput {...props} validations={validations} />
);

export const Basic = Template.bind({});
