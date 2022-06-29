import React from 'react';
import { ComponentStory } from '@storybook/react';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import Toggle from '.';

export default {
  title: 'Components/Toggle',
  component: Toggle,
  argTypes: {
    darkMode: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
  },
};

const Template: ComponentStory<typeof Toggle> = args => (
  <Toggle aria-labelledby="toggle" {...args} />
);

export const Basic = Template.bind({});

export const WithLabel: ComponentStory<typeof Toggle> = ({
  // eslint-disable-next-line react/prop-types
  darkMode,
  ...args
}) => (
  <>
    <label
      htmlFor="toggle"
      id="label"
      className={css`
        display: block;
        margin-bottom: 16px;
        color: ${darkMode ? palette.white : palette.gray.dark2};
      `}
    >
      This is a label for my toggle.
    </label>

    <Toggle
      id="toggle"
      aria-labelledby="toggle"
      darkMode={darkMode}
      {...args}
    />
  </>
);
