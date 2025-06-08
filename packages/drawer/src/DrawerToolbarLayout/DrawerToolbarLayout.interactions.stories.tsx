/* eslint-disable no-console */
import React, { useMemo } from 'react';
import { faker } from '@faker-js/faker';
import { storybookExcludedControlParams } from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { DisplayMode, Drawer } from '../Drawer';
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

const DRAWER_TOOLBAR_DATA: DrawerToolbarLayoutProps['toolbarData'] = [
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
    (Story: StoryFn) => (
      <div
        className={css`
          height: 100%;
          display: flex;
          align-items: center;
          margin: -100px;
          width: 100vw;
        `}
      >
        <Story />
      </div>
    ),
  ],
};

const Template: StoryFn<DrawerToolbarLayoutProps> = ({
  displayMode = DisplayMode.Embedded,
}: DrawerToolbarLayoutProps) => {
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
        toolbarData={DRAWER_TOOLBAR_DATA}
        displayMode={displayMode!}
      >
        <MainContent />
      </DrawerToolbarLayout>
    </div>
  );
};

export const OverlayOpensFirstToolbarItem: StoryObj<DrawerToolbarLayoutProps> =
  {
    render: (args: DrawerToolbarLayoutProps) => <Template {...args} />,
    args: {
      displayMode: DisplayMode.Overlay,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const { getToolbarTestUtils, isOpen } = getTestUtils();
      const { getToolbarIconButtonByLabel } = getToolbarTestUtils();
      const codeButton = getToolbarIconButtonByLabel('Code')?.getElement();

      userEvent.click(codeButton!);

      await waitFor(() => {
        expect(isOpen()).toBe(true);
        expect(canvas.getByText('Code Title')).toBeVisible();
      });
    },
  };

export const OverlaySwitchesToolbarItems: StoryObj<DrawerToolbarLayoutProps> = {
  render: (args: DrawerToolbarLayoutProps) => <Template {...args} />,
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

    userEvent.click(codeButton!);
    await waitFor(() => {
      expect(isOpen()).toBe(true);
      expect(canvas.getByText('Code Title')).toBeVisible();
    });

    userEvent.unhover(codeButton!);
    // Pause so the change is visible in the story
    await new Promise(resolve => setTimeout(resolve, 1000));

    userEvent.click(dashboardButton!);
    await waitFor(() => {
      expect(canvas.getByText('Dashboard Title')).toBeVisible();
      expect(getDrawer().textContent).toContain('Dashboard Title');
    });
  },
};

export const OverlayClosesDrawer: StoryObj<DrawerToolbarLayoutProps> = {
  render: (args: DrawerToolbarLayoutProps) => <Template {...args} />,
  args: {
    displayMode: DisplayMode.Overlay,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { getToolbarTestUtils, getCloseButtonUtils, isOpen } = getTestUtils();
    const { getToolbarIconButtonByLabel } = getToolbarTestUtils();
    const codeButton = getToolbarIconButtonByLabel('Code')?.getElement();
    const closeButton = getCloseButtonUtils().getButton();

    userEvent.click(codeButton!);
    await waitFor(() => {
      expect(isOpen()).toBe(true);
      expect(canvas.getByText('Code Title')).toBeVisible();
    });
    // Pause so the change is visible in the story
    await new Promise(resolve => setTimeout(resolve, 1000));

    userEvent.click(closeButton);
    await waitFor(() => expect(isOpen()).toBe(false));
  },
};

export const EmbeddedOpensFirstToolbarItem: StoryObj<DrawerToolbarLayoutProps> =
  {
    render: (args: DrawerToolbarLayoutProps) => <Template {...args} />,
    args: {
      displayMode: DisplayMode.Embedded,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const { getToolbarTestUtils, isOpen } = getTestUtils();
      const { getToolbarIconButtonByLabel } = getToolbarTestUtils();
      const codeButton = getToolbarIconButtonByLabel('Code')?.getElement();

      userEvent.click(codeButton!);

      await waitFor(() => {
        expect(isOpen()).toBe(true);
        expect(canvas.getByText('Code Title')).toBeVisible();
      });
    },
  };

export const EmbeddedSwitchesToolbarItems: StoryObj<DrawerToolbarLayoutProps> =
  {
    render: (args: DrawerToolbarLayoutProps) => <Template {...args} />,
    args: {
      displayMode: DisplayMode.Embedded,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const { getToolbarTestUtils, isOpen } = getTestUtils();
      const { getToolbarIconButtonByLabel } = getToolbarTestUtils();
      const codeButton = getToolbarIconButtonByLabel('Code')?.getElement();
      const dashboardButton =
        getToolbarIconButtonByLabel('Dashboard')?.getElement();

      userEvent.click(codeButton!);
      await waitFor(() => {
        expect(isOpen()).toBe(true);
        expect(canvas.getByText('Code Title')).toBeVisible();
      });

      userEvent.unhover(codeButton!);
      // Pause so the change is visible in the story
      await new Promise(resolve => setTimeout(resolve, 1000));

      userEvent.click(dashboardButton!);
      await waitFor(() =>
        expect(canvas.getByText('Dashboard Title')).toBeVisible(),
      );
    },
  };

export const EmbeddedClosesDrawer: StoryObj<DrawerToolbarLayoutProps> = {
  render: (args: DrawerToolbarLayoutProps) => <Template {...args} />,
  args: {
    displayMode: DisplayMode.Embedded,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { getToolbarTestUtils, getCloseButtonUtils, isOpen } = getTestUtils();
    const { getToolbarIconButtonByLabel } = getToolbarTestUtils();
    const codeButton = getToolbarIconButtonByLabel('Code')?.getElement();
    const closeButton = getCloseButtonUtils().getButton();

    userEvent.click(codeButton!);
    await waitFor(() => {
      expect(isOpen()).toBe(true);
      expect(canvas.getByText('Code Title')).toBeVisible();
    });
    // Pause so the change is visible in the story
    await new Promise(resolve => setTimeout(resolve, 1000));

    userEvent.click(closeButton!);
    await waitFor(() => expect(isOpen()).toBe(false));
  },
};
