import React, { useMemo, useState } from 'react';
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
import { DrawerStackProvider } from './DrawerStackContext';
import { DrawerTabs } from './DrawerTabs';
import { EmbeddedDrawerLayout } from './EmbeddedDrawerLayout';

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

const LongContent = () => {
  const paragraphs = useMemo(() => {
    return faker.lorem
      .paragraphs(20, '\n')
      .split('\n')
      .map((p, i) => <Body key={i}>{p}</Body>);
  }, []);

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        gap: ${spacing[100]}px;
      `}
    >
      {paragraphs}
    </div>
  );
};

const TemplateComponent: StoryFn<DrawerProps> = ({
  displayMode,
  ...rest
}: DrawerProps) => {
  const [open, setOpen] = useState(true);

  const renderTrigger = () => (
    <Button onClick={() => setOpen(prevOpen => !prevOpen)}>Open Drawer</Button>
  );

  const renderDrawer = () => (
    <Drawer
      {...rest}
      displayMode={displayMode}
      open={open}
      onClose={() => setOpen(false)}
    />
  );

  return displayMode === DisplayMode.Embedded ? (
    <DrawerStackProvider>
      <EmbeddedDrawerLayout isDrawerOpen={open}>
        <main
          className={css`
            padding: ${spacing[400]}px;
            overflow: auto;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: ${spacing[200]}px;
          `}
        >
          {renderTrigger()}
          <LongContent />
        </main>
        {renderDrawer()}
      </EmbeddedDrawerLayout>
    </DrawerStackProvider>
  ) : (
    <DrawerStackProvider>
      <div>
        {renderTrigger()}
        {renderDrawer()}
      </div>
    </DrawerStackProvider>
  );
};

export const LiveExample: StoryObj<DrawerProps> = {
  render: TemplateComponent,
  args: {
    children: <LongContent />,
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

const MultipleDrawersComponent: StoryFn<DrawerProps> = (args: DrawerProps) => {
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);
  const [openC, setOpenC] = useState(false);

  return (
    <DrawerStackProvider>
      <div
        className={css`
          display: flex;
          flex-direction: column;
          gap: ${spacing[400]}px;
        `}
      >
        <Button onClick={() => setOpenA(prevOpen => !prevOpen)}>
          Open Drawer A
        </Button>
        <Button onClick={() => setOpenB(prevOpen => !prevOpen)}>
          Open Drawer B
        </Button>
        <Button onClick={() => setOpenC(prevOpen => !prevOpen)}>
          Open Drawer C
        </Button>
        <Drawer
          {...args}
          open={openA}
          onClose={() => setOpenA(false)}
          title="Drawer A"
        >
          <LongContent />
        </Drawer>
        <Drawer
          {...args}
          open={openB}
          onClose={() => setOpenB(false)}
          title="Drawer B"
        >
          <LongContent />
        </Drawer>
        <Drawer
          {...args}
          open={openC}
          onClose={() => setOpenC(false)}
          title="Drawer C"
        >
          <LongContent />
        </Drawer>
      </div>
    </DrawerStackProvider>
  );
};

export const MultipleDrawers: StoryObj<DrawerProps> = {
  render: MultipleDrawersComponent,
  args: {
    displayMode: DisplayMode.Overlay,
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

export const LightModeEmbedded: StoryObj<DrawerProps> = {
  render: TemplateComponent,
  args: {
    children: <LongContent />,
    darkMode: false,
    displayMode: DisplayMode.Embedded,
    open: true,
  },
  parameters: {
    controls: {
      exclude: snapshotStoryExcludedControlParams,
    },
  },
};

export const DarkModeEmbedded: StoryObj<DrawerProps> = {
  render: TemplateComponent,
  args: {
    children: <LongContent />,
    darkMode: true,
    displayMode: DisplayMode.Embedded,
    open: true,
  },
  parameters: {
    controls: {
      exclude: snapshotStoryExcludedControlParams,
    },
  },
};
