/* eslint-disable no-console */
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
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { DisplayMode, Drawer, DrawerProps } from './Drawer';
import { DrawerStackProvider } from './DrawerStackContext';
import {
  DrawerToolbarLayout,
  DrawerToolbarLayoutProps,
} from './DrawerToolbarLayout';
import { EmbeddedDrawerLayout } from './EmbeddedDrawerLayout';

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

const toolbarExcludedControls = [
  ...defaultExcludedControls,
  'displayMode',
  'title',
];

export default {
  title: 'Components/Drawer',
  component: Drawer,
  decorators: [
    StoryFn => (
      <div
        className={css`
          height: 100%;
          display: flex;
          align-items: center;
          margin: -100px;
          width: 100vw;
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

const CloudNavLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => (
  <div
    className={css`
      display: grid;
      grid-template:
        'lg-cloud_nav-side_nav lg-cloud_nav-top_nav' max-content
        'lg-cloud_nav-side_nav lg-cloud_nav-content' 1fr / 48px auto;
      height: 100vh;
      width: 100vw;
      max-height: 100vh;
      max-width: 100vw;
      overflow: hidden;
    `}
  >
    <div
      className={css`
        grid-area: lg-cloud_nav-side_nav;
        background-color: ${palette.gray.dark1};
      `}
    ></div>
    <div
      className={css`
        grid-area: lg-cloud_nav-side_nav;
        background-color: ${palette.gray.dark1};
      `}
    ></div>
    <div
      className={css`
        grid-area: lg-cloud_nav-top_nav;
        background-color: ${palette.gray.dark1};
        height: 48px;
      `}
    ></div>
    <div
      className={css`
        grid-area: lg-cloud_nav-content;
        overflow: scroll;
        height: inherit;
      `}
    >
      {children}
    </div>
  </div>
);

const DRAWER_TOOLBAR_DATA: DrawerToolbarLayoutProps['data'] = [
  {
    id: 'Code',
    label: 'Code',
    content: <LongContent />,
    title: 'Code Title',
    glyph: 'Code',
    onClick: () => {
      console.log('Code clicked');
    },
  },
  {
    id: 'Plus',
    label: 'Plus',
    content: <LongContent />,
    title: 'Plus Title',
    glyph: 'Plus',
    onClick: () => {
      console.log('Plus clicked');
    },
  },
];

const TemplateComponent: StoryFn<DrawerProps> = ({
  displayMode,
  initialOpen,
  ...rest
}: DrawerProps & {
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
      displayMode={displayMode}
      open={open}
      onClose={() => setOpen(false)}
    />
  );

  return displayMode === DisplayMode.Embedded ? (
    <DrawerStackProvider>
      <EmbeddedDrawerLayout
        className={css`
          height: 500px;
        `}
        isDrawerOpen={open}
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
    controls: {
      exclude: [...defaultExcludedControls, 'initialOpen'],
    },
  },
};

const WithToolbarEmbeddedComponent: StoryFn<DrawerProps> = () => {
  return (
    <div
      className={css`
        height: 80vh;
        border-bottom: 1px solid ${palette.gray.light1};
        width: 100%;
      `}
    >
      <DrawerToolbarLayout data={DRAWER_TOOLBAR_DATA} displayMode="embedded">
        <main
          className={css`
            padding: ${spacing[400]}px;
            overflow: auto;
          `}
        >
          <LongContent />
        </main>
      </DrawerToolbarLayout>
    </div>
  );
};

const WithoutToolbarEmbeddedComponent: StoryFn<DrawerProps> = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={css`
        height: 80vh;
        border-bottom: 1px solid ${palette.gray.light1};
        width: 100%;
      `}
    >
      <DrawerStackProvider>
        <EmbeddedDrawerLayout isDrawerOpen={open}>
          <main
            className={css`
              padding: ${spacing[400]}px;
              overflow: auto;
            `}
          >
            <Button onClick={() => setOpen(prevOpen => !prevOpen)}>
              Toggle Drawer
            </Button>
            <LongContent />
          </main>
          <Drawer
            displayMode="embedded"
            open={open}
            onClose={() => setOpen(false)}
            title="Drawer Title"
          >
            <LongContent />
          </Drawer>
        </EmbeddedDrawerLayout>
      </DrawerStackProvider>
    </div>
  );
};

// FIXME: borders are making the page scroll horizontally:
const WithToolbarOverlayComponent: StoryFn<DrawerProps> = () => {
  return (
    <div
      className={css`
        height: 80vh;
        border-bottom: 1px solid ${palette.gray.light1};
        width: 100%;
      `}
    >
      <DrawerToolbarLayout data={DRAWER_TOOLBAR_DATA} displayMode="overlay">
        <main
          className={css`
            padding: ${spacing[400]}px;
          `}
        >
          <LongContent />
          <LongContent />
        </main>
      </DrawerToolbarLayout>
    </div>
  );
};

const WithoutToolbarOverlayComponent: StoryFn<DrawerProps> = (
  args: DrawerProps,
) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={css`
        height: 80vh;
        border-bottom: 1px solid ${palette.gray.light1};
        width: 100%;
      `}
    >
      <DrawerStackProvider>
        <main
          className={css`
            padding: ${spacing[400]}px;
            overflow: auto;
            overflow: scroll;
            height: 100%;
          `}
        >
          <Button onClick={() => setOpen(prevOpen => !prevOpen)}>
            Toggle Drawer
          </Button>
          <LongContent />
          <LongContent />
        </main>
        <Drawer
          displayMode="overlay"
          open={open}
          onClose={() => setOpen(false)}
          title="Drawer Title"
        >
          <LongContent />
        </Drawer>
      </DrawerStackProvider>
    </div>
  );
};

const WithToolbarOverlayCloudNavComponent: StoryFn<DrawerProps> = (
  args: DrawerProps,
) => {
  return (
    <CloudNavLayout>
      <DrawerToolbarLayout data={DRAWER_TOOLBAR_DATA} displayMode="overlay">
        <div
          className={css`
            padding: ${spacing[400]}px;
          `}
        >
          <LongContent />
          <LongContent />
        </div>
      </DrawerToolbarLayout>
    </CloudNavLayout>
  );
};

const WithToolbarEmbeddedCloudNavComponent: StoryFn<DrawerProps> = (
  args: DrawerProps,
) => {
  return (
    <CloudNavLayout>
      <DrawerToolbarLayout data={DRAWER_TOOLBAR_DATA} displayMode="embedded">
        <main
          className={css`
            padding: ${spacing[400]}px;
          `}
        >
          <LongContent />
          <LongContent />
        </main>
      </DrawerToolbarLayout>
    </CloudNavLayout>
  );
};

export const WithToolbarOverlayCloudNav: StoryObj<DrawerProps> = {
  render: WithToolbarOverlayCloudNavComponent,
  parameters: {
    controls: {
      exclude: toolbarExcludedControls,
    },
  },
};

export const WithToolbarEmbeddedCloudNav: StoryObj<DrawerProps> = {
  render: WithToolbarEmbeddedCloudNavComponent,
  parameters: {
    controls: {
      exclude: toolbarExcludedControls,
    },
  },
};

export const WithToolbarOverlay: StoryObj<DrawerProps> = {
  render: WithToolbarOverlayComponent,
  parameters: {
    controls: {
      exclude: toolbarExcludedControls,
    },
  },
};

export const WithoutToolbarOverlay: StoryObj<DrawerProps> = {
  render: WithoutToolbarOverlayComponent,
  parameters: {
    controls: {
      exclude: toolbarExcludedControls,
    },
  },
};

export const WithToolbarEmbedded: StoryObj<DrawerProps> = {
  render: WithToolbarEmbeddedComponent,
  parameters: {
    controls: {
      exclude: toolbarExcludedControls,
    },
  },
};

export const WithoutToolbarEmbedded: StoryObj<DrawerProps> = {
  render: WithoutToolbarEmbeddedComponent,
  parameters: {
    controls: {
      exclude: toolbarExcludedControls,
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
          Toggle Drawer A
        </Button>
        <Button onClick={() => setOpenB(prevOpen => !prevOpen)}>
          Toggle Drawer B
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
