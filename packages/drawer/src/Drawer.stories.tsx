import React, { useState } from 'react';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import Button from '@leafygreen-ui/button';

import { Drawer, DrawerProps } from '.';

export default {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [],
    },
    generate: {
      storyNames: ['LightMode', 'DarkMode'],
      combineArgs: {
        title: ['Drawer Title'],
      },
    },
  },
  args: {
    title: 'Drawer Title',
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    title: {
      control: 'text',
    },
  },
} satisfies StoryMetaType<typeof Drawer>;

const LiveExampleComponent = args => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(prevOpen => !prevOpen)}>
        Open Drawer
      </Button>
      <Drawer {...args} open={open} setOpen={setOpen} />
    </div>
  );
};

export const LiveExample: StoryObj<DrawerProps> = {
  render: LiveExampleComponent,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const LightMode: StoryObj<DrawerProps> = {
  render: () => <></>,
  args: {
    darkMode: false,
    open: true,
  },
};

export const DarkMode: StoryObj<DrawerProps> = {
  render: () => <></>,
  args: {
    darkMode: true,
    open: true,
  },
};
