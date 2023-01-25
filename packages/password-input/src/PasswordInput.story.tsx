import React from 'react';
import { Story } from '@storybook/react';

import {
  PasswordInputProps,
  SizeVariant,
  ValidationStateProps,
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

const validations: Array<ValidationStateProps> = [
  {
    message: 'This is an error message',
    state: 'error',
  },
  {
    message: 'This is an error message',
    state: 'error',
  },
];

const Template: Story<PasswordInputProps> = props => (
  <PasswordInput
    {...props}
    validationState={validations}
    aria-describedby={undefined} //TODO: figure out why i need this
  />
);

export const Basic = Template.bind({});

export const CustomContainer = (props: PasswordInputProps) => (
  <PasswordInput
    {...props}
    validationState="valid"
    aria-describedby={'my-id'}
  />
);
