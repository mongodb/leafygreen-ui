import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import type { StoryFn } from '@storybook/react';

import { BaseFontSize } from '@leafygreen-ui/tokens';

import { Panel } from './Panel';

const meta: StoryMetaType<typeof Panel> = {
  title: 'Components/CodeEditor/Panel',
  component: Panel,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'extensions'],
    },
  },
  decorators: [StoryFn => <StoryFn />],
  args: {
    darkMode: false,
    title: 'Panel',
    showCopyButton: true,
    showFormatButton: true,
    showSecondaryMenuButton: true,
    onCopyClick: () => {},
    onFormatClick: () => {},
    onUndoClick: () => {},
    onRedoClick: () => {},
    onDownloadClick: () => {},
    onViewShortcutsClick: () => {},
    customSecondaryButtons: [],
    children: null,
    baseFontSize: 13,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    showCopyButton: {
      control: { type: 'boolean' },
    },
    showFormatButton: {
      control: { type: 'boolean' },
    },
    showSecondaryMenuButton: {
      control: { type: 'boolean' },
    },
    onCopyClick: {
      control: { type: 'function' },
    },
    onFormatClick: {
      control: { type: 'function' },
    },
    onUndoClick: {
      control: { type: 'function' },
    },
    onRedoClick: {
      control: { type: 'function' },
    },
    onDownloadClick: {
      control: { type: 'function' },
    },
    onViewShortcutsClick: {
      control: { type: 'function' },
    },
    customSecondaryButtons: {
      control: { type: 'array' },
    },
    children: {
      control: { type: 'object' },
    },
    baseFontSize: {
      control: { type: 'select' },
      options: Object.values(BaseFontSize),
    },
  },
};

export default meta;

const Template: StoryFn<typeof Panel> = args => <Panel {...args} />;

export const LiveExample = Template.bind({});
