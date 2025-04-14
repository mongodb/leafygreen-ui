import React from 'react';
import { StoryFn } from '@storybook/react';

import { glyphs } from '@leafygreen-ui/icon';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { Toolbar } from '../Toolbar/Toolbar';

import { ToolbarIconButton, ToolbarIconButtonProps } from '.';

export default {
  title: 'Components/Toolbar/ToolbarIconButton',
  component: ToolbarIconButton,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: ['children', 'label'],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        active: [true, false],
        disabled: [true, false],
        'data-hover': [false, true],
        'data-focus': [false, true],
      },
      decorator: (Story, ctx) => {
        return (
          <LeafyGreenProvider darkMode={ctx?.args.darkMode}>
            <Toolbar>
              <Story glyph={ctx?.args.glyph} />
            </Toolbar>
          </LeafyGreenProvider>
        );
      },
    },
  },
  decorators: [
    (Story, _ctx) => (
      <Toolbar darkMode={_ctx?.args?.darkMode}>
        <Story />
      </Toolbar>
    ),
  ],
  args: {
    glyph: 'Code',
    active: false,
    disabled: false,
    darkMode: false,
  },
  argTypes: {
    glyph: {
      options: Object.keys(glyphs),
      control: { type: 'select' },
    },
  },
};

export const LiveExample: StoryFn<ToolbarIconButtonProps> = (
  args: ToolbarIconButtonProps,
  // FIXME:
  // @ts-ignore
) => <ToolbarIconButton {...args} label={args.glyph} />;

export const Generated = () => <></>;
