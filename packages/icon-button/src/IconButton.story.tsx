import React from 'react';
import { ComponentStory } from '@storybook/react';
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import IconButton from './IconButton';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

export default {
  title: 'Packages/IconButton',
  component: IconButton,
  argTypes: {
    href: {
      control: 'string',
    },
    darkMode: {
      control: 'boolean',
    },
    active: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};
// eslint-disable-next-line react/prop-types
const Template: ComponentStory<typeof IconButton> = ({ darkMode, ...args }) => (
  <LeafyGreenProvider>
    <div
      className={css`
        padding: 60px;
        ${darkMode && `background-color: ${palette.gray.dark3};`}
      `}
    >
      <IconButton darkMode={darkMode} {...args}>
        <CloudIcon />
      </IconButton>
    </div>
  </LeafyGreenProvider>
);

export const Basic = Template.bind({});

export const Link = Template.bind({});
Link.args = {
  href: 'https://mongodb.design',
};
