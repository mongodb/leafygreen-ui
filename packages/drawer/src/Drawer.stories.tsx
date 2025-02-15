import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { storybookArgTypes, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { Tab } from '@leafygreen-ui/tabs';
import { Body } from '@leafygreen-ui/typography';

import { DrawerTabs } from './DrawerTabs';
import { Drawer, DrawerProps } from '.';

const SEED = 0;
faker.seed(SEED);

export default {
  title: 'Components/Drawer',
  component: Drawer,
  decorators: [
    StoryFn => (
      <div
        className={css`
          height: 100vh;
        `}
      >
        <StoryFn />
      </div>
    ),
  ],
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
      <Drawer {...args} open={open} onClose={() => setOpen(false)} />
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

const TemplateComponent: StoryFn<DrawerProps> = (args: DrawerProps) => {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <Button onClick={() => setOpen(prevOpen => !prevOpen)}>
        Open Drawer
      </Button>
      <Drawer {...args} open={open} setOpen={setOpen} />
    </div>
  );
};

const LongContent = () => (
  <>
    {faker.lorem
      .paragraphs(20, '\n')
      .split('\n')
      .map((p, i) => (
        <Body key={i}>{p}</Body>
      ))}
  </>
);

export const Scroll: StoryObj<DrawerProps> = {
  render: TemplateComponent,
  args: {
    children: <LongContent />,
  },
};

export const WithTabs: StoryObj<DrawerProps> = {
  render: TemplateComponent,
  args: {
    children: (
      <DrawerTabs>
        <Tab name="Tab 1">
          <LongContent />
        </Tab>
        <Tab name="Tab 2">
          <LongContent />
        </Tab>
        <Tab name="Tab 3">
          <LongContent />
        </Tab>
      </DrawerTabs>
    ),
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
