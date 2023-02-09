import React, { useRef } from 'react';
import { Story } from '@storybook/react';

import { storybookArgTypes } from '@leafygreen-ui/lib';

import {
  PasswordInputProps,
  Size,
  State,
} from './PasswordInput/PasswordInput.types';
import { PasswordInput } from '.';

export default {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  args: {
    label: 'label',
    stateNotifications: [],
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
    size: {
      control: 'select',
      options: Object.values(Size),
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
  return <PasswordInput data-testid="test-id" {...props} />;
};

export const Basic = Template.bind({});

export const Error = Template.bind({});
Error.args = {
  stateNotifications: [
    {
      notification: "i'm an error",
      state: 'error',
    },
  ],
};

export const Warning = Template.bind({});
Warning.args = {
  stateNotifications: [
    {
      notification: "i'm a warning",
      state: 'warning',
    },
  ],
};

export const Valid = Template.bind({});
Valid.args = {
  stateNotifications: [
    {
      notification: "i'm valid",
      state: 'valid',
    },
  ],
};

export const None = Template.bind({});
None.args = {
  stateNotifications: [
    {
      notification: "i'm waiting",
      state: 'none',
    },
  ],
};

export const Mixed = Template.bind({});
Mixed.args = {
  stateNotifications: [
    {
      notification: "i'm an error",
      state: 'error',
    },
    {
      notification: "i'm a warning",
      state: 'warning',
    },
    {
      notification: "i'm valid",
      state: 'valid',
    },
    {
      notification: "i'm waiting",
      state: 'none',
    },
  ],
};

export const CustomContainer = ({
  stateNotifications,
  ...rest
}: PasswordInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <PasswordInput
      {...rest}
      stateNotifications={stateNotifications as State}
      aria-describedby={'my-id'}
      ref={ref}
    />
  );
};

CustomContainer.argTypes = {
  stateNotifications: {
    control: 'select',
    options: Object.values(State),
  },
};

CustomContainer.args = {
  stateNotifications: State.Warning,
};
