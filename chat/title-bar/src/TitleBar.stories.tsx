import React from 'react';
import { StoryFn } from '@storybook/react';

import { storybookArgTypes } from '@leafygreen-ui/lib';

import { TitleBar } from '.';

export default {
  title: 'Chat/TitleBar',
  component: TitleBar,
  args: {
    title: 'LeafyGreen Chat',
    onClose: undefined,
  },
  argTypes: {
    onClose: { control: 'none' },
    badgeText: { control: 'text' },
    darkMode: storybookArgTypes.darkMode,
  },
};

const Template: StoryFn<typeof TitleBar> = props => (
  <div style={{ width: 700 }}>
    <TitleBar {...props} />
  </div>
);

export const Centered = Template.bind({});

export const LeftAligned = Template.bind({});
LeftAligned.args = {
  align: 'left',
};

export const WithBeta = Template.bind({});
WithBeta.args = {
  badgeText: 'Beta',
};

export const CenteredWithClose = Template.bind({});
CenteredWithClose.args = {
  onClose: () => {},
};

export const LeftAlignedWithClose = Template.bind({});
LeftAlignedWithClose.args = {
  align: 'left',
  onClose: () => {},
};
