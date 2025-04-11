import React from 'react';
import { StoryFn } from '@storybook/react';

import { Toolbar, ToolbarIconButton } from '.';

export default {
  title: 'Components/Toolbar',
  component: Toolbar,
  parameters: {
    // default: 'LiveExample',
    controls: {
      exclude: ['children'],
    },
  },
  decorators: [
    Story => (
      <div style={{ position: 'relative', height: '70vh' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: (
      <>
        <ToolbarIconButton label="Code" glyph="Code" />
        <ToolbarIconButton label="Key" glyph="Key" active />
        <ToolbarIconButton label="Megaphone" glyph="Megaphone" />
        <ToolbarIconButton label="List" glyph="List" />
      </>
    ),
  },
};

const Template: StoryFn<typeof Toolbar> = props => <Toolbar {...props} />;

export const Basic = Template.bind({});
