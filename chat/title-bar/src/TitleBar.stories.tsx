import React from 'react';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import { TitleBar, type TitleBarProps } from './TitleBar';

const meta: StoryMetaType<typeof TitleBar> = {
  title: 'Composition/Chat/TitleBar',
  component: TitleBar,
  args: {
    title: 'LeafyGreen Chat',
  },
  argTypes: {
    badgeText: { control: 'text' },
    darkMode: storybookArgTypes.darkMode,
  },
  parameters: {
    default: null,
    generate: {
      combineArgs: {
        badgeText: [undefined, 'Beta'],
        darkMode: [false, true],
      },
      decorator: Instance => {
        return (
          <div style={{ width: 700 }}>
            <Instance />
          </div>
        );
      },
    },
  },
};

export default meta;

const Template: StoryFn<TitleBarProps> = props => (
  <div style={{ width: 700 }}>
    <TitleBar {...props} />
  </div>
);

export const LiveExample: StoryObj<TitleBarProps> = {
  render: Template,
  args: {
    title: 'LeafyGreen Chat',
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Generated: StoryObj<TitleBarProps> = {
  render: Template,
  args: {
    title: 'LeafyGreen Chat',
  },
};
