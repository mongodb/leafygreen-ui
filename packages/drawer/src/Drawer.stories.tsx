import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { Tab } from '@leafygreen-ui/tabs';
import { spacing } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { DisplayMode, Drawer, DrawerProps } from './Drawer';
import { DrawerTabs } from './DrawerTabs';
import { PersistentDrawerLayout } from './PersistentDrawerLayout';

const SEED = 0;
faker.seed(SEED);

const defaultExcludedControls = [
  ...storybookExcludedControlParams,
  'children',
  'open',
];

export default {
  title: 'Components/Drawer',
  component: Drawer,
  decorators: [
    StoryFn => (
      <div
        className={css`
          margin: -100px;
          height: 100vh;
          display: flex;
          align-items: center;
        `}
      >
        <StoryFn />
      </div>
    ),
  ],
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: defaultExcludedControls,
    },
  },
  args: {
    displayMode: DisplayMode.Overlay,
    title: 'Drawer Title',
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    displayMode: {
      options: Object.values(DisplayMode),
      control: { type: 'radio' },
    },
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
      <Drawer {...args} open={open} onClose={() => setOpen(false)} />
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
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    controls: {
      exclude: defaultExcludedControls,
    },
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

const snapshotStoryExcludedControlParams = [
  ...defaultExcludedControls,
  'darkMode',
  'displayMode',
  'title',
];

export const LightModeOverlay: StoryObj<DrawerProps> = {
  render: TemplateComponent,
  args: {
    children: <LongContent />,
    darkMode: false,
    displayMode: DisplayMode.Overlay,
    open: true,
  },
  parameters: {
    controls: {
      exclude: snapshotStoryExcludedControlParams,
    },
  },
};

export const DarkModeOverlay: StoryObj<DrawerProps> = {
  render: TemplateComponent,
  args: {
    children: <LongContent />,
    darkMode: true,
    displayMode: DisplayMode.Overlay,
    open: true,
  },
  parameters: {
    controls: {
      exclude: snapshotStoryExcludedControlParams,
    },
  },
};

const PersistentExample: StoryFn<DrawerProps> = (args: DrawerProps) => {
  const [open, setOpen] = useState(true);
  return (
    <PersistentDrawerLayout isDrawerOpen={open}>
      <main
        className={css`
          padding: ${spacing[400]}px;
          overflow: auto;
        `}
      >
        <Button onClick={() => setOpen(prevOpen => !prevOpen)}>
          Open Drawer
        </Button>
        <LongContent />
      </main>
      <Drawer {...args} open={open} onClose={() => setOpen(false)}>
        <LongContent />
      </Drawer>
    </PersistentDrawerLayout>
  );
};

export const LightModePersistent: StoryObj<DrawerProps> = {
  render: PersistentExample,
  args: {
    darkMode: false,
    displayMode: DisplayMode.Persistent,
    open: true,
  },
  parameters: {
    controls: {
      exclude: snapshotStoryExcludedControlParams,
    },
  },
};

export const DarkModePersistent: StoryObj<DrawerProps> = {
  render: PersistentExample,
  args: {
    darkMode: true,
    displayMode: DisplayMode.Persistent,
    open: true,
  },
  parameters: {
    controls: {
      exclude: snapshotStoryExcludedControlParams,
    },
  },
};
