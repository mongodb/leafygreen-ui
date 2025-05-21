/* eslint-disable no-console */
import React, { useMemo, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { DisplayMode, Drawer, DrawerProps } from '../Drawer';
import {
  DrawerToolbarLayout,
  DrawerToolbarLayoutProps,
} from '../DrawerToolbarLayout';
import { useDrawerToolbarContext } from '../DrawerToolbarContext';

const SEED = 0;
faker.seed(SEED);

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
  title: 'Components/Drawer/Toolbar',
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
    default: null,
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
    const text = faker.lorem.paragraphs(30, '\n');
    return text.split('\n').map((p, i) => <Body key={i}>{p}</Body>);
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
];

const EmbeddedComponent: StoryFn<DrawerProps> = (args: DrawerProps) => {
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
          `}
        >
          <LongContent />
        </main>
      </DrawerToolbarLayout>
    </div>
  );
};

// FIXME: borders are making the page scroll horizontally:
const OverlayComponent: StoryFn<DrawerProps> = (args: DrawerProps) => {
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

// TODO: uncomment when the DrawerToolbarContext is implemented
const ComponentOpen: StoryFn<DrawerProps> = ({
  displayMode = DisplayMode.Embedded,
  ...rest
}: DrawerProps) => {
  const Main = () => {
    const { openDrawer } = useDrawerToolbarContext();

    useEffect(() => {
      openDrawer('Code');
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
        height: 80vh;
        border-bottom: 1px solid ${palette.gray.light1};
        width: 100%;
      `}
    >
      <DrawerToolbarLayout data={DRAWER_TOOLBAR_DATA} displayMode={displayMode}>
        <Main />
      </DrawerToolbarLayout>
    </div>
  );
};

const OverlayCloudNavComponent: StoryFn<DrawerProps> = (args: DrawerProps) => {
  return (
    <CloudNavLayoutMock>
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
    </CloudNavLayoutMock>
  );
};

export const OverlayCloudNav: StoryObj<DrawerProps> = {
  render: OverlayCloudNavComponent,
  parameters: {
    controls: {
      exclude: toolbarExcludedControls,
    },
  },
};

export const Overlay: StoryObj<DrawerProps> = {
  render: OverlayComponent,
  parameters: {
    controls: {
      exclude: toolbarExcludedControls,
    },
  },
};

export const OverlayOpen: StoryObj<DrawerProps> = {
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

const EmbeddedCloudNavComponent: StoryFn<DrawerProps> = (args: DrawerProps) => {
  return (
    <CloudNavLayoutMock>
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
    </CloudNavLayoutMock>
  );
};

export const EmbeddedCloudNav: StoryObj<DrawerProps> = {
  render: EmbeddedCloudNavComponent,
  parameters: {
    controls: {
      exclude: toolbarExcludedControls,
    },
  },
};

export const Embedded: StoryObj<DrawerProps> = {
  render: EmbeddedComponent,
  parameters: {
    controls: {
      exclude: toolbarExcludedControls,
    },
  },
};

export const EmbeddedOpen: StoryObj<DrawerProps> = {
  render: ComponentOpen,
  args: {
    displayMode: DisplayMode.Embedded,
  },
  parameters: {
    controls: {
      exclude: toolbarExcludedControls,
    },
  },
};
