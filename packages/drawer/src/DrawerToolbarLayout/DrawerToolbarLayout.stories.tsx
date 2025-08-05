/* eslint-disable no-console */
import React, { useEffect, useMemo } from 'react';
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

import { DisplayMode } from '../Drawer';
import { Size } from '../Drawer/Drawer.types';
import { DrawerLayout, DrawerLayoutProps } from '../DrawerLayout';

import { useDrawerToolbarContext } from './DrawerToolbarContext/DrawerToolbarContext';

const SEED = 0;
faker.seed(SEED);

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

const DrawerContent = () => {
  // Generate a unique seed based on timestamp for different content each time
  React.useEffect(() => {
    faker.seed(Date.now());
  }, []);

  // Generate paragraphs without memoization so they're different each render
  const paragraphs = faker.lorem
    .paragraphs(30, '\n')
    .split('\n')
    .map((p, i) => <Body key={i}>{p}</Body>);

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

const DRAWER_TOOLBAR_DATA: DrawerLayoutProps['toolbarData'] = [
  {
    id: 'Code',
    label: 'Code',
    content: <DrawerContent />,
    title: 'Code Title',
    glyph: 'Code',
    onClick: () => {
      console.log('Code clicked');
    },
  },
  {
    id: 'Dashboard',
    label: 'Dashboard',
    content: <DrawerContent />,
    title: 'Dashboard Title',
    glyph: 'Dashboard',
    onClick: () => {
      console.log('Dashboard clicked');
    },
  },
  {
    id: 'Plus',
    label: "Perform some action, doesn't open a drawer",
    glyph: 'Plus',
    onClick: () => {
      console.log('Plus clicked, does not update drawer');
    },
  },
  {
    id: 'Sparkle',
    label: 'Disabled item',
    glyph: 'Sparkle',
    disabled: true,
  },
];

const defaultExcludedControls = [
  ...storybookExcludedControlParams,
  'children',
  'open',
];

const toolbarExcludedControls = [
  ...defaultExcludedControls,
  'displayMode',
  'title',
];

export default {
  title: 'Sections/Drawer/Toolbar',
  decorators: [
    StoryFn => (
      <div
        className={css`
          height: 100%;
          display: flex;
          align-items: center;
          margin: -100px;
          width: 100vw;
          border-bottom: 3px solid ${palette.green.base};
        `}
      >
        <StoryFn />
      </div>
    ),
  ],
  parameters: {
    default: null,
    controls: {
      exclude: defaultExcludedControls,
    },
  },
  args: {
    displayMode: DisplayMode.Overlay,
    toolbarData: DRAWER_TOOLBAR_DATA,
    size: Size.Default,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    size: {
      control: 'radio',
      description: 'Size of the drawer',
      options: Object.values(Size),
    },
  },
} satisfies StoryMetaType<typeof DrawerLayout>;

const CloudNavLayoutMock: React.FC<{ children?: React.ReactNode }> = ({
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
      `}
    >
      {children}
    </div>
  </div>
);

const Component: StoryFn<DrawerLayoutProps> = ({
  ...args
}: DrawerLayoutProps) => {
  const MainContent = () => {
    const { openDrawer } = useDrawerToolbarContext();

    return (
      <main
        className={css`
          padding: ${spacing[400]}px;
        `}
      >
        <Button onClick={() => openDrawer('Code')}>Open Code Drawer</Button>
        <LongContent />
        <LongContent />
      </main>
    );
  };

  return (
    <div
      className={css`
        height: 90vh;
        width: 100%;
      `}
    >
      <DrawerLayout {...args}>
        <MainContent />
      </DrawerLayout>
    </div>
  );
};

const ComponentOpen: StoryFn<DrawerLayoutProps> = (args: DrawerLayoutProps) => {
  const MainContent = () => {
    const { openDrawer } = useDrawerToolbarContext();

    useEffect(() => {
      openDrawer('Code');
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <main
        className={css`
          padding: ${spacing[400]}px;
        `}
      >
        <LongContent />
        <LongContent />
      </main>
    );
  };

  return (
    <div
      className={css`
        height: 90vh;
        width: 100%;
      `}
    >
      <DrawerLayout {...args}>
        <MainContent />
      </DrawerLayout>
    </div>
  );
};

const OverlayCloudNavComponent: StoryFn<DrawerLayoutProps> = ({
  darkMode,
}: DrawerLayoutProps) => {
  return (
    <CloudNavLayoutMock>
      <DrawerLayout
        toolbarData={DRAWER_TOOLBAR_DATA}
        displayMode="overlay"
        darkMode={darkMode}
      >
        <div
          className={css`
            padding: ${spacing[400]}px;
          `}
        >
          <LongContent />
          <LongContent />
        </div>
      </DrawerLayout>
    </CloudNavLayoutMock>
  );
};

export const OverlayCloudNav: StoryObj<DrawerLayoutProps> = {
  render: OverlayCloudNavComponent,
  parameters: {
    controls: {
      exclude: toolbarExcludedControls,
    },
  },
};

export const Overlay: StoryObj<DrawerLayoutProps> = {
  render: Component,
  args: {
    displayMode: DisplayMode.Overlay,
  },
  parameters: {
    controls: {
      exclude: toolbarExcludedControls,
    },
  },
};

export const OverlayOpen: StoryObj<DrawerLayoutProps> = {
  render: ComponentOpen,
  args: {
    displayMode: DisplayMode.Overlay,
  },
  parameters: {
    controls: {
      exclude: toolbarExcludedControls,
    },
  },
};

const EmbeddedCloudNavComponent: StoryFn<DrawerLayoutProps> = (
  args: DrawerLayoutProps,
) => {
  return (
    <CloudNavLayoutMock>
      <DrawerLayout
        toolbarData={DRAWER_TOOLBAR_DATA}
        darkMode={args.darkMode}
        displayMode="embedded"
        resizable={args.resizable}
      >
        <main
          className={css`
            padding: ${spacing[400]}px;
          `}
        >
          <LongContent />
          <LongContent />
        </main>
      </DrawerLayout>
    </CloudNavLayoutMock>
  );
};

export const EmbeddedCloudNav: StoryObj<DrawerLayoutProps> = {
  render: EmbeddedCloudNavComponent,
  parameters: {
    controls: {
      exclude: toolbarExcludedControls,
    },
  },
  args: {
    resizable: true,
    displayMode: DisplayMode.Embedded,
  },
};

export const Embedded: StoryObj<DrawerLayoutProps> = {
  render: Component,
  args: {
    displayMode: DisplayMode.Embedded,
    resizable: true,
  },
  parameters: {
    controls: {
      exclude: toolbarExcludedControls,
    },
  },
};

export const EmbeddedOpen: StoryObj<DrawerLayoutProps> = {
  render: ComponentOpen,
  args: {
    displayMode: DisplayMode.Embedded,
    resizable: true,
  },
  parameters: {
    controls: {
      exclude: toolbarExcludedControls,
    },
  },
};
