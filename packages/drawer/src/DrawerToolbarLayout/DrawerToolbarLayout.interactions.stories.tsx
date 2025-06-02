/* eslint-disable no-console */
import React, { useMemo } from 'react';
import { faker } from '@faker-js/faker';
import { storybookExcludedControlParams } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { DisplayMode, Drawer, DrawerProps } from '../Drawer';
import { useDrawerToolbarContext } from '../DrawerToolbarContext';
import { getTestUtils } from '../testing';

import { DrawerToolbarLayout } from './DrawerToolbarLayout';
import { DrawerToolbarLayoutProps } from './DrawerToolbarLayout.types';

const excludedControls = [
  ...storybookExcludedControlParams,
  'children',
  'open',
  'displayMode',
  'title',
];

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
    id: 'Dashboard',
    label: 'Dashboard',
    content: <LongContent />,
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
];

export default {
  title: 'Components/Drawer/Toolbar/Interactions',
  component: Drawer,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: excludedControls,
    },
  },
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
};

type DrawerToolbarLayoutPropsWithoutData = Omit<
  DrawerToolbarLayoutProps,
  'data'
>;

const Template: StoryFn<DrawerToolbarLayoutPropsWithoutData> = ({
  displayMode = DisplayMode.Embedded,
  ...rest
}: DrawerToolbarLayoutPropsWithoutData) => {
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
        height: 80vh;
        border-bottom: 1px solid ${palette.gray.light1};
        width: 100%;
      `}
    >
      <DrawerToolbarLayout
        {...rest}
        data={DRAWER_TOOLBAR_DATA}
        displayMode={displayMode!}
      >
        <MainContent />
      </DrawerToolbarLayout>
    </div>
  );
};

export const OverlayOpensFirstToolbarItem = {
  render: (args: DrawerProps) => <Template {...args} />,
  args: {
    displayMode: DisplayMode.Overlay,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { getToolbarTestUtils, isOpen, getDrawer } = getTestUtils();
    const { getToolbarIconButtonByLabel } = getToolbarTestUtils();
    const codeButton = getToolbarIconButtonByLabel('Code')?.getElement();

    await userEvent.click(codeButton);

    await waitFor(() => {
      expect(canvas.getByText('Code Title')).toBeVisible();
      expect(getDrawer().textContent).toContain('Code Title');
      expect(isOpen()).toBe(true);
    });
  },
};

export const OverlaySwitchesToolbarItems = {
  render: (args: DrawerProps) => <Template {...args} />,
  args: {
    displayMode: DisplayMode.Overlay,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { getToolbarTestUtils, getDrawer, isOpen } = getTestUtils();
    const { getToolbarIconButtonByLabel } = getToolbarTestUtils();
    const codeButton = getToolbarIconButtonByLabel('Code')?.getElement();
    const dashboardButton =
      getToolbarIconButtonByLabel('Dashboard')?.getElement();

    await userEvent.click(codeButton);
    await waitFor(() => {
      expect(canvas.getByText('Code Title')).toBeVisible();
      expect(isOpen()).toBe(true);
    });

    await userEvent.unhover(codeButton);
    // Pause so the change is visible in the story
    await new Promise(resolve => setTimeout(resolve, 1000));

    await userEvent.click(dashboardButton);
    await waitFor(() => {
      expect(canvas.getByText('Dashboard Title')).toBeVisible();
      expect(getDrawer().textContent).toContain('Dashboard Title');
    });
  },
};

export const OverlayClosesDrawer = {
  render: (args: DrawerProps) => <Template {...args} />,
  args: {
    displayMode: DisplayMode.Overlay,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { getToolbarTestUtils, getCloseButtonUtils, isOpen } = getTestUtils();
    const { getToolbarIconButtonByLabel } = getToolbarTestUtils();
    const codeButton = getToolbarIconButtonByLabel('Code')?.getElement();
    const closeButton = getCloseButtonUtils().getButton();

    await userEvent.click(codeButton);
    await waitFor(() => {
      expect(canvas.getByText('Code Title')).toBeVisible();
      expect(isOpen()).toBe(true);
    });
    // Pause so the change is visible in the story
    await new Promise(resolve => setTimeout(resolve, 1000));

    await userEvent.click(closeButton);
    await waitFor(() => expect(isOpen()).toBe(false));
  },
};

export const EmbeddedOpensFirstToolbarItem = {
  render: (args: DrawerProps) => <Template {...args} />,
  args: {
    displayMode: DisplayMode.Embedded,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { getToolbarTestUtils, isOpen, getDrawer } = getTestUtils();
    const { getToolbarIconButtonByLabel } = getToolbarTestUtils();
    const codeButton = getToolbarIconButtonByLabel('Code')?.getElement();

    await userEvent.click(codeButton);

    await waitFor(() => {
      expect(isOpen()).toBe(true);
      expect(canvas.getByText('Code Title')).toBeVisible();
      expect(getDrawer().textContent).toContain('Code Title');
    });
  },
};

export const EmbeddedSwitchesToolbarItems = {
  render: (args: DrawerProps) => <Template {...args} />,
  args: {
    displayMode: DisplayMode.Embedded,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { getToolbarTestUtils, isOpen, getDrawer } = getTestUtils();
    const { getToolbarIconButtonByLabel } = getToolbarTestUtils();
    const codeButton = getToolbarIconButtonByLabel('Code')?.getElement();
    const dashboardButton =
      getToolbarIconButtonByLabel('Dashboard')?.getElement();

    await userEvent.click(codeButton);
    await waitFor(() => {
      expect(isOpen()).toBe(true);
      expect(canvas.getByText('Code Title')).toBeVisible();
      expect(getDrawer().textContent).toContain('Code Title');
    });

    await userEvent.unhover(codeButton);
    // Pause so the change is visible in the story
    await new Promise(resolve => setTimeout(resolve, 1000));

    await userEvent.click(dashboardButton);
    await waitFor(() => {
      expect(isOpen()).toBe(true);
      expect(canvas.getByText('Dashboard Title')).toBeVisible();
      expect(getDrawer().textContent).toContain('Dashboard Title');
    });
  },
};

export const EmbeddedClosesDrawer = {
  render: (args: DrawerProps) => <Template {...args} />,
  args: {
    displayMode: DisplayMode.Embedded,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { getToolbarTestUtils, getCloseButtonUtils, isOpen, getDrawer } =
      getTestUtils();
    const { getToolbarIconButtonByLabel } = getToolbarTestUtils();
    const codeButton = getToolbarIconButtonByLabel('Code')?.getElement();
    const closeButton = getCloseButtonUtils().getButton();

    await userEvent.click(codeButton);
    await waitFor(() => {
      expect(isOpen()).toBe(true);
      expect(canvas.getByText('Code Title')).toBeVisible();
      expect(getDrawer().textContent).toContain('Code Title');
    });
    // Pause so the change is visible in the story
    await new Promise(resolve => setTimeout(resolve, 1000));

    await userEvent.click(closeButton);
    await waitFor(() => expect(isOpen()).toBe(false));
  },
};
