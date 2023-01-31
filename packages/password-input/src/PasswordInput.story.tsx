import React from 'react';
import { Story } from '@storybook/react';

import { storybookArgTypes } from '@leafygreen-ui/lib';

import {
  PasswordInputProps,
  SizeVariant,
  States,
} from './PasswordInput/PasswordInput.types';
import { PasswordInput } from '.';

export default {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  args: {
    label: 'label',
    stateNotifications: [
      {
        message: "i'm an error",
        state: 'error',
      },
      {
        message: "i'm a warning",
        state: 'warning',
      },
      {
        message: "i'm valid",
        state: 'valid',
      },
      {
        message: "i'm waiting",
        state: 'none',
      },
    ],
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
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
      exclude: [
        'value',
        'className',
        'onBlur',
        'onChange',
        'aria-labelledby',
        'aria-describedby',
        'aria-label',
        'id',
      ],
    },
  },
};

const Template: Story<PasswordInputProps> = props => {
  return <PasswordInput {...props} />;
};

export const Basic = Template.bind({});

export const CustomContainer = ({
  stateNotifications,
  ...rest
}: PasswordInputProps) => (
  <PasswordInput
    {...rest}
    stateNotifications={stateNotifications as States}
    aria-describedby={'my-id'}
    onBlur={() => console.log('blur')}
    required
  />
);

CustomContainer.argTypes = {
  stateNotifications: {
    control: 'select',
    options: Object.values(States),
  },
};
