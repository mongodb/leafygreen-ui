import React from 'react';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import { StoryMetaType } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

import { Size } from './Toggle/types';
import Toggle, { ToggleProps } from '.';

const meta: StoryMetaType<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  argTypes: {
    darkMode: {
      control: 'boolean',
    },
    checked: { control: 'none' },
    disabled: {
      control: 'boolean',
    },
    size: {
      control: 'radio',
      options: Object.values(Size),
    },
  },
  parameters: {
    default: 'Uncontrolled',
  },
};
export default meta;
const Template: StoryFn<ToggleProps> = (args: ToggleProps) => (
  <Toggle aria-labelledby="toggle" {...args} />
);

export const Uncontrolled = Template.bind({});
export const Controlled = Template.bind({});
Controlled.argTypes = {
  checked: { control: 'boolean' },
};

export const WithLabel: StoryFn<ToggleProps> = ({
  // eslint-disable-next-line react/prop-types
  ...args
}) => (
  <div>
    <label
      htmlFor="toggle"
      id="label"
      className={css`
        display: block;
        margin-bottom: 16px;
        color: ${args.darkMode ? palette.white : palette.gray.dark2};
      `}
    >
      This is a label for my toggle.
    </label>

    <Toggle id="toggle" aria-labelledby="toggle" {...args} />
  </div>
);
