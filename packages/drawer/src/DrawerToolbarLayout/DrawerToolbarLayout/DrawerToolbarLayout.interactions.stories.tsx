import React from 'react';
import { storybookExcludedControlParams } from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

import { DisplayMode, Drawer } from '../../Drawer';
import { DrawerLayoutProvider } from '../../DrawerLayout';
import { getTestUtils } from '../../testing';
import { useDrawerToolbarContext } from '../DrawerToolbarContext/DrawerToolbarContext';

import { DrawerToolbarLayout } from './DrawerToolbarLayout';
import {
  DRAWER_TOOLBAR_DATA,
  LongContent,
} from './DrawerToolbarLayout.testutils';
import { DrawerToolbarLayoutProps } from './DrawerToolbarLayout.types';

// Helper function to wait for tooltip transitions and positioning to complete
const waitForTooltipToSettle = async () => {
  const tooltipHoverDelay = transitionDuration.slowest; // time before tooltip shows
  const tooltipTransitionTime = transitionDuration.default; // transition duration
  const buffer = 100;
  const totalTooltipDelay = tooltipHoverDelay + tooltipTransitionTime + buffer;

  // Wait for tooltip positioning to stabilize
  await new Promise(resolve => setTimeout(resolve, totalTooltipDelay));
};

// For testing purposes. displayMode is read from the context, so we need to
// pass it down to the DrawerToolbarLayoutProps.
type DrawerToolbarLayoutPropsWithDisplayMode = DrawerToolbarLayoutProps & {
  displayMode?: DisplayMode;
};

const excludedControls = [
  ...storybookExcludedControlParams,
  'children',
  'open',
  'displayMode',
  'title',
];

export default {
  title: 'Sections/Drawer/Toolbar/Interactions',
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

const Template: StoryFn<DrawerToolbarLayoutPropsWithDisplayMode> = ({
  displayMode = DisplayMode.Embedded,
}: DrawerToolbarLayoutPropsWithDisplayMode) => {
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
      <DrawerLayoutProvider displayMode={displayMode!} hasToolbar>
        <DrawerToolbarLayout toolbarData={DRAWER_TOOLBAR_DATA}>
          <MainContent />
        </DrawerToolbarLayout>
      </DrawerLayoutProvider>
    </div>
  );
};

export const OverlayOpensFirstToolbarItem: StoryObj<DrawerToolbarLayoutPropsWithDisplayMode> =
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

      expect(isOpen()).toBe(false);
      userEvent.click(codeButton!);

      await waitFor(() => {
        expect(isOpen()).toBe(true);
        expect(canvas.getByText('Code Title')).toBeVisible();
      });
      // Wait for tooltip to be positioned correctly
      await waitForTooltipToSettle();
    },
  };

export const OverlaySwitchesToolbarItems: StoryObj<DrawerToolbarLayoutPropsWithDisplayMode> =
  {
    render: (args: DrawerToolbarLayoutPropsWithDisplayMode) => (
      <Template {...args} />
    ),
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

      expect(isOpen()).toBe(false);

      userEvent.click(codeButton!);

      await waitFor(() => {
        expect(isOpen()).toBe(true);
        expect(canvas.getByText('Code Title')).toBeVisible();
      });

      userEvent.unhover(codeButton!);
      // Wait for tooltip to be positioned correctly
      await waitForTooltipToSettle();
      userEvent.click(dashboardButton!);

      await waitFor(() => {
        expect(canvas.getByText('Dashboard Title')).toBeVisible();
        expect(getDrawer().textContent).toContain('Dashboard Title');
      });

      // Wait for tooltip to be positioned correctly
      await waitForTooltipToSettle();
    },
  };

export const OverlayClosesDrawer: StoryObj<DrawerToolbarLayoutPropsWithDisplayMode> =
  {
    render: (args: DrawerToolbarLayoutPropsWithDisplayMode) => (
      <Template {...args} />
    ),
    args: {
      displayMode: DisplayMode.Overlay,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const { getToolbarTestUtils, getCloseButtonUtils, isOpen } =
        getTestUtils();
      const { getToolbarIconButtonByLabel } = getToolbarTestUtils();
      const codeButton = getToolbarIconButtonByLabel('Code')?.getElement();
      const closeButton = getCloseButtonUtils().getButton();

      expect(isOpen()).toBe(false);

      userEvent.click(codeButton!);

      await waitFor(() => {
        expect(isOpen()).toBe(true);
        expect(canvas.getByText('Code Title')).toBeVisible();
      });

      userEvent.click(closeButton);

      await waitFor(() => expect(isOpen()).toBe(false));
      // Wait for tooltip to be positioned correctly
      await waitForTooltipToSettle();
    },
  };

export const EmbeddedOpensFirstToolbarItem: StoryObj<DrawerToolbarLayoutPropsWithDisplayMode> =
  {
    render: (args: DrawerToolbarLayoutPropsWithDisplayMode) => (
      <Template {...args} />
    ),
    args: {
      displayMode: DisplayMode.Embedded,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const { getToolbarTestUtils, isOpen } = getTestUtils();
      const { getToolbarIconButtonByLabel } = getToolbarTestUtils();
      const codeButton = getToolbarIconButtonByLabel('Code')?.getElement();

      expect(isOpen()).toBe(false);

      userEvent.click(codeButton!);

      await waitFor(() => {
        expect(isOpen()).toBe(true);
        expect(canvas.getByText('Code Title')).toBeVisible();
      });
      // Wait for tooltip to be positioned correctly
      await waitForTooltipToSettle();
    },
  };

export const EmbeddedSwitchesToolbarItems: StoryObj<DrawerToolbarLayoutPropsWithDisplayMode> =
  {
    render: (args: DrawerToolbarLayoutPropsWithDisplayMode) => (
      <Template {...args} />
    ),
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

      expect(isOpen()).toBe(false);

      userEvent.click(codeButton!);
      expect(isOpen()).toBe(false);
      await waitFor(() => {
        expect(isOpen()).toBe(true);
        expect(canvas.getByText('Code Title')).toBeVisible();
      });

      userEvent.unhover(codeButton!);

      // Wait for tooltip to be positioned correctly
      await waitForTooltipToSettle();
      userEvent.click(dashboardButton!);

      await waitFor(() =>
        expect(canvas.getByText('Dashboard Title')).toBeVisible(),
      );

      // Wait for tooltip to be positioned correctly
      await waitForTooltipToSettle();
    },
  };

export const EmbeddedClosesDrawer: StoryObj<DrawerToolbarLayoutPropsWithDisplayMode> =
  {
    render: (args: DrawerToolbarLayoutPropsWithDisplayMode) => (
      <Template {...args} />
    ),
    args: {
      displayMode: DisplayMode.Embedded,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const { getToolbarTestUtils, getCloseButtonUtils, isOpen } =
        getTestUtils();
      const { getToolbarIconButtonByLabel } = getToolbarTestUtils();
      const codeButton = getToolbarIconButtonByLabel('Code')?.getElement();
      const closeButton = getCloseButtonUtils().getButton();

      expect(isOpen()).toBe(false);

      userEvent.click(codeButton!);

      await waitFor(() => {
        expect(isOpen()).toBe(true);
        expect(canvas.getByText('Code Title')).toBeVisible();
      });

      userEvent.click(closeButton!);

      await waitFor(() => expect(isOpen()).toBe(false));
      // Wait for tooltip to be positioned correctly
      await waitForTooltipToSettle();
    },
  };
