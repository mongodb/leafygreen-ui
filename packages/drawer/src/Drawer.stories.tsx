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
import { Theme } from '@leafygreen-ui/lib';
import { color, spacing } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { DisplayMode, Drawer, DrawerProps } from './Drawer';
import { DrawerLayout } from './DrawerLayout';
import { DrawerStackProvider } from './DrawerStackContext';

const SEED = 0;
faker.seed(SEED);

const defaultExcludedControls = [
  ...storybookExcludedControlParams,
  'children',
  'open',
];

const snapshotStoryExcludedControlParams = [
  ...defaultExcludedControls,
  'darkMode',
  'displayMode',
  'title',
];

export default {
  title: 'Components/Drawer',
  component: Drawer,
  decorators: [
    (StoryFn, ctx) => (
      <div
        className={css`
          height: 100%;
          display: flex;
          align-items: center;
          margin: -100px;
          width: 100vw;
          border: 1px solid
            ${color[ctx?.args?.darkMode ? Theme.Dark : Theme.Light].border
              .secondary.default};
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
      control: 'radio',
      description: 'Options to control how the drawer element is displayed',
      options: Object.values(DisplayMode),
    },
    title: {
      control: 'text',
      description: 'Title of the Drawer',
    },
  },
} satisfies StoryMetaType<typeof Drawer>;

const LongContent = () => {
  const paragraphs = useMemo(() => {
    return faker.lorem
      .paragraphs(30, '\n')
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

type DrawerOmitOpen = Omit<DrawerProps, 'open'>;

const TemplateComponent: StoryFn<DrawerOmitOpen> = ({
  displayMode = DisplayMode.Overlay,
  initialOpen,
  ...rest
}: DrawerOmitOpen & {
  initialOpen?: boolean;
}) => {
  const [open, setOpen] = useState(initialOpen ?? true);

  const renderTrigger = () => (
    <Button onClick={() => setOpen(prevOpen => !prevOpen)}>
      Toggle Drawer
    </Button>
  );

  const renderDrawer = () => (
    <Drawer
      {...rest}
      onClose={() => setOpen(false)}
      open={undefined} // Prevent open from passing since it is passed to DrawerLayout
    />
  );

  return (
    <DrawerStackProvider>
      <div
        className={css`
          height: 500px;
          width: 100%;
        `}
      >
        <DrawerLayout
          displayMode={displayMode}
          isDrawerOpen={open}
          drawer={renderDrawer()}
          resizable={true}
        >
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
        </DrawerLayout>
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
    controls: {
      exclude: [...defaultExcludedControls, 'initialOpen'],
    },
  },
};

const MultipleDrawersComponent: StoryFn<DrawerProps> = (args: DrawerProps) => {
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);
  const [openC, setOpenC] = useState(false);

  return (
    <DrawerLayout
      displayMode={DisplayMode.Overlay}
      isDrawerOpen={openA || openB || openC}
      className={css`
        height: 500px;
      `}
    >
      <DrawerStackProvider>
        <div
          className={css`
            display: flex;
            flex-direction: column;
            gap: ${spacing[400]}px;
          `}
        >
          <Button onClick={() => setOpenA(prevOpen => !prevOpen)}>
            Toggle Drawer A
          </Button>
          <Button onClick={() => setOpenB(prevOpen => !prevOpen)}>
            Toggle Drawer B
          </Button>
        </div>
        <div>
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
            <Button onClick={() => setOpenC(prevOpen => !prevOpen)}>
              Toggle Drawer C
            </Button>
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
    </DrawerLayout>
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
