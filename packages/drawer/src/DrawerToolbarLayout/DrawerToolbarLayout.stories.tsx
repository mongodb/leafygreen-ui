/* eslint-disable no-console */
import React, { useMemo } from 'react';
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

import { DisplayMode, Drawer } from '../Drawer';
import { DrawerLayout, DrawerLayoutProps } from '../DrawerLayout';

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
      `}
    >
      {children}
    </div>
  </div>
);

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
];

const EmbeddedComponent: StoryFn<DrawerLayoutProps> = ({
  darkMode,
}: DrawerLayoutProps) => {
  return (
    <div
      className={css`
        height: 90vh;
        width: 100%;
      `}
    >
      <DrawerLayout
        darkMode={darkMode}
        toolbarData={DRAWER_TOOLBAR_DATA}
        displayMode="embedded"
      >
        <main
          className={css`
            padding: ${spacing[400]}px;
          `}
        >
          <LongContent />
        </main>
      </DrawerLayout>
    </div>
  );
};

const OverlayComponent: StoryFn<DrawerLayoutProps> = ({
  darkMode,
}: DrawerLayoutProps) => {
  return (
    <div
      className={css`
        height: 90vh;
        width: 100%;
      `}
    >
      <DrawerLayout
        darkMode={darkMode}
        toolbarData={DRAWER_TOOLBAR_DATA}
        displayMode="overlay"
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
    </div>
  );
};

const OverlayCloudNavComponent: StoryFn<DrawerLayoutProps> = ({
  darkMode,
}: DrawerLayoutProps) => {
  return (
    <CloudNavLayoutMock>
      <DrawerLayout
        darkMode={darkMode}
        toolbarData={DRAWER_TOOLBAR_DATA}
        displayMode="overlay"
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
  render: OverlayComponent,
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
};

export const Embedded: StoryObj<DrawerLayoutProps> = {
  render: EmbeddedComponent,
  parameters: {
    controls: {
      exclude: toolbarExcludedControls,
    },
  },
};
