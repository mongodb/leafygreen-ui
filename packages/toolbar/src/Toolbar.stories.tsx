/* eslint-disable no-console */
import React from 'react';
import { StoryFn } from '@storybook/react';

import { Toolbar, ToolbarIconButton } from '.';

export default {
  title: 'Components/Toolbar',
  component: Toolbar,
  parameters: {
    //TODO: default: 'LiveExample',
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
        <ToolbarIconButton
          label="Code"
          glyph="Code"
          onClick={() => console.log('CODE')}
        />
        <ToolbarIconButton
          label="Key"
          glyph="Key"
          active
          onClick={() => console.log('KEY')}
        />
        <ToolbarIconButton
          label={<div>Megaphone</div>}
          glyph="Megaphone"
          onClick={() => console.log('MEGAPHONE')}
        />
        <ToolbarIconButton
          label="List"
          glyph="List"
          onClick={() => console.log('LIST')}
        />
      </>
    ),
  },
};

const Template: StoryFn<typeof Toolbar> = props => (
  <>
    <button>hey</button>
    <Toolbar {...props} />
    <button>hey</button>
  </>
);

export const Basic = Template.bind({});
